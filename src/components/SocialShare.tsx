"use client";

import React, { useState } from 'react';
import { 
  Share2, 
  MessageCircle, 
  Globe, 
  Send, 
  Briefcase, 
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialShareProps {
  productName: string;
  url?: string;
  className?: string;
}

const SocialShare = ({ productName, url, className }: SocialShareProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = `Check out this premium collection: ${productName}`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      href: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: Globe,
      color: 'bg-[#1877F2]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'X (Twitter)',
      icon: Send,
      color: 'bg-black',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: Briefcase,
      color: 'bg-[#0A66C2]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative", className)}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-white border border-primary/10 rounded-full shadow-sm hover:shadow-lg hover:border-accent transition-all group"
      >
        <Share2 className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
        <span className="text-[10px] font-black uppercase text-primary tracking-widest">Share Collection</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-full left-0 mb-4 w-64 bg-white rounded-3xl shadow-2xl border border-primary/5 p-4 z-50 overflow-hidden"
            >
               <div className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/30 mb-4 px-2">Wholesale Distribution Share</div>
               
               <div className="grid grid-cols-4 gap-2 mb-4">
                  {shareOptions.map((opt) => (
                    <a 
                      key={opt.name}
                      href={opt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 group"
                    >
                       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110", opt.color)}>
                          <opt.icon className="w-5 h-5" />
                       </div>
                       <span className="text-[8px] font-bold text-primary/40 uppercase tracking-widest">{opt.name}</span>
                    </a>
                  ))}
               </div>

               <div className="pt-4 border-t border-gray-50">
                  <button 
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl hover:bg-primary hover:text-white transition-all group"
                  >
                     <div className="flex items-center gap-3">
                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-primary/40 group-hover:text-white/40" />}
                        <span className="text-[9px] font-black uppercase tracking-widest">
                           {copied ? 'Link Conserved' : 'Copy Catalog Link'}
                        </span>
                     </div>
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialShare;
