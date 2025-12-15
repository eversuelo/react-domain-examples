"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", icon: "🏠", href: "/" },
    { name: "Productos", icon: "📦", href: "/productos" },
    { name: "Categorías", icon: "📋", href: "/categorias" },
    { name: "Pedidos", icon: "🛒", href: "/pedidos" },
    { name: "Configuración", icon: "⚙️", href: "/configuracion" },
  ];

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 z-40
          bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          border-r border-slate-700/50
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo/Header */}
        <div className="h-20 flex items-center justify-center border-b border-slate-700/50 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quiosco
          </h1>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="
                flex items-center gap-4 px-4 py-3 rounded-lg
                text-slate-300 hover:text-white
                hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-pink-600/30
                transition-all duration-300
                border border-transparent hover:border-purple-500/30
                group
              "
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              U
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">Usuario</p>
              <p className="text-slate-400 text-xs">usuario@quiosco.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
