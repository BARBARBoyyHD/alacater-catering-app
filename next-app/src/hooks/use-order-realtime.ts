'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

/**
 * Hook to subscribe to real-time order updates via Supabase.
 * When an order is updated, it invalidates the TanStack Query 'orders' cache.
 */
export function useOrderRealtime(providerId?: string) {
  const queryClient = useQueryClient();
  const supabase = createClient();

  useEffect(() => {
    // 1. Set up the subscription
    // If providerId is provided, we filter by it (security & performance)
    let filter = '';
    if (providerId) {
      filter = `providerId=eq.${providerId}`;
    }

    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen for all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'Order',
          filter: filter || undefined,
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          // 2. Invalidate TanStack Query cache to trigger a re-fetch
          queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
      )
      .subscribe();

    // 3. Clean up subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, supabase, providerId]);
}
