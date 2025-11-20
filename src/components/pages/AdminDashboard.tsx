import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar, MapPin, QrCode } from 'lucide-react';
import { mockReservations, mockBeaches } from '../../data/mockData';
import { Button } from '../Button';

interface AdminDashboardProps {
  onManageBeaches: () => void;
  onScanQR: () => void;
}

export function AdminDashboard({ onManageBeaches, onScanQR }: AdminDashboardProps) {
  const todayReservations = mockReservations.filter((r) => r.status === 'active');
  const totalRevenue = mockReservations.reduce((sum, r) => sum + r.totalPrice, 0);
  const activeBeaches = mockBeaches.filter((b) => b.active).length;

  // Mock data for weekly chart
  const weeklyData = [
    { day: 'Lun', amount: 450000 },
    { day: 'Mar', amount: 380000 },
    { day: 'Mié', amount: 620000 },
    { day: 'Jue', amount: 520000 },
    { day: 'Vie', amount: 780000 },
    { day: 'Sáb', amount: 950000 },
    { day: 'Dom', amount: 890000 },
  ];

  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  return (
    <div className="pb-8">
      <div className="bg-gradient-to-r from-[#00A8CC] to-[#0077B6] text-white px-4 py-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-2">Panel de Administración</h2>
          <p>Gestiona tu negocio desde aquí</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="primary" size="lg" onClick={onScanQR}>
            <QrCode className="w-5 h-5" />
            Escanear QR
          </Button>
          <Button variant="secondary" size="lg" onClick={onManageBeaches}>
            <MapPin className="w-5 h-5" />
            Gestionar Playas
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-[12px] p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#00A8CC]/10 rounded-[8px] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#00A8CC]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reservas Hoy</p>
                <p className="text-[#00A8CC]">{todayReservations.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs ayer</span>
            </div>
          </div>

          <div className="bg-white rounded-[12px] p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#00B4A7]/10 rounded-[8px] flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#00B4A7]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ingresos Total</p>
                <p className="text-[#00B4A7]">
                  ${(totalRevenue / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8% este mes</span>
            </div>
          </div>

          <div className="bg-white rounded-[12px] p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#FFD166]/10 rounded-[8px] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#FFD166]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Visitantes</p>
                <p className="text-[#FFD166]">5,234</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+25% este mes</span>
            </div>
          </div>

          <div className="bg-white rounded-[12px] p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#EF476F]/10 rounded-[8px] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#EF476F]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Playas Activas</p>
                <p className="text-[#EF476F]">{activeBeaches}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">de {mockBeaches.length} totales</p>
          </div>
        </div>

        {/* Weekly Sales Chart */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-6">Ventas Semanales</h3>
          
          <div className="flex items-end justify-between gap-2 h-64">
            {weeklyData.map((data, index) => {
              const height = (data.amount / maxAmount) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs text-gray-600 mb-1">
                    ${(data.amount / 1000).toFixed(0)}k
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-[#00A8CC] to-[#0077B6] rounded-t-[8px] transition-all duration-500 hover:opacity-80"
                    style={{ height: `${height}%`, minHeight: '20px' }}
                  />
                  <div className="text-sm text-gray-600">{data.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-4">Reservas Recientes</h3>
          
          <div className="space-y-3">
            {mockReservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-[8px]"
              >
                <div className="flex-1">
                  <p>{reservation.beachName}</p>
                  <p className="text-sm text-gray-600">{reservation.packageName}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-[#00A8CC]">
                    ${reservation.totalPrice.toLocaleString('es-CO')}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(reservation.date).toLocaleDateString('es-CO')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
