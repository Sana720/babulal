"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight, Globe, Shield, History, Users, Target } from 'lucide-react';
import { BUSINESS_VERTICALS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function GroupHomepage() {
  return (
    <div className="bg-canvas">
      
      {/* ═══ HERO — INSTITUTIONAL MASTERPIECE ═══ */}
      <section className="relative h-screen min-h-[750px] bg-primary overflow-hidden flex items-center">
        
        {/* Cinematic Parallax Background */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/hero_rich.png"
            alt="Babulal Premsons Headquarters"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            loading="eager"
          />
          {/* ═══ Visual Overlay (Deepened for Text Clarity) ═══ */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-transparent shadow-[inset_0_0_100px_rgba(0,0,0,0.3)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />
          {/* Subtle Grain Overlay for texture */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")"}} />
        </motion.div>

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-8 lg:px-24 grid lg:grid-cols-12 gap-10 items-center pt-10 lg:pt-24 -translate-y-12 lg:translate-y-0">
          
          {/* Left Column: The Narrative */}
          <div className="lg:col-span-8">
            {/* Ghosted Branding Watermark */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="absolute -top-20 -left-6 text-[20vw] font-black text-white/[0.04] select-none pointer-events-none leading-none tracking-tighter"
            >
              BBP
            </motion.div>

            {/* Eyebrow with Animated Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="w-12 h-[2px] bg-accent shadow-[0_0_10px_rgba(218,34,42,0.6)]" />
              <span className="text-[10px] font-black uppercase tracking-[.6em] text-white/90 drop-shadow-md">
                Defining the Industry since 1978
              </span>
            </motion.div>

            {/* Massive Architectural Typography */}
            <div className="mb-10 relative">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-black uppercase tracking-tighter leading-[0.85] drop-shadow-2xl"
                style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)' }}
              >
                Building<br />
                <span className="text-accent italic relative">
                  Trust.
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="absolute -bottom-1 left-0 w-full h-1 bg-accent/40 origin-left"
                  />
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-4 ml-1"
              >
                <div className="text-white/40 font-black uppercase tracking-[.3em] text-lg lg:text-xl drop-shadow-md">
                  Defining Legacy.
                </div>
              </motion.div>
            </div>

            {/* Lead Copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="text-white/80 text-base lg:text-lg font-medium max-w-xl leading-relaxed mb-10 border-l-2 border-accent/40 pl-10 drop-shadow-sm"
            >
              A diversified multi-billion dollar conglomerate governing 
              strategic business verticals across Jharkhand with 45+ years of excellence.
            </motion.p>

            {/* Interaction Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="flex items-center gap-8"
            >
              <Link
                href="/contact"
                className="group relative px-10 py-5 bg-accent text-white font-black uppercase tracking-[.3em] text-xs hover:bg-accent/90 transition-all overflow-hidden"
              >
                <span className="relative z-10 transition-transform group-hover:-translate-y-1 block">Enquire Now</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                href="/about"
                className="group flex items-center gap-4 text-white/60 hover:text-white font-bold uppercase tracking-[.2em] text-[11px] transition-colors"
              >
                Learn More
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Floating Vertical Info Strip (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 h-full relative pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.5, duration: 1.2 }}
              className="bg-white/[0.08] backdrop-blur-3xl border border-white/10 p-12 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-12">
                {[
                  { val: '45+', lbl: 'Years of Institutional Presence' },
                  { val: '5', lbl: 'Cross-Industrial Verticals' },
                  { val: '50K+', lbl: 'Network of Partners' },
                ].map((stat) => (
                  <div key={stat.lbl} className="group/stat">
                    <div className="text-4xl font-black text-white tracking-tight italic mb-2 group-hover/stat:text-accent transition-colors drop-shadow-md">
                      {stat.val}
                    </div>
                    <div className="text-[10px] font-black text-white/70 uppercase tracking-[.3em] leading-relaxed drop-shadow-sm">
                      {stat.lbl}
                    </div>
                  </div>
                ))}
              </div>
              {/* Decorative vertical line */}
              <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Vertical Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 group"
        >
          <span className="text-[9px] font-black uppercase tracking-[.5em] text-white">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>

      </section>

      {/* ═══ THE CONGLOMERATE ECOSYSTEM — INSTITUTIONAL PORTFOLIO ═══ */}
      <section id="divisions" className="bg-white py-40 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-24">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32 border-b border-primary/5 pb-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[.6em] text-primary/40">Division of Power</span>
              </motion.div>
              <h2 className="text-primary text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                Governing <br /><span className="text-accent italic">Diversity.</span>
              </h2>
            </div>
            <p className="max-w-sm text-primary/45 text-lg font-medium italic leading-relaxed border-l-2 border-accent/20 pl-10">
              Integrating four decades of excellence across five strategic market pillars to define Jharkhand&apos;s economic future.
            </p>
          </div>

          {/* ASYMMETRIC PORTFOLIO GRID */}
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            
            {/* 01: TEXTILES (The Flagship — Large Feature) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="col-span-12 lg:col-span-8 h-[600px] lg:h-[700px] group relative overflow-hidden bg-primary"
            >
              <Link href="/textiles" className="block h-full relative">
                <Image 
                  src="/vertical_textiles.png" 
                  alt="Textiles" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                
                <div className="absolute bottom-16 left-16 z-10">
                  <span className="text-accent text-xs font-black uppercase tracking-[.4em] mb-4 block">Sector 01</span>
                  <h3 className="text-white text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6">Babulal Premkumar <br /><span className="text-white/40 group-hover:text-accent transition-colors">Textiles.</span></h3>
                  <p className="text-white/60 text-lg font-medium italic max-w-md border-l border-white/20 pl-8 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    India&apos;s legacy in wholesale textiles since 1978, anchoring the group&apos;s heritage in Ranchi.
                  </p>
                </div>
                <div className="absolute bottom-16 right-16">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <ArrowUpRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 02: MANUFACTURING (The Engine — Vertical Side feature) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 lg:col-span-4 h-[600px] lg:h-[700px] group relative overflow-hidden bg-primary"
            >
              <Link href="/muva-industries" className="block h-full relative">
                <Image 
                  src="/vertical_manufacturing.png" 
                  alt="Manufacturing" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1500ms]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                <div className="absolute top-16 left-12">
                  <span className="text-accent text-xs font-black uppercase tracking-[.4em] mb-4 block">Sector 02</span>
                  <h3 className="text-white text-4xl font-black uppercase tracking-tighter">MUVA <br />Industries.</h3>
                </div>
                <div className="absolute bottom-12 left-12">
                  <p className="text-white/40 text-sm font-medium italic mb-6">Precision components & modular manufacturing excellence.</p>
                  <ArrowUpRight className="w-6 h-6 text-accent" />
                </div>
              </Link>
            </motion.div>

            {/* 03/04/05: AUTOMOTIVE & TRUCKS (Uniform Grid Row) */}
            {[
              BUSINESS_VERTICALS.HONDA,
              BUSINESS_VERTICALS.BAJAJ,
              BUSINESS_VERTICALS.TRUCKING
            ].map((v, i) => (
              <motion.div 
                key={v.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="col-span-12 lg:col-span-4 h-[500px] group relative overflow-hidden bg-surface-dim border border-primary/5"
              >
                <Link href={`/${v.slug}`} className="block h-full relative p-12 flex flex-col justify-between">
                  {/* Subtle Background reveal on hover */}
                  <Image 
                    src={v.image} 
                    alt={v.name} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover grayscale opacity-[0.03] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1500ms]" 
                  />
                  
                  {/* Readability Overlay on Hover */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-700" />
                  
                  <div className="relative z-10 transition-transform group-hover:-translate-y-2 duration-700">
                    <span className="text-accent text-[10px] font-black uppercase tracking-[.4em] mb-4 block">Sector 0{i+3}</span>
                    <h3 className="text-primary group-hover:text-white transition-colors duration-500 text-3xl font-black uppercase tracking-tighter drop-shadow-sm">{v.name}</h3>
                  </div>
                  
                  <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <p className="text-white/90 text-sm font-medium italic mb-6 leading-relaxed max-w-[80%]">{v.tagline}</p>
                    <div className="flex items-center gap-3 text-accent text-[10px] font-black uppercase tracking-widest">
                       View Vertical <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Watermark index */}
                  <div className="absolute top-12 right-12 text-7xl font-black text-primary/[0.03] group-hover:text-white/5 select-none transition-colors duration-700">
                    0{i+3}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS & LEGACY — THE HERITAGE MOSAIC ═══ */}
      <section className="bg-white py-40 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-24">
          
          <div className="grid grid-cols-12 gap-6 lg:gap-8 h-auto lg:h-[800px]">
            
            {/* 01: THE ANCHOR (45+ YEARS) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="col-span-12 lg:col-span-7 bg-primary relative overflow-hidden group p-16 flex flex-col justify-between"
            >
              <Image 
                src="/hero_rich.png" 
                alt="Legacy" 
                fill 
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-[2000ms]" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-transparent" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-[2px] bg-accent" />
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-[.6em]">Institutional Core</span>
                </div>
                <h3 className="text-white text-8xl lg:text-[12rem] font-black tracking-tighter leading-none italic">
                  45<span className="text-accent">+</span>
                </h3>
                <div className="text-accent font-black uppercase tracking-[.4em] text-xl mt-4">Years of Influence</div>
              </div>

              <div className="relative z-10 border-l-2 border-accent/30 pl-10 max-w-md">
                <p className="text-white/50 text-xl font-medium italic leading-relaxed">
                  Defining the industrial skyline and commercial soul of Ranchi since 1978.
                </p>
              </div>
            </motion.div>

            {/* 02: THE NETWORK (50K+ PARTNERS) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-12 lg:col-span-5 bg-surface-dim relative overflow-hidden group p-12 flex flex-col justify-center items-center text-center border border-primary/5"
            >
              <div className="absolute top-8 right-8 text-primary/5 text-[10vw] font-black select-none group-hover:text-accent/5 transition-colors">NET</div>
              <h3 className="text-primary text-7xl lg:text-9xl font-black tracking-tighter leading-none mb-6">50K<span className="text-accent">+</span></h3>
              <div className="text-primary font-bold uppercase tracking-[.4em] text-xs mb-8">Trusted Partners</div>
              <p className="text-primary/40 text-sm font-medium leading-relaxed max-w-xs px-8">
                A high-performance ecosystem of stakeholders spanning the entire Indian subcontinent.
              </p>
              <div className="mt-12 w-12 h-px bg-accent/30 group-hover:w-32 transition-all duration-700" />
            </motion.div>

            {/* 03: THE DIVERSITY (05 VERTICALS) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 lg:col-span-5 bg-accent relative overflow-hidden group p-12 flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="text-white/40 text-[10px] font-black uppercase tracking-[.6em] mb-4">Verticals</div>
                <h3 className="text-white text-8xl font-black tracking-tighter mb-4 italic">05</h3>
              </div>
              <div className="relative z-10">
                <div className="text-white font-black uppercase tracking-[.3em] text-xs mb-4">Market Domains</div>
                <p className="text-white/60 text-sm font-medium italic leading-relaxed">Textiles, Automotive, Logistics, and Precision Manufacturing.</p>
              </div>
              <div className="absolute -bottom-10 -right-10 text-[15vw] font-black text-white/5 select-none">DIV</div>
            </motion.div>

            {/* 04: THE FUTURE (CTO) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-12 lg:col-span-7 bg-white relative overflow-hidden group flex items-center p-16 border border-primary/5"
            >
              <div className="w-full">
                 <h2 className="text-primary text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-10">
                  Building the <br /><span className="text-accent">Next Industrial Era.</span>
                 </h2>
                 <Link href="/contact" className="inline-flex items-center gap-6 group/btn">
                    <div className="w-16 h-16 rounded-full border border-primary/10 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-500">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                    <span className="text-primary font-black uppercase tracking-[.4em] text-[10px]">Strategic Inquiry</span>
                 </Link>
              </div>
              <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 bg-primary/5" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══ CAREERS & HUMAN CAPITAL — THE INSTITUTIONAL MISSION ═══ */}
      <section className="bg-canvas py-40 overflow-hidden border-t border-primary/5">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="w-12 h-px bg-accent mb-12" />
                <h2 className="text-primary text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
                  Career <br /><span className="text-accent italic">Legacy.</span>
                </h2>
                <div className="space-y-6 text-primary/60 text-lg font-medium leading-relaxed italic">
                  <p>Joining the Babulal Premsons Group is a decision that transforms your professional journey into a legacy.</p>
                  <p>We offer an environment defined by innovation, precision, and institutional collaboration—providing an ideal platform for high-impact growth.</p>
                </div>

                <div className="mt-16 flex flex-col gap-6">
                  <Link href="/careers" className="group flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                    <span className="text-primary font-black uppercase tracking-[.3em] text-xs">Join our ecosystem</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-primary/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Crect width='20' height='20' fill='none'/%3E%3Cpath d='M0 0h20M0 0v20' stroke='%23095181' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E\")"}} />
                <div className="relative z-10 space-y-12">
                  <div className="text-center pb-8 border-b border-primary/5">
                    <span className="text-accent text-[10px] font-black uppercase tracking-[.4em]">Our Subsidiaries</span>
                  </div>
                  <div className="space-y-10">
                    {['Babulal Premkumar', 'Premsons Honda', 'Premsons Bajaj', 'Premsons & Poddar Trucking', 'MUVA Industries'].map((name) => (
                      <div key={name} className="flex justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 cursor-default">
                        <span className="text-xl font-bold tracking-tighter uppercase text-center text-primary">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-4 h-[600px] lg:h-[800px] relative order-first lg:order-last">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="h-full w-full relative overflow-hidden shadow-2xl"
              >
                <Image src="/team_branded.png" alt="Babulal Premsons Team" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-white text-[10px] font-black uppercase tracking-[.4em] mb-2">Team Collective</span>
                    <span className="text-white/60 text-xs italic font-medium leading-relaxed">Defining the backbone of Jharkhand&apos;s commercial success.</span>
                  </div>
                  <div className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

