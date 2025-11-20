import React, { useState } from 'react';
import { ChevronRight, Waves, MapPin, Shield, Sparkles } from 'lucide-react';
import { Button } from '../Button';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Waves,
    title: 'Descubre el Pacífico',
    description: 'Explora las mejores playas de Buenaventura con nuestra guía completa',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
  },
  {
    icon: MapPin,
    title: 'Reserva Fácilmente',
    description: 'Planifica tu viaje en segundos. Elige tu playa, fecha y paquete favorito',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800',
  },
  {
    icon: Shield,
    title: 'Viaja Seguro',
    description: 'Todas nuestras playas cuentan con servicios certificados y seguros',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  },
  {
    icon: Sparkles,
    title: 'Experiencias Únicas',
    description: 'Desde relajación hasta aventura extrema. Hay algo para todos',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A8CC] to-[#0077B6] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="relative h-64 mb-8 rounded-[12px] overflow-hidden shadow-strong">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
                <Icon className="w-8 h-8 text-[#00A8CC]" />
              </div>
            </div>
          </div>

          <h2 className="text-white mb-4 text-center">{slide.title}</h2>
          <p className="text-white/90 text-center mb-8">{slide.description}</p>

          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleNext}
        >
          {currentSlide < slides.length - 1 ? 'Siguiente' : 'Comenzar'}
          <ChevronRight className="w-5 h-5" />
        </Button>

        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="w-full text-white/80 hover:text-white transition-colors py-2"
          >
            Saltar
          </button>
        )}
      </div>
    </div>
  );
}
