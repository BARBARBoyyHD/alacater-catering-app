import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@/generated/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as OrderStatus | null;
  const providerId = searchParams.get('providerId');
  const search = searchParams.get('search');

  try {
    // 1. Verify Authentication via Supabase
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Build Query
    const where: any = {};
    
    // Security: Filter by providerId linked to the user if applicable
    // For now, if providerId is passed, we use it, but in production
    // we should verify user.id owns this providerId
    if (providerId) {
      where.providerId = providerId;
    }

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        {
          customer: {
            user: {
              name: { contains: search, mode: 'insensitive' }
            }
          }
        }
      ];
    }

    // 3. Fetch from Prisma
    const orders = await prisma.order.findMany({
      where,
      include: {
        customer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              }
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('API Error /api/orders:', error);
    // Ensure we return JSON even on error to avoid the "<!DOCTYPE" parsing error in the frontend
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
