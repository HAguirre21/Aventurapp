import React from 'react';
import { Menu, User as UserIcon } from 'lucide-react';
import { User } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeaderProps {
  user?: User;
  onMenuClick?: () => void;
  onProfileClick?: () => void;
}

export function Header({ user, onMenuClick, onProfileClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6 text-[#343A40]" />
          </button>
          
          <div>
            <h1 className="text-[#00A8CC]">Aventurapp</h1>
            <p className="text-xs text-gray-600">Descubre Buenaventura</p>
          </div>
        </div>
        
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2 hover:bg-gray-100 rounded-[8px] px-2 py-1 transition-colors"
        >
          {user?.avatar ? (
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-[#00A8CC] rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
          )}
          <span className="hidden sm:block text-sm">{user?.name || 'Usuario'}</span>
        </button>
      </div>
    </header>
  );
}
