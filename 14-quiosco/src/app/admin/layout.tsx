"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Quiosco Admin
              </Link>
              <nav className="hidden md:flex gap-2">
                <Link
                  href="/admin/products"
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    pathname.startsWith("/admin/products")
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 text-white"
                      : "text-slate-300 border-transparent hover:bg-slate-800"
                  }`}
                >
                  Productos
                </Link>
                <Link
                  href="/admin/orders"
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    pathname.startsWith("/admin/orders")
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30 text-white"
                      : "text-slate-300 border-transparent hover:bg-slate-800"
                  }`}
                >
                  Órdenes
                </Link>
              </nav>
            </div>
            <Link
              href="/order/cafe"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Ver Tienda
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
