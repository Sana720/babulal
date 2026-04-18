import mongoose, { Schema, Document } from 'mongoose';

export interface IBanner extends Document {
  title: string;
  subtitle?: string;
  image: string; // Base64 or URL
  vertical: string; // TEXTILES, HONDA, BAJAJ, TRUCKING, MANUFACTURING, HOME
  link?: string;
  order: number;
  isActive: boolean;
  position: 'HOME_HERO' | 'VERTICAL_HERO' | 'PROMO_SECTION';
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema: Schema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true },
  vertical: { type: String, required: true, default: 'HOME' },
  link: { type: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  position: { 
    type: String, 
    enum: ['HOME_HERO', 'VERTICAL_HERO', 'PROMO_SECTION'], 
    default: 'HOME_HERO' 
  },
}, { timestamps: true });

export default mongoose.models.Banner || mongoose.model<IBanner>('Banner', BannerSchema);
