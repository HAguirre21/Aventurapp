import React from 'react';
import { Check } from 'lucide-react';
import { Package } from '../types';
import { Button } from './Button';

interface PackageCardProps {
  package: Package;
  selected?: boolean;
  onSelect: () => void;
}

export function PackageCard({ package: pkg, selected = false, onSelect }: PackageCardProps) {
  return (
    <div
      className={`
        bg-white rounded-[12px] p-4 cursor-pointer transition-all duration-200
        ${selected ? 'border-2 border-[#00A8CC] shadow-medium' : 'border border-gray-200 shadow-soft hover:shadow-medium'}
      `}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="mb-1">{pkg.name}</h4>
          <p className="text-sm text-gray-600">{pkg.description}</p>
        </div>
        
        {selected && (
          <div className="w-6 h-6 bg-[#00A8CC] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-2">Incluye:</p>
        <ul className="space-y-1">
          {pkg.servicesIncluded.map((service, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
              <Check className="w-3 h-3 text-[#00B4A7] flex-shrink-0" />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Precio:</span>
          <span className="text-[#00A8CC]">
            ${pkg.price.toLocaleString('es-CO')}
          </span>
        </div>
      </div>
    </div>
  );
}
