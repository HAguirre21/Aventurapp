import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { Beach } from '../../types';
import { mockBeaches, mockPackages } from '../../data/mockData';
import { SearchBar } from '../SearchBar';
import { CategoryFilter } from '../CategoryFilter';
import { BeachCard } from '../BeachCard';

interface HomeProps {
  onBeachClick: (beach: Beach) => void;
}

const categories = [
  { id: 'todas', label: 'Todas' },
  { id: 'familiar', label: 'Familiar' },
  { id: 'aventura', label: 'Aventura' },
  { id: 'relax', label: 'Relax' },
];

export function Home({ onBeachClick }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const filteredBeaches = useMemo(() => {
    return mockBeaches.filter((beach) => {
      const matchesSearch = beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           beach.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'todas' || beach.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const specialPackages = mockPackages.slice(0, 2);

  return (
    <div className="pb-20 lg:pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#00A8CC] to-[#0077B6] text-white px-4 py-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-2">¡Bienvenido a Aventurapp!</h2>
          <p>Tu próxima aventura te espera en las playas del Pacífico</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Buscar playas..."
        />

        {/* Categories */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Special Packages */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#FFD166]" />
            <h3>Paquetes Especiales</h3>
          </div>
          
          <div className="bg-gradient-to-r from-[#FFD166] to-[#ffc533] rounded-[12px] p-6 shadow-medium mb-4">
            <h4 className="text-[#343A40] mb-2">🌊 Temporada de Ballenas</h4>
            <p className="text-[#343A40]/80 text-sm mb-4">
              Vive la experiencia única de avistar ballenas jorobadas en su hábitat natural
            </p>
            <div className="bg-white/90 backdrop-blur-sm rounded-[8px] p-3">
              <p className="text-sm text-[#343A40]">
                Desde <span className="text-[#00A8CC]">$180,000</span>
              </p>
            </div>
          </div>
        </section>

        {/* Popular Beaches */}
        <section>
          <h3 className="mb-4">
            {selectedCategory === 'todas' ? 'Playas Populares' : `Playas ${categories.find(c => c.id === selectedCategory)?.label}`}
          </h3>
          
          {filteredBeaches.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBeaches.map((beach) => (
                <BeachCard
                  key={beach.id}
                  beach={beach}
                  onClick={() => onBeachClick(beach)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No se encontraron playas con ese criterio</p>
            </div>
          )}
        </section>

        {/* Features */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-[12px] p-6 shadow-soft text-center">
            <div className="w-12 h-12 bg-[#00A8CC]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏖️</span>
            </div>
            <h4 className="mb-2">+15 Playas</h4>
            <p className="text-sm text-gray-600">Destinos únicos para explorar</p>
          </div>

          <div className="bg-white rounded-[12px] p-6 shadow-soft text-center">
            <div className="w-12 h-12 bg-[#00B4A7]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⭐</span>
            </div>
            <h4 className="mb-2">4.8/5</h4>
            <p className="text-sm text-gray-600">Calificación promedio</p>
          </div>

          <div className="bg-white rounded-[12px] p-6 shadow-soft text-center">
            <div className="w-12 h-12 bg-[#FFD166]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎉</span>
            </div>
            <h4 className="mb-2">5000+</h4>
            <p className="text-sm text-gray-600">Visitantes felices</p>
          </div>
        </section>
      </div>
    </div>
  );
}
