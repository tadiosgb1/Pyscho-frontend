<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Profile..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <div>
        <h1 class="text-lg font-bold text-gray-800">My Profile</h1>
        <p class="text-xs text-gray-400 mt-0.5">
          View and manage your personal information
        </p>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Personal Information Card -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {{ userInitials }}
            </div>
            <div class="text-white">
              <h2 class="text-xl font-bold">{{ fullName }}</h2>
              <p class="text-sm text-green-100">{{ userEmail }}</p>
            </div>
          </div>
          <button
            v-if="!editMode"
            @click="editMode = true"
            class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center space-x-2 text-sm transition-all"
          >
            <i class="fas fa-edit"></i>
            <span>Edit Profile</span>
          </button>
        </div>

        <form @submit.prevent="updateProfile" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- First Name -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-user text-gray-400 mr-2"></i>First Name
              </label>
              <input
                v-model="form.first_name"
                type="text"
                :disabled="!editMode"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm"
                placeholder="Enter first name"
              />
            </div>

            <!-- Middle Name -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-user text-gray-400 mr-2"></i>Middle Name
              </label>
              <input
                v-model="form.middle_name"
                type="text"
                :disabled="!editMode"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm"
                placeholder="Enter middle name"
              />
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-user text-gray-400 mr-2"></i>Last Name
              </label>
              <input
                v-model="form.last_name"
                type="text"
                :disabled="!editMode"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm"
                placeholder="Enter last name"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-envelope text-gray-400 mr-2"></i>Email Address
              </label>
              <input
                v-model="form.email"
                type="email"
                :disabled="!editMode"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm"
                placeholder="Enter email address"
              />
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-phone text-gray-400 mr-2"></i>Phone Number
              </label>
              <input
                v-model="form.phone"
                type="text"
                :disabled="!editMode"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-600 text-sm"
                placeholder="Enter phone number"
              />
            </div>

            <!-- Roles (Read-only) -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-id-badge text-gray-400 mr-2"></i>Role(s)
              </label>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="role in userRoles"
                  :key="role"
                  class="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold"
                >
                  {{ role }}
                </span>
              </div>
            </div>

          </div>

          <!-- Action Buttons (only shown in edit mode) -->
          <div v-if="editMode" class="mt-6 pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              @click="cancelEdit"
              class="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md flex items-center space-x-2 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i v-if="!saving" class="fas fa-save"></i>
              <i v-else class="fas fa-spinner fa-spin"></i>
              <span>{{ saving ? 'Saving...' : 'Save Changes' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Organization Information Card (for organization users and testers from organizations) -->
      <div v-if="showOrganizationInfo" class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <div class="flex items-center gap-3 text-white">
            <i class="fas fa-building text-2xl"></i>
            <div>
              <h2 class="text-lg font-bold">Organization Information</h2>
              <p class="text-sm text-blue-100">Your organization details</p>
            </div>
          </div>
        </div>

        <div v-if="organization" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Organization Name -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-building text-gray-400 mr-2"></i>Organization Name
              </label>
              <input
                :value="organization.name"
                type="text"
                disabled
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
              />
            </div>

            <!-- Organization Email -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-envelope text-gray-400 mr-2"></i>Official Email
              </label>
              <input
                :value="organization.official_email || '—'"
                type="text"
                disabled
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
              />
            </div>

            <!-- Organization Phone -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-phone text-gray-400 mr-2"></i>Official Phone
              </label>
              <input
                :value="organization.official_phone || '—'"
                type="text"
                disabled
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
              />
            </div>

            <!-- Organization Address -->
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-2">
                <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>Address
              </label>
              <input
                :value="organization.address || '—'"
                type="text"
                disabled
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm"
              />
            </div>

          </div>

          <!-- Edit Organization Button (only for organization role) -->
          <div v-if="isOrganization" class="mt-6 pt-6 border-t border-gray-200">
            <button
              @click="editOrganization"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md flex items-center space-x-2 text-sm transition-all"
            >
              <i class="fas fa-edit"></i>
              <span>Edit Organization</span>
            </button>
          </div>
        </div>

        <div v-else class="p-6 text-center text-gray-400">
          <i class="fas fa-building text-4xl mb-3"></i>
          <p>No organization information available</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  name: "Profile",
  components: { Loading },

  data() {
    return {
      loading: false,
      saving: false,
      editMode: false,
      form: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
      },
      originalForm: {},
      organization: null,
    };
  },

  computed: {
    userId() {
      return localStorage.getItem("userId");
    },
    userRoles() {
      try {
        const raw = localStorage.getItem("roles");
        if (!raw) return [];
        
        // Handle both JSON array and plain string
        try {
          const parsed = JSON.parse(raw);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch {
          return [raw];
        }
      } catch {
        return [];
      }
    },
    isAdmin() {
      return this.userRoles.some(r => r.toLowerCase() === 'admin');
    },
    isOrganization() {
      return this.userRoles.some(r => r.toLowerCase() === 'organization');
    },
    isTester() {
      return this.userRoles.some(r => r.toLowerCase() === 'tester');
    },
    showOrganizationInfo() {
      // Show organization info for organization users or testers who belong to an organization
      return (this.isOrganization || (this.isTester && this.organization));
    },
    fullName() {
      const parts = [this.form.first_name, this.form.middle_name, this.form.last_name].filter(Boolean);
      return parts.join(" ") || "User";
    },
    userInitials() {
      const first = this.form.first_name?.[0] || "";
      const last = this.form.last_name?.[0] || "";
      return (first + last).toUpperCase() || "U";
    },
    userEmail() {
      return this.form.email || "No email";
    },
  },

  methods: {
    async loadProfile() {
      this.loading = true;
      try {
        const response = await this.$apiGet(`/users/${this.userId}`);
        
        // Populate form with user data
        this.form = {
          first_name: response.first_name || "",
          middle_name: response.middle_name || "",
          last_name: response.last_name || "",
          email: response.email || "",
          phone: response.phone || "",
        };

        // Store original form for cancel functionality
        this.originalForm = { ...this.form };

        // Load organization data if available
        if (response.organization) {
          this.organization = response.organization;
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
        this.$root.$refs.toast?.showToast("Failed to load profile", "error");
      } finally {
        this.loading = false;
      }
    },

    async updateProfile() {
      this.saving = true;
      try {
        const response = await this.$apiPut(`/users`, this.userId, this.form);
        
        if (response && !response.error) {
          this.$root.$refs.toast?.showToast("Profile updated successfully", "success");
          this.originalForm = { ...this.form };
          this.editMode = false;
        } else {
          throw new Error(response.error || "Update failed");
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
        this.$root.$refs.toast?.showToast(
          error.message || "Failed to update profile",
          "error"
        );
      } finally {
        this.saving = false;
      }
    },

    cancelEdit() {
      this.form = { ...this.originalForm };
      this.editMode = false;
    },

    editOrganization() {
      // Navigate to organization edit page
      this.$router.push({
        name: "Organization-edit",
        params: { id: this.organization.id },
      });
    },
  },

  mounted() {
    this.loadProfile();
  },
};
</script>

<style scoped>
/* Custom scrollbar for consistency */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
</style>
