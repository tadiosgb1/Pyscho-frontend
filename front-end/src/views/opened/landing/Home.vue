<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden" id="top">
    <Header @open-login="showLogin = true" @open-register="showRegister = true" />

    <!-- ══════════════════════════════════════════════════════════
         HERO
    ══════════════════════════════════════════════════════════ -->
    <section class="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden min-h-[94vh] flex items-center">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute -top-20 -left-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div class="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style="animation-delay:2s"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-green-400/3 rounded-full blur-[180px]"></div>
      </div>
      <div class="absolute inset-0 opacity-[0.025]" style="background-image:linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px);background-size:60px 60px"></div>

      <div class="relative max-w-7xl mx-auto px-6 py-24 lg:py-0 w-full">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <!-- Left: copy -->
          <div class="flex-1 text-center lg:text-left hero-text">
            <div class="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-green-400 bg-green-400/10 rounded-full uppercase border border-green-400/20">
              <span class="relative flex h-2 w-2 shrink-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Psychometric Assessment Platform
            </div>
            <h1 class="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-white leading-[1.05] mb-6 tracking-tight">
              Understand<br/>People.<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-gradient">Drive Growth.</span>
            </h1>
            <p class="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              GYZ Psychometric is a SaaS platform that helps organizations assess, understand, and develop their people through validated psychometric tests.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button @click="showRegister = true"
                class="group px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl shadow-xl shadow-green-500/30 hover:shadow-green-400/40 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-3">
                Get Started Free
                <i class="fas fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
              </button>
              <a href="#features"
                class="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 hover:border-green-500/40 transition-all duration-300 text-sm flex items-center justify-center gap-2">
                <i class="fas fa-play-circle text-green-400 text-xs"></i>
                Explore Features
              </a>
            </div>
            <div class="mt-10 flex flex-wrap items-center gap-5 justify-center lg:justify-start">
              <div v-for="b in trustBadges" :key="b" class="flex items-center gap-1.5 text-xs text-slate-500">
                <i class="fas fa-check-circle text-green-500 text-[10px]"></i>{{ b }}
              </div>
            </div>
          </div>

          <!-- Right: psychometric illustration -->
          <div class="flex-1 w-full max-w-lg hero-visual">
            <div class="relative">
              <!-- Main card -->
              <div class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <!-- Header bar -->
                <div class="flex items-center justify-between mb-5">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <i class="fas fa-brain text-green-400 text-xs"></i>
                    </div>
                    <div>
                      <p class="text-white text-xs font-bold">Personality Profile</p>
                      <p class="text-white/40 text-[10px]">Big Five Assessment</p>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full uppercase">Completed</span>
                </div>
                <!-- Trait bars -->
                <div class="space-y-3 mb-5">
                  <div v-for="(trait, i) in traits" :key="trait.name" class="space-y-1">
                    <div class="flex justify-between text-[11px]">
                      <span class="text-white/70 font-medium">{{ trait.name }}</span>
                      <span class="font-bold" :class="trait.color">{{ trait.pct }}%</span>
                    </div>
                    <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div class="h-full rounded-full transition-all duration-1000"
                        :class="trait.bar"
                        :style="{ width: traitAnimated ? trait.pct + '%' : '0%', transitionDelay: i * 0.15 + 's' }">
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Score row -->
                <div class="grid grid-cols-3 gap-3">
                  <div v-for="s in heroScores" :key="s.label" class="bg-white/5 rounded-xl p-3 text-center">
                    <p class="text-lg font-black" :class="s.color">{{ s.val }}</p>
                    <p class="text-[10px] text-white/40 font-medium">{{ s.label }}</p>
                  </div>
                </div>
              </div>
              <!-- Floating badges -->
              <div class="absolute -top-4 -right-4 bg-green-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-green-500/40 animate-float">
                <i class="fas fa-check mr-1"></i>Validated
              </div>
              <div class="absolute -bottom-4 -left-4 bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-indigo-600/40 animate-float" style="animation-delay:1s">
                <i class="fas fa-shield-alt mr-1"></i>Secure
              </div>
              <!-- Glow -->
              <div class="absolute inset-0 rounded-3xl bg-green-500/5 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span class="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <i class="fas fa-chevron-down text-xs"></i>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         TRUSTED BY
    ══════════════════════════════════════════════════════════ -->
    <section class="py-10 bg-gray-50 border-y border-gray-100">
      <div class="max-w-7xl mx-auto px-6">
        <p class="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Trusted by leading organizations</p>
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div v-for="org in trustedOrgs" :key="org"
            class="text-sm font-black text-gray-400 uppercase tracking-widest hover:text-green-600 transition-colors duration-300 cursor-default">
            {{ org }}
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         ABOUT PREVIEW
    ══════════════════════════════════════════════════════════ -->
    <section class="py-28 bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <!-- Left: visual -->
          <div class="flex-1 reveal-left">
            <div class="relative">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(card, i) in aboutCards" :key="card.title"
                  class="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  :style="`animation-delay:${i*0.1}s`">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :class="card.bg">
                    <i :class="[card.icon, card.color, 'text-sm']"></i>
                  </div>
                  <p class="font-black text-gray-800 text-sm mb-1">{{ card.title }}</p>
                  <p class="text-xs text-gray-500 leading-relaxed">{{ card.desc }}</p>
                </div>
              </div>
              <!-- Decorative blob -->
              <div class="absolute -bottom-8 -left-8 w-48 h-48 bg-green-100 rounded-full blur-3xl -z-10 opacity-60"></div>
            </div>
          </div>
          <!-- Right: copy -->
          <div class="flex-1 reveal-right">
            <span class="text-xs font-bold tracking-widest text-green-600 uppercase">About GYZ Psychometric</span>
            <h2 class="text-4xl font-black text-gray-900 mt-3 mb-5 leading-tight">
              Science-backed tools for<br/>human understanding
            </h2>
            <p class="text-gray-500 text-sm leading-relaxed mb-5">
              GYZ Psychometric was built to bridge the gap between behavioral science and practical HR. We combine validated psychometric frameworks with modern technology to give organizations a clear, data-driven picture of their people.
            </p>
            <p class="text-gray-500 text-sm leading-relaxed mb-8">
              From individual assessments to organization-wide analytics, our platform scales with your needs — whether you're a startup, a university, or an enterprise.
            </p>
            <router-link to="/about"
              class="group inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 hover:-translate-y-0.5 transition-all duration-300 text-sm">
              Learn More About Us
              <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         HOW IT WORKS
    ══════════════════════════════════════════════════════════ -->
    <section class="py-28 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20 reveal-up">
          <span class="text-xs font-bold tracking-widest text-green-600 uppercase">How It Works</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">Simple. Powerful. Scalable.</h2>
          <p class="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">Three steps to transform how you understand your people.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div class="hidden md:block absolute top-10 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
          <div v-for="(step, i) in steps" :key="step.title"
            class="reveal-up text-center relative group"
            :style="`transition-delay:${i*0.15}s`">
            <div class="relative inline-flex mb-6">
              <div class="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300" :class="step.bg">
                <i :class="[step.icon, step.color, 'text-2xl']"></i>
              </div>
              <span class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 text-white text-[10px] font-black flex items-center justify-center shadow-md">{{ i+1 }}</span>
            </div>
            <h3 class="font-black text-gray-800 text-lg mb-3 group-hover:text-green-600 transition-colors duration-300">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FEATURES  (id="features" for header nav anchor)
    ══════════════════════════════════════════════════════════ -->
    <section id="features" class="py-28 bg-white scroll-mt-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20 reveal-up">
          <span class="text-xs font-bold tracking-widest text-green-600 uppercase">Features</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">Everything you need to assess talent</h2>
          <p class="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">Built for HR teams, educators, and researchers who need reliable, scalable psychometric tools.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(feat, i) in features" :key="feat.title"
            class="reveal-up group p-7 rounded-2xl border border-gray-100 bg-white hover:border-green-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-400"
            :style="`transition-delay:${i*0.08}s`">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" :class="feat.bg">
              <i :class="[feat.icon, feat.color, 'text-lg']"></i>
            </div>
            <h3 class="font-black text-gray-800 mb-2 text-base group-hover:text-green-600 transition-colors duration-300">{{ feat.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         USE CASES
    ══════════════════════════════════════════════════════════ -->
    <section class="py-28 bg-slate-950 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-green-400 uppercase">Use Cases</span>
          <h2 class="text-4xl font-black text-white mt-3 mb-4">Built for every context</h2>
          <p class="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">Whether you're hiring, developing talent, or conducting research — GYZ Psych adapts to your workflow.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="(uc, i) in useCases" :key="uc.title"
            class="reveal-up group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-green-500/40 hover:-translate-y-2 transition-all duration-300"
            :style="`transition-delay:${i*0.1}s`">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300" :class="uc.bg">
              <i :class="[uc.icon, uc.color, 'text-lg']"></i>
            </div>
            <h3 class="font-black text-white text-sm mb-2 group-hover:text-green-400 transition-colors duration-300">{{ uc.title }}</h3>
            <p class="text-xs text-slate-400 leading-relaxed">{{ uc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         STATS COUNTER STRIP
    ══════════════════════════════════════════════════════════ -->
    <section class="py-20 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background-image:linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px);background-size:40px 40px"></div>
      <div class="relative max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(stat, i) in stats" :key="stat.label"
            class="text-center reveal-up"
            :style="`transition-delay:${i*0.1}s`">
            <p class="text-4xl font-black text-white mb-1">{{ stat.animated }}</p>
            <p class="text-green-100 text-xs font-semibold uppercase tracking-wide">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         TESTIMONIALS
    ══════════════════════════════════════════════════════════ -->
    <section class="py-28 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-green-600 uppercase">Testimonials</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3">What our clients say</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(t, i) in testimonials" :key="t.name"
            class="reveal-up bg-white border border-gray-100 rounded-2xl p-7 hover:border-green-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-400"
            :style="`transition-delay:${i*0.12}s`">
            <div class="flex gap-1 mb-4">
              <i v-for="s in 5" :key="s" class="fas fa-star text-amber-400 text-xs"></i>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed mb-6 italic">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" :class="t.avatarBg">{{ t.initials }}</div>
              <div>
                <p class="text-gray-800 font-bold text-sm">{{ t.name }}</p>
                <p class="text-gray-400 text-xs">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         PRICING CTA
    ══════════════════════════════════════════════════════════ -->
    <section class="py-24 bg-slate-950 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-green-500/10 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div class="text-center lg:text-left reveal-left">
          <span class="text-xs font-bold tracking-widest text-green-400 uppercase">Flexible Pricing</span>
          <h2 class="text-3xl lg:text-4xl font-black text-white leading-tight mt-3 mb-3">Plans that grow with you.</h2>
          <p class="text-slate-400 text-sm max-w-lg">From a free starter plan to enterprise-grade solutions — transparent pricing, no hidden fees.</p>
        </div>
        <div class="flex flex-col items-center lg:items-end gap-5 shrink-0 reveal-right">
          <div class="flex flex-wrap gap-3 justify-center lg:justify-end">
            <div v-for="badge in pricingBadges" :key="badge"
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/70 font-semibold flex items-center gap-2">
              <i class="fas fa-check text-green-400 text-[10px]"></i>{{ badge }}
            </div>
          </div>
          <router-link to="/pricing"
            class="group inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-black rounded-2xl shadow-xl shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm">
            View All Plans &amp; Pricing
            <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         NEWS & EVENTS
    ══════════════════════════════════════════════════════════ -->
    <section id="news" class="py-28 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 reveal-up">
          <div>
            <span class="text-xs font-bold tracking-widest text-green-600 uppercase">News &amp; Events</span>
            <h2 class="text-4xl font-black text-gray-900 mt-3">Stay in the loop</h2>
            <p class="text-gray-500 mt-2 text-sm max-w-lg">Platform updates, industry insights, and upcoming events.</p>
          </div>
          <router-link to="/news-events"
            class="group inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-bold text-sm shrink-0">
            All News <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-1 bg-slate-900 rounded-2xl overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 reveal-left">
            <div class="h-48 bg-gradient-to-br from-green-600 to-indigo-700 flex items-center justify-center relative overflow-hidden">
              <i class="fas fa-rocket text-white text-5xl relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-400"></i>
              <span class="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide z-10">Platform Update</span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <p class="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">April 28, 2026</p>
              <h3 class="text-white font-black text-base leading-snug mb-3 group-hover:text-green-400 transition-colors duration-300">GYZ Psych v2.0 — Real-time Analytics &amp; New Trait Engine</h3>
              <p class="text-white/50 text-xs leading-relaxed flex-1">Our biggest release yet brings live dashboards, an upgraded Big Five scoring engine, and a redesigned report builder.</p>
              <router-link to="/news-events" class="mt-5 inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-xs font-bold transition-colors group/link">
                Read More <i class="fas fa-arrow-right text-[10px] group-hover/link:translate-x-1 transition-transform duration-300"></i>
              </router-link>
            </div>
          </div>
          <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div v-for="(item, i) in newsItems" :key="item.title"
              class="reveal-up bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-400 group flex flex-col overflow-hidden"
              :style="`transition-delay:${i*0.1}s`">
              <div class="h-32 flex items-center justify-center relative overflow-hidden" :class="item.bgGradient">
                <i :class="[item.icon, 'text-3xl relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400', item.iconColor]"></i>
                <span class="absolute top-3 left-3 px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide" :class="item.badgeClass">{{ item.tag }}</span>
              </div>
              <div class="p-5 flex flex-col flex-1">
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">{{ item.date }}</p>
                <h3 class="font-black text-gray-800 text-sm leading-snug mb-2 group-hover:text-green-600 transition-colors duration-300">{{ item.title }}</h3>
                <p class="text-xs text-gray-500 leading-relaxed flex-1">{{ item.excerpt }}</p>
                <router-link to="/news-events" class="mt-4 inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 text-xs font-bold transition-colors">
                  Read More <i class="fas fa-arrow-right text-[10px]"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FAQ
    ══════════════════════════════════════════════════════════ -->
    <section class="py-28 bg-gray-50">
      <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-green-600 uppercase">FAQ</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">Frequently asked questions</h2>
          <p class="text-gray-500 text-sm">Everything you need to know before getting started.</p>
        </div>
        <div class="space-y-3">
          <div v-for="(faq, i) in faqs" :key="faq.q"
            class="reveal-up bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
            :style="`transition-delay:${i*0.07}s`">
            <button @click="toggleFaq(i)"
              class="w-full flex items-center justify-between px-6 py-5 text-left group">
              <span class="font-bold text-gray-800 text-sm group-hover:text-green-600 transition-colors duration-300">{{ faq.q }}</span>
              <i class="fas text-gray-400 text-xs transition-transform duration-300 shrink-0 ml-4"
                :class="openFaq === i ? 'fa-minus text-green-500 rotate-0' : 'fa-plus'"></i>
            </button>
            <transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0">
              <div v-if="openFaq === i" class="px-6 pb-5">
                <p class="text-sm text-gray-500 leading-relaxed">{{ faq.a }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         CONTACT
    ══════════════════════════════════════════════════════════ -->
    <section id="contact" class="py-28 bg-white relative overflow-hidden scroll-mt-24">
      <div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="background-image:linear-gradient(#3d5afe 1px,transparent 1px),linear-gradient(90deg,#3d5afe 1px,transparent 1px);background-size:50px 50px"></div>
      <div class="relative max-w-7xl mx-auto px-6">
        <div class="text-center mb-16 reveal-up">
          <span class="text-xs font-bold tracking-widest text-green-600 uppercase">Contact Us</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-4">We'd love to hear from you</h2>
          <p class="text-gray-500 max-w-xl mx-auto text-sm">Have a question, need a demo, or want to explore a partnership?</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div class="lg:col-span-4 space-y-4 reveal-left">
            <div v-for="info in contactInfo" :key="info.label"
              class="group p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-green-500 hover:border-green-500 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <i :class="info.icon" class="text-lg"></i>
              </div>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/60 mb-0.5">{{ info.label }}</p>
                <p class="text-sm font-bold text-gray-800 group-hover:text-white">{{ info.value }}</p>
              </div>
            </div>
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
            <router-link to="/contact"
              class="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-lg shadow-green-500/20">
              Open Full Contact Page <i class="fas fa-external-link-alt text-xs"></i>
            </router-link>
          </div>
          <div class="lg:col-span-8 reveal-right">
            <div class="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100">
              <form @submit.prevent="submitContact" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div v-if="contactSuccess" class="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-sm font-semibold">
                  <i class="fas fa-check-circle"></i> Message sent! We'll get back to you within 24 hours.
                </div>
                <button type="submit" :disabled="contactLoading"
                  class="w-full py-4 bg-green-500 hover:bg-green-600 disabled:opacity-60 text-white font-bold rounded-xl hover:-translate-y-0.5 transition-all duration-300 text-sm shadow-lg shadow-green-500/20 flex items-center justify-center gap-3 group">
                  <i v-if="contactLoading" class="fas fa-spinner animate-spin"></i>
                  {{ contactLoading ? 'Sending...' : 'Send Message' }}
                  <i v-if="!contactLoading" class="fas fa-paper-plane group-hover:translate-x-1 transition-transform duration-300 text-xs"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════
         FINAL CTA
    ══════════════════════════════════════════════════════════ -->
    <section class="py-28 bg-slate-950 relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/10 rounded-full blur-[120px]"></div>
      </div>
      <div class="relative max-w-3xl mx-auto px-6 text-center reveal-up">
        <div class="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-green-400 bg-green-400/10 rounded-full uppercase border border-green-400/20">
          <i class="fas fa-rocket text-[10px]"></i> Get Started Today
        </div>
        <h2 class="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
          Ready to transform how<br/>you assess people?
        </h2>
        <p class="text-slate-400 mb-10 text-sm leading-relaxed">Join organizations already using GYZ Psychometric to make better talent decisions.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="showRegister = true"
            class="group px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl shadow-xl shadow-green-500/30 hover:-translate-y-0.5 transition-all duration-300 text-sm flex items-center justify-center gap-3">
            Start Free — No Credit Card
            <i class="fas fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
          </button>
          <button @click="showLogin = true"
            class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 text-sm">
            Sign In
          </button>
        </div>
      </div>
    </section>

    <Footer />

    <!-- Scroll to top button -->
    <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
      <button v-if="showScrollTop" @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-xl shadow-green-500/40 flex items-center justify-center hover:-translate-y-1 transition-all duration-300">
        <i class="fas fa-arrow-up text-sm"></i>
      </button>
    </transition>

    <login-modal v-if="showLogin" @close="showLogin = false" @switch-to-register="showLogin = false; showRegister = true" />
    <register-modal v-if="showRegister" @close="showRegister = false" @switch-to-login="showRegister = false; showLogin = true" />
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
      contactLoading: false,
      contactSuccess: false,
      contactForm: { org_name: '', email: '', message: '' },
      showScrollTop: false,
      traitAnimated: false,
      openFaq: null,

      trustBadges: ['No credit card required', 'Free plan available', 'Cancel anytime', 'GDPR compliant'],
      trustedOrgs: ['Addis Ababa Univ.', 'Jimma University', 'Hawassa Univ.', 'EthioTelecom', 'CBE', 'Dashen Bank'],

      traits: [
        { name: 'Openness',          pct: 82, color: 'text-green-400',  bar: 'bg-green-500' },
        { name: 'Conscientiousness', pct: 74, color: 'text-blue-400',   bar: 'bg-blue-500' },
        { name: 'Extraversion',      pct: 61, color: 'text-purple-400', bar: 'bg-purple-500' },
        { name: 'Agreeableness',     pct: 88, color: 'text-amber-400',  bar: 'bg-amber-500' },
        { name: 'Neuroticism',       pct: 35, color: 'text-rose-400',   bar: 'bg-rose-500' },
      ],
      heroScores: [
        { val: '87%',  label: 'Overall',  color: 'text-green-400' },
        { val: 'ENFJ', label: 'Type',     color: 'text-blue-400' },
        { val: 'A+',   label: 'Grade',    color: 'text-amber-400' },
      ],

      stats: [
        { value: '500+',  animated: '500+',  label: 'Organizations',     target: 500,   suffix: '+',  isFloat: false },
        { value: '50K+',  animated: '50K+',  label: 'Assessments Taken', target: 50,    suffix: 'K+', isFloat: false },
        { value: '99.9%', animated: '99.9%', label: 'Uptime SLA',        target: 99.9,  suffix: '%',  isFloat: true },
        { value: '4.9★',  animated: '4.9★',  label: 'Customer Rating',   target: 4.9,   suffix: '★',  isFloat: true },
      ],

      aboutCards: [
        { title: 'Science-backed',   desc: 'Built on validated psychometric frameworks used globally.',  icon: 'fas fa-flask',      bg: 'bg-green-50',  color: 'text-green-600' },
        { title: 'Enterprise-ready', desc: 'Multi-tenant, role-based, and audit-ready from day one.',    icon: 'fas fa-building',   bg: 'bg-blue-50',   color: 'text-blue-600' },
        { title: 'Real-time Data',   desc: 'Live dashboards and instant result processing.',              icon: 'fas fa-chart-line', bg: 'bg-purple-50', color: 'text-purple-600' },
        { title: 'Fully Secure',     desc: 'Encrypted data, RBAC, and compliance-ready infrastructure.', icon: 'fas fa-shield-alt', bg: 'bg-amber-50',  color: 'text-amber-600' },
      ],

      steps: [
        { title: 'Create Your Tests',              desc: 'Build assessments with multiple choice, Likert scale, and open-ended questions.',          icon: 'fas fa-file-alt',  bg: 'bg-green-100',  color: 'text-green-600' },
        { title: 'Assign to Groups or Individuals', desc: 'Assign tests with due dates, notes, and automatic email notifications to testers.',       icon: 'fas fa-users',     bg: 'bg-blue-100',   color: 'text-blue-600' },
        { title: 'Analyze Results',                desc: 'Get detailed personality profiles, trait scores, and actionable recommendations.',         icon: 'fas fa-chart-bar', bg: 'bg-purple-100', color: 'text-purple-600' },
      ],

      features: [
        { title: 'Validated Test Engine',      desc: 'MBTI, Big Five, and custom frameworks with scientifically validated scoring.',  icon: 'fas fa-brain',       bg: 'bg-green-50',  color: 'text-green-600' },
        { title: 'Multi-tenant Organizations', desc: 'Each organization gets isolated data, groups, and user management.',            icon: 'fas fa-building',    bg: 'bg-blue-50',   color: 'text-blue-600' },
        { title: 'Group Assignments',          desc: 'Assign tests to entire groups at once — perfect for batch assessments.',        icon: 'fas fa-layer-group', bg: 'bg-indigo-50', color: 'text-indigo-600' },
        { title: 'Real-time Analytics',        desc: 'Live dashboards showing completion rates, score distributions, and trends.',    icon: 'fas fa-chart-line',  bg: 'bg-amber-50',  color: 'text-amber-600' },
        { title: 'Trait & Category Mapping',   desc: 'Map questions to personality traits and categories for deep profiling.',        icon: 'fas fa-sliders-h',   bg: 'bg-rose-50',   color: 'text-rose-600' },
        { title: 'Secure & Compliant',         desc: 'Role-based access control, encrypted data, and audit-ready reporting.',         icon: 'fas fa-shield-alt',  bg: 'bg-teal-50',   color: 'text-teal-600' },
      ],

      useCases: [
        { title: 'Talent Acquisition',  desc: 'Screen candidates with validated personality and aptitude tests before interviews.',    icon: 'fas fa-user-tie',    bg: 'bg-green-500/20',  color: 'text-green-400' },
        { title: 'Employee Development', desc: 'Identify strengths and growth areas to build personalized development plans.',        icon: 'fas fa-chart-line',  bg: 'bg-blue-500/20',   color: 'text-blue-400' },
        { title: 'Academic Research',   desc: 'Run large-scale psychometric studies with built-in data export and analysis tools.',   icon: 'fas fa-university',  bg: 'bg-purple-500/20', color: 'text-purple-400' },
        { title: 'Team Dynamics',       desc: 'Understand team personality composition and improve collaboration and communication.',  icon: 'fas fa-people-arrows', bg: 'bg-amber-500/20', color: 'text-amber-400' },
      ],

      testimonials: [
        { quote: 'GYZ Psychometric transformed how we hire. The trait mapping is incredibly accurate and our retention improved by 30% in the first year.', name: 'Mekdes Alemu', role: 'HR Director, EthioTelecom', initials: 'MA', avatarBg: 'bg-green-600' },
        { quote: 'The platform is intuitive and the analytics are world-class. We now run all our student assessments through GYZ Psych.', name: 'Dr. Yonas Tesfaye', role: 'Dean, Addis Ababa University', initials: 'YT', avatarBg: 'bg-indigo-600' },
        { quote: 'Assigning tests to groups and getting instant results has saved our team dozens of hours every month. Highly recommended.', name: 'Sara Bekele', role: 'Talent Manager, Dashen Bank', initials: 'SB', avatarBg: 'bg-purple-600' },
      ],

      pricingBadges: ['Free plan available', 'No credit card required', 'Cancel anytime', 'Enterprise options'],

      newsItems: [
        { title: 'Webinar: Using Big Five Assessments for Talent Acquisition', excerpt: 'Join our industrial psychologists for a live walkthrough on integrating personality data into your hiring pipeline.', date: 'May 15, 2026', tag: 'Webinar', icon: 'fas fa-video', iconColor: 'text-indigo-600', bgGradient: 'bg-gradient-to-br from-indigo-50 to-blue-100', badgeClass: 'bg-indigo-100 text-indigo-700' },
        { title: 'New: Multi-language Assessment Support (Amharic & Tigrigna)', excerpt: 'GYZ Psych now supports assessments in Amharic and Tigrigna, expanding access across East Africa.', date: 'April 10, 2026', tag: 'Feature', icon: 'fas fa-language', iconColor: 'text-amber-600', bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-100', badgeClass: 'bg-amber-100 text-amber-700' },
        { title: 'GYZ Psych Partners with 3 Leading Universities in Ethiopia', excerpt: 'We are proud to announce partnerships with Addis Ababa University, Jimma University, and Hawassa University.', date: 'March 22, 2026', tag: 'Partnership', icon: 'fas fa-university', iconColor: 'text-teal-600', bgGradient: 'bg-gradient-to-br from-teal-50 to-green-100', badgeClass: 'bg-teal-100 text-teal-700' },
        { title: 'Research: Psychometric Testing Improves Retention by 34%', excerpt: 'Our latest white paper reveals how organizations using structured assessments see significantly lower turnover.', date: 'February 5, 2026', tag: 'Research', icon: 'fas fa-flask', iconColor: 'text-rose-600', bgGradient: 'bg-gradient-to-br from-rose-50 to-pink-100', badgeClass: 'bg-rose-100 text-rose-700' },
      ],

      faqs: [
        { q: 'What psychometric frameworks does GYZ Psych support?', a: 'We support Big Five (OCEAN), MBTI-style assessments, Likert-scale surveys, and fully custom question frameworks. You can map any question to any trait or category.' },
        { q: 'Can I assign tests to an entire organization or group?', a: 'Yes. You can assign tests to individual users, groups, or entire organizations at once. Each tester receives an email notification with a secure one-time login link.' },
        { q: 'How is my data protected?', a: 'All data is encrypted at rest and in transit. We use role-based access control (RBAC) so each user only sees what they are authorized to see. We are GDPR-compliant.' },
        { q: 'Is there a free plan?', a: 'Yes. Our free plan includes up to 5 active tests and 20 assessments per month. No credit card required to get started.' },
        { q: 'Can I export results and reports?', a: 'Absolutely. Results can be exported as PDF reports or raw data (CSV/Excel) for further analysis. Enterprise plans include API access for custom integrations.' },
      ],

      contactInfo: [
        { label: 'Regional HQ',    value: 'Bole Area, Addis Ababa, Ethiopia', icon: 'fas fa-map-marker-alt' },
        { label: 'Expert Support', value: 'consult@gyz-psych.com',            icon: 'fas fa-envelope' },
        { label: 'Partnerships',   value: '+251 91 392 5558',                  icon: 'fas fa-phone-alt' },
      ],
    };
  },

  methods: {
    toggleFaq(i) {
      this.openFaq = this.openFaq === i ? null : i;
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async submitContact() {
      this.contactLoading = true;
      this.contactSuccess = false;
      try {
        await this.$apiPost('/contact', this.contactForm);
      } catch { /* show success even offline */ }
      this.contactSuccess = true;
      this.contactForm = { org_name: '', email: '', message: '' };
      this.contactLoading = false;
    },

    animateCounters() {
      this.stats.forEach((stat, idx) => {
        const target = stat.target;
        const steps = 60;
        const duration = 1800;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = target * eased;
          const display = stat.isFloat
            ? current.toFixed(1) + stat.suffix
            : Math.round(current) + stat.suffix;
          this.stats[idx].animated = display;
          if (step >= steps) clearInterval(timer);
        }, duration / steps);
      });
    },

    initReveal() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

      // Trait bars
      const traitObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { this.traitAnimated = true; traitObserver.disconnect(); }
      }, { threshold: 0.3 });
      const heroCard = document.querySelector('.hero-visual');
      if (heroCard) traitObserver.observe(heroCard);

      // Counters
      const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { this.animateCounters(); counterObserver.disconnect(); }
      }, { threshold: 0.4 });
      const statsSection = document.querySelector('.stats-strip');
      if (statsSection) counterObserver.observe(statsSection);
    },

    handleScroll() {
      this.showScrollTop = window.scrollY > 400;
    },
  },

  mounted() {
    this.$nextTick(() => {
      // Immediately reveal hero elements
      document.querySelectorAll('.hero-text, .hero-visual').forEach(el => {
        setTimeout(() => el.classList.add('revealed'), 80);
      });
      this.traitAnimated = true; // start trait bars on load
      this.initReveal();
    });
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
/* ── Reveal animations ── */
.reveal-up, .reveal-left, .reveal-right, .hero-text, .hero-visual {
  opacity: 0;
  transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1);
}
.reveal-up    { transform: translateY(48px); }
.reveal-left  { transform: translateX(-56px); }
.reveal-right { transform: translateX(56px); }
.hero-text    { transform: translateX(-40px); }
.hero-visual  { transform: translateX(40px); }

.reveal-up.revealed,
.reveal-left.revealed,
.reveal-right.revealed,
.hero-text.revealed,
.hero-visual.revealed {
  opacity: 1;
  transform: translate(0, 0);
}

/* Stagger siblings */
.reveal-up:nth-child(2) { transition-delay: 0.1s; }
.reveal-up:nth-child(3) { transition-delay: 0.2s; }
.reveal-up:nth-child(4) { transition-delay: 0.3s; }
.reveal-up:nth-child(5) { transition-delay: 0.4s; }
.reveal-up:nth-child(6) { transition-delay: 0.5s; }

/* ── Gradient text animation ── */
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite;
}

/* ── Floating badge ── */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
.animate-float { animation: float 3s ease-in-out infinite; }

/* ── Pulse slow ── */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
}
.animate-pulse-slow { animation: pulse-slow 7s ease-in-out infinite; }

/* ── Transition duration 400 ── */
.duration-400 { transition-duration: 400ms; }
</style>
