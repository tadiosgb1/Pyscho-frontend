
<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Message..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">Message Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-white overflow-hidden rounded-md border border-gray-200 p-4 hidden md:block space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Type:</strong> {{ item.type }}</div><div><strong>To:</strong> {{ item.to }}</div><div><strong>Message:</strong> {{ item.message }}</div><div><strong>Parts:</strong> {{ item.parts }}</div><div><strong>Count:</strong> {{ item.count }}</div><div><strong>Cost:</strong> {{ item.cost }}</div><div><strong>Sent_on:</strong> {{ item.sent_on }}</div><div><strong>Status:</strong> {{ item.status }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-white rounded-md border border-gray-200 p-4 space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Type:</strong> {{ item.type }}</div><div><strong>To:</strong> {{ item.to }}</div><div><strong>Message:</strong> {{ item.message }}</div><div><strong>Parts:</strong> {{ item.parts }}</div><div><strong>Count:</strong> {{ item.count }}</div><div><strong>Cost:</strong> {{ item.cost }}</div><div><strong>Sent_on:</strong> {{ item.sent_on }}</div><div><strong>Status:</strong> {{ item.status }}</div>
    </div>

    <button @click="$router.back()" class="mt-4 text-blue-600 hover:underline">Back</button>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  components: { Loading },
  data() {
    return {
      item: {},
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const id = this.$route.params.id;
    try {
      const response = await this.$apiGetById('/message', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
