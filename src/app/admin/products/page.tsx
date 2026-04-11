"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  ShoppingBag,
  History,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUSINESS_VERTICALS } from '@/lib/constants';

const MOCK_PRODUCTS = [
  { name: "Suti Cotton Saree", category: "Saree", vertical: "TEXTILES", status: "Active", stock: "1250+" },
  { name: "Honda Activa 6G", category: "Scooter", vertical: "HONDA", status: "Active", stock: "45 Units" },
  { name: "Ashok Leyland Dost", category: "LCV", vertical: "TRUCKING", status: "Inactive", stock: "12 Units" },
  { name: "Bridal Wear Lehenga", category: "Lehenga", vertical: "TEXTILES", status: "Active", stock: "300+" },
];

export default function AdminProductsPage() {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  return (
    <div className="p-8 bg-surface-dim min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tighter uppercase italic italic-accent">Product Inventory</h1>
          <p className="text-primary/40 text-[11px] uppercase tracking-[.3em] font-bold mt-2">Manage listings across all 5 business verticals</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white p-3 rounded-md shadow-sm border border-primary/5 hover:bg-primary hover:text-white transition-all text-primary">
              <History className="w-5 h-5" />
           </button>
           <button className="btn-accent text-[11px] px-8 py-3 tracking-widest font-bold uppercase rounded-sm flex items-center gap-2 group">
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add New Product
           </button>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/5 mb-8 flex flex-col md:flex-row gap-6 items-center">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 group-focus-within:text-accent transition-colors" />
            <input 
              type="text" 
              placeholder="Search product by name, SKU or vertical..." 
              className="w-full bg-surface-dim px-12 py-3 rounded-md text-sm font-semibold outline-none focus:bg-white focus:ring-2 focus:ring-accent/10 transition-all border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
         </div>
         
         <div className="flex gap-2 p-1 bg-surface-dim rounded-lg">
            {['ALL', ...Object.keys(BUSINESS_VERTICALS)].map((v) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-md transition-all",
                  filter === v ? "bg-primary text-white shadow-lg" : "text-primary/40 hover:text-primary"
                )}
              >
                {v}
              </button>
            ))}
         </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-primary/2 border-b border-surface-dim">
                  <tr>
                     <th className="px-6 py-5 text-[10px] uppercase font-bold text-primary/40 tracking-widest">Product / Category</th>
                     <th className="px-6 py-5 text-[10px] uppercase font-bold text-primary/40 tracking-widest">Vertical</th>
                     <th className="px-6 py-5 text-[10px] uppercase font-bold text-primary/40 tracking-widest">Status</th>
                     <th className="px-6 py-5 text-[10px] uppercase font-bold text-primary/40 tracking-widest">Inventory</th>
                     <th className="px-6 py-5 text-[10px] uppercase font-bold text-primary/40 tracking-widest text-right">Admin Control</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-surface-dim">
                  {MOCK_PRODUCTS.filter(p => filter === 'ALL' || p.vertical === filter).map((item, i) => (
                    <tr key={i} className="hover:bg-surface-dim/50 transition-colors group">
                       <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-primary/5 rounded-md flex items-center justify-center text-primary/20 group-hover:bg-accent group-hover:text-white transition-all">
                                <ShoppingBag className="w-6 h-6" />
                             </div>
                             <div>
                                <div className="text-sm font-bold text-primary tracking-tight">{item.name}</div>
                                <div className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mt-1">{item.category}</div>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-6 border-none">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-sm border",
                            item.vertical === 'TEXTILES' ? "border-primary/20 text-primary" : "border-accent/20 text-accent"
                          )}>
                             {item.vertical}
                          </span>
                       </td>
                       <td className="px-6 py-6">
                          <div className="flex items-center gap-2">
                             <div className={cn("w-1.5 h-1.5 rounded-full", item.status === 'Active' ? "bg-green-500 animate-pulse" : "bg-accent")} />
                             <span className="text-[11px] font-bold text-primary">{item.status}</span>
                          </div>
                       </td>
                       <td className="px-6 py-6">
                          <span className="text-[12px] font-bold text-primary/50 italic">{item.stock}</span>
                       </td>
                       <td className="px-6 py-6 text-right">
                          <div className="flex justify-end gap-2 px-6">
                             <button className="p-2.5 rounded-md bg-surface-dim text-primary/40 hover:bg-primary hover:text-white transition-all">
                                <Edit2 className="w-4 h-4" />
                             </button>
                             <button className="p-2.5 rounded-md bg-surface-dim text-primary/40 hover:bg-accent hover:text-white transition-all">
                                <Trash2 className="w-4 h-4" />
                             </button>
                             <button className="p-2.5 rounded-md bg-surface-dim text-primary/40 hover:bg-accent hover:text-white transition-all">
                                <LayoutGrid className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* EMPTY STATE */}
         {MOCK_PRODUCTS.filter(p => filter === 'ALL' || p.vertical === filter).length === 0 && (
           <div className="p-20 text-center">
              <div className="flex justify-center mb-6">
                 <div className="bg-surface-dim p-8 rounded-full">
                    <Filter className="w-8 h-8 text-primary/20" />
                 </div>
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">No products found in this vertical.</h4>
              <p className="text-primary/40 text-sm italic">Try adjusting your filters or adding a new listing.</p>
           </div>
         )}
      </div>

    </div>
  );
}
