import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const glassBase = "bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]";
  const bentoLarge = `${glassBase} rounded-[32px]`;
  const bentoSmall = `${glassBase} rounded-[24px]`;

  if (loading) {
    return (
      <main className="flex-1 flex flex-col justify-center items-center h-full p-6">
        <div className={`w-full max-w-lg ${bentoLarge} p-8 flex flex-col items-center justify-center animate-pulse`}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Memuat data dashboard...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex justify-center items-center h-full p-6">
        <div className="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 rounded-[32px] p-8 shadow-sm max-w-lg">
          <div className="flex items-center gap-3 mb-2 text-rose-600 dark:text-rose-400">
            <span className="material-symbols-outlined">error</span>
            <h3 className="font-semibold text-lg">Error Loading Data</h3>
          </div>
          <p className="text-rose-600 dark:text-rose-400/80">{error}</p>
        </div>
      </main>
    );
  }

  // Hero classification colors
  let heroTheme = "from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20";
  let heroIconTheme = "text-blue-500 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/40";
  
  if (data.classification.status === "Kondisi Bahaya") {
    heroTheme = "from-rose-50/50 to-red-50/50 dark:from-rose-900/20 dark:to-red-900/20";
    heroIconTheme = "text-rose-500 dark:text-rose-400 bg-rose-100/50 dark:bg-rose-900/40";
  } else if (data.classification.status === "Perlu Perhatian") {
    heroTheme = "from-amber-50/50 to-orange-50/50 dark:from-amber-900/20 dark:to-orange-900/20";
    heroIconTheme = "text-amber-500 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/40";
  }

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full" id="main-content">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-7 gap-4 px-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Dashboard Kualitas Air</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time Monitoring</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-2">
        
        {/* Bento Item 1: Hero Classification (Slim Banner) */}
        <div className={`col-span-12 py-4 px-6 md:px-8 ${bentoLarge} bg-gradient-to-r ${heroTheme} flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden gap-4`}>
          <div className="relative z-10 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full ${heroIconTheme} flex items-center justify-center shadow-sm backdrop-blur-md flex-shrink-0`}>
              <span className="material-symbols-outlined text-3xl">{data.classification.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-0.5">
                <h3 className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium text-xs uppercase tracking-wider">{data.classification.title}</h3>
                <span className="px-2 py-0.5 rounded-full bg-white/50 dark:bg-slate-900/50 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-sm">{data.classification.status}</span>
              </div>
              <p className="text-slate-800 dark:text-slate-100 text-base font-semibold leading-snug">{data.classification.description}</p>
            </div>
          </div>
          {/* Abstract soft glow */}
          <div className="absolute right-0 top-0 w-64 h-full bg-white/40 dark:bg-slate-900/40 blur-2xl rounded-full pointer-events-none transform translate-x-1/2"></div>
        </div>

        {/* Bento Item 2: KPI Grid */}
        <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {data.metrics.map((metric) => {
            const isError = metric.trendColor.includes('error');
            const iconColor = isError ? 'text-rose-500 dark:text-rose-400' : 'text-blue-500 dark:text-blue-400';
            const iconBg = isError ? 'bg-rose-50 dark:bg-rose-900/30' : 'bg-blue-50 dark:bg-blue-900/30';

            return (
              <div key={metric.id} className={`${bentoSmall} p-5 flex flex-col justify-between hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] transition-shadow group`}>
                <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                  <span className="material-symbols-outlined">{metric.icon}</span>
                </div>
                <div>
                  <div className="text-2xl font-bold tabular-nums text-slate-800 dark:text-slate-100 mb-0.5">{metric.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">{metric.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bento Item 3: Trend Chart */}
        <div className={`col-span-12 md:col-span-8 p-8 ${bentoLarge} flex flex-col`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Analisis Kualitas Air (24j)</h3>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0', borderRadius: '16px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} 
                  itemStyle={{ fontSize: 14, color: '#1e293b', fontWeight: 'bold' }} 
                  labelStyle={{ fontSize: 12, color: '#64748b', marginBottom: 8 }} 
                />
                <ReferenceLine y={80} stroke="#94a3b8" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bento Item 4: Data Flow */}
        <div className={`col-span-12 md:col-span-4 p-8 ${bentoLarge} flex flex-col`}>
          <div className="mb-8">
             <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Alur Data</h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">Status koneksi sistem</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3/4 bg-slate-100 dark:bg-slate-700/50 rounded-full"></div>
            
            <div className="z-10 flex items-center gap-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full px-6 py-3 w-full max-w-[200px] justify-center transition-opacity duration-1000">
              <span className="material-symbols-outlined text-blue-500 dark:text-blue-400">sensors</span>
              <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">IoT Device</span>
            </div>
            
            <div className="z-10 flex items-center gap-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full px-6 py-3 w-full max-w-[200px] justify-center transition-opacity duration-1000 delay-150">
              <span className="material-symbols-outlined text-indigo-500 dark:text-indigo-400">dns</span>
              <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Server</span>
            </div>
            
            <div className="z-10 flex items-center gap-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full px-6 py-3 w-full max-w-[200px] justify-center transition-opacity duration-1000 delay-300">
              <span className="material-symbols-outlined text-sky-500 dark:text-sky-400">monitor</span>
              <span className="font-medium text-slate-700 dark:text-slate-200 text-sm">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Bento Item 5: History Table */}
        <div className={`col-span-12 p-8 ${bentoLarge}`}>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Riwayat Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">
                  <th className="py-4 px-4 font-medium whitespace-nowrap">Waktu</th>
                  <th className="py-4 px-4 font-medium">pH Air</th>
                  <th className="py-4 px-4 font-medium">TDS (mg/L)</th>
                  <th className="py-4 px-4 font-medium">Suhu (°C)</th>
                  <th className="py-4 px-4 font-medium">Oksigen (mg/L)</th>
                  <th className="py-4 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-200">
                {data.history.map((row, index) => {
                  let statusBadge = "";
                  if (row.status === "Ideal") {
                    statusBadge = <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-medium">Ideal</span>;
                  } else if (row.status === "Bahaya") {
                    statusBadge = <span className="bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-medium">Bahaya</span>;
                  } else {
                    statusBadge = <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-medium">Perhatian</span>;
                  }

                  return (
                    <tr key={index} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm tabular-nums whitespace-nowrap">{row.timestamp}</td>
                      <td className="py-4 px-4 font-medium tabular-nums">{row.ph}</td>
                      <td className="py-4 px-4 tabular-nums">{row.tds}</td>
                      <td className="py-4 px-4 tabular-nums">{row.suhu}</td>
                      <td className="py-4 px-4 tabular-nums">{row.oksigen}</td>
                      <td className="py-4 px-4">{statusBadge}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Dashboard;
