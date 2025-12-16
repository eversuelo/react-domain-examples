"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image?: string | null;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Agregar al carrito usando Zustand
    addItem({ id, name, price, image }, quantity);
    
    // Animación de feedback
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-purple-100/50 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-purple-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-linear-to-br from-purple-50 via-pink-50 to-rose-50">
        {image ? (
          <img
            src={`/products/${image}.jpg`}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl opacity-30">🍽️</div>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-purple-200/50">
          <p className="text-lg font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-slate-800 text-lg mb-4 line-clamp-2 min-h-14 group-hover:text-purple-600 transition-colors">
          {name}
        </h3>

        {/* Quantity Selector and Add Button */}
        <div className="flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-purple-50/50 rounded-lg p-1 border border-purple-200/50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-md bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-600 font-bold transition-all duration-200 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="font-semibold text-slate-800 w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-md bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-600 font-bold transition-all duration-200 hover:scale-105"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed ${
              isAdding
                ? "bg-green-500 scale-95"
                : "bg-linear-to-r from-purple-600 via-pink-600 to-rose-600"
            }`}
          >
            {isAdding ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 animate-bounce"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Agregado
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agregar
              </span>
            )}
          </button>
        </div>

        {/* Subtotal */}
        {quantity > 1 && (
          <div className="mt-3 pt-3 border-t border-purple-100/50 flex justify-between items-center">
            <span className="text-sm text-slate-500">Subtotal:</span>
            <span className="font-bold text-slate-800">
              ${(price * quantity).toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
