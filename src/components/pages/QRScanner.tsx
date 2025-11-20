import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Camera } from 'lucide-react';
import { Button } from '../Button';
import { mockReservations } from '../../data/mockData';

interface QRScannerProps {
  onBack: () => void;
}

type ScanResult = 'valid' | 'invalid' | 'used' | null;

export function QRScanner({ onBack }: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult>(null);
  const [scannedCode, setScannedCode] = useState('');
  const [manualCode, setManualCode] = useState('');

  const validateQR = (code: string) => {
    // Simulate QR validation
    const reservation = mockReservations.find((r) => r.qrCode === code);
    
    if (!reservation) {
      return 'invalid';
    }
    
    if (reservation.status === 'completed') {
      return 'used';
    }
    
    return 'valid';
  };

  const handleScan = () => {
    setScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      // Simulate scanning a valid QR code
      const mockScan = mockReservations[0].qrCode;
      setScannedCode(mockScan);
      const validation = validateQR(mockScan);
      setResult(validation);
      setScanning(false);
    }, 2000);
  };

  const handleManualValidation = () => {
    if (manualCode.trim()) {
      const validation = validateQR(manualCode.trim());
      setScannedCode(manualCode.trim());
      setResult(validation);
    }
  };

  const handleReset = () => {
    setResult(null);
    setScannedCode('');
    setManualCode('');
    setScanning(false);
  };

  const foundReservation = mockReservations.find((r) => r.qrCode === scannedCode);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h3>Validar Código QR</h3>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!result && !scanning && (
          <div className="space-y-6">
            {/* Scanner */}
            <div className="bg-white rounded-[12px] p-8 shadow-soft text-center">
              <div className="w-64 h-64 mx-auto mb-6 bg-gradient-to-br from-[#00A8CC] to-[#0077B6] rounded-[12px] flex items-center justify-center">
                <div className="w-48 h-48 border-4 border-white rounded-[8px] flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <h3 className="mb-2">Escanear Código QR</h3>
              <p className="text-gray-600 mb-6">
                Coloca el código QR dentro del marco
              </p>
              
              <Button variant="primary" size="lg" onClick={handleScan}>
                Iniciar Escaneo
              </Button>
            </div>

            {/* Manual Entry */}
            <div className="bg-white rounded-[12px] p-6 shadow-soft">
              <h3 className="mb-4">O ingresa el código manualmente</h3>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Ej: QR-1234567890"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleManualValidation();
                    }
                  }}
                />
                <Button variant="primary" onClick={handleManualValidation}>
                  Validar
                </Button>
              </div>
            </div>
          </div>
        )}

        {scanning && (
          <div className="bg-white rounded-[12px] p-12 shadow-soft text-center">
            <div className="w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full border-4 border-[#00A8CC] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="mb-2">Escaneando...</h3>
            <p className="text-gray-600">Espera un momento</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Result */}
            <div className={`
              bg-white rounded-[12px] p-8 shadow-soft text-center
              ${result === 'valid' ? 'border-2 border-green-500' : 'border-2 border-red-500'}
            `}>
              {result === 'valid' && (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-green-600 mb-2">¡Código Válido!</h2>
                  <p className="text-gray-600">El visitante puede ingresar</p>
                </>
              )}

              {result === 'invalid' && (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <h2 className="text-red-600 mb-2">Código Inválido</h2>
                  <p className="text-gray-600">Este código no existe en el sistema</p>
                </>
              )}

              {result === 'used' && (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                  <h2 className="text-red-600 mb-2">Código Ya Usado</h2>
                  <p className="text-gray-600">Esta reserva ya fue utilizada</p>
                </>
              )}
            </div>

            {/* Reservation Details */}
            {result === 'valid' && foundReservation && (
              <div className="bg-white rounded-[12px] p-6 shadow-soft">
                <h3 className="mb-4">Detalles de la Reserva</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Playa:</span>
                    <span>{foundReservation.beachName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paquete:</span>
                    <span>{foundReservation.packageName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha:</span>
                    <span>
                      {new Date(foundReservation.date).toLocaleDateString('es-CO')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Código:</span>
                    <span className="font-mono">{foundReservation.qrCode}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" fullWidth onClick={handleReset}>
                Escanear Otro
              </Button>
              
              {result === 'valid' && (
                <Button variant="primary" fullWidth onClick={handleReset}>
                  Confirmar Entrada
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
