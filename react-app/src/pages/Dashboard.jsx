import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard');
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
    // Refresh data every 5 seconds for dummy live effect
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main className="p-container-margin flex-1 flex justify-center items-center h-full" id="main-content">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-container-margin flex-1 flex justify-center items-center h-full" id="main-content">
        <div className="text-error bg-error-container p-4 rounded-lg">Error loading data: {error}</div>
      </main>
    );
  }

  let classBg = "bg-primary-fixed";
  let classText = "text-on-primary-fixed";
  let classIconBg = "bg-primary";
  let classIconColor = "text-on-primary";
  
  if (data.classification.status === "Kondisi Bahaya") {
    classBg = "bg-error-container";
    classText = "text-on-error-container";
    classIconBg = "bg-error";
    classIconColor = "text-on-error";
  } else if (data.classification.status === "Perlu Perhatian") {
    classBg = "bg-[#FFF4E5]"; 
    classText = "text-[#B26A00]"; 
    classIconBg = "bg-[#FFA726]";
    classIconColor = "text-white";
  }

  return (
    <main className="p-container-margin flex-1" id="main-content">
      <div className="mb-stack-md flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Real-time Monitoring</h2>
        <span className="text-outline text-body-md">Terakhir diperbarui: Baru saja</span>
      </div>
      
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-stack-md">
        {data.metrics.map((metric, index) => {
           const colorClasses = {
             ph: { icon: 'text-primary', bg: 'bg-primary', bar: 'bg-primary w-[70%]' },
             tds: { icon: 'text-secondary', bg: 'bg-secondary', bar: 'bg-secondary w-[40%]' },
             suhu: { icon: 'text-tertiary', bg: 'bg-tertiary', bar: 'bg-tertiary w-[80%]' },
             oksigen: { icon: 'text-primary-container', bg: 'bg-primary-container', bar: 'bg-primary-container w-[65%]' }
           };
           const theme = colorClasses[metric.id] || colorClasses.ph;

           return (
            <div key={metric.id} className="bg-surface-container-lowest p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col gap-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-outline">
                  <span className={`material-symbols-outlined ${theme.icon}`}>{metric.icon}</span>
                  <span className="font-body-md">{metric.title}</span>
                </div>
                {metric.subtitle && (
                  metric.id === 'ph' ? 
                  <span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-1 rounded-full font-medium">{metric.subtitle}</span> :
                  <span className="text-outline text-xs">{metric.subtitle}</span>
                )}
              </div>
              <div className="font-display-metrics text-display-metrics text-on-surface">{metric.value}</div>
              <div className={`flex items-center gap-1 ${metric.trendColor} text-sm font-medium`}>
                <span className="material-symbols-outlined text-sm">{metric.trendIcon}</span>
                <span className="">{metric.trendText}</span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-low">
                <div className={`h-full ${theme.bar}`}></div>
              </div>
            </div>
           );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-stack-md">
        {/* Classification Result */}
        <div className={`${classBg} p-card-padding rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] lg:col-span-1 flex flex-col justify-center transition-colors duration-300`}>
          <h3 className={`font-headline-md text-headline-md ${classText} mb-4`}>{data.classification.title}</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full ${classIconBg} flex items-center justify-center transition-colors duration-300`}>
              <span className={`material-symbols-outlined ${classIconColor} text-3xl`}>{data.classification.icon}</span>
            </div>
            <div>
              <div className={`font-display-metrics text-2xl ${classText} mb-1`}>{data.classification.status}</div>
              <div className={`${classText} opacity-90 text-sm`}>{data.classification.description}</div>
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
              <LineChart data={data.trend} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
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
              {data.history.map((row, index) => {
                let statusBadge = "";
                if (row.status === "Ideal") {
                  statusBadge = <span className="bg-primary-fixed text-on-primary-fixed text-xs px-2 py-1 rounded-full">Ideal</span>;
                } else if (row.status === "Bahaya") {
                  statusBadge = <span className="bg-error text-on-error text-xs px-2 py-1 rounded-full">Bahaya</span>;
                } else {
                  statusBadge = <span className="bg-error-container text-on-error-container text-xs px-2 py-1 rounded-full">Perlu Perhatian</span>;
                }

                return (
                  <tr key={index} className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 text-outline">{row.timestamp}</td>
                    <td className={`py-3 px-4 font-medium ${row.ph < 6.5 || row.ph > 8.5 ? 'text-error' : ''}`}>{row.ph}</td>
                    <td className={`py-3 px-4 ${row.tds > 300 ? 'text-error' : ''}`}>{row.tds}</td>
                    <td className={`py-3 px-4 ${row.suhu < 25.0 || row.suhu > 30.0 ? 'text-error' : ''}`}>{row.suhu}</td>
                    <td className={`py-3 px-4 ${row.oksigen < 6.0 ? 'text-error' : ''}`}>{row.oksigen}</td>
                    <td className="py-3 px-4">{statusBadge}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
