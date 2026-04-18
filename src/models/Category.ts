import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  subCategoryCount: number;
  faqCount: number;
  showInHeader: boolean;
  topBusiness: boolean;
  isCurated: boolean;
  order: number;
  status: 'Active' | 'Inactive';
  parentVertical: string; // e.g. 'textiles'
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  subCategoryCount: { type: Number, default: 0 },
  faqCount: { type: Number, default: 0 },
  showInHeader: { type: Boolean, default: true },
  topBusiness: { type: Boolean, default: false },
  isCurated: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  parentVertical: { type: String, default: 'textiles' },
}, { timestamps: true });

// Delete cached model to force re-registration with latest schema on hot-reload
// This prevents stale schema issues where new fields (like isCurated) get stripped
if (mongoose.models.Category) {
  delete mongoose.models.Category;
}

export default mongoose.model<ICategory>('Category', CategorySchema);
