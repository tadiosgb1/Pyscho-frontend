<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <div>
          <h2 class="text-lg font-semibold text-gray-800">Add Group</h2>
          <p v-if="organization" class="text-xs text-gray-500 mt-0.5">Organization: {{ organization.name }}</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Organization dropdown — only shown when not pre-set -->
        <div v-if="!organization">
          <label class="block mb-1 text-sm font-medium text-gray-700">Organization</label>
          <select v-model="form._id" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm">
            <option disabled value="">Select Organization</option>
            <option v-for="org in organizations" :key="org.id" :value="org.id">{{ org.name }}</option>
          </select>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <input v-model="form.description" type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="submit" :disabled="loading" class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2">
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            {{ loading ? 'Saving...' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data:         { type: Object, default: null },
    organization: { type: Object, default: null }, // pre-set when opened from OrganizationView
  },
  data() {
    return {
      loading: false,
      organizations: [],
      form: {
        _id:          this.organization?.id || this.data?._id || '',
        organization: this.organization?.name || this.data?.organization || '',
        name:         this.data?.name        || '',
        description:  this.data?.description || '',
      },
    };
  },
  methods: {
    async fetchOrganizations() {
      if (this.organization) return;
      try {
        const res = await this.$apiGet('/organization', { page_size: 100 });
        this.organizations = res.data || [];
      } catch (e) { console.error(e); }
    },
    async submitForm() {
      this.loading = true;
      try {
        // keep organization name in sync
        if (this.organization) {
          this.form.organization = this.organization.name;
          this.form._id = this.organization.id;
        }
        const res = await this.$apiPost('/group', this.form);
        if (res) this.$root.$refs.toast.showToast('Group added successfully', 'success');
        this.$emit('saved');
        this.$emit('close');
      } catch (e) {
        console.error(e);
        this.$root.$refs.toast.showToast('Failed to add group', 'error');
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() { this.fetchOrganizations(); },
};
</script>
