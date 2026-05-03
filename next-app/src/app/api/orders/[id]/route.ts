import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OrderService } from '@/services/order.service';
import { OrderStatus } from '@/generated/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // Verify Auth
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        provider: {
          select: {
            businessName: true,
            logo: true,
          }
        },
        items: {
          include: {
            product: true,
          },
        },
        statusHistory: {
          include: {
            changedBy: {
              select: {
                name: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc',
          }
        }
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('API Error /api/orders/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // Verify Auth
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, notes } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const updatedOrder = await OrderService.updateStatus(
      id,
      status as OrderStatus,
      user.id, // Use authenticated user ID for history log
      notes
    );

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    console.error('API Error PATCH /api/orders/[id]:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update order status' },
      { status: 400 }
    );
  }
}
