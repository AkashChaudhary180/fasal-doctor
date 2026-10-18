import mongoose, { Schema, Document } from 'mongoose';

export interface IScanHistory extends Document {
  farmerId?: mongoose.Types.ObjectId;
  imageUrl: string;
  cropType: string;
  diagnosedDisease: string;
  diseaseId?: mongoose.Types.ObjectId;
  confidence: number;
  symptomsObserved: string[];
  remedyAudioUrl?: string;
  remedySummary: {
    en: string;
    hi: string;
    pa: string;
  };
  recommendedProducts: string[];
  location?: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  scannedAt: Date;
}

const ScanHistorySchema = new Schema<IScanHistory>(
  {
    farmerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    cropType: {
      type: String,
      required: true,
    },
    diagnosedDisease: {
      type: String,
      required: true,
    },
    diseaseId: {
      type: Schema.Types.ObjectId,
      ref: 'Disease',
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    symptomsObserved: [{ type: String }],
    remedyAudioUrl: String,
    remedySummary: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' },
      pa: { type: String, default: '' },
    },
    recommendedProducts: [{ type: String }],
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [77.209, 28.6139],
      },
    },
    scannedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

ScanHistorySchema.index({ location: '2dsphere' });

export const ScanHistory =
  mongoose.models.ScanHistory || mongoose.model<IScanHistory>('ScanHistory', ScanHistorySchema);
