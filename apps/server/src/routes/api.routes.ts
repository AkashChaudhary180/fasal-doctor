import { Router } from 'express';
import multer from 'multer';
import { scanCropHandler } from '../controllers/scan.controller.js';
import { generateVoiceHandler } from '../controllers/voice.controller.js';
import { getNearbyStoresHandler } from '../controllers/store.controller.js';
import { getDiseasesHandler } from '../controllers/disease.controller.js';
import { getDbStatus } from '../config/db.js';

const router = Router();

// Configure Multer for in-memory image upload handling (up to 10MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'));
    }
  },
});

// 1. Scan Crop Endpoint
router.post('/scan-crop', upload.single('image'), scanCropHandler);

// 2. Generate Voice TTS Endpoint
router.post('/generate-voice', generateVoiceHandler);

// 3. Nearby Agri & Fertilizer Stores Endpoint (within 10 km)
router.get('/nearby-stores', getNearbyStoresHandler);

// 4. Disease Catalog Endpoint
router.get('/diseases', getDiseasesHandler);

// 5. System Health & DB Status Endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    name: 'Fasal Doctor API Server',
    version: '1.0.0',
    dbConnected: getDbStatus(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
