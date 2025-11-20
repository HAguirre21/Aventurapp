import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Beach } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BeachCardProps {
  beach: Beach;
  onClick: () => void;
}

export function BeachCard({ beach, onClick }: BeachCardProps) {
  return (
    <div
      className="bg-white rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-medium shadow-soft"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={beach.images[0]}
          alt={beach.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-[8px] flex items-center gap-1">
          <Star className="w-4 h-4 fill-[#FFD166] stroke-[#FFD166]" />
          <span className="text-sm">{beach.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-1">{beach.name}</h3>
        
        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{beach.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-600">Desde</span>
            <p className="text-[#00A8CC]">
              ${beach.priceFrom.toLocaleString('es-CO')}
            </p>
          </div>
          
          <span className="text-xs text-gray-500">
            {beach.reviewCount} reseñas
          </span>
        </div>
      </div>
    </div>
  );
}
