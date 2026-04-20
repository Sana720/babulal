"use client";

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import StoreLocatorModal from './StoreLocatorModal';

interface ProductActionButtonsProps {
  verticalSlug: string;
  productName: string;
}

export default function ProductActionButtons({ verticalSlug, productName }: ProductActionButtonsProps) {
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

  // Mapping long vertical slugs to modal types
  const getVerticalType = (slug: string): 'textile' | 'honda' | 'bajaj' | 'trucking' => {
    if (slug === 'textiles') return 'textile';
    if (slug === 'honda') return 'honda';
    if (slug === 'bajaj') return 'bajaj';
    if (slug === 'trucking') return 'trucking';
    return 'textile';
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link 
          href="#inquiry"
          className="flex-1 px-8 py-5 bg-[#0A5181] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-accent transition-all text-center shadow-xl shadow-primary/10 group"
        >
          Price Inquiry <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <button 
          onClick={() => setIsStoreModalOpen(true)}
          className="flex-1 px-8 py-5 bg-white border-2 border-accent text-accent text-[11px] font-black uppercase tracking-[0.2em] rounded-sm hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg group"
        >
          <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" /> Get Directions
        </button>
      </div>

      <StoreLocatorModal 
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        vertical={getVerticalType(verticalSlug)}
      />
    </>
  );
}
