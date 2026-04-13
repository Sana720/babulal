"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Phone, 
  Mail, 
  Star,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import TextileHeader from '@/components/TextileHeader';
import Footer from '@/components/Footer';
import StoreLocatorModal from '@/components/StoreLocatorModal';

const CATEGORY_DATA: Record<string, any> = {
  sarees: {
    title: "Elite Saree Collection",
    description: "Discover a century of weaving excellence. From traditional handloom masterpieces to contemporary silk drapes, our saree collection defines the pinnacle of Indian ethnic elegance.",
    heroImg: "/silk_saree_royal.png",
    products: [
      { name: "Banarasi Silk Masterpiece", img: "/latest_arrivals_saree.png", fabric: "Pure Mulberry Silk", work: "Zari Brocade" },
      { name: "Kanchipuram Bridal Wear", img: "/latest_arrivals_saree.png", fabric: "Kanchi Silk", work: "Gold Threading" },
      { name: "Kota Doria Exclusive", img: "/latest_arrivals_saree.png", fabric: "Cotton-Silk Blend", work: "Hand-Woven" },
      { name: "Designer Party Saree", img: "/latest_arrivals_saree.png", fabric: "Georgette", work: "Sequin Work" },
      { name: "Handloom Cotton Saree", img: "/latest_arrivals_saree.png", fabric: "Organic Cotton", work: "Block Print" },
      { name: "Paithani Traditional", img: "/latest_arrivals_saree.png", fabric: "Fine Silk", work: "Peacock Border" },
    ]
  },
  suits: {
    title: "Designer Suits & Salwars",
    description: "Impeccable tailoring meets luxurious fabrics. Our curated range of suits offers sophisticated silhouettes for every occasion, from high-stakes corporate gala to intimate festive gatherings.",
    heroImg: "/suit_boutique_purple.png",
    products: [
      { name: "Embroidered Pashmina Suit", img: "/suit_boutique_purple.png", fabric: "Premium Wool", work: "Aari Embroidery" },
      { name: "Chanderi Festive Set", img: "/suit_boutique_purple.png", fabric: "Chanderi Silk", work: "Gota Patti" },
      { name: "Silk Salwar Kameez", img: "/suit_boutique_purple.png", fabric: "Raw Silk", work: "Resham Work" },
      { name: "Cotton Silk Daily Wear", img: "/suit_boutique_purple.png", fabric: "Blended Silk", work: "Printed" },
      { name: "Anarkali Royal Set", img: "/suit_boutique_purple.png", fabric: "Crepe", work: "Stone Work" },
      { name: "Lucknowi Chikankari", img: "/suit_boutique_purple.png", fabric: "Georgette", work: "Hand-Threaded" },
    ]
  },
  kurtis: {
    title: "Luxury Kurtis & Tunics",
    description: "Breathtaking prints and clinical craftsmanship. Explore our vibrant collection of modern kurtis that redefine contemporary ethnic wear for the discerning woman.",
    heroImg: "/kurti_boutique_yellow.png",
    products: [
      { name: "Printed Rayon Kurti", img: "/kurti_boutique_yellow.png", fabric: "Superior Rayon", work: "Foil Print" },
      { name: "Cotton A-Line Tunic", img: "/kurti_boutique_yellow.png", fabric: "Handloom Cotton", work: "Solid Dyke" },
      { name: "Indo-Western Fusion", img: "/kurti_boutique_yellow.png", fabric: "Viscose", work: "Modern Cut" },
      { name: "Party Wear Kurti", img: "/kurti_boutique_yellow.png", fabric: "Silk Blend", work: "Zardosi" },
      { name: "Jaipuri Block Kurti", img: "/kurti_boutique_yellow.png", fabric: "Cotton", work: "Bagru Print" },
      { name: "Embroidered Flare", img: "/kurti_boutique_yellow.png", fabric: "Chiffon", work: "Mirror Work" },
    ]
  },
  "kids-wear": {
    title: "Kids Trend Collection",
    description: "Playful elegance for the next generation. Our limited-edition kids' collection combines comfort with celebratory style, ensuring your little ones look their absolute best.",
    heroImg: "/kids_boutique_yellow.png",
    products: [
      { name: "Mini Sherwani Set", img: "/kids_boutique_yellow.png", fabric: "Silk", work: "Banarasi" },
      { name: "Fairytale Gown", img: "/kids_boutique_yellow.png", fabric: "Net & Satin", work: "Floral Applique" },
      { name: "Traditional Pattu Pavadai", img: "/kids_boutique_yellow.png", fabric: "Silk", work: "Contrast Border" },
      { name: "Designer Kurta Pajama", img: "/kids_boutique_yellow.png", fabric: "Linen", work: "Embroidered" },
      { name: "Lehenga for Girls", img: "/kids_boutique_yellow.png", fabric: "Tissue Silk", work: "Gota Patti" },
      { name: "Modern Party Wear", img: "/kids_boutique_yellow.png", fabric: "Velvet", work: "Thread Work" },
    ]
  },
  "home-furnishings": {
    title: "Luxury Home Furnishings",
    description: "Transform your living spaces with our premium range of decorative textiles. From heritage bedsheets to bespoke curtains, we bring artistic comfort to every room.",
    heroImg: "/textile_factory.png",
    products: [
      { name: "Floral Cotton Bedsheet", img: "/textile_factory.png", fabric: "100% Cotton", work: "Hand-Block Printed" },
      { name: "Satin Finish Sofa Covers", img: "/textile_factory.png", fabric: "Velvet-Satin", work: "Quilted" },
      { name: "Embroidered Curtains", img: "/textile_factory.png", fabric: "Sheer Organza", work: "Gold Threading" },
      { name: "Premium Towel Set", img: "/textile_factory.png", fabric: "Turkish Cotton", work: "High Absorbency" },
      { name: "Woven Floor Mats", img: "/textile_factory.png", fabric: "Jute-Cotton Blend", work: "Anti-Skid Backing" },
      { name: "Cushion Cover Anthology", img: "/textile_factory.png", fabric: "Dupion Silk", work: "Patchwork" },
    ]
  },
  "mens-wear": {
    title: "Men's Suiting & Shirting",
    description: "Precision-engineered fabrics for the modern gentleman. Partnering with global leaders like Donear and Siyaram to bring you the finest in corporate and ceremonial attire.",
    heroImg: "/mens_sherwani.png",
    products: [
      { name: "Executive Suit Length", img: "/mens_sherwani.png", fabric: "Wool-Poly Blend", work: "Wrinkle-Free" },
      { name: "Pure Linen Shirting", img: "/mens_sherwani.png", fabric: "Irish Linen", work: "Solid Dyed" },
      { name: "Sherwani Fabric Set", img: "/mens_sherwani.png", fabric: "Jacquard Silk", work: "Embossed Patterns" },
      { name: "Waistcoat Material", img: "/mens_sherwani.png", fabric: "Tweed", work: "Checkered" },
      { name: "Premium Formal Shirting", img: "/mens_sherwani.png", fabric: "Giza Cotton", work: "Satin Weave" },
      { name: "Ceremonial Dhoti Set", img: "/mens_sherwani.png", fabric: "Pure Silk", work: "Gold Zari Border" },
    ]
  },
  "lehenga": {
    title: "Bridal Lehenga Galleria",
    description: "Cinematic silhouettes for the most important day of your life. Our bridal collection features hand-crafted masterpieces that celebrate heritage craftsmanship and contemporary style.",
    heroImg: "/bridal_luxury.png",
    products: [
      { name: "Velvet Bridal Lehenga", img: "/bridal_luxury.png", fabric: "Micro Velvet", work: "Heavy Zardosi" },
      { name: "Pastel Silk Lehenga", img: "/bridal_luxury.png", fabric: "Tussar Silk", work: "Resham Embroidery" },
      { name: "Mirror Work Ghagra", img: "/bridal_luxury.png", fabric: "Georgette", work: "Real Mirror Finish" },
      { name: "Lucknowi Bridal Set", img: "/bridal_luxury.png", fabric: "Organza", work: "Chikankari" },
      { name: "Sequin Cocktail Lehenga", img: "/bridal_luxury.png", fabric: "Net", work: "Dazzling Sequins" },
      { name: "Traditional Red Lehenga", img: "/bridal_luxury.png", fabric: "Raw Silk", work: "Pittan & Zari" },
    ]
  },
  "uniforms": {
    title: "Institutional Uniform Collections",
    description: "Driving professional excellence through uniform engineering. We provide durable, high-comfort fabrics for corporate, medical, and educational sectors across India.",
    heroImg: "/textile_logistics.png",
    products: [
      { name: "Corporate Blazer Fabric", img: "/textile_logistics.png", fabric: "Fine Twill", work: "Anti-Shrink" },
      { name: "Medical Scrub Material", img: "/textile_logistics.png", fabric: "Cotton-Rich", work: "Breathable" },
      { name: "School Uniform Range", img: "/textile_logistics.png", fabric: "Polycotton", work: "Long-Lasting Colors" },
      { name: "Hospitality Vest Fabric", img: "/textile_logistics.png", fabric: "Matte Silk Blend", work: "Stain-Resistant" },
      { name: "Industrial Overalls Fabric", img: "/textile_logistics.png", fabric: "Heavy Canvas", work: "Reinforced" },
      { name: "Security Force Suiting", img: "/textile_logistics.png", fabric: "Gabardine", work: "High Durability" },
    ]
  }
};

const DIRECTIONS_URL = "https://www.google.com/maps/place/Babulal+Premkumar/@23.3731426,85.3212812,17z/data=!3m1!4b1!4m6!3m5!1s0x39f4e1bf745d1d33:0x73a012c9b9d71786!8m2!3d23.3731426!4d85.3212812!16s%2Fg%2F11h2m9h6bl!18m1!1e1";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = CATEGORY_DATA[slug] || CATEGORY_DATA['sarees'];
  const [isStoreModalOpen, setIsStoreModalOpen] = React.useState(false);

  return (
    <div className="bg-white min-h-screen">
      <TextileHeader />
      
      <StoreLocatorModal 
        isOpen={isStoreModalOpen} 
        onClose={() => setIsStoreModalOpen(false)} 
        vertical="textile"
      />

      <main className="pt-32 lg:pt-[140px]">
        {/* ═══ CATEGORY HERO ═══ */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={category.heroImg}
            alt={category.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A5181]/90 via-[#0A5181]/40 to-transparent" />
          
          <div className="relative z-10 max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col justify-center">
            <Link href="/textiles" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-8 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Collections
            </Link>
            <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter italic leading-none mb-6">
              {category.title}
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl font-medium leading-relaxed italic">
              {category.description}
            </p>
          </div>
        </section>

        {/* ═══ PRODUCT CATALOG ═══ */}
        <section className="py-24 bg-gray-50/30">
          <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24">
            
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-1 bg-[#DA222A]" />
                  <span className="text-[#DA222A] text-[10px] font-black uppercase tracking-[0.4em]">Inventory Catalog</span>
                </div>
                <h2 className="text-[#0A5181] text-3xl md:text-5xl font-black uppercase tracking-tighter italic">Featured Pieces</h2>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#0A5181]/40 hidden md:block">
                Available In-Store Only • Wholesale Export Partner
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {category.products.map((item: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-[#0A5181]/0 group-hover:bg-[#0A5181]/20 transition-all duration-700" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-[#0A5181] text-xl font-black uppercase tracking-tight">{item.name}</h4>
                      <Star className="w-4 h-4 text-[#DA222A] fill-current" />
                    </div>
                    
                    <div className="space-y-2 mb-8 border-l-2 border-gray-50 pl-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Fabric:</span>
                        <span className="text-[11px] font-bold text-gray-700">{item.fabric}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Work:</span>
                        <span className="text-[11px] font-bold text-gray-700">{item.work}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                       <button 
                         onClick={() => setIsStoreModalOpen(true)}
                         className="flex-1 bg-[#0A5181] text-white py-4 rounded font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#DA222A] transition-colors"
                       >
                         <Navigation className="w-4 h-4" /> Get Directions
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Institutional Invitation Card */}
            <div className="mt-32 p-12 lg:p-20 bg-[#0A5181] rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 text-[15vw] font-black text-white/5 select-none pointer-events-none">BBP</div>
               <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                 <div className="max-w-2xl text-center lg:text-left">
                   <h3 className="text-white text-3xl md:text-5xl font-black italic tracking-tighter mb-6 uppercase">Visit Our Experience Center</h3>
                   <p className="text-white/60 text-lg md:text-xl font-medium italic">
                     Experience the weight, drape, and texture of Jharkhand&apos;s finest fabrics in person. Our flagship center offers clinical consultation for bulk procurement and custom bridal designs.
                   </p>
                 </div>
                 <div className="flex flex-col gap-4 shrink-0 sm:min-w-[300px]">
                    <button 
                      onClick={() => setIsStoreModalOpen(true)}
                      className="w-full bg-[#DA222A] text-white py-5 px-10 rounded font-black text-xs uppercase tracking-[.2em] flex items-center justify-center gap-4 hover:bg-white hover:text-[#0A5181] transition-all shadow-2xl"
                    >
                      Locate Nearest Center <Navigation className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                       <Link href="tel:+91" className="bg-white/10 text-white p-4 rounded text-center text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Call Desk</Link>
                       <Link href="mailto:contact@bbp.com" className="bg-white/10 text-white p-4 rounded text-center text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Enquiry</Link>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
