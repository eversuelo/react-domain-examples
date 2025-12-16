"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import OrderForm from "./OrderForm";

export default function OrderSummary() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ocultar en rutas de admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  // Zustand store
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTax = useCartStore((state) => state.getTax);
  const getTotal = useCartStore((state) => state.getTotal);
  const getItemCount = useCartStore((state) => state.getItemCount);

  // Evitar errores de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calcular valores solo en el cliente para evitar errores de hidratación
  const subtotal = isMounted ? getSubtotal() : 0;
  const tax = isMounted ? getTax() : 0;
  const total = isMounted ? getTotal() : 0;
  const itemCount = isMounted ? getItemCount() : 0;

  const handleUpdateQuantity = (id: number, delta: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + delta);
    }
  };

  return (
    <>
      {/* Mobile Order Summary Button - Fixed at bottom */}
      {!isOpen && isMounted && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-50 px-6 py-3 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          aria-label="Ver resumen del pedido"
        >
          <div className="flex items-center gap-2">
            <span>🛒</span>
            <span>Ver Pedido</span>
            <span className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {itemCount}
            </span>
          </div>
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Order Summary Panel */}
      <aside
        className={`
          fixed top-16 right-0 h-[calc(100vh-4rem)] w-full sm:w-96 z-40
          bg-linear-to-b from-white via-rose-50/30 to-white
          border-l border-purple-200/50
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0 lg:w-96 xl:w-80
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-purple-200/50 bg-linear-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 shrink-0">
          <div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              Tu Pedido
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {items.length}{" "}
              {items.length === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            aria-label="Cerrar resumen"
          >
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Order Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {!isMounted || items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-slate-400 font-medium">Tu pedido está vacío</p>
              <p className="text-slate-300 text-sm mt-2">
                Agrega productos para comenzar
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-md border border-purple-100/50 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-purple-600 font-bold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-purple-50/50 rounded-lg p-1">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-md bg-white border border-purple-200 hover:border-red-300 hover:bg-red-50 text-red-600 font-bold transition-all duration-200 hover:scale-105"
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span className="font-semibold text-slate-800 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-md bg-white border border-purple-200 hover:border-purple-400 hover:bg-purple-50 text-purple-600 font-bold transition-all duration-200 hover:scale-105"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Subtotal</p>
                    <p className="font-bold text-slate-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        <div className="border-t border-purple-200/50 bg-linear-to-b from-white to-purple-50/30 p-6 space-y-4 shrink-0">
          {/* Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>IVA (16%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="h-px bg-linear-to-r from-transparent via-purple-200 to-transparent my-2" />
            <div className="flex justify-between text-lg font-bold text-slate-800">
              <span>Total</span>
              <span className="bg-linear-to-rrom-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Clear Cart */}
          {items.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                setIsOpen(false);
              }}
              className="w-full py-2 text-red-600 hover:text-red-700 font-medium text-sm hover:bg-red-50 rounded-lg transition-colors"
            >
              Vaciar pedido
            </button>
          )}
        </div>

        {/* Order Form */}
        <div className="border-t border-purple-200/50 bg-white">
          <OrderForm />
        </div>
      </aside>
    </>
  );
}
