
<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Test Details..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <div>
        <h1 class="text-lg font-bold text-gray-800">{{ item.title }}</h1>
        <p class="text-xs text-gray-500 mt-0.5">{{ item.description }}</p>
      </div>
      <button @click="$router.back()" class="text-gray-600 hover:text-gray-800 text-sm">
        <i class="fas fa-arrow-left mr-2"></i>Back
      </button>
    </div>

    <!-- Test Info Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <i class="fas fa-clock text-blue-500"></i>
          </div>
          <div>
            <p class="text-xs text-gray-500">Duration</p>
            <p class="text-base font-bold text-gray-800">{{ item.duration || '—' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <i class="fas fa-users text-green-500"></i>
          </div>
          <div>
            <p class="text-xs text-gray-500">Total Test-Takers</p>
            <p class="text-base font-bold text-gray-800">{{ testTakers.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <i class="fas fa-check-circle text-purple-500"></i>
          </div>
          <div>
            <p class="text-xs text-gray-500">Completed</p>
            <p class="text-base font-bold text-gray-800">{{ completedCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <i class="fas fa-hourglass-half text-amber-500"></i>
          </div>
          <div>
            <p class="text-xs text-gray-500">Pending</p>
            <p class="text-base font-bold text-gray-800">{{ pendingCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Filter:</label>
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="currentFilter = filter.value"
            class="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
            :class="currentFilter === filter.value
              ? 'bg-green-500 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'"
          >
            {{ filter.label }} ({{ filter.count }})
          </button>
        </div>
        
        <div class="ml-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or email..."
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
    </div>

    <!-- Test Takers Table -->
    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-sm font-semibold text-gray-700">
          {{ currentFilterLabel }} ({{ filteredTestTakers.length }})
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">Tester</th>
              <th class="px-6 py-3 text-center">Assignment Status</th>
              <th class="px-6 py-3 text-center">Test Status</th>
              <th class="px-6 py-3 text-center">Score</th>
              <th class="px-6 py-3 text-left">Due Date</th>
              <th class="px-6 py-3 text-left">Completed At</th>
              <th class="px-6 py-3 text-left">Interpretation</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(taker, index) in filteredTestTakers" :key="taker.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">{{ index + 1 }}</td>
              
              <td class="px-6 py-4">
                <p class="font-medium text-gray-700">{{ taker.userName }}</p>
                <p class="text-xs text-gray-400">{{ taker.userEmail }}</p>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span :class="assignmentStatusBadge(taker.assignmentStatus)">
                  {{ formatAssignmentStatus(taker.assignmentStatus) }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span :class="testStatusBadge(taker.testStatus)">
                  {{ formatTestStatus(taker.testStatus) }}
                </span>
              </td>
              
              <td class="px-6 py-4 text-center">
                <span v-if="taker.score !== null" :class="scoreBadge(taker.score)">
                  {{ taker.score }}
                </span>
                <span v-else class="text-gray-400 text-xs">—</span>
              </td>
              
              <td class="px-6 py-4 text-gray-500 text-xs">
                <span v-if="taker.dueDate" :class="dueDateClass(taker.dueDate)">
                  {{ formatDate(taker.dueDate) }}
                </span>
                <span v-else class="text-gray-400">—</span>
              </td>
              
              <td class="px-6 py-4 text-gray-500 text-xs">
                {{ formatDate(taker.completedAt) }}
              </td>
              
              <td class="px-6 py-4 max-w-xs">
                <p class="text-gray-600 text-xs truncate">{{ taker.interpretation || '—' }}</p>
              </td>
              
              <td class="px-6 py-4 text-center space-x-2">
                <button 
                  v-if="taker.resultId && taker.resultStatus === 'pending'"
                  @click="confirmResult(taker.resultId)"
                  title="Confirm Result"
                  class="text-green-500 hover:text-green-700">
                  <i class="fas fa-check-circle"></i>
                </button>
                <button 
                  v-if="taker.resultId"
                  @click="viewResult(taker.resultId)"
                  title="View Full Result"
                  class="text-blue-500 hover:text-blue-700">
                  <i class="fas fa-eye"></i>
                </button>
                <button 
                  v-if="taker.progressId"
                  @click="viewProgress(taker.progressId)"
                  title="View Progress"
                  class="text-purple-500 hover:text-purple-700">
                  <i class="fas fa-chart-line"></i>
                </button>
              </td>
            </tr>
            
            <tr v-if="filteredTestTakers.length === 0">
              <td colspan="9" class="text-center py-8 text-gray-400 italic">
                {{ emptyMessage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  components: { Loading },
  
  data() {
    return {
      item: {},
      testTakers: [],
      assignments: [],
      loading: false,
      currentFilter: 'all',
      searchQuery: '',
    };
  },

  computed: {
    filters() {
      return [
        { value: 'all', label: 'All', count: this.testTakers.length },
        { value: 'assigned', label: 'Assigned', count: this.testTakers.filter(t => t.assignmentStatus === 'assigned').length },
        { value: 'completed', label: 'Completed', count: this.testTakers.filter(t => t.testStatus === 'completed').length },
        { value: 'pending', label: 'Pending Approval', count: this.testTakers.filter(t => t.resultStatus === 'pending').length },
        { value: 'not_taken', label: 'Not Taken', count: this.testTakers.filter(t => t.testStatus === 'not_taken').length },
      ];
    },

    currentFilterLabel() {
      const filter = this.filters.find(f => f.value === this.currentFilter);
      return filter ? filter.label : 'All';
    },

    filteredTestTakers() {
      let filtered = this.testTakers;

      // Apply status filter
      if (this.currentFilter === 'assigned') {
        filtered = filtered.filter(t => t.assignmentStatus === 'assigned');
      } else if (this.currentFilter === 'completed') {
        filtered = filtered.filter(t => t.testStatus === 'completed');
      } else if (this.currentFilter === 'pending') {
        filtered = filtered.filter(t => t.resultStatus === 'pending');
      } else if (this.currentFilter === 'not_taken') {
        filtered = filtered.filter(t => t.testStatus === 'not_taken');
      }

      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(t =>
          t.userName.toLowerCase().includes(query) ||
          t.userEmail.toLowerCase().includes(query)
        );
      }

      return filtered;
    },

    emptyMessage() {
      if (this.searchQuery) {
        return 'No test-takers match your search.';
      }
      if (this.currentFilter === 'all') {
        return 'No one has been assigned this test yet.';
      }
      if (this.currentFilter === 'assigned') {
        return 'No users are currently assigned to this test.';
      }
      if (this.currentFilter === 'completed') {
        return 'No one has completed this test yet.';
      }
      if (this.currentFilter === 'pending') {
        return 'No results are pending approval.';
      }
      if (this.currentFilter === 'not_taken') {
        return 'All assigned users have taken this test.';
      }
      return 'No data available.';
    },

    completedCount() {
      return this.testTakers.filter(t => t.testStatus === 'completed').length;
    },
    
    pendingCount() {
      return this.testTakers.filter(t => t.resultStatus === 'pending').length;
    },
  },

  methods: {
    async fetchTestDetails() {
      const id = this.$route.params.id;
      try {
        const response = await this.$apiGetById('/test', id);
        this.item = response || {};
      } catch (error) {
        console.error('Fetch test error:', error);
      }
    },

    async fetchTestTakers() {
      const testId = parseInt(this.$route.params.id);
      
      try {
        // Fetch all assignments, results, and progress for this test
        const [assignmentsRes, resultsRes, progressRes] = await Promise.all([
          this.$apiGet('/test-assignments', { page: 1, page_size: 1000 }),
          this.$apiGet('/result', { page: 1, page_size: 1000 }),
          this.$apiGet('/progress', { page: 1, page_size: 1000 })
        ]);

        const allAssignments = assignmentsRes.data || [];
        const allResults = resultsRes.data || [];
        const allProgress = progressRes.data || [];

        // Filter by this test
        const testAssignments = allAssignments.filter(a => a.test_id === testId);
        const testResults = allResults.filter(r => r.test_id === testId);
        const testProgress = allProgress.filter(p => p.test_id === testId);

        // Create a map of test takers
        const takersMap = new Map();

        // Add from assignments (all assigned users)
        testAssignments.forEach(assignment => {
          const userId = assignment.user_id;
          if (!takersMap.has(userId)) {
            takersMap.set(userId, {
              id: userId,
              userName: assignment.User ? `${assignment.User.first_name} ${assignment.User.last_name}` : 'Unknown',
              userEmail: assignment.User?.email || '',
              assignmentStatus: 'assigned',
              assignmentId: assignment.id,
              dueDate: assignment.due_date,
              testStatus: 'not_taken',
              resultStatus: null,
              score: null,
              completedAt: null,
              interpretation: null,
              resultId: null,
              progressId: null,
            });
          }
        });

        // Update with results (who completed the test)
        testResults.forEach(result => {
          const userId = result.user_id;
          if (takersMap.has(userId)) {
            const taker = takersMap.get(userId);
            taker.testStatus = 'completed';
            taker.resultStatus = result.status || 'pending';
            taker.score = result.score;
            taker.completedAt = result.completed_at;
            taker.interpretation = result.interpretation;
            taker.resultId = result.id;
          } else {
            // User took test but wasn't assigned (shouldn't happen, but handle it)
            takersMap.set(userId, {
              id: userId,
              userName: result.User ? `${result.User.first_name} ${result.User.last_name}` : 'Unknown',
              userEmail: result.User?.email || '',
              assignmentStatus: 'not_assigned',
              assignmentId: null,
              dueDate: null,
              testStatus: 'completed',
              resultStatus: result.status || 'pending',
              score: result.score,
              completedAt: result.completed_at,
              interpretation: result.interpretation,
              resultId: result.id,
              progressId: null,
            });
          }
        });

        // Update with progress (for those who started but may not have results yet)
        testProgress.forEach(progress => {
          const userId = progress.user_id;
          if (takersMap.has(userId)) {
            const taker = takersMap.get(userId);
            taker.progressId = progress.id;
            if (taker.testStatus === 'not_taken') {
              taker.testStatus = 'in_progress';
            }
          }
        });

        this.testTakers = Array.from(takersMap.values());
      } catch (error) {
        console.error('Fetch test takers error:', error);
      }
    },

    async confirmResult(resultId) {
      try {
        await this.$apiPut(`/result/${resultId}/status`, { status: 'confirmed' });
        this.$root.$refs.toast?.showToast('Result confirmed successfully', 'success');
        this.fetchTestTakers();
      } catch (e) {
        console.error('Confirm error:', e);
        this.$root.$refs.toast?.showToast('Failed to confirm result', 'error');
      }
    },

    viewResult(resultId) {
      this.$router.push({ name: 'Result-detail', params: { id: resultId } });
    },

    viewProgress(progressId) {
      this.$router.push({ name: 'Progress-detail', params: { id: progressId } });
    },

    scoreBadge(score) {
      if (score === null || score === undefined) return 'px-2 py-0.5 rounded text-gray-400 bg-gray-100 text-xs font-medium';
      if (score >= 80) return 'px-2 py-0.5 rounded text-green-700 bg-green-100 text-xs font-medium';
      if (score >= 60) return 'px-2 py-0.5 rounded text-amber-700 bg-amber-100 text-xs font-medium';
      return 'px-2 py-0.5 rounded text-red-700 bg-red-100 text-xs font-medium';
    },

    statusBadge(status) {
      const badges = {
        confirmed: 'px-2 py-0.5 rounded-full text-green-700 bg-green-100 text-xs font-semibold',
        pending: 'px-2 py-0.5 rounded-full text-amber-700 bg-amber-100 text-xs font-semibold',
        in_progress: 'px-2 py-0.5 rounded-full text-blue-700 bg-blue-100 text-xs font-semibold',
      };
      return badges[status] || 'px-2 py-0.5 rounded-full text-gray-600 bg-gray-100 text-xs font-semibold';
    },

    assignmentStatusBadge(status) {
      const badges = {
        assigned: 'px-2 py-0.5 rounded-full text-blue-700 bg-blue-100 text-xs font-semibold',
        not_assigned: 'px-2 py-0.5 rounded-full text-gray-600 bg-gray-100 text-xs font-semibold',
      };
      return badges[status] || 'px-2 py-0.5 rounded-full text-gray-600 bg-gray-100 text-xs font-semibold';
    },

    testStatusBadge(status) {
      const badges = {
        completed: 'px-2 py-0.5 rounded-full text-green-700 bg-green-100 text-xs font-semibold',
        in_progress: 'px-2 py-0.5 rounded-full text-blue-700 bg-blue-100 text-xs font-semibold',
        not_taken: 'px-2 py-0.5 rounded-full text-gray-600 bg-gray-100 text-xs font-semibold',
      };
      return badges[status] || 'px-2 py-0.5 rounded-full text-gray-600 bg-gray-100 text-xs font-semibold';
    },

    formatStatus(status) {
      const labels = {
        confirmed: 'Confirmed',
        pending: 'Pending',
        in_progress: 'In Progress',
      };
      return labels[status] || '—';
    },

    formatAssignmentStatus(status) {
      const labels = {
        assigned: 'Assigned',
        not_assigned: 'Not Assigned',
      };
      return labels[status] || '—';
    },

    formatTestStatus(status) {
      const labels = {
        completed: 'Completed',
        in_progress: 'In Progress',
        not_taken: 'Not Taken',
      };
      return labels[status] || '—';
    },

    dueDateClass(dueDate) {
      if (!dueDate) return '';
      const now = new Date();
      const due = new Date(dueDate);
      const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
      
      if (daysLeft < 0) return 'text-red-600 font-semibold';
      if (daysLeft <= 3) return 'text-amber-600 font-semibold';
      return 'text-gray-600';
    },

    formatDate(date) {
      if (!date) return '—';
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  },

  async mounted() {
    this.loading = true;
    await Promise.all([
      this.fetchTestDetails(),
      this.fetchTestTakers()
    ]);
    this.loading = false;
  },
};
</script>
