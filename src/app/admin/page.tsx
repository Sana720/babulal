"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  MessageCircle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUSINESS_VERTICALS } from '@/lib/constants';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/admin/leads');
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeads(data);
        }
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // Derived Stats
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const whatsappHits = leads.filter(l => l.source === 'WHATSAPP').length;
  const totalLeads = leads.length;

  const STATS = [
    { label: "Total Leads", value: totalLeads.toString(), trend: "Live", up: true, icon: Users },
    { label: "New Leads", value: newLeads.toString(), trend: "Attention", up: true, icon: ShoppingBag },
    { label: "WhatsApp Hits", value: whatsappHits.toString(), trend: "Omni", up: true, icon: MessageCircle },
    { label: "Active Deals", value: leads.filter(l => l.status === 'IN_PROGRESS').length.toString(), trend: "0%", up: true, icon: Briefcase },
  ];

  return (
    <div className="p-8 bg-surface-dim min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tighter uppercase italic italic-accent">Command Center</h1>
          <p className="text-primary/40 text-[11px] uppercase tracking-[.3em] font-bold mt-2">Babulal Premsons Group Admin Portal</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-primary/5 flex items-center gap-3">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-primary">Last Updated: Just now</span>
           </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-primary/5 hover:border-accent/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-primary/5 rounded-lg group-hover:bg-primary transition-all">
                  <stat.icon className="w-5 h-5 text-primary group-hover:text-white transition-all" />
               </div>
               <div className={cn(
                 "flex items-center text-[10px] font-bold px-2 py-1 rounded-full",
                 stat.up ? "bg-green-100 text-green-700" : "bg-accent/10 text-accent"
               )}>
                 {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                 {stat.trend}
               </div>
            </div>
            <div className="text-3xl font-black text-primary tracking-tighter mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-primary/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* RECENT LEADS (HIGH DENSITY) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
           <div className="p-6 border-b border-surface-dim flex justify-between items-center bg-primary/2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Global Lead Inbox</h3>
              <button className="text-[10px] font-bold uppercase text-accent hover:underline">View All Leads</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-surface-dim">
                       <th className="px-6 py-4 text-[10px] uppercase font-bold text-primary/40">Inquiry Name</th>
                       <th className="px-6 py-4 text-[10px] uppercase font-bold text-primary/40">Division</th>
                       <th className="px-6 py-4 text-[10px] uppercase font-bold text-primary/40">Source</th>
                       <th className="px-6 py-4 text-[10px] uppercase font-bold text-primary/40">Time</th>
                       <th className="px-6 py-4 text-[10px] uppercase font-bold text-primary/40">Status</th>
                    </tr>
                 </thead>
                  <tbody className="divide-y divide-surface-dim">
                    {leads.slice(0, 10).map((lead: any, i: number) => (
                       <tr key={i} className="hover:bg-surface-dim transition-colors group">
                          <td className="px-6 py-5">
                             <div className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{lead.name}</div>
                             <div className="text-[10px] text-primary/40 lowercase">{lead.mobile}</div>
                          </td>
                          <td className="px-6 py-5">
                             <span className="text-[11px] font-bold text-primary/60 uppercase">{lead.businessVertical}</span>
                          </td>
                          <td className="px-6 py-5">
                             <div className="flex items-center gap-2 text-[11px] font-bold text-primary/40">
                                {lead.source === 'WHATSAPP' ? <MessageCircle className="w-3 h-3 text-green-500" /> : <ChevronRight className="w-3 h-3" />}
                                {lead.source}
                             </div>
                          </td>
                          <td className="px-6 py-5 text-[11px] font-medium text-primary/30">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-5">
                             <span className={cn(
                                "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                                lead.status === 'NEW' ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                             )}>
                                {lead.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                  </tbody>
              </table>
           </div>
        </div>

        {/* BUSINESS OVERVIEW */}
        <div className="bg-white rounded-2xl shadow-sm border border-primary/5 p-6">
           <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-8 border-b border-surface-dim pb-4">Division Health</h3>
           <div className="grid gap-6">
              {Object.values(BUSINESS_VERTICALS).map((v) => (
                <div key={v.id} className="flex justify-between items-center group cursor-pointer">
                   <div>
                      <div className="text-[13px] font-bold text-primary group-hover:text-accent transition-colors">{v.name}</div>
                      <div className="text-[10px] font-bold text-primary/30 uppercase tracking-[.2em]">{v.industry}</div>
                   </div>
                   <div className="h-2 w-24 bg-surface-dim rounded-full overflow-hidden">
                      <div className="h-full bg-primary group-hover:bg-accent transition-all duration-1000" style={{ width: `${Math.random() * 50 + 50}%` }} />
                   </div>
                </div>
              ))}
           </div>
           
           <button className="w-full mt-12 py-4 bg-primary text-white text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-md">
              Download PDF Report
           </button>
        </div>

      </div>

    </div>
  );
}
