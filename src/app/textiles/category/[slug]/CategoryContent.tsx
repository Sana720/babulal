"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MessageCircle, 
  PhoneCall, 
  Download,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Clock
} from 'lucide-react';
import TextileHeader from '@/components/TextileHeader';
import Footer from '@/components/Footer';
import StoreLocatorModal from '@/components/StoreLocatorModal';
import { Haptics } from '@/lib/haptics';

interface CategoryContentProps {
  initialCategory: any;
  subCategoriesPromise: Promise<any[]>;
  productsPromise: Promise<any[]>;
  slug: string;
}

export default function CategoryContent({ initialCategory, subCategoriesPromise, productsPromise, slug }: CategoryContentProps) {
  const [isStoreModalOpen, setIsStoreModalOpen] = React.useState(false);

  return (
    <div className="bg-white min-h-screen text-[#0A5181]">
      <TextileHeader />
      
      <StoreLocatorModal 
        isOpen={isStoreModalOpen} 
        onClose={() => setIsStoreModalOpen(false)} 
        vertical="textile"
      />

      <main className="pt-[100px]">
        
        {/* ═══ REFINED CATEGORY HEADER (SS-Matched) ═══ */}
        <section className="relative w-full h-[300px] lg:h-[400px] overflow-hidden bg-[#0A5181]">
           <Image 
             src={initialCategory?.image || "/bridal_luxury.png"} 
             alt={initialCategory?.name} 
             fill 
             className="object-cover opacity-70"
             priority
           />
           <div className="absolute inset-0 bg-black/20" />
           
           <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-center">
              <Link 
                href="/textiles" 
                onClick={() => Haptics.light()}
                className="flex items-center gap-2 text-white/80 text-[10px] lg:text-[11px] font-black uppercase tracking-[0.3em] mb-4 hover:text-white transition-colors"
              >
                 <ArrowLeft className="w-4 h-4" /> BACK TO COLLECTIONS
              </Link>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-[1] mb-6">
                 {initialCategory?.name} COLLECTION
              </h1>
              
              <p className="max-w-3xl text-sm lg:text-base text-white/90 font-medium italic leading-relaxed">
                 {initialCategory?.description || "Discover a century of weaving excellence. From traditional handloom masterpieces to contemporary silk drapes, our collection defines the pinnacle of Indian ethnic elegance."}
              </p>
           </div>
        </section>

        {/* ══ FEATURED PIECES SECTION DIVIDER ══ */}
        <section className="bg-white py-12 lg:py-16">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-10">
                 <div>
                    <div className="w-16 h-1 bg-[#DA222A] mb-4" />
                    <div className="text-[10px] font-black uppercase text-[#DA222A] tracking-[0.2em] mb-2">Inventory Catalog</div>
                    <h2 className="text-3xl lg:text-4xl font-black text-[#0A5181] uppercase tracking-tighter italic">Featured Pieces</h2>
                 </div>
                 <div className="text-[10px] font-black uppercase text-gray-300 tracking-widest text-right">
                    AVAILABLE IN-STORE ONLY • WHOLESALE EXPORT PARTNER
                 </div>
              </div>
           </div>
        </section>

        {/* ══ CATALOG GRID WITH SIDEBAR ══ */}
        <section className="bg-white pb-24">
           <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <React.Suspense fallback={<ProductSectionSkeleton />}>
                 <AsyncProductSection 
                   subCategoriesPromise={subCategoriesPromise}
                   productsPromise={productsPromise}
                   initialCategory={initialCategory}
                   setIsStoreModalOpen={setIsStoreModalOpen}
                 />
              </React.Suspense>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

// ══ ASYNC INNER COMPONENT ══
function AsyncProductSection({ subCategoriesPromise, productsPromise, initialCategory, setIsStoreModalOpen }: any) {
  // Wait for the data to stream in
  const dbSubCategories = React.use(subCategoriesPromise) as any[];
  const dbProducts = React.use(productsPromise) as any[];
  
  const finalProducts = dbProducts.filter((p: any) => {
    const pCat = String(p.category || "").toLowerCase().trim();
    const cName = String(initialCategory?.name || "").toLowerCase().trim();
    const cSlug = String(initialCategory?.slug || "").toLowerCase().trim();
    return pCat === cName || pCat === cSlug || cName.includes(pCat);
  });

  return (
    <div className="flex flex-col lg:flex-row gap-12">
       <aside className="lg:w-64 shrink-0">
          <div className="sticky top-40 space-y-12">
             <div>
                <h3 className="text-xs font-black uppercase text-[#0A5181] border-b-2 border-gray-100 pb-2 mb-6 tracking-tight">Product Sub-Type</h3>
                <ul className="space-y-4">
                   <li>
                      <button 
                        onClick={() => Haptics.light()}
                        className="text-[11px] font-black text-[#DA222A] flex items-center gap-2 uppercase tracking-tight"
                      >
                         <CheckCircle className="w-4 h-4" /> ALL {initialCategory?.name}
                      </button>
                   </li>
                   {dbSubCategories.map((sub: any) => (
                      <li key={sub._id}>
                         <button 
                           onClick={() => Haptics.light()}
                           className="text-[11px] font-bold text-gray-400 hover:text-[#0A5181] uppercase transition-colors tracking-tight"
                         >
                            {sub.name}
                         </button>
                      </li>
                   ))}
                </ul>
             </div>

             <div className="p-6 bg-[#fbfbfb] border border-gray-100 rounded">
                <h4 className="text-[10px] font-black uppercase text-[#0A5181] tracking-widest mb-3">Bulk Assistance</h4>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6 uppercase">Direct procurement desk for wholesale partners.</p>
                <button 
                  onClick={() => {
                    Haptics.medium();
                    setIsStoreModalOpen(true);
                  }}
                  className="w-full bg-[#0A5181] text-white py-4 rounded text-[10px] font-black uppercase tracking-widest hover:bg-[#DA222A] transition-colors"
                >
                   Enquire Now
                </button>
             </div>
          </div>
       </aside>

       <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
             {finalProducts.length > 0 ? (
               finalProducts.map((item: any) => (
                  <div key={item._id} className="group border border-gray-100 bg-white hover:border-[#DA222A] transition-all flex flex-col">
                     <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                        <Image 
                          src={item.images?.[0] || "/latest_arrivals_saree.png"} 
                          alt={item.name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                     </div>
                     <div className="p-5 flex flex-col flex-1">
                        <h4 className="text-[11px] font-black text-[#0A5181] uppercase tracking-tight mb-2 h-8 line-clamp-2">{item.name}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 italic">{item.attributes?.fabric || 'Premium Quality'}</p>
                        <button 
                           onClick={() => {
                             Haptics.medium();
                             setIsStoreModalOpen(true);
                           }}
                           className="w-full bg-white border border-[#DA222A] text-[#DA222A] py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#DA222A] hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                           <MessageCircle className="w-3.5 h-3.5" /> Price Enquiry
                        </button>
                     </div>
                  </div>
               ))
             ) : (
               <div className="col-span-full w-full py-24 mb-12 flex flex-col items-center justify-center bg-[#fbfbfb] border border-gray-100">
                  <Clock className="w-8 h-8 text-gray-300 mb-6" />
                  <h3 className="text-xl font-black text-[#0A5181] uppercase tracking-tighter italic mb-3">Collection Incoming</h3>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 text-center max-w-md">Our procurement team is currently curating premium institutional pieces for this vertical. Check back shortly.</p>
               </div>
             )}
          </div>

          <div className="mt-32 pt-20 border-t border-gray-100">
             <div className="max-w-4xl space-y-12">
                <div className="space-y-6">
                   <h2 className="text-2xl lg:text-3xl font-black text-[#0A5181] uppercase tracking-tighter italic">Premier Wholesale Destination for {initialCategory?.name} in Ranchi</h2>
                   <div className="text-sm lg:text-base text-gray-500 font-medium leading-[1.8] space-y-6 italic">
                      <p>
                         Babulal Premkumar stands as a pillar of excellence in the Indian textile landscape. For over four decades, our group has anchored the wholesale supply chain across Jharkhand, connecting century-old weaving traditions with modern retail infrastructures. 
                      </p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

function ProductSectionSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-12 w-full animate-pulse">
       <aside className="lg:w-64 shrink-0 hidden lg:block space-y-4 pt-12">
          <div className="h-4 w-full bg-gray-100 rounded mb-8" />
          {[1,2,3,4,5].map(i => <div key={i} className="h-3 w-3/4 bg-gray-100 rounded" />)}
       </aside>
       <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="group border border-gray-50 flex flex-col">
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden" />
              <div className="p-5 flex flex-col gap-3">
                 <div className="h-3 w-full bg-gray-100 rounded" />
                 <div className="h-3 w-2/3 bg-gray-100 rounded" />
                 <div className="h-8 w-full bg-gray-50 mt-4 rounded" />
              </div>
            </div>
          ))}
       </div>
    </div>
  );
}
