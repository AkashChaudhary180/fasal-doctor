import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  selectLanguage: string;
  scanTab: string;
  storesTab: string;
  historyTab: string;
  helplineTab: string;
  cameraHeader: string;
  cameraSubtext: string;
  takePhoto: string;
  uploadPhoto: string;
  retake: string;
  diagnosing: string;
  diagnoseButton: string;
  flipCamera: string;
  flashOn: string;
  flashOff: string;
  audioPlaying: string;
  audioStopped: string;
  listenRemedy: string;
  pauseVoice: string;
  playVoice: string;
  voiceSpeed: string;
  diseaseFound: string;
  healthyCrop: string;
  confidence: string;
  severity: string;
  symptoms: string;
  organicRemedy: string;
  chemicalRemedy: string;
  prevention: string;
  recommendedMedicines: string[];
  findNearbyPesticide: string;
  nearbyStoresHeader: string;
  within10Km: string;
  distanceKm: string;
  callStore: string;
  getDirections: string;
  inStock: string;
  outOfStock: string;
  kisanCallCenter: string;
  tollFreeNumber: string;
  helplineTitle: string;
  helplineDesc: string;
  callKisanHelpline: string;
  offlineMode: string;
  onlineMode: string;
  emergencyDoctor: string;
  selectCropHint: string;
  allCrops: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  hi: {
    appName: 'फसल डॉक्टर',
    tagline: 'किसान भाईयों का सच्चा साथी - AI फसल रोग डॉक्टर',
    selectLanguage: 'भाषा चुनें',
    scanTab: 'फसल जांचें',
    storesTab: 'खाद-दुकानें (10km)',
    historyTab: 'पुरानी जांच',
    helplineTab: 'किसान हेल्पलाइन',
    cameraHeader: 'पत्ते की फोटो लें',
    cameraSubtext: 'खराब या बीमारी वाले पत्ते को फ्रेम के बीच में रखें',
    takePhoto: 'फोटो खींचें',
    uploadPhoto: 'गैलरी से चुनें',
    retake: 'दोबारा फोटो लें',
    diagnosing: 'AI डॉक्टर जांच कर रहा है...',
    diagnoseButton: 'रोग पहचानें और इलाज पाएं',
    flipCamera: 'कैमरा बदलें',
    flashOn: 'फ्लैश ऑन',
    flashOff: 'फ्लैश ऑफ',
    audioPlaying: 'आवाज़ बज रही है...',
    audioStopped: 'इलाज सुनें',
    listenRemedy: '🔊 इलाज की आवाज़ सुनें',
    pauseVoice: 'आवाज़ रोकें',
    playVoice: 'आवाज़ दोबारा चलाएं',
    voiceSpeed: 'गति',
    diseaseFound: 'रोग की पहचान हुई',
    healthyCrop: 'फसल बिल्कुल स्वस्थ है!',
    confidence: 'सटीकता',
    severity: 'गंभीरता',
    symptoms: 'रोग के लक्षण',
    organicRemedy: 'देसी / जैविक नुस्खा',
    chemicalRemedy: 'दवा व छिड़काव मात्रा',
    prevention: 'आगे बचाव के उपाय',
    recommendedMedicines: ['अनुशंसित दवाइयां'],
    findNearbyPesticide: 'दवा नजदीकी खाद दुकान से लें (10km)',
    nearbyStoresHeader: 'नजदीकी खाद व बीज केंद्र',
    within10Km: '10 किमी के दायरे में',
    distanceKm: 'किमी दूर',
    callStore: 'दुकानदार को फोन करें',
    getDirections: 'रास्ता देखें (नक्शा)',
    inStock: 'दवा उपलब्ध है',
    outOfStock: 'स्टॉक खत्म',
    kisanCallCenter: 'किसान कॉल सेंटर',
    tollFreeNumber: '1800-180-1551',
    helplineTitle: 'सरकारी कृषि वैज्ञानिक से बात करें',
    helplineDesc: 'किसी भी गंभीर बीमारी के लिए सुबह 6 से रात 10 बजे तक मुफ्त बात करें।',
    callKisanHelpline: 'कॉल करें (टोल-फ्री)',
    offlineMode: 'ऑफलाइन मोड',
    onlineMode: 'इंटरनेट चालू',
    emergencyDoctor: 'कृषि सहायता',
    selectCropHint: 'फसल का नाम (वैकल्पिक)',
    allCrops: 'सभी फसलें (गेहूं, धान, टमाटर, कपास आदि)',
  },
  pa: {
    appName: 'ਫਸਲ ਡਾਕਟਰ',
    tagline: 'ਕਿਸਾਨ ਵੀਰਾਂ ਦਾ ਭਰੋਸੇਮੰਦ ਸਾਥੀ - AI ਫਸਲ ਰੋਗ ਡਾਕਟਰ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    scanTab: 'ਫਸਲ ਜਾਂਚੋ',
    storesTab: 'ਖਾਦ-ਦੁਕਾਨਾਂ (10km)',
    historyTab: 'ਪੁਰਾਣੀ ਜਾਂਚ',
    helplineTab: 'ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ',
    cameraHeader: 'ਪੱਤੇ ਦੀ ਫੋਟੋ ਲਵੋ',
    cameraSubtext: 'ਬਿਮਾਰੀ ਵਾਲੇ ਪੱਤੇ ਨੂੰ ਕੈਮਰੇ ਦੇ ਫਰੇਮ ਵਿੱਚ ਸਿੱਧਾ ਰੱਖੋ',
    takePhoto: 'ਫੋਟੋ ਖਿੱਚੋ',
    uploadPhoto: 'ਗੈਲਰੀ ਵਿੱਚੋਂ ਚੁਣੋ',
    retake: 'ਦੁਬਾਰਾ ਫੋਟੋ ਲਵੋ',
    diagnosing: 'AI ਡਾਕਟਰ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹੈ...',
    diagnoseButton: 'ਬਿਮਾਰੀ ਪਛਾਣੋ ਅਤੇ ਇਲਾਜ ਪਾਓ',
    flipCamera: 'ਕੈਮਰਾ ਬਦਲੋ',
    flashOn: 'ਫਲੈਸ਼ ਚਾਲੂ',
    flashOff: 'ਫਲੈਸ਼ ਬੰਦ',
    audioPlaying: 'ਆਵਾਜ਼ ਚੱਲ ਰਹੀ ਹੈ...',
    audioStopped: 'ਇਲਾਜ ਸੁਣੋ',
    listenRemedy: '🔊 ਇਲਾਜ ਦੀ ਆਵਾਜ਼ ਸੁਣੋ',
    pauseVoice: 'ਆਵਾਜ਼ ਰੋਕੋ',
    playVoice: 'ਆਵਾਜ਼ ਮੁੜ ਚਲਾਓ',
    voiceSpeed: 'ਸਪੀਡ',
    diseaseFound: 'ਬਿਮਾਰੀ ਦੀ ਸ਼ਨਾਖਤ ਹੋਈ',
    healthyCrop: 'ਫਸਲ ਬਿਲਕੁਲ ਤੰਦਰੁਸਤ ਹੈ!',
    confidence: 'ਸਹੀ ਹੋਣ ਦਾ ਅੰਦਾਜ਼ਾ',
    severity: 'ਗੰਭੀਰਤਾ',
    symptoms: 'ਬਿਮਾਰੀ ਦੇ ਲੱਛਣ',
    organicRemedy: 'ਦੇਸੀ / ਜੈਵਿਕ ਨੁਸਖ਼ਾ',
    chemicalRemedy: 'ਦਵਾਈ ਅਤੇ ਛਿੜਕਾਅ ਮਾਤਰਾ',
    prevention: 'ਅੱਗੇ ਤੋਂ ਬਚਾਅ ਦੇ ਤਰੀਕੇ',
    recommendedMedicines: ['ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਦਵਾਈਆਂ'],
    findNearbyPesticide: 'ਨੇੜਲੀ ਦੁਕਾਨ ਤੋਂ ਦਵਾਈ ਪ੍ਰਾਪਤ ਕਰੋ (10km)',
    nearbyStoresHeader: 'ਨੇੜਲੇ ਖਾਦ ਅਤੇ ਕੀਟਨਾਸ਼ਕ ਸਟੋਰ',
    within10Km: '10 ਕਿਲੋਮੀਟਰ ਦੇ ਘੇਰੇ ਵਿੱਚ',
    distanceKm: 'ਕਿਲੋਮੀਟਰ ਦੂਰ',
    callStore: 'ਦੁਕਾਨਦਾਰ ਨੂੰ ਫ਼ੋਨ ਕਰੋ',
    getDirections: 'ਨਕਸ਼ਾ ਦੇਖੋ (ਰਸਤਾ)',
    inStock: 'ਦਵਾਈ ਉਪਲਬਧ ਹੈ',
    outOfStock: 'ਸਟਾਕ ਖਤਮ',
    kisanCallCenter: 'ਕਿਸਾਨ ਕਾਲ ਸੈਂਟਰ',
    tollFreeNumber: '1800-180-1551',
    helplineTitle: 'ਸਰਕਾਰੀ ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨੀ ਨਾਲ ਗੱਲ ਕਰੋ',
    helplineDesc: 'ਕਿਸੇ ਵੀ ਗੰਭੀਰ ਸਮੱਸਿਆ ਲਈ ਮੁਫਤ ਹੈਲਪਲਾਈਨ ਤੇ ਗੱਲ ਕਰੋ।',
    callKisanHelpline: 'ਕਾਲ ਕਰੋ (ਮੁਫਤ)',
    offlineMode: 'ਆਫਲਾਈਨ ਮੋਡ',
    onlineMode: 'ਇੰਟਰਨੈੱਟ ਚਾਲੂ',
    emergencyDoctor: 'ਖੇਤੀ ਸਹਾਇਤਾ',
    selectCropHint: 'ਫਸਲ ਦੀ ਕਿਸਮ (ਵਿਕਲਪੀ)',
    allCrops: 'ਸਾਰੀਆਂ ਫਸਲਾਂ (ਕਣਕ, ਝੋਨਾ, ਨਰਮਾ, ਟਮਾਟਰ ਆਦਿ)',
  },
  en: {
    appName: 'Fasal Doctor',
    tagline: 'AI Crop Health Doctor & Instant Voice Remedies for Indian Farmers',
    selectLanguage: 'Language',
    scanTab: 'Scan Crop',
    storesTab: 'Agri Stores (10km)',
    historyTab: 'Scan History',
    helplineTab: 'Farmer Helpline',
    cameraHeader: 'Capture Crop Leaf Photo',
    cameraSubtext: 'Position diseased leaf inside the viewfinder frame',
    takePhoto: 'Snap Photo',
    uploadPhoto: 'Choose from Gallery',
    retake: 'Retake Photo',
    diagnosing: 'AI Agronomist Diagnosing...',
    diagnoseButton: 'Identify Disease & Remedies',
    flipCamera: 'Switch Camera',
    flashOn: 'Flash On',
    flashOff: 'Flash Off',
    audioPlaying: 'Audio Playing...',
    audioStopped: 'Listen Remedy',
    listenRemedy: '🔊 Listen to Doctor Voice Remedy',
    pauseVoice: 'Pause Voice',
    playVoice: 'Play Voice',
    voiceSpeed: 'Speed',
    diseaseFound: 'Crop Disease Diagnosed',
    healthyCrop: 'Crop is completely healthy!',
    confidence: 'Confidence',
    severity: 'Severity',
    symptoms: 'Observed Symptoms',
    organicRemedy: 'Organic / Bio Remedy (Desi Nuskha)',
    chemicalRemedy: 'Chemical Remedy & Exact Dosage',
    prevention: 'Future Prevention Advice',
    recommendedMedicines: ['Recommended Products'],
    findNearbyPesticide: 'Locate In-Stock Stores (10km)',
    nearbyStoresHeader: 'Nearby Fertilizer & Agri Stores',
    within10Km: 'Within 10 km Radius',
    distanceKm: 'km away',
    callStore: 'Call Store',
    getDirections: 'Get Directions',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    kisanCallCenter: 'Kisan Call Center',
    tollFreeNumber: '1800-180-1551',
    helplineTitle: 'Talk to Government Agri Scientists',
    helplineDesc: 'Toll-free agricultural guidance available 6 AM to 10 PM daily.',
    callKisanHelpline: 'Call Toll-Free',
    offlineMode: 'Offline Mode',
    onlineMode: 'Connected',
    emergencyDoctor: 'Agri Support',
    selectCropHint: 'Crop Hint (Optional)',
    allCrops: 'All Crops (Wheat, Rice, Tomato, Cotton, etc.)',
  },
};
