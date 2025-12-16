import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// PATCH update order status
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);
    const body = await request.json();
    const { status } = body;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      );
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        readyAt: status === "READY" ? new Date() : null,
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    // Revalidate admin orders page
    revalidatePath("/admin/orders");

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Error al actualizar orden" },
      { status: 500 }
    );
  }
}

// DELETE order
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 }
      );
    }

    // Delete order (cascade will delete orderProducts)
    await prisma.order.delete({
      where: { id: orderId },
    });

    // Revalidate admin orders page
    revalidatePath("/admin/orders");

    return NextResponse.json(
      { message: "Orden eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Error al eliminar orden" },
      { status: 500 }
    );
  }
}
