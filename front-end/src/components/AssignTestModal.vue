<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Assign Test</h2>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="targetType === 'user'">
              <i class="fas fa-user mr-1 text-amber-500"></i>
              {{ targetName }}
            </span>
            <span v-else>
              <i class="fas fa-users mr-1 text-blue-500"></i>
              {{ targetName }}
            </span>
          </p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <form @submit.prevent="submitAssignment" class="space-y-4">

        <!-- Test selector -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Select Test</label>
          <div v-if="loadingTests" class="text-center py-4 text-gray-400">
            <i class="fas fa-spinner animate-spin"></i>
          </div>
          <div v-else class="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
            <label
              v-for="test in tests"
              :key="test.id"
              class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer"
              :class="selectedTestId === test.id ? 'bg-purple-50' : ''"
            >
              <input
                type="radio"
                :value="test.id"
                v-model="selectedTestId"
                class="w-4 h-4 accent-purple-500"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-700">{{ test.title }}</p>
                <p class="text-xs text-gray-400">{{ test.duration || '' }}</p>
              </div>
              <i v-if="selectedTestId === test.id" class="fas fa-check-circle text-purple-500 flex-shrink-0"></i>
            </label>
            <p v-if="!tests.length" class="text-center py-4 text-gray-400 italic text-xs">No tests available.</p>
          </div>
        </div>

        <!-- Due date -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Due Date <span class="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            v-model="dueDate"
            type="date"
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
        </div>

        <!-- Notes -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            Notes <span class="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            v-model="notes"
            rows="2"
            placeholder="Instructions for the tester..."
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm resize-none"
          ></textarea>
        </div>

        <!-- Email notice -->
        <div class="flex items-start gap-2.5 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-xs text-indigo-700">
          <i class="fas fa-envelope mt-0.5 shrink-0 text-indigo-400"></i>
          <span>
            A notification email with a <strong>secure one-time login link</strong> will be sent automatically to
            {{ targetType === 'group' ? 'all members of this group' : 'this user' }}.
            The link expires in <strong>48 hours</strong> and includes the test name, duration, and due date.
          </span>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading || !selectedTestId"
            class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            {{ loading ? 'Assigning...' : 'Assign Test' }}
          </button>
        </div>

      </form>
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
      tests:          [],
      selectedTestId: null,
      dueDate:        '',
      notes:          '',
      loading:        false,
      loadingTests:   false,
    };
  },

  methods: {
    async fetchTests() {
      this.loadingTests = true;
      try {
        const res = await this.$apiGet('/test', { page_size: 100 });
        this.tests = res.data || [];
      } catch (e) {
        console.error('Fetch tests error:', e);
      } finally {
        this.loadingTests = false;
      }
    },

    async submitAssignment() {
      if (!this.selectedTestId) return;
      this.loading = true;
      try {
        await this.$apiPost('/test-assignments', {
          test_id:          this.selectedTestId,
          assigned_to_type: this.targetType,
          assigned_to_id:   this.targetId,
          assigned_by:      parseInt(localStorage.getItem('userId')),
          due_date:         this.dueDate || null,
          notes:            this.notes   || null,
        });
        this.$root.$refs.toast.showToast('Test assigned successfully', 'success');
        this.$emit('assigned');
        this.$emit('close');
      } catch (e) {
        console.error('Assign test error:', e);
        this.$root.$refs.toast.showToast(
          e?.message || 'Failed to assign test',
          'error'
        );
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.fetchTests();
  },
};
</script>
