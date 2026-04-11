import mongoose, { Schema, model, models } from 'mongoose';

const LeadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  mobile: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  interest: { type: String }, // e.g., 'Franchise Enquiry', 'Bulk Order'
  
  businessVertical: { type: String, required: true }, // 'textiles', 'honda', etc.
  source: { type: String, enum: ['WHATSAPP', 'FORM', 'VIDEOCALL'], default: 'FORM' },
  
  status: { type: String, enum: ['NEW', 'IN_PROGRESS', 'CLOSED'], default: 'NEW' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Lead = models.Lead || model('Lead', LeadSchema);

export default Lead;
