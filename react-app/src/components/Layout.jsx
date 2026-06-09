import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if (isSidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [isSidebarCollapsed]);

  return (
    <>
      <Sidebar toggleSidebar={toggleSidebar} />
      <div id="main-wrapper" className="md:ml-[sidebar-width] flex flex-col min-h-screen sidebar-transition">
        <TopBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
