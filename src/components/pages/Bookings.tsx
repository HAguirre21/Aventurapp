import React, { useState } from 'react';
import { QrCode } from 'lucide-react';
import { mockReservations } from '../../data/mockData';
import { ReservationCard } from '../ReservationCard';
import { Modal } from '../Modal';
import QRCode from 'qrcode';

export function Bookings() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState<string>('');

  const activeReservations = mockReservations.filter((r) => r.status === 'active');
  const historyReservations = mockReservations.filter((r) => r.status !== 'active');

  const handleViewQR = async (qrCode: string) => {
    setSelectedQR(qrCode);
    
    // Generate QR code image
    try {
      const url = await QRCode.toDataURL(qrCode, {
        width: 300,
        margin: 2,
        color: {
          dark: '#00A8CC',
          light: '#FFFFFF',
        },
      });
      setQrImage(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="pb-20 lg:pb-8">
      <div className="bg-gradient-to-r from-[#00A8CC] to-[#0077B6] text-white px-4 py-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-2">Mis Reservas</h2>
          <p>Gestiona tus próximas aventuras</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`
              flex-1 px-4 py-3 rounded-[8px] transition-all
              ${activeTab === 'active'
                ? 'bg-white text-[#00A8CC] shadow-soft'
                : 'bg-transparent text-gray-600 hover:bg-white/50'
              }
            `}
          >
            Activas ({activeReservations.length})
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`
              flex-1 px-4 py-3 rounded-[8px] transition-all
              ${activeTab === 'history'
                ? 'bg-white text-[#00A8CC] shadow-soft'
                : 'bg-transparent text-gray-600 hover:bg-white/50'
              }
            `}
          >
            Historial ({historyReservations.length})
          </button>
        </div>

        {/* Reservations List */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeReservations.length > 0 ? (
              activeReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onViewQR={() => handleViewQR(reservation.qrCode)}
                />
              ))
            ) : (
              <div className="bg-white rounded-[12px] p-12 text-center shadow-soft">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="mb-2">No tienes reservas activas</h3>
                <p className="text-gray-600">
                  Explora nuestras playas y haz tu primera reserva
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {historyReservations.length > 0 ? (
              historyReservations.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onViewQR={() => {}}
                />
              ))
            ) : (
              <div className="bg-white rounded-[12px] p-12 text-center shadow-soft">
                <p className="text-gray-600">No hay reservas en el historial</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* QR Modal */}
      <Modal
        isOpen={!!selectedQR}
        onClose={() => setSelectedQR(null)}
        title="Tu Código QR"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Muestra este código en la entrada para acceder a la playa
          </p>
          
          {qrImage && (
            <div className="bg-white p-6 rounded-[12px] border-2 border-[#00A8CC] inline-block mb-6">
              <img src={qrImage} alt="QR Code" className="w-64 h-64" />
            </div>
          )}
          
          <div className="bg-[#F8F9FA] rounded-[8px] p-4">
            <p className="text-sm text-gray-600 mb-1">Código de reserva:</p>
            <p className="font-mono">{selectedQR}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
