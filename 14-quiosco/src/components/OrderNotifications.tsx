"use client";

import { useEffect, useState } from "react";
import { getReadyOrders, markOrderAsNotified } from "@/actions/order-actions";
import { toast } from "react-toastify";

export default function OrderNotifications() {
  const [checkedOrders, setCheckedOrders] = useState<Set<number>>(new Set());

  useEffect(() => {
    const checkReadyOrders = async () => {
      const readyOrders = await getReadyOrders();

      readyOrders.forEach((order) => {
        if (!checkedOrders.has(order.id)) {
          toast.success(
            `🎉 ¡Orden #${order.id} para ${order.name} está lista!`,
            {
              position: "top-center",
              autoClose: 10000,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              className: "text-lg font-bold",
            }
          );

          // Marcar como notificado
          markOrderAsNotified(order.id);
          setCheckedOrders((prev) => new Set(prev).add(order.id));
        }
      });
    };

    // Verificar al montar el componente
    checkReadyOrders();

    // Verificar cada 30 segundos
    const interval = setInterval(checkReadyOrders, 30000);

    return () => clearInterval(interval);
  }, [checkedOrders]);

  return null;
}
