import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="glass-panel rounded-[32px] h-full flex flex-col items-center py-4 w-20 flex-shrink-0 z-50">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <span className="material-symbols-outlined text-white text-[24px]" data-icon="water_drop">water_drop</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-3 items-center w-full px-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300'
            }`
          }
          title="Dashboard"
        >
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/history" 
          className={({ isActive }) => 
            `flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300'
            }`
          }
          title="Riwayat Data"
        >
          <span className="material-symbols-outlined text-[24px]">history</span>
        </NavLink>
        
        <NavLink 
          to="/report" 
          className={({ isActive }) => 
            `flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300'
            }`
          }
          title="Laporan"
        >
          <span className="material-symbols-outlined text-[24px]">analytics</span>
        </NavLink>
      </nav>
      
      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-4 w-full px-4 items-center">
        <a 
          href="#" 
          className="flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/50 dark:hover:bg-slate-800/50 hover:text-slate-600 dark:hover:text-slate-300 dark:text-slate-300"
          title="Dukungan"
        >
          <span className="material-symbols-outlined text-[24px]">help</span>
        </a>
        <button 
          className="flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-300 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 dark:bg-blue-900/30"
          title="Export Laporan"
        >
          <span className="material-symbols-outlined text-[24px]">download</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
