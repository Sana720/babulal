"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide the global Navbar on vertical-specific pages that have their own header
  const isVerticalPage = pathname?.startsWith('/textiles') || 
                         pathname?.startsWith('/honda') || 
                         pathname?.startsWith('/bajaj') ||
                         pathname?.startsWith('/trucking') ||
                         pathname?.startsWith('/muva-industries');
  
  if (isVerticalPage) return null;
  
  return <Navbar />;
}
