import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const trendData24h = [
  { time: '00:00', score: 85 },
  { time: '04:00', score: 80 },
  { time: '08:00', score: 90 },
  { time: '12:00', score: 75 },
  { time: '16:00', score: 85 },
  { time: '20:00', score: 95 },
  { time: '24:00', score: 90 },
];

const Dashboard = () => {
  return (
    <main className="p-container-margin flex-1" id="main-content">
      <div className="mb-stack-md flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Real-time Monitoring</h2>
        <span className="text-outline text-body-md">Terakhir diperbarui: Baru saja</span>
      </div>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-md">
        {/* pH Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col gap-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-outline">
              <span className="material-symbols-outlined text-primary">water_drop</span>
              <span className="font-body-md">pH Air</span>
            </div>
            <span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-1 rounded-full font-medium">Target 6.5 - 8.5</span>
          </div>
          <div className="font-display-metrics text-display-metrics text-on-surface">7.2</div>
          <div className="flex items-center gap-1 text-primary text-sm font-medium">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="">+0.1 vs 1 jam lalu</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-low">
            <div className="h-full bg-primary w-[70%]"></div>
          </div>
        </div>
        
        {/* TDS Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col gap-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-outline">
              <span className="material-symbols-outlined text-secondary">scatter_plot</span>
              <span className="font-body-md">TDS (mg/L)</span>
            </div>
          </div>
          <div className="font-display-metrics text-display-metrics text-on-surface">245</div>
          <div className="flex items-center gap-1 text-secondary text-sm font-medium">
            <span className="material-symbols-outlined text-sm">trending_down</span>
            <span className="">-5 vs 1 jam lalu</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-low">
            <div className="h-full bg-secondary w-[40%]"></div>
          </div>
        </div>
        
        {/* Suhu Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col gap-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-outline">
              <span className="material-symbols-outlined text-tertiary">thermostat</span>
              <span className="font-body-md">Suhu (°C)</span>
            </div>
          </div>
          <div className="font-display-metrics text-display-metrics text-on-surface">28.5</div>
          <div className="flex items-center gap-1 text-outline text-sm font-medium">
            <span className="material-symbols-outlined text-sm">trending_flat</span>
            <span className="">Stabil</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-low">
            <div className="h-full bg-tertiary w-[80%]"></div>
          </div>
        </div>
        
        {/* Oksigen Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col gap-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 text-outline">
              <span className="material-symbols-outlined text-primary-container">air</span>
              <span className="font-body-md">Oksigen Terlarut</span>
            </div>
            <span className="text-outline text-xs">mg/L</span>
          </div>
          <div className="font-display-metrics text-display-metrics text-on-surface">6.8</div>
          <div className="flex items-center gap-1 text-primary-container text-sm font-medium">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span className="">+0.2 vs 1 jam lalu</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-low">
            <div className="h-full bg-primary-container w-[65%]"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-md">
        {/* Classification Result */}
        <div className="bg-primary-fixed p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] lg:col-span-1 flex flex-col justify-center">
          <h3 className="font-headline-md text-headline-md text-on-primary-fixed mb-4">Hasil Klasifikasi</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-3xl">check_circle</span>
            </div>
            <div>
              <div className="font-display-metrics text-2xl text-on-primary-fixed mb-1">Kondisi Ideal</div>
              <div className="text-on-primary-fixed-variant text-sm">Lingkungan optimal untuk pertumbuhan.</div>
            </div>
          </div>
        </div>
        
        {/* Chart Placeholder (Mockup) */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] lg:col-span-2 flex flex-col">
          
          {/* Node Flow Header & Status */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-body-lg text-body-lg text-on-surface font-semibold">Alur Data Sensor</h3>
            <div className="flex items-center gap-2 px-2.5 py-1 bg-[#E6F4EA] text-[#137333] rounded-full text-xs font-bold border border-[#137333]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#137333] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#137333]"></span>
              </span>
              System Active
            </div>
          </div>

          {/* Data Flow Animation Container */}
          <div className="mb-6 w-full overflow-x-auto pb-2 scrollbar-thin">
            <div className="min-w-[480px] relative h-24 flex items-center justify-between px-8 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/30">
              {/* Connecting Line SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <line className="text-outline-variant flow-line" stroke="currentColor" strokeWidth="2" x1="15%" x2="50%" y1="50%" y2="50%"></line>
                <line className="text-outline-variant flow-line" stroke="currentColor" strokeWidth="2" x1="50%" x2="85%" y1="50%" y2="50%"></line>
                {/* Animated Packets */}
                <circle className="text-primary data-packet" fill="currentColor" r="4"></circle>
                <circle className="text-secondary data-packet-2" fill="currentColor" r="4"></circle>
              </svg>
              
              {/* Node 1: IoT Device */}
              <div className="flex flex-col items-center gap-2 z-10 node-pulse bg-surface-container-lowest p-2 rounded-lg shadow-sm border border-outline-variant w-[110px] text-center">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">sensors</span>
                </div>
                <span className="text-label-sm text-on-surface-variant font-semibold leading-tight">IoT Device</span>
              </div>
              
              {/* Node 2: Python Service */}
              <div className="flex flex-col items-center gap-2 z-10 node-pulse-delayed bg-surface-container-lowest p-2 rounded-lg shadow-sm border border-outline-variant w-[110px] text-center">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">dns</span>
                </div>
                <span className="text-label-sm text-on-surface-variant font-semibold leading-tight">Python Service</span>
              </div>
              
              {/* Node 3: User Interface */}
              <div className="flex flex-col items-center gap-2 z-10 node-pulse bg-surface-container-lowest p-2 rounded-lg shadow-sm border border-outline-variant w-[110px] text-center">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined">monitor</span>
                </div>
                <span className="text-label-sm text-on-surface-variant font-semibold leading-tight">User Interface</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-body-lg text-body-lg text-on-surface font-semibold">Tren Kualitas Air (24 Jam)</h3>
            <button className="text-primary text-sm font-medium hover:underline">Lihat Detail</button>
          </div>
          <div className="h-48 w-full rounded bg-surface-container-lowest flex items-end pb-2 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData24h} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c3c6d6" opacity={0.5} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#737685', fontSize: 10, fontFamily: 'Inter' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737685', fontSize: 10, fontFamily: 'Inter' }} domain={[0, 100]} ticks={[0, 50, 100]} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e1e2e4', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} itemStyle={{ fontFamily: 'Inter', fontSize: 12 }} labelStyle={{ fontFamily: 'Inter', fontSize: 10, color: '#737685', marginBottom: 4 }} />
                <ReferenceLine y={80} stroke="#137333" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="score" stroke="#003d9b" strokeWidth={2} dot={{ r: 3, fill: '#003d9b', strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-stack-md">Riwayat Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant font-label-sm text-outline">
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">pH Air</th>
                <th className="py-3 px-4 font-semibold">TDS (mg/L)</th>
                <th className="py-3 px-4 font-semibold">Suhu (°C)</th>
                <th className="py-3 px-4 font-semibold">Oksigen (mg/L)</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-body-md text-on-surface">
              <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 text-outline">2023-10-27 10:00</td>
                <td className="py-3 px-4 font-medium">7.2</td>
                <td className="py-3 px-4">245</td>
                <td className="py-3 px-4">28.5</td>
                <td className="py-3 px-4">6.8</td>
                <td className="py-3 px-4"><span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-1 rounded-full">Ideal</span></td>
              </tr>
              <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 text-outline">2023-10-27 09:00</td>
                <td className="py-3 px-4 font-medium">7.1</td>
                <td className="py-3 px-4">250</td>
                <td className="py-3 px-4">28.4</td>
                <td className="py-3 px-4">6.6</td>
                <td className="py-3 px-4"><span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-1 rounded-full">Ideal</span></td>
              </tr>
              <tr className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                <td className="py-3 px-4 text-outline">2023-10-27 08:00</td>
                <td className="py-3 px-4 font-medium text-error">6.4</td>
                <td className="py-3 px-4">248</td>
                <td className="py-3 px-4">28.2</td>
                <td className="py-3 px-4">6.5</td>
                <td className="py-3 px-4"><span className="bg-error-container text-on-error-container text-xs px-2 py-1 rounded-full">Perlu Perhatian</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
