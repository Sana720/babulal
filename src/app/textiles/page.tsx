import React from 'react';
import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import TextileClient from "./TextileClient";

// CRITICAL: Enable Incremental Static Regeneration (ISR)
// This caches the page for 5 minutes, making loads nearly instant for subsequent users.
export const dynamic = 'force-dynamic';
export const revalidate = 300; 

/**
 * ═══ DATA RESOLVER (OPTIMIZED) ═══
 * Bypasses client-side rendering to eliminate loading screens.
 */
async function fetchTextileCatalogData() {
  await dbConnect();

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database connection missing. Restart server.");
  }

  // Execute all queries in parallel for maximum performance
  // Using direct string matches instead of regex to leverage indexes
  const [categories, products, banners] = await Promise.all([
    db.collection("categories")
      .find({ parentVertical: { $in: ["textiles", "TEXTILES"] } })
      .sort({ order: 1 })
      .toArray(),

    db.collection("products")
      .find({ businessVertical: { $in: ["textiles", "TEXTILES", "textile", "TEXTILE"] } })
      .sort({ createdAt: -1 })
      .limit(500) 
      .toArray(),

    db.collection("banners")
      .find({ 
        vertical: { $in: ["textiles", "TEXTILES"] }, 
        position: 'HOME_HERO',
        isActive: true 
      })
      .sort({ order: 1 })
      .toArray()
  ]);

  return {
    categories: JSON.parse(JSON.stringify(categories)),
    products: JSON.parse(JSON.stringify(products)),
    banners: JSON.parse(JSON.stringify(banners))
  };
}

export default async function TextileVerticalPage() {
  const { categories, products, banners } = await fetchTextileCatalogData();

  return (
    <TextileClient 
      initialCategories={categories}
      initialProducts={products}
      initialBanners={banners}
    />
  );
}
