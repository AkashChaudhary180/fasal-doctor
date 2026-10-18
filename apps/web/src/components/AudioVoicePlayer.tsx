'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../lib/translations';
import { VoiceEngine } from '../lib/speech';
import { Volume2, VolumeX, RotateCcw, FastForward, Play, Pause } from 'lucide-react';

interface AudioVoicePlayerProps {
  textToSpeak: string;
  lang: SupportedLanguage;
  audioBase64?: string;
  autoPlay?: boolean;
}

export const AudioVoicePlayer: React.FC<AudioVoicePlayerProps> = ({
  textToSpeak,
  lang,
  audioBase64,
  autoPlay = true,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const t = translations[lang];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger speech
  const handlePlay = () => {
    setIsPlaying(true);
    VoiceEngine.speakRemedy(
      textToSpeak,
      lang,
      audioBase64,
      () => setIsPlaying(true),
      () => setIsPlaying(false),
      speechRate
    );
  };

  const handleStop = () => {
    VoiceEngine.stop();
    setIsPlaying(false);
  };

  const handleToggle = () => {
    if (isPlaying) {
      handleStop();
    } else {
      handlePlay();
    }
  };

  const cycleSpeed = () => {
    const nextRate = speechRate === 0.95 ? 1.2 : speechRate === 1.2 ? 0.8 : 0.95;
    setSpeechRate(nextRate);
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        handlePlay();
      }, 100);
    }
  };

  // Auto-play on mount or when diagnosis text changes
  useEffect(() => {
    if (autoPlay && textToSpeak) {
      const timer = setTimeout(() => {
        handlePlay();
      }, 500);
      return () => {
        clearTimeout(timer);
        VoiceEngine.stop();
      };
    }
    return () => {
      VoiceEngine.stop();
    };
  }, [textToSpeak, lang, audioBase64]);

  return (
    <div
      className={`relative w-full rounded-2xl p-4 md:p-5 transition-all duration-300 border-3 shadow-lg ${
        isPlaying
          ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 border-amber-400 text-white ring-4 ring-amber-400/30'
          : 'bg-emerald-950 border-emerald-600 text-white'
      }`}
    >
      {/* Speaking Glow Animation */}
      {isPlaying && (
        <span className="absolute -top-3 -right-2 px-3 py-1 bg-amber-400 text-emerald-950 text-xs font-black rounded-full shadow-md animate-bounce">
          {t.audioPlaying}
        </span>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Speaker Status & Visual Waveform */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform ${
              isPlaying
                ? 'bg-amber-400 text-emerald-950 scale-105 shadow-md shadow-amber-400/50'
                : 'bg-emerald-800 text-emerald-200'
            }`}
          >
            {isPlaying ? (
              <Volume2 className="w-8 h-8 animate-pulse" />
            ) : (
              <VolumeX className="w-8 h-8" />
            )}
          </div>

          <div className="flex-1">
            <h4 className="text-base sm:text-lg font-black tracking-tight leading-tight flex items-center gap-2">
              {isPlaying ? t.audioPlaying : t.listenRemedy}
            </h4>
            <p className="text-xs text-emerald-300 font-medium">
              {lang === 'hi'
                ? 'डॉक्टर की सलाह ध्यान से सुनें'
                : lang === 'pa'
                ? 'ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਧਿਆਨ ਨਾਲ ਸੁਣੋ'
                : 'Listen to spoken diagnostic advice'}
            </p>

            {/* Pulsing Animated Waveform Bars */}
            {isPlaying && (
              <div className="flex items-center gap-1.5 mt-2 h-4">
                {[60, 100, 45, 80, 95, 30, 75, 50, 90].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: `${h}%`,
                      animationDuration: `${0.4 + (i % 4) * 0.2}s`,
                    }}
                    className="w-1.5 bg-amber-300 rounded-full animate-pulse"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Big Touch Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            type="button"
            className="px-3 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-xs font-bold text-white border border-emerald-500 flex items-center gap-1 transition-all active:scale-95"
            title="Adjust Speech Speed"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>{speechRate}x</span>
          </button>

          {/* Replay Button */}
          <button
            onClick={handlePlay}
            type="button"
            className="p-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-500 transition-all active:scale-95"
            title="Replay Audio"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Main Play / Pause Large Button */}
          <button
            onClick={handleToggle}
            type="button"
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-black text-base shadow-touch active:translate-y-1 transition-all ${
              isPlaying
                ? 'bg-amber-400 hover:bg-amber-300 text-emerald-950 border-2 border-amber-300'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white border-2 border-emerald-400'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-6 h-6 fill-current" />
                <span>{t.pauseVoice}</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-current" />
                <span>{t.playVoice}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
