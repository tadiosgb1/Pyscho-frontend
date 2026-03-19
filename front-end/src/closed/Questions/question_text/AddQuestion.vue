<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold">Add Question</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Question -->
        <div>
          <label class="block mb-1 font-medium">Question</label>
          <textarea v-model="form.question_text" required
            class="w-full border rounded-lg px-3 py-2"></textarea>
        </div>

        <!-- TYPE -->
        <div>
          <label class="block mb-1 font-medium">Question Type</label>
          <select v-model="form.question_type" required
            class="w-full border rounded-lg px-3 py-2">
            <option disabled value="">Select Type</option>
            <option value="MCQ">MCQ</option>
            <option value="LIKERT">LIKERT</option>
            <option value="Open">Open</option>
          </select>
        </div>

        <!-- MCQ -->
        <div v-if="form.question_type === 'MCQ'">
          <label class="block mb-1 font-medium">Options</label>

          <div v-for="(opt, i) in mcqOptions" :key="i" class="flex gap-2 mb-2">
            <input v-model="mcqOptions[i]" class="w-full border rounded px-2 py-1" />
            <button type="button" @click="removeOption(i)" class="text-red-500">✖</button>
          </div>

          <button type="button" @click="addOption" class="text-green-600 text-sm">
            + Add Option
          </button>
        </div>

        <!-- LIKERT -->
        <div v-if="form.question_type === 'LIKERT'" class="space-y-2">
          <label class="font-medium">Scale</label>

          <div class="flex gap-2">
            <input v-model.number="likert.min" type="number" placeholder="Min"
              class="w-1/2 border rounded px-2 py-1" />
            <input v-model.number="likert.max" type="number" placeholder="Max"
              class="w-1/2 border rounded px-2 py-1" />
          </div>

          <input v-model="likert.labels"
            placeholder="Labels (comma separated)"
            class="w-full border rounded px-2 py-1" />
        </div>

        <!-- OPEN -->
        <div v-if="form.question_type === 'Open'">
          <label class="font-medium">Max Characters</label>
          <input v-model.number="metadata.max_char_limit" type="number"
            class="w-full border rounded px-2 py-1" />
        </div>

        <!-- ANSWER -->
        <div v-if="form.question_type !== 'Open'">
          <label class="block mb-1 font-medium">Correct Answer</label>
          <input v-model="form.correct_answer"
            class="w-full border rounded-lg px-3 py-2" />
        </div>

        <!-- ✅ TEST DROPDOWN -->
        <div>
          <label class="block mb-1 font-medium">Select Test</label>
          <select v-model="form.test_id" required
            class="w-full border rounded-lg px-3 py-2">
            <option disabled value="">Select Test</option>
            <option v-for="test in tests" :key="test.id" :value="test.id">
              {{ test.title }} ({{ test.duration }})
            </option>
          </select>
        </div>

        <!-- ACTIONS -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg">
            Save
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: Object },

  data() {
    return {
      tests: [], // ✅ fetched tests

      form: {
        question_text: "",
        question_type: "",
        options: null,
        correct_answer: "",
        test_id: ""
      },

      mcqOptions: ["", ""],

      likert: {
        min: 1,
        max: 5,
        labels: ""
      },

      metadata: {}
    };
  },

  methods: {
    async fetchTests() {
      try {
        const params = { page: 1, page_size: 100 };
        const response = await this.$apiGet('/test', params);

        this.tests = response.data; // ✅ IMPORTANT
      } catch (e) {
        console.error(e);
      }
    },

    addOption() {
      this.mcqOptions.push("");
    },

    removeOption(i) {
      this.mcqOptions.splice(i, 1);
    },

    async submitForm() {
      try {
        // MCQ
        if (this.form.question_type === "MCQ") {
          this.form.options = this.mcqOptions;
          this.metadata = { weightage: {} };
        }

        // LIKERT
        if (this.form.question_type === "LIKERT") {
          this.form.options = {
            min: this.likert.min,
            max: this.likert.max,
            labels: this.likert.labels.split(",").map(l => l.trim())
          };
          this.metadata = { trait: "Custom" };
        }

        // OPEN
        if (this.form.question_type === "Open") {
          this.form.options = null;
          this.form.correct_answer = "N/A - Manual Review Required";
          this.metadata = {
            max_char_limit: this.metadata.max_char_limit || 500
          };
        }

        const payload = {
          ...this.form,
          metadata: this.metadata
        };

        const res = await this.$apiPost("/question", payload);

        if (res) {
          this.$root.$refs.toast.showToast("Added successfully", "success");
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error(e);
      }
    }
  },

  mounted() {
    this.fetchTests(); // ✅ load tests when modal opens
  }
};
</script>