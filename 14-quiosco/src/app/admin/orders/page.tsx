"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type OrderProduct = {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    image: string | null;
  };
};

type Order = {
  id: number;
  name: string;
  total: number;
  status: "PENDING" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  readyAt: string | null;
  orderProducts: OrderProduct[];
};

const STATUS_CONFIG = {
  PENDING: {
    label: "Pendiente",
    color: "bg-amber-900/30 text-amber-400 border-amber-800/50",
    icon: "⏳",
  },
  PREPARING: {
    label: "Preparando",
    color: "bg-blue-900/30 text-blue-400 border-blue-800/50",
    icon: "👨‍🍳",
  },
  READY: {
    label: "Lista",
    color: "bg-emerald-900/30 text-emerald-400 border-emerald-800/50",
    icon: "✅",
  },
  DELIVERED: {
    label: "Entregada",
    color: "bg-purple-900/30 text-purple-400 border-purple-800/50",
    icon: "📦",
  },
  CANCELLED: {
    label: "Cancelada",
    color: "bg-red-900/30 text-red-400 border-red-800/50",
    icon: "❌",
  },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"ACTIVE" | "DELIVERED">("ACTIVE");
  const [showDelivered, setShowDelivered] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Auto-refresh every 5 seconds for real-time updates
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Error al actualizar la orden");
    }
  };

  const filteredOrders = orders.filter((order) => {
    // Ocultar órdenes entregadas automáticamente (no mostrar por defecto)
    if (!showDelivered && order.status === "DELIVERED") return false;
    
    if (filter === "ACTIVE") {
      return order.status === "PENDING" || order.status === "PREPARING" || order.status === "READY";
    }
    if (filter === "DELIVERED") {
      return order.status === "DELIVERED";
    }
    return true;
  });

  // Agrupar órdenes entregadas por día
  const deliveredByDay = orders
    .filter((o) => o.status === "DELIVERED")
    .reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString("es-MX");
      if (!acc[date]) acc[date] = [];
      acc[date].push(order);
      return acc;
    }, {} as Record<string, Order[]>);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING" || o.status === "PREPARING").length,
    ready: orders.filter((o) => o.status === "READY").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    revenue: orders
      .filter((o) => o.status !== "CANCELLED")
      .reduce((sum, o) => sum + o.total, 0),
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Cargando órdenes...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Gestión de Órdenes
          </h1>
          <p className="text-slate-400">
            Actualización automática cada 5 segundos
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-medium">En vivo</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-linear-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Total Órdenes</p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-linear-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Pendientes</p>
          <p className="text-3xl font-bold text-white">{stats.pending}</p>
        </div>
        <div className="bg-linear-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Listas</p>
          <p className="text-3xl font-bold text-white">{stats.ready}</p>
        </div>
        <div className="bg-linear-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-6">
          <p className="text-slate-400 text-sm mb-1">Entregadas Hoy</p>
          <p className="text-3xl font-bold text-white">{stats.delivered}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => {
            setFilter("ACTIVE");
            setShowDelivered(false);
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === "ACTIVE"
              ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Activas ({stats.pending + stats.ready})
        </button>
        <button
          onClick={() => {
            setFilter("DELIVERED");
            setShowDelivered(true);
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            filter === "DELIVERED"
              ? "bg-linear-to-r from-purple-600 to-pink-600 text-white"
              : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Historial ({stats.delivered})
        </button>
      </div>

      {/* Orders Grid or Delivered History */}
      {filter === "DELIVERED" ? (
        <div className="space-y-6">
          {Object.keys(deliveredByDay).length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 border border-slate-700/50 rounded-lg">
              <p className="text-slate-400 text-lg">
                No hay órdenes entregadas
              </p>
            </div>
          ) : (
            Object.entries(deliveredByDay)
              .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
              .map(([date, dayOrders]) => (
                <div key={date} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white">{date}</h2>
                    <span className="text-sm text-slate-400">
                      ({dayOrders.length} {dayOrders.length === 1 ? "orden" : "órdenes"})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {dayOrders.map((order) => {
                      const statusConfig = STATUS_CONFIG[order.status];
                      return (
                        <div
                          key={order.id}
                          className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-5 hover:border-purple-500/30 transition-all duration-300"
                        >
                          {/* Order Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-white mb-1">
                                Orden #{order.id}
                              </h3>
                              <p className="text-slate-400 text-sm">Cliente: {order.name}</p>
                              <p className="text-slate-500 text-xs">
                                {new Date(order.createdAt).toLocaleTimeString("es-MX")}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}
                            >
                              <span>{statusConfig.icon}</span>
                              {statusConfig.label}
                            </span>
                          </div>

                          {/* Products Summary */}
                          <div className="mb-3 space-y-1">
                            {order.orderProducts.map((op) => (
                              <div key={op.id} className="flex justify-between text-sm">
                                <span className="text-slate-300">
                                  {op.quantity}x {op.product.name}
                                </span>
                                <span className="text-slate-400">
                                  ${(op.price * op.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Total */}
                          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                            <p className="text-sm font-semibold text-white">Total</p>
                            <p className="text-lg font-bold bg-linear-to-rrom-purple-400 to-pink-400 bg-clip-text text-transparent">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order) => {
            const statusConfig = STATUS_CONFIG[order.status];
            return (
              <div
                key={order.id}
                className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Orden #{order.id}
                    </h3>
                    <p className="text-slate-400 text-sm">Cliente: {order.name}</p>
                    <p className="text-slate-500 text-xs">
                      {new Date(order.createdAt).toLocaleString("es-MX")}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}
                  >
                    <span>{statusConfig.icon}</span>
                    {statusConfig.label}
                  </span>
                </div>

                {/* Products */}
                <div className="mb-4 space-y-2">
                  {order.orderProducts.map((op) => (
                    <div
                      key={op.id}
                      className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-700/50 shrink-0">
                        {op.product.image ? (
                          <Image
                            src={`/products/${op.product.image}.jpg`}
                            alt={op.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            📦
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">
                          {op.product.name}
                        </p>
                        <p className="text-slate-400 text-xs">
                          Cantidad: {op.quantity}
                        </p>
                      </div>
                      <p className="text-white font-semibold">
                        ${(op.price * op.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <p className="text-lg font-bold text-white">Total</p>
                  <p className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ${order.total.toFixed(2)}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  {order.status === "PENDING" && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, "PREPARING")}
                      className="flex-1 px-4 py-2 bg-blue-900/40 text-blue-300 border border-blue-800/60 rounded-lg font-medium hover:bg-blue-900/60 transition-all duration-200"
                    >
                      Iniciar Preparación
                    </button>
                  )}
                  {order.status === "PREPARING" && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, "READY")}
                      className="flex-1 px-4 py-2 bg-emerald-900/40 text-emerald-300 border border-emerald-800/60 rounded-lg font-medium hover:bg-emerald-900/60 transition-all duration-200"
                    >
                      Marcar Lista
                    </button>
                  )}
                  {order.status === "READY" && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, "DELIVERED")}
                      className="flex-1 px-4 py-2 bg-purple-900/40 text-purple-300 border border-purple-800/60 rounded-lg font-medium hover:bg-purple-900/60 transition-all duration-200"
                    >
                      Marcar Entregada
                    </button>
                  )}
                  {(order.status === "PENDING" || order.status === "PREPARING") && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, "CANCELLED")}
                      className="px-4 py-2 bg-red-900/40 text-red-300 border border-red-800/60 rounded-lg font-medium hover:bg-red-900/60 transition-all duration-200"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredOrders.length === 0 && filter !== "DELIVERED" && (
        <div className="text-center py-12 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <p className="text-slate-400 text-lg">
            No hay órdenes activas
          </p>
        </div>
      )}
    </div>
  );
}
