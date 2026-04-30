<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 text-sm">

      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Edit User</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">First Name</label>
            <input v-model="form.first_name" type="text" required
              class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Middle Name</label>
            <input v-model="form.middle_name" type="text"
              class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
          </div>
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
          <input v-model="form.last_name" type="text" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input v-model="form.email" type="email" required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
          <input v-model="form.phone" type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">
            New Password
            <span class="text-gray-400 font-normal">(leave blank to keep current)</span>
          </label>
          <input v-model="form.password" type="password" placeholder="••••••••"
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" />
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" :disabled="loading"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center gap-2">
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      loading: false,
      form: {
        first_name:  this.data?.first_name  || '',
        middle_name: this.data?.middle_name || '',
        last_name:   this.data?.last_name   || '',
        email:       this.data?.email       || '',
        phone:       this.data?.phone       || '',
        password:    '',
      },
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      try {
        const payload = { ...this.form };
        if (!payload.password) delete payload.password; // don't send blank password
        const res = await this.$apiPatch('/users', this.data.id, payload);
        if (res) {
          this.$root.$refs.toast.showToast('User updated successfully', 'success');
          this.$emit('saved');
          this.$emit('close');
        }
      } catch (e) {
        console.error(e);
        this.$root.$refs.toast.showToast('Failed to update user', 'error');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
