import { Request, Response } from 'express';
import { StoreService } from '../services/store.service.js';

export const getNearbyStoresHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const latStr = req.query.lat as string;
    const lngStr = req.query.lng as string;
    const radiusStr = req.query.radius as string;

    // Default to New Delhi / Punjab agricultural border if coordinates not supplied
    const latitude = latStr ? parseFloat(latStr) : 29.6857;
    const longitude = lngStr ? parseFloat(lngStr) : 76.9905;
    const radiusKm = radiusStr ? parseFloat(radiusStr) : 10;

    if (isNaN(latitude) || isNaN(longitude)) {
      res.status(400).json({
        success: false,
        error: 'Invalid latitude or longitude coordinates.',
      });
      return;
    }

    const stores = await StoreService.findNearbyStores(latitude, longitude, radiusKm);

    res.status(200).json({
      success: true,
      count: stores.length,
      userLocation: { latitude, longitude },
      radiusKm,
      stores,
    });
  } catch (err: any) {
    console.error('Nearby stores error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby fertilizer/agri stores.',
      details: err.message,
    });
  }
};
