import React from 'react';
import { formatCurrency } from '../utils/formatter';

const ProductCard = ({ product, isCatalog, onAction }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={product.image || 'https://via.placeholder.com/300'} 
        alt={product.name} 
        className="h-48 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{product.name}</h3>
        
        <div className="space-y-1 mb-4 text-sm text-gray-600">
          {isCatalog && (
            <div className="flex justify-between">
              <span>Min Price:</span>
              <span className="font-medium">{formatCurrency(product.minPrice)}</span>
            </div>
          )}
          {!isCatalog && (
            <div className="flex justify-between text-blue-600 font-bold text-lg">
              <span>Price:</span>
              <span>{formatCurrency(product.sellingPrice)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Stock:</span>
            <span className={`font-medium ${product.stock < 10 ? 'text-red-500' : 'text-gray-800'}`}>
              {product.stock} units
            </span>
          </div>
        </div>

        <button
          onClick={() => onAction(product)}
          disabled={!isCatalog && product.stock === 0}
          className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
            !isCatalog && product.stock === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {isCatalog ? 'Add to Shop' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
