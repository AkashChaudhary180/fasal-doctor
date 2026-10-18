export type SupportedLanguage = 'hi' | 'pa' | 'en';

export interface DiagnosisData {
  cropType: string;
  diseaseCode: string;
  englishName: string;
  localNames: {
    hi: string;
    pa: string;
    en: string;
  };
  confidence: number;
  symptoms: {
    en: string[];
    hi: string[];
    pa: string[];
  };
  remedies: {
    organic: {
      en: string;
      hi: string;
      pa: string;
    };
    chemical: {
      en: string;
      hi: string;
      pa: string;
    };
  };
  prevention: {
    en: string;
    hi: string;
    pa: string;
  };
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  recommendedProducts: string[];
  doctorAudioScript: {
    hi: string;
    pa: string;
    en: string;
  };
}

export interface StoreStockItem {
  itemName: string;
  category: string;
  inStock: boolean;
  priceEstimate?: string;
  packSize?: string;
}

export interface AgriStoreItem {
  id: string;
  name: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  rating: number;
  openingHours: string;
  verifiedKisanKendra: boolean;
  distanceKm: number;
  availableStock: StoreStockItem[];
}
