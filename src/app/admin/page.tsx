"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  Layers, 
  FileText, 
  MessageCircle, 
  Phone, 
  ArrowRight,
  ChevronRight,
  Activity,
  Calendar,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Total Categories', value: '123', icon: Layers, color: 'bg-[#095181]' },
  { label: 'Total Locations', value: '629', icon: MapPin, color: 'bg-[#095181]' },
  { label: 'Total Keywords', value: '77367', icon: FileText, color: 'bg-[#095181]' },
  { label: 'Total Enquiries', value: '148', icon: Users, color: 'bg-[#095181]' },
  { label: 'Monthly Enquiries', value: '1', icon: Calendar, color: 'bg-[#095181]' },
  { label: 'Total Blogs', value: '35', icon: FileText, color: 'bg-[#095181]' },
];

const RECENT_ENQUIRIES = [
  {
    id: 1,
    name: 'Lyton Ncube',
    mobile: '0779919242',
    ip: '77.246.53.35',
    message: 'WhatsApp Enquiry',
    uri: 'https://www.babulalpremsons.com/textiles/silk-saree',
    date: 'Today'
  },
  {
    id: 2,
    name: 'ROHTASH KUMAR',
    mobile: '9876543210',
    ip: '183.83.156.234',
    message: 'General Inquiry',
    uri: 'https://www.babulalpremsons.com/honda/activa',
    date: 'Today'
  }
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-10">
         <div>
            <h1 className="text-2xl font-black text-[#1a2b4b] uppercase tracking-tighter italic italic-accent">Global Operations Dashboard</h1>
            <p className="text-[#1a2b4b]/40 text-[10px] uppercase font-bold tracking-[.3em] mt-1">Real-time group performance analytics</p>
         </div>
         <div className="flex gap-4">
            <button className="bg-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#1a2b4b] border border-[#d1d9e6] shadow-sm hover:shadow-md transition-all">
               Generate Report
            </button>
         </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
         {STATS.map((stat, idx) => (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: idx * 0.05 }}
             key={stat.label} 
             className={cn("p-8 rounded-2xl shadow-lg border border-white/10 relative overflow-hidden group", stat.color)}
           >
              {/* Shine effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="flex items-start justify-between relative z-10">
                 <div>
                    <div className="text-white/60 text-[11px] font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-white text-4xl font-black tracking-tighter leading-none">{stat.value}</div>
                 </div>
                 <div className="bg-white/10 p-4 rounded-xl">
                    <stat.icon className="w-8 h-8 text-white" />
                 </div>
              </div>
           </motion.div>
         ))}
      </div>

      {/* RECENT ENQUIRY TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#d1d9e6] overflow-hidden">
         <div className="p-8 border-b border-[#f0f3f8] flex items-center justify-between">
            <div>
               <h2 className="text-[#1a2b4b] text-lg font-black uppercase tracking-tighter">Todays Enquiry</h2>
               <p className="text-[#1a2b4b]/30 text-[9px] font-bold uppercase tracking-widest mt-1 italic">Incoming traffic from all business verticals</p>
            </div>
            <button className="bg-[#1a2b4b] text-white px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 shadow-lg shadow-[#1a2b4b]/20">
               View All
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-[#f8fafc]">
                     <th className="px-8 py-4 text-[10px] font-black text-[#1a2b4b]/40 uppercase tracking-widest border-b border-[#f0f3f8] w-20">S.No.</th>
                     <th className="px-8 py-4 text-[10px] font-black text-[#1a2b4b]/40 uppercase tracking-widest border-b border-[#f0f3f8]">Enquiry Details</th>
                     <th className="px-8 py-4 text-[10px] font-black text-[#1a2b4b]/40 uppercase tracking-widest border-b border-[#f0f3f8]">Sender Details</th>
                     <th className="px-8 py-4 text-[10px] font-black text-[#1a2b4b]/40 uppercase tracking-widest border-b border-[#f0f3f8] w-32 text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#f0f3f8]">
                  {RECENT_ENQUIRIES.map((enq, idx) => (
                    <tr key={enq.id} className="group hover:bg-[#fcfdfe] transition-colors">
                       <td className="px-8 py-6 text-sm font-bold text-[#1a2b4b]/40">{enq.id}.</td>
                       <td className="px-8 py-6">
                          <div className="space-y-1">
                             <div className="text-sm font-black text-[#1a2b4b] flex items-center gap-2 uppercase tracking-tight">
                                Name: {enq.name}
                             </div>
                             <div className="text-[11px] font-bold text-[#1a2b4b]/50">
                                Mobile: <span className="text-[#1a2b4b]">{enq.mobile}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="space-y-1">
                             <div className="text-[11px] font-bold text-[#1a2b4b]/60">
                                Sender IP Address: <span className="text-primary">{enq.ip}</span>
                             </div>
                             <div className="text-[11px] font-bold text-[#1a2b4b]/60">
                                Message: <span className="text-[#1a2b4b] font-black italic italic-accent">{enq.message}</span>
                             </div>
                             <div className="text-[10px] font-bold text-[#1a2b4b]/30 break-all max-w-md">
                                URI: {enq.uri}
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex justify-center">
                             <button className="bg-[#095181] p-3 rounded-xl text-white shadow-lg shadow-[#095181]/20 hover:-translate-y-1 transition-all group-hover:bg-[#1a2b4b]">
                                <Phone className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}
