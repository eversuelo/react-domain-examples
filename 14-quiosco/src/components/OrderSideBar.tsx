"use client";
import { useState } from "react";
import CategoryIcon from "@/components/ui/CategoryIcon";
import Logo from "@/components/ui/Logo";
import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

type OrderSideBarProps = {
  categories: Category[];
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
};

export default function OrderSideBar({ categories, user }: OrderSideBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
          fixed top-0 left-0 h-screen w-72 xl:w-60 z-40
          bg-linear-to-b from-slate-900 via-slate-800 to-slate-900
          border-r border-slate-700/50
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Logo/Header */}
        <div className="h-32 flex items-center justify-center border-b border-slate-700/50 bg-linear-to-r from-purple-600/20 to-pink-600/20 shrink-0">
          <Logo />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto" onClick={() => setIsOpen(false)}>
          {/* Categories */}
          <div className="border-b border-slate-700/50">
            {categories.map((category) => (
              <CategoryIcon key={category.id} category={category} />
            ))}
          </div>

          {/* Admin Section */}
          {user && user.role === "ADMIN" && (
            <div className="p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                Administración
              </p>
              <div className="space-y-2">
                <Link
                  href="/admin/products"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:text-white transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-purple-400 group-hover:text-purple-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="font-medium">Productos</span>
                </Link>
                <Link
                  href="/admin/orders"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 hover:text-white transition-all duration-200 group"
                >
                  <svg
                    className="w-5 h-5 text-pink-400 group-hover:text-pink-300"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <span className="font-medium">Órdenes</span>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* User Section */}
        {user && (
          <div className="p-4 border-t border-slate-700/50 bg-slate-900/90 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{user.name}</p>
                <p className="text-slate-400 text-xs">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
