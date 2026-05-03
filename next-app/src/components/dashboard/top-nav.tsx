'use client';

import { FiBell, FiMenu } from 'react-icons/fi';

export interface TopNavProps {
  title: string;
  onToggleSidebar: () => void;
}

export function TopNav({ title, onToggleSidebar }: TopNavProps) {
  return (
    <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-md border-b border-brand-outline/5 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 text-brand-on-surface/60 hover:bg-brand-surface-container rounded-xl transition-colors"
        >
          <FiMenu size={20} />
        </button>
        <h1 className="text-lg md:text-xl font-black text-brand-on-surface tracking-tight">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-6">
        <button className="p-2.5 text-brand-on-surface/60 hover:bg-brand-surface-container rounded-xl transition-colors relative group">
          <FiBell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-alacater-error rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-brand-outline/10 hidden md:block"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-brand-on-surface leading-none">Elena Rodriguez</p>
            <p className="text-[10px] font-bold text-brand-primary mt-1 uppercase">Store Owner</p>
          </div>
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl border-2 border-brand-primary-container overflow-hidden shadow-lg shadow-brand-primary-container/10">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWNBnQp15CLGHNUNzb0LOD5joK8iWkPixx520Q9f9GDGUbt-wEs3IBoImbH4yOi7Jgw-rhG7TFulqfe-OcWE94zf3vdL_Z0mBEk01fegkiXQywG1ntkqE3nPInCA6yCa8tO0Df4oye3GIgd_IrpDmUAa1axKbmXjH8q8xAvvpkL8LmLu9NiWOjva6FWylvnQCmEKNDUWxPLWCfYrs-xQwu2H86Iok93bUwlODyVKdEqIW0iiJnwXb94DxRRncFRwkzUvxsSyKzG8me" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
