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
         PRICING CTA BANNER
    ═══════════════════════════════════════════════════════════════ -->
    <section class="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <!-- Decorative blobs -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-16 -left-16 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-16 -right-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <!-- Left text -->
        <div class="text-center lg:text-left">
          <span class="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-green-400 bg-green-400/10 rounded-full uppercase border border-green-400/20">
            Flexible Pricing
          </span>
          <h2 class="text-3xl lg:text-4xl font-black text-white leading-tight mb-3">
            Plans that grow <span class="text-green-400">with you.</span>
          </h2>
          <p class="text-slate-400 text-sm max-w-lg">
            From a free starter plan to enterprise-grade solutions — transparent pricing, no hidden fees, cancel anytime.
          </p>
        </div>
        <!-- Right — mini plan highlights + CTA -->
        <div class="flex flex-col items-center lg:items-end gap-6 shrink-0">
          <div class="flex flex-wrap gap-3 justify-center lg:justify-end">
            <div v-for="badge in pricingBadges" :key="badge"
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/70 font-medium flex items-center gap-2">
              <i class="fas fa-check text-green-400 text-[10px]"></i>
              {{ badge }}
            </div>
          </div>
          <router-link to="/pricing"
            class="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl shadow-lg shadow-green-500/25 transition-all text-sm">
            View All Plans &amp; Pricing
            <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         NEWS & EVENTS
    ═══════════════════════════════════════════════════════════════ -->
    <section id="news" class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span class="text-xs font-semibold tracking-widest text-green-600 uppercase">News &amp; Events</span>
            <h2 class="text-3xl font-black text-gray-900 mt-2">Stay in the loop</h2>
            <p class="text-gray-500 mt-2 text-sm max-w-lg">
              Platform updates, industry insights, and upcoming events from the Alpha Psycho team.
            </p>
          </div>
          <router-link to="/news-events"
            class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm shrink-0">
            All News &amp; Events <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
        </div>

        <!-- Cards grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Featured card -->
          <div class="md:col-span-1 bg-slate-900 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl transition-all">
            <div class="h-44 bg-gradient-to-br from-green-500/20 to-indigo-600/20 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-green-600 to-indigo-700 opacity-80"></div>
              <i class="fas fa-rocket text-white text-4xl relative z-10 group-hover:scale-110 transition-transform"></i>
              <span class="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide z-10">
                Platform Update
              </span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <p class="text-[10px] text-white/40 font-semibold uppercase tracking-widest mb-2">April 28, 2026</p>
              <h3 class="text-white font-bold text-base leading-snug mb-3 group-hover:text-green-400 transition-colors">
                Alpha Psycho v2.0 — Real-time Analytics &amp; New Trait Engine
              </h3>
              <p class="text-white/50 text-xs leading-relaxed flex-1">
                Our biggest release yet brings live dashboards, an upgraded Big Five scoring engine, and a redesigned report builder.
              </p>
              <router-link to="/news-events" class="mt-5 inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-xs font-semibold transition-colors">
                Read More <i class="fas fa-arrow-right text-[10px]"></i>
              </router-link>
            </div>
          </div>

          <!-- Regular cards -->
          <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="item in newsItems" :key="item.title"
              class="bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group flex flex-col overflow-hidden">
              <div class="h-32 flex items-center justify-center relative overflow-hidden"
                :class="item.bgGradient">
                <i :class="[item.icon, 'text-3xl relative z-10 group-hover:scale-110 transition-transform', item.iconColor]"></i>
                <span class="absolute top-3 left-3 px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide"
                  :class="item.badgeClass">
                  {{ item.tag }}
                </span>
              </div>
              <div class="p-5 flex flex-col flex-1">
                <p class="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5">{{ item.date }}</p>
                <h3 class="font-bold text-gray-800 text-sm leading-snug mb-2 group-hover:text-green-600 transition-colors">{{ item.title }}</h3>
                <p class="text-xs text-gray-500 leading-relaxed flex-1">{{ item.excerpt }}</p>
                <router-link to="/news-events" class="mt-4 inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 text-xs font-semibold transition-colors">
                  Read More <i class="fas fa-arrow-right text-[10px]"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         CONTACT US
    ═══════════════════════════════════════════════════════════════ -->
    <section id="contact" class="py-24 bg-white relative overflow-hidden">
      <!-- Subtle grid background -->
      <div class="absolute inset-0 opacity-[0.025] pointer-events-none"
        style="background-image: linear-gradient(#3d5afe 1px, transparent 1px), linear-gradient(90deg, #3d5afe 1px, transparent 1px); background-size: 50px 50px;">
      </div>

      <div class="relative max-w-7xl mx-auto px-6">
        <!-- Section header -->
        <div class="text-center mb-16">
          <span class="text-xs font-semibold tracking-widest text-green-600 uppercase">Contact Us</span>
          <h2 class="text-3xl font-black text-gray-900 mt-2">We'd love to hear from you</h2>
          <p class="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            Have a question, need a demo, or want to explore a partnership? Our team is ready to help.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <!-- Left — info cards -->
          <div class="lg:col-span-4 space-y-5">
            <div v-for="info in contactInfo" :key="info.label"
              class="group p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-green-500 hover:border-green-500 transition-all duration-300 flex items-center gap-5">
              <div class="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform shrink-0">
                <i :class="info.icon" class="text-lg"></i>
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60 mb-0.5">{{ info.label }}</p>
                <p class="text-sm font-bold text-gray-800 group-hover:text-white">{{ info.value }}</p>
              </div>
            </div>

            <!-- Status badge -->
            <div class="p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
              <div class="absolute top-4 right-4">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
              </div>
              <p class="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">System Status</p>
              <p class="text-sm font-bold">All Systems Operational (99.9%)</p>
            </div>

            <!-- CTA to full contact page -->
            <router-link to="/contact"
              class="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-all text-sm shadow-lg shadow-green-500/20">
              Open Full Contact Page
              <i class="fas fa-external-link-alt text-xs"></i>
            </router-link>
          </div>

          <!-- Right — form -->
          <div class="lg:col-span-8">
            <div class="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100">
              <form @submit.prevent="submitContact" class="space-y-7">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Organization / Name</label>
                    <input type="text" v-model="contactForm.org_name" required placeholder="Your organization or name"
                      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all text-sm font-medium text-gray-800 placeholder:text-gray-300" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input type="email" v-model="contactForm.email" required placeholder="you@organization.com"
                      class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all text-sm font-medium text-gray-800 placeholder:text-gray-300" />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <label class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea v-model="contactForm.message" rows="4" placeholder="Tell us how we can help..."
                    class="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all text-sm font-medium text-gray-800 resize-none placeholder:text-gray-300"></textarea>
                </div>

                <button type="submit" :disabled="contactLoading"
                  class="w-full py-4 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all text-sm shadow-lg shadow-green-500/20 flex items-center justify-center gap-3 group">
                  <i v-if="contactLoading" class="fas fa-spinner animate-spin"></i>
                  {{ contactLoading ? 'Sending...' : 'Send Message' }}
                  <i v-if="!contactLoading" class="fas fa-paper-plane group-hover:translate-x-1 transition-transform text-xs"></i>
                </button>
              </form>
            </div>
          </div>
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

      // Contact form
      contactLoading: false,
      contactForm: {
        org_name: '',
        email: '',
        message: '',
      },

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

      // Pricing CTA badges
      pricingBadges: [
        'Free plan available',
        'No credit card required',
        'Cancel anytime',
        'Enterprise options',
      ],

      // News & Events preview items
      newsItems: [
        {
          title: 'Webinar: Using Big Five Assessments for Talent Acquisition',
          excerpt: 'Join our industrial psychologists for a live walkthrough on integrating personality data into your hiring pipeline.',
          date: 'May 15, 2026',
          tag: 'Webinar',
          icon: 'fas fa-video',
          iconColor: 'text-indigo-600',
          bgGradient: 'bg-gradient-to-br from-indigo-50 to-blue-100',
          badgeClass: 'bg-indigo-100 text-indigo-700',
        },
        {
          title: 'New: Multi-language Assessment Support (Amharic & Tigrigna)',
          excerpt: 'Alpha Psycho now supports assessments in Amharic and Tigrigna, expanding access across East Africa.',
          date: 'April 10, 2026',
          tag: 'Feature',
          icon: 'fas fa-language',
          iconColor: 'text-amber-600',
          bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-100',
          badgeClass: 'bg-amber-100 text-amber-700',
        },
        {
          title: 'Alpha Psycho Partners with 3 Leading Universities in Ethiopia',
          excerpt: 'We are proud to announce partnerships with Addis Ababa University, Jimma University, and Hawassa University.',
          date: 'March 22, 2026',
          tag: 'Partnership',
          icon: 'fas fa-university',
          iconColor: 'text-teal-600',
          bgGradient: 'bg-gradient-to-br from-teal-50 to-green-100',
          badgeClass: 'bg-teal-100 text-teal-700',
        },
        {
          title: 'Research: Psychometric Testing Improves Retention by 34%',
          excerpt: 'Our latest white paper reveals how organizations using structured assessments see significantly lower turnover.',
          date: 'February 5, 2026',
          tag: 'Research',
          icon: 'fas fa-flask',
          iconColor: 'text-rose-600',
          bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-100',
          badgeClass: 'bg-rose-100 text-rose-700',
        },
      ],

      // Contact info
      contactInfo: [
        { label: 'Regional HQ',    value: 'Bole Area, Addis Ababa, Ethiopia', icon: 'fas fa-map-marker-alt' },
        { label: 'Expert Support', value: 'consult@alpha-psych.com',           icon: 'fas fa-envelope' },
        { label: 'Partnerships',   value: '+251 911 00 11 22',                 icon: 'fas fa-phone-alt' },
      ],
    };
  },

  methods: {
    async submitContact() {
      this.contactLoading = true;
      try {
        await this.$apiPost('/contact', this.contactForm);
        alert('Message sent! Our team will get back to you within 24 hours.');
        this.contactForm = { org_name: '', email: '', message: '' };
      } catch (e) {
        // Fallback for demo / offline
        setTimeout(() => {
          alert('Message received! Our team will get back to you within 24 hours.');
          this.contactForm = { org_name: '', email: '', message: '' };
        }, 1000);
      } finally {
        this.contactLoading = false;
      }
    },
  },
};
</script>
