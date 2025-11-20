import React from 'react';
import { Home, Search, Calendar, User } from 'lucide-react';

interface BottomNavProps {
  active: 'home' | 'search' | 'bookings' | 'profile';
  onChange: (tab: 'home' | 'search' | 'bookings' | 'profile') => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const items = [
    { id: 'home' as const, icon: Home, label: 'Inicio' },
    { id: 'search' as const, icon: Search, label: 'Buscar' },
    { id: 'bookings' as const, icon: Calendar, label: 'Reservas' },
    { id: 'profile' as const, icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-strong z-50 lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-[8px] transition-all duration-200
                ${isActive ? 'text-[#00A8CC]' : 'text-gray-600 hover:text-[#00A8CC]'}
              `}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-[#00A8CC]/20' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
