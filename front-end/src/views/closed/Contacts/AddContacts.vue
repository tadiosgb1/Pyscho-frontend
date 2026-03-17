<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
    <!-- Modal container -->
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 text-sm flex flex-col overflow-auto"
      style="max-height: 90vh;"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Contacts</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4 overflow-auto">

        <!-- Default fields -->
        <div
          v-for="field in defaultFields"
          :key="field.key"
          class="flex flex-col sm:flex-row sm:items-center sm:gap-4"
        >
          <label class="block mb-1 sm:mb-0 sm:w-1/4 text-sm font-medium text-gray-700">{{ field.label }}</label>
          <input
            v-model="form[field.key]"
            type="text"
            required
            class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
          />
        </div>

        <!-- Dynamic Custom Fields -->
        <div class="space-y-4">
          <div
            v-for="(field, index) in addedCustomFields"
            :key="field.id"
            class="flex flex-col sm:flex-row sm:items-center sm:gap-4"
          >
            <label class="block mb-1 sm:mb-0 sm:w-1/4 text-sm font-medium text-gray-700">{{ field.name }}</label>
            <input
              v-model="field.value"
              :type="getInputType(field.field_type)"
              :placeholder="field.default_value || ''"
              class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
            />
            <button type="button" @click="removeCustomField(index)" class="ml-2 text-red-500 hover:text-red-700 sm:ml-0 sm:mt-1">Remove</button>
          </div>

          <!-- Add New Custom Field -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <label class="block mb-1 sm:mb-0 sm:w-1/4 text-sm font-medium text-gray-700">Add Custom Field</label>
            <select v-model="selectedFieldId" class="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-3/4 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150">
              <option value="" disabled>Select field</option>
              <option v-for="field in availableCustomFields" :key="field.id" :value="field.id">{{ field.name }}</option>
            </select>
            <button type="button" @click="addCustomField" class="ml-2 px-3 py-1 bg-green-500 text-white rounded-lg sm:ml-0 sm:mt-1">Add</button>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border rounded-lg w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded-lg w-full sm:w-auto"
          >
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
      form: {
        phone: this.data?.phone || '',
        first_name: this.data?.first_name || '',
        middle_name: this.data?.middle_name || '',
        last_name: this.data?.last_name || '',
        title: this.data?.title || '',
        age: this.data?.age || '',
        gender: this.data?.gender || ''
      },
      defaultFields: [
        { key: 'phone', label: 'Phone' },
        { key: 'first_name', label: 'First Name' },
        { key: 'middle_name', label: 'Middle Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'title', label: 'Title' },
        { key: 'age', label: 'Age' },
        { key: 'gender', label: 'Gender' }
      ],
      allCustomFields: [],       // All fields from API
      availableCustomFields: [], // Fields that can be added
      addedCustomFields: [],     // Fields currently added
      selectedFieldId: ''        // Selected dropdown field
    };
  },
  async mounted() {
    try {
      const response = await this.$apiGet('/contact-fields');
      if (response?.data && Array.isArray(response.data)) {
        this.allCustomFields = response.data.map(field => ({
          id: field.id,
          name: field.name,
          field_type: field.field_type,
          default_value: field.default_value
        }));
        // Initially all fields are available
        this.availableCustomFields = [...this.allCustomFields];
      }
    } catch (e) {
      console.error('Failed to fetch custom fields', e);
    }
  },
  methods: {
    getInputType(fieldType) {
      switch (fieldType.toLowerCase()) {
        case 'number': return 'number';
        case 'email': return 'email';
        case 'gender': return 'text';
        default: return 'text';
      }
    },
    addCustomField() {
      if (!this.selectedFieldId) return;
      const field = this.availableCustomFields.find(f => f.id === this.selectedFieldId);
      if (field) {
        this.addedCustomFields.push({ ...field, value: '' });
        this.availableCustomFields = this.availableCustomFields.filter(f => f.id !== this.selectedFieldId);
        this.selectedFieldId = '';
      }
    },
    removeCustomField(index) {
      const removed = this.addedCustomFields.splice(index, 1)[0];
      this.availableCustomFields.push({
        id: removed.id,
        name: removed.name,
        field_type: removed.field_type,
        default_value: removed.default_value
      });
    },
    async submitForm() {
      try {
        const payload = {
          firstName: this.form.first_name,
          middleName: this.form.middle_name,
          lastName: this.form.last_name,
          phoneNumber: this.form.phone,
          title: this.form.title,
          age: this.form.age,
          gender: this.form.gender,
          phoneCode: 'ye',
          listId: null,
          custom: this.addedCustomFields.map(f => ({
            fieldId: f.id,
            fieldValue: f.value
          }))
        };

        const res = await this.$apiPost('/contacts', payload);
        if (res) this.$root.$refs.toast.showToast('Added successfully', 'success');

        this.$emit('saved');
        this.$emit('close');
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>