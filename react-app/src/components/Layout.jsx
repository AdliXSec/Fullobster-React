import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = () => {
  return (
    <>
      {/* Background Blobs */}
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#f4f7fb] dark:bg-[#020617] transition-colors duration-300">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-300/20 dark:bg-indigo-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[25rem] h-[25rem] bg-cyan-200/20 dark:bg-cyan-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Layout Container */}
      <div className="flex h-screen p-4 gap-6">
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto rounded-3xl pb-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
