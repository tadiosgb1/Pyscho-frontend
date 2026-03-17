<template>
  <section id="faq" class="py-32 bg-slate-50 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-32 z-0"></div>
    
    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <div class="grid lg:grid-cols-3 gap-16">
        
        <div class="lg:sticky lg:top-32 h-fit">
          <span class="inline-block px-3 py-1 mb-4 text-[11px] font-bold tracking-[0.2em] text-primary bg-primary/10 rounded-md uppercase">
            Developer Support
          </span>
          <h2 class="text-4xl font-black text-slate-900 mb-6 leading-tight">
            Technical <br/> <span class="text-primary">Reliability</span> FAQ
          </h2>
          <p class="text-slate-500 font-medium mb-8 leading-relaxed">
            Everything you need to know about our Ethio Telecom SMS aggregation, API throughput, and compliance.
          </p>
          
          <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-sm font-bold text-slate-700 mb-2">Can't find an answer?</p>
            <p class="text-xs text-slate-400 mb-4">Our technical team is available 24/7 for integration support.</p>
            <button class="w-full py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary transition-colors">
              Open Support Ticket
            </button>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-4">
          <transition-group 
            appear
            @before-enter="beforeEnter"
            @enter="enter"
          >
            <div
              v-for="(faq, index) in faqs"
              :key="faq.question"
              :data-index="index"
              class="faq-item group"
            >
              <div 
                class="bg-white border transition-all duration-500 rounded-2xl"
                :class="activeIndex === index ? 'border-primary ring-4 ring-primary/5 shadow-xl' : 'border-slate-200 hover:border-slate-300'"
              >
                <button
                  @click="toggleFaq(index)"
                  class="w-full flex items-center justify-between p-7 text-left outline-none"
                >
                  <span class="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors">
                    {{ faq.question }}
                  </span>
                  <div 
                    class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-500"
                    :class="activeIndex === index ? 'rotate-180 bg-primary text-white' : 'bg-slate-100 text-slate-400'"
                  >
                    <i class="fas fa-chevron-down text-[10px]"></i>
                  </div>
                </button>

                <div
                  v-show="activeIndex === index"
                  class="overflow-hidden transition-all duration-500"
                >
                  <div class="px-7 pb-7">
                    <div class="h-px w-12 bg-primary/20 mb-6"></div>
                    <p class="text-slate-600 leading-relaxed font-medium mb-6">
                      {{ faq.answer }}
                    </p>
                    
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tag in faq.tags" :key="tag" class="text-[9px] font-black uppercase tracking-tighter px-2 py-1 bg-slate-100 text-slate-500 rounded">
                        # {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap' // Using GSAP for professional "one after the other" display

const activeIndex = ref(0)

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

// Staggered Entrance Logic
const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateY(30px)'
}

const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: el.dataset.index * 0.15, // Creates the "one after the other" effect
    onComplete: done
  })
}

const faqs = [
  {
    question: 'How do I obtain a verified Sender ID?',
    answer: 'As a licensed SMS aggregator, Alpha Message manages the registration process with Ethio Telecom. You submit your business license, and we handle the technical whitelisting of your alpha-numeric Sender ID (up to 11 characters).',
    tags: ['Compliance', 'Onboarding']
  },
  {
    question: 'What is the maximum throughput per second?',
    answer: 'Our standard API routes support up to 500 SMS/second. For high-volume enterprise needs (like national bank alerts), we provide dedicated SMPP v3.4 binds that scale to 2,000+ messages per second.',
    tags: ['Performance', 'SMPP']
  },
  {
    question: 'Do you support 2-Way SMS and Shortcodes?',
    answer: 'Yes. We provide both shared and dedicated Shortcodes (e.g., 8xxx). Our gateway supports MO (Mobile Originated) messages, allowing you to build interactive voting, survey, or registration systems.',
    tags: ['2-Way SMS', 'USSD']
  },
  {
    question: 'How are delivery reports (DLR) handled?',
    answer: 'Our REST API provides a webhook callback URL. As soon as Ethio Telecom returns the handset delivery status, our gateway pushes a JSON payload to your server with the exact timestamp and status code.',
    tags: ['API', 'Webhooks']
  },
  {
    question: 'Can I integrate with localized Amharic content?',
    answer: 'Absolutely. Alpha Message fully supports UTF-8 encoding. You can send Unicode messages in Amharic, Oromiffa, or Tigrinya. Note that Unicode messages are capped at 70 characters per SMS unit.',
    tags: ['Localization', 'Unicode']
  },
  {
    question: 'How does the billing and credit system work?',
    answer: 'We operate on a pre-paid "Credit" model or post-paid billing for vetted enterprises. Credits never expire, and you can monitor real-time consumption via your Developer Dashboard.',
    tags: ['Billing', 'Finance']
  }
]
</script>

<style scoped>
.faq-item {
  will-change: transform, opacity;
}

/* Custom scrollbar for the answer if it's too long */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>