import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '5001',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fasal_doctor',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  GOOGLE_TTS_API_KEY: process.env.GOOGLE_TTS_API_KEY || '',
  BHASHINI_API_KEY: process.env.BHASHINI_API_KEY || '',
  BHASHINI_USER_ID: process.env.BHASHINI_USER_ID || '',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
