import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/api.routes.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Mount API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: '🌾 Welcome to Fasal Doctor API Server',
    documentation: {
      scanCrop: 'POST /api/scan-crop',
      generateVoice: 'POST /api/generate-voice',
      nearbyStores: 'GET /api/nearby-stores?lat=...&lng=...&radius=10',
      diseases: 'GET /api/diseases',
      health: 'GET /api/health',
    },
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start Server
const startServer = async () => {
  await connectDB();
  const PORT = parseInt(ENV.PORT, 10);
  app.listen(PORT, () => {
    console.log(`🚀 Fasal Doctor Server running on http://localhost:${PORT}`);
    console.log(`📡 Endpoints ready: /api/scan-crop, /api/generate-voice, /api/nearby-stores`);
  });
};

startServer();

export default app;
