import mongoose, { Schema, Document } from 'mongoose';

export interface IAgriStockItem {
  itemName: string;
  category: 'Fungicide' | 'Insecticide' | 'Bio-fertilizer' | 'Organic Spray' | 'Pesticide' | 'Seeds';
  inStock: boolean;
  priceEstimate?: string;
  packSize?: string;
}

export interface IAgriStore extends Document {
  name: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  rating: number;
  openingHours: string;
  availableStock: IAgriStockItem[];
  verifiedKisanKendra: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AgriStockItemSchema = new Schema<IAgriStockItem>(
  {
    itemName: { type: String, required: true },
    category: {
      type: String,
      enum: ['Fungicide', 'Insecticide', 'Bio-fertilizer', 'Organic Spray', 'Pesticide', 'Seeds'],
      default: 'Fungicide',
    },
    inStock: { type: Boolean, default: true },
    priceEstimate: String,
    packSize: String,
  },
  { _id: false }
);

const AgriStoreSchema = new Schema<IAgriStore>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    openingHours: {
      type: String,
      default: '08:00 AM - 07:00 PM',
    },
    availableStock: [AgriStockItemSchema],
    verifiedKisanKendra: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

AgriStoreSchema.index({ location: '2dsphere' });

export const AgriStore =
  mongoose.models.AgriStore || mongoose.model<IAgriStore>('AgriStore', AgriStoreSchema);
