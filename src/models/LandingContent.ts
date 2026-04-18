import mongoose, { Schema, Document } from 'mongoose';

interface IFacebookPixel {
  id?: string;
  enabled: boolean;
}

interface IAboutSection {
  title: string;
  content: string;
}

interface IFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ILandingContent extends Document {
  vertical: string; // TEXTILES, HONDA, BAJAJ, TRUCKING, MANUFACTURING
  heroTitle: string;
  heroSubtitle?: string;
  aboutSection: IAboutSection;
  features: IFeature[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  facebookPixel?: IFacebookPixel;
  updatedAt: Date;
}

const LandingContentSchema: Schema = new Schema({
  vertical: { type: String, required: true, unique: true },
  heroTitle: { type: String, required: true },
  heroSubtitle: { type: String },
  aboutSection: {
    title: { type: String, default: 'Our Legacy' },
    content: { type: String, default: '' }
  },
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  contactEmail: String,
  contactPhone: String,
  address: String,
  facebookPixel: {
    id: String,
    enabled: { type: Boolean, default: false }
  }
}, { timestamps: true });

export default mongoose.models.LandingContent || mongoose.model<ILandingContent>('LandingContent', LandingContentSchema);
