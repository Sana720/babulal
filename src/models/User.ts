import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed
  role: { type: String, enum: ['ADMIN', 'STAFF'], default: 'STAFF' },
  verticals: [{ type: String }], // Optional: restrict users to specific verticals
  createdAt: { type: Date, default: Date.now }
});

const User = models.User || model('User', UserSchema);

export default User;
