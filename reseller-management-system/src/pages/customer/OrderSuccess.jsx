import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderNumber } = location.state || {};

  if (!orderNumber) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been successfully processed.</p>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Order Number</p>
          <p className="text-2xl font-bold text-gray-900 font-mono tracking-wider">{orderNumber}</p>
        </div>

        <div className="space-y-3">
          <Link 
            to="/order-tracking" 
            state={{ orderNumber }}
            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition"
          >
            Track Order
          </Link>
          <Link 
            to="/" 
            className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
