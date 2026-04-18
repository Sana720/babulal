"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Loader2,
  CheckCircle2,
  Info,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BUSINESS_VERTICALS } from '@/lib/constants';

// Group Verticals based on the Business logic
const VERTICALS = [
  { id: 'TEXTILES', name: 'Textiles & Apparel', shop: 'Babulal Premkumar' },
  { id: 'HONDA', name: '2-Wheelers', shop: 'Premsons Honda' },
  { id: 'BAJAJ', name: '3-Wheelers', shop: 'Premsons Bajaj' },
  { id: 'TRUCKING', name: 'Commercial Vehicles', shop: 'Premsons & Poddar Trucking' },
  { id: 'MANUFACTURING', name: 'Industrial', shop: 'MUVA Industries' },
];

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState<number | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    businessVertical: 'TEXTILES',
    description: '',
    images: [''],
    isActive: true,
    attributes: {} as any,
    seo: {
      metaTitle: '',
      metaDescription: '',
    }
  });

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            ...data,
            businessVertical: data.businessVertical.toUpperCase(),
            images: data.images?.length > 0 ? data.images : [''],
            seo: data.seo || { metaTitle: '', metaDescription: '' }
          });
        } else {
          setMessage({ type: 'error', text: 'Failed to load product' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: 'Error fetching product' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Dynamically load categories when vertical changes
  const activeCategories = (BUSINESS_VERTICALS as any)[formData.businessVertical]?.categories || [];
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleAttributeChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      attributes: { ...formData.attributes, [key]: value }
    });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const updateImage = (index: number, val: string) => {
    const newImages = [...formData.images];
    newImages[index] = val;
    setFormData({ ...formData, images: newImages });
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image too large. Please use images under 2MB.' });
      return;
    }

    setIsUploading(index);
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateImage(index, base64String);
        setIsUploading(null);
      };
      reader.onerror = () => {
        setMessage({ type: 'error', text: 'Failed to read file' });
        setIsUploading(null);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setMessage({ type: 'error', text: 'Upload error' });
      setIsUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formData }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: `Product updated successfully!` });
        setTimeout(() => router.push('/admin/products'), 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update product' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-12 max-w-[1400px] mx-auto min-h-screen bg-[#F8F9FA]">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="p-3 bg-white rounded-full shadow-sm hover:bg-primary hover:text-white transition-all group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tighter uppercase italic">
              Edit <span className="text-accent underline decoration-accent/20 underline-offset-8">Listing</span>
            </h1>
            <p className="text-primary/40 text-[10px] uppercase tracking-[.3em] font-bold mt-2">Babulal Premsons Group Catalog</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
             onClick={handleSubmit}
             disabled={isSubmitting}
             className="w-full lg:w-auto bg-primary text-white px-12 py-5 rounded-sm text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary/95 shadow-xl shadow-primary/20 transition-all disabled:opacity-50"
           >
             {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
             Save Changes
           </button>
        </div>
      </div>

      <div className="mb-12 flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Listing Status:</span>
        <button 
          onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
          className={cn(
            "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
            formData.isActive ? "bg-green-500 text-white shadow-lg shadow-green-200" : "bg-red-400 text-white shadow-lg shadow-red-100"
          )}
        >
          {formData.isActive ? "Active / Public" : "Hidden / Draft"}
        </button>
      </div>

      {message.text && (
        <div className={cn(
          "mb-10 p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4 border shadow-sm",
          message.type === 'success' ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
        )}>
          {message.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <Info className="w-6 h-6" />}
          <span className="text-[11px] font-black uppercase tracking-wider leading-none">{message.text}</span>
        </div>
      )}

      <form className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
           <section className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-primary/5">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-surface-dim">
                <span className="text-accent font-black text-xs uppercase tracking-[0.2em] bg-accent/5 px-3 py-1 rounded-full">01.</span>
                <h3 className="text-[11px] font-black uppercase tracking-[.4em] text-primary/40 italic">Business Vertical</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                 {VERTICALS.map(v => (
                   <button
                     key={v.id}
                     type="button"
                     onClick={() => setFormData({...formData, businessVertical: v.id})}
                     className={cn(
                       "p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all text-center flex flex-col items-center gap-2",
                       formData.businessVertical === v.id 
                         ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                         : "bg-surface-dim border-transparent text-primary/40 hover:bg-white hover:border-primary/20"
                     )}
                   >
                     {v.id === 'textiles' && <div className="w-2 h-2 rounded-full bg-accent" />}
                     {v.name.split(' ')[0]}
                   </button>
                 ))}
              </div>
           </section>

           <section className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-primary/5">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-surface-dim">
                <span className="text-accent font-black text-xs uppercase tracking-[0.2em] bg-accent/5 px-3 py-1 rounded-full">02.</span>
                <h3 className="text-[11px] font-black uppercase tracking-[.4em] text-primary/40 italic">Catalog Details</h3>
              </div>
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/60">Product Display Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-surface-dim px-6 py-5 rounded-2xl text-[13px] font-bold border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-primary placeholder:text-primary/20"
                      placeholder="e.g., Banarasi Zari Silk Saree"
                      value={formData.name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/60">Category Type</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-surface-dim px-6 py-5 rounded-2xl text-[13px] font-bold border-none outline-none focus:ring-4 focus:ring-primary/5 cursor-pointer appearance-none text-primary"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                         {activeCategories.map((cat: string) => (
                           <option key={cat} value={cat}>{cat}</option>
                         ))}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/60">Search-Engine Friendly Slug</label>
                  <div className="flex items-center gap-4 bg-surface-dim px-6 rounded-2xl focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                     <span className="text-primary/20 text-[11px] font-black uppercase tracking-widest hidden md:block">babulal.group/</span>
                     <input 
                       type="text" 
                       required
                       className="flex-1 bg-transparent py-5 text-[13px] font-bold border-none outline-none text-primary"
                       placeholder="loading-slug..."
                       value={formData.slug}
                       onChange={(e) => setFormData({...formData, slug: e.target.value})}
                     />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/60">Public Description</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-surface-dim px-6 py-5 rounded-2xl text-[13px] font-semibold border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-primary resize-none placeholder:text-primary/20"
                    placeholder="Describe product details..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
           </section>

           <section className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-primary/5">
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-surface-dim">
                <span className="text-accent font-black text-xs uppercase tracking-[0.2em] bg-accent/5 px-3 py-1 rounded-full">03.</span>
                <h3 className="text-[11px] font-black uppercase tracking-[.4em] text-primary/40 italic">Technical Specifications</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {Object.keys(formData.attributes || {}).map(key => (
                   <div key={key} className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/60">{key.replace(/([A-Z])/g, ' $1')}</label>
                      <input 
                        type="text" 
                        className="w-full bg-surface-dim px-6 py-4 rounded-xl text-[13px] font-bold border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                        value={formData.attributes[key]}
                        onChange={(e) => handleAttributeChange(key, e.target.value)}
                      />
                   </div>
                 ))}
              </div>
           </section>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <section className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-primary/5">
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-surface-dim">
                 <h3 className="text-[11px] font-black uppercase tracking-[.4em] text-primary/40 italic">Media Assets</h3>
                 <button type="button" onClick={addImageField} className="p-2 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-lg transition-all">
                    <Plus className="w-4 h-4" />
                 </button>
              </div>
              
              <div className="space-y-6">
                 {(formData.images || []).map((img, idx) => (
                   <div key={idx} className="group">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4 bg-surface-dim px-6 rounded-2xl focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                          <ImageIcon className={cn("w-4 h-4 transition-colors", img ? "text-accent" : "text-primary/20")} />
                          <input 
                            type="text" 
                            className="flex-1 bg-transparent py-4 text-[12px] font-bold border-none outline-none text-primary"
                            value={img}
                            onChange={(e) => updateImage(idx, e.target.value)}
                          />
                          <label className="cursor-pointer p-2 hover:bg-primary/5 rounded-lg transition-all group/upload relative">
                            {isUploading === idx ? <Loader2 className="w-4 h-4 text-accent animate-spin" /> : <Plus className="w-4 h-4 text-primary/40 group-hover/upload:text-accent transition-colors" />}
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(idx, e)} disabled={isUploading !== null} />
                          </label>
                          {idx > 0 && <button type="button" className="text-primary/10 hover:text-accent transition-colors" onClick={() => setFormData({...formData, images: formData.images.filter((_, i) => i !== idx)})}>
                            <Trash2 className="w-4 h-4" />
                          </button>}
                        </div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-surface-dim border-2 border-dashed border-primary/5 flex items-center justify-center">
                          {img ? <><img src={img} alt="Preview" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" onClick={() => updateImage(idx, '')} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-all"><Trash2 className="w-5 h-5" /></button>
                          </div></> : <div className="flex flex-col items-center gap-2 opacity-20"><ImageIcon className="w-8 h-8" /><span className="text-[10px] font-bold uppercase tracking-widest">No Asset</span></div>}
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-white p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-primary/5">
              <h3 className="text-[11px] font-black uppercase tracking-[.4em] text-primary/40 mb-10 pb-6 border-b border-surface-dim italic">SEO Authority</h3>
              <div className="space-y-8">
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/60">Meta Title</label>
                   <input 
                     type="text" 
                     className="w-full bg-surface-dim px-6 py-4 rounded-xl text-[12px] font-bold border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                     value={formData.seo.metaTitle}
                     onChange={(e) => setFormData({...formData, seo: {...formData.seo, metaTitle: e.target.value}})}
                   />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-[.2em] text-primary/60">Meta Description</label>
                   <textarea 
                     rows={4}
                     className="w-full bg-surface-dim px-6 py-4 rounded-xl text-[12px] font-semibold border-none outline-none focus:ring-4 focus:ring-primary/5 transition-all text-primary resize-none"
                     value={formData.seo.metaDescription}
                     onChange={(e) => setFormData({...formData, seo: {...formData.seo, metaDescription: e.target.value}})}
                   />
                </div>
              </div>
           </section>
        </div>
      </form>
    </div>
  );
}
