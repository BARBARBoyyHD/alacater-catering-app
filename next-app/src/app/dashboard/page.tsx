'use client';

import { useOrders } from '@/hooks/use-orders';
import { useOrderRealtime } from '@/hooks/use-order-realtime';
import { useState, useEffect } from 'react';
import { OrderStatus } from '@/generated/prisma';
import { OrderTable } from '@/components/dashboard/order-table';
import { OrderFilters } from '@/components/dashboard/order-filters';
import { FiAlertCircle, FiRefreshCw, FiLogIn } from 'react-icons/fi';
import Link from 'next/link';

export default function DashboardPage() {
  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [search, setSearch] = useState('');

  const { data: orders, isLoading, error, refetch } = useOrders({ status, search });

  // Enable real-time updates
  useOrderRealtime();

  // Handle Unauthorized error specifically
  const isUnauthorized = error instanceof Error && (error.message.includes('401') || error.message.toLowerCase().includes('unauthorized'));

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-brand-on-surface tracking-tight">Manajemen Pesanan</h2>
          <p className="text-sm md:text-base text-brand-on-surface/60">Kelola semua pesanan katering Anda di satu tempat.</p>
        </div>
        {!isUnauthorized && (
          <button 
            onClick={() => refetch()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-brand-outline/10 rounded-xl font-bold text-brand-on-surface hover:bg-brand-background transition-all self-start md:self-auto shadow-sm active:scale-95"
          >
            <FiRefreshCw className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        )}
      </div>

      <OrderFilters 
        onStatusChange={setStatus} 
        onSearchChange={setSearch} 
        currentStatus={status}
      />

      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-container"></div>
          </div>
        ) : isUnauthorized ? (
          <div className="p-12 text-center bg-brand-surface-container/50 rounded-[2rem] border border-brand-primary-container/10">
            <div className="w-20 h-20 bg-brand-primary-container/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
              <FiLogIn size={40} />
            </div>
            <h3 className="text-xl font-black text-brand-on-surface mb-2">Sesi Berakhir</h3>
            <p className="text-brand-on-surface/60 max-w-md mx-auto mb-8">Silakan masuk kembali ke akun Anda untuk melihat dan mengelola pesanan.</p>
            <Link 
              href="/login"
              className="px-8 py-3 bg-brand-primary-container text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-brand-primary-container/20 hover:scale-105 active:scale-95 transition-all inline-block"
            >
              Ke Halaman Login
            </Link>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-alacater-error/10 text-alacater-error rounded-[2rem] border border-alacater-error/20">
            <FiAlertCircle className="text-4xl mx-auto mb-2" />
            <p className="font-bold">Gagal memuat pesanan</p>
            <p className="text-sm opacity-80 mb-4">{(error as Error).message}</p>
            <button 
              onClick={() => refetch()}
              className="px-6 py-2 bg-alacater-error text-white rounded-xl font-bold hover:opacity-90 transition-all active:scale-95"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <OrderTable orders={orders || []} />
        )}
      </div>
    </div>
  );
}
