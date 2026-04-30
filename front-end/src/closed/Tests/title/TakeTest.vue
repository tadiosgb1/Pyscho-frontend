<template>
  <div class="min-h-screen bg-gray-50 text-sm text-gray-800">

    <!-- ===================== LOADING ===================== -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <i class="fas fa-spinner animate-spin text-3xl text-green-500 mb-4"></i>
        <p class="text-gray-500">Loading test questions...</p>
      </div>
    </div>

    <!-- ===================== SUBMITTED ===================== -->
    <div v-else-if="submitted" class="flex items-center justify-center min-h-screen p-6">
      <div class="bg-white rounded-2xl border border-gray-200 shadow-lg p-10 max-w-md w-full text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-green-500 text-3xl"></i>
        </div>
        <h2 class="text-xl font-bold text-gray-800 mb-2">Test Submitted!</h2>
        <p class="text-gray-500 mb-2">You answered <strong>{{ answeredCount }}</strong> of <strong>questions.length</strong> questions.</p>
        <p class="text-gray-500 mb-6">Your responses have been recorded successfully.</p>
        <button @click="$router.push({ name: 'Test-view' })"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium transition">
          Back to Tests
        </button>
      </div>
    </div>

    <!-- ===================== TEST UI ===================== -->
    <div v-else class="flex h-screen overflow-hidden">

      <!-- LEFT: Question Panel -->
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- Top Bar -->
        <div class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 class="font-bold text-gray-800 text-base">{{ test.title }}</h1>
            <p class="text-xs text-gray-400">{{ test.description }}</p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Timer -->
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
              :class="timerWarning ? 'border-red-200 bg-red-50 text-red-600' : 'border-gray-200 bg-gray-50 text-gray-600'">
              <i class="fas fa-clock text-xs"></i>
              <span class="font-mono font-bold text-sm">{{ formattedTime }}</span>
            </div>
            <!-- Progress -->
            <div class="text-xs text-gray-500">
              <span class="font-semibold text-green-600">{{ answeredCount }}</span> / {{ questions.length }} answered
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="h-1 bg-gray-100 flex-shrink-0">
          <div class="h-1 bg-green-500 transition-all duration-300"
            :style="{ width: progressPercent + '%' }"></div>
        </div>

        <!-- Question Content -->
        <div class="flex-1 overflow-y-auto p-6">
          <div v-if="currentQuestion" class="max-w-2xl mx-auto">

            <!-- Question Header -->
            <div class="flex items-start gap-3 mb-6">
              <div class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {{ currentIndex + 1 }}
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                    :class="typeBadge(currentQuestion.type)">
                    {{ currentQuestion.type }}
                  </span>
                  <span v-if="isFlagged(currentQuestion.id)" class="text-[10px] text-amber-600 font-semibold">
                    <i class="fas fa-flag mr-1"></i>Flagged
                  </span>
                </div>
                <p class="text-base font-medium text-gray-800 leading-relaxed">
                  {{ currentQuestion.question_text }}
                </p>
              </div>
            </div>

            <!-- Options — Multiple / Likert -->
            <div v-if="currentQuestion.type !== 'open'" class="space-y-3">
              <label
                v-for="opt in sortedOptions(currentQuestion)"
                :key="opt.id"
                class="flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all"
                :class="answers[currentQuestion.id] === opt.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'"
              >
                <input
                  type="radio"
                  :name="'q-' + currentQuestion.id"
                  :value="opt.id"
                  v-model="answers[currentQuestion.id]"
                  class="w-4 h-4 accent-green-500"
                />
                <span class="text-sm text-gray-700">{{ opt.text }}</span>
                <span v-if="answers[currentQuestion.id] === opt.id" class="ml-auto text-green-500">
                  <i class="fas fa-check-circle"></i>
                </span>
              </label>
            </div>

            <!-- Open Text -->
            <div v-else>
              <textarea
                v-model="openAnswers[currentQuestion.id]"
                rows="5"
                placeholder="Write your answer here..."
                class="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              ></textarea>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex items-center justify-between mt-8">
              <button
                @click="prevQuestion"
                :disabled="currentIndex === 0"
                class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <i class="fas fa-arrow-left text-xs"></i> Previous
              </button>

              <div class="flex items-center gap-3">
                <!-- Flag -->
                <button
                  @click="toggleFlag(currentQuestion.id)"
                  class="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition"
                  :class="isFlagged(currentQuestion.id)
                    ? 'border-amber-300 bg-amber-50 text-amber-600'
                    : 'border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-500'"
                >
                  <i class="fas fa-flag text-xs"></i>
                  {{ isFlagged(currentQuestion.id) ? 'Unflag' : 'Flag' }}
                </button>

                <!-- Clear -->
                <button
                  v-if="answers[currentQuestion.id] || openAnswers[currentQuestion.id]"
                  @click="clearAnswer(currentQuestion.id)"
                  class="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 hover:border-red-300 hover:text-red-500 transition"
                >
                  <i class="fas fa-times text-xs"></i> Clear
                </button>
              </div>

              <button
                v-if="currentIndex < questions.length - 1"
                @click="nextQuestion"
                class="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
              >
                Next <i class="fas fa-arrow-right text-xs"></i>
              </button>
              <button
                v-else
                @click="confirmSubmit"
                class="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
              >
                <i class="fas fa-paper-plane text-xs"></i> Submit Test
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- RIGHT: Question Navigator -->
      <div class="w-64 bg-white border-l border-gray-200 flex flex-col flex-shrink-0 hidden lg:flex">
        <div class="px-4 py-3 border-b border-gray-200">
          <h3 class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Question Navigator</h3>
        </div>

        <div class="flex-1 overflow-y-auto p-4">
          <!-- Legend -->
          <div class="flex flex-wrap gap-2 mb-4 text-[10px] text-gray-500">
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-green-500 inline-block"></span> Answered</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-amber-400 inline-block"></span> Flagged</span>
            <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-gray-200 inline-block"></span> Not answered</span>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-5 gap-1.5">
            <button
              v-for="(q, i) in questions"
              :key="q.id"
              @click="goToQuestion(i)"
              class="w-9 h-9 rounded-lg text-xs font-bold transition-all border-2"
              :class="navButtonClass(q, i)"
            >
              {{ i + 1 }}
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="p-4 border-t border-gray-200">
          <div class="text-xs text-gray-500 mb-3 text-center">
            {{ answeredCount }} of {{ questions.length }} answered
          </div>
          <button
            @click="confirmSubmit"
            class="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>

    <!-- ===================== CONFIRM SUBMIT MODAL ===================== -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <i class="fas fa-exclamation-triangle text-amber-500"></i>
          </div>
          <h3 class="font-bold text-gray-800">Submit Test?</h3>
        </div>
        <p class="text-sm text-gray-600 mb-2">
          You have answered <strong>{{ answeredCount }}</strong> of <strong>{{ questions.length }}</strong> questions.
        </p>
        <p v-if="unansweredCount > 0" class="text-sm text-amber-600 mb-2">
          <i class="fas fa-exclamation-circle mr-1"></i>
          {{ unansweredCount }} question(s) are unanswered.
        </p>
        <p v-if="flaggedCount > 0" class="text-sm text-amber-600 mb-4">
          <i class="fas fa-flag mr-1"></i>
          {{ flaggedCount }} question(s) are flagged for review.
        </p>
        <div class="flex gap-3 mt-4">
          <button @click="showConfirmModal = false"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            Review
          </button>
          <button @click="submitTest" :disabled="submitting"
            class="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center justify-center gap-2">
            <i v-if="submitting" class="fas fa-spinner animate-spin text-xs"></i>
            {{ submitting ? 'Submitting...' : 'Confirm Submit' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TakeTest',

  data() {
    return {
      test: {},
      questions: [],
      loading: true,
      submitted: false,
      submitting: false,
      showConfirmModal: false,

      currentIndex: 0,
      answers: {},       // { questionId: optionId }
      openAnswers: {},   // { questionId: text }
      flagged: new Set(),

      // timer
      totalSeconds: 0,
      remainingSeconds: 0,
      timerInterval: null,
    };
  },

  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || null;
    },

    answeredCount() {
      return this.questions.filter(q =>
        q.type === 'open'
          ? !!this.openAnswers[q.id]?.trim()
          : this.answers[q.id] != null
      ).length;
    },

    unansweredCount() {
      return this.questions.length - this.answeredCount;
    },

    flaggedCount() {
      return this.flagged.size;
    },

    progressPercent() {
      if (!this.questions.length) return 0;
      return Math.round((this.answeredCount / this.questions.length) * 100);
    },

    formattedTime() {
      const m = Math.floor(this.remainingSeconds / 60);
      const s = this.remainingSeconds % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    },

    timerWarning() {
      return this.remainingSeconds <= 60 && this.remainingSeconds > 0;
    },
  },

  methods: {
    async fetchTest() {
      const id = this.$route.params.id;
      try {
        const res = await this.$apiGetById('/test', id);
        this.test = res || {};

        // Parse duration (e.g. "30" minutes or "30min")
        const raw = parseInt(this.test.duration) || 30;
        this.totalSeconds = raw * 60;
        this.remainingSeconds = this.totalSeconds;
      } catch (e) {
        console.error('Fetch test error:', e);
      }
    },

    async fetchQuestions() {
      const id = this.$route.params.id;
      try {
        const res = await this.$apiGet('/question', { test_id: id, page_size: 200 });
        this.questions = res.data || [];
      } catch (e) {
        console.error('Fetch questions error:', e);
      }
    },

    sortedOptions(question) {
      return [...(question.Options || [])].sort((a, b) => a.position - b.position);
    },

    typeBadge(type) {
      const map = {
        multiple: 'bg-blue-50 text-blue-700',
        likert:   'bg-amber-50 text-amber-700',
        open:     'bg-gray-100 text-gray-600',
      };
      return map[type] || map.open;
    },

    navButtonClass(q, i) {
      const isActive   = i === this.currentIndex;
      const isAnswered = q.type === 'open'
        ? !!this.openAnswers[q.id]?.trim()
        : this.answers[q.id] != null;
      const isFlagged  = this.flagged.has(q.id);

      if (isActive)   return 'border-green-500 bg-green-500 text-white';
      if (isFlagged)  return 'border-amber-400 bg-amber-50 text-amber-700';
      if (isAnswered) return 'border-green-300 bg-green-50 text-green-700';
      return 'border-gray-200 bg-white text-gray-500 hover:border-green-300';
    },

    isFlagged(id) {
      return this.flagged.has(id);
    },

    toggleFlag(id) {
      if (this.flagged.has(id)) {
        this.flagged.delete(id);
      } else {
        this.flagged.add(id);
      }
      // trigger reactivity
      this.flagged = new Set(this.flagged);
    },

    clearAnswer(id) {
      delete this.answers[id];
      delete this.openAnswers[id];
      this.answers = { ...this.answers };
      this.openAnswers = { ...this.openAnswers };
    },

    goToQuestion(i) {
      this.currentIndex = i;
    },

    prevQuestion() {
      if (this.currentIndex > 0) this.currentIndex--;
    },

    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) this.currentIndex++;
    },

    confirmSubmit() {
      this.showConfirmModal = true;
    },

    async submitTest() {
      this.submitting = true;
      const userId = parseInt(localStorage.getItem('userId'));
      const now = new Date().toISOString();

      try {
        // Build answer payloads
        const payloads = [];

        this.questions.forEach(q => {
          if (q.type === 'open') {
            const text = this.openAnswers[q.id]?.trim();
            if (text) {
              payloads.push({
                user_id:     userId,
                question_id: q.id,
                answer_text: text,
                submited_at: now,
              });
            }
          } else {
            const optionId = this.answers[q.id];
            if (optionId != null) {
              payloads.push({
                user_id:     userId,
                question_id: q.id,
                option_id:   optionId,
                submited_at: now,
              });
            }
          }
        });

        // Submit all answers
        await Promise.all(payloads.map(p => this.$apiPost('/answer', p)));

        // Save progress record
        await this.$apiPost('/progress', {
          user_id:  userId,
          test_id:  this.test.id,
          score:    0, // scoring can be computed server-side later
          taken_at: now,
        });

        this.stopTimer();
        this.showConfirmModal = false;
        this.submitted = true;

        this.$root.$refs.toast?.showToast('Test submitted successfully!', 'success');
      } catch (e) {
        console.error('Submit error:', e);
        this.$root.$refs.toast?.showToast('Failed to submit test', 'error');
      } finally {
        this.submitting = false;
      }
    },

    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.remainingSeconds <= 0) {
          this.stopTimer();
          this.submitTest(); // auto-submit on timeout
          return;
        }
        this.remainingSeconds--;
      }, 1000);
    },

    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },
  },

  async mounted() {
    this.loading = true;
    await Promise.all([this.fetchTest(), this.fetchQuestions()]);
    this.loading = false;
    this.startTimer();
  },

  beforeUnmount() {
    this.stopTimer();
  },
};
</script>
