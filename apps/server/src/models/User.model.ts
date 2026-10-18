import mongoose, { Schema, Document } from 'mongoose';

export type SupportedLanguage = 'hi' | 'pa' | 'en';

export interface IUser extends Document {
  phoneNumber: string;
  name?: string;
  preferredLanguage: SupportedLanguage;
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  state?: string;
  district?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
    },
    preferredLanguage: {
      type: String,
      enum: ['hi', 'pa', 'en'],
      default: 'hi',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [77.209, 28.6139],
      },
    },
    state: String,
    district: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ location: '2dsphere' });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
