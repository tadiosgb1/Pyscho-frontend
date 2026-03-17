<template>
  <div class="p-6 bg-slate-50 min-h-screen font-sans text-slate-800 relative">
    <Loading :visible="loading" message="Syncing Team Registry..." />

    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Team Management</h1>
        <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
           <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
           Organizational Units & Squads
        </p>
      </div>
      
      <button 
        @click="openAddModal" 
        class="bg-primary hover:bg-dprimary text-slate-900 px-6 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-widest transition-all active:scale-95"
      >
        <i class="fas fa-plus-circle text-sm"></i>
        <span>Create New Team</span>
      </button>
    </div>

    <div class="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="relative flex-1 max-w-md group">
        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors text-xs"></i>
        <input 
          v-model="searchQuery" 
          @input="fetchItems(1)" 
          type="text" 
          placeholder="Filter by team name or description..."
          class="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary/10 outline-none text-[13px] font-bold text-slate-700 transition-all placeholder:text-slate-300" 
        />
      </div>
      
      <div class="flex items-center gap-4 px-2">
        <div class="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
          <label>View</label>
          <select v-model="pageSize" @change="fetchItems(1)" class="bg-slate-50 border-none rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-primary text-slate-700 font-bold outline-none cursor-pointer">
            <option v-for="size in [5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hidden md:block">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-100">
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">#</th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Team Identity</th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Context/Description</th>
            <th class="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="(item, index) in items" :key="item.id" class="hover:bg-slate-50/80 transition-colors group">
            <td class="px-8 py-5 text-[10px] font-mono font-black text-slate-300">
              {{ String((currentPage - 1) * pageSize + (index + 1)).padStart(2, '0') }}
            </td>
            <td class="px-8 py-5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-900 text-primary flex items-center justify-center shadow-inner">
                  <i class="fas fa-users text-xs"></i>
                </div>
                <span class="text-xs font-black text-slate-800 uppercase tracking-tighter">{{ item.name }}</span>
              </div>
            </td>
            <td class="px-8 py-5">
              <p class="text-xs font-medium text-slate-500 max-w-xs truncate">{{ item.description || 'No description provided' }}</p>
            </td>
            <td class="px-8 py-5">
              <div class="flex items-center justify-center gap-2">
                <button @click="viewDetails(item.id)" title="View Team" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-primary hover:bg-primary/10 transition-all"><i class="fas fa-eye text-sm"></i></button>
                <button @click="editItem(item)" title="Edit Team" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-dprimary hover:bg-primary/10 transition-all"><i class="fas fa-edit text-sm"></i></button>
                <button @click="openDeleteModal(item.id)" title="Delete Team" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"><i class="fas fa-trash-alt text-sm"></i></button>
              </div>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="4" class="py-20 text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-full mb-4">
                <i class="fas fa-layer-group text-slate-200 text-2xl"></i>
              </div>
              <p class="text-slate-400 font-black uppercase tracking-widest text-[10px]">No teams indexed in directory</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="md:hidden space-y-4">
      <div v-for="(item, index) in items" :key="item.id" class="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-primary flex items-center justify-center">
              <i class="fas fa-users text-xs"></i>
            </div>
            <div>
              <h2 class="text-xs font-black text-slate-900 uppercase tracking-tighter">{{ item.name }}</h2>
              <span class="text-[9px] text-slate-400 font-mono italic">ID: {{ item.id.split('-')[0] }}</span>
            </div>
          </div>
          <div class="flex gap-1">
            <button @click="editItem(item)" class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400"><i class="fas fa-edit text-xs"></i></button>
            <button @click="openDeleteModal(item.id)" class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-400"><i class="fas fa-trash text-xs"></i></button>
          </div>
        </div>
        <p class="text-xs text-slate-500 mb-4 line-clamp-2">{{ item.description }}</p>
        <button @click="viewDetails(item.id)" class="w-full py-3 bg-slate-50 rounded-xl text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors">
          View Team Profile
        </button>
      </div>
      <p v-if="items.length === 0" class="text-center text-slate-400 py-10 italic text-[10px] uppercase tracking-widest">No data found</p>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-between mt-10 gap-6">
      <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        Displaying {{ items.length }} of {{ count }} squads
      </p>
      <div class="flex items-center gap-3">
        <button 
          @click="fetchItems(currentPage - 1)" 
          :disabled="!previousPage"
          class="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 bg-white text-slate-400 hover:border-primary hover:text-primary disabled:opacity-20 transition-all shadow-sm"
        >
          <i class="fas fa-chevron-left text-xs"></i>
        </button>
        <div class="px-6 h-12 flex items-center justify-center rounded-2xl bg-white border-2 border-slate-100 shadow-sm">
            <span class="text-xs font-black text-slate-900 tracking-widest">{{ currentPage }}</span>
        </div>
        <button 
          @click="fetchItems(currentPage + 1)" 
          :disabled="!nextPage"
          class="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 bg-white text-slate-400 hover:border-primary hover:text-primary disabled:opacity-20 transition-all shadow-sm"
        >
          <i class="fas fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>

    <add-team v-if="showModal && !editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>
    <edit-team v-if="showModal && editMode" :data="selectedItem" @close="showModal=false" @saved="fetchItems"/>

    <delete-confirm-modal 
      :visible="deleteModalVisible"
      title="Decommission Team"
      message="This will dissolve the team squad. Individual members will remain but will lose team-level permissions."
      @confirm="confirmDelete"
      @cancel="deleteModalVisible=false"
    />
  </div>
</template>

<script>
import AddTeam from "./AddTeam.vue";
import EditTeam from "./EditTeam.vue";
import Loading from "@/components/Loading.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";

export default {
  components: { AddTeam, EditTeam, Loading, DeleteConfirmModal },
  data() {
    return {
      items: [],
      count: 0,
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
      showModal: false,
      editMode: false,
      selectedItem: null,
      loading: false,
      deleteModalVisible: false,
      deleteId: null,
    };
  },
  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;
      const params = { 
        page: this.currentPage, 
        page_size: this.pageSize, 
        search: this.searchQuery 
      };
      try {
        const response = await this.$apiGet('/teams', params);
        this.items = response.data.data || [];
        this.count = response.data.count || 0;
        this.nextPage = response.data.next || null;
        this.previousPage = response.data.previous || null;
      } catch(e) { 
        console.error(e); 
      } finally { 
        this.loading = false; 
      }
    },
    openAddModal() { 
      this.editMode = false; 
      this.selectedItem = null; 
      this.showModal = true; 
    },
    editItem(item) { 
      this.editMode = true; 
      this.selectedItem = item; 
      this.showModal = true; 
    },
    viewDetails(id) { 
      this.$router.push({ name: 'Team-detail', params: { id } });
    },
    openDeleteModal(id) { 
      this.deleteId = id; 
      this.deleteModalVisible = true; 
    },
    async confirmDelete() {
      const res = await this.$apiDelete('/teams', this.deleteId);
      if(res) {
        this.$root.$refs.toast.showToast('Team decommissioned successfully', 'success');
      }
      this.deleteModalVisible = false;
      this.fetchItems(this.currentPage);
    },
  },
  mounted() { 
    this.fetchItems(); 
  }
};
</script>