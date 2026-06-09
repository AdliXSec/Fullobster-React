import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ toggleSidebar }) => {
  return (
    <aside id="sidebar" className="hidden md:flex bg-surface-container-lowest w-[sidebar-width] h-screen fixed left-0 top-0 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex-col py-6 z-50 sidebar-transition">
      <div className="px-5 mb-8 flex items-center justify-between gap-3 logo-container sidebar-transition">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
          <div className="logo-text sidebar-text-transition whitespace-nowrap">
            <h1 className="font-headline-md text-headline-md text-primary">Lobster Care</h1>
            <p className="font-label-sm text-label-sm text-outline">Aquaculture IoT</p>
          </div>
        </div>
        <button className="text-outline hover:bg-surface-container-low p-1 rounded-md transition-colors" id="toggle-sidebar" title="Toggle Sidebar" onClick={toggleSidebar}>
          <span className="material-symbols-outlined icon-menu">menu</span>
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 transition-colors px-5 py-3 font-body-md text-body-md sidebar-nav-item ${isActive ? 'bg-primary-container text-primary font-bold border-l-4 border-primary' : 'text-outline hover:bg-surface-container-low'}`}>
          <span className="material-symbols-outlined flex-shrink-0" data-icon="dashboard" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="sidebar-text sidebar-text-transition whitespace-nowrap">Dashboard</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `flex items-center gap-3 transition-colors px-5 py-3 font-body-md text-body-md sidebar-nav-item ${isActive ? 'bg-primary-container text-primary font-bold border-l-4 border-primary' : 'text-outline hover:bg-surface-container-low'}`}>
          <span className="material-symbols-outlined flex-shrink-0" data-icon="history">history</span>
          <span className="sidebar-text sidebar-text-transition whitespace-nowrap">Riwayat Data</span>
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => `flex items-center gap-3 transition-colors px-5 py-3 font-body-md text-body-md sidebar-nav-item ${isActive ? 'bg-primary-container text-primary font-bold border-l-4 border-primary' : 'text-outline hover:bg-surface-container-low'}`}>
          <span className="material-symbols-outlined flex-shrink-0" data-icon="assessment">analytics</span>
          <span className="sidebar-text sidebar-text-transition whitespace-nowrap">Laporan</span>
        </NavLink>
        <a href="#" className="flex items-center gap-3 text-outline hover:bg-surface-container-low transition-colors px-5 py-3 font-body-md text-body-md sidebar-nav-item">
          <span className="material-symbols-outlined flex-shrink-0" data-icon="help">help</span>
          <span className="sidebar-text sidebar-text-transition whitespace-nowrap">Dukungan</span>
        </a>
      </nav>
      
      <div className="px-5 mt-auto sidebar-btn-container flex">
        <button className="w-full py-2 px-4 bg-primary text-on-primary rounded-DEFAULT font-label-sm text-label-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[18px] flex-shrink-0">download</span>
          <span className="export-text sidebar-text sidebar-text-transition whitespace-nowrap">Export Laporan</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
