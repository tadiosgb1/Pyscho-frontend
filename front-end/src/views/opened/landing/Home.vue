<template>
  <div class="min-h-screen bg-slate-50 font-sans selection:bg-primary/30">
    <section id="home">
     <Header />
    </section>

     <Hero />
    
    <div class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
              <h2 class="text-4xl font-black text-slate-800 mb-6">Built for Software Developers</h2>
              <p class="text-slate-600 mb-8 leading-relaxed">Aggregate all your messaging needs through a single endpoint. Whether you use <strong>REST API</strong> or <strong>SMPP v3.4</strong>, our gateway ensures low latency and high throughput for the Ethiopian market.</p>
              <ul class="space-y-4">
                  <li class="flex items-center gap-3 font-bold text-slate-700"><i class="fas fa-bolt text-secondary"></i> Sub-second delivery</li>
                  <li class="flex items-center gap-3 font-bold text-slate-700"><i class="fas fa-shield-alt text-secondary"></i> Secure Sender-ID Management</li>
                  <li class="flex items-center gap-3 font-bold text-slate-700"><i class="fas fa-chart-line text-secondary"></i> Real-time DLR (Delivery Reports)</li>
              </ul>
          </div>
          <div class="bg-slate-900 rounded-3xl p-8 shadow-2xl font-mono text-sm text-blue-400">
              <div class="flex gap-2 mb-4">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p class="text-slate-500">// POST /api/v1/send</p>
              <p class="text-white"><span class="text-pink-500">const</span> payload = {</p>
              <p class="ml-4 text-white">"to": <span class="text-green-400">"251911..."</span>,</p>
              <p class="ml-4 text-white">"message": <span class="text-green-400">"Your OTP is 4492"</span>,</p>
              <p class="ml-4 text-white">"sender": <span class="text-green-400">"ALPHA_MSG"</span></p>
              <p class="text-white">};</p>
          </div>
      </div>
    </div>

    <Features id="features" />
    <section  id="api" class="py-24 bg-slate-900 relative overflow-hidden">
  <div class="absolute inset-0 opacity-10 pointer-events-none font-mono text-[8px] text-primary whitespace-pre overflow-hidden leading-tight">
    { "status": "success", "id": "msg_9921", "route": "direct_carrier" } ... (repeated)
  </div>

  <div class="max-w-7xl mx-auto px-6 relative z-10">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span class="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-primary bg-primary/10 rounded-full uppercase">
          Build Without Limits
        </span>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
          By Developers, <br/> <span class="text-primary italic">For Developers.</span>
        </h2>
        <p class="text-slate-400 text-lg font-medium leading-relaxed mb-10">
          Our API is designed to be integrated in minutes, not days. With comprehensive documentation, official SDKs, and a robust sandbox environment, you can start sending messages immediately.
        </p>
        
        <div class="flex flex-wrap gap-4">
          <button @click="apiDoc()" class="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3">
            Read API Docs <i class="fas fa-book-open"></i>
          </button>
          <button class="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
            View SDKs on GitHub <i class="fab fa-github"></i>
          </button>
        </div>
      </div>

      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div class="relative bg-black rounded-3xl border border-white/10 p-2 overflow-hidden shadow-2xl">
          <div class="bg-slate-900 rounded-2xl p-6 font-mono">
            <div class="flex gap-1.5 mb-6">
              <div class="w-3 h-3 rounded-full bg-rose-500"></div>
              <div class="w-3 h-3 rounded-full bg-amber-500"></div>
              <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <pre class="text-xs sm:text-sm text-slate-300">
<span class="text-primary">import</span> AlphaMessage <span class="text-primary">from</span> <span class="text-emerald-400">'alpha-sdk'</span>;

<span class="text-slate-500">// Initialize with your key</span>
<span class="text-primary">const</span> client = <span class="text-primary">new</span> AlphaMessage(<span class="text-emerald-400">'KEY_123'</span>);

<span class="text-slate-500">// Send high-priority OTP</span>
<span class="text-primary">await</span> client.sms.send({
  to: <span class="text-emerald-400">'+251911...'</span>,
  sender: <span class="text-emerald-400">'ALPHA'</span>,
  message: <span class="text-emerald-400">'Your login code is 5521'</span>
});
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
    <!-- <Plans id="plans" @select-plan="onPlanSelected" /> -->

    <section v-if="showForm" id="onboard" class="max-w-4xl mx-auto my-20 px-8 py-12 bg-white rounded-[2rem] shadow-2xl border border-slate-100 relative">
      <div class="relative z-10">
        <h3 class="text-3xl font-black mb-2 text-slate-800 tracking-tight">Onboard Your Software Company</h3>
        <p class="text-slate-500 mb-8 font-medium">Join 50+ Ethiopian software companies using Alpha Message.</p>
        
        <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
            <input v-model="form.company_name" type="text" placeholder="e.g. Addis Tech Solutions" class="custom-input" required />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sender ID (Alpha-numeric)</label>
            <input v-model="form.sender_id" type="text" placeholder="e.g. ADDIS_PAY" class="custom-input" required />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Email</label>
            <input v-model="form.email" type="email" placeholder="dev@company.com" class="custom-input" required />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
            <input v-model="form.phone_number" type="text" placeholder="+251..." class="custom-input" required />
          </div>
          <div class="col-span-full space-y-1">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <input v-model="form.password" type="password" placeholder="••••••••" class="custom-input" required />
          </div>

          <div class="col-span-full pt-4">
            <button class="w-full bg-primary hover:bg-dprimary text-white py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl transition-all" type="submit">
              Register for API Key
            </button>
          </div>
        </form>
      </div>
    </section>
    <whyAlphaMessage />
    <pricingPreview />
    <Fqs />
    <ContactUs />
    <secondaryCta />
    <Footer />
  </div>
</template>

<script>
// --- CORRECT IMPORTS ---
import Header from './header.vue'
import Footer from './footer.vue'
import Hero from './hero.vue'
import Features from './features.vue'
// import Plans from "./plans.vue"
import Fqs from './fqs.vue'
import ContactUs from './contactUs.vue'
import LoginModal from '../auth/login.vue'
import whyAlphaMessage from './whyAlphaMessage.vue'
import secondaryCta from './secondary-cta.vue'
import pricingPreview from './pricing-preview.vue'
// Note: PropertiesSection removed as it doesn't fit the SMS Aggregator model

export default {
  components: {
    Header,
    Hero,
    Features,
    // Plans,
    Fqs,
    ContactUs,
    Footer,
    LoginModal,
    whyAlphaMessage,
    secondaryCta,
    pricingPreview
  },
  data() {
    return {
      showLoginModal: false,
      selectedLang: "en",
      mobileMenuOpen: false,
      selectedPlan: null,
      showForm: false,
      form: {
        company_name: '',
        sender_id: '',
        email: '',
        password: '',
        phone_number: ''
      }
    };
  },
  methods: {
    apiDoc(){
      this.$router.push('/send-sms');
    },
    onPlanSelected(planId) {
      this.selectedPlan = planId;
      this.showForm = true;
      // Smooth scroll to form
      setTimeout(() => {
        const el = document.getElementById('onboard');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    scrollTo(id) {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
    },
    async submitForm() {
        // Implementation for aggregator registration
        console.log("Submitting Aggregator Registration:", this.form);
        alert("Request sent! Our team will verify your Sender ID within 24 hours.");
    }
  }
};
</script>

<style scoped>
.custom-input {
  @apply w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 
         transition-all outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-slate-300;
}
.text-shadow {
    text-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>