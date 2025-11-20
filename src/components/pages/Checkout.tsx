import React, { useState } from 'react';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { Beach, Package } from '../../types';
import { Button } from '../Button';

interface CheckoutProps {
  beach: Beach;
  package: Package;
  date: string;
  onBack: () => void;
  onComplete: (reservationId: string) => void;
}

export function Checkout({ beach, package: pkg, date, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'payment' | 'confirmation'>('payment');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pse'>('card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setStep('confirmation');
    
    // Generate reservation ID
    setTimeout(() => {
      const reservationId = 'r' + Date.now();
      onComplete(reservationId);
    }, 3000);
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[12px] p-8 shadow-medium text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h2 className="mb-3">¡Reserva Confirmada!</h2>
          <p className="text-gray-600 mb-6">
            Tu reserva ha sido procesada exitosamente. En un momento recibirás tu código QR.
          </p>
          
          <div className="animate-pulse flex justify-center">
            <div className="w-8 h-8 border-4 border-[#00A8CC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-8">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h3>Finalizar Reserva</h3>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Order Summary */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-4">Resumen de tu Reserva</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Destino:</span>
              <span>{beach.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Paquete:</span>
              <span>{pkg.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Fecha:</span>
              <span>
                {new Date(date).toLocaleDateString('es-CO', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span>Total:</span>
              <span className="text-[#00A8CC]">
                ${pkg.price.toLocaleString('es-CO')}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-4">Método de Pago</h3>
          
          <div className="space-y-3 mb-6">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`
                w-full p-4 border-2 rounded-[8px] flex items-center gap-3 transition-all
                ${paymentMethod === 'card' 
                  ? 'border-[#00A8CC] bg-[#00A8CC]/5' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <CreditCard className="w-6 h-6" />
              <div className="flex-1 text-left">
                <p>Tarjeta de Crédito/Débito</p>
                <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
              </div>
              {paymentMethod === 'card' && (
                <div className="w-6 h-6 bg-[#00A8CC] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </button>

            <button
              onClick={() => setPaymentMethod('pse')}
              className={`
                w-full p-4 border-2 rounded-[8px] flex items-center gap-3 transition-all
                ${paymentMethod === 'pse' 
                  ? 'border-[#00A8CC] bg-[#00A8CC]/5' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
            >
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">PSE</span>
              </div>
              <div className="flex-1 text-left">
                <p>PSE</p>
                <p className="text-sm text-gray-600">Pago seguro en línea</p>
              </div>
              {paymentMethod === 'pse' && (
                <div className="w-6 h-6 bg-[#00A8CC] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Fecha de expiración</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Nombre del titular</label>
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'pse' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Selecciona tu banco</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent">
                  <option value="">Seleccionar...</option>
                  <option value="bancolombia">Bancolombia</option>
                  <option value="davivienda">Davivienda</option>
                  <option value="bbva">BBVA</option>
                  <option value="banco_bogota">Banco de Bogotá</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Tipo de persona</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent">
                  <option value="natural">Persona Natural</option>
                  <option value="juridica">Persona Jurídica</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-[8px] p-4">
          <p className="text-sm text-green-800">
            🔒 Tu información está segura. Utilizamos encriptación de última generación para proteger tus datos.
          </p>
        </div>

        {/* Payment Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Procesando...
            </>
          ) : (
            <>Pagar ${pkg.price.toLocaleString('es-CO')}</>
          )}
        </Button>
      </div>
    </div>
  );
}
