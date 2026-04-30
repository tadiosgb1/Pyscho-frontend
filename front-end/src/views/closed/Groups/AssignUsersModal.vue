<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Add Users to Group</h2>
          <p class="text-xs text-gray-500 mt-0.5">Group: {{ group.name }}</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Search users -->
      <div class="mb-3">
        <input
          v-model="userSearch"
          @input="fetchUsers"
          type="text"
          placeholder="Search users by name or email..."
          class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
        />
      </div>

      <!-- User list -->
      <div class="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-64 overflow-y-auto mb-4">
        <div v-if="loadingUsers" class="py-6 text-center text-gray-400">
          <i class="fas fa-spinner animate-spin"></i>
        </div>

        <label
          v-for="user in users"
          :key="user.id"
          class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
        >
          <input
            type="checkbox"
            :value="user.id"
            v-model="selectedUserIds"
            class="w-4 h-4 accent-green-500"
          />
          <div>
            <p class="text-sm font-medium text-gray-700">
              {{ user.first_name }} {{ user.last_name }}
            </p>
            <p class="text-xs text-gray-400">{{ user.email }}</p>
          </div>
        </label>

        <p v-if="!loadingUsers && users.length === 0" class="text-center py-4 text-gray-400 italic text-xs">
          No users found.
        </p>
      </div>

      <!-- Selected count -->
      <p class="text-xs text-gray-500 mb-4">
        {{ selectedUserIds.length }} user(s) selected
      </p>

      <!-- Actions -->
      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="assignUsers"
          :disabled="loading || selectedUserIds.length === 0"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
        >
          <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
          {{ loading ? 'Adding...' : 'Add to Group' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: { type: Object, required: true },
  },

  data() {
    return {
      users: [],
      selectedUserIds: [],
      userSearch: '',
      loadingUsers: false,
      loading: false,
    };
  },

  methods: {
    async fetchUsers() {
      this.loadingUsers = true;
      try {
        const res = await this.$apiGet('/users', { page_size: 100, search: this.userSearch });
        this.users = res.data || [];
      } catch (e) {
        console.error('Fetch users error:', e);
      } finally {
        this.loadingUsers = false;
      }
    },

    async assignUsers() {
      if (this.selectedUserIds.length === 0) return;
      this.loading = true;
      try {
        await this.$apiPost('/user-groups/bulk', {
          groupId: this.group.id,
          userIds: this.selectedUserIds,
        });
        this.$root.$refs.toast.showToast(
          `${this.selectedUserIds.length} user(s) added to ${this.group.name}`,
          'success'
        );
        this.$emit('assigned');
        this.$emit('close');
      } catch (e) {
        console.error('Assign users error:', e);
        this.$root.$refs.toast.showToast('Failed to add users to group', 'error');
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>
