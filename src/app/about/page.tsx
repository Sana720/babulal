"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Award, ShieldCheck, TrendingUp, History, Landmark, Building2, MapPin } from 'lucide-react';

const TIMELINE = [
  { year: "1978", title: "The Foundation", desc: "Shri Babulal Premkumar established the first textile trading post in Main Road, Ranchi, setting the standard for quality in the region." },
  { year: "1995", title: "Automotive Expansion", desc: "Leveraging a reputation for trust, the group diversified into two-wheelers, becoming one of the most successful dealerships in Jharkhand." },
  { year: "2010", title: "Logistics & Manufacturing", desc: "Strategic entry into Commercial Vehicles with Ashok Leyland and the birth of MUVA Industries for precision engineering." },
  { year: "2024", title: "Global Digital Hub", desc: "A transition toward high-end B2B exports and digital transformation of the group's operational legacy." },
];

export default function AboutPage() {
  return (
    <div className="bg-canvas">
      
      {/* LEGACY HERO */}
      <section id="legacy" className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-primary">
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(218,34,42,0.15) 0%, transparent 50%)"}} />
         
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent text-[11px] font-bold uppercase tracking-[.4em] mb-8"
            >
              Since 1978 — The Ranchi Legacy
            </motion.h4>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-5xl md:text-8xl font-black italic tracking-tighter leading-none mb-12 uppercase italic-accent"
            >
              Integrity is our Architecture.
            </motion.h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto leading-relaxed italic">The Babulal Premsons Group is a multi-sector conglomerate built on the bedrock of trust, dedication, and architectural business excellence.</p>
         </div>
      </section>

      {/* THE STORY (EDITORIAL LAYOUT) */}
      <section id="philosophy" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-start">
           <div className="sticky top-40">
              <h2 className="text-primary text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[0.9]">The Babulal<br /> <span className="text-accent italic font-black uppercase">Philosophy</span></h2>
              <p className="text-primary/60 text-lg font-medium leading-relaxed mb-10 italic">"Business is not just about commerce; it's about the legacy you build within your community." — Founder's Vision.</p>
              
              <div className="space-y-8">
                 {[
                   { icon: Award, label: "Uncompromising Quality", desc: "From fabrics to 3-wheelers, every product is a promise of group excellence." },
                   { icon: Landmark, label: "Ranchi Heritage", desc: "A deep core belief in the growth of Jharkhand and the surrounding region." },
                 ].map((v, i) => (
                   <div key={i} className="flex gap-6 group">
                      <div className="bg-primary p-4 rounded-xl shadow-lg shadow-primary/20 text-white group-hover:scale-110 transition-transform">
                        <v.icon className="w-6 h-6" />
                      </div>
                      <div>
                         <h5 className="text-[14px] font-bold text-primary tracking-tight">{v.label}</h5>
                         <p className="text-[11px] font-bold text-primary/40 uppercase tracking-widest leading-loose mt-1">{v.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-40">
              {TIMELINE.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                   className="relative group"
                >
                   <div className="text-9xl font-black text-primary/5 tracking-tighter absolute -top-12 -left-12 select-none group-hover:text-accent/10 transition-colors duration-700">{step.year}</div>
                   <div className="pl-12 border-l border-primary/10 relative z-10">
                      <h4 className="text-[10px] font-bold text-accent uppercase tracking-[.4em] mb-4">Milestone {i + 1}</h4>
                      <h3 className="text-4xl font-bold text-primary tracking-tight mb-6">{step.title}</h3>
                      <p className="text-primary/50 text-lg font-medium leading-relaxed">{step.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* SCALE & REACH */}
      <section className="bg-white py-32 border-t border-surface-dim overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Building2, label: "5 Verticals", sub: "Textiles to Automotive" },
              { icon: MapPin, label: "20+ Cities", sub: "Wide Supply Chain" },
              { icon: ShieldCheck, label: "ISO Certified", sub: "Process Excellence" },
              { icon: History, label: "45 Years", sub: "Operational Legacy" }
            ].map((v, i) => (
              <div key={i} className="text-center group">
                 <div className="flex justify-center mb-6">
                    <div className="bg-primary/5 p-8 rounded-full group-hover:bg-primary transition-all duration-700">
                       <v.icon className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                 </div>
                 <h5 className="text-[14px] font-bold text-primary uppercase tracking-widest">{v.label}</h5>
                 <p className="text-[11px] font-bold text-primary/30 uppercase tracking-[.3em] mt-2">{v.sub}</p>
              </div>
            ))}
        </div>
      </section>

      {/* CTA ENQUIRY */}
      <section className="py-32 bg-primary">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-white text-5xl md:text-7xl font-bold italic tracking-tighter mb-12 uppercase italic-accent">Partner with Legacy.</h2>
            <Link href="/contact" className="inline-block bg-accent text-white px-12 py-5 rounded-md font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-2xl shadow-black/40">
               Initiate Group Collaboration
            </Link>
         </div>
      </section>

    </div>
  );
}
