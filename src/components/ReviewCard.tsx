import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-[12px] p-4 shadow-soft">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-[#00A8CC] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white">{review.userName.charAt(0)}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span>{review.userName}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? 'fill-[#FFD166] stroke-[#FFD166]'
                      : 'stroke-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <span className="text-xs text-gray-500">
            {new Date(review.date).toLocaleDateString('es-CO')}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
      
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {review.images.map((image, index) => (
            <ImageWithFallback
              key={index}
              src={image}
              alt={`Foto ${index + 1}`}
              className="w-24 h-24 rounded-[8px] object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}
    </div>
  );
}
