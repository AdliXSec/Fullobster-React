import React from 'react';

const History = () => {
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
          <button className="px-3 py-1.5 bg-white shadow-sm rounded-DEFAULT font-label-sm text-label-sm text-on-surface border border-outline-variant/50">Hari Ini</button>
          <button className="px-3 py-1.5 hover:bg-white/50 rounded-DEFAULT font-label-sm text-label-sm text-outline transition-colors">7 Hari Terakhir</button>
          <button className="px-3 py-1.5 hover:bg-white/50 rounded-DEFAULT font-label-sm text-label-sm text-outline transition-colors">30 Hari Terakhir</button>
          <button className="px-3 py-1.5 hover:bg-white/50 rounded-DEFAULT font-label-sm text-label-sm text-outline transition-colors flex items-center gap-1">
            Kustom <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          </button>
        </div>
        <div className="h-6 w-px bg-outline-variant/50 hidden md:block"></div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input defaultChecked className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">pH Air</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input defaultChecked className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">TDS</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input defaultChecked className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">Suhu</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors">
            <input defaultChecked className="text-primary rounded-sm focus:ring-primary border-outline" type="checkbox" />
            <span className="font-label-sm text-label-sm text-on-surface">DO</span>
          </label>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-container-margin">
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-outline-variant/30 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[100px] text-primary">water_drop</span>
          </div>
          <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span> Rata-rata pH Air
          </h3>
          <div className="font-display-metrics text-display-metrics text-on-surface">7.8</div>
          <div className="font-label-sm text-label-sm text-outline mt-1">Normal Range: 7.5 - 8.2</div>
        </div>
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-outline-variant/30 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[100px] text-primary">blur_on</span>
          </div>
          <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span> Rata-rata TDS
          </h3>
          <div className="font-display-metrics text-display-metrics text-on-surface">245 <span className="text-headline-md font-body-md text-outline">mg/L</span></div>
          <div className="font-label-sm text-label-sm text-outline mt-1">Normal Range: 200 - 300</div>
        </div>
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-error-container relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[100px] text-error">thermostat</span>
          </div>
          <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-error"></span> Rata-rata Suhu
          </h3>
          <div className="font-display-metrics text-display-metrics text-error">28.5 <span className="text-headline-md font-body-md text-error/70">°C</span></div>
          <div className="font-label-sm text-label-sm text-error mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> Slightly Elevated
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] p-card-padding border border-outline-variant/30 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="material-symbols-outlined text-[100px] text-primary">bubble_chart</span>
          </div>
          <h3 className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span> Rata-rata DO
          </h3>
          <div className="font-display-metrics text-display-metrics text-on-surface">6.2 <span className="text-headline-md font-body-md text-outline">mg/L</span></div>
          <div className="font-label-sm text-label-sm text-outline mt-1">Normal Range: &gt; 5.0</div>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/50 bg-surface-container-lowest">
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Waktu</th>
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">pH Air</th>
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">TDS (mg/L)</th>
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Suhu (°C)</th>
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Oksigen (mg/L)</th>
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">Status</th>
                <th className="p-4 font-label-sm text-label-sm text-outline uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 font-metric-unit text-metric-unit text-on-surface">
              <tr className="hover:bg-surface-container-low transition-colors bg-error-container/10">
                <td className="p-4 text-on-surface-variant font-body-md text-body-md">24 Oct 2023, 14:00</td>
                <td className="p-4">7.8</td>
                <td className="p-4">245</td>
                <td className="p-4 font-semibold text-error">29.1 <span className="material-symbols-outlined text-[14px] align-middle">arrow_upward</span></td>
                <td className="p-4">6.1</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/20">Perlu Perhatian</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-4 text-on-surface-variant font-body-md text-body-md">24 Oct 2023, 13:00</td>
                <td className="p-4">7.7</td>
                <td className="p-4">242</td>
                <td className="p-4">28.0</td>
                <td className="p-4">6.3</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e6f4ea] text-[#1e8e3e] border border-[#1e8e3e]/20">Ideal</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-4 text-on-surface-variant font-body-md text-body-md">24 Oct 2023, 12:00</td>
                <td className="p-4">7.8</td>
                <td className="p-4">240</td>
                <td className="p-4">27.8</td>
                <td className="p-4">6.4</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e6f4ea] text-[#1e8e3e] border border-[#1e8e3e]/20">Ideal</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-4 text-on-surface-variant font-body-md text-body-md">24 Oct 2023, 11:00</td>
                <td className="p-4">7.9</td>
                <td className="p-4">238</td>
                <td className="p-4">27.5</td>
                <td className="p-4">6.5</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e6f4ea] text-[#1e8e3e] border border-[#1e8e3e]/20">Ideal</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-outline-variant/30 p-4 bg-surface-bright flex items-center justify-between">
          <div className="font-label-sm text-label-sm text-outline">
            Showing <span className="font-semibold text-on-surface">1</span> to <span className="font-semibold text-on-surface">6</span> of <span className="font-semibold text-on-surface">124</span> entries
          </div>
          <div className="flex gap-1">
            <button className="p-2 border border-outline-variant/50 rounded-DEFAULT text-outline hover:bg-surface-container-low disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button className="px-3 py-1 bg-primary text-on-primary rounded-DEFAULT font-label-sm text-label-sm">1</button>
            <button className="px-3 py-1 border border-outline-variant/50 text-on-surface hover:bg-surface-container-low rounded-DEFAULT font-label-sm text-label-sm">2</button>
            <button className="px-3 py-1 border border-outline-variant/50 text-on-surface hover:bg-surface-container-low rounded-DEFAULT font-label-sm text-label-sm">3</button>
            <button className="p-2 border border-outline-variant/50 rounded-DEFAULT text-outline hover:bg-surface-container-low">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default History;
