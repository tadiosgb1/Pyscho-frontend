<template>
  <div class="p-6 bg-slate-50 min-h-screen font-sans">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-800 tracking-tight">Network Overview</h1>
        <p class="text-sm text-slate-500 font-medium uppercase tracking-widest text-[10px]">Real-time SMS Traffic & Gateway Analytics</p>
      </div>
      <div class="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div class="flex -space-x-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <div class="w-2 h-2 bg-green-500 rounded-full relative"></div>
        </div>
        <span class="text-xs font-black text-slate-600 uppercase tracking-tighter">API Cluster: Operational</span>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div
        v-for="(stat, index) in aggregatorStats"
        :key="index"
        class="bg-white shadow-sm rounded-[1.8rem] p-6 flex flex-col justify-between border border-slate-200 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group cursor-default"
      >
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em] mb-1">
              {{ stat.label }}
            </h2>
            <p class="text-3xl font-black text-slate-800 group-hover:text-primary transition-colors">
              {{ stat.value }}
            </p>
          </div>
          <div :class="stat.iconBg" class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12">
            <i :class="[stat.icon, stat.iconColor]" class="text-lg"></i>
          </div>
        </div>
        <div class="mt-5 flex items-center gap-2">
          <span :class="stat.trendColor" class="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-50">
            {{ stat.trend }}
          </span>
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">vs last 24h</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
      
      <div class="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <i class="fas fa-chart-area"></i>
            </div>
            <div>
              <h2 class="text-xl font-black text-slate-800 tracking-tight uppercase">Throughput (MPS)</h2>
              <p class="text-xs font-bold text-slate-400">Messages Per Second across all routes</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 text-[10px] font-black uppercase bg-slate-900 text-white rounded-xl shadow-lg">Live</button>
            <button class="px-4 py-2 text-[10px] font-black uppercase bg-slate-50 text-slate-400 rounded-xl">24H</button>
          </div>
        </div>
        <apexchart type="area" height="350" :options="trafficChartOptions" :series="trafficSeries" />
      </div>

      <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <h2 class="text-xl font-black tracking-tight mb-2 relative z-10">Delivery Ratio</h2>
        <p class="text-slate-400 text-xs font-medium mb-8 relative z-10">Success vs Failures (Last 1hr)</p>
        
        <div class="relative z-10 flex justify-center">
          <apexchart type="donut" height="300" :options="deliveryDonutOptions" :series="deliveryDonutSeries" />
        </div>

        <div class="mt-8 space-y-4 relative z-10">
          <div class="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/5">
            <span class="text-xs font-bold text-slate-300">Avg. Latency</span>
            <span class="text-sm font-black text-emerald-400">1.2s</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-white/5 rounded-2xl border border-white/5">
            <span class="text-xs font-bold text-slate-300">DLR Success</span>
            <span class="text-sm font-black text-primary">98.4%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8">
      <div class="flex items-center gap-3 mb-10">
        <div class="w-2 h-8 bg-primary rounded-full"></div>
        <h2 class="text-xl font-black text-slate-800 tracking-tight uppercase">Financial & Consumption Performance</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100">
           <h3 class="text-sm font-black text-slate-700 uppercase tracking-tight mb-6 flex items-center gap-2">
            <i class="fas fa-coins text-amber-500"></i> Monthly Credit Burn
          </h3>
          <apexchart type="bar" height="300" :options="burnChartOptions" :series="burnSeries" />
        </div>

        <div class="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100">
           <h3 class="text-sm font-black text-slate-700 uppercase tracking-tight mb-6 flex items-center gap-2">
            <i class="fas fa-route text-indigo-500"></i> Success by Gateway
          </h3>
          <apexchart type="radar" height="300" :options="routeRadarOptions" :series="routeRadarSeries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// Replace with your API data in mounted()
const aggregatorStats = reactive([
  { 
    label: "Total MT Sent", 
    value: "1,284,092", 
    icon: "fas fa-paper-plane", 
    iconBg: "bg-blue-50", 
    iconColor: "text-blue-500",
    trend: "+12.5%",
    trendColor: "text-emerald-500"
  },
  { 
    label: "System Balance", 
    value: "ETB 45,200", 
    icon: "fas fa-wallet", 
    iconBg: "bg-amber-50", 
    iconColor: "text-amber-600",
    trend: "Low Credit",
    trendColor: "text-rose-500"
  },
  { 
    label: "Active Campaigns", 
    value: "42", 
    icon: "fas fa-bullhorn", 
    iconBg: "bg-purple-50", 
    iconColor: "text-purple-600",
    trend: "Steady",
    trendColor: "text-slate-400"
  },
  { 
    label: "DLR Status", 
    value: "99.1%", 
    icon: "fas fa-check-double", 
    iconBg: "bg-emerald-50", 
    iconColor: "text-emerald-600",
    trend: "+0.4%",
    trendColor: "text-emerald-500"
  }
]);

// Throughput Chart (MPS)
const trafficSeries = [{
  name: 'Messages Sent',
  data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 95, 110, 140]
}];

const trafficChartOptions = {
  chart: { toolbar: { show: false }, sparkline: { enabled: false } },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3, colors: ['#7C3AED'] },
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 90, 100] }
  },
  xaxis: { categories: ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'] },
  colors: ['#7C3AED'],
  grid: { borderColor: '#f1f5f9', strokeDashArray: 4 }
};

// Delivery Donut
const deliveryDonutSeries = [85, 10, 5];
const deliveryDonutOptions = {
  labels: ['Delivered', 'Pending', 'Failed'],
  colors: ['#10b981', '#f59e0b', '#ef4444'],
  chart: { foreColor: '#94a3b8' },
  stroke: { show: false },
  legend: { show: false },
  plotOptions: { pie: { donut: { size: '80%' } } }
};

// Credit Burn (Bar)
const burnSeries = [{ name: 'Credits', data: [400, 430, 448, 470, 540, 580, 690] }];
const burnChartOptions = {
  chart: { toolbar: { show: false } },
  plotOptions: { bar: { borderRadius: 8, columnWidth: '40%' } },
  colors: ['#7C3AED'],
  xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
};

// Route Radar
const routeRadarSeries = [{ name: 'Route Quality', data: [80, 50, 30, 40, 100, 20] }];
const routeRadarOptions = {
  chart: { toolbar: { show: false }, dropShadow: { enabled: true, blur: 1, left: 1, top: 1 } },
  labels: ['EthioTel-1', 'Safaricom-1', 'Global-Premium', 'Cheap-Route', 'Backup-P2P', 'API-Bridge'],
  colors: ['#6366f1'],
  stroke: { width: 2 },
  fill: { opacity: 0.1 },
  markers: { size: 0 }
};

</script>

<style scoped>
/* Smooth transitions for dashboard cards */
.group:hover {
  transform: translateY(-5px);
}
</style>