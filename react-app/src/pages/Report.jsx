import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#ef4444'];

const Report = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/report`);
        if (!response.ok) throw new Error('Network response was not ok');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <main className="p-8 flex-1 flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8 flex-1 flex justify-center items-center h-full">
        <div className="text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 border border-rose-100 p-4 rounded-2xl">Error loading data: {error}</div>
      </main>
    );
  }

  // Helper variables for classification
  let classIcon = "check_circle";
  let classBg = "bg-emerald-50";
  let classText = "text-emerald-600 dark:text-emerald-400";
  let classDesc = "Lingkungan optimal untuk pertumbuhan.";
  
  if (data.summary.classification === "Bahaya" || data.summary.classification === "Kondisi Bahaya") {
    classIcon = "warning";
    classBg = "bg-rose-50";
    classText = "text-rose-600 dark:text-rose-400";
    classDesc = "Parameter kritis. Segera lakukan tindakan!";
  } else if (data.summary.classification === "Perlu Perhatian") {
    classIcon = "info";
    classBg = "bg-amber-50";
    classText = "text-amber-600 dark:text-amber-400";
    classDesc = "Beberapa parameter butuh perhatian.";
  }

  const idealItem = data.distributionData.find(d => d.name === "Kondisi Ideal");
  const idealPercentage = idealItem ? idealItem.value : 0;

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Laporan Kesehatan & Produksi</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Analisis performa budidaya lobster dalam siklus berjalan.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/80 py-2 px-4 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Pilih Periode
          </button>
          <button className="bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 py-2 px-4 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Cetak Laporan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Report Summary Cards - 3 cards spanning col-span-4 */}
        <div className="col-span-12 md:col-span-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[24px] p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Tingkat Kesintasan (SR)</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-light text-slate-800 dark:text-slate-100 tabular-nums">{data.summary.sr}</span>
                <span className="text-lg font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">%</span>
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-2.5 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <span className="material-symbols-outlined text-sm mr-1.5">trending_up</span>
            <span>berdasarkan simulasi WQI</span>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[24px] p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Hasil Klasifikasi</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{data.summary.classification}</span>
              </div>
            </div>
            <div className={`${classBg} ${classText} p-2.5 rounded-full flex items-center justify-center`}>
              <span className="material-symbols-outlined">{classIcon}</span>
            </div>
          </div>
          <div className="flex items-center text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">
            <span>{classDesc}</span>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[24px] p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kepatuhan Parameter</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-light text-slate-800 dark:text-slate-100 tabular-nums">{data.summary.compliance}</span>
                <span className="text-lg font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">% Ideal</span>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2.5 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">rule</span>
            </div>
          </div>
          <div className="flex items-center text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">
            <span>Rata-rata kestabilan pH, TDS, Suhu & DO</span>
          </div>
        </div>

        {/* Charts Section */}
        {/* Main Trend Chart */}
        <div className="col-span-12 md:col-span-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[32px] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Tren Kualitas Air Mingguan</h2>
            <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full p-1.5 transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="relative flex-1 min-h-[300px] w-full flex items-end">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trendData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 110]} ticks={[0, 25, 50, 75, 100]} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} 
                  itemStyle={{ fontSize: 14, color: '#1e293b', fontWeight: 500 }} 
                  labelStyle={{ fontSize: 12, color: '#64748b', marginBottom: 4 }} 
                />
                <ReferenceLine y={80} stroke="#10b981" strokeDasharray="4 4" label={{ position: 'top', value: 'Ideal Threshold', fill: '#10b981', fontSize: 11 }} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#ffffff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Distribution Chart */}
        <div className="col-span-12 md:col-span-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[32px] p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Distribusi Status</h2>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="w-56 h-56 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={95}
                    stroke="none"
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {data.distributionData.map((entry, index) => {
                      let color = COLORS[0];
                      if (entry.name === "Kondisi Ideal" || entry.name === "Ideal") color = '#3b82f6'; 
                      else if (entry.name === "Perlu Perhatian") color = '#f59e0b';
                      else if (entry.name === "Bahaya" || entry.name === "Kondisi Bahaya") color = '#ef4444';
                      
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} 
                    itemStyle={{ fontSize: 14, color: '#1e293b', fontWeight: 500 }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="block text-4xl font-light text-slate-800 dark:text-slate-100 tabular-nums">{idealPercentage}%</span>
                  <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">Ideal</span>
                </div>
              </div>
            </div>
            
            <div className="w-full mt-8 flex flex-col gap-4">
              {data.distributionData.map((entry, index) => {
                  let bgColor = "bg-blue-500";
                  if (entry.name === "Perlu Perhatian") bgColor = "bg-amber-500";
                  if (entry.name === "Bahaya" || entry.name === "Kondisi Bahaya") bgColor = "bg-rose-500";
                  
                  return (
                    <div key={index} className="flex justify-between items-center p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${bgColor} shadow-sm`}></div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{entry.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{entry.value}%</span>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Report;
