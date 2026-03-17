<template>
  <section id="contact" class="py-32 bg-white relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-0" 
         style="background-image: linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px); background-size: 50px 50px;">
    </div>
    
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <div class="lg:col-span-5 space-y-8">
          <div>
            <span class="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-primary bg-primary/10 rounded-full uppercase">
              Partner with Alpha
            </span>
            <h2 class="text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              Connect to the <br/> <span class="text-primary">Source.</span>
            </h2>
            <p class="text-slate-500 text-lg font-medium leading-relaxed max-w-md">
              Ready to integrate? Our engineers are standing by to help you whitelist your Sender ID and optimize your routing.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div v-for="info in contactInfo" :key="info.label" 
                 class="group p-6 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-primary hover:border-primary transition-all duration-500 flex items-center gap-6">
              <div class="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <i :class="info.icon" class="text-xl"></i>
              </div>
              <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/60 mb-1">{{ info.label }}</p>
                <p class="text-md font-bold text-slate-800 group-hover:text-white">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Gateway Status</p>
            <p class="text-sm font-bold">All API Nodes Operational (99.99%)</p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 relative">
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-3xl -rotate-12 -z-10 opacity-20"></div>
            
            <form @submit.prevent="submitForm" class="space-y-10">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
                  <input type="text" v-model="form.full_name" required placeholder="Addis Tech PLC" 
                    class="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-800 placeholder:text-slate-300" />
                </div>
                <div class="space-y-2">
                  <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                  <input type="email" v-model="form.email" required placeholder="dev@company.com" 
                    class="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-800 placeholder:text-slate-300" />
                </div>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Integration Type</label>
                <select v-model="form.subject" class="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-800">
                  <option value="rest">REST API Integration</option>
                  <option value="smpp">SMPP Direct Bind</option>
                  <option value="bulk">Bulk SMS Portal</option>
                  <option value="ussd">USSD Gateway</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Details</label>
                <textarea v-model="form.message" rows="4" placeholder="Briefly describe your messaging use-case..." 
                  class="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-800 resize-none placeholder:text-slate-300"></textarea>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-primary hover:bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group"
              >
                {{ loading ? 'Transmitting Data...' : 'Request API Access' }}
                <i class="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      contactInfo: [
        { label: 'HQ Address', value: 'Bole, Friendship Bldg, Addis Ababa', icon: 'fas fa-building' },
        { label: 'Dev Support', value: 'api-support@alphamsg.com', icon: 'fas fa-code' },
        { label: 'Sales Line', value: '+251 911 00 11 22', icon: 'fas fa-phone-volume' },
      ],
      form: {
        full_name: "",
        email: "",
        subject: "rest",
        message: "",
      },
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      // Simulated API Logic
      setTimeout(() => {
        alert("Transmission Received. Our tech team will contact you shortly.");
        this.loading = false;
        this.form = { full_name: "", email: "", subject: "rest", message: "" };
      }, 1500);
    }
  }
};
</script>

<style scoped>
/* Custom curve for the inputs */
input, select, textarea {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}
</style>