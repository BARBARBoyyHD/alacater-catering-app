'use client';

import { OrderStatus } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { useUpdateOrderStatus } from '@/hooks/use-orders';
import { useState } from 'react';
import { OrderDetailModal } from './order-detail-modal';
import { FiBox, FiUser, FiMoreVertical, FiCheckCircle, FiTruck, FiCoffee } from 'react-icons/fi';

export interface OrderTableProps {
  orders: any[];
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  [OrderStatus.PENDING]: { label: 'Menunggu', color: 'bg-alacater-warning' },
  [OrderStatus.PAID]: { label: 'Dibayar', color: 'bg-alacater-success' },
  [OrderStatus.PREPARING]: { label: 'Diproses', color: 'bg-brand-primary-container' },
  [OrderStatus.SHIPPING]: { label: 'Dikirim', color: 'bg-alacater-info' },
  [OrderStatus.DELIVERED]: { label: 'Selesai', color: 'bg-alacater-success' },
  [OrderStatus.FAILED]: { label: 'Gagal', color: 'bg-alacater-error' },
  [OrderStatus.CANCELLED]: { label: 'Dibatalkan', color: 'bg-alacater-error' },
};

export function OrderTable({ orders }: OrderTableProps) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (e: React.MouseEvent, id: string, status: OrderStatus) => {
    e.stopPropagation(); 
    try {
      await updateStatus.mutateAsync({ id, status });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] border border-brand-outline/10 p-20 text-center shadow-sm">
        <FiBox className="text-6xl text-brand-on-surface/10 mx-auto mb-4" />
        <p className="text-xl font-bold text-brand-on-surface/40">Tidak ada pesanan ditemukan</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-brand-outline/10 shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-brand-surface-container/30 border-b border-brand-outline/10">
              <th className="px-6 py-5 text-xs font-bold text-brand-on-surface/40 uppercase tracking-widest">No. Pesanan</th>
              <th className="px-6 py-5 text-xs font-bold text-brand-on-surface/40 uppercase tracking-widest">Pelanggan</th>
              <th className="px-6 py-5 text-xs font-bold text-brand-on-surface/40 uppercase tracking-widest">Paket</th>
              <th className="px-6 py-5 text-xs font-bold text-brand-on-surface/40 uppercase tracking-widest">Total</th>
              <th className="px-6 py-5 text-xs font-bold text-brand-on-surface/40 uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 text-xs font-bold text-brand-on-surface/40 uppercase tracking-widest text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-outline/10">
            {orders.map((order) => (
              <tr 
                key={order.id} 
                className="hover:bg-brand-background transition-colors cursor-pointer group"
                onClick={() => setSelectedOrderId(order.id)}
              >
                <td className="px-6 py-4">
                  <span className="font-bold text-brand-on-surface block group-hover:text-brand-primary transition-colors">#{order.orderNumber}</span>
                  <p className="text-[10px] md:text-xs text-brand-on-surface/60 mt-1 uppercase font-bold tracking-tighter">
                    {new Date(order.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-surface-container flex items-center justify-center overflow-hidden border border-brand-outline/10">
                      {order.customer?.user?.avatar ? (
                        <img src={order.customer.user.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FiUser className="text-brand-on-surface/40" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-brand-on-surface">{order.customer?.user?.name || 'Customer'}</p>
                      <p className="text-[10px] text-brand-on-surface/40">{order.customer?.user?.phone || 'No phone'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col max-w-[200px]">
                    {order.items?.map((item: any) => (
                      <span key={item.id} className="text-xs md:text-sm text-brand-on-surface font-semibold truncate">
                        {item.product?.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-black text-brand-primary">
                    Rp {new Intl.NumberFormat('id-ID').format(order.grandTotal)}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className={cn(
                    "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter",
                    statusConfig[order.status as OrderStatus]?.color || 'bg-gray-400'
                  )}>
                    {statusConfig[order.status as OrderStatus]?.label || order.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {order.status === OrderStatus.PAID && (
                      <button 
                        onClick={(e) => handleStatusChange(e, order.id, OrderStatus.PREPARING)}
                        disabled={updateStatus.isPending}
                        className="w-9 h-9 flex items-center justify-center bg-brand-primary-container/10 text-brand-primary rounded-xl hover:bg-brand-primary-container hover:text-white transition-all shadow-sm"
                        title="Proses Pesanan"
                      >
                        <FiCoffee />
                      </button>
                    )}
                    {order.status === OrderStatus.PREPARING && (
                      <button 
                        onClick={(e) => handleStatusChange(e, order.id, OrderStatus.SHIPPING)}
                        disabled={updateStatus.isPending}
                        className="w-9 h-9 flex items-center justify-center bg-alacater-info/10 text-alacater-info rounded-xl hover:bg-alacater-info hover:text-white transition-all shadow-sm"
                        title="Kirim Pesanan"
                      >
                        <FiTruck />
                      </button>
                    )}
                    {order.status === OrderStatus.SHIPPING && (
                      <button 
                        onClick={(e) => handleStatusChange(e, order.id, OrderStatus.DELIVERED)}
                        disabled={updateStatus.isPending}
                        className="w-9 h-9 flex items-center justify-center bg-alacater-success/10 text-alacater-success rounded-xl hover:bg-alacater-success hover:text-white transition-all shadow-sm"
                        title="Selesaikan Pesanan"
                      >
                        <FiCheckCircle />
                      </button>
                    )}
                    <button className="w-9 h-9 flex items-center justify-center bg-brand-surface-container text-brand-on-surface/40 rounded-xl hover:bg-brand-on-surface/10 hover:text-brand-on-surface transition-all">
                      <FiMoreVertical />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrderId && (
        <OrderDetailModal 
          orderId={selectedOrderId} 
          onClose={() => setSelectedOrderId(null)} 
        />
      )}
    </div>
  );
}
