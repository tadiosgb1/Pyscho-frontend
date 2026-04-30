<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Assigned Tests</h2>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="targetType === 'user'">
              <i class="fas fa-user mr-1 text-amber-500"></i>{{ targetName }}
            </span>
            <span v-else>
              <i class="fas fa-users mr-1 text-blue-500"></i>{{ targetName }}
            </span>
          </p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="py-8 text-center text-gray-400">
        <i class="fas fa-spinner animate-spin text-xl"></i>
      </div>

      <!-- List -->
      <div v-else>
        <div v-if="assignments.length === 0" class="py-8 text-center text-gray-400 italic text-xs">
          No tests assigned yet.
        </div>

        <div v-else class="space-y-3 max-h-80 overflow-y-auto">
          <div
            v-for="a in assignments"
            :key="a.id"
            class="flex items-start justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
          >
            <div class="flex-1 min-w-0">
              <p class="font-medium text-gray-800 truncate">{{ a.test?.title || '—' }}</p>
              <p class="text-xs text-gray-400 mt-0.5">
                {{ a.test?.duration || '' }}
                <span v-if="a.due_date" class="ml-2">
                  · Due: {{ formatDate(a.due_date) }}
                </span>
              </p>
              <p v-if="a.notes" class="text-xs text-gray-500 mt-1 italic">{{ a.notes }}</p>
            </div>
            <div class="flex items-center gap-2 ml-3 flex-shrink-0">
              <span :class="statusBadge(a.status)">{{ a.status }}</span>
              <button
                @click="removeAssignment(a.id)"
                :disabled="removingId === a.id"
                title="Remove assignment"
                class="text-red-400 hover:text-red-600 disabled:opacity-40"
              >
                <i v-if="removingId === a.id" class="fas fa-spinner animate-spin text-xs"></i>
                <i v-else class="fas fa-times text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-400 mt-3 text-right">{{ assignments.length }} assignment(s)</p>
      </div>

      <!-- Footer -->
      <div class="flex justify-end mt-4">
        <button @click="$emit('close')"
          class="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-medium transition">
          Close
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    targetType: { type: String, required: true }, // "user" or "group"
    targetId:   { type: Number, required: true },
    targetName: { type: String, default: '' },
  },

  data() {
    return {
      assignments: [],
      loading:     false,
      removingId:  null,
    };
  },

  methods: {
    async fetchAssignments() {
      this.loading = true;
      try {
        const endpoint = this.targetType === 'user'
          ? `/test-assignments/user/${this.targetId}`
          : `/test-assignments/group/${this.targetId}`;
        const res = await this.$apiGet(endpoint);
        this.assignments = res.data || [];
      } catch (e) {
        console.error('Fetch assignments error:', e);
      } finally {
        this.loading = false;
      }
    },

    async removeAssignment(id) {
      this.removingId = id;
      try {
        await this.$apiDelete(`/test-assignments/${id}`);
        this.$root.$refs.toast.showToast('Assignment removed', 'success');
        this.assignments = this.assignments.filter(a => a.id !== id);
      } catch (e) {
        console.error('Remove assignment error:', e);
        this.$root.$refs.toast.showToast('Failed to remove assignment', 'error');
      } finally {
        this.removingId = null;
      }
    },

    statusBadge(status) {
      const map = {
        pending:     'px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700',
        in_progress: 'px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700',
        completed:   'px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700',
        expired:     'px-2 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-600',
      };
      return map[status] || map.pending;
    },

    formatDate(date) {
      if (!date) return '—';
      return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    },
  },

  mounted() {
    this.fetchAssignments();
  },
};
</script>
