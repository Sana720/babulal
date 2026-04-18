import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  businessVertical: { type: String, required: true }, // e.g. 'textiles', 'honda'
  category: { type: String, required: true },
  subCategory: { type: String },
  description: { type: String },
  images: [{ type: String }], // Cloudinary URLs
  videoUrl: { type: String }, // YouTube link per SEO doc
  brochureUrl: { type: String }, // PDF link per SEO doc
  
  // Dynamic Attributes for different business verticals
  // e.g. For textiles: fabric, work, pattern
  // e.g. For honda: engine, mileage
  attributes: { type: Map, of: String },

  // SEO Specific Fields from client's SEO Document
  seo: {
    h1: { type: String }, // e.g., 'Saree Wholesaler in Ranchi'
    metaTitle: { type: String },
    metaDescription: { type: String },
    altText: { type: String }
  },

  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
