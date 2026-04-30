<template>
  <header class="bg-slate-900 sticky top-0 z-[100] border-b border-white/10 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">

      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group">
        <div class="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-green-400 transition">
          <i class="fas fa-brain text-white text-sm"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-base font-black text-white tracking-tight leading-none">
            Alpha<span class="text-green-400">Psych</span>
          </span>
          <span class="text-[9px] font-medium text-white/40 uppercase tracking-widest leading-none mt-0.5 hidden sm:block">
            Psychometric Solutions
          </span>
        </div>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <router-link
          v-for="nav in navLinks"
          :key="nav.path"
          :to="nav.path"
          class="px-4 py-2 text-white/70 text-xs font-semibold uppercase tracking-wider hover:text-white hover:bg-white/5 rounded-lg transition-all"
          active-class="text-white bg-white/10"
        >
          {{ nav.name }}
        </router-link>
      </nav>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-3">
        <button
          @click="$emit('open-login')"
          class="px-5 py-2 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-white/5 transition"
        >
          Sign In
        </button>
        <button
          @click="$emit('open-register')"
          class="px-5 py-2 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-lg shadow-green-500/20 transition"
        >
          Get Started
        </button>
      </div>

      <!-- Mobile menu button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 text-white transition"
        :class="{ 'bg-white/10': mobileMenuOpen }"
      >
        <i class="fas text-sm" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden bg-slate-900 border-t border-white/10 px-4 pb-4 pt-2 space-y-1">
        <router-link
          v-for="nav in navLinks"
          :key="nav.path"
          :to="nav.path"
          @click="mobileMenuOpen = false"
          class="flex items-center justify-between px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 text-sm font-semibold transition"
        >
          {{ nav.name }}
          <i class="fas fa-chevron-right text-[10px] text-white/20"></i>
        </router-link>

        <div class="pt-3 border-t border-white/10 flex flex-col gap-2">
          <button
            @click="mobileMenuOpen = false; $emit('open-login')"
            class="w-full py-3 text-white/80 hover:text-white text-sm font-semibold rounded-xl hover:bg-white/5 transition"
          >
            Sign In
          </button>
          <button
            @click="mobileMenuOpen = false; $emit('open-register')"
            class="w-full py-3 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-xl transition"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </transition>
  </header>

  <!-- Auth Modals -->
  <login-modal
    v-if="showLogin"
    @close="showLogin = false"
    @switch-to-register="showLogin = false; showRegister = true"
  />
  <register-modal
    v-if="showRegister"
    @close="showRegister = false"
    @switch-to-login="showRegister = false; showLogin = true"
  />
</template>

<script>
import LoginModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'SiteHeader',
  components: { LoginModal, RegisterModal },
  emits: ['open-login', 'open-register'],

  data() {
    return {
      mobileMenuOpen: false,
      showLogin: false,
      showRegister: false,
      navLinks: [
        { name: 'Home',     path: '/' },
        { name: 'Features', path: '/#features' },
        { name: 'Pricing',  path: '/pricing' },
      ],
    };
  },

  mounted() {
    // Listen for global open-login / open-register events from parent pages
    this.$el.addEventListener('open-login',    () => { this.showLogin    = true; });
    this.$el.addEventListener('open-register', () => { this.showRegister = true; });
  },

  watch: {
    $route() {
      this.mobileMenuOpen = false;
    },
  },
};
</script>
