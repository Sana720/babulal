"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Users } from 'lucide-react';
import { BUSINESS_VERTICALS } from '@/lib/constants';

export default function GroupHomepage() {
  return (
    <div className="bg-canvas">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[80vh] lg:h-screen bg-primary overflow-hidden flex items-center">

        {/* Cinematic Background */}
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-24 grid lg:grid-cols-12 gap-6 lg:gap-10 items-center pt-16 lg:pt-28">

          {/* Left: Narrative */}
          <div className="lg:col-span-8">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-3 mb-4 lg:mb-8"
            >
              <span className="w-6 lg:w-12 h-[2px] bg-accent shrink-0" />
              <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[.15em] lg:tracking-[.6em] text-white/90 whitespace-nowrap">
                Est. 1978 — Ranchi, Jharkhand
              </span>
            </motion.div>

            {/* Heading */}
            <div className="mb-4 lg:mb-10">
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-black uppercase tracking-tighter leading-[0.88] drop-shadow-2xl"
                style={{ fontSize: 'clamp(2.5rem, 11vw, 6.5rem)' }}
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
                className="mt-2 lg:mt-4 hidden sm:block"
              >
                <div className="text-white/40 font-black uppercase tracking-[.15em] lg:tracking-[.3em] text-sm lg:text-xl">
                  Defining Legacy.
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="text-white/70 text-sm lg:text-lg font-medium leading-relaxed mb-6 lg:mb-10 border-l-2 border-accent/40 pl-4 lg:pl-10"
            >
              <span className="sm:hidden">Multi-sector conglomerate. 45+ years of excellence across Jharkhand.</span>
              <span className="hidden sm:inline">A diversified multi-billion dollar conglomerate governing strategic business verticals across Jharkhand with 45+ years of excellence.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="flex flex-wrap items-center gap-4 lg:gap-8"
            >
              <Link
                href="/contact"
                className="group relative px-7 py-4 lg:px-10 lg:py-5 bg-accent text-white font-black uppercase tracking-[.2em] lg:tracking-[.3em] text-xs hover:bg-accent/90 transition-all overflow-hidden"
              >
                <span className="relative z-10 transition-transform group-hover:-translate-y-1 block">Enquire Now</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              <Link
                href="/about"
                className="group flex items-center gap-3 lg:gap-4 text-white/60 hover:text-white font-bold uppercase tracking-[.2em] text-[11px] transition-colors"
              >
                Learn More
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right: Stats (Desktop only) */}
          <div className="hidden lg:block lg:col-span-4 h-full relative pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.5, duration: 1.2 }}
              className="bg-white/[0.08] backdrop-blur-xl border border-white/10 p-12 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-12">
                {[
                  { val: '45+', lbl: 'Years of Institutional Presence' },
                  { val: '5', lbl: 'Cross-Industrial Verticals' },
                  { val: '50K+', lbl: 'Network of Partners' },
                ].map((stat) => (
                  <div key={stat.lbl} className="group/stat">
                    <div className="text-4xl font-black text-white tracking-tight italic mb-2 group-hover/stat:text-accent transition-colors">
                      {stat.val}
                    </div>
                    <div className="text-[10px] font-black text-white/70 uppercase tracking-[.3em] leading-relaxed">
                      {stat.lbl}
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-4 opacity-30"
        >
          <span className="text-[9px] font-black uppercase tracking-[.5em] text-white">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Mobile Stats Strip */}
      <div className="lg:hidden bg-primary grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
        {[
          { val: '45+', lbl: 'Years' },
          { val: '5', lbl: 'Verticals' },
          { val: '50K+', lbl: 'Partners' },
        ].map((stat) => (
          <div key={stat.lbl} className="p-4 text-center">
            <div className="text-xl font-black text-accent italic">{stat.val}</div>
            <div className="text-[9px] font-black text-white/50 uppercase tracking-[.15em] mt-0.5">{stat.lbl}</div>
          </div>
        ))}
      </div>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="divisions" className="bg-white py-20 lg:py-40 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-24">

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 mb-16 lg:mb-32 border-b border-primary/5 pb-10 lg:pb-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-6 lg:mb-8"
              >
                <div className="w-8 lg:w-12 h-[2px] bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[.5em] text-primary/40">Division of Power</span>
              </motion.div>
              <h2 className="text-primary font-black uppercase tracking-tighter leading-[0.85]" style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}>
                Governing <br /><span className="text-accent italic">Diversity.</span>
              </h2>
            </div>
            <p className="max-w-sm text-primary/45 text-base lg:text-lg font-medium italic leading-relaxed border-l-2 border-accent/20 pl-6 lg:pl-10">
              Integrating four decades of excellence across five strategic market pillars.
            </p>
          </div>

          {/* PORTFOLIO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 lg:gap-12">

            {/* 01: TEXTILES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-8 h-[320px] sm:h-[480px] lg:h-[700px] group relative overflow-hidden bg-primary"
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
                <div className="absolute bottom-8 lg:bottom-16 left-6 lg:left-16 z-10">
                  <span className="text-accent text-xs font-black uppercase tracking-[.4em] mb-3 block">Sector 01</span>
                  <h3 className="text-white font-black uppercase tracking-tighter mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 4.5rem)' }}>
                    Babulal Premkumar <br /><span className="text-white/40 group-hover:text-accent transition-colors">Textiles.</span>
                  </h3>
                </div>
                <div className="absolute bottom-8 lg:bottom-16 right-6 lg:right-16">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* 02: MANUFACTURING */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 h-[280px] sm:h-[400px] lg:h-[700px] group relative overflow-hidden bg-primary"
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
                <div className="absolute top-8 lg:top-16 left-6 lg:left-12">
                  <span className="text-accent text-xs font-black uppercase tracking-[.4em] mb-3 block">Sector 02</span>
                  <h3 className="text-white font-black uppercase tracking-tighter" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}>MUVA <br />Industries.</h3>
                </div>
                <div className="absolute bottom-8 lg:bottom-12 left-6 lg:left-12">
                  <ArrowUpRight className="w-6 h-6 text-accent" />
                </div>
              </Link>
            </motion.div>

            {/* 03-05: AUTOMOTIVE */}
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
                className="lg:col-span-4 h-[260px] sm:h-[360px] lg:h-[500px] group relative overflow-hidden bg-surface-dim border border-primary/5"
              >
                <Link href={`/${v.slug}`} className="block h-full relative p-8 lg:p-12 flex flex-col justify-between">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover grayscale opacity-[0.03] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1500ms]"
                  />
                  <div className="relative z-10 transition-transform group-hover:-translate-y-2 duration-700">
                    <span className="text-accent text-[10px] font-black uppercase tracking-[.4em] mb-3 block">Sector 0{i + 3}</span>
                    <h3 className="text-primary group-hover:text-white transition-colors duration-500 font-black uppercase tracking-tighter" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>{v.name}</h3>
                  </div>
                  <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest">
                      View Vertical <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="absolute top-8 right-8 text-6xl lg:text-7xl font-black text-primary/[0.04] select-none">
                    0{i + 3}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS & LEGACY ═══ */}
      <section className="bg-white py-20 lg:py-40 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-primary relative overflow-hidden group p-10 lg:p-16 flex flex-col justify-between min-h-[300px] lg:min-h-[500px]"
            >
              <Image src="/hero_rich.png" alt="Legacy" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover opacity-20 grayscale" />
              <div className="relative z-10">
                <h3 className="text-white font-black tracking-tighter leading-none italic" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
                  45<span className="text-accent">+</span>
                </h3>
                <div className="text-accent font-black uppercase tracking-[.3em] text-base lg:text-xl mt-3">Years of Influence</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-5 bg-surface-dim p-10 lg:p-12 flex flex-col justify-center items-center text-center border border-primary/5 min-h-[250px]"
            >
              <h3 className="text-primary font-black tracking-tighter leading-none mb-4" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
                50K<span className="text-accent">+</span>
              </h3>
              <div className="text-primary font-bold uppercase tracking-[.4em] text-xs">Trusted Partners</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CAREERS ═══ */}
      <section className="bg-canvas py-20 lg:py-40 border-t border-primary/5">
        <div className="max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-primary font-black uppercase tracking-tighter leading-none mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                Career <br /><span className="text-accent italic">Legacy.</span>
              </h2>
              <Link href="/careers" className="group flex items-center gap-5">
                <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <span className="text-primary font-black uppercase tracking-[.3em] text-xs">Join our ecosystem</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
