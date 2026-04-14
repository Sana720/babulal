"use client";

import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Eye, 
  Trash2, 
  Edit3, 
  Layers,
  Link as LinkIcon,
  Monitor,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BANNERS = [
  { id: 1, title: 'Summer Silk Collection', vertical: 'Textiles', position: 'Home Hero', status: 'Active' },
  { id: 2, title: 'Honda Activa 6G Launch', vertical: 'Honda', position: 'Vertical Hero', status: 'Active' },
  { id: 3, title: 'Bajaj Pulsar Festive Offer', vertical: 'Bajaj', position: 'Home Slider', status: 'Inactive' },
];

export default function BannersPage() {
  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">
      
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-8 rounded-3xl shadow-sm border border-[#d1d9e6]">
         <div>
            <h1 className="text-2xl font-black text-[#1a2b4b] uppercase tracking-tighter italic italic-accent">Hero Media Control</h1>
            <p className="text-[#1a2b4b]/40 text-[9px] uppercase font-bold tracking-[.3em] mt-1 italic">Master banner & slider management</p>
         </div>
         
         <button className="bg-[#095181] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[.2em] shadow-lg shadow-[#095181]/20 flex items-center justify-center gap-2 hover:-translate-y-1 transition-all">
            <Plus className="w-4 h-4" /> Upload New Creative
         </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
         {BANNERS.map((banner) => (
           <div key={banner.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[#d1d9e6] flex items-center gap-8 group hover:border-[#095181]/30 transition-all">
              <div className="w-48 h-28 bg-[#f8fafc] rounded-2xl flex flex-col items-center justify-center text-[#1a2b4b]/10 border border-[#d1d9e6] relative overflow-hidden">
                 <ImageIcon className="w-8 h-8 relative z-10" />
                 <span className="text-[8px] font-black uppercase tracking-widest mt-2 relative z-10">Preview Needed</span>
                 {/* Decorative background for placeholder */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#09518105_1px,_transparent_1px)] bg-[size:10px:10px]" />
              </div>

              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[#1a2b4b] text-lg font-black uppercase tracking-tighter">{banner.title}</h3>
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                      banner.status === 'Active' ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-500 border border-red-100"
                    )}>
                       {banner.status}
                    </span>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <Layers className="w-3.5 h-3.5 text-[#1a2b4b]/20" />
                       <span className="text-[10px] font-bold text-[#1a2b4b]/40 uppercase tracking-widest">{banner.vertical}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Monitor className="w-3.5 h-3.5 text-[#1a2b4b]/20" />
                       <span className="text-[10px] font-bold text-[#1a2b4b]/40 uppercase tracking-widest">{banner.position}</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4 px-6 border-l border-[#f0f3f8]">
                 <div className="flex flex-col items-center gap-1 group/btn cursor-pointer">
                    <div className="p-3 bg-surface-dim rounded-xl text-[#1a2b4b]/30 group-hover/btn:bg-[#095181] group-hover/btn:text-white transition-all shadow-sm">
                       <Edit3 className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#1a2b4b]/20">Edit</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 group/btn cursor-pointer">
                    <div className="p-3 bg-surface-dim rounded-xl text-[#1a2b4b]/30 group-hover/btn:bg-accent group-hover/btn:text-white transition-all shadow-sm">
                       <Trash2 className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#1a2b4b]/20">Delete</span>
                 </div>
              </div>
           </div>
         ))}
      </div>

    </div>
  );
}
