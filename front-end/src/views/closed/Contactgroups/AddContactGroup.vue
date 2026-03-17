<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 text-sm overflow-auto" style="max-height: 90vh;">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add Contact Group</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitForm" class="space-y-4">

        <!-- Basic group info -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label class="sm:w-1/4 text-sm font-medium text-gray-700">Type</label>
          <input v-model="form.type" type="text" required class="border rounded-lg px-4 py-2 sm:w-3/4 focus:ring-2 focus:ring-green-500"/>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label class="sm:w-1/4 text-sm font-medium text-gray-700">Name</label>
          <input v-model="form.name" type="text" required class="border rounded-lg px-4 py-2 sm:w-3/4 focus:ring-2 focus:ring-green-500"/>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label class="sm:w-1/4 text-sm font-medium text-gray-700">Description</label>
          <input v-model="form.description" type="text" class="border rounded-lg px-4 py-2 sm:w-3/4 focus:ring-2 focus:ring-green-500"/>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label class="sm:w-1/4 text-sm font-medium text-gray-700">Of Contacts</label>
          <input v-model="form.of_contacts" type="text" class="border rounded-lg px-4 py-2 sm:w-3/4 focus:ring-2 focus:ring-green-500"/>
        </div>

        <!-- Dynamic Conditions -->
        <div class="border-t pt-2">
          <h3 class="text-sm font-semibold mb-2">Conditions</h3>

          <div v-for="(cond, index) in conditions" :key="index" class="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-2">
            
            <!-- Field Name -->
            <select v-model="cond.fieldId" @change="onFieldChange(cond)" class="border rounded-lg px-2 py-1 sm:w-1/3">
              <option value="" disabled>Select field</option>
              <option v-for="field in availableFieldsForCondition(cond)" :key="field.id" :value="field.id">{{ field.name }}</option>
            </select>

            <!-- Operator -->
            <select v-model="cond.operator" class="border rounded-lg px-2 py-1 sm:w-1/4">
              <option value="" disabled>Select operator</option>
              <option v-for="op in cond.availableOperators" :key="op" :value="op">{{ op }}</option>
            </select>

            <!-- Value -->
            <input v-model="cond.value" type="text" placeholder="Value" class="border rounded-lg px-2 py-1 sm:w-1/3"/>

            <!-- Remove -->
            <button type="button" @click="removeCondition(index)" class="text-red-500 ml-2 sm:ml-0 sm:mt-1">Remove</button>
          </div>

          <!-- Add Condition -->
          <button type="button" @click="addCondition" class="text-blue-600 text-sm mt-1">+ Add new condition</button>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg">Add</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: '',
        name: '',
        description: '',
        of_contacts: ''
      },
      allFields: [],        // Fields fetched from API
      conditions: []        // Array of conditions
    };
  },
  async mounted() {
    try {
      const response = await this.$apiGet('/contact-fields');
      if (response?.data && Array.isArray(response.data)) {
        this.allFields = response.data.map(f => ({
          id: f.id,
          name: f.name,
          field_type: f.field_type,
          operators: f.operators
        }));
      }
    } catch (e) {
      console.error('Failed to fetch fields', e);
    }
  },
  methods: {
    addCondition() {
      this.conditions.push({
        fieldId: '',
        operator: '',
        value: '',
        availableOperators: []
      });
    },
    removeCondition(index) {
      this.conditions.splice(index, 1);
    },
    onFieldChange(cond) {
      const field = this.allFields.find(f => f.id === cond.fieldId);
      cond.availableOperators = field ? field.operators : [];
      cond.operator = '';
      cond.value = '';
    },
    availableFieldsForCondition(currentCond) {
      // optionally prevent selecting the same field twice
      return this.allFields;
    },
    async submitForm() {
      try {
        const payload = {
          ...this.form,
          conditions: this.conditions.map(c => ({
            fieldId: c.fieldId,
            operator: c.operator,
            value: c.value
          }))
        };
        const res = await this.$apiPost('/contactgroup', payload);
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