"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Loader2,
  CheckCircle2,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BUSINESS_VERTICALS } from '@/lib/constants';

const TEXTILE_CATEGORIES = BUSINESS_VERTICALS.TEXTILES.categories;

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: TEXTILE_CATEGORIES[0] as string,
    businessVertical: 'textiles',
    description: '',
    images: [''],
    attributes: {
      fabric: '',
      work: '',
      pattern: '',
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
    }
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Product added successfully to Textile inventory!' });
        setTimeout(() => router.push('/admin/products'), 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to add product' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <Link href="/admin/products" className="p-3 bg-white rounded-full shadow-sm hover:bg-primary hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tighter uppercase italic italic-accent">Add Textile Listing</h1>
            <p className="text-primary/40 text-[10px] uppercase tracking-[.3em] font-bold mt-1">Expanding Babulal Premkumar Inventory</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-primary text-white px-10 py-4 rounded-sm text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Publish to Site
        </button>
      </div>

      {message.text && (
        <div className={cn(
          "mb-8 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4",
          message.type === 'success' ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
        )}>
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
          <span className="text-sm font-bold uppercase tracking-tight">{message.text}</span>
        </div>
      )}

      <form className="grid lg:grid-cols-3 gap-10">
        
        {/* LEFT COL: PRIMARY INFO */}
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
              <h3 className="text-xs font-black uppercase tracking-[.3em] text-primary/30 mb-8 border-b border-surface-dim pb-4 italic">Core Information</h3>
              <div className="space-y-6">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Product Name</label>
                   <input 
                     type="text" 
                     required
                     className="w-full bg-surface-dim px-4 py-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                     placeholder="e.g., Designer Silk Zari Saree"
                     value={formData.name}
                     onChange={handleNameChange}
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Display URL (Slug)</label>
                   <div className="flex items-center gap-2 bg-surface-dim px-4 py-4 rounded-xl group focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                      <span className="text-primary/20 text-xs font-bold leading-none">/products/</span>
                      <input 
                        type="text" 
                        required
                        className="flex-1 bg-transparent text-sm font-bold border-none outline-none text-primary"
                        placeholder="auto-generated-slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      />
                   </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Category</label>
                      <select 
                        className="w-full bg-surface-dim px-4 py-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer appearance-none"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                         {TEXTILE_CATEGORIES.map(cat => (
                           <option key={cat} value={cat}>{cat}</option>
                         ))}
                      </select>
                   </div>
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Sub-Vertical</label>
                      <input 
                        type="text" 
                        disabled
                        className="w-full bg-primary/5 px-4 py-4 rounded-xl text-sm font-bold border-none outline-none text-primary/50"
                        value="Textiles & Apparel"
                      />
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Description</label>
                   <textarea 
                     rows={5}
                     className="w-full bg-surface-dim px-4 py-4 rounded-xl text-sm font-semibold border-none outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                     placeholder="Enter product story and highlights..."
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                   />
                </div>
              </div>
           </section>

           <section className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
              <h3 className="text-xs font-black uppercase tracking-[.3em] text-primary/30 mb-8 border-b border-surface-dim pb-4 italic">Textile Technical Specs</h3>
              <div className="grid md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Fabric Type</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Cotton, Silk"
                      className="w-full bg-surface-dim px-4 py-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/10"
                      value={formData.attributes.fabric}
                      onChange={(e) => handleAttributeChange('fabric', e.target.value)}
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Work / Embroidery</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Zari, Printed"
                      className="w-full bg-surface-dim px-4 py-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/10"
                      value={formData.attributes.work}
                      onChange={(e) => handleAttributeChange('work', e.target.value)}
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Pattern</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Floral, Solid"
                      className="w-full bg-surface-dim px-4 py-4 rounded-xl text-sm font-bold border-none outline-none focus:ring-2 focus:ring-primary/10"
                      value={formData.attributes.pattern}
                      onChange={(e) => handleAttributeChange('pattern', e.target.value)}
                    />
                 </div>
              </div>
           </section>
        </div>

        {/* RIGHT COL: MEDIA & SEO */}
        <div className="space-y-8">
           <section className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
              <div className="flex justify-between items-center mb-8 border-b border-surface-dim pb-4">
                 <h3 className="text-xs font-black uppercase tracking-[.3em] text-primary/30 italic">Media Gallery</h3>
                 <button 
                   type="button"
                   onClick={addImageField}
                   className="text-primary hover:text-accent transition-colors"
                 >
                    <Plus className="w-4 h-4" />
                 </button>
              </div>
              <div className="space-y-4">
                 {formData.images.map((img, idx) => (
                   <div key={idx} className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/20" />
                      <input 
                        type="text" 
                        placeholder="Cloudinary image URL..."
                        className="w-full bg-surface-dim px-12 py-3.5 rounded-xl text-xs font-bold border-none outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                        value={img}
                        onChange={(e) => updateImage(idx, e.target.value)}
                      />
                      {idx > 0 && (
                        <button 
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-accent/20 hover:text-accent"
                          onClick={() => {
                            const newImgs = formData.images.filter((_, i) => i !== idx);
                            setFormData({...formData, images: newImgs});
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                   </div>
                 ))}
                 <p className="text-[9px] text-primary/30 uppercase tracking-widest mt-2 leading-relaxed">Recommended: High-res portrait shots for textiles vertical.</p>
              </div>
           </section>

           <section className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5">
              <h3 className="text-xs font-black uppercase tracking-[.3em] text-primary/30 mb-8 border-b border-surface-dim pb-4 italic">SEO Enhancement</h3>
              <div className="space-y-6">
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Meta Title</label>
                   <input 
                     type="text" 
                     className="w-full bg-surface-dim px-4 py-3 rounded-xl text-[11px] font-bold border-none outline-none focus:ring-2 focus:ring-primary/10"
                     placeholder="Primary target keyword phrase..."
                     value={formData.seo.metaTitle}
                     onChange={(e) => setFormData({...formData, seo: {...formData.seo, metaTitle: e.target.value}})}
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-black uppercase tracking-widest text-primary/60 mb-2">Meta Description</label>
                   <textarea 
                     rows={4}
                     className="w-full bg-surface-dim px-4 py-3 rounded-xl text-[11px] font-semibold border-none outline-none focus:ring-2 focus:ring-primary/10 resize-none"
                     placeholder="Summarize content for search engines..."
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
