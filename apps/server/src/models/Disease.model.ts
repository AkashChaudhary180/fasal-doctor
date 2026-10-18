import mongoose, { Schema, Document } from 'mongoose';

export interface IDisease extends Document {
  code: string; // unique identifier e.g. "wheat_yellow_rust"
  cropType: string; // e.g. "Wheat", "Rice", "Tomato", "Cotton", "Mustard"
  englishName: string;
  localNames: {
    hi: string; // Hindi e.g. "पीला रतुआ (Yellow Rust)"
    pa: string; // Punjabi e.g. "ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust)"
    en: string; // English
  };
  symptoms: {
    en: string[];
    hi: string[];
    pa: string[];
  };
  remedies: {
    organic: {
      en: string;
      hi: string;
      pa: string;
    };
    chemical: {
      en: string;
      hi: string;
      pa: string;
    };
  };
  prevention: {
    en: string;
    hi: string;
    pa: string;
  };
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendedProducts: string[];
  sampleImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DiseaseSchema = new Schema<IDisease>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    cropType: {
      type: String,
      required: true,
      index: true,
    },
    englishName: {
      type: String,
      required: true,
    },
    localNames: {
      hi: { type: String, required: true },
      pa: { type: String, required: true },
      en: { type: String, required: true },
    },
    symptoms: {
      en: [{ type: String }],
      hi: [{ type: String }],
      pa: [{ type: String }],
    },
    remedies: {
      organic: {
        en: { type: String, required: true },
        hi: { type: String, required: true },
        pa: { type: String, required: true },
      },
      chemical: {
        en: { type: String, required: true },
        hi: { type: String, required: true },
        pa: { type: String, required: true },
      },
    },
    prevention: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
      pa: { type: String, required: true },
    },
    severity: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'MEDIUM',
    },
    recommendedProducts: [{ type: String }],
    sampleImageUrl: String,
  },
  {
    timestamps: true,
  }
);

export const Disease = mongoose.models.Disease || mongoose.model<IDisease>('Disease', DiseaseSchema);
