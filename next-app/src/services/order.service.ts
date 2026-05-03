import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@/generated/prisma';

export class OrderService {
  static async updateStatus(
    orderId: string,
    newStatus: OrderStatus,
    changedById?: string,
    notes?: string
  ) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { status: true },
    });

    if (!order) throw new Error('Order not found');

    const oldStatus = order.status;

    // Basic transition validation (optional, can be expanded)
    const isValid = this.validateTransition(oldStatus, newStatus);
    if (!isValid) {
      throw new Error(`Invalid status transition from ${oldStatus} to ${newStatus}`);
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Update the order status
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      });

      // 2. Log the status change (Task 1.6)
      await tx.orderStatusHistory.create({
        data: {
          orderId,
          oldStatus,
          newStatus,
          changedById,
          notes,
        },
      });

      return updatedOrder;
    });
  }

  private static validateTransition(oldStatus: OrderStatus, newStatus: OrderStatus): boolean {
    // Simple state machine
    const transitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.PAID, OrderStatus.CANCELLED],
      [OrderStatus.PAID]: [OrderStatus.PREPARING, OrderStatus.CANCELLED, OrderStatus.FAILED],
      [OrderStatus.PREPARING]: [OrderStatus.SHIPPING, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPING]: [OrderStatus.DELIVERED, OrderStatus.FAILED],
      [OrderStatus.DELIVERED]: [], // Final state
      [OrderStatus.FAILED]: [OrderStatus.PREPARING], // Retry?
      [OrderStatus.CANCELLED]: [], // Final state
    };

    return transitions[oldStatus]?.includes(newStatus) ?? false;
  }
}
