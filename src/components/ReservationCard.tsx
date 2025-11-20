import React from 'react';
import { Calendar, MapPin, QrCode } from 'lucide-react';
import { Reservation } from '../types';
import { Button } from './Button';

interface ReservationCardProps {
  reservation: Reservation;
  onViewQR: () => void;
}

export function ReservationCard({ reservation, onViewQR }: ReservationCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  
  const statusLabels = {
    active: 'Activa',
    completed: 'Completada',
    cancelled: 'Cancelada',
  };

  return (
    <div className="bg-white rounded-[12px] p-4 shadow-soft">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="mb-1">{reservation.beachName}</h4>
          <p className="text-sm text-gray-600">{reservation.packageName}</p>
        </div>
        <span className={`px-3 py-1 rounded-[8px] text-xs ${statusColors[reservation.status]}`}>
          {statusLabels[reservation.status]}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(reservation.date).toLocaleDateString('es-CO', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total pagado:</span>
          <span className="text-[#00A8CC]">
            ${reservation.totalPrice.toLocaleString('es-CO')}
          </span>
        </div>
      </div>
      
      {reservation.status === 'active' && (
        <Button variant="outline" size="sm" fullWidth onClick={onViewQR}>
          <QrCode className="w-4 h-4" />
          Ver código QR
        </Button>
      )}
    </div>
  );
}
