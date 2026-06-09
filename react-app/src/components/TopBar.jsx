import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

const TopBar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    <header id="top-bar" className="h-16 sticky top-0 z-40 bg-surface-bright border-b border-outline-variant flex items-center justify-between px-gutter sidebar-transition relative">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Hamburger Menu */}
        <button 
          className="md:hidden text-outline hover:text-primary p-1 -ml-1 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
        <span className="text-primary font-headline-md text-headline-md font-semibold">{pageTitle}</span>
        {showMonitoringStatus && (
          <div className="hidden md:flex items-center gap-2 text-primary font-semibold text-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Monitoring Active
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full font-body-md text-body-md focus:ring-2 focus:ring-primary w-64 text-on-surface" placeholder="Search..." type="text"/>
        </div>
        <button className="text-outline hover:text-primary-container transition-colors p-2 rounded-full hover:bg-surface-container-low">
          <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold font-body-md shadow-sm border border-outline-variant cursor-pointer ml-2">
          LC
        </div>
        <button className="hidden md:block text-outline font-label-sm text-label-sm hover:text-primary transition-colors cursor-pointer active:opacity-80">Logout</button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-surface-container-lowest border-b border-outline-variant shadow-lg md:hidden flex flex-col p-4 gap-2 z-50">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-body-md ${isActive ? 'bg-primary-container text-primary font-bold' : 'text-outline hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            Dashboard
          </NavLink>
          <NavLink to="/history" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-body-md ${isActive ? 'bg-primary-container text-primary font-bold' : 'text-outline hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">history</span>
            Riwayat Data
          </NavLink>
          <NavLink to="/report" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg font-body-md ${isActive ? 'bg-primary-container text-primary font-bold' : 'text-outline hover:bg-surface-container-low'}`}>
            <span className="material-symbols-outlined">analytics</span>
            Laporan
          </NavLink>
          <div className="border-t border-outline-variant my-2 pt-2">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg font-body-md text-outline hover:bg-surface-container-low">
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopBar;
