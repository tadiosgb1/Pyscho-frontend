<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">

      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Triat</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- ✅ Category Dropdown -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select v-model="form.category_id" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm">
            <option disabled value="">Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Name -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" />
        </div>

        <!-- Description -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <input v-model="form.description" type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg">
            Add
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
      categories: [], // ✅ store categories from API

      form: {
        category_id: this.data?.category_id || "",
        name: this.data?.name || "",
        description: this.data?.description || ""
      }
    };
  },

  methods: {

    // ✅ Fetch categories from backend
    async fetchCategories() {
      try {
        const params = { page: 1, page_size: 100 };
        const response = await this.$apiGet('/category', params);

        this.categories = response.data; // IMPORTANT
      } catch (e) {
        console.error(e);
      }
    },

    async submitForm() {
      try {
        let res;

        if (!this.data) {
          // CREATE
          res = await this.$apiPost("/triat", this.form);
          if (res) {
            this.$root.$refs.toast.showToast('Added successfully', 'success');
          }
        } else {
          // UPDATE
          res = await this.$apiPut("/triat", this.data.id, this.form);
          if (res) {
            this.$root.$refs.toast.showToast('Updated successfully', 'success');
          }
        }

        this.$emit("saved");
        this.$emit("close");

      } catch (e) {
        console.error(e);
      }
    }
  },

  mounted() {
    this.fetchCategories(); // ✅ load categories when modal opens
  }
};
</script>