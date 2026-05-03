import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderStatus } from '@/generated/prisma';

export interface UseOrdersParams {
  status?: OrderStatus | null;
  providerId?: string;
  search?: string;
}

/**
 * Hook to fetch orders for a provider with filtering and search.
 */
export function useOrders(params: UseOrdersParams) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params.status) searchParams.set('status', params.status);
      if (params.providerId) searchParams.set('providerId', params.providerId);
      if (params.search) searchParams.set('search', params.search);

      const response = await fetch(`/api/orders?${searchParams.toString()}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch orders');
      }
      return response.json();
    },
  });
}

/**
 * Hook to fetch a single order's details.
 */
export function useOrderDetails(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch order details');
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export interface UpdateStatusParams {
  id: string;
  status: OrderStatus;
  notes?: string;
  changedById?: string;
}

/**
 * Hook to update an order's status.
 * Automatically invalidates relevant caches on success.
 */
export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status, notes, changedById }: UpdateStatusParams) => {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes, changedById }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update order status');
      }

      return response.json();
    },
    onSuccess: (data, variables) => {
      // Invalidate both the list and the specific order
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
