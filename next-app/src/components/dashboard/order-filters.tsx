'use client';

import { OrderStatus } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { FiSearch } from 'react-icons/fi';

export interface OrderFiltersProps {
  onStatusChange: (status: OrderStatus | null) => void;
  onSearchChange: (search: string) => void;
  currentStatus: OrderStatus | null;
}

const statuses: { label: string; value: OrderStatus | null }[] = [
  { label: 'Semua', value: null },
  { label: 'Menunggu', value: OrderStatus.PENDING },
  { label: 'Dibayar', value: OrderStatus.PAID },
  { label: 'Diproses', value: OrderStatus.PREPARING },
  { label: 'Dikirim', value: OrderStatus.SHIPPING },
  { label: 'Selesai', value: OrderStatus.DELIVERED },
  { label: 'Dibatalkan', value: OrderStatus.CANCELLED },
];

export function OrderFilters({ onStatusChange, onSearchChange, currentStatus }: OrderFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[2rem] border border-brand-outline/10 shadow-sm w-full">
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {statuses.map((s) => (
          <button
            key={s.label}
            onClick={() => onStatusChange(s.value)}
            className={cn(
              "px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap",
              currentStatus === s.value
                ? "bg-brand-primary-container text-white shadow-md shadow-brand-primary-container/20"
                : "bg-brand-surface-container text-brand-on-surface/60 hover:bg-brand-primary-container/10 hover:text-brand-primary"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="relative w-full lg:w-72">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-on-surface/40" />
        <input
          type="text"
          placeholder="Cari No. Pesanan..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-brand-background rounded-full border border-brand-outline/10 focus:outline-none focus:ring-2 focus:ring-brand-primary-container/20 focus:border-brand-primary-container transition-all text-sm"
        />
      </div>
    </div>
  );
}
