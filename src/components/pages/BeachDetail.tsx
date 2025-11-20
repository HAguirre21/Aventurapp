import React, { useState } from 'react';
import { MapPin, Star, ArrowLeft, Check } from 'lucide-react';
import { Beach, Package } from '../../types';
import { mockPackages, mockReviews } from '../../data/mockData';
import { ImageCarousel } from '../ImageCarousel';
import { PackageCard } from '../PackageCard';
import { ReviewCard } from '../ReviewCard';
import { Button } from '../Button';

interface BeachDetailProps {
  beach: Beach;
  onBack: () => void;
  onReserve: (beach: Beach, pkg: Package, date: string) => void;
}

export function BeachDetail({ beach, onBack, onReserve }: BeachDetailProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const beachPackages = mockPackages.filter((pkg) => pkg.beachId === beach.id);
  const beachReviews = mockReviews.filter((review) => review.beachId === beach.id);

  const handleReserve = () => {
    if (selectedPackage && selectedDate) {
      onReserve(beach, selectedPackage, selectedDate);
    }
  };

  const canReserve = selectedPackage && selectedDate;

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-[8px] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h3 className="flex-1 truncate">{beach.name}</h3>
        </div>
      </div>

      {/* Image Carousel */}
      <ImageCarousel images={beach.images} alt={beach.name} />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="mb-2">{beach.name}</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-5 h-5" />
                <span>{beach.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-[#FFD166]/20 px-3 py-2 rounded-[8px]">
              <Star className="w-5 h-5 fill-[#FFD166] stroke-[#FFD166]" />
              <span>{beach.rating}</span>
              <span className="text-sm text-gray-600">({beach.reviewCount})</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className={`text-gray-700 ${!showFullDescription && 'line-clamp-3'}`}>
              {beach.description}
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-[#00A8CC] text-sm mt-2 hover:underline"
            >
              {showFullDescription ? 'Ver menos' : 'Ver más'}
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-4">Servicios Disponibles</h3>
          <div className="grid grid-cols-2 gap-3">
            {beach.services.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#00B4A7] flex-shrink-0" />
                <span className="text-sm text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-4">Selecciona tu Fecha</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
            className="w-full px-4 py-3 border border-gray-200 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#00A8CC] focus:border-transparent"
          />
        </div>

        {/* Packages */}
        <div className="bg-white rounded-[12px] p-6 shadow-soft">
          <h3 className="mb-4">Selecciona tu Paquete</h3>
          <div className="space-y-3">
            {beachPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                selected={selectedPackage?.id === pkg.id}
                onSelect={() => setSelectedPackage(pkg)}
              />
            ))}
          </div>
        </div>

        {/* Reviews */}
        {beachReviews.length > 0 && (
          <div className="bg-white rounded-[12px] p-6 shadow-soft">
            <h3 className="mb-4">Reseñas ({beachReviews.length})</h3>
            <div className="space-y-4">
              {beachReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Reserve Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-strong p-4 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            {selectedPackage ? (
              <>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-[#00A8CC]">
                  ${selectedPackage.price.toLocaleString('es-CO')}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600">Selecciona un paquete y fecha</p>
            )}
          </div>
          <Button
            variant="primary"
            size="lg"
            disabled={!canReserve}
            onClick={handleReserve}
          >
            Reservar Ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
