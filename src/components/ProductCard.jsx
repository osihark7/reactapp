import React from 'react';
import { Package, Star } from 'lucide-react';

export const ProductCard = ({ product, openModal }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openModal(product)}>
      <div className="relative mb-4">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">${product.price}</div>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        </div>
        <Package className="w-5 h-5 text-gray-400 mt-1" />
      </div>
      <div className="flex items-center gap-1 mt-3">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-700">{product.rating}</span>
      </div>
    </div>
  );
};
export default ProductCard;