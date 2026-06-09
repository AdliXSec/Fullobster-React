import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { name: 'Sen', score: 60 },
  { name: 'Sel', score: 65 },
  { name: 'Rab', score: 50 },
  { name: 'Kam', score: 80 },
  { name: 'Jum', score: 70 },
  { name: 'Sab', score: 90 },
  { name: 'Min', score: 95 },
];

const distributionData = [
  { name: 'Kondisi Ideal', value: 85 },
  { name: 'Perlu Perhatian', value: 15 },
];
const COLORS = ['#003d9b', '#E6F4EA'];

const Report = () => {
  return (
    <main className="p-container-margin flex-1" id="main-content">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Laporan Kesehatan & Produksi</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Analisis performa budidaya lobster dalam siklus berjalan.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-low text-on-surface border border-outline-variant py-2 px-4 rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:bg-surface-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Pilih Periode
          </button>
          <button className="bg-primary text-on-primary py-2 px-4 rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Cetak Laporan
          </button>
        </div>
      </div>

      {/* Report Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-container-margin">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Tingkat Kesintasan (SR)</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display-metrics text-display-metrics text-on-surface">85</span>
                <span className="font-metric-unit text-metric-unit text-outline">%</span>
              </div>
            </div>
            <div className="bg-[#E6F4EA] text-[#137333] p-2 rounded-full">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <div className="flex items-center text-[#137333] font-body-md text-body-md">
            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
            <span>+2% dari minggu lalu</span>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Hasil Klasifikasi</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-on-surface">Kondisi Ideal</span>
              </div>
            </div>
            <div className="bg-[#E6F4EA] text-[#137333] p-2 rounded-full">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
          </div>
          <div className="flex items-center text-outline font-body-md text-body-md">
            <span>Lingkungan optimal untuk pertumbuhan.</span>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm border border-outline-variant flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Kepatuhan Parameter</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display-metrics text-display-metrics text-on-surface">98</span>
                <span className="font-metric-unit text-metric-unit text-outline">% Ideal</span>
              </div>
            </div>
            <div className="bg-[#FFF8E1] text-[#F29900] p-2 rounded-full">
              <span className="material-symbols-outlined">rule</span>
            </div>
          </div>
          <div className="flex items-center text-outline font-body-md text-body-md">
            <span>pH & DO stabil dalam range aman</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mt-2">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-card-padding shadow-sm border border-outline-variant flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Tren Kualitas Air Agregat</h2>
            <button className="text-outline hover:text-primary transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="relative flex-1 min-h-[300px] w-full pb-2 flex items-end mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#c3c6d6" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737685', fontSize: 12, fontFamily: 'Inter' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737685', fontSize: 12, fontFamily: 'Inter' }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e1e2e4', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} itemStyle={{ fontFamily: 'Inter', fontSize: 14 }} labelStyle={{ fontFamily: 'Inter', fontSize: 12, color: '#737685', marginBottom: 4 }} />
                <ReferenceLine y={80} stroke="#137333" strokeDasharray="4 4" label={{ position: 'top', value: 'Ideal Threshold', fill: '#137333', fontSize: 10, fontFamily: 'Inter' }} />
                <Line type="monotone" dataKey="score" stroke="#003d9b" strokeWidth={3} dot={{ r: 4, fill: '#003d9b', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Distribution Chart */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm border border-outline-variant flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Distribusi Status Kondisi</h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Recharts Donut Chart */}
            <div className="w-56 h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    stroke="none"
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e1e2e4', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} itemStyle={{ fontFamily: 'Inter', fontSize: 14 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="block font-display-metrics text-display-metrics text-on-surface">85%</span>
                  <span className="block font-label-sm text-label-sm text-outline uppercase">Ideal</span>
                </div>
              </div>
            </div>
            <div className="w-full mt-8 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="font-body-md text-body-md text-on-surface">Kondisi Ideal</span>
                </div>
                <span className="font-label-sm text-label-sm font-semibold text-on-surface">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E6F4EA]"></div>
                  <span className="font-body-md text-body-md text-on-surface">Perlu Perhatian</span>
                </div>
                <span className="font-label-sm text-label-sm font-semibold text-on-surface">15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Report;
