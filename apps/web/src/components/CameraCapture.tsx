'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../lib/translations';
import {
  Camera,
  RefreshCw,
  Image as ImageIcon,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageFileOrBase64: File | string, cropHint?: string) => void;
  lang: SupportedLanguage;
  isLoading: boolean;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  lang,
  isLoading,
}) => {
  const t = translations[lang];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('Wheat');

  // Start Camera Stream
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } else {
        setCameraError('Camera access not supported on this device/browser.');
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err.message);
      setCameraError('Please allow camera permission or choose a photo from gallery.');
    }
  };

  useEffect(() => {
    if (!capturedImage) {
      startCamera(facingMode);
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode, capturedImage]);

  // Flip Camera
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture Snapshot from Video Stream
  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);

        // Stop stream while reviewing
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
      }
    }
  };

  // Retake
  const handleRetake = () => {
    setCapturedImage(null);
    startCamera(facingMode);
  };

  // Upload from Gallery
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCapturedImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset demo samples for immediate testing
  const handlePresetSample = (crop: string, disease: string) => {
    // Generate a stylized leaf simulation canvas pattern
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Leaf gradient background
      const grad = ctx.createLinearGradient(0, 0, 600, 600);
      grad.addColorStop(0, '#15803d');
      grad.addColorStop(0.5, '#4ade80');
      grad.addColorStop(1, '#ca8a04');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 600);

      // Draw leaf vein pattern
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(300, 550);
      ctx.quadraticCurveTo(280, 300, 300, 50);
      ctx.stroke();

      // Draw simulated disease pustules/rust spots
      ctx.fillStyle = '#eab308';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        const rx = 150 + Math.random() * 300;
        const ry = 100 + Math.random() * 400;
        ctx.arc(rx, ry, 6 + Math.random() * 12, 0, Math.PI * 2);
        ctx.fill();
      }

      const sampleDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedCrop(crop);
      setCapturedImage(sampleDataUrl);
      onCapture(sampleDataUrl, crop);
    }
  };

  // Submit for Diagnosis
  const handleDiagnose = () => {
    if (capturedImage) {
      onCapture(capturedImage, selectedCrop);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border-3 border-emerald-600/30 overflow-hidden">
      {/* Crop Selector Quick Pill Bar */}
      <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-200 flex items-center justify-between flex-wrap gap-2">
        <label className="text-xs sm:text-sm font-black text-emerald-900 flex items-center gap-1.5">
          <span>🌾 {t.selectCropHint}:</span>
        </label>
        <div className="flex items-center gap-1.5 flex-wrap">
          {['Wheat', 'Rice', 'Tomato', 'Cotton', 'Mustard'].map((crop) => (
            <button
              key={crop}
              type="button"
              onClick={() => setSelectedCrop(crop)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                selectedCrop === crop
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                  : 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              {crop === 'Wheat'
                ? '🌾 गेहूं (Wheat)'
                : crop === 'Rice'
                ? '🌾 धान (Rice)'
                : crop === 'Tomato'
                ? '🍅 टमाटर (Tomato)'
                : crop === 'Cotton'
                ? '☁️ कपास (Cotton)'
                : '🌼 सरसों (Mustard)'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewfinder / Camera Screen */}
      <div className="relative w-full aspect-[4/3] bg-zinc-950 flex items-center justify-center overflow-hidden">
        {capturedImage ? (
          // Frozen Image Preview
          <img
            src={capturedImage}
            alt="Captured Crop Leaf"
            className="w-full h-full object-cover"
          />
        ) : (
          // Live Video Feed
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Viewfinder Overlay with Corner Targeting Brackets */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-6">
              {/* Top Hint Banner */}
              <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs sm:text-sm font-bold shadow-lg text-center flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                {t.cameraSubtext}
              </div>

              {/* Center Target Box */}
              <div className="relative w-64 sm:w-72 h-64 sm:h-72 border-2 border-emerald-400/80 rounded-3xl shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center">
                {/* Visual Corner Markers */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-xl" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-xl" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-xl" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-xl" />

                {/* Animated Scanning Beam Line */}
                <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#4ade80] animate-[pulse_2s_infinite]" />

                {/* Leaf Framing Guide Silhouette */}
                <div className="opacity-40 text-emerald-200 flex flex-col items-center pointer-events-none">
                  <span className="text-4xl">🍃</span>
                  <span className="text-[11px] font-bold mt-1 text-white/90">
                    पत्ता यहाँ रखें
                  </span>
                </div>
              </div>

              {/* Bottom Camera Controls Bar (Overlaid on Video) */}
              <div className="pointer-events-auto flex items-center justify-center gap-4 w-full">
                {/* Flip Camera */}
                <button
                  type="button"
                  onClick={toggleFacingMode}
                  className="p-3.5 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/20 shadow-md active:scale-95 transition-all"
                  title={t.flipCamera}
                >
                  <RefreshCw className="w-6 h-6" />
                </button>

                {/* Main Shutter Snap Button (Large 76px Touch Target) */}
                <button
                  type="button"
                  onClick={takeSnapshot}
                  className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 border-4 border-white shadow-2xl flex items-center justify-center active:scale-90 transition-transform cursor-pointer group"
                  title={t.takePhoto}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center group-hover:bg-emerald-500">
                    <Camera className="w-8 h-8 text-white fill-current" />
                  </div>
                </button>

                {/* Gallery Upload Trigger */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3.5 bg-black/60 hover:bg-black/80 text-white rounded-full border border-white/20 shadow-md active:scale-95 transition-all"
                  title={t.uploadPhoto}
                >
                  <ImageIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Hidden Canvas for Frame Freezing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Hidden File Input for Gallery Selection */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Action Footer: Retake vs Diagnose */}
      {capturedImage && (
        <div className="p-4 bg-emerald-950 flex items-center justify-between gap-3 border-t-2 border-emerald-600">
          <button
            type="button"
            onClick={handleRetake}
            disabled={isLoading}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm sm:text-base border border-zinc-600 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t.retake}</span>
          </button>

          <button
            type="button"
            onClick={handleDiagnose}
            disabled={isLoading}
            className="flex-[2] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-base sm:text-lg shadow-touch active:translate-y-1 transition-all flex items-center justify-center gap-2.5 border-2 border-emerald-300"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>{t.diagnosing}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-amber-300" />
                <span>{t.diagnoseButton}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Preset Quick Demo Selector (Super helpful for simulator/evaluations) */}
      <div className="bg-zinc-50 px-4 py-3 border-t border-zinc-200">
        <p className="text-xs font-bold text-zinc-500 mb-2 flex items-center gap-1.5">
          <span>⚡ त्वरित नमूना परीक्षण (Instant Leaf Demo):</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handlePresetSample('Wheat', 'wheat_yellow_rust')}
            className="px-2.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold text-left transition-all active:scale-95"
          >
            🌾 गेहूं: पीला रतुआ
          </button>
          <button
            type="button"
            onClick={() => handlePresetSample('Rice', 'rice_blast')}
            className="px-2.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 text-orange-900 text-xs font-bold text-left transition-all active:scale-95"
          >
            🌾 धान: झुलसा रोग (Blast)
          </button>
          <button
            type="button"
            onClick={() => handlePresetSample('Tomato', 'tomato_late_blight')}
            className="px-2.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-300 text-red-900 text-xs font-bold text-left transition-all active:scale-95"
          >
            🍅 टमाटर: पछेती झुलसा
          </button>
        </div>
      </div>
    </div>
  );
};
