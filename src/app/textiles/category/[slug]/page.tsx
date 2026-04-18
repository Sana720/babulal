import React from 'react';
import { Metadata } from 'next';
import CategoryContent from "./CategoryContent";
import dbConnect from "@/lib/db";
import mongoose from "mongoose";

// CRITICAL: Prevent Next.js from caching the empty MongoDB response
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * ═══ DATA RESOLVER (STREAMING DB ACCESS) ═══
 */
async function fetchCategoryHeaderData(slug: string) {
  await dbConnect();
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database connection missing.");

  const currentCat = await db.collection("categories").findOne({ 
    slug: { $regex: new RegExp(`^${slug}$`, 'i') } 
  });
  
  return currentCat ? JSON.parse(JSON.stringify(currentCat)) : { name: slug.toUpperCase(), image: "/bridal_luxury.png" };
}

// These are exported so they can be triggered without blocking the UI
async function fetchSubCategoriesData(categoryId: string) {
  await dbConnect();
  const db = mongoose.connection.db;
  const subs = await db.collection("subcategories").find({ categoryId }).toArray();
  return JSON.parse(JSON.stringify(subs));
}

async function fetchProductsData() {
  await dbConnect();
  const db = mongoose.connection.db;
  const products = await db.collection("products")
    .find({ businessVertical: { $in: ["textiles", "TEXTILES", "Textiles"] } })
    .sort({ createdAt: -1 })
    .limit(150)
    .toArray();
  return JSON.parse(JSON.stringify(products));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { title: `${params?.slug?.toUpperCase() || "Category"} Collection` };
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) return <div className="pt-40 text-center">Invalid Segment</div>;

  // Await the category immediately so the Hero can render
  const category = await fetchCategoryHeaderData(slug);

  // Do NOT await these! Trigger them in parallel to stream the promises down.
  const subCategoriesPromise = fetchSubCategoriesData(category._id ? category._id.toString() : "0");
  const productsPromise = fetchProductsData();

  return (
    <CategoryContent 
      initialCategory={category}
      subCategoriesPromise={subCategoriesPromise}
      productsPromise={productsPromise}
      slug={slug}
    />
  );
}
