<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800 relative">
    <Loading :visible="loading" message="Loading Results..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <div>
        <h1 class="text-lg font-bold text-gray-800">Results</h1>
        <p class="text-xs text-gray-500 mt-0.5">Psychometric assessment results per user</p>
      </div>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input v-model="searchQuery" @input="fetchItems(1)" type="text" placeholder="Search by interpretation..."
        class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchItems(1)" class="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:ring-green-500 focus:border-green-500">
          <option v-for="size in [5, 10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="bg-white overflow-hidden rounded-xl border border-gray-200 hidden md:block">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">Tester</th>
              <th class="px-6 py-3 text-left">Test</th>
              <th class="px-6 py-3 text-center">Score</th>
              <th class="px-6 py-3 text-left">Interpretation</th>
              <th class="px-6 py-3 text-left">Completed</th>
              <th class="px-6 py-3 text-center">Recommendations</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="(item, index) in items" :key="item.id">

              <!-- Result Row -->
              <tr class="hover:bg-green-50 transition duration-150">
                <td class="px-6 py-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>

                <!-- Tester -->
                <td class="px-6 py-4">
                  <p class="font-medium text-gray-700">
                    {{ item.User ? item.User.first_name + ' ' + item.User.last_name : '—' }}
                  </p>
                  <p class="text-xs text-gray-400">{{ item.User?.email || '' }}</p>
                </td>

                <!-- Test -->
                <td class="px-6 py-4 font-medium text-gray-700">
                  {{ item.Test?.title || '—' }}
                </td>

                <!-- Score -->
                <td class="px-6 py-4 text-center">
                  <span :class="scoreBadge(item.score)">{{ item.score ?? '—' }}</span>
                </td>

                <!-- Interpretation -->
                <td class="px-6 py-4 max-w-xs">
                  <p class="text-gray-700 font-medium">{{ item.interpretation || '—' }}</p>
                </td>

                <!-- Completed At -->
                <td class="px-6 py-4 text-gray-500 whitespace-nowrap">
                  {{ formatDate(item.completed_at) }}
                </td>

                <!-- Recommendations toggle -->
                <td class="px-6 py-4 text-center">
                  <button
                    v-if="item.recommendations"
                    @click="toggleRecommendation(item.id)"
                    class="text-xs px-3 py-1 rounded-full border transition"
                    :class="expandedResult === item.id
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'border-gray-200 text-gray-500 hover:border-indigo-200 hover:text-indigo-600'"
                  >
                    <i class="fas fa-lightbulb mr-1"></i>
                    {{ expandedResult === item.id ? 'Hide' : 'View' }}
                  </button>
                  <span v-else class="text-xs text-gray-300 italic">—</span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-center space-x-3">
                  <button @click="openDeleteModal(item.id)" title="Delete" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>

              <!-- Recommendations Expanded Row -->
              <tr v-if="expandedResult === item.id" :key="'rec-' + item.id">
                <td colspan="8" class="px-6 py-4 bg-indigo-50/40">
                  <div class="flex items-start gap-3 max-w-3xl">
                    <div class="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="fas fa-lightbulb text-indigo-500 text-xs"></i>
                    </div>
                    <div>
                      <p class="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">
                        Recommendations for {{ item.User?.first_name || 'this tester' }}
                      </p>
                      <p class="text-sm text-gray-700 leading-relaxed">{{ item.recommendations }}</p>
                    </div>
                  </div>
                </td>
              </tr>

            </template>

            <tr v-if="items.length === 0">
              <td colspan="8" class="text-center py-6 text-gray-400 italic">No results found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-4">
      <div v-for="(item, index) in items" :key="item.id" class="bg-white border border-gray-200 rounded-xl shadow p-4">
        <div class="flex justify-between mb-2">
          <div>
            <p class="font-bold text-gray-800">
              {{ item.User ? item.User.first_name + ' ' + item.User.last_name : 'User #' + item.user_id }}
            </p>
            <p class="text-xs text-gray-500">{{ item.Test?.title || 'Test #' + item.test_id }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span :class="scoreBadge(item.score)">{{ item.score ?? '—' }}</span>
            <button @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-700 text-sm">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <p class="text-sm font-medium text-gray-700 mb-1">{{ item.interpretation || '—' }}</p>
        <p class="text-xs text-gray-400 mb-3">{{ formatDate(item.completed_at) }}</p>

        <button
          v-if="item.recommendations"
          @click="toggleRecommendation(item.id)"
          class="text-xs text-indigo-600 underline"
        >
          {{ expandedResult === item.id ? 'Hide Recommendations' : 'Show Recommendations' }}
        </button>
        <div v-if="expandedResult === item.id" class="mt-2 bg-indigo-50 rounded-lg px-3 py-2 text-xs text-gray-700 leading-relaxed">
          {{ item.recommendations }}
        </div>
      </div>
      <p v-if="items.length === 0" class="text-center text-gray-400 py-6 italic">No data found.</p>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-6 text-sm text-gray-600">
      <span>
        Showing {{ (currentPage - 1) * pageSize + 1 }}
        to {{ Math.min(currentPage * pageSize, count) }}
        of {{ count }} total entries
      </span>
      <div class="flex items-center gap-2">
        <button @click="fetchItems(currentPage - 1)" :disabled="currentPage <= 1"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">← Previous</button>
        <span class="px-3 py-1 bg-green-600 text-white rounded-lg font-medium">{{ currentPage }}</span>
        <button @click="fetchItems(currentPage + 1)" :disabled="currentPage * pageSize >= count"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">Next →</button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <delete-confirm-modal
      :visible="deleteModalVisible"
      title="Delete Result"
      message="Are you sure you want to delete this result?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible = false"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { Loading, DeleteConfirmModal },

  data() {
    return {
      items: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
      loading: false,
      deleteModalVisible: false,
      deleteId: null,
      expandedResult: null, // tracks which result has recommendations open
    };
  },

  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;
      try {
        const res = await this.$apiGet('/result', {
          page: this.currentPage,
          page_size: this.pageSize,
          search: this.searchQuery,
        });
        this.items = res.data || [];
        this.count = res.count || 0;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    toggleRecommendation(id) {
      this.expandedResult = this.expandedResult === id ? null : id;
    },

    openDeleteModal(id) { this.deleteId = id; this.deleteModalVisible = true; },

    async confirmDelete() {
      const res = await this.$apiDelete('/result', this.deleteId);
      if (res) this.$root.$refs.toast.showToast('Result deleted successfully', 'success');
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },

    scoreBadge(score) {
      if (score === null || score === undefined)
        return 'px-2 py-0.5 rounded text-gray-400 bg-gray-100 text-xs font-medium';
      if (score >= 80)
        return 'px-2 py-0.5 rounded text-green-700 bg-green-100 text-xs font-medium';
      if (score >= 60)
        return 'px-2 py-0.5 rounded text-amber-700 bg-amber-100 text-xs font-medium';
      return 'px-2 py-0.5 rounded text-red-700 bg-red-100 text-xs font-medium';
    },

    formatDate(date) {
      if (!date) return '—';
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    },
  },

  mounted() { this.fetchItems(); },
};
</script>
