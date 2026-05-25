<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">

      <!-- ── Header ── -->
      <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <i class="fas fa-users text-white text-sm"></i>
          </div>
          <div>
            <h2 class="text-white font-bold text-sm">Add Users to Group</h2>
            <p class="text-green-100 text-[10px] uppercase tracking-widest">{{ group.name }}</p>
          </div>
        </div>
        <button @click="$emit('close')"
          class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 text-white transition">
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>

      <!-- ── Tab switcher ── -->
      <div class="flex border-b border-gray-100 shrink-0 px-6 pt-4 gap-1">
        <button
          v-for="tab in tabs" :key="tab.key"
          @click="activeTab = tab.key"
          class="px-4 py-2 text-xs font-semibold rounded-t-lg transition-all"
          :class="activeTab === tab.key
            ? 'bg-green-500 text-white'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
        >
          <i :class="tab.icon" class="mr-1.5"></i>{{ tab.label }}
        </button>
      </div>

      <!-- ── Scrollable body ── -->
      <div class="flex-1 overflow-y-auto">

        <!-- ════════════════════════════════════════ -->
        <!--  TAB 1 — SELECT EXISTING USERS          -->
        <!-- ════════════════════════════════════════ -->
        <div v-if="activeTab === 'select'" class="p-6 space-y-4">

          <!-- Search + select-all row -->
          <div class="flex items-center gap-3">
            <div class="relative flex-1">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
              <input
                v-model="userSearch"
                @input="onSearch"
                type="text"
                placeholder="Search by name or email…"
                class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            <button @click="toggleSelectAll"
              class="shrink-0 px-3 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition whitespace-nowrap">
              {{ allSelected ? 'Deselect All' : 'Select All' }}
            </button>
          </div>

          <!-- Stats bar -->
          <div class="flex items-center justify-between text-xs text-gray-500 px-1">
            <span>{{ filteredUsers.length }} user(s) shown</span>
            <span v-if="selectedUserIds.length" class="text-green-600 font-semibold">
              <i class="fas fa-check-circle mr-1"></i>{{ selectedUserIds.length }} selected
            </span>
          </div>

          <!-- User list -->
          <div class="border border-gray-200 rounded-xl overflow-hidden">
            <div v-if="loadingUsers" class="py-10 text-center text-gray-400">
              <i class="fas fa-spinner fa-spin text-xl mb-2 block"></i>
              <span class="text-xs">Loading users…</span>
            </div>

            <div v-else-if="filteredUsers.length === 0" class="py-10 text-center text-gray-400">
              <i class="fas fa-user-slash text-2xl mb-2 block"></i>
              <span class="text-xs">No users found</span>
            </div>

            <div v-else class="divide-y divide-gray-100 max-h-64 overflow-y-auto">
              <label
                v-for="user in filteredUsers"
                :key="user.id"
                class="flex items-center gap-3 px-4 py-3 hover:bg-green-50 cursor-pointer transition group"
                :class="{ 'bg-green-50': selectedUserIds.includes(user.id) }"
              >
                <input
                  type="checkbox"
                  :value="user.id"
                  v-model="selectedUserIds"
                  class="w-4 h-4 accent-green-500 shrink-0"
                />
                <!-- Avatar initials -->
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold shrink-0">
                  {{ initials(user) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-800 truncate">
                    {{ user.first_name }} {{ user.last_name }}
                  </p>
                  <p class="text-xs text-gray-400 truncate">{{ user.email }}</p>
                </div>
                <!-- Already-member badge -->
                <span v-if="existingMemberIds.includes(user.id)"
                  class="shrink-0 text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-semibold">
                  Already in group
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- ════════════════════════════════════════ -->
        <!--  TAB 2 — BULK REGISTER VIA EXCEL        -->
        <!-- ════════════════════════════════════════ -->
        <div v-if="activeTab === 'excel'" class="p-6 space-y-5">

          <!-- Step 1: download template -->
          <div class="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <i class="fas fa-file-excel text-green-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-700 mb-0.5">Step 1 — Download Template</p>
                <p class="text-xs text-gray-400 mb-3">
                  Fill in the Excel file. Each row = one new user. They will be registered and added to this group automatically.
                </p>
                <button @click="downloadTemplate"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition">
                  <i class="fas fa-download"></i> Download Template (.xlsx)
                </button>
              </div>
            </div>
          </div>

          <!-- Step 2: upload -->
          <div class="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <p class="text-sm font-semibold text-gray-700 mb-3">Step 2 — Upload Filled File</p>
            <label
              class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition"
              :class="excelFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:bg-gray-100'"
              @dragover.prevent @drop.prevent="onDrop"
            >
              <i class="fas fa-cloud-upload-alt text-2xl mb-2"
                :class="excelFile ? 'text-green-500' : 'text-gray-400'"></i>
              <span class="text-xs font-medium" :class="excelFile ? 'text-green-700' : 'text-gray-500'">
                {{ excelFile ? excelFile.name : 'Drag & drop or click to select .xlsx / .xls' }}
              </span>
              <input type="file" accept=".xlsx,.xls" class="hidden" @change="onExcelFileChange" />
            </label>
          </div>

          <!-- Preview -->
          <div v-if="parsedUsers.length" class="border border-gray-200 rounded-xl overflow-hidden">
            <div class="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <p class="text-xs font-semibold text-gray-700">
                <i class="fas fa-eye mr-1.5 text-green-500"></i>
                Preview — {{ parsedUsers.length }} user(s) found
              </p>
              <button @click="parsedUsers = []; excelFile = null"
                class="text-xs text-red-400 hover:text-red-600 transition">
                <i class="fas fa-times mr-1"></i>Clear
              </button>
            </div>
            <div class="overflow-x-auto max-h-48 overflow-y-auto">
              <table class="w-full text-xs">
                <thead class="bg-gray-100 sticky top-0">
                  <tr>
                    <th class="px-3 py-2 text-left text-gray-600 font-semibold">#</th>
                    <th class="px-3 py-2 text-left text-gray-600 font-semibold">First Name</th>
                    <th class="px-3 py-2 text-left text-gray-600 font-semibold">Last Name</th>
                    <th class="px-3 py-2 text-left text-gray-600 font-semibold">Email</th>
                    <th class="px-3 py-2 text-left text-gray-600 font-semibold">Phone</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr v-for="(u, i) in parsedUsers" :key="i" class="hover:bg-gray-50">
                    <td class="px-3 py-2 text-gray-500">{{ i + 1 }}</td>
                    <td class="px-3 py-2 font-medium text-gray-800">{{ u.first_name }}</td>
                    <td class="px-3 py-2 text-gray-700">{{ u.last_name }}</td>
                    <td class="px-3 py-2 text-gray-600">{{ u.email }}</td>
                    <td class="px-3 py-2 text-gray-500">{{ u.phone || '—' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Parse errors -->
          <div v-if="parseErrors.length" class="border border-red-200 rounded-xl p-4 bg-red-50">
            <p class="text-xs font-semibold text-red-600 mb-2">
              <i class="fas fa-exclamation-triangle mr-1"></i>Parse Errors
            </p>
            <ul class="list-disc list-inside text-xs text-red-500 space-y-1">
              <li v-for="(e, i) in parseErrors" :key="i">{{ e }}</li>
            </ul>
          </div>

          <!-- Upload progress -->
          <div v-if="bulkProgress.total > 0" class="space-y-1.5">
            <div class="flex justify-between text-xs text-gray-600">
              <span>Registering {{ bulkProgress.done }} / {{ bulkProgress.total }}</span>
              <span>{{ Math.round((bulkProgress.done / bulkProgress.total) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full transition-all"
                :style="{ width: (bulkProgress.done / bulkProgress.total * 100) + '%' }"></div>
            </div>
            <div v-if="bulkErrors.length" class="text-xs text-red-500 mt-1">
              {{ bulkErrors.length }} error(s) — check console for details
            </div>
          </div>

        </div>

      </div><!-- /scrollable body -->

      <!-- ── Footer ── -->
      <div class="shrink-0 px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between gap-3">

        <!-- Left: selection summary -->
        <div class="text-xs text-gray-500">
          <template v-if="activeTab === 'select' && selectedUserIds.length">
            <span class="text-green-600 font-semibold">{{ selectedUserIds.length }}</span> user(s) selected
          </template>
          <template v-else-if="activeTab === 'excel' && parsedUsers.length">
            <span class="text-green-600 font-semibold">{{ parsedUsers.length }}</span> user(s) ready to register
          </template>
        </div>

        <div class="flex items-center gap-3">
          <button @click="$emit('close')"
            class="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>

          <!-- Select tab action -->
          <button
            v-if="activeTab === 'select'"
            @click="assignSelected"
            :disabled="loading || selectedUserIds.length === 0 || onlyAlreadyMembers"
            class="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition disabled:opacity-60 flex items-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin text-xs"></i>
            <i v-else class="fas fa-user-plus text-xs"></i>
            {{ loading ? 'Adding…' : `Add ${newSelectionCount} to Group` }}
          </button>

          <!-- Excel tab action -->
          <button
            v-if="activeTab === 'excel'"
            @click="registerAndAssign"
            :disabled="bulkLoading || !parsedUsers.length"
            class="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition disabled:opacity-60 flex items-center gap-2"
          >
            <i v-if="bulkLoading" class="fas fa-spinner fa-spin text-xs"></i>
            <i v-else class="fas fa-upload text-xs"></i>
            {{ bulkLoading
              ? `Registering… (${bulkProgress.done}/${bulkProgress.total})`
              : `Register & Add ${parsedUsers.length || ''} Users` }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'AssignUsersModal',

  props: {
    group: { type: Object, required: true },
  },

  emits: ['close', 'assigned'],

  data() {
    return {
      activeTab: 'select',

      tabs: [
        { key: 'select', label: 'Select Users',    icon: 'fas fa-user-check' },
        { key: 'excel',  label: 'Bulk Register',   icon: 'fas fa-file-excel' },
      ],

      // ── Select tab ──
      allUsers: [],
      filteredUsers: [],
      selectedUserIds: [],
      existingMemberIds: [],
      userSearch: '',
      loadingUsers: false,
      loading: false,

      // ── Excel tab ──
      excelFile: null,
      parsedUsers: [],
      parseErrors: [],
      bulkLoading: false,
      bulkErrors: [],
      bulkProgress: { done: 0, total: 0 },
    };
  },

  computed: {
    allSelected() {
      const selectable = this.filteredUsers.filter(u => !this.existingMemberIds.includes(u.id));
      return selectable.length > 0 && selectable.every(u => this.selectedUserIds.includes(u.id));
    },
    // How many of the selected are actually new (not already members)
    newSelectionCount() {
      return this.selectedUserIds.filter(id => !this.existingMemberIds.includes(id)).length;
    },
    onlyAlreadyMembers() {
      return this.selectedUserIds.length > 0 && this.newSelectionCount === 0;
    },
  },

  methods: {
    initials(user) {
      return ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase() || '?';
    },

    // ── Fetch all users + existing group members ──
    async fetchUsers() {
      this.loadingUsers = true;
      try {
        const [usersRes, membersRes] = await Promise.all([
          this.$apiGet('/users', { page_size: 500 }),
          this.$apiGet(`/user-groups/group/${this.group.id}`, { page_size: 500 }),
        ]);
        this.allUsers = usersRes.data || [];
        this.existingMemberIds = (membersRes.data || []).map(u => u.id);
        this.filteredUsers = [...this.allUsers];
      } catch (e) {
        console.error('Fetch users error:', e);
      } finally {
        this.loadingUsers = false;
      }
    },

    onSearch() {
      const q = this.userSearch.toLowerCase().trim();
      if (!q) {
        this.filteredUsers = [...this.allUsers];
        return;
      }
      this.filteredUsers = this.allUsers.filter(u =>
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      );
    },

    toggleSelectAll() {
      const selectable = this.filteredUsers
        .filter(u => !this.existingMemberIds.includes(u.id))
        .map(u => u.id);

      if (this.allSelected) {
        // Deselect only the currently visible selectable ones
        this.selectedUserIds = this.selectedUserIds.filter(id => !selectable.includes(id));
      } else {
        // Add all selectable visible users
        const merged = new Set([...this.selectedUserIds, ...selectable]);
        this.selectedUserIds = [...merged];
      }
    },

    async assignSelected() {
      const newIds = this.selectedUserIds.filter(id => !this.existingMemberIds.includes(id));
      if (!newIds.length) return;

      this.loading = true;
      try {
        await this.$apiPost('/user-groups/bulk', {
          groupId: this.group.id,
          userIds: newIds,
        });
        this.$root.$refs.toast?.showToast(
          `${newIds.length} user(s) added to "${this.group.name}"`, 'success'
        );
        this.$emit('assigned');
        this.$emit('close');
      } catch (e) {
        console.error('Assign error:', e);
        const msg = e?.message?.error || e?.message || 'Failed to add users';
        this.$root.$refs.toast?.showToast(msg, 'error');
      } finally {
        this.loading = false;
      }
    },

    // ── Excel helpers ──
    downloadTemplate() {
      const headers = ['first_name', 'last_name', 'email', 'phone', 'password'];
      const example1 = ['John', 'Doe', 'john.doe@example.com', '+251911000001', 'Pass@1234'];
      const example2 = ['Jane', 'Smith', 'jane.smith@example.com', '+251911000002', 'Pass@5678'];

      const ws = XLSX.utils.aoa_to_sheet([headers, example1, example2]);
      ws['!cols'] = [
        { wch: 15 }, { wch: 15 }, { wch: 28 }, { wch: 18 }, { wch: 14 }
      ];
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Users');
      XLSX.writeFile(wb, `group_${this.group.name}_users_template.xlsx`);
    },

    onExcelFileChange(e) {
      const f = e.target.files[0];
      if (f) { this.excelFile = f; this.parseExcel(f); }
    },

    onDrop(e) {
      const f = e.dataTransfer.files[0];
      if (f) { this.excelFile = f; this.parseExcel(f); }
    },

    parseExcel(file) {
      this.parsedUsers = [];
      this.parseErrors = [];

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const wb = XLSX.read(ev.target.result, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

          const valid = [];
          rows.forEach((r, i) => {
            const rowNum = i + 2; // 1-indexed + header row
            if (!r.first_name || !r.last_name || !r.email || !r.password) {
              this.parseErrors.push(`Row ${rowNum}: first_name, last_name, email, and password are required`);
              return;
            }
            valid.push({
              first_name: String(r.first_name).trim(),
              last_name:  String(r.last_name).trim(),
              email:      String(r.email).trim(),
              phone:      String(r.phone || '').trim() || null,
              password:   String(r.password).trim(),
            });
          });

          this.parsedUsers = valid;
        } catch (err) {
          this.parseErrors.push('Failed to parse file: ' + err.message);
        }
      };
      reader.readAsArrayBuffer(file);
    },

    async registerAndAssign() {
      if (!this.parsedUsers.length) return;

      this.bulkLoading = true;
      this.bulkErrors = [];
      this.bulkProgress = { done: 0, total: this.parsedUsers.length };

      const registeredIds = [];

      for (const user of this.parsedUsers) {
        try {
          // Register the user via the auth register endpoint
          const res = await this.$apiPost('/auth/register', user);
          if (res?.id) registeredIds.push(res.id);
        } catch (e) {
          const msg = e?.message?.error || e?.message || `Failed to register ${user.email}`;
          this.bulkErrors.push(msg);
          console.error('Register error:', e);
        } finally {
          this.bulkProgress.done++;
        }
      }

      // Assign all successfully registered users to the group
      if (registeredIds.length) {
        try {
          await this.$apiPost('/user-groups/bulk', {
            groupId: this.group.id,
            userIds: registeredIds,
          });
        } catch (e) {
          console.error('Bulk assign error:', e);
        }
      }

      this.bulkLoading = false;

      if (!this.bulkErrors.length) {
        this.$root.$refs.toast?.showToast(
          `${registeredIds.length} user(s) registered and added to "${this.group.name}"`, 'success'
        );
        this.$emit('assigned');
        this.$emit('close');
      } else {
        this.$root.$refs.toast?.showToast(
          `${registeredIds.length} registered, ${this.bulkErrors.length} failed`, 'error'
        );
        // Emit assigned anyway if some succeeded
        if (registeredIds.length) this.$emit('assigned');
      }
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>
