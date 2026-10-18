'use client';

import React, { useState, useEffect } from 'react';
import { SupportedLanguage, DiagnosisData, AgriStoreItem } from '../types';
import { translations } from '../lib/translations';
import { Header } from '../components/Header';
import { CameraCapture } from '../components/CameraCapture';
import { DiagnosisResultCard } from '../components/DiagnosisResultCard';
import { StoreMap } from '../components/StoreMap';
import { BottomNav, NavTab } from '../components/BottomNav';
import { AudioVoicePlayer } from '../components/AudioVoicePlayer';
import { scanCropApi, fetchNearbyStores } from '../lib/api';
import {
  PhoneCall,
  History,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Calendar,
} from 'lucide-react';

interface ScanHistoryItem {
  id: string;
  cropType: string;
  diseaseName: string;
  confidence: number;
  date: string;
  diagnosis: DiagnosisData;
}

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('hi');
  const [activeTab, setActiveTab] = useState<NavTab>('scan');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisData | null>(null);
  const [stores, setStores] = useState<AgriStoreItem[]>([]);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  // Default coordinate: Karnal, Haryana (hub of Agricultural Wheat & Rice Research)
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 29.6857,
    longitude: 76.9905,
  });

  const t = translations[currentLang];

  // Detect online status & load stored preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      const savedLang = localStorage.getItem('fasal_lang') as SupportedLanguage;
      if (savedLang && ['hi', 'pa', 'en'].includes(savedLang)) {
        setCurrentLang(savedLang);
      }

      const savedHistory = localStorage.getItem('fasal_history');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.warn('Failed to parse history');
        }
      }

      // Fetch user real GPS location if permission granted
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          (err) => {
            console.log('GPS fallback used:', err.message);
          },
          { timeout: 8000 }
        );
      }

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Fetch nearby stores whenever location changes or stores tab is opened
  useEffect(() => {
    let isMounted = true;
    const loadStores = async () => {
      try {
        const data = await fetchNearbyStores(userLocation.latitude, userLocation.longitude, 10);
        if (isMounted) setStores(data);
      } catch (e) {
        console.warn('Error loading stores');
      }
    };
    loadStores();
    return () => {
      isMounted = false;
    };
  }, [userLocation]);

  // Handle language switch
  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fasal_lang', lang);
    }
  };

  // Refresh GPS
  const handleRefreshLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        },
        { timeout: 5000 }
      );
    }
  };

  // Perform Crop Leaf Diagnosis
  const handleCropCapture = async (fileOrBase64: File | string, cropHint?: string) => {
    setIsLoading(true);
    try {
      const result = await scanCropApi(fileOrBase64, cropHint, {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      });
      setCurrentDiagnosis(result);

      // Save to history
      const historyItem: ScanHistoryItem = {
        id: `scan-${Date.now()}`,
        cropType: result.cropType,
        diseaseName: result.localNames[currentLang] || result.englishName,
        confidence: result.confidence,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        diagnosis: result,
      };

      const updatedHistory = [historyItem, ...history.slice(0, 9)];
      setHistory(updatedHistory);
      if (typeof window !== 'undefined') {
        localStorage.setItem('fasal_history', JSON.stringify(updatedHistory));
      }
    } catch (err: any) {
      alert('Error during diagnosis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-kisan-surface">
      {/* Sticky Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isOnline={isOnline}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* TAB 1: SCAN CROP (Primary Flow) */}
        {activeTab === 'scan' && (
          <div className="space-y-6">
            {/* Top Quick Status Banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white rounded-3xl p-5 shadow-lg border-2 border-emerald-500 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  🌱 100% नि:शुल्क AI डॉक्टर
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  {t.cameraHeader}
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  {t.cameraSubtext}
                </p>
              </div>
              <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-emerald-700/60 border-2 border-emerald-400 items-center justify-center text-3xl">
                🌾
              </div>
            </div>

            {/* Camera Viewfinder & Snap Component */}
            <CameraCapture
              onCapture={handleCropCapture}
              lang={currentLang}
              isLoading={isLoading}
            />

            {/* Diagnosis Result Card (Renders when diagnosis is ready) */}
            {currentDiagnosis && (
              <div id="diagnosis-result-section" className="pt-2 animate-fadeIn">
                <DiagnosisResultCard
                  diagnosis={currentDiagnosis}
                  lang={currentLang}
                  onViewStores={() => setActiveTab('stores')}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AGRI STORES (10km Leaflet Map & Contacts) */}
        {activeTab === 'stores' && (
          <div className="space-y-6">
            <StoreMap
              stores={stores}
              userLocation={userLocation}
              lang={currentLang}
              isLoading={isLoading}
              onRefreshLocation={handleRefreshLocation}
            />
          </div>
        )}

        {/* TAB 3: SCAN HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="bg-emerald-900 text-white p-5 rounded-3xl border-3 border-emerald-500 shadow-md">
              <div className="flex items-center gap-2">
                <History className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl sm:text-2xl font-black">{t.historyTab}</h2>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                {currentLang === 'hi'
                  ? 'आपके द्वारा पहले की गई सभी फसलों की जांच'
                  : currentLang === 'pa'
                  ? 'ਤੁਹਾਡੇ ਦੁਆਰਾ ਪਹਿਲਾਂ ਕੀਤੀਆਂ ਸਾਰੀਆਂ ਫਸਲਾਂ ਦੀ ਜਾਂਚ'
                  : 'All previously scanned crop reports'}
              </p>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-emerald-200 p-6 shadow-sm">
                <span className="text-5xl">📋</span>
                <h3 className="text-lg font-black text-emerald-950 mt-3">
                  {currentLang === 'hi' ? 'कोई पुरानी जांच नहीं मिली' : currentLang === 'pa' ? 'ਕੋਈ ਪੁਰਾਣੀ ਜਾਂਚ ਨਹੀਂ ਮਿਲੀ' : 'No previous scans found'}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  {currentLang === 'hi' ? 'कैमरा से पत्ते की फोटो खींचकर पहली जांच करें' : 'Scan a leaf to see your first diagnosis'}
                </p>
                <button
                  onClick={() => setActiveTab('scan')}
                  className="mt-4 px-6 py-3 rounded-xl bg-emerald-600 text-white font-black text-sm shadow-touch active:translate-y-1"
                >
                  {t.scanTab}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-emerald-200 shadow-md flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                          {item.cropType}
                        </span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.date}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-emerald-950">
                        {item.diseaseName}
                      </h4>
                      <p className="text-xs text-emerald-700 font-bold">
                        {t.confidence}: {item.confidence}%
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentDiagnosis(item.diagnosis);
                        setActiveTab('scan');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-sm active:scale-95"
                    >
                      {currentLang === 'hi' ? 'रिपोर्ट देखें' : currentLang === 'pa' ? 'ਰਿਪੋਰਟ ਦੇਖੋ' : 'View Report'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FARMER HELPLINE */}
        {activeTab === 'helpline' && (
          <div className="space-y-4">
            <div className="bg-emerald-900 text-white p-5 rounded-3xl border-3 border-emerald-500 shadow-md">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl sm:text-2xl font-black">{t.helplineTab}</h2>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1">
                {t.helplineDesc}
              </p>
            </div>

            {/* National Kisan Call Center Card */}
            <div className="p-6 rounded-3xl bg-white border-3 border-emerald-300 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center flex-shrink-0 font-black text-2xl">
                  📞
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-emerald-950">
                    {t.kisanCallCenter}
                  </h3>
                  <p className="text-xs text-zinc-600 font-semibold">
                    भारत सरकार कृषि एवं किसान कल्याण मंत्रालय
                  </p>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-center space-y-1">
                <span className="text-xs font-bold text-emerald-800">
                  टोल-फ्री नंबर (नि:शुल्क फोन करें):
                </span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-900 tracking-wider">
                  {t.tollFreeNumber}
                </p>
              </div>

              <a
                href={`tel:${t.tollFreeNumber.replace(/-/g, '')}`}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg shadow-touch active:translate-y-1 transition-all flex items-center justify-center gap-2 border-2 border-emerald-400"
              >
                <PhoneCall className="w-6 h-6 fill-current" />
                <span>{t.callKisanHelpline} ({t.tollFreeNumber})</span>
              </a>
            </div>

            {/* Emergency Contacts */}
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2 text-xs sm:text-sm font-semibold text-zinc-700">
              <h4 className="font-black text-emerald-950 text-base mb-1">
                प्रमुख कृषि विश्वविद्यालय एवं हेल्पलाइन:
              </h4>
              <div className="p-2.5 bg-zinc-50 rounded-xl flex items-center justify-between">
                <span>पंजाब कृषि विश्वविद्यालय (PAU Ludhiana):</span>
                <a href="tel:01612401960" className="font-bold text-emerald-700">0161-2401960</a>
              </div>
              <div className="p-2.5 bg-zinc-50 rounded-xl flex items-center justify-between">
                <span>चौधरी चरण सिंह हरियाणा कृषि वि.वि. (HAU Hisar):</span>
                <a href="tel:01662255000" className="font-bold text-emerald-700">01662-255000</a>
              </div>
              <div className="p-2.5 bg-zinc-50 rounded-xl flex items-center justify-between">
                <span>भारतीय कृषि अनुसंधान संस्थान (IARI Pusa Delhi):</span>
                <a href="tel:01125841490" className="font-bold text-emerald-700">011-25841490</a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* High-Contrast Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        lang={currentLang}
      />
    </div>
  );
}
