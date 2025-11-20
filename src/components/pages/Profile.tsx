import React, { useState } from 'react';
import { User, Mail, Phone, CreditCard, Bell, LogOut, Edit2 } from 'lucide-react';
import { User as UserType } from '../../types';
import { Button } from '../Button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProfileProps {
  user: UserType;
  onLogout: () => void;
}

export function Profile({ user, onLogout }: ProfileProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  return (
    <div className="pb-20 lg:pb-8">
      <div className="bg-gradient-to-r from-[#00A8CC] to-[#0077B6] text-white px-4 py-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-2">Mi Perfil</h2>
          <p>Gestiona tu información personal</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Profile Info */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <div className="flex items-center gap-4 mb-6">
            {user.avatar ? (
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-[#00A8CC] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="mb-1">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            
            <button className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors">
              <Edit2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-[8px]">
              <Mail className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Email</p>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-[8px]">
              <Phone className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Teléfono</p>
                <p>{user.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3>Métodos de Pago</h3>
            <button className="text-[#00A8CC] text-sm hover:underline">
              Agregar
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-[8px]">
              <CreditCard className="w-6 h-6 text-gray-600" />
              <div className="flex-1">
                <p>Visa terminada en 4242</p>
                <p className="text-sm text-gray-600">Expira 12/25</p>
              </div>
              <button className="text-sm text-gray-600 hover:text-[#EF476F]">
                Eliminar
              </button>
            </div>

            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-[8px]">
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs">PSE</span>
              </div>
              <div className="flex-1">
                <p>PSE - Bancolombia</p>
                <p className="text-sm text-gray-600">Cuenta de ahorros</p>
              </div>
              <button className="text-sm text-gray-600 hover:text-[#EF476F]">
                Eliminar
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-4">Notificaciones</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p>Notificaciones por Email</p>
                  <p className="text-sm text-gray-600">Recibe actualizaciones en tu correo</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                className={`
                  relative w-12 h-6 rounded-full transition-colors
                  ${notifications.email ? 'bg-[#00A8CC]' : 'bg-gray-300'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${notifications.email ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p>Notificaciones Push</p>
                  <p className="text-sm text-gray-600">Alertas en tu dispositivo</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                className={`
                  relative w-12 h-6 rounded-full transition-colors
                  ${notifications.push ? 'bg-[#00A8CC]' : 'bg-gray-300'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${notifications.push ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p>Notificaciones por SMS</p>
                  <p className="text-sm text-gray-600">Mensajes de texto</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                className={`
                  relative w-12 h-6 rounded-full transition-colors
                  ${notifications.sms ? 'bg-[#00A8CC]' : 'bg-gray-300'}
                `}
              >
                <div
                  className={`
                    absolute top-1 w-4 h-4 bg-white rounded-full transition-transform
                    ${notifications.sms ? 'translate-x-7' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" fullWidth>
            Términos y Condiciones
          </Button>

          <Button variant="outline" fullWidth>
            Política de Privacidad
          </Button>

          <Button variant="danger" fullWidth onClick={onLogout}>
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </Button>
        </div>

        {/* Version */}
        <div className="text-center text-sm text-gray-500 py-4">
          Aventurapp v1.0.0
        </div>
      </div>
    </div>
  );
}
