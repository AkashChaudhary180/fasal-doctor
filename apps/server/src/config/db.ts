import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

export const connectDB = async (): Promise<boolean> => {
  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`🌿 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    console.warn(`⚠️ MongoDB connection unavailable (${error.message}). Running in autonomous in-memory mock mode.`);
    isConnected = false;
    return false;
  }
};

export const getDbStatus = () => isConnected;
