# 🌾 Fasal Doctor (फसल डॉक्टर - ਫਸਲ ਡਾਕਟਰ)

> **AI-Powered Crop Disease Diagnostic PWA & Rural Agri Store Locator for Indian Farmers**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat&logo=node.js)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB / PostgreSQL](https://img.shields.io/badge/Database-MongoDB%20%7C%20PostgreSQL-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Installable%20Offline-16a34a?style=flat)](https://web.dev/progressive-web-apps/)

---

## 📖 Overview

**Fasal Doctor** is a full-stack, mobile-first Progressive Web Application (PWA) designed to empower smallholder farmers across India. Built with low-literacy ergonomics, high-contrast visual cues, and multilingual voice capabilities, it enables farmers to photograph diseased crop leaves, receive instant AI diagnosis with organic (*desi nuskhe*) and chemical remedies in **Hindi (`हिंदी`)**, **Punjabi (`ਪੰਜਾਬੀ`)**, and **English**, and automatically locate in-stock agricultural fertilizer stores within a **10 km radius**.

---

## 🏛️ Monorepo Architecture

```
fasal-doctor/
├── apps/
│   ├── web/                               # Next.js 14 App Router Frontend (PWA)
│   │   ├── public/                        # PWA manifest, service worker, app icons
│   │   │   ├── manifest.json              # Web App Manifest (standalone, shortcuts)
│   │   │   ├── sw.js                      # Service Worker (offline asset & fallback cache)
│   │   │   ├── logo.jpg                   # High-res Fasal Doctor doctor icon
│   │   │   ├── icon-192.png               # Android standard maskable PWA icon
│   │   │   └── icon-512.png               # High-res PWA launch icon
│   │   ├── src/
│   │   │   ├── app/                       # Next.js App Router
│   │   │   │   ├── layout.tsx             # Root layout with PWA meta & SW registration
│   │   │   │   ├── page.tsx               # Unified interactive dashboard & tabs
│   │   │   │   └── globals.css            # Tailwind + Leaflet styles & animations
│   │   │   ├── components/                # Modular Farmer UI Components
│   │   │   │   ├── Header.tsx             # Brand header, language toggle & online status
│   │   │   │   ├── CameraCapture.tsx      # Viewfinder camera, scanner overlay & gallery
│   │   │   │   ├── AudioVoicePlayer.tsx   # Auto-playing waveform voice audio player
│   │   │   │   ├── DiagnosisResultCard.tsx# Disease card (Organic vs Chemical remedies)
│   │   │   │   ├── StoreMap.tsx           # Leaflet interactive map (10km radius & pins)
│   │   │   │   └── BottomNav.tsx          # Large touch navigation (Scan, Stores, History, Call)
│   │   │   ├── lib/                       # Frontend Utilities
│   │   │   │   ├── api.ts                 # Full-stack API client with offline fallback
│   │   │   │   ├── speech.ts              # SpeechSynthesis & base64 audio engine
│   │   │   │   └── translations.ts        # Hindi, Punjabi & English language dictionaries
│   │   │   └── types/                     # Shared TypeScript interface models
│   │   ├── next.config.mjs                # Next.js config with backend API proxy rewrites
│   │   ├── tailwind.config.ts             # High-contrast agricultural palette
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── server/                            # Node.js / Express Backend (AI & Spatial APIs)
│       ├── prisma/
│       │   └── schema.prisma              # PostgreSQL / MongoDB Prisma schema
│       ├── src/
│       │   ├── config/
│       │   │   ├── env.ts                 # Validated environment configuration
│       │   │   └── db.ts                  # MongoDB Mongoose connector with in-memory fallback
│       │   ├── controllers/
│       │   │   ├── scan.controller.ts     # POST /api/scan-crop (multipart/base64 handler)
│       │   │   ├── voice.controller.ts    # POST /api/generate-voice (TTS synthesizer)
│       │   │   ├── store.controller.ts    # GET /api/nearby-stores (10 km spatial query)
│       │   │   └── disease.controller.ts  # GET /api/diseases (knowledge catalog)
│       │   ├── models/                    # Database Schemas
│       │   │   ├── User.model.ts          # Farmer profiles & language preferences
│       │   │   ├── Disease.model.ts       # Multilingual disease definitions & remedies
│       │   │   ├── ScanHistory.model.ts   # Farmer scan audit trail & coordinates
│       │   │   └── AgriStore.model.ts     # Geospatial 2dsphere indexed store inventory
│       │   ├── services/
│       │   │   ├── aiVision.service.ts    # GPT-4o Vision & agronomy pathology engine
│       │   │   ├── tts.service.ts         # Google Cloud TTS, Bhashini & speech fallback
│       │   │   └── store.service.ts       # Haversine & MongoDB 2dsphere 10km spatial search
│       │   ├── data/
│       │   │   ├── seedData.ts            # Realistic Indian crop diseases & agri stores
│       │   │   └── seed.ts                # Database seeder execution script
│       │   └── index.ts                   # Express server entry point
│       ├── .env.example
│       ├── tsconfig.json
│       └── package.json
│
├── package.json                           # Workspace root package.json
└── README.md
```

---

## ⚡ Key Modules & Workflow

### 1. Frontend (PWA)
- **Minimalist, High-Contrast UI**: Designed specifically for rural sunlight readability with 68px+ tactile buttons and low-literacy icons.
- **Camera Input Component**: Live camera viewfinder stream (`navigator.mediaDevices.getUserMedia`) featuring leaf framing brackets, scanning laser animations, camera flip, and gallery upload.
- **Instant Demo Selector**: One-tap simulated leaf diagnosis (*Wheat Yellow Rust*, *Rice Blast*, *Tomato Late Blight*) for instant demonstrations and testing without live field crops.
- **Multilingual Support**: Real-time language switching between **Hindi (`हिंदी`)**, **Punjabi (`ਪੰਜਾਬੀ`)**, and **English (`English`)** with persistent `localStorage` preference.
- **Audio Voice Player**: Auto-plays synthesized spoken remedies in the farmer's selected language with dynamic waveform visualizers, speed toggles (0.8x, 1.0x, 1.2x), and pause/replay controls.
- **Interactive Store Map**: OpenStreetMap Leaflet component rendering the farmer's location, a green **10 km radius boundary circle**, custom store pins, and direct one-tap **"Call Store" (`tel:`)** and **"Get Directions"** actions.
- **Government Helpline**: Direct integration with the National Kisan Call Center (**1800-180-1551**) and state agricultural universities.

### 2. Backend API
- `POST /api/scan-crop`: Accepts leaf image via `multipart/form-data` or base64. Passes image to OpenAI GPT-4o Vision or the built-in plant pathology knowledge engine. Returns disease name, confidence score, symptoms, organic remedy, chemical dosage, and spoken audio scripts.
- `POST /api/generate-voice`: Converts remedy instructions into regional audio (`hi-IN`, `pa-IN`, `en-IN`) using Google Cloud Text-to-Speech, Bhashini API, or client-side Web SpeechSynthesis directives.
- `GET /api/nearby-stores`: Accepts farmer's `lat`, `lng`, and `radius` (default 10 km). Executes geospatial queries (via MongoDB 2dsphere `$nearSphere` or Haversine formula) to return nearby certified stores, stock status, and distance.
- `GET /api/diseases`: Catalog of supported Indian crop diseases and symptoms.
- `GET /api/health`: System health and database connectivity probe.

### 3. Database Schema
Supports both **MongoDB (Mongoose)** and **PostgreSQL (Prisma)**:
- **`Users`**: Phone number, preferred language (`hi`, `pa`, `en`), GeoJSON Point coordinates, district, state.
- **`Diseases`**: English name, local names (Hindi Devanagari, Punjabi Gurmukhi), crop type, symptoms, organic remedies (*desi nuskhe*), chemical spray dosages, prevention tips, and severity levels.
- **`ScanHistory`**: Farmer reference, crop leaf image, diagnosed disease, confidence score, observed symptoms, audio URL, and timestamp.
- **`AgriStores`**: Store name, phone, address, 2dsphere location coordinates, opening hours, verified Kisan Kendra badge, and itemized available stock (*Tilt, Neem Oil, Mancozeb, Trichoderma*).

---

## 🚀 Quickstart & Setup

### Prerequisites
- **Node.js** >= 18.0.0 (Node 24 recommended)
- **npm** >= 9.0.0
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI (optional; server features an autonomous in-memory fallback if MongoDB is not present).

### 1. Clone & Install
```bash
git clone https://github.com/your-username/fasal-doctor.git
cd fasal-doctor

# Install all monorepo dependencies
npm install
```

### 2. Configure Environment Variables
Copy and customize the `.env` file for the backend server:
```bash
cp apps/server/.env.example apps/server/.env
```

Contents of `apps/server/.env`:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/fasal_doctor
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fasal_doctor?schema=public

# Optional: Add your keys for cloud AI and neural TTS
OPENAI_API_KEY=
GOOGLE_TTS_API_KEY=
BHASHINI_API_KEY=
BHASHINI_USER_ID=
CORS_ORIGIN=http://localhost:3000
```

### 3. Seed Database
Populate Indian crop disease knowledge and certified Kisan Kendras:
```bash
npm run seed
```

### 4. Run Development Servers
Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run individually:
```bash
# Terminal 1: Backend API (Port 5001)
npm run dev:server

# Terminal 2: Next.js PWA (Port 3000)
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000) in your browser or mobile device.

---

## 📡 API Reference & Examples

### 1. Scan Crop Leaf
```http
POST /api/scan-crop
Content-Type: application/json
```
**Request Body:**
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "cropHint": "Wheat",
  "latitude": 29.6857,
  "longitude": 76.9905
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "scanId": "6ad472a949db30221d516345",
  "data": {
    "cropType": "Wheat",
    "diseaseCode": "wheat_yellow_rust",
    "englishName": "Yellow Rust (Stripe Rust)",
    "localNames": {
      "hi": "पीला रतुआ (हल्दी रोग)",
      "pa": "ਪੀਲੀ ਕੁੰਗੀ (ਹਲਦੀ ਰੋਗ)",
      "en": "Wheat Yellow Stripe Rust"
    },
    "confidence": 95,
    "symptoms": {
      "hi": ["पत्तियों पर पीले रंग की धारियां और हल्दी जैसा पीला पाउडर बनता है"],
      "pa": ["ਪੱਤਿਆਂ ਤੇ ਪੀਲੀਆਂ ਲਾਈਨਾਂ ਬਣ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ ਹਲਦੀ ਵਰਗਾ ਪਾਊਡਰ ਛੂਹਣ ਤੇ ਹੱਥਾਂ ਤੇ ਲੱਗਦਾ ਹੈ"]
    },
    "remedies": {
      "organic": {
        "hi": "खट्टी छाछ (तांबे के बर्तन में 4 दिन रखी हुई) 5 लीटर प्रति 100 लीटर पानी में मिलाकर या 5% नीम तेल का छिड़काव करें।",
        "pa": "ਤਾਂਬੇ ਦੇ ਭਾਂਡੇ ਵਿੱਚ 4 ਦਿਨ ਰੱਖੀ ਖੱਟੀ ਲੱਸੀ (5 ਲੀਟਰ ਪ੍ਰਤੀ 100 ਲੀਟਰ ਪਾਣੀ) ਜਾਂ 5% ਨਿੰਮ ਦਾ ਤੇਲ ਛਿੜਕੋ।"
      },
      "chemical": {
        "hi": "तुरंत प्रोपिकोनाज़ोल 25% ई.सी. (टिल्ट) 200 मिली प्रति 200 लीटर पानी में प्रति एकड़ छिड़कें।",
        "pa": "ਤੁਰੰਤ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% ਈ.ਸੀ. (ਟਿਲਟ) 200 ਮਿ.ਲੀ. ਨੂੰ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਪ੍ਰਤੀ ਏਕੜ ਛਿੜਕਾਅ ਕਰੋ।"
      }
    },
    "severity": "CRITICAL",
    "recommendedProducts": ["Tilt (Propiconazole)", "Neem Oil 10,000 PPM"],
    "doctorAudioScript": {
      "hi": "नमस्कार किसान भाई। फसल डॉक्टर की जांच के अनुसार आपकी गेहूं की फसल में पीला रतुआ की पहचान हुई है...",
      "pa": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ। ਫਸਲ ਡਾਕਟਰ ਦੀ ਜਾਂਚ ਮੁਤਾਬਕ ਤੁਹਾਡੀ ਕਣਕ ਦੀ ਫਸਲ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਰੋਗ ਹੈ..."
    }
  }
}
```

---

### 2. Generate Voice Speech (TTS)
```http
POST /api/generate-voice
Content-Type: application/json
```
**Request Body:**
```json
{
  "text": "किसान भाई, तुरंत प्रोपिकोनाज़ोल टिल्ट 200 मिली प्रति एकड़ छिड़कें।",
  "language": "hi"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "format": "browser-speech-synthesis",
    "language": "hi-IN",
    "fallbackToBrowserSpeech": true
  }
}
```

---

### 3. Nearby Agri & Fertilizer Stores (10 km Radius)
```http
GET /api/nearby-stores?lat=29.6857&lng=76.9905&radius=10
```
**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "userLocation": { "latitude": 29.6857, "longitude": 76.9905 },
  "radiusKm": 10,
  "stores": [
    {
      "id": "6ad4716548fc3bec969188a2",
      "name": "Kisan Suvidha Krishi Seva Kendra",
      "phone": "+91 94172 11223",
      "address": "Shop 14, New Anaj Mandi, Railway Road",
      "district": "Karnal",
      "state": "Haryana",
      "latitude": 29.6857,
      "longitude": 76.9905,
      "rating": 4.7,
      "openingHours": "08:00 AM - 08:00 PM",
      "verifiedKisanKendra": true,
      "distanceKm": 0,
      "availableStock": [
        { "itemName": "Metalaxyl + Mancozeb (Ridomil MZ)", "category": "Fungicide", "inStock": true, "priceEstimate": "₹550" },
        { "itemName": "Tricyclazole 75% WP", "category": "Fungicide", "inStock": true, "priceEstimate": "₹390" }
      ]
    }
  ]
}
```

---

## 📱 PWA & Offline Support

- **Add to Home Screen**: Installable as a native app on Android, iOS, and Desktop Chrome via `manifest.json`.
- **Offline Caching**: Built-in Service Worker (`sw.js`) caches application shells, logos, and UI assets for offline rural field operation.
- **Native Hardware Access**: Direct access to camera hardware (`environment` rear camera), flashlight torch support, and GPS geolocation coordinates.

---

## 🧪 Testing & Production Build

```bash
# Build both web app and server packages
npm run build

# Start production server
npm run start
```

---

## 📜 License
MIT License. Built for Indian farmers with ❤️.
