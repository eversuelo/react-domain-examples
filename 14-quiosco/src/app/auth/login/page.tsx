"use client";

import { useActionState, useEffect } from "react";
import { loginUser, type AuthState } from "@/actions/auth-actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState: AuthState = {
  success: false,
  errors: {},
};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useActionState(loginUser, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("¡Sesión iniciada con éxito!", {
        position: "top-right",
        autoClose: 2000,
      });
      router.push("/order/cafe");
    } else if (state.errors?._form) {
      toast.error(state.errors._form[0], {
        position: "top-right",
      });
    }
  }, [state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            ¿No tienes cuenta?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  state.errors?.email
                    ? "border-red-500"
                    : "border-slate-300"
                } placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                placeholder="tu@email.com"
              />
              {state.errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  state.errors?.password
                    ? "border-red-500"
                    : "border-slate-300"
                } placeholder-slate-500 text-slate-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                placeholder="••••••••"
              />
              {state.errors?.password && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.password[0]}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
