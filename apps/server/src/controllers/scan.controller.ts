import { Request, Response } from 'express';
import { AIVisionService } from '../services/aiVision.service.js';
import { ScanHistory } from '../models/ScanHistory.model.js';
import { getDbStatus } from '../config/db.js';

export const scanCropHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    let imageBuffer: Buffer | null = null;
    let mimeType = 'image/jpeg';
    const cropHint = req.body?.cropHint as string | undefined;

    // 1. Check if uploaded via multer multipart file
    if (req.file) {
      imageBuffer = req.file.buffer;
      mimeType = req.file.mimetype || 'image/jpeg';
    } else if (req.body?.imageBase64) {
      // 2. Or base64 string
      const rawBase64 = req.body.imageBase64 as string;
      const matches = rawBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        mimeType = matches[1];
        imageBuffer = Buffer.from(matches[2], 'base64');
      } else {
        imageBuffer = Buffer.from(rawBase64, 'base64');
      }
    }

    if (!imageBuffer) {
      res.status(400).json({
        success: false,
        error: 'Please upload an image file or provide imageBase64.',
      });
      return;
    }

    // Perform AI diagnosis
    const diagnosis = await AIVisionService.diagnoseCrop(imageBuffer, mimeType, cropHint);

    // Persist to MongoDB if connected
    let scanRecordId: string | null = null;
    if (getDbStatus()) {
      try {
        const record = await ScanHistory.create({
          imageUrl: req.file ? `uploads/${Date.now()}_crop.jpg` : 'data:image/jpeg;base64,inline',
          cropType: diagnosis.cropType,
          diagnosedDisease: diagnosis.englishName,
          confidence: diagnosis.confidence,
          symptomsObserved: diagnosis.symptoms.en,
          remedySummary: {
            en: diagnosis.remedies.chemical.en,
            hi: diagnosis.remedies.chemical.hi,
            pa: diagnosis.remedies.chemical.pa,
          },
          recommendedProducts: diagnosis.recommendedProducts,
          location: req.body?.latitude && req.body?.longitude
            ? {
                type: 'Point',
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
              }
            : undefined,
        });
        scanRecordId = record._id.toString();
      } catch (dbErr: any) {
        console.warn(`Failed to save scan history: ${dbErr.message}`);
      }
    }

    res.status(200).json({
      success: true,
      scanId: scanRecordId || `scan-${Date.now()}`,
      data: diagnosis,
    });
  } catch (err: any) {
    console.error('Scan crop error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to diagnose crop leaf image. Please try again.',
      details: err.message,
    });
  }
};
