<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800 relative">
    
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Question..." />

    <!-- Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold">Questions</h1>
      <button @click="openAddModal"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-1">
        ➕ Add Question
      </button>
    </div>

    <!-- Search -->
    <div class="flex justify-between mb-6">
      <input v-model="searchQuery" @input="fetchItems(1)"
        placeholder="Search questions..."
        class="border px-3 py-2 rounded-lg w-64" />

      <select v-model="pageSize" @change="fetchItems(1)"
        class="border px-2 py-1 rounded-lg">
        <option v-for="size in [5,10,20,50]" :key="size">{{ size }}</option>
      </select>
    </div>

    <!-- TABLE -->
    <div class="bg-white rounded-xl border hidden md:block">
      <table class="w-full">
        <thead class="bg-gray-100 text-xs uppercase">
          <tr>
            <th class="p-3 text-left">#</th>
            <th class="p-3 text-left">Question</th>
            <th class="p-3 text-left">Options</th>
            <th class="p-3 text-left">Answer</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in items" :key="item.id" class="border-t hover:bg-gray-50">
            
            <td class="p-3">{{ index + 1 }}</td>

            <!-- QUESTION -->
            <td class="p-3 font-medium">
              {{ item.question_text }}
            </td>

            <!-- OPTIONS -->
            <td class="p-3">
              <ul class="list-disc ml-4">
                <li v-for="(opt, i) in parseOptions(item.options)" 
                    :key="i"
                    :class="opt === item.correct_answer ? 'text-green-600 font-semibold' : ''">
                  {{ opt }}
                </li>
              </ul>
            </td>

            <!-- ANSWER -->
            <td class="p-3 text-green-600 font-bold">
              {{ item.correct_answer }}
            </td>

            <!-- ACTIONS -->
            <td class="p-3 text-center space-x-2">
              <button @click="viewDetails(item.id)">👁</button>
              <button @click="editItem(item)">✏️</button>
              <button @click="openDeleteModal(item.id)">🗑</button>
            </td>

          </tr>

          <tr v-if="items.length === 0">
            <td colspan="5" class="text-center p-4 text-gray-400">
              No questions found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MOBILE VIEW -->
    <div class="md:hidden space-y-4">
      <div v-for="(item, index) in items" :key="item.id"
        class="bg-white p-4 rounded-lg shadow">

        <h2 class="font-bold mb-2">Q{{ index + 1 }}: {{ item.question }}</h2>

        <ul class="ml-4 list-disc mb-2">
          <li v-for="(opt, i) in parseOptions(item.options)" 
              :key="i"
              :class="opt === item.correct_answer ? 'text-green-600 font-semibold' : ''">
            {{ opt }}
          </li>
        </ul>

        <p class="text-green-600 font-bold">Answer: {{ item.correct_answer }}</p>

        <div class="flex gap-3 mt-2">
          <button @click="viewDetails(item.id)">👁</button>
          <button @click="editItem(item)">✏️</button>
          <button @click="openDeleteModal(item.id)">🗑</button>
        </div>
      </div>
    </div>

    <!-- PAGINATION -->
    <div class="flex justify-between mt-6">
      <span>
        Showing {{ (currentPage - 1) * pageSize + 1 }}
        to {{ Math.min(currentPage * pageSize, count) }}
        of {{ count }}
      </span>

      <div class="flex gap-2">
        <button @click="fetchItems(currentPage - 1)" :disabled="!previousPage">Prev</button>
        <span>{{ currentPage }}</span>
        <button @click="fetchItems(currentPage + 1)" :disabled="!nextPage">Next</button>
      </div>
    </div>

    <!-- MODALS -->
    <add-question v-if="showModal && !editMode"
      :data="selectedItem"
      @close="showModal=false"
      @saved="fetchItems" />

    <edit-question v-if="showModal && editMode"
      :data="selectedItem"
      @close="showModal=false"
      @saved="fetchItems" />

    <delete-confirm-modal
      :visible="deleteModalVisible"
      title="Delete Question"
      message="Are you sure?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible=false"
    />

  </div>
</template>

<script>
import AddQuestion from "./AddQuestion.vue";
import EditQuestion from "./EditQuestion.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddQuestion, EditQuestion, Loading, DeleteConfirmModal },

  data() {
    return {
      items: [],
      count: 0,
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
      showModal: false,
      editMode: false,
      selectedItem: null,
      loading: false,
      deleteModalVisible: false,
      deleteId: null,
    };
  },

  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;

      try {
        const res = await this.$apiGet('/question', {
          page,
          page_size: this.pageSize,
          search: this.searchQuery
        });

        this.items = res.data;
        this.count = res.count || 0;
        this.nextPage = res.next;
        this.previousPage = res.previous;

      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    // FIX OPTIONS FORMAT
    parseOptions(options) {
      try {
        return typeof options === 'string'
          ? JSON.parse(options)
          : options;
      } catch {
        return [];
      }
    },

    openAddModal() {
      this.editMode = false;
      this.selectedItem = null;
      this.showModal = true;
    },

    editItem(item) {
      this.editMode = true;
      this.selectedItem = item;
      this.showModal = true;
    },

    viewDetails(id) {
      this.$router.push({ name: 'Question-detail', params: { id } });
    },

    openDeleteModal(id) {
      this.deleteId = id;
      this.deleteModalVisible = true;
    },

    async confirmDelete() {
      await this.$apiDelete('/question', this.deleteId);
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },
  },

  mounted() {
    this.fetchItems();
  }
};
</script>