import { Request, Response } from 'express';
import { Disease } from '../models/Disease.model.js';
import { getDbStatus } from '../config/db.js';
import { SEED_DISEASES } from '../data/seedData.js';

export const getDiseasesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const crop = req.query.crop as string | undefined;

    if (getDbStatus()) {
      const query = crop ? { cropType: new RegExp(crop, 'i') } : {};
      const diseases = await Disease.find(query);
      if (diseases && diseases.length > 0) {
        res.status(200).json({ success: true, count: diseases.length, data: diseases });
        return;
      }
    }

    // In-memory fallback
    const filtered = crop
      ? SEED_DISEASES.filter((d) => d.cropType.toLowerCase() === crop.toLowerCase())
      : SEED_DISEASES;

    res.status(200).json({ success: true, count: filtered.length, data: filtered });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch diseases.' });
  }
};
