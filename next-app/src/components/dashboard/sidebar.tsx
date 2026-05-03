'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  FiGrid, 
  FiShoppingCart, 
  FiCalendar, 
  FiPackage, 
  FiStar, 
  FiSettings, 
  FiUser 
} from 'react-icons/fi';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: FiGrid },
  { name: 'Pesanan', href: '/orders', icon: FiShoppingCart },
  { name: 'Jadwal Pengiriman', href: '/schedule', icon: FiCalendar },
  { name: 'Produk Saya', href: '/products', icon: FiPackage },
  { name: 'Ulasan', href: '/reviews', icon: FiStar },
  { name: 'Pengaturan', href: '/settings', icon: FiSettings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-brand-outline/20 flex flex-col h-full">
      <div className="p-8">
        <div className="text-2xl font-black tracking-tighter text-brand-primary-container leading-none">
          AlaCater<br/><span className="text-brand-primary">Mitra</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all group relative',
                isActive
                  ? 'bg-brand-primary-container text-white shadow-xl shadow-brand-primary-container/20 translate-x-1'
                  : 'text-brand-on-surface/50 hover:bg-brand-surface-container hover:text-brand-primary'
              )}
            >
              <Icon className={cn(
                "text-lg",
                isActive ? "text-white" : "text-brand-on-surface/30 group-hover:text-brand-primary"
              )} />
              <span className="text-sm tracking-tight">{item.name}</span>
              {isActive && (
                <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-brand-outline/5">
        <div className="bg-brand-background rounded-3xl p-5 border border-brand-outline/5">
          <p className="text-[10px] font-black text-brand-on-surface/30 uppercase tracking-[0.2em] mb-3">Profil Toko</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-primary-container text-white flex items-center justify-center shadow-lg shadow-brand-primary-container/20">
              <FiUser size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-brand-on-surface truncate leading-none">Artisan Kitchen</p>
              <p className="text-[10px] font-bold text-brand-primary mt-1 uppercase">Premium Partner</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
