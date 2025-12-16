"use client";

import { updateOrderStatus } from "@/actions/order-actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  name: string;
  total: number;
  status: string;
  createdAt: Date;
  orderProducts: {
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
};

type OrderCardProps = {
  order: Order;
};

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  PREPARING: "bg-blue-100 text-blue-800 border-blue-300",
  READY: "bg-green-100 text-green-800 border-green-300",
  DELIVERED: "bg-gray-100 text-gray-800 border-gray-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
};

const statusLabels = {
  PENDING: "Pendiente",
  PREPARING: "Preparando",
  READY: "Lista",
  DELIVERED: "Entregada",
  CANCELLED: "Cancelada",
};

export default function OrderCard({ order }: OrderCardProps) {
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    const result = await updateOrderStatus(order.id, newStatus);
    
    if (result.success) {
      toast.success("Estado actualizado correctamente", {
        position: "top-right",
      });
      router.refresh();
    } else {
      toast.error(result.error || "Error al actualizar el estado", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">Orden #{order.id}</h3>
            <p className="text-sm opacity-90">{order.name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="px-4 pt-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
            statusColors[order.status as keyof typeof statusColors]
          }`}
        >
          {statusLabels[order.status as keyof typeof statusLabels]}
        </span>
      </div>

      {/* Products */}
      <div className="p-4 space-y-2">
        <h4 className="font-semibold text-slate-700 mb-2">Productos:</h4>
        {order.orderProducts.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm text-slate-600 py-1 border-b border-slate-100 last:border-0"
          >
            <span>
              {item.quantity}x {item.product.name}
            </span>
            <span className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
        <div className="p-4 border-t border-slate-100 space-y-2">
          <select
            onChange={(e) => handleStatusChange(e.target.value)}
            value={order.status}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="PENDING">Pendiente</option>
            <option value="PREPARING">Preparando</option>
            <option value="READY">Lista</option>
            <option value="DELIVERED">Entregada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 pb-4 text-xs text-slate-400">
        {new Date(order.createdAt).toLocaleString("es-MX", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </div>
    </div>
  );
}
