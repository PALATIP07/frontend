import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">RMS Shops</Link>
          <div className="text-sm font-medium text-gray-500">
            Powered by Reseller Management System
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500 mt-auto">
        &copy; {new Date().getFullYear()} RMS Shops. All rights reserved.
      </footer>
    </div>
  );
};

export default ShopLayout;
