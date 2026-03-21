<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Question</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Question -->
        <div>
          <label class="block mb-1 font-medium">Question</label>
          <textarea v-model="form.question_text" required
            class="w-full border rounded-lg px-3 py-2"></textarea>
        </div>

        <!-- Category -->
        <div>
          <label class="block mb-1 font-medium">Category</label>
          <select v-model="form.category_id" @change="onCategoryChange" required
            class="w-full border rounded-lg px-3 py-2">
            <option disabled value="">Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Test -->
        <div>
          <label class="block mb-1 font-medium">Test</label>
          <select v-model="form.test_id" required
            class="w-full border rounded-lg px-3 py-2">
            <option disabled value="">Select Test</option>
            <option v-for="test in tests" :key="test.id" :value="test.id">
              {{ test.title }}
            </option>
          </select>
        </div>

        <!-- Type -->
        <div>
          <label class="block mb-1 font-medium">Type</label>
          <select v-model="form.type" required
            class="w-full border rounded-lg px-3 py-2">
            <option value="multiple">Multiple Choice</option>
            <option value="likert">Likert Scale</option>
            <option value="open">Open</option>
          </select>
        </div>

        <!-- ===================== -->
        <!-- MCQ + LIKERT OPTIONS -->
        <!-- ===================== -->
        <div v-if="form.type !== 'open'">
          <label class="block mb-2 font-medium">Options</label>

          <div v-for="(opt, i) in options" :key="i" class="flex gap-2 mb-2">

            <!-- Text -->
            <input v-model="opt.text"
              placeholder="Option Text (e.g. A, Strongly Agree)"
              class="w-1/3 border rounded px-2 py-1" />

            <!-- Triat -->
            <select v-model="opt.triat_id"
              class="w-1/3 border rounded px-2 py-1">
              <option disabled value="">Select Triat</option>
              <option v-for="t in triats" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>

            <!-- Weight -->
            <input v-model.number="opt.weight" type="number"
              placeholder="Weight"
              class="w-1/6 border rounded px-2 py-1" />

            <!-- Position -->
            <input v-model.number="opt.position" type="number"
              class="w-1/6 border rounded px-2 py-1" />

            <button type="button" @click="removeOption(i)" class="text-red-500">✖</button>
          </div>

          <button type="button" @click="addOption" class="text-green-600 text-sm">
            + Add Option
          </button>
        </div>

        <!-- ===================== -->
        <!-- OPEN QUESTION -->
        <!-- ===================== -->
        <div v-if="form.type === 'open'">
          <label class="block mb-1 font-medium">Weight</label>
          <input v-model.number="form.weight" type="number"
            class="w-full border rounded px-3 py-2" />
        </div>

        <!-- Actions -->
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
  data() {
    return {
      tests: [],
      categories: [],
      triats: [],

      form: {
        question_text: "",
        type: "multiple",
        category_id: "",
        test_id: "",
        weight: 0
      },

      options: [
        { text: "", triat_id: "", weight: 1, position: 1 },
        { text: "", triat_id: "", weight: 1, position: 2 }
      ]
    };
  },

  methods: {
    async fetchTests() {
      const res = await this.$apiGet("/test", { page: 1, page_size: 100 });
      this.tests = res.data;
    },

    async fetchCategories() {
      const res = await this.$apiGet("/category", { page: 1, page_size: 100 });
      this.categories = res.data;
    },

    onCategoryChange() {
      const selected = this.categories.find(c => c.id === this.form.category_id);
      this.triats = selected?.Triats || [];
    },

    addOption() {
      this.options.push({
        text: "",
        triat_id: "",
        weight: 1,
        position: this.options.length + 1
      });
    },

    removeOption(i) {
      this.options.splice(i, 1);
      this.options.forEach((o, idx) => o.position = idx + 1);
    },

    async submitForm() {
      try {
        let payload = { ...this.form };

        if (this.form.type !== "open") {
          payload.options = this.options;
        }

        console.log("FINAL PAYLOAD", payload);

        const res = await this.$apiPost("/question", payload);

        if (res) {
          this.$root.$refs.toast.showToast("Question added successfully", "success");
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error(e);
      }
    }
  },

  mounted() {
    this.fetchTests();
    this.fetchCategories();
  }
};
</script>