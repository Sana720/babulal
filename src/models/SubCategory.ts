import mongoose, { Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  status: 'Active' | 'Inactive';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Prevent duplicate names within the same category
SubCategorySchema.index({ name: 1, category: 1 }, { unique: true });
SubCategorySchema.index({ slug: 1, category: 1 }, { unique: true });

export default mongoose.models.SubCategory || mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);
