import React from 'react';
import dbConnect from "@/lib/db";
import mongoose from "mongoose";
import TextileClient from "./TextileClient";

// CRITICAL: Prevent Next.js from caching the empty MongoDB response
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * ═══ DATA RESOLVER (DIRECT DB ACCESS) ═══
 * Bypasses client-side rendering to eliminate loading screens.
 */
async function fetchTextileCatalogData() {
  await dbConnect();

  const db = mongoose.connection.db;
  if (!db) {
    throw new Error("Database connection missing. Restart server.");
  }

  // 1. Fetch Curated Categories
  const categories = await db.collection("categories")
    .find({ isCurated: true, parentVertical: { $regex: /textiles/i } })
    .toArray();

  // 2. Fetch Global Textile Products
  const products = await db.collection("products")
    .find({ businessVertical: { $regex: /textiles/i } })
    .sort({ createdAt: -1 })
    .limit(100) // Optimal limit to avoid payload bloat
    .toArray();

  return {
    categories: JSON.parse(JSON.stringify(categories)),
    products: JSON.parse(JSON.stringify(products))
  };
}

export default async function TextileVerticalPage() {
  const { categories, products } = await fetchTextileCatalogData();

  return (
    <TextileClient 
      initialCategories={categories}
      initialProducts={products}
    />
  );
}
