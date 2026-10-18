export interface DiseaseSeed {
  code: string;
  cropType: string;
  englishName: string;
  localNames: {
    hi: string;
    pa: string;
    en: string;
  };
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
  sampleImageUrl?: string;
}

export const SEED_DISEASES: DiseaseSeed[] = [
  {
    code: 'wheat_yellow_rust',
    cropType: 'Wheat',
    englishName: 'Yellow Rust (Stripe Rust)',
    localNames: {
      hi: 'पीला रतुआ (हल्दी रोग)',
      pa: 'ਪੀਲੀ ਕੁੰਗੀ (ਹਲਦੀ ਰੋਗ)',
      en: 'Wheat Yellow Stripe Rust',
    },
    symptoms: {
      en: [
        'Yellow pustules arranged in linear stripes on leaf surface',
        'Yellow dust rubs off easily on farmer fingers',
        'Drying and premature yellowing of leaves from bottom to top',
      ],
      hi: [
        'पत्तियों पर पीले रंग की धारियां और हल्दी जैसा पीला पाउडर बनता है',
        'अंगुली लगाने पर पीला पाउडर हाथ पर लग जाता है',
        'पत्तियां पीली पड़कर सूखने लगती हैं और दाना कमजोर बनता है',
      ],
      pa: [
        'ਪੱਤਿਆਂ ਤੇ ਪੀਲੀਆਂ ਲਾਈਨਾਂ ਬਣ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ ਹਲਦੀ ਵਰਗਾ ਪਾਊਡਰ ਛੂਹਣ ਤੇ ਹੱਥਾਂ ਤੇ ਲੱਗਦਾ ਹੈ',
        'ਪੱਤੇ ਪੀਲੇ ਪੈ ਕੇ ਸੁੱਕਣ ਲੱਗਦੇ ਹਨ',
        'ਸਿੱਟਿਆਂ ਵਿੱਚ ਦਾਣੇ ਬਰੀਕ ਤੇ ਕਮਜ਼ੋਰ ਰਹਿ ਜਾਂਦੇ ਹਨ',
      ],
    },
    remedies: {
      organic: {
        en: 'Spray 5% Neem Seed Kernel Extract (NSKE) or Sour Buttermilk (Chhach) fermented in a copper pot mixed with water (5L in 100L water per acre).',
        hi: 'खट्टी छाछ (तांबे के बर्तन में 4 दिन रखी हुई) 5 लीटर प्रति 100 लीटर पानी में मिलाकर या 5% नीम तेल का छिड़काव करें।',
        pa: 'ਤਾਂਬੇ ਦੇ ਭਾਂਡੇ ਵਿੱਚ 4 ਦਿਨ ਰੱਖੀ ਖੱਟੀ ਲੱਸੀ (5 ਲੀਟਰ ਪ੍ਰਤੀ 100 ਲੀਟਰ ਪਾਣੀ) ਜਾਂ 5% ਨਿੰਮ ਦਾ ਤੇਲ ਛਿੜਕੋ।',
      },
      chemical: {
        en: 'Spray Propiconazole 25% EC (Tilt) @ 200 ml in 200 liters of water per acre immediately upon first appearance.',
        hi: 'तुरंत प्रोपिकोनाज़ोल 25% ई.सी. (टिल्ट) 200 मिली प्रति 200 लीटर पानी में प्रति एकड़ छिड़कें।',
        pa: 'ਤੁਰੰਤ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% ਈ.ਸੀ. (ਟਿਲਟ) 200 ਮਿ.ਲੀ. ਨੂੰ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਪ੍ਰਤੀ ਏਕੜ ਛਿੜਕਾਅ ਕਰੋ।',
      },
    },
    prevention: {
      en: 'Sow rust-resistant wheat varieties (e.g., HD 3086, DBW 187, PBW 550). Avoid late sowing and over-irrigation.',
      hi: 'रतुआ रोधी किस्में (जैसे HD 3086, DBW 187) बोएं। अधिक यूरिया का प्रयोग न करें और समय पर बुवाई करें।',
      pa: 'ਕੁੰਗੀ ਰੋਧਕ ਕਿਸਮਾਂ (ਜਿਵੇਂ HD 3086, DBW 187) ਬੀਜੋ। ਯੂਰੀਆ ਦੀ ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਤੋਂ ਬਚੋ।',
    },
    severity: 'CRITICAL',
    recommendedProducts: [
      'Propiconazole 25% EC (Tilt)',
      'Tebuconazole 25.9% EC',
      'Neem Oil 10,000 PPM',
      'Bio-Fungicide Trichoderma',
    ],
  },
  {
    code: 'rice_blast',
    cropType: 'Rice',
    englishName: 'Rice Blast Disease',
    localNames: {
      hi: 'धान का झुलसा रोग (ब्लास्ट)',
      pa: 'ਝੋਨੇ ਦਾ ਝੁਲਸਾ ਰੋਗ (ਬਲਾਸਟ)',
      en: 'Rice Blast (Magnaporthe oryzae)',
    },
    symptoms: {
      en: [
        'Spindle-shaped or diamond-shaped lesions with gray-white centers and brownish margins',
        'Rotting of nodes and neck causing empty panicles (Neck blast)',
      ],
      hi: [
        'पत्तियों पर आंख या नाव के आकार के धब्बे, जिनके बीच का भाग राख जैसा और किनारे भूरे होते हैं',
        'गांठों और बालियों की गर्दन का काला पड़कर टूटना',
      ],
      pa: [
        'ਪੱਤਿਆਂ ਤੇ ਅੱਖ ਦੇ ਆਕਾਰ ਦੇ ਧੱਬੇ, ਵਿਚਕਾਰੋਂ ਸੁਆਹ ਰੰਗੇ ਅਤੇ ਕਿਨਾਰਿਆਂ ਤੋਂ ਭੂਰੇ',
        'ਮੁੰਜਰਾਂ ਦੀ ਧੌਣ ਕਾਲੀ ਹੋ ਕੇ ਟੁੱਟ ਜਾਂਦੀ ਹੈ',
      ],
    },
    remedies: {
      organic: {
        en: 'Apply Pseudomonas fluorescens bio-agent @ 1 kg per acre mixed in well-decomposed FYM or vermicompost.',
        hi: 'स्यूडोमोनास फ्लोरोसेंस (1 किग्रा प्रति एकड़) अच्छी तरह सड़ी गोबर की खाद या केंचुआ खाद में मिलाकर दें।',
        pa: 'ਸੂਡੋਮੋਨਾਸ ਫਲੋਰੋਸੈਂਸ 1 ਕਿਲੋ ਪ੍ਰਤੀ ਏਕੜ ਰੂੜੀ ਦੀ ਖਾਦ ਵਿੱਚ ਰਲਾ ਕੇ ਪਾਓ।',
      },
      chemical: {
        en: 'Spray Tricyclazole 75% WP @ 120g or Kasugamycin 3% SL @ 400ml in 200 liters of water per acre.',
        hi: 'ट्राइसाइक्लाज़ोल 75% WP 120 ग्राम या कासुगामाइसिन 3% SL 400 मिली प्रति 200 लीटर पानी में छिड़कें।',
        pa: 'ਟਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 75% WP 120 ਗ੍ਰਾਮ ਜਾਂ ਕਾਸੂਗਾਮਾਈਸਿਨ 400 ਮਿ.ਲੀ. ਪ੍ਰਤੀ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਛਿੜਕੋ।',
      },
    },
    prevention: {
      en: 'Avoid excessive nitrogen fertilizer application. Treat seeds with Carbendazim before nursery sowing.',
      hi: 'नाइट्रोजन/यूरिया का अत्यधिक छिड़काव न करें। बीजोपचार करके ही धान की नर्सरी लगाएं।',
      pa: 'ਯੂਰੀਆ ਖਾਦ ਦੀ ਬੇਲੋੜੀ ਵਰਤੋਂ ਨਾ ਕਰੋ। ਬੀਜ ਸੋਧ ਕਰਕੇ ਹੀ ਪਨੀਰੀ ਲਗਾਓ।',
    },
    severity: 'HIGH',
    recommendedProducts: [
      'Tricyclazole 75% WP (Baan)',
      'Kasugamycin 3% SL',
      'Pseudomonas Fluorescens',
    ],
  },
  {
    code: 'tomato_late_blight',
    cropType: 'Tomato',
    englishName: 'Late Blight of Tomato',
    localNames: {
      hi: 'टमाटर का पछेती झुलसा रोग',
      pa: 'ਟਮਾਟਰ ਦਾ ਪਛੇਤਾ ਝੁਲਸ ਰੋਗ',
      en: 'Late Blight (Phytophthora)',
    },
    symptoms: {
      en: [
        'Large water-soaked dark brown irregular lesions on leaves',
        'White fungal mold on undersides of leaves during humid weather',
        'Brown greasy patches on green and ripe tomato fruit',
      ],
      hi: [
        'पत्तियों पर पानी से भीगे हुए गहरे भूरे रंग के धब्बे',
        'नमी वाले मौसम में पत्तियों के नीचे सफेद रंग की फफूंदी',
        'टमाटर के फलों पर कठोर भूरे रंग के सड़े हुए चकत्ते',
      ],
      pa: [
        'ਪੱਤਿਆਂ ਤੇ ਪਾਣੀ ਭਿੱਜੇ ਗੂੜ੍ਹੇ ਭੂਰੇ ਦਾਗ਼',
        'ਪੱਤਿਆਂ ਦੇ ਹੇਠਲੇ ਪਾਸੇ ਚਿੱਟੀ ਉੱਲੀ ਦਿਖਾਈ ਦੇਣਾ',
        'ਟਮਾਟਰਾਂ ਦੇ ਫਲ ਉੱਤੇ ਸਖ਼ਤ ਭੂਰੇ ਰੰਗ ਦੇ ਧੱਬੇ ਬਣਨਾ',
      ],
    },
    remedies: {
      organic: {
        en: 'Foliar spray with Copper Hydroxide / Bordeaux mixture 1% or Trichoderma harzianum @ 5g/liter water.',
        hi: 'बोर्डो मिश्रण 1% या कॉपर ऑक्सीक्लोराइड और ट्राइकोडर्मा 5 ग्राम प्रति लीटर पानी का छिड़काव करें।',
        pa: 'ਬੋਰਡੋ ਮਿਸ਼ਰਣ 1% ਜਾਂ ਟ੍ਰਾਈਕੋਡਰਮਾ 5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਛਿੜਕਾਅ ਕਰੋ।',
      },
      chemical: {
        en: 'Spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5g per liter or Cymoxanil + Mancozeb.',
        hi: 'मेटालेक्सिल 8% + मैंकोज़ेब 64% WP (रिडोमिल) 2.5 ग्राम प्रति लीटर पानी में मिलाकर तुरंत छिड़कें।',
        pa: 'ਮੈਟਾਲੈਕਸਿਲ + ਮੈਨਕੋਜ਼ੇਬ (ਰਿਡੋਮਿਲ) 2.5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਤੁਰੰਤ ਛਿੜਕੋ।',
      },
    },
    prevention: {
      en: 'Stake tomato plants to keep leaves off the wet soil. Avoid overhead sprinkler irrigation.',
      hi: 'पौधों को बांस के सहारे बांधें ताकि पत्तियां गीली मिट्टी न छुएं। फव्वारा सिंचाई से बचें।',
      pa: 'ਬੂਟਿਆਂ ਨੂੰ ਜ਼ਮੀਨ ਤੋਂ ਉੱਚਾ ਸਹਾਰਾ ਦਿਓ। ਸ਼ਾਮ ਵੇਲੇ ਪਾਣੀ ਦੇਣ ਤੋਂ ਪਰਹੇਜ਼ ਕਰੋ।',
    },
    severity: 'HIGH',
    recommendedProducts: [
      'Metalaxyl + Mancozeb (Ridomil Gold)',
      'Copper Oxychloride 50% WP (Blitox)',
      'Bio-Fungicide Trichoderma',
    ],
  },
  {
    code: 'cotton_leaf_curl',
    cropType: 'Cotton',
    englishName: 'Cotton Leaf Curl Virus (CLCuV)',
    localNames: {
      hi: 'कपास का पत्ता मरोड़ रोग (चुर्रा)',
      pa: 'ਨਰਮੇ ਦਾ ਪੱਤਾ ਮਰੋੜ ਰੋਗ (ਚੂੜਾ)',
      en: 'Cotton Leaf Curl Virus',
    },
    symptoms: {
      en: [
        'Upward and downward curling of cotton leaves',
        'Thickening and swelling of main leaf veins',
        'Cup-shaped leafy outgrowth under the leaf (enation)',
      ],
      hi: [
        'पत्तियां ऊपर या नीचे की ओर मुड़कर नाव के आकार की हो जाती हैं',
        'पत्तियों की नसें मोटी और हरी हो जाती हैं',
        'पत्ते के नीचे छोटा उल्टा पत्ता जैसा उभार बन जाता है',
      ],
      pa: [
        'ਨਰਮੇ ਦੇ ਪੱਤੇ ਉੱਪਰ ਜਾਂ ਹੇਠਾਂ ਵੱਲ ਮੁੜ ਕੇ ਕਿਸ਼ਤੀ ਵਰਗੇ ਹੋ ਜਾਂਦੇ ਹਨ',
        'ਨਾੜੀਆਂ ਮੋਟੀਆਂ ਹੋ ਜਾਂਦੀਆਂ ਹਨ',
        'ਬੂਟੇ ਦਾ ਵਾਧਾ ਰੁਕ ਜਾਂਦਾ ਹੈ',
      ],
    },
    remedies: {
      organic: {
        en: 'Control whitefly vector using Yellow Sticky Traps (10 per acre) and spray 5% Neem Oil (10000 ppm) with 1 ml liquid soap.',
        hi: 'सफेद मक्खी को रोकने के लिए पीले चिपचिपे कार्ड (10 प्रति एकड़) लगाएं और नीम का तेल (10,000 PPM) 3 मिली प्रति लीटर छिड़कें।',
        pa: 'ਚਿੱਟੀ ਮੱਖੀ ਨੂੰ ਕੰਟਰੋਲ ਕਰਨ ਲਈ ਪੀਲੇ ਸਟਿਕੀ ਟਰੈਪ ਲਗਾਓ ਅਤੇ ਨਿੰਮ ਦਾ ਤੇਲ 3 ਮਿ.ਲੀ. ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਛਿੜਕੋ।',
      },
      chemical: {
        en: 'Spray Diafenthiuron 50% WP @ 200g or Pyriproxyfen 10% EC @ 400ml per acre to control the whitefly pest that transmits the virus.',
        hi: 'डायफेंथियूरॉन 50% WP 200 ग्राम या पाइरीप्रॉक्सीफेन 400 मिली प्रति एकड़ छिड़कें जिससे सफेद मक्खी नष्ट हो।',
        pa: 'ਡਾਈਫੈਂਥੀਯੂਰਾਨ 50% WP 200 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਏਕੜ ਛਿੜਕੋ ਤਾਂ ਜੋ ਚਿੱਟੀ ਮੱਖੀ ਖ਼ਤਮ ਹੋ ਸਕੇ।',
      },
    },
    prevention: {
      en: 'Eradicate weed hosts like Kanghi buti and Peeli buti from field boundaries. Grow CLCuV-tolerant hybrids.',
      hi: 'खेत की मेड़ों से कंघी बूटी और पीली बूटी जैसे खरपतवार उखाड़कर नष्ट करें।',
      pa: 'ਵੱਟਾਂ ਉੱਤੋਂ ਕੰਘੀ ਬੂਟੀ ਅਤੇ ਪੀਲੀ ਬੂਟੀ ਵਰਗੇ ਨਦੀਨ ਨਸ਼ਟ ਕਰੋ।',
    },
    severity: 'CRITICAL',
    recommendedProducts: [
      'Diafenthiuron 50% WP (Pegasus)',
      'Yellow Sticky Traps',
      'Neem Oil 10,000 PPM',
    ],
  },
  {
    code: 'healthy_crop',
    cropType: 'General',
    englishName: 'Healthy Crop Leaf',
    localNames: {
      hi: 'स्वस्थ और निरोगी फसल',
      pa: 'ਤੰਦਰੁਸਤ ਅਤੇ ਨਿਰੋਗ ਫਸਲ',
      en: 'Healthy Crop (No Disease Detected)',
    },
    symptoms: {
      en: ['Vibrant green leaf with no spots, lesions, discoloration, or pest damage.'],
      hi: ['पत्ती एकदम हरी, चमकदार और किसी भी दाग-धब्बे या कीड़े से मुक्त है।'],
      pa: ['ਪੱਤਾ ਪੂਰੀ ਤਰ੍ਹਾਂ ਹਰਾ, ਤੰਦਰੁਸਤ ਅਤੇ ਕਿਸੇ ਵੀ ਬਿਮਾਰੀ ਤੋਂ ਮੁਕਤ ਹੈ।'],
    },
    remedies: {
      organic: {
        en: 'Maintain balanced organic nutrition with Jeevamrut or Panchagavya spray once every 15 days.',
        hi: 'फसल को और मजबूत रखने के लिए हर 15 दिन में जीवामृत या पंचगव्य का हल्का छिड़काव करें।',
        pa: 'ਫਸਲ ਨੂੰ ਤਾਕਤਵਰ ਰੱਖਣ ਲਈ ਹਰ 15 ਦਿਨ ਬਾਅਦ ਜੀਵਾਮ੍ਰਿਤ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
      },
      chemical: {
        en: 'No chemical spray required. Continue routine balanced N-P-K fertilization and proper irrigation.',
        hi: 'किसी भी रासायनिक दवा की आवश्यकता नहीं है। समय पर पानी और संतुलित खाद देते रहें।',
        pa: 'ਕਿਸੇ ਦਵਾਈ ਦੇ ਛਿੜਕਾਅ ਦੀ ਲੋੜ ਨਹੀਂ। ਸਮੇਂ ਸਿਰ ਪਾਣੀ ਅਤੇ ਲੋੜ ਅਨੁਸਾਰ ਖਾਦ ਪਾਓ।',
      },
    },
    prevention: {
      en: 'Regularly inspect field corners and keep drainage clean.',
      hi: 'नियमित रूप से खेत का निरीक्षण करते रहें।',
      pa: 'ਖੇਤ ਦਾ ਲਗਾਤਾਰ ਮੁਆਇਨਾ ਕਰਦੇ ਰਹੋ।',
    },
    severity: 'LOW',
    recommendedProducts: [
      'Bio-NPK Liquid Consortia',
      'Organic Vermicompost',
      'Neem Cake Fertilizer',
    ],
  },
];

export interface AgriStoreSeed {
  name: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  rating: number;
  openingHours: string;
  availableStock: Array<{
    itemName: string;
    category: 'Fungicide' | 'Insecticide' | 'Bio-fertilizer' | 'Organic Spray' | 'Pesticide' | 'Seeds';
    inStock: boolean;
    priceEstimate: string;
    packSize: string;
  }>;
  verifiedKisanKendra: boolean;
}

export const SEED_AGRI_STORES: AgriStoreSeed[] = [
  {
    name: 'IFFCO Kisan Seva Kendra',
    phone: '+91 98765 43210',
    address: 'GT Road, Near Grain Market, Mandi Gate #2',
    district: 'Ludhiana',
    state: 'Punjab',
    latitude: 30.901,
    longitude: 75.8573,
    rating: 4.8,
    openingHours: '07:30 AM - 07:30 PM',
    verifiedKisanKendra: true,
    availableStock: [
      { itemName: 'Propiconazole 25% EC (Tilt)', category: 'Fungicide', inStock: true, priceEstimate: '₹420', packSize: '250ml' },
      { itemName: 'Neem Oil 10,000 PPM', category: 'Organic Spray', inStock: true, priceEstimate: '₹350', packSize: '1 Liter' },
      { itemName: 'Bio-Fungicide Trichoderma', category: 'Bio-fertilizer', inStock: true, priceEstimate: '₹140', packSize: '1 Kg' },
      { itemName: 'Mancozeb 75% WP', category: 'Fungicide', inStock: true, priceEstimate: '₹280', packSize: '500g' },
      { itemName: 'Diafenthiuron 50% WP', category: 'Insecticide', inStock: true, priceEstimate: '₹680', packSize: '250g' },
    ],
  },
  {
    name: 'Kisan Suvidha Krishi Seva Kendra',
    phone: '+91 94172 11223',
    address: 'Shop 14, New Anaj Mandi, Railway Road',
    district: 'Karnal',
    state: 'Haryana',
    latitude: 29.6857,
    longitude: 76.9905,
    rating: 4.7,
    openingHours: '08:00 AM - 08:00 PM',
    verifiedKisanKendra: true,
    availableStock: [
      { itemName: 'Metalaxyl + Mancozeb (Ridomil MZ)', category: 'Fungicide', inStock: true, priceEstimate: '₹550', packSize: '500g' },
      { itemName: 'Tricyclazole 75% WP', category: 'Fungicide', inStock: true, priceEstimate: '₹390', packSize: '120g' },
      { itemName: 'Copper Oxychloride 50% WP', category: 'Fungicide', inStock: true, priceEstimate: '₹310', packSize: '500g' },
      { itemName: 'Yellow Sticky Traps (Pack of 10)', category: 'Organic Spray', inStock: true, priceEstimate: '₹180', packSize: '10 Sheets' },
    ],
  },
  {
    name: 'Bharat Agro Chemicals & Fertilizer Store',
    phone: '+91 98290 88990',
    address: 'Old Bus Stand Road, Near Krishi Upaj Mandi',
    district: 'Sri Ganganagar',
    state: 'Rajasthan',
    latitude: 29.9038,
    longitude: 73.8772,
    rating: 4.6,
    openingHours: '08:00 AM - 07:00 PM',
    verifiedKisanKendra: true,
    availableStock: [
      { itemName: 'Propiconazole 25% EC (Tilt)', category: 'Fungicide', inStock: true, priceEstimate: '₹415', packSize: '250ml' },
      { itemName: 'Tebuconazole 25.9% EC', category: 'Fungicide', inStock: true, priceEstimate: '₹460', packSize: '250ml' },
      { itemName: 'Neem Cake Organic Fertilizer', category: 'Bio-fertilizer', inStock: true, priceEstimate: '₹600', packSize: '25 Kg' },
    ],
  },
  {
    name: 'Chaudhary Khad Beej Bhandar',
    phone: '+91 97190 44556',
    address: 'Baghpat Road, Bypass Crossing, Modipuram',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    latitude: 29.0588,
    longitude: 77.7056,
    rating: 4.5,
    openingHours: '08:00 AM - 08:00 PM',
    verifiedKisanKendra: true,
    availableStock: [
      { itemName: 'Kasugamycin 3% SL', category: 'Fungicide', inStock: true, priceEstimate: '₹480', packSize: '400ml' },
      { itemName: 'Bio-NPK Liquid Consortia', category: 'Bio-fertilizer', inStock: true, priceEstimate: '₹220', packSize: '1 Liter' },
      { itemName: 'Copper Oxychloride 50% WP', category: 'Fungicide', inStock: true, priceEstimate: '₹315', packSize: '500g' },
    ],
  },
  {
    name: 'Punjab Kisan Sahayata Kendra',
    phone: '+91 98140 33445',
    address: 'Bathinda-Barnala Highway, Rampura Phul Mandi',
    district: 'Bathinda',
    state: 'Punjab',
    latitude: 30.211,
    longitude: 74.9455,
    rating: 4.9,
    openingHours: '07:00 AM - 07:30 PM',
    verifiedKisanKendra: true,
    availableStock: [
      { itemName: 'Propiconazole 25% EC (Tilt)', category: 'Fungicide', inStock: true, priceEstimate: '₹410', packSize: '250ml' },
      { itemName: 'Yellow Sticky Traps', category: 'Organic Spray', inStock: true, priceEstimate: '₹170', packSize: '10 Sheets' },
      { itemName: 'Diafenthiuron 50% WP', category: 'Insecticide', inStock: true, priceEstimate: '₹670', packSize: '250g' },
    ],
  },
];
