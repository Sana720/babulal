"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, ArrowUpRight, Navigation, Phone, Clock } from 'lucide-react';

const TRUCKING_STORES = [
  { city: "Ranchi HQ", address: "National Highway Hub, Near Highway Junction, Ranchi", type: "Sales & Service" },
  { city: "Hazaribagh", address: "NH-33, Main Commercial Belt, Hazaribagh", type: "Service Hub" },
  { city: "Daltonganj", address: "Industrial Area, Bypass Road, Daltonganj", type: "Sales Outlet" },
  { city: "Ramgarh", address: "Gola Road Crossing, Ramgarh", type: "Sales & Service" }
];

interface TruckingShowroomLocatorProps {
  onTestRideClick: () => void;
}

export default function TruckingShowroomLocator({ onTestRideClick }: TruckingShowroomLocatorProps) {
  return (
    <section className="py-32 lg:py-48 bg-[#073E62] relative overflow-hidden">
      {/* ═══ GEOMETRIC WATERMARK ═══ */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='10' cy='10' r='1' fill='white' opacity='0.5'/%3E%3Ccircle cx='50' cy='30' r='0.8' fill='white' opacity='0.4'/%3E%3Ccircle cx='80' cy='70' r='1.2' fill='white' opacity='0.3'/%3E%3Ccircle cx='30' cy='80' r='0.6' fill='white' opacity='0.5'/%3E%3Ccircle cx='70' cy='15' r='0.9' fill='white' opacity='0.4'/%3E%3C/svg%3E\")"}} />
      
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-24 items-center">
           <div className="lg:col-span-4 space-y-12">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-1 bg-[#DA222A]" />
                 <span className="text-white text-[11px] font-black uppercase tracking-[.6em]">Regional Coverage</span>
              </div>
              <h2 className="text-white text-5xl lg:text-8xl font-black uppercase tracking-tighter italic leading-[0.85]">
                 Strategic <br /><span className="text-[#DA222A]">Presence.</span>
              </h2>
              <p className="text-white/40 text-lg font-medium italic border-l-2 border-white/10 pl-8">
                Operating across 9+ key industrial and highway nodes in Jharkhand to keep your fleet moving.
              </p>
              <button 
                onClick={onTestRideClick}
                className="group flex items-center gap-6 bg-[#DA222A] px-10 py-5 rounded-sm hover:bg-white transition-all shadow-2xl"
              >
                 <span className="text-white group-hover:text-[#073E62] text-xs font-black uppercase tracking-[.4em] italic">Full Network Map</span>
                 <Navigation className="w-5 h-5 text-white group-hover:text-[#073E62]" />
              </button>
           </div>

           <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
              {TRUCKING_STORES.map((store, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-2xl group hover:bg-white transition-all duration-700">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#DA222A] transition-colors">
                         <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-[#073E62]/40 italic">{store.type}</span>
                   </div>
                   <h4 className="text-white group-hover:text-[#073E62] text-3xl font-black italic tracking-tighter mb-4 transition-colors">{store.city}</h4>
                   <p className="text-white/40 group-hover:text-[#073E62]/60 text-sm font-medium italic mb-10 leading-relaxed transition-colors">{store.address}</p>
                   <div className="flex items-center gap-4 text-[#DA222A] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Navigate Hub <ArrowUpRight className="w-4 h-4" />
                   </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
