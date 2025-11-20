import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { mockBeaches } from '../../data/mockData';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { Beach } from '../../types';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BeachManagementProps {
  onBack: () => void;
}

export function BeachManagement({ onBack }: BeachManagementProps) {
  const [beaches, setBeaches] = useState(mockBeaches);
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleStatus = (beachId: string) => {
    setBeaches(beaches.map((b) =>
      b.id === beachId ? { ...b, active: !b.active } : b
    ));
  };

  const handleEdit = (beach: Beach) => {
    setSelectedBeach(beach);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedBeach(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-8">
      {/* Header */}
      <div className="bg-white shadow-soft sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h3>Gestión de Playas</h3>
          </div>
          
          <Button variant="primary" onClick={handleCreate}>
            <Plus className="w-5 h-5" />
            Nueva Playa
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {beaches.map((beach) => (
            <div
              key={beach.id}
              className="bg-white rounded-[12px] p-6 shadow-soft"
            >
              <div className="flex items-start gap-4">
                <ImageWithFallback
                  src={beach.images[0]}
                  alt={beach.name}
                  className="w-32 h-32 rounded-[8px] object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="mb-1">{beach.name}</h4>
                      <p className="text-sm text-gray-600">{beach.location}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <span className={`
                        px-3 py-1 rounded-[8px] text-xs
                        ${beach.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                        }
                      `}>
                        {beach.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {beach.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <span className="text-xs text-gray-600">Categoría:</span>
                      <p className="text-sm capitalize">{beach.category}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-600">Precio desde:</span>
                      <p className="text-sm text-[#00A8CC]">
                        ${beach.priceFrom.toLocaleString('es-CO')}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-xs text-gray-600">Calificación:</span>
                      <p className="text-sm">{beach.rating} ⭐ ({beach.reviewCount})</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {beach.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#F8F9FA] rounded-[8px] text-xs text-gray-700"
                      >
                        {service}
                      </span>
                    ))}
                    {beach.services.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-600">
                        +{beach.services.length - 3} más
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(beach)}
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                    
                    <Button
                      variant={beach.active ? 'outline' : 'secondary'}
                      size="sm"
                      onClick={() => handleToggleStatus(beach.id)}
                    >
                      {beach.active ? (
                        <>
                          <ToggleRight className="w-4 h-4" />
                          Desactivar
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          Activar
                        </>
                      )}
                    </Button>
                    
                    <Button variant="danger" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBeach ? 'Editar Playa' : 'Nueva Playa'}
        size="lg"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Nombre de la Playa</label>
            <input
              type="text"
              defaultValue={selectedBeach?.name}
              placeholder="Ej: Playa Juanchaco"
              className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Ubicación</label>
            <input
              type="text"
              defaultValue={selectedBeach?.location}
              placeholder="Ej: Juanchaco, Buenaventura"
              className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Descripción</label>
            <textarea
              defaultValue={selectedBeach?.description}
              placeholder="Describe la playa..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Categoría</label>
              <select
                defaultValue={selectedBeach?.category}
                className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
              >
                <option value="familiar">Familiar</option>
                <option value="aventura">Aventura</option>
                <option value="relax">Relax</option>
                <option value="todas">Todas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Precio Desde</label>
              <input
                type="number"
                defaultValue={selectedBeach?.priceFrom}
                placeholder="45000"
                className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Servicios (separados por coma)</label>
            <input
              type="text"
              defaultValue={selectedBeach?.services.join(', ')}
              placeholder="Restaurante, Baños, Parking, Wifi"
              className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" fullWidth onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" fullWidth onClick={() => setIsModalOpen(false)}>
              {selectedBeach ? 'Guardar Cambios' : 'Crear Playa'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
