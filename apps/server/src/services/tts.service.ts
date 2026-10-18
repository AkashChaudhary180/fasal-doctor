import axios from 'axios';
import { ENV } from '../config/env.js';

export interface TTSRequest {
  text: string;
  language: 'hi' | 'pa' | 'en';
  gender?: 'MALE' | 'FEMALE';
}

export interface TTSResponse {
  audioBase64?: string;
  audioUrl?: string;
  format: string;
  language: string;
  fallbackToBrowserSpeech?: boolean;
}

export class TTSService {
  /**
   * Generates audio in regional Indian languages (Hindi, Punjabi, English)
   */
  public static async generateSpeech(req: TTSRequest): Promise<TTSResponse> {
    const { text, language } = req;

    // Language code mapping
    const langCodeMap = {
      hi: 'hi-IN',
      pa: 'pa-IN',
      en: 'en-IN',
    };
    const voiceLang = langCodeMap[language] || 'hi-IN';

    // 1. Try Google Cloud Text-to-Speech if API key configured
    if (ENV.GOOGLE_TTS_API_KEY) {
      try {
        const response = await axios.post(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${ENV.GOOGLE_TTS_API_KEY}`,
          {
            input: { text },
            voice: {
              languageCode: voiceLang,
              ssmlGender: 'FEMALE',
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.95, // comfortable pace for rural listeners
              pitch: 0,
            },
          },
          { timeout: 10000 }
        );

        if (response.data?.audioContent) {
          return {
            audioBase64: `data:audio/mp3;base64,${response.data.audioContent}`,
            format: 'audio/mp3',
            language: voiceLang,
            fallbackToBrowserSpeech: false,
          };
        }
      } catch (err: any) {
        console.warn(`Google TTS API call failed (${err.message}). Using client-side speech.`);
      }
    }

    // 2. Try Bhashini API (National Language Translation Mission of India) if keys are provided
    if (ENV.BHASHINI_API_KEY && ENV.BHASHINI_USER_ID) {
      try {
        const bhashiniRes = await axios.post(
          'https://dhruva-api.bhashini.gov.in/services/inference/pipeline',
          {
            pipelineTasks: [
              {
                taskType: 'tts',
                config: {
                  language: {
                    sourceLanguage: language,
                  },
                },
              },
            ],
            inputData: {
              input: [{ source: text }],
            },
          },
          {
            headers: {
              Authorization: ENV.BHASHINI_API_KEY,
              'User-Id': ENV.BHASHINI_USER_ID,
            },
            timeout: 10000,
          }
        );

        const b64 =
          bhashiniRes.data?.pipelineResponse?.[0]?.output?.[0]?.audio?.[0]?.audioContent;
        if (b64) {
          return {
            audioBase64: `data:audio/wav;base64,${b64}`,
            format: 'audio/wav',
            language: voiceLang,
            fallbackToBrowserSpeech: false,
          };
        }
      } catch (err: any) {
        console.warn(`Bhashini TTS API failed (${err.message}).`);
      }
    }

    // Default: Signal client to use native Web SpeechSynthesis API with Hindi/Punjabi voice
    return {
      format: 'browser-speech-synthesis',
      language: voiceLang,
      fallbackToBrowserSpeech: true,
    };
  }
}
