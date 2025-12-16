"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/actions/auth-actions";

type NavbarProps = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
};

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white border-b border-purple-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y navegación principal */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
              >
                🍔 Quiosco
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/order/cafe"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/order")
                    ? "border-purple-500 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                Ordenar
              </Link>
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin/orders"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    pathname.startsWith("/admin")
                      ? "border-purple-500 text-slate-900"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Administración
                </Link>
              )}
            </div>
          </div>

          {/* Menú de usuario */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-slate-600">
                  Hola, <span className="font-semibold">{user.name}</span>
                </span>
                <form action={logoutUser}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive("/auth/login")
                      ? "bg-purple-100 text-purple-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/register"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive("/auth/register")
                      ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  }`}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
