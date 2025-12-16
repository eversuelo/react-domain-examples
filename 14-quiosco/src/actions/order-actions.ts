'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { CreateOrderSchema } from '@/lib/schemas';

export type OrderState = {
  success: boolean;
  errors?: {
    name?: string[];
    items?: string[];
    total?: string[];
    _form?: string[];
  };
  orderId?: number;
};

export async function createOrder(
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  try {
    // Obtener los datos del formulario
    const name = formData.get('name') as string;
    const itemsJson = formData.get('items') as string;
    const total = parseFloat(formData.get('total') as string);

    // Parsear los items
    let items;
    try {
      items = JSON.parse(itemsJson);
    } catch (error) {
      return {
        success: false,
        errors: {
          _form: ['Error al procesar los items del carrito'],
        },
      };
    }

    // Validar los datos con Zod
    const validationResult = CreateOrderSchema.safeParse({
      name,
      items,
      total,
    });

    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Crear la orden en la base de datos
    const order = await prisma.order.create({
      data: {
        name: validationResult.data.name,
        total: validationResult.data.total,
        status: 'PENDING',
        orderProducts: {
          create: validationResult.data.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    // Revalidar las rutas necesarias
    revalidatePath('/order/[category]');
    revalidatePath('/admin/orders');

    return {
      success: true,
      orderId: order.id,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      errors: {
        _form: ['Ocurrió un error al crear la orden. Por favor, intenta de nuevo.'],
      },
    };
  }
}

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    const updateData: any = {
      status: status as any,
    };

    // Si el estado es READY y no se ha notificado antes, marcar como listo
    if (status === 'READY') {
      updateData.readyAt = new Date();
      updateData.notified = false;
    }

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: updateData,
    });

    revalidatePath('/admin/orders');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      error: 'Error al actualizar el estado de la orden',
    };
  }
}

export async function getReadyOrders() {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: 'READY',
        notified: false,
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        readyAt: 'asc',
      },
    });

    return orders;
  } catch (error) {
    console.error('Error fetching ready orders:', error);
    return [];
  }
}

export async function markOrderAsNotified(orderId: number) {
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        notified: true,
      },
    });

    revalidatePath('/admin/orders');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error marking order as notified:', error);
    return {
      success: false,
    };
  }
}
