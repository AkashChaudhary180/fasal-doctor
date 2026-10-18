import { Request, Response } from 'express';
import { TTSService } from '../services/tts.service.js';

export const generateVoiceHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, language = 'hi', gender = 'FEMALE' } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Field "text" is required for voice generation.',
      });
      return;
    }

    if (!['hi', 'pa', 'en'].includes(language)) {
      res.status(400).json({
        success: false,
        error: 'Supported languages are "hi" (Hindi), "pa" (Punjabi), and "en" (English).',
      });
      return;
    }

    const ttsResult = await TTSService.generateSpeech({
      text,
      language: language as 'hi' | 'pa' | 'en',
      gender,
    });

    res.status(200).json({
      success: true,
      data: ttsResult,
    });
  } catch (err: any) {
    console.error('Voice generation error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to generate voice remedy audio.',
      details: err.message,
    });
  }
};
