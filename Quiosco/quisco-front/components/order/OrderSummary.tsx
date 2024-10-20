"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { useMemo } from "react";
import { createOrder } from "@/actions/create-order-actions";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";
function OrderSummary() {
  const order = useStore((state) => state.order);
  const total = useMemo(() => order.reduce((acc, item) => acc + item.subtotal, 0), [order]);
  const clearOrder = useStore((state) => state.clearOrder);
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      order,
      total,
    }
    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      });
      return;
    }
    const response = await createOrder(data);
    console.log(response);
    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message)
      });
      return;
    }
    clearOrder();
    toast.success('Pedido creado con éxito');

    return;
  }
  return (
    <aside className="lg:h-screen overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">No hay productos en tu pedido</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {order.map((product) => (
              <ProductDetails key={product.id} item={product} />

            ))}
          </div>
          <div className="flex justify-between items-center mt-5">
            <p className="text-xl font-black">Total:</p>
            <p className="text-xl font-black">
              {formatCurrency(total)}
            </p>
          </div>
          <form className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >
            <input
              name="name"
              type="text" className="p-2 rounded-xl border bg-white border-gray-300 w-full" placeholder="Nombre" />

            <input type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer" value={'Confirmar Pedido'} />

          </form>
        </>
      )}

    </aside>
  )
}

export default OrderSummary