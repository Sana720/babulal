"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, MapPin, Navigation, Globe } from 'lucide-react';

const BAJAJ_STORES = [
  {
    city: "Ranchi",
    locations: [
      { name: "Premsons Bajaj - Main Road (HQ)", address: "Opposite Ranchi Club Complex, Mahatma Gandhi Main Road, Ranchi - 834001", mapUrl: "https://maps.google.com/?q=Premsons+Bajaj+Main+Road+Ranchi" },
      { name: "Premsons Bajaj - Tupudana", address: "Devi Mandap, Tupudana, Hatia, Ranchi - 834003", mapUrl: "https://maps.google.com/?q=Premsons+Bajaj+Tupudana+Ranchi" },
      { name: "Premsons Bajaj - Namkum (Mega Service Hub)", address: "Samlong, Namkum Industrial Area, Ranchi - 834010", mapUrl: "https://maps.google.com/?q=Premsons+Bajaj+Namkum+Ranchi" }
    ]
  },
  {
    city: "Khunti",
    locations: [
      { name: "Premsons Bajaj - Khunti", address: "Khunti-Ranchi Road, Khunti (Sales and Service)", mapUrl: "https://maps.google.com/?q=Premsons+Bajaj+Khunti" }
    ]
  },
  {
    city: "Ramgarh",
    locations: [
      { name: "Premsons Bajaj - Ramgarh", address: "Main Road, Ramgarh (Sales and Service)", mapUrl: "https://maps.google.com/?q=Premsons+Bajaj+Ramgarh" }
    ]
  },
  {
    city: "Silli",
    locations: [
      { name: "Premsons Bajaj - Silli Outlet", address: "Silli Main Road, Opposite Saheb Bandh Talab, Silli, Ranchi District", mapUrl: "https://maps.google.com/?q=Premsons+Bajaj+Silli" }
    ]
  }
];

const TRUCKING_STORES = [
  {
    city: "Ranchi",
    locations: [
      { name: "Premsons & Poddar Trucking - Ranchi (HQ)", address: "National Highway Hub, Near Highway Junction, Ranchi", mapUrl: "https://maps.google.com/?q=Premsons+Poddar+Trucking+Ranchi" },
      { name: "Premsons & Poddar - Kathal More", address: "Kathal More, Ranchi (Sales and Service)", mapUrl: "https://maps.google.com/?q=Premsons+Poddar+Kathal+More" }
    ]
  },
  {
    city: "Hazaribagh",
    locations: [
      { name: "Premsons & Poddar - Hazaribagh", address: "NH-33, Main Commercial Belt, Hazaribagh", mapUrl: "https://maps.google.com/?q=Premsons+Poddar+Hazaribagh" }
    ]
  },
  {
    city: "Daltonganj",
    locations: [
      { name: "Premsons & Poddar - Daltonganj", address: "Industrial Area, Bypass Road, Daltonganj", mapUrl: "https://maps.google.com/?q=Premsons+Poddar+Daltonganj" }
    ]
  },
  {
    city: "Ramgarh",
    locations: [
      { name: "Premsons & Poddar - Ramgarh", address: "Gola Road Crossing, Ramgarh", mapUrl: "https://maps.google.com/?q=Premsons+Poddar+Ramgarh" }
    ]
  }
];

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vertical?: 'bajaj' | 'trucking' | 'honda';
}

export default function StoreLocatorModal({ isOpen, onClose, vertical = 'bajaj' }: StoreLocatorModalProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const STORES_DATA = vertical === 'trucking' ? TRUCKING_STORES : BAJAJ_STORES;

  const resetAndClose = () => {
    setSelectedCity(null);
    onClose();
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#073E62]/90 backdrop-blur-md"
            onClick={resetAndClose}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-[#0A5181] px-6 py-5 md:px-8 md:py-6 flex justify-between items-center shrink-0 border-b-4 border-[#DA222A]">
              <div>
                <h2 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
                  {vertical === 'trucking' ? 'Fleet Locator' : 'Store Locator'}
                </h2>
                <p className="text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-1">
                  {selectedCity ? `Find us in ${selectedCity}` : 'Find your nearest center'}
                </p>
              </div>
              <button onClick={resetAndClose} className="text-white hover:rotate-90 transition-transform p-1">
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            <div className="p-5 md:p-8 overflow-y-auto no-scrollbar flex-1">
              {/* STEP 1: CITY SELECTION */}
              {!selectedCity ? (
                <div className="space-y-4">
                  <p className="text-gray-400 text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-6 inline-flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#DA222A]" /> Select your city
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {STORES_DATA.map((cityData) => (
                      <button 
                        key={cityData.city}
                        onClick={() => handleCitySelect(cityData.city)}
                        className="group flex items-center justify-between p-5 border border-gray-100 rounded-xl hover:border-[#DA222A] hover:bg-gray-50 transition-all text-left"
                      >
                        <span className="text-[#073E62] text-lg font-black uppercase tracking-tight group-hover:text-[#DA222A] transition-colors">{cityData.city}</span>
                        <ChevronRight className="w-6 h-6 text-gray-200 group-hover:text-[#DA222A] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* STEP 2: SHOWROOM LOCATIONS */
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <button 
                      onClick={() => setSelectedCity(null)} 
                      className="text-[#DA222A] text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-2"
                    >
                      <ChevronRight className="w-3 h-3 rotate-180" /> Back to Cities
                    </button>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      {STORES_DATA.find(c => c.city === selectedCity)?.locations.length} Locations Found
                    </span>
                  </div>

                  <div className="space-y-4">
                    {STORES_DATA.find(c => c.city === selectedCity)?.locations.map((loc, i) => (
                      <div 
                        key={i}
                        className="p-6 border border-gray-100 rounded-2xl bg-white hover:border-[#0A5181] hover:shadow-xl transition-all group"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-[#073E62] text-base md:text-lg font-black uppercase tracking-tight">{loc.name}</h4>
                          <Globe className="w-5 h-5 text-gray-200 group-hover:text-[#DA222A] transition-colors" />
                        </div>
                        <p className="text-gray-500 text-xs md:text-sm font-medium italic leading-relaxed mb-6">
                          {loc.address}
                        </p>
                        <a 
                          href={loc.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-3 bg-[#0A5181] text-white text-[9px] font-black uppercase tracking-[.3em] hover:bg-[#DA222A] transition-all rounded-lg shadow-lg"
                        >
                          <Navigation className="w-3.5 h-3.5" /> Get Directions
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer (Branding) */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-center items-center">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">Babulal Premsons Group</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
