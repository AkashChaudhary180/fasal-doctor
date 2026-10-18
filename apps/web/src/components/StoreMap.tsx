'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AgriStoreItem, SupportedLanguage } from '../types';
import { translations } from '../lib/translations';
import {
  MapPin,
  Phone,
  Navigation,
  CheckCircle2,
  XCircle,
  Star,
  RefreshCw,
  LocateFixed,
  ShieldCheck,
} from 'lucide-react';

interface StoreMapProps {
  stores: AgriStoreItem[];
  userLocation: { latitude: number; longitude: number };
  lang: SupportedLanguage;
  isLoading: boolean;
  onRefreshLocation: () => void;
}

export const StoreMap: React.FC<StoreMapProps> = ({
  stores,
  userLocation,
  lang,
  isLoading,
  onRefreshLocation,
}) => {
  const t = translations[lang];
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // Initialize and Update Leaflet Map on Client
  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      // Fix default Leaflet icon paths in Next.js bundler
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Tear down existing map instance if any
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      if (!isMounted || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current).setView(
        [userLocation.latitude, userLocation.longitude],
        12
      );

      // OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // 10 km Radius Circle around Farmer
      L.circle([userLocation.latitude, userLocation.longitude], {
        color: '#16a34a',
        fillColor: '#22c55e',
        fillOpacity: 0.1,
        radius: 10000, // 10,000 meters = 10 km
      }).addTo(map);

      // Farmer Current Location Custom Pulsing Marker
      const farmerIcon = L.divIcon({
        className: 'custom-farmer-pin',
        html: `<div style="background-color:#0284c7; width:22px; height:22px; border-radius:50%; border:3px solid white; box-shadow:0 0 10px rgba(0,0,0,0.5);"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      L.marker([userLocation.latitude, userLocation.longitude], {
        icon: farmerIcon,
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-weight:bold; font-size:13px; color:#0e2d1d;">📍 आपका स्थान (Your Field)</div>`
        );

      // Add Agri Store Markers
      stores.forEach((store) => {
        const storeIcon = L.divIcon({
          className: 'custom-store-pin',
          html: `<div style="background-color:#16a34a; color:white; font-size:14px; font-weight:bold; padding:4px 8px; border-radius:12px; border:2px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.4); display:flex; align-items:center; gap:4px;">
            🌾 <span>${store.distanceKm}km</span>
          </div>`,
          iconSize: [70, 30],
          iconAnchor: [35, 15],
        });

        const marker = L.marker([store.latitude, store.longitude], {
          icon: storeIcon,
        }).addTo(map);

        marker.on('click', () => {
          setSelectedStoreId(store.id);
        });

        marker.bindPopup(`
          <div style="font-family:sans-serif; min-width:180px;">
            <div style="font-weight:bold; font-size:14px; color:#14532d; margin-bottom:4px;">${store.name}</div>
            <div style="font-size:12px; color:#555; margin-bottom:4px;">📍 ${store.address}</div>
            <div style="font-size:12px; color:#16a34a; font-weight:bold; margin-bottom:6px;">🚗 ${store.distanceKm} km away</div>
            <a href="tel:${store.phone}" style="display:inline-block; background:#16a34a; color:white; text-decoration:none; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:bold;">📞 Call Store</a>
          </div>
        `);
      });

      leafletMapRef.current = map;
    };

    initMap();

    return () => {
      isMounted = false;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [userLocation, stores]);

  return (
    <div className="w-full space-y-4">
      {/* Map Header & Filter */}
      <div className="bg-emerald-900 text-white p-4 sm:p-5 rounded-3xl border-3 border-emerald-500 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {t.nearbyStoresHeader}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-emerald-200 font-semibold mt-0.5">
            {t.within10Km} ({stores.length} {lang === 'hi' ? 'दुकानें उपलब्ध' : lang === 'pa' ? 'ਸਟੋਰ ਉਪਲਬਧ' : 'stores available'})
          </p>
        </div>

        <button
          type="button"
          onClick={onRefreshLocation}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 border border-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <LocateFixed className="w-4 h-4 text-amber-300" />
          <span>{lang === 'hi' ? 'जीपीएस रिफ्रेश करें' : lang === 'pa' ? 'ਜੀਪੀਐਸ ਰਿਫ੍ਰੈਸ਼ ਕਰੋ' : 'Refresh GPS'}</span>
        </button>
      </div>

      {/* Leaflet Interactive Map Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-4 border-emerald-600/30 shadow-xl bg-emerald-50 z-10">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* 10km Radius Legend Pill */}
        <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-emerald-950 border-2 border-emerald-500 shadow-md flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white" />
          <span>10 km {lang === 'hi' ? 'दूरी का दायरा' : lang === 'pa' ? 'ਘੇਰਾ' : 'Coverage Radius'}</span>
        </div>
      </div>

      {/* Stores List Cards */}
      <div className="space-y-3">
        <h3 className="text-lg font-black text-emerald-950 px-1 flex items-center gap-2">
          <span>🏪</span>
          <span>
            {lang === 'hi' ? 'नजदीकी दुकानें (फोन व स्टॉक)' : lang === 'pa' ? 'ਨੇੜਲੀਆਂ ਦੁਕਾਨਾਂ (ਫ਼ੋਨ ਅਤੇ ਸਟਾਕ)' : 'Store Contact & Live Stock'}
          </span>
        </h3>

        {stores.map((store) => {
          const isSelected = selectedStoreId === store.id;
          const mapDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;

          return (
            <div
              key={store.id}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all shadow-md bg-white ${
                isSelected
                  ? 'border-emerald-600 ring-4 ring-emerald-400/30 bg-emerald-50/50'
                  : 'border-emerald-200 hover:border-emerald-400'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Store Name & Distance */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-black text-emerald-950">
                      {store.name}
                    </h4>
                    {store.verifiedKisanKendra && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-black flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>सरकारी मान्य</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-600 font-medium">
                    📍 {store.address}, {store.district}
                  </p>

                  <div className="flex items-center gap-3 text-xs font-bold text-zinc-700 pt-1">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-black">
                      {store.distanceKm} {t.distanceKm}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {store.rating}
                    </span>
                    <span className="text-zinc-500 font-normal">
                      🕒 {store.openingHours}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons: Call Store + Get Directions */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0">
                  {/* Phone Call Button */}
                  <a
                    href={`tel:${store.phone}`}
                    className="flex-1 sm:flex-initial py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-touch active:translate-y-1 transition-all"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>{t.callStore}</span>
                  </a>

                  {/* Directions Button */}
                  <a
                    href={mapDirectionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-zinc-600 active:scale-95 transition-all"
                  >
                    <Navigation className="w-4 h-4 text-amber-400" />
                    <span>{t.getDirections}</span>
                  </a>
                </div>
              </div>

              {/* Stock Items Pills */}
              {store.availableStock && store.availableStock.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-emerald-100">
                  <span className="text-[11px] font-black text-emerald-900 block mb-1.5">
                    दुकान में उपलब्ध दवा व खाद:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {store.availableStock.map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${
                          item.inStock
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through'
                        }`}
                      >
                        {item.inStock ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                        )}
                        <span>{item.itemName}</span>
                        {item.priceEstimate && (
                          <span className="text-emerald-700 font-black">
                            ({item.priceEstimate})
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
