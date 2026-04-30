<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" @click="$emit('close')"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

      <!-- Green top bar -->
      <div class="h-1.5 w-full bg-gradient-to-r from-green-400 to-green-600 flex-shrink-0"></div>

      <!-- Close -->
      <button @click="$emit('close')"
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition z-10">
        <i class="fas fa-times text-xs"></i>
      </button>

      <!-- Scrollable content -->
      <div class="overflow-y-auto flex-1 p-8">

        <!-- Logo -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <i class="fas fa-brain text-green-400 text-sm"></i>
          </div>
          <span class="font-black text-slate-900 text-lg tracking-tight">Alpha<span class="text-green-500">Psych</span></span>
        </div>

        <h2 class="text-2xl font-black text-slate-900 mb-1">Create Account</h2>
        <p class="text-sm text-gray-400 mb-6">Join thousands of organizations using Alpha Psycho</p>

        <!-- Account type toggle -->
        <div class="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            @click="accountType = 'individual'"
            class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
            :class="accountType === 'individual' ? 'bg-white shadow text-slate-900' : 'text-gray-500 hover:text-gray-700'"
          >
            <i class="fas fa-user mr-2 text-xs"></i>Individual
          </button>
          <button
            @click="accountType = 'organization'"
            class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
            :class="accountType === 'organization' ? 'bg-white shadow text-slate-900' : 'text-gray-500 hover:text-gray-700'"
          >
            <i class="fas fa-building mr-2 text-xs"></i>Organization
          </button>
        </div>

        <form @submit.prevent="register" class="space-y-4">

          <!-- ── PERSONAL INFO (both types) ── -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">First Name</label>
              <input v-model="form.first_name" type="text" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Last Name</label>
              <input v-model="form.last_name" type="text" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</label>
            <input v-model="form.email" type="email" required
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Phone</label>
            <input v-model="form.phone" type="text" placeholder="+251 911 000 000"
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
              <input v-model="form.password" type="password" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Confirm</label>
              <input v-model="form.confirm_password" type="password" required
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
            </div>
          </div>

          <!-- ── ORGANIZATION FIELDS ── -->
          <template v-if="accountType === 'organization'">
            <div class="border-t border-gray-100 pt-4 mt-2">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Organization Details</p>

              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Organization Name</label>
                  <input v-model="form.org_name" type="text" required
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Official Email</label>
                    <input v-model="form.org_email" type="email"
                      class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Type</label>
                    <select v-model="form.org_type"
                      class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-white">
                      <option>Company</option>
                      <option>University</option>
                      <option>School</option>
                      <option>NGO</option>
                      <option>Research</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Address</label>
                  <input v-model="form.address" type="text"
                    class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                </div>
              </div>
            </div>

            <!-- ── PLAN SELECTION (required for org) ── -->
            <div class="border-t border-gray-100 pt-4">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Choose a Plan <span class="text-red-400">*</span>
              </p>

              <div v-if="loadingPlans" class="text-center py-4 text-gray-400">
                <i class="fas fa-spinner animate-spin"></i>
              </div>

              <div v-else class="space-y-2">
                <label
                  v-for="plan in plans"
                  :key="plan.id"
                  class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all"
                  :class="selectedPlanId === plan.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-100 hover:border-gray-200'"
                >
                  <input type="radio" :value="plan.id" v-model="selectedPlanId" class="w-4 h-4 accent-green-500" />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-semibold text-gray-800">{{ plan.name }}</p>
                      <span class="text-sm font-bold text-gray-700">
                        {{ plan.price_cents === 0 ? 'Free' : '$' + (plan.price_cents / 100).toFixed(0) + '/mo' }}
                      </span>
                    </div>
                    <p class="text-xs text-gray-400 truncate">
                      {{ plan.max_users === -1 ? '∞' : plan.max_users }} users ·
                      {{ plan.max_tests === -1 ? '∞' : plan.max_tests }} tests
                    </p>
                  </div>
                  <i v-if="selectedPlanId === plan.id" class="fas fa-check-circle text-green-500 flex-shrink-0"></i>
                </label>
              </div>
            </div>
          </template>

          <!-- Error -->
          <div v-if="error" class="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-medium">
            <i class="fas fa-exclamation-circle"></i>
            {{ error }}
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading || (accountType === 'organization' && !selectedPlanId)"
            class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>

          <p v-if="accountType === 'organization' && !selectedPlanId" class="text-center text-xs text-amber-600">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            Please select a plan to continue
          </p>
        </form>

        <p class="text-center text-xs text-gray-400 mt-6">
          Already have an account?
          <button @click="$emit('switch-to-login')" class="text-green-600 hover:text-green-700 font-semibold ml-1">
            Sign in
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterModal',
  emits: ['close', 'switch-to-login'],

  data() {
    return {
      accountType: 'individual',
      loading: false,
      loadingPlans: false,
      error: '',
      plans: [],
      selectedPlanId: null,

      form: {
        first_name: '', last_name: '', email: '', phone: '',
        password: '', confirm_password: '',
        // org fields
        org_name: '', org_email: '', org_phone: '',
        org_type: 'Company', address: '', description: '',
      },
    };
  },

  methods: {
    async fetchPlans() {
      this.loadingPlans = true;
      try {
        const res = await this.$apiGet('/plans');
        // Only show monthly plans (exclude yearly variants)
        this.plans = (res.data || []).filter(p => p.billing_cycle !== 'yearly');
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingPlans = false;
      }
    },

    async register() {
      this.error = '';

      if (this.form.password !== this.form.confirm_password) {
        this.error = 'Passwords do not match.';
        return;
      }

      if (this.accountType === 'organization' && !this.selectedPlanId) {
        this.error = 'Please select a plan for your organization.';
        return;
      }

      this.loading = true;
      try {
        if (this.accountType === 'individual') {
          // Register as individual tester
          await this.$apiPost('/auth/register', {
            first_name:  this.form.first_name,
            last_name:   this.form.last_name,
            email:       this.form.email,
            phone:       this.form.phone,
            password:    this.form.password,
          });
        } else {
          // Step 1: Create organization
          const orgRes = await this.$apiPost('/organization', {
            name:           this.form.org_name,
            official_email: this.form.org_email,
            official_phone: this.form.org_phone,
            address:        this.form.address,
            org_type:       this.form.org_type,
            description:    this.form.description,
          });

          const orgId = orgRes?.id || orgRes?.data?.id;

          // Step 2: Register admin user for the org
          await this.$apiPost('/auth/register', {
            first_name:      this.form.first_name,
            last_name:       this.form.last_name,
            email:           this.form.email,
            phone:           this.form.phone,
            password:        this.form.password,
            organization_id: orgId,
          });

          // Step 3: Assign selected plan to the org
          if (orgId && this.selectedPlanId) {
            await this.$apiPost('/subscriptions', {
              organization_id: orgId,
              plan_id:         this.selectedPlanId,
              activated_by:    null,
            });
          }
        }

        this.$emit('close');
        this.$emit('switch-to-login');
      } catch (err) {
        this.error = err?.message || 'Registration failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.fetchPlans();
  },
};
</script>
