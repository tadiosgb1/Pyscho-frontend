<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800 relative">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Users..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">User Directory</h1>
      <button @click="openAddModal" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center space-x-1 text-sm">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add User</span>
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input v-model="searchQuery" @input="fetchItems(1)" type="text" placeholder="Search users..."
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
              <th class="px-6 py-3 text-left">Name</th>
              <th class="px-6 py-3 text-left">Email</th>
              <th class="px-6 py-3 text-left">Phone</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in items" :key="item.id" class="hover:bg-green-50 transition duration-150">
              <td class="px-6 py-4">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap font-medium">
                {{ item.first_name }} {{ item.last_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.phone || '—' }}</td>
              <td class="px-6 py-4 text-center space-x-3">
                <button @click="viewDetails(item.id)" title="View Profile" class="text-green-500 hover:text-green-700">
                  <i class="fas fa-eye"></i>
                </button>
                <button @click="openAssignTestModal(item)" title="Assign Test" class="text-purple-500 hover:text-purple-700">
                  <i class="fas fa-clipboard-check"></i>
                </button>
                <button @click="openViewTestsModal(item)" title="View Assigned Tests" class="text-indigo-500 hover:text-indigo-700">
                  <i class="fas fa-list-alt"></i>
                </button>
                <button @click="openRoleModal(item)" title="Assign Role" class="text-amber-500 hover:text-amber-700">
                  <i class="fas fa-user-shield"></i>
                </button>
                <button @click="editItem(item)" title="Edit" class="text-blue-500 hover:text-blue-700">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="openDeleteModal(item.id)" title="Delete" class="text-red-500 hover:text-red-700">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="items.length === 0">
              <td colspan="5" class="text-center py-6 text-gray-400 italic">No data found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-4">
      <div v-for="(item, index) in items" :key="item.id" class="bg-white border border-gray-200 rounded-xl shadow p-4">
        <div class="flex justify-between mb-3">
          <h2 class="font-bold text-gray-800">User #{{ (currentPage - 1) * pageSize + index + 1 }}</h2>
          <div class="flex gap-3 text-sm">
            <button @click="viewDetails(item.id)" title="View Profile" class="text-green-500 hover:text-green-700">
              <i class="fas fa-eye"></i>
            </button>
            <button @click="openAssignTestModal(item)" title="Assign Test" class="text-purple-500 hover:text-purple-700">
              <i class="fas fa-clipboard-check"></i>
            </button>
            <button @click="openViewTestsModal(item)" title="View Assigned Tests" class="text-indigo-500 hover:text-indigo-700">
              <i class="fas fa-list-alt"></i>
            </button>
            <button @click="openRoleModal(item)" title="Assign Role" class="text-amber-500 hover:text-amber-700">
              <i class="fas fa-user-shield"></i>
            </button>
            <button @click="editItem(item)" class="text-blue-500 hover:text-blue-700">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="openDeleteModal(item.id)" class="text-red-500 hover:text-red-700">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-y-1 text-sm text-gray-700">
          <div class="col-span-2">
            <span class="font-medium text-gray-600">Name:</span>
            {{ item.first_name }} {{ item.last_name }}
          </div>
          <div class="col-span-2">
            <span class="font-medium text-gray-600">Email:</span>
            {{ item.email }}
          </div>
          <div class="col-span-2">
            <span class="font-medium text-gray-600">Phone:</span>
            {{ item.phone || '—' }}
          </div>
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

    <!-- Add / Edit Modals -->
    <add-users v-if="showAddUserModal" @close="showAddUserModal = false" @saved="fetchItems" />
    <edit-users v-if="showEditUserModal" :data="selectedItem" @close="showEditUserModal = false" @saved="fetchItems" />

    <!-- Assign Role Modal -->
    <assign-role-modal
      v-if="showAssignRoleModal && selectedItem"
      :user="selectedItem"
      @close="showAssignRoleModal = false"
      @assigned="fetchItems"
    />

    <!-- Assign Test to User Modal -->
    <assign-test-modal
      v-if="showAssignTestModal && selectedItem"
      target-type="user"
      :target-id="selectedItem.id"
      :target-name="selectedItem.first_name + ' ' + selectedItem.last_name"
      @close="showAssignTestModal = false"
      @assigned="showAssignTestModal = false"
    />

    <!-- View Tests Assigned to User Modal -->
    <view-assigned-tests-modal
      v-if="showViewTestsModal && selectedItem"
      target-type="user"
      :target-id="selectedItem.id"
      :target-name="selectedItem.first_name + ' ' + selectedItem.last_name"
      @close="showViewTestsModal = false"
    />

    <!-- Delete Confirmation Modal -->
    <delete-confirm-modal
      :visible="deleteModalVisible"
      title="Delete User"
      message="Are you sure you want to delete this user?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible = false"
    />
  </div>
</template>

<script>
import AddUsers from "./AddUsers.vue";
import EditUsers from "./EditUsers.vue";
import AssignRoleModal from "./AssignRoleModal.vue";
import AssignTestModal from "@/components/AssignTestModal.vue";
import ViewAssignedTestsModal from "@/components/ViewAssignedTestsModal.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddUsers, EditUsers, AssignRoleModal, AssignTestModal, ViewAssignedTestsModal, Loading, DeleteConfirmModal },

  data() {
    return {
      items: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
      selectedItem: null,
      loading: false,
      showAddUserModal: false,
      showEditUserModal: false,
      showAssignRoleModal: false,
      showAssignTestModal: false,
      showViewTestsModal: false,
      deleteModalVisible: false,
      deleteId: null,
    };
  },

  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;
      try {
        const res = await this.$apiGet("/users", {
          page: this.currentPage,
          page_size: this.pageSize,
          search: this.searchQuery,
        });
        this.items = res.data || [];
        this.count = res.count || 0;
      } catch (e) {
        console.error("Fetch users error:", e);
      } finally {
        this.loading = false;
      }
    },

    openAddModal()    { this.selectedItem = null; this.showAddUserModal = true; },
    editItem(user)    { this.selectedItem = user; this.showEditUserModal = true; },
    openRoleModal(user) { this.selectedItem = user; this.showAssignRoleModal = true; },
    openAssignTestModal(user) { this.selectedItem = user; this.showAssignTestModal = true; },
    openViewTestsModal(user)  { this.selectedItem = user; this.showViewTestsModal  = true; },

    viewDetails(id) {
      this.$router.push({ name: "Users-detail", params: { id } });
    },

    openDeleteModal(id) { this.deleteId = id; this.deleteModalVisible = true; },

    async confirmDelete() {
      const res = await this.$apiDelete("/users", this.deleteId);
      if (res) this.$root.$refs.toast.showToast("User removed", "success");
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },
  },

  mounted() { this.fetchItems(); },
};
</script>
