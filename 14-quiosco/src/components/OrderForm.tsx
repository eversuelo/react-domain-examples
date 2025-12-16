"use client";

import { useActionState } from "react";
import { createOrder, type OrderState } from "@/actions/order-actions";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const initialState: OrderState = {
  success: false,
  errors: {},
};

export default function OrderForm() {
  const [state, formAction] = useActionState(createOrder, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (state.success) {
      toast.success(`¡Orden #${state.orderId} creada con éxito!`, {
        position: "top-right",
        autoClose: 3000,
      });
      clearCart();
      formRef.current?.reset();
    } else if (state.errors?._form) {
      toast.error(state.errors._form[0], {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }, [state, clearCart]);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500">
          Agrega productos al carrito para realizar una orden
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4 p-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Nombre del cliente
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre completo"
          className={`
            w-full px-4 py-3 rounded-lg border
            ${
              state.errors?.name
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:ring-purple-500"
            }
            focus:outline-none focus:ring-2
            transition-all duration-200
          `}
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Hidden inputs for items and total */}
      <input type="hidden" name="items" value={JSON.stringify(items)} />
      <input type="hidden" name="total" value={getTotal()} />

      {state.errors?.items && (
        <p className="text-sm text-red-600">{state.errors.items[0]}</p>
      )}

      <button
        type="submit"
        className="w-full py-4 rounded-lg bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        Realizar Pedido
      </button>
    </form>
  );
}
