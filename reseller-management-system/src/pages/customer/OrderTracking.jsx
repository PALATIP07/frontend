import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { showToast } from '../../components/Toast';
import { formatCurrency, formatDate } from '../../utils/formatter';

const OrderTracking = () => {
  const location = useLocation();
  const [orderQuery, setOrderQuery] = useState(location.state?.orderNumber || '');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!orderQuery.trim()) return;
    
    setLoading(true);
    try {
      const data = await orderService.trackOrder(orderQuery);
      setOrder(data);
    } catch (err) {
      showToast('Order not found', 'error');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderQuery) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run on mount if state provided

  const steps = ['PAID', 'WAITING_SHIPMENT', 'SHIPPED'];
  const currentStepIdx = order ? steps.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Track Your Order</h1>
          <p className="mt-2 text-gray-500">Enter your order number to see the current shipping status.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="e.g. ORD-123456"
            className="flex-1 border-gray-300 rounded-xl shadow-sm px-6 py-4 border text-lg focus:ring-blue-500 focus:border-blue-500 font-mono tracking-wider"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold shadow-md transition disabled:bg-gray-600"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {order && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8">
            <div className="border-b border-gray-100 p-6 sm:px-8 flex flex-wrap justify-between items-center gap-4 bg-gray-50">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <div className="font-mono text-xl font-bold text-gray-900">{order.orderNumber}</div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <div className="text-xl font-bold text-gray-900">{formatCurrency(order.totalAmount)}</div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="relative">
                {/* Progress Bar Line */}
                <div className="absolute left-0 top-1/2 -mt-1 w-full h-2 bg-gray-200 rounded-full" aria-hidden="true"></div>
                <div className="absolute left-0 top-1/2 -mt-1 h-2 bg-blue-600 rounded-full transition-all duration-500" 
                     style={{ width: currentStepIdx === 0 ? '0%' : currentStepIdx === 1 ? '50%' : '100%' }}></div>
                
                {/* Progress Steps */}
                <ul className="relative flex justify-between w-full">
                  <li className="flex flex-col items-center">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${currentStepIdx >= 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </span>
                    <span className="mt-3 text-sm font-medium text-gray-900">Paid</span>
                  </li>
                  <li className="flex flex-col items-center">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${currentStepIdx >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>
                    </span>
                    <span className="mt-3 text-sm font-medium text-gray-900">Processing</span>
                  </li>
                  <li className="flex flex-col items-center">
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-4 ring-white ${currentStepIdx >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </span>
                    <span className="mt-3 text-sm font-medium text-gray-900">Shipped</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 rounded-lg bg-gray-50 p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">Order Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="block text-gray-400 mb-1">Item</span>
                    <span className="font-medium text-gray-900">{order.productName} (x{order.quantity})</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 mb-1">Order Date</span>
                    <span className="font-medium text-gray-900">{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="block text-gray-400 mb-1">Shipping To</span>
                    <span className="font-medium text-gray-900 block">{order.customerName}</span>
                    <span className="font-medium text-gray-900 block">{order.customerPhone}</span>
                    <span className="font-medium text-gray-900 block mt-1">{order.customerAddress}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
