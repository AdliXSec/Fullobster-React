import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (isDarkTheme) => {
      setIsDark(isDarkTheme);
      if (isDarkTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Initialize based on system preference or current class
    if (document.documentElement.classList.contains('dark') || mediaQuery.matches) {
      applyTheme(true);
    } else {
      applyTheme(false);
    }

    // Listen for system theme changes
    const handleChange = (e) => applyTheme(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  let pageTitle = 'Dashboard';
  let showMonitoringStatus = false;
  
  if (location.pathname === '/history') {
    pageTitle = 'Riwayat Data Pemantauan';
  } else if (location.pathname === '/report') {
    pageTitle = 'Laporan Kesehatan & Produksi';
  } else {
    showMonitoringStatus = true;
  }

  return (
    <header className="flex items-center justify-between py-3 px-4 z-40 transition-all duration-200">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{pageTitle}</h1>
        {showMonitoringStatus && (
          <div className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm glass-panel px-4 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Active
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-[18px]">search</span>
          <input 
            className="pl-11 pr-4 py-1.5 glass-panel text-slate-700 dark:text-slate-200 placeholder-slate-400 rounded-full font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-64 transition-all duration-300" 
            placeholder="Search..." 
            type="text"
          />
        </div>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="glass-panel text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:text-blue-400 transition-all duration-300 w-9 h-9 rounded-full flex items-center justify-center ml-2"
          title="Toggle Dark Mode"
        >
          <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
        </button>

        {/* Notifications */}
        <button className="glass-panel text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:text-blue-400 transition-all duration-300 w-9 h-9 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]" data-icon="notifications">notifications</span>
        </button>
        
        {/* Profile */}
        <div className="w-9 h-9 rounded-full glass-panel text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-800/80">
          LC
        </div>
      </div>
    </header>
  );
};

export default TopBar;
