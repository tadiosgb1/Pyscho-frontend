<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    <Header @open-login="showLogin = true" @open-register="showRegister = true" />

    <!-- ═══════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════ -->
    <section class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 py-28 lg:py-36 flex flex-col lg:flex-row items-center gap-16">
        <!-- Left -->
        <div class="flex-1 text-center lg:text-left">
          <span class="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-green-400 bg-green-400/10 rounded-full uppercase border border-green-400/20">
            Psychometric Assessment Platform
          </span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Understand People.<br/>
            <span class="text-green-400">Drive Growth.</span>
          </h1>
          <p class="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
            Alpha Psycho is a SaaS platform that helps organizations assess, understand, and develop their people through validated psychometric tests.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button @click="showRegister = true"
              class="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/25 transition-all text-sm">
              Start Free Trial
            </button>
            <router-link to="/pricing"
              class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all text-sm">
              View Pricing
            </router-link>
          </div>
        </div>

        <!-- Right — stats -->
        <div class="flex-1 grid grid-cols-2 gap-4 w-full max-w-md">
          <div v-for="stat in stats" :key="stat.label"
            class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
            <p class="text-3xl font-black text-white mb-1">{{ stat.value }}</p>
            <p class="text-xs text-slate-400 font-medium">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         HOW IT WORKS
    ═══════════════════════════════════════════════════════════════ -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-xs font-semibold tracking-widest text-green-600 uppercase">How It Works</span>
          <h2 class="text-3xl font-black text-gray-900 mt-2">Simple. Powerful. Scalable.</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="step in steps" :key="step.title" class="text-center">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl"
              :class="step.bg">
              <i :class="[step.icon, step.color]"></i>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         FEATURES
    ═══════════════════════════════════════════════════════════════ -->
    <section id="features" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-xs font-semibold tracking-widest text-green-600 uppercase">Features</span>
          <h2 class="text-3xl font-black text-gray-900 mt-2">Everything you need to assess talent</h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Built for HR teams, educators, and researchers who need reliable, scalable psychometric tools.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="feat in features" :key="feat.title"
            class="p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :class="feat.bg">
              <i :class="[feat.icon, feat.color]"></i>
            </div>
            <h3 class="font-bold text-gray-800 mb-2">{{ feat.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         PRICING PREVIEW — links to /pricing
    ═══════════════════════════════════════════════════════════════ -->
    <section id="pricing" class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-xs font-semibold tracking-widest text-green-600 uppercase">Pricing</span>
          <h2 class="text-3xl font-black text-gray-900 mt-2">Plans for every organization</h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Start free, scale as you grow. No hidden fees.</p>
        </div>

        <!-- Loading -->
        <div v-if="loadingPlans" class="flex justify-center py-12">
          <i class="fas fa-spinner animate-spin text-2xl text-green-500"></i>
        </div>

        <!-- Plan cards -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="plan in plans" :key="plan.id"
            class="relative bg-white rounded-2xl border-2 p-6 flex flex-col transition-all hover:shadow-lg"
            :class="plan.slug === 'professional' ? 'border-green-500 shadow-lg shadow-green-500/10' : 'border-gray-100'">

            <!-- Popular badge -->
            <div v-if="plan.slug === 'professional'"
              class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
              Most Popular
            </div>

            <div class="mb-4">
              <h3 class="font-bold text-gray-800 text-base">{{ plan.name }}</h3>
              <p class="text-xs text-gray-400 mt-1 leading-relaxed">{{ plan.description }}</p>
            </div>

            <div class="mb-6">
              <span v-if="plan.price_cents === 0" class="text-3xl font-black text-gray-900">Free</span>
              <span v-else class="text-3xl font-black text-gray-900">
                ${{ (plan.price_cents / 100).toFixed(0) }}
                <span class="text-sm font-normal text-gray-400">/{{ plan.billing_cycle }}</span>
              </span>
            </div>

            <ul class="space-y-2 mb-6 flex-1 text-xs text-gray-600">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i>
                {{ plan.max_users === -1 ? 'Unlimited users' : plan.max_users + ' users' }}
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i>
                {{ plan.max_tests === -1 ? 'Unlimited tests' : plan.max_tests + ' tests' }}
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i>
                {{ plan.max_groups === -1 ? 'Unlimited groups' : plan.max_groups + ' groups' }}
              </li>
              <li v-if="plan.has_analytics" class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i> Analytics
              </li>
              <li v-if="plan.has_api_access" class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i> API Access
              </li>
              <li v-if="plan.has_custom_branding" class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i> Custom Branding
              </li>
              <li v-if="plan.has_priority_support" class="flex items-center gap-2">
                <i class="fas fa-check text-green-500"></i> Priority Support
              </li>
            </ul>

            <router-link to="/register"
              class="block text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
              :class="plan.slug === 'professional'
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
              Get Started
            </router-link>
          </div>
        </div>

        <div class="text-center">
          <router-link to="/pricing"
            class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm">
            See full pricing details <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         CTA
    ═══════════════════════════════════════════════════════════════ -->
    <section class="py-24 bg-slate-900">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-black text-white mb-4">Ready to transform how you assess people?</h2>
        <p class="text-slate-400 mb-8 text-sm">Join organizations already using Alpha Psycho to make better talent decisions.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="showRegister = true"
            class="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all text-sm">
            Start Free — No Credit Card
          </button>
          <button @click="showLogin = true"
            class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all text-sm">
            Sign In
          </button>
        </div>
      </div>
    </section>

    <Footer />

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
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
import LoginModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'HomePage',
  components: { Header, Footer, LoginModal, RegisterModal },

  data() {
    return {
      showLogin: false,
      showRegister: false,
      plans: [],
      loadingPlans: false,

      stats: [
        { value: '500+',  label: 'Organizations' },
        { value: '50K+',  label: 'Assessments Taken' },
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '4.9★',  label: 'Customer Rating' },
      ],

      steps: [
        {
          title: 'Create Your Tests',
          desc: 'Build psychometric assessments with multiple question types — multiple choice, Likert scale, and open-ended.',
          icon: 'fas fa-file-alt', bg: 'bg-green-50', color: 'text-green-600',
        },
        {
          title: 'Assign to Groups or Individuals',
          desc: 'Assign tests to specific users or entire groups within your organization with due dates and notes.',
          icon: 'fas fa-users', bg: 'bg-blue-50', color: 'text-blue-600',
        },
        {
          title: 'Analyze Results',
          desc: 'Get detailed personality profiles, trait scores, and actionable recommendations for each tester.',
          icon: 'fas fa-chart-bar', bg: 'bg-purple-50', color: 'text-purple-600',
        },
      ],

      features: [
        { title: 'Validated Test Engine',       desc: 'MBTI, Big Five, and custom frameworks with scientifically validated scoring.',  icon: 'fas fa-brain',          bg: 'bg-green-50',  color: 'text-green-600' },
        { title: 'Multi-tenant Organizations',  desc: 'Each organization gets isolated data, groups, and user management.',            icon: 'fas fa-building',       bg: 'bg-blue-50',   color: 'text-blue-600' },
        { title: 'Group Assignments',           desc: 'Assign tests to entire groups at once — perfect for batch assessments.',        icon: 'fas fa-layer-group',    bg: 'bg-indigo-50', color: 'text-indigo-600' },
        { title: 'Real-time Analytics',         desc: 'Live dashboards showing completion rates, score distributions, and trends.',    icon: 'fas fa-chart-line',     bg: 'bg-amber-50',  color: 'text-amber-600' },
        { title: 'Trait & Category Mapping',    desc: 'Map questions to personality traits and categories for deep profiling.',        icon: 'fas fa-sliders-h',      bg: 'bg-rose-50',   color: 'text-rose-600' },
        { title: 'Secure & Compliant',          desc: 'Role-based access control, encrypted data, and audit-ready reporting.',         icon: 'fas fa-shield-alt',     bg: 'bg-teal-50',   color: 'text-teal-600' },
      ],
    };
  },

  methods: {
    async fetchPlans() {
      this.loadingPlans = true;
      try {
        const res = await this.$apiGet('/plans');
        // Show only the 4 main plans (exclude yearly variants)
        this.plans = (res.data || []).filter(p =>
          ['free', 'starter', 'professional', 'enterprise'].includes(p.slug)
        );
      } catch (e) {
        console.error('Fetch plans error:', e);
      } finally {
        this.loadingPlans = false;
      }
    },
  },

  mounted() {
    this.fetchPlans();
  },
};
</script>
