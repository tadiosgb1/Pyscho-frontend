<template>
  <div class="min-h-screen flex bg-slate-50 font-sans">
    <div class="hidden lg:flex lg:w-7/12 bg-slate-900 flex-col justify-between p-16 relative overflow-hidden">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-dprimary/20 blur-[120px] rounded-full"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>

      <div class="relative z-10">
        <div class="flex items-center gap-4 mb-16">
          <div class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <i class="fas fa-microchip text-slate-900 text-xl"></i>
          </div>
          <span class="text-white font-black text-3xl tracking-tighter uppercase">Alpha<span class="text-primary">Integrator</span></span>
        </div>

        <div class="space-y-6">
          <h1 class="text-6xl font-black text-white leading-tight">
            Connect to <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-dprimary">Ethio Telecom</span> <br/>
            Instantly.
          </h1>
          <p class="text-slate-400 text-xl max-w-xl leading-relaxed font-medium">
            The professional gateway for developers to reach millions. 
            Send transactional SMS, OTPs, and notifications with 
            <span class="text-secondary font-bold">zero latency</span>.
          </p>
        </div>
      </div>

      <div class="relative z-10 grid grid-cols-2 gap-8">
        <div class="flex flex-col gap-2">
          <div class="h-1 w-12 bg-secondary rounded-full"></div>
          <h3 class="text-white font-bold uppercase tracking-widest text-xs">Direct Carrier Access</h3>
          <p class="text-slate-500 text-sm">Official Ethio Telecom node integration.</p>
        </div>
        <div class="flex flex-col gap-2">
          <div class="h-1 w-12 bg-primary rounded-full"></div>
          <h3 class="text-white font-bold uppercase tracking-widest text-xs">Developer Sandbox</h3>
          <p class="text-slate-500 text-sm">Test your API calls in a safe environment.</p>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-5/12 flex items-center justify-center p-8 bg-white lg:bg-transparent">
      <Toast ref="toast" />
      
      <div class="w-full max-w-md">
        <div class="lg:hidden flex flex-col items-center mb-10 text-center">
          <div class="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4">
             <i class="fas fa-paper-plane text-slate-900"></i>
          </div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tighter uppercase">Alpha Integrator</h2>
        </div>

        <div class="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 p-10 md:p-12 border border-slate-100 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-dprimary to-secondary"></div>

          <div class="mb-10">
            <h2 class="text-3xl font-black text-slate-900">Sign In</h2>
            <div class="flex items-center gap-2 mt-2">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <p class="text-slate-400 text-xs font-bold uppercase tracking-widest">Gateway Status: Operational</p>
            </div>
          </div>

          <form @submit.prevent="login" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Developer Email</label>
              <div class="relative group">
                <i class="fas fa-at absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"></i>
                <input
                  type="email"
                  v-model="form.email"
                  required
                  placeholder="dev@company.et"
                  class="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:ring-0 focus:border-primary outline-none transition-all text-sm font-bold text-slate-800"
                />
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-end px-1">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Access Token</label>
                <a @click="$emit('close')" href="/forgot-password" class="text-[10px] font-black uppercase text-secondary hover:underline transition-colors">Forgot?</a>
              </div>
              <div class="relative group">
                <i class="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors"></i>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  required
                  placeholder="••••••••"
                  class="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:bg-white focus:ring-0 focus:border-primary outline-none transition-all text-sm font-bold text-slate-800"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
                </button>
              </div>
            </div>

            <transition name="error-shake">
              <div v-if="error" class="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                <i class="fas fa-exclamation-triangle text-sm"></i>
                <p class="text-[11px] font-bold uppercase leading-none">{{ error }}</p>
              </div>
            </transition>

            <button
              type="submit"
              class="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xl shadow-slate-900/20 active:scale-[0.97] disabled:opacity-50 flex items-center justify-center gap-3 group"
              :disabled="loading"
            >
              <template v-if="!loading">
                Sign in <i class="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
              </template>
              <template v-else>
                <div class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Verifying Credentials...
              </template>
            </button>
          </form>

          <div class="mt-12 text-center pt-6 border-t border-slate-50">
        <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">
  Need System Access? 
  <router-link :to="{ path: '/pricing'}" class="text-primary hover:text-dprimary ml-1 transition-colors">
    Create Partner Account
  </router-link>
</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from "../../../components/Toast.vue";

export default {
  name: "LoginIntegrator",
  components: { Toast },
  data() {
    return {
      form: { email: "", password: "" },
      error: "",
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    async login() {
      this.error = "";
      this.loading = true;
      try {
        const response = await this.$apiPost("/auth/login", this.form);
        console.log("response login",response.data.user);
        localStorage.setItem("refresh", response.data.token);
        localStorage.setItem("access",response.data.token);
        // localStorage.setItem("permissions", JSON.stringify(permissions));
        // localStorage.setItem("groups", JSON.stringify(groups));
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("name", response.data.user.username);
        this.$refs.toast?.showSuccessToastMessage("Secure Connection Established.");
    
        setTimeout(() => {
          this.$router.push({ path: "/dashboard/first-dash" });
        }, 1200);
      } catch (err) {
        this.error = err.response?.data?.detail || err.response?.data?.message || "Authentication Failed. Please check your credentials.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Keyframes for the error shake */
.error-shake-enter-active {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

/* Background blur/mesh helper */
.bg-primary { background-color: #27dd73; }
.text-primary { color: #27dd73; }
.bg-dprimary { background-color: #1ce670; }
.text-dprimary { color: #1ce670; }
.bg-secondary { background-color: #FF6B00; }
.text-secondary { color: #FF6B00; }
.border-primary { border-color: #27dd73; }
</style>