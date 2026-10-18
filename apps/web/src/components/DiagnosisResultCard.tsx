'use client';

import React, { useState } from 'react';
import { DiagnosisData, SupportedLanguage } from '../types';
import { translations } from '../lib/translations';
import { AudioVoicePlayer } from './AudioVoicePlayer';
import {
  ShieldAlert,
  Sprout,
  FlaskConical,
  CheckCircle,
  MapPin,
  HelpCircle,
  Leaf,
  Sparkles,
} from 'lucide-react';

interface DiagnosisResultCardProps {
  diagnosis: DiagnosisData;
  lang: SupportedLanguage;
  onViewStores: () => void;
}

export const DiagnosisResultCard: React.FC<DiagnosisResultCardProps> = ({
  diagnosis,
  lang,
  onViewStores,
}) => {
  const t = translations[lang];
  const [activeRemedyTab, setActiveRemedyTab] = useState<'organic' | 'chemical'>('organic');

  // Severity indicator color
  const getSeverityBadge = () => {
    switch (diagnosis.severity) {
      case 'CRITICAL':
      case 'HIGH':
        return {
          bg: 'bg-red-600 text-white border-red-700',
          label: lang === 'hi' ? 'तुरंत इलाज आवश्यक' : lang === 'pa' ? 'ਤੁਰੰਤ ਇਲਾਜ ਜ਼ਰੂਰੀ' : 'High Urgency',
          icon: '🔴',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500 text-amber-950 border-amber-600',
          label: lang === 'hi' ? 'मध्यम जोखिम' : lang === 'pa' ? 'ਦਰਮਿਆਨਾ ਜੋਖ਼ਮ' : 'Medium Urgency',
          icon: '🟡',
        };
      default:
        return {
          bg: 'bg-emerald-600 text-white border-emerald-700',
          label: lang === 'hi' ? 'सामान्य / स्वस्थ' : lang === 'pa' ? 'ਆਮ / ਤੰਦਰੁਸਤ' : 'Low Urgency',
          icon: '🟢',
        };
    }
  };

  const severityBadge = getSeverityBadge();

  // Localized disease name
  const diseaseTitle =
    lang === 'hi'
      ? diagnosis.localNames.hi
      : lang === 'pa'
      ? diagnosis.localNames.pa
      : diagnosis.englishName;

  // Spoken script for the audio player
  const voiceScript =
    diagnosis.doctorAudioScript?.[lang] ||
    `${diseaseTitle}. ${diagnosis.remedies.chemical[lang] || diagnosis.remedies.organic[lang]}`;

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl border-4 border-emerald-600/30 overflow-hidden space-y-4">
      {/* Top Banner: Diagnosis Result & Urgency */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-5 sm:p-6 border-b-4 border-amber-400">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-800 text-emerald-200 border border-emerald-600">
              {diagnosis.cropType} Crop
            </span>
            <div className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${severityBadge.bg}`}>
              <span>{severityBadge.icon}</span>
              <span>{severityBadge.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full text-xs font-bold text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.confidence}: {diagnosis.confidence}%</span>
          </div>
        </div>

        {/* Big Disease Name (High-Contrast Devanagari/Gurmukhi/English) */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          {diseaseTitle}
        </h2>
        <p className="text-sm font-semibold text-emerald-300 mt-1">
          {diagnosis.englishName} ({diagnosis.diseaseCode})
        </p>
      </div>

      {/* Embedded Auto-Playing Voice Player */}
      <div className="px-4 sm:px-6">
        <AudioVoicePlayer
          textToSpeak={voiceScript}
          lang={lang}
          autoPlay={true}
        />
      </div>

      {/* Symptoms List */}
      <div className="px-4 sm:px-6">
        <div className="bg-amber-50/80 rounded-2xl p-4 border-2 border-amber-200">
          <h3 className="text-sm sm:text-base font-black text-amber-950 flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-amber-700" />
            <span>{t.symptoms}</span>
          </h3>
          <ul className="space-y-1.5">
            {(diagnosis.symptoms[lang] || diagnosis.symptoms.en).map((sym, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-950 font-bold leading-relaxed">
                <span className="text-amber-600 font-black">•</span>
                <span>{sym}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Remedy Tabs (Organic vs Chemical) */}
      <div className="px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-emerald-100/70 rounded-2xl border border-emerald-300">
          <button
            type="button"
            onClick={() => setActiveRemedyTab('organic')}
            className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              activeRemedyTab === 'organic'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-300" />
            <span>🌿 {t.organicRemedy}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRemedyTab('chemical')}
            className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              activeRemedyTab === 'chemical'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'text-emerald-900 hover:bg-emerald-200/60'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-amber-300" />
            <span>🧪 {t.chemicalRemedy}</span>
          </button>
        </div>

        {/* Remedy Content Box */}
        <div className="mt-3 p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
          {activeRemedyTab === 'organic' ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm sm:text-base">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span>देसी जैविक नुस्खा (Organic Solution):</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-emerald-900 leading-relaxed bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
                {diagnosis.remedies.organic[lang] || diagnosis.remedies.organic.en}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-sm sm:text-base">
                <FlaskConical className="w-5 h-5 text-amber-600" />
                <span>दवा नाम व सटीक छिड़काव मात्रा (Dosage & Spray):</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-zinc-900 leading-relaxed bg-white p-3.5 rounded-xl border border-emerald-200 shadow-sm">
                {diagnosis.remedies.chemical[lang] || diagnosis.remedies.chemical.en}
              </p>

              {/* Recommended Medicines Pills */}
              {diagnosis.recommendedProducts && diagnosis.recommendedProducts.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs font-black text-emerald-950 block mb-1.5">
                    बाजार में मिलने वाली दवाइयां:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {diagnosis.recommendedProducts.map((prod, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-emerald-200 text-emerald-950 rounded-lg text-xs font-black border border-emerald-400"
                      >
                        ✓ {prod}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Prevention Advice */}
      <div className="px-4 sm:px-6">
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
          <h4 className="text-xs sm:text-sm font-black text-zinc-800 flex items-center gap-1.5 mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{t.prevention}</span>
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-zinc-600 leading-relaxed">
            {diagnosis.prevention[lang] || diagnosis.prevention.en}
          </p>
        </div>
      </div>

      {/* Big Action: Find Nearby Agri Stores in 10 km */}
      <div className="p-4 sm:p-6 bg-zinc-100 border-t-2 border-zinc-200">
        <button
          type="button"
          onClick={onViewStores}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-emerald-950 font-black text-base sm:text-lg shadow-touch active:translate-y-1 transition-all flex items-center justify-center gap-3 border-2 border-amber-300"
        >
          <MapPin className="w-6 h-6 text-emerald-950 fill-current" />
          <span>{t.findNearbyPesticide}</span>
        </button>
      </div>
    </div>
  );
};
