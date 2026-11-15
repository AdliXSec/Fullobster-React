import React, { useState, useEffect } from 'react';

const History = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Filter States
  const [dateFilter, setDateFilter] = useState('Semua Data');
  const [columns, setColumns] = useState({
    ph: true,
    tds: true,
    suhu: true,
    oksigen: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/history`);
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

  // Filter Logic for Date
  let filteredRecords = data.records;
  if (dateFilter !== 'Semua Data' && dateFilter !== 'Kustom') {
    const now = new Date();
    filteredRecords = data.records.filter(row => {
      const rowDate = new Date(row.timestamp);
      const diffTime = Math.abs(now - rowDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateFilter === '7 Hari Terakhir') return diffDays <= 7;
      if (dateFilter === '30 Hari Terakhir') return diffDays <= 30;
      return true;
    });
  }

  // Calculate Dynamic Averages
  let avg_ph = 0, avg_tds = 0, avg_suhu = 0, avg_oksigen = 0;
  if (filteredRecords.length > 0) {
    avg_ph = (filteredRecords.reduce((acc, row) => acc + row.ph, 0) / filteredRecords.length).toFixed(2);
    avg_tds = (filteredRecords.reduce((acc, row) => acc + row.tds, 0) / filteredRecords.length).toFixed(1);
    avg_suhu = (filteredRecords.reduce((acc, row) => acc + row.suhu, 0) / filteredRecords.length).toFixed(2);
    avg_oksigen = (filteredRecords.reduce((acc, row) => acc + row.oksigen, 0) / filteredRecords.length).toFixed(2);
  }

  // Pagination logic
  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  } else if (currentPage === 0 && totalPages > 0) {
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Riwayat Data Pemantauan</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review historical sensor data and performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 hover:bg-white/80 py-2 px-4 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            Download PDF
          </button>
          <button className="bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 py-2 px-4 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">csv</span>
            Download CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 rounded-full p-2 mb-8 flex flex-wrap gap-4 items-center shadow-sm w-max max-w-full">
        <div className="flex items-center gap-2 ml-4">
          <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-sm">filter_list</span>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Filters</span>
        </div>
        
        <div className="flex gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full">
          {['Semua Data', '7 Hari Terakhir', '30 Hari Terakhir', 'Kustom'].map(filter => (
            <button 
              key={filter}
              onClick={() => { setDateFilter(filter); setCurrentPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                dateFilter === filter 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
            >
              {filter}
              {filter === 'Kustom' && <span className="material-symbols-outlined text-[16px]">calendar_today</span>}
            </button>
          ))}
        </div>
        
        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
        
        <div className="flex gap-2 mr-2">
          {Object.keys(columns).map(col => (
            <label key={col} className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-full transition-colors ${columns[col] ? 'bg-blue-50/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
              <input 
                checked={columns[col]} 
                onChange={() => setColumns(prev => ({...prev, [col]: !prev[col]}))} 
                className="accent-blue-600 dark:accent-blue-400 rounded-sm w-3 h-3" type="checkbox" />
              <span className="text-sm font-medium capitalize">{col === 'oksigen' ? 'DO' : col === 'suhu' ? 'Suhu' : col === 'ph' ? 'pH Air' : 'TDS'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {columns.ph && (
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[24px] p-6 relative flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-lg">water_drop</span>
              Rata-rata pH Air
            </h3>
            <div className="mt-4">
              <div className="text-4xl font-light text-slate-800 dark:text-slate-100 tabular-nums">{avg_ph}</div>
              <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">Normal Range: 6.5 - 8.5</div>
            </div>
          </div>
        )}
        {columns.tds && (
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[24px] p-6 relative flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-lg">blur_on</span>
              Rata-rata TDS
            </h3>
            <div className="mt-4">
              <div className="text-4xl font-light text-slate-800 dark:text-slate-100 tabular-nums">{avg_tds} <span className="text-lg font-medium text-slate-400 dark:text-slate-500">mg/L</span></div>
              <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">Normal Range: &lt; 300</div>
            </div>
          </div>
        )}
        {columns.suhu && (
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[24px] p-6 relative flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-lg">thermostat</span>
              Rata-rata Suhu
            </h3>
            <div className="mt-4">
              <div className="text-4xl font-light text-slate-800 dark:text-slate-100 tabular-nums">{avg_suhu} <span className="text-lg font-medium text-slate-400 dark:text-slate-500">°C</span></div>
              <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">Normal Range: 25.0 - 30.0</div>
            </div>
          </div>
        )}
        {columns.oksigen && (
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[24px] p-6 relative flex flex-col justify-between">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-lg">bubble_chart</span>
              Rata-rata DO
            </h3>
            <div className="mt-4">
              <div className="text-4xl font-light text-slate-800 dark:text-slate-100 tabular-nums">{avg_oksigen} <span className="text-lg font-medium text-slate-400 dark:text-slate-500">mg/L</span></div>
              <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1">Normal Range: &gt; 6.0</div>
            </div>
          </div>
        )}
      </div>

      {/* Data Table Card */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] rounded-[32px] overflow-hidden flex flex-col">
        <div className="p-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-slate-200 dark:border-slate-700/60">
              <tr>
                <th className="pb-4 font-semibold text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Waktu</th>
                {columns.ph && <th className="pb-4 font-semibold text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">pH Air</th>}
                {columns.tds && <th className="pb-4 font-semibold text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">TDS (mg/L)</th>}
                {columns.suhu && <th className="pb-4 font-semibold text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Suhu (°C)</th>}
                {columns.oksigen && <th className="pb-4 font-semibold text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Oksigen (mg/L)</th>}
                <th className="pb-4 font-semibold text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
                <th className="pb-4 font-semibold text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-sm text-slate-700 dark:text-slate-200">
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500 dark:text-slate-400 dark:text-slate-500">Tidak ada data untuk filter yang dipilih.</td>
                </tr>
              ) : (
                currentRecords.map((row, index) => {
                  let statusBadge = "";
                  if (row.status === "Ideal" || row.status === "Kondisi Ideal") {
                    statusBadge = <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50">Ideal</span>;
                  } else if (row.status === "Bahaya" || row.status === "Kondisi Bahaya") {
                    statusBadge = <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-100/50">Bahaya</span>;
                  } else {
                    statusBadge = <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-100/50">Perlu Perhatian</span>;
                  }

                  return (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-slate-500 dark:text-slate-400 dark:text-slate-500">{row.timestamp}</td>
                      {columns.ph && <td className={`py-4 ${row.ph < 6.5 || row.ph > 8.5 ? 'font-semibold text-rose-500 dark:text-rose-400' : ''}`}>{row.ph}</td>}
                      {columns.tds && <td className={`py-4 ${row.tds > 300 ? 'font-semibold text-rose-500 dark:text-rose-400' : ''}`}>{row.tds}</td>}
                      {columns.suhu && <td className={`py-4 ${row.suhu < 25.0 || row.suhu > 30.0 ? 'font-semibold text-rose-500 dark:text-rose-400' : ''}`}>{row.suhu}</td>}
                      {columns.oksigen && <td className={`py-4 ${row.oksigen < 6.0 ? 'font-semibold text-rose-500 dark:text-rose-400' : ''}`}>{row.oksigen}</td>}
                      <td className="py-4">{statusBadge}</td>
                      <td className="py-4 text-right">
                        <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300 transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/30 px-8 py-4 flex items-center justify-between">
          <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">
            Menampilkan <span className="font-semibold text-slate-700 dark:text-slate-200">{totalItems === 0 ? 0 : startIndex + 1}</span> hingga <span className="font-semibold text-slate-700 dark:text-slate-200">{endIndex}</span> dari <span className="font-semibold text-slate-700 dark:text-slate-200">{totalItems}</span> data
          </div>
          <div className="flex gap-1">
            <button 
              className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:bg-slate-200/50 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300 disabled:opacity-30 transition-colors" 
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button 
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${currentPage === page ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-200/50'}`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 2 || 
                page === currentPage + 2
              ) {
                return <span key={page} className="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500">...</span>;
              }
              return null;
            })}
            
            <button 
              className="p-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:bg-slate-200/50 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300 disabled:opacity-30 transition-colors" 
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
