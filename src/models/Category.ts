import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  subCategoryCount: number;
  faqCount: number;
  showInHeader: boolean;
  topBusiness: boolean;
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
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  parentVertical: { type: String, default: 'textiles' },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
