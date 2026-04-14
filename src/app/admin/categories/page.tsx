"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Image as ImageIcon, 
  Edit3, 
  Trash2, 
  Briefcase, 
  Eye,
  Loader2,
  RefreshCcw,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch Categories
  const fetchCategories = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Update Category Field (Toggle Status/Header)
  const updateCategory = async (id: string, updates: any) => {
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        setCategories(categories.map(cat => cat._id === id ? { ...cat, ...updates } : cat));
      }
    } catch (err) {
      console.error('Failed to update category:', err);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#f5f7fb] min-h-screen">
      
      {/* HEADER ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-8 rounded-3xl shadow-sm border border-[#d1d9e6]">
         <div>
            <h1 className="text-2xl font-black text-[#1a2b4b] uppercase tracking-tighter italic italic-accent flex items-center gap-3">
               Category Master Control
               {isRefreshing && <RefreshCcw className="w-5 h-5 animate-spin text-accent" />}
            </h1>
            <p className="text-[#1a2b4b]/40 text-[9px] uppercase font-bold tracking-[.3em] mt-1 italic">Managing {categories.length} dynamic vertical nodes</p>
         </div>
         
         <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a2b4b]/20 group-focus-within:text-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search Category..."
                 className="pl-12 pr-6 py-4 bg-[#f8fafc] border border-[#d1d9e6] rounded-xl text-xs font-bold w-full md:w-80 outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-[#1a2b4b]/20"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>
            
            <button className="bg-[#095181] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[.2em] shadow-lg shadow-[#095181]/20 flex items-center justify-center gap-2 hover:-translate-y-1 transition-all">
               <Plus className="w-4 h-4" /> Add New Node
            </button>
         </div>
      </div>

      {/* CATEGORY LIST TABLE */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-[#d1d9e6] overflow-hidden min-h-[400px]">
         {isLoading ? (
           <div className="p-40 flex flex-col items-center justify-center gap-4 text-primary/20">
              <Loader2 className="w-10 h-10 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Accessing MongoDB Vault...</span>
           </div>
         ) : filteredCategories.length === 0 ? (
           <div className="p-40 text-center">
              <Layers className="w-16 h-16 text-[#d1d9e6] mx-auto mb-6" />
              <h3 className="text-[#1a2b4b] text-xl font-black uppercase italic italic-accent">No Categories Synced</h3>
              <p className="text-[#1a2b4b]/30 text-xs font-bold uppercase tracking-widest mt-2">Start adding nodes to the vertical hierarchy.</p>
           </div>
         ) : (
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-[#f8fafc]/50">
                       <th className="px-8 py-5 text-[9px] font-black text-[#1a2b4b]/40 uppercase tracking-[.2em] border-b border-[#f0f3f8] w-20">No.</th>
                       <th className="px-8 py-5 text-[9px] font-black text-[#1a2b4b]/40 uppercase tracking-[.2em] border-b border-[#f0f3f8]">Category Structure</th>
                       <th className="px-8 py-5 text-[9px] font-black text-[#1a2b4b]/40 uppercase tracking-[.2em] border-b border-[#f0f3f8]">Assets</th>
                       <th className="px-8 py-5 text-[9px] font-black text-[#1a2b4b]/40 uppercase tracking-[.2em] border-b border-[#f0f3f8]">Header Visibility</th>
                       <th className="px-8 py-5 text-[9px] font-black text-[#1a2b4b]/40 uppercase tracking-[.2em] border-b border-[#f0f3f8]">Priority</th>
                       <th className="px-8 py-5 text-[9px] font-black text-[#1a2b4b]/40 uppercase tracking-[.2em] border-b border-[#f0f3f8] w-48 text-center">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#f0f3f8]">
                    {filteredCategories.map((cat, idx) => (
                      <tr key={cat._id} className="group hover:bg-[#fcfdfe] transition-all duration-300">
                         <td className="px-8 py-6">
                            <span className="text-sm font-bold text-[#1a2b4b]/40">{idx + 1}.</span>
                         </td>
                         <td className="px-8 py-6">
                            <div className="space-y-1.5">
                               <div className="text-sm font-black text-[#1a2b4b] uppercase tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                                  {cat.name}
                                  {cat.status === 'Active' && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                               </div>
                               <div className="flex items-center gap-3">
                                  <span className="text-[9px] font-bold text-[#1a2b4b]/30 uppercase tracking-widest bg-surface-dim px-2 py-0.5 rounded">Nodes: {cat.subCategoryCount || 0}</span>
                                  <span className="text-[9px] font-bold text-[#1a2b4b]/30 uppercase tracking-widest">{cat.parentVertical}</span>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <button className="flex items-center gap-2 text-[#1a2b4b] text-[10px] font-bold uppercase tracking-widest hover:text-[#095181] transition-colors">
                               <Eye className="w-3.5 h-3.5" /> View Media
                            </button>
                         </td>
                         <td className="px-8 py-6">
                            <div 
                              onClick={() => updateCategory(cat._id, { showInHeader: !cat.showInHeader })}
                              className={cn(
                               "w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-300",
                               cat.showInHeader ? "bg-[#095181]" : "bg-[#d1d9e6]"
                            )}>
                               <div className={cn(
                                  "w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 transform",
                                  cat.showInHeader ? "translate-x-6" : "translate-x-0"
                               )} />
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <input 
                              type="text" 
                              className="w-16 px-4 py-2 border border-[#d1d9e6] rounded-lg text-xs font-black text-[#1a2b4b] bg-white text-center"
                              defaultValue={cat.order}
                              onBlur={(e) => updateCategory(cat._id, { order: parseInt(e.target.value) })}
                            />
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center justify-center gap-4">
                               <Edit3 className="w-4 h-4 text-[#1a2b4b]/40 hover:text-[#095181] cursor-pointer transition-all hover:scale-110" />
                               <Trash2 className="w-4 h-4 text-[#1a2b4b]/40 hover:text-accent cursor-pointer transition-all hover:scale-110" />
                               <button 
                                 onClick={() => updateCategory(cat._id, { status: cat.status === 'Active' ? 'Inactive' : 'Active' })}
                                 className={cn(
                                  "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all",
                                  cat.status === 'Active' ? "border-green-100 text-green-600 bg-green-50" : "border-red-100 text-red-500 bg-red-50"
                               )}
                               >
                                  {cat.status}
                               </button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
         )}
         
         <div className="p-8 bg-[#f8fafc]/50 border-t border-[#f0f3f8] flex justify-between items-center text-[10px] font-bold text-[#1a2b4b]/20 uppercase tracking-widest">
            <p className="italic italic-accent">Synced with MongoDB Cloud Atlas v2.0</p>
         </div>
      </div>
    </div>
  );
}

// Re-using Layers from lucide (missed in local import line)
import { Layers } from 'lucide-react';
