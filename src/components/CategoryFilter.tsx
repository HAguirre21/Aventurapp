import React from 'react';

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`
            px-4 py-2 rounded-[8px] whitespace-nowrap transition-all duration-200
            ${
              selected === category.id
                ? 'bg-[#00A8CC] text-white shadow-soft'
                : 'bg-white text-[#343A40] hover:bg-gray-50'
            }
          `}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
