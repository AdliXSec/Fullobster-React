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
  
  // Ensure current page is valid when data updates
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  } else if (currentPage === 0 && totalPages > 0) {
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  return (
    <main className="p-container-margin flex-1" id="main-content">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Riwayat Data Pemantauan</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Review historical sensor data and performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container-low text-on-surface border border-outline-variant py-2 px-4 rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:bg-surface-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            Download PDF
          </button>
          <button className="bg-primary text-on-primary py-2 px-4 rounded-lg font-label-sm text-label-sm flex items-center gap-2 hover:bg-primary-container transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">csv</span>
            Download CSV
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-4 mb-container-margin border border-outline-variant/30 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 mr-4">
          <span className="material-symbols-outlined text-outline">filter_list</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Filters</span>
        </div>
        <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
          <button 
            onClick={() => { setDateFilter('Semua Data'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-DEFAULT font-label-sm text-label-sm transition-colors ${dateFilter === 'Semua Data' ? 'bg-white shadow-sm text-on-surface border border-outline-variant/50' : 'hover:bg-white/50 text-outline'}`}>
            Semua Data
          </button>
          <button 
            onClick={() => { setDateFilter('7 Hari Terakhir'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-DEFAULT font-label-sm text-label-sm transition-colors ${dateFilter === '7 Hari Terakhir' ? 'bg-white shadow-sm text-on-surface border border-outline-variant/50' : 'hover:bg-white/50 text-outline'}`}>
            7 Hari Terakhir
          </button>
          <button 
            onClick={() => { setDateFilter('30 Hari Terakhir'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-DEFAULT font-label-sm text-label-sm transition-colors ${dateFilter === '30 Hari Terakhir' ? 'bg-white shadow-sm text-on-surface border border-outline-variant/50' : 'hover:bg-white/50 text-outline'}`}>
            30 Hari Terakhir
          </button>
          <button 
            onClick={() => { setDateFilter('Kustom'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded-DEFAULT font-label-sm text-label-sm flex items-center gap-1 transition-colors ${dateFilter === 'Kustom' ? 'bg-white shadow-sm text-on-surface border border-outline-variant/50' : 'hover:bg-white/50 text-outline'}`}>
            Kustom <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          </button>
        </div>
        <div className="h-6 w-px bg-outline-variant/50 hidden md:block"></div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input 
              checked={columns.ph} 
              onChange={() => setColumns(prev => ({...prev, ph: !prev.ph}))} 
              className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">pH Air</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input 
              checked={columns.tds} 
              onChange={() => setColumns(prev => ({...prev, tds: !prev.tds}))} 
              className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">TDS</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input 
              checked={columns.suhu} 
              onChange={() => setColumns(prev => ({...prev, suhu: !prev.suhu}))} 
              className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">Suhu</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input 
              checked={columns.oksigen} 
              onChange={() => setColumns(prev => ({...prev, oksigen: !prev.oksigen}))} 
              className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">DO</span>
          </label>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-container-margin">
        {columns.ph && (
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px] text-primary">water_drop</span>
            </div>
            <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Rata-rata pH Air
            </h3>
            <div className="font-display-metrics text-display-metrics text-on-surface">{avg_ph}</div>
            <div className="font-label-sm text-label-sm text-outline mt-1">Normal Range: 6.5 - 8.5</div>
          </div>
        )}
        {columns.tds && (
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px] text-primary">blur_on</span>
            </div>
            <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Rata-rata TDS
            </h3>
            <div className="font-display-metrics text-display-metrics text-on-surface">{avg_tds} <span className="text-headline-md font-body-md text-outline">mg/L</span></div>
            <div className="font-label-sm text-label-sm text-outline mt-1">Normal Range: &lt; 300</div>
          </div>
        )}
        {columns.suhu && (
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px] text-error">thermostat</span>
            </div>
            <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-error"></span> Rata-rata Suhu
            </h3>
            <div className="font-display-metrics text-display-metrics text-on-surface">{avg_suhu} <span className="text-headline-md font-body-md text-outline">°C</span></div>
            <div className="font-label-sm text-label-sm text-outline mt-1">Normal Range: 25.0 - 30.0</div>
          </div>
        )}
        {columns.oksigen && (
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px] text-primary">bubble_chart</span>
            </div>
            <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Rata-rata DO
            </h3>
            <div className="font-display-metrics text-display-metrics text-on-surface">{avg_oksigen} <span className="text-headline-md font-body-md text-outline">mg/L</span></div>
            <div className="font-label-sm text-label-sm text-outline mt-1">Normal Range: &gt; 6.0</div>
          </div>
        )}
      </div>

      {/* Data Table Card */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-surface-container-lowest z-10 shadow-sm">
              <tr className="border-b border-outline-variant/50">
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Waktu</th>
                {columns.ph && <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider transition-all">pH Air</th>}
                {columns.tds && <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider transition-all">TDS (mg/L)</th>}
                {columns.suhu && <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider transition-all">Suhu (°C)</th>}
                {columns.oksigen && <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider transition-all">Oksigen (mg/L)</th>}
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Status</th>
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 font-metric-unit text-metric-unit text-on-surface">
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-outline font-body-md">Tidak ada data untuk filter yang dipilih.</td>
                </tr>
              ) : (
                currentRecords.map((row, index) => {
                  let statusBadge = "";
                  if (row.status === "Ideal" || row.status === "Kondisi Ideal") {
                    statusBadge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e6f4ea] text-[#1e8e3e] border border-[#1e8e3e]/20">Ideal</span>;
                  } else if (row.status === "Bahaya" || row.status === "Kondisi Bahaya") {
                    statusBadge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error text-on-error border border-error/20">Bahaya</span>;
                  } else {
                    statusBadge = <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/20">Perlu Perhatian</span>;
                  }

                  return (
                    <tr key={index} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-4 text-on-surface-variant font-body-md text-body-md">{row.timestamp}</td>
                      {columns.ph && <td className={`p-4 transition-all ${row.ph < 6.5 || row.ph > 8.5 ? 'font-semibold text-error' : ''}`}>{row.ph}</td>}
                      {columns.tds && <td className={`p-4 transition-all ${row.tds > 300 ? 'font-semibold text-error' : ''}`}>{row.tds}</td>}
                      {columns.suhu && <td className={`p-4 transition-all ${row.suhu < 25.0 || row.suhu > 30.0 ? 'font-semibold text-error' : ''}`}>{row.suhu}</td>}
                      {columns.oksigen && <td className={`p-4 transition-all ${row.oksigen < 6.0 ? 'font-semibold text-error' : ''}`}>{row.oksigen}</td>}
                      <td className="p-4">{statusBadge}</td>
                      <td className="p-4 text-right">
                        <button className="text-outline hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-outline-variant/30 p-4 bg-surface-bright flex items-center justify-between">
          <div className="font-label-sm text-label-sm text-outline">
            Menampilkan <span className="font-semibold text-on-surface">{totalItems === 0 ? 0 : startIndex + 1}</span> hingga <span className="font-semibold text-on-surface">{endIndex}</span> dari <span className="font-semibold text-on-surface">{totalItems}</span> data
          </div>
          <div className="flex gap-1">
            <button 
              className="p-2 border border-outline-variant/50 rounded-DEFAULT text-outline hover:bg-surface-container-low disabled:opacity-50" 
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-DEFAULT font-label-sm text-label-sm ${currentPage === page ? 'bg-primary text-on-primary' : 'border border-outline-variant/50 text-on-surface hover:bg-surface-container-low'}`}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="p-2 border border-outline-variant/50 rounded-DEFAULT text-outline hover:bg-surface-container-low disabled:opacity-50" 
              disabled={currentPage >= totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
