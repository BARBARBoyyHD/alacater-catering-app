'use client';

import { useOrderDetails, useUpdateOrderStatus } from '@/hooks/use-orders';
import { OrderStatus } from '@/generated/prisma';
import { cn } from '@/lib/utils';
import { FiX, FiUser, FiMapPin, FiClock, FiCheckCircle, FiTruck, FiCoffee } from 'react-icons/fi';

export interface OrderDetailModalProps {
  orderId: string;
  onClose: () => void;
}

export function OrderDetailModal({ orderId, onClose }: OrderDetailModalProps) {
  const { data: order, isLoading, error } = useOrderDetails(orderId);
  const updateStatus = useUpdateOrderStatus();

  if (!orderId) return null;

  const handleStatusUpdate = async (status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ id: orderId, status });
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-on-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-brand-outline/10 flex justify-between items-center bg-brand-surface-container/30">
          <div>
            <h3 className="text-xl font-black text-brand-on-surface">Detail Pesanan #{order?.orderNumber || '...'}</h3>
            <p className="text-sm text-brand-on-surface/60">
              {order ? `Diterima pada ${new Date(order.createdAt).toLocaleString('id-ID')}` : 'Memuat data...'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-brand-surface-container flex items-center justify-center transition-colors text-brand-on-surface/60"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {isLoading ? (
             <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-container"></div>
             </div>
          ) : error ? (
            <p className="text-alacater-error text-center font-bold">Gagal memuat detail: {(error as Error).message}</p>
          ) : (
            <>
              {/* Customer Info */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-brand-background p-5 rounded-2xl border border-brand-outline/5">
                  <p className="text-[10px] font-black text-brand-on-surface/30 uppercase tracking-widest mb-3">Informasi Pelanggan</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-primary-container/10 flex items-center justify-center text-brand-primary border border-brand-primary-container/20">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-brand-on-surface">{order.customer?.user?.name}</p>
                      <p className="text-xs text-brand-on-surface/60 font-medium">{order.customer?.user?.phone || 'No phone'}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-background p-5 rounded-2xl border border-brand-outline/5">
                  <p className="text-[10px] font-black text-brand-on-surface/30 uppercase tracking-widest mb-3">Alamat Pengiriman</p>
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-brand-primary mt-0.5 shrink-0" />
                    <p className="text-xs md:text-sm text-brand-on-surface leading-relaxed font-medium">{order.deliveryAddress}</p>
                  </div>
                </div>
              </section>

              {/* Order Items */}
              <section>
                <p className="text-[10px] font-black text-brand-on-surface/30 uppercase tracking-widest mb-4">Item Pesanan</p>
                <div className="space-y-3">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-brand-outline/10 rounded-2xl hover:bg-brand-background transition-colors group">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-surface-container border border-brand-outline/5">
                        {item.product?.images?.[0] && (
                          <img src={item.product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-brand-on-surface">{item.product?.name}</p>
                        <p className="text-xs text-brand-on-surface/60 font-bold">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-black text-brand-primary">
                        Rp {new Intl.NumberFormat('id-ID').format(Number(item.subtotal))}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Subscription Progress */}
              {order.totalDays > 1 && (
                <section className="bg-brand-surface-container/40 p-6 rounded-2xl border border-brand-primary-container/10">
                  <p className="text-[10px] font-black text-brand-primary/60 uppercase tracking-widest mb-4">Progres Langganan</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-brand-on-surface">Hari ke-{order.currentDay} dari {order.totalDays}</span>
                    <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-brand-primary shadow-sm">
                      {Math.round((order.currentDay / order.totalDays) * 100)}% SELESAI
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white rounded-full overflow-hidden p-0.5 border border-brand-primary-container/5">
                    <div 
                      className="h-full bg-brand-primary-container rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${(order.currentDay / order.totalDays) * 100}%` }}
                    ></div>
                  </div>
                </section>
              )}

              {/* Status History */}
              <section>
                <p className="text-[10px] font-black text-brand-on-surface/30 uppercase tracking-widest mb-6">Riwayat Status</p>
                <div className="space-y-6 border-l-2 border-brand-outline/10 ml-3 pl-8">
                  {order.statusHistory?.map((log: any) => (
                    <div key={log.id} className="relative">
                      <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-4 border-brand-primary-container shadow-sm flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-brand-primary-container rounded-full"></div>
                      </div>
                      <p className="text-sm font-black text-brand-on-surface uppercase tracking-tight">{log.newStatus}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FiClock className="text-brand-on-surface/40 text-xs" />
                        <p className="text-xs text-brand-on-surface/60 font-bold">
                          {new Date(log.createdAt).toLocaleString('id-ID')} {log.changedBy ? `• ${log.changedBy.name}` : ''}
                        </p>
                      </div>
                      {log.notes && (
                        <div className="mt-2 p-3 bg-brand-background rounded-xl border border-brand-outline/5">
                          <p className="text-xs text-brand-on-surface/50 italic font-medium">"{log.notes}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-brand-outline/10 bg-brand-surface-container/30 flex flex-wrap gap-3 justify-end">
          {order?.status === OrderStatus.PAID && (
            <button 
              onClick={() => handleStatusUpdate(OrderStatus.PREPARING)}
              disabled={updateStatus.isPending}
              className="px-6 py-3 bg-brand-primary-container text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand-primary-container/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <FiCoffee size={18} />
              Proses Pesanan
            </button>
          )}
          {order?.status === OrderStatus.PREPARING && (
            <button 
              onClick={() => handleStatusUpdate(OrderStatus.SHIPPING)}
              disabled={updateStatus.isPending}
              className="px-6 py-3 bg-alacater-info text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-alacater-info/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <FiTruck size={18} />
              Kirim Pesanan
            </button>
          )}
          {order?.status === OrderStatus.SHIPPING && (
            <button 
              onClick={() => handleStatusUpdate(OrderStatus.DELIVERED)}
              disabled={updateStatus.isPending}
              className="px-6 py-3 bg-alacater-success text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-alacater-success/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <FiCheckCircle size={18} />
              Selesaikan Pesanan
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-white border border-brand-outline/10 text-brand-on-surface/40 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-background transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
