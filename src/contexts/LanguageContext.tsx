import { createContext, useContext, useState } from "react";

export type Language = "en" | "hi" | "te";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    te: string;
  };
}

const translations: Translations = {
  // Navigation
  signIn: { en: "Sign In", hi: "साइन इन करें", te: "సైన్ ఇన్" },
  getStarted: { en: "Get Started", hi: "शुरू करें", te: "ప్రారంభించండి" },
  
  // Hero Section
  heroTitle: { en: "Protect Your Crops", hi: "अपनी फसलों की रक्षा करें", te: "మీ పంటలను రక్షించుకోండి" },
  heroSubtitle: { en: "with Smart Detection", hi: "स्मार्ट डिटेक्शन के साथ", te: "స్మార్ట్ డిటెక్షన్ తో" },
  heroDescription: { 
    en: "Upload a leaf image and get accurate disease diagnosis in seconds. Powered by cutting-edge Convolutional Neural Networks (CNN) and image recognition technology to help farmers, students, and researchers protect crops and increase yields.", 
    hi: "एक पत्ती की छवि अपलोड करें और सेकंडों में सटीक रोग निदान प्राप्त करें। किसानों, छात्रों और शोधकर्ताओं को फसलों की रक्षा करने और उपज बढ़ाने में मदद करने के लिए अत्याधुनिक कन्वोल्यूशनल न्यूरल नेटवर्क (CNN) और छवि पहचान तकनीक द्वारा संचालित।",
    te: "ఒక ఆకు చిత్రాన్ని అప్‌లోడ్ చేసి సెకన్లలో ఖచ్చితమైన వ్యాధి నిర్ధారణ పొందండి. రైతులు, విద్యార్థులు మరియు పరిశోధకులు పంటలను రక్షించడానికి మరియు దిగుబడి పెంచడానికి సహాయపడటానికి అత్యాధునిక కన్వల్యూషనల్ న్యూరల్ నెట్‌వర్క్‌లు (CNN) మరియు చిత్ర గుర్తింపు సాంకేతికతతో శక్తివంతం."
  },
  detectNow: { en: "Detect Now", hi: "अभी पता लगाएं", te: "ఇప్పుడు గుర్తించండి" },
  startDetection: { en: "Start Detection Now", hi: "अभी डिटेक्शन शुरू करें", te: "ఇప్పుడు గుర్తింపు ప్రారంభించండి" },
  learnHow: { en: "Learn How It Works", hi: "यह कैसे काम करता है जानें", te: "ఇది ఎలా పనిచేస్తుందో తెలుసుకోండి" },
  
  // Stats
  accuracy: { en: "Accuracy", hi: "सटीकता", te: "ఖచ్చితత్వం" },
  detectionTime: { en: "Detection Time", hi: "डिटेक्शन समय", te: "గుర్తింపు సమయం" },
  diseases: { en: "Diseases", hi: "रोग", te: "వ్యాధులు" },
  
  // Features
  whyChoose: { en: "Why Choose AICDD", hi: "AICDD क्यों चुनें", te: "AICDD ఎందుకు ఎంచుకోవాలి" },
  advancedTech: { en: "Advanced AI technology designed for farmers and researchers", hi: "किसानों और शोधकर्ताओं के लिए डिज़ाइन की गई उन्नत AI तकनीक", te: "రైతులు మరియు పరిశోధకుల కోసం రూపొందించబడిన అధునాతన AI సాంకేతికత" },
  aiPowered: { en: "AI-Powered CNN", hi: "AI-संचालित CNN", te: "AI-శక్తివంతమైన CNN" },
  aiPoweredDesc: { en: "Deep learning Convolutional Neural Networks trained on thousands of plant disease images", hi: "हजारों पौधों की बीमारी छवियों पर प्रशिक्षित डीप लर्निंग कन्वोल्यूशनल न्यूरल नेटवर्क", te: "వేలాది మొక్కల వ్యాధి చిత్రాలపై శిక్షణ పొందిన డీప్ లెర్నింగ్ కన్వల్యూషనల్ న్యూరల్ నెట్‌వర్క్‌లు" },
  realTime: { en: "Real-Time Detection", hi: "रियल-टाइम डिटेक्शन", te: "రియల్-టైమ్ గుర్తింపు" },
  realTimeDesc: { en: "Upload a leaf photo and get instant disease identification within seconds", hi: "एक पत्ती की फोटो अपलोड करें और सेकंडों में तत्काल रोग पहचान प्राप्त करें", te: "ఒక ఆకు ఫోటో అప్‌లోడ్ చేసి సెకన్లలో తక్షణ వ్యాధి గుర్తింపు పొందండి" },
  highAccuracy: { en: "95%+ Accuracy", hi: "95%+ सटीकता", te: "95%+ ఖచ్చితత్వం" },
  highAccuracyDesc: { en: "Industry-leading accuracy across 50+ crop diseases including blight, rust, and leaf spot", hi: "ब्लाइट, रस्ट और लीफ स्पॉट सहित 50+ फसल रोगों में उद्योग-अग्रणी सटीकता", te: "బ్లైట్, రస్ట్ మరియు లీఫ్ స్పాట్‌తో సహా 50+ పంట వ్యాధులలో పరిశ్రమ-ప్రముఖ ఖచ్చితత్వం" },
  treatment: { en: "Treatment Advice", hi: "उपचार सलाह", te: "చికిత్స సలహా" },
  treatmentDesc: { en: "Receive detailed remedies, prevention tips, and sustainable farming recommendations", hi: "विस्तृत उपचार, रोकथाम युक्तियां और टिकाऊ खेती की सिफारिशें प्राप्त करें", te: "వివరణాత్మక చికిత్సలు, నివారణ చిట్కాలు మరియు స్థిరమైన వ్యవసాయ సిफార్సులు పొందండి" },
  
  // How It Works
  howItWorks: { en: "How It Works", hi: "यह कैसे काम करता है", te: "ఇది ఎలా పనిచేస్తుంది" },
  threeSteps: { en: "Three simple steps to diagnose crop diseases with AI", hi: "AI के साथ फसल रोगों का निदान करने के तीन सरल चरण", te: "AI తో పంట వ్యాధులను నిర్ధారించడానికి మూడు సులభ దశలు" },
  uploadLeaf: { en: "Upload Leaf Image", hi: "पत्ती की छवि अपलोड करें", te: "ఆకు చిత్రం అప్‌లోడ్ చేయండి" },
  uploadDesc: { en: "Take or upload a clear photo of the crop leaf showing disease symptoms. Works with any device - phone, tablet, or computer.", hi: "रोग के लक्षण दिखाने वाली फसल की पत्ती की स्पष्ट तस्वीर लें या अपलोड करें। किसी भी डिवाइस - फोन, टैबलेट या कंप्यूटर के साथ काम करता है।", te: "వ్యాధి లక్షణాలను చూపించే పంట ఆకు యొక్క స్పష్టమైన ఫోటో తీసుకోండి లేదా అప్‌లోడ్ చేయండి. ఏదైనా పరికరంతో పనిచేస్తుంది - ఫోన్, టాబ్లెట్ లేదా కంప్యూటర్." },
  aiAnalysis: { en: "AI Analysis", hi: "AI विश्लेषण", te: "AI విశ్లేషణ" },
  aiAnalysisDesc: { en: "Our CNN-based deep learning model instantly analyzes the image using advanced pattern recognition and computer vision.", hi: "हमारा CNN-आधारित डीप लर्निंग मॉडल उन्नत पैटर्न पहचान और कंप्यूटर विज़न का उपयोग करके तुरंत छवि का विश्लेषण करता है।", te: "మా CNN-ఆధారిత డీప్ లెర్నింగ్ మోడల్ అధునాతన నమూనా గుర్తింపు మరియు కంప్యూటర్ విజన్‌ను ఉపయోగించి తక్షణమే చిత్రాన్ని విశ్లేషిస్తుంది." },
  getResults: { en: "Get Results & Solutions", hi: "परिणाम और समाधान प्राप्त करें", te: "ఫలితాలు & పరిష్కారాలు పొందండి" },
  getResultsDesc: { en: "Receive disease name, confidence score, detailed symptoms, and proven treatment recommendations for your crops.", hi: "अपनी फसलों के लिए रोग का नाम, विश्वास स्कोर, विस्तृत लक्षण और सिद्ध उपचार सिफारिशें प्राप्त करें।", te: "మీ పంటల కోసం వ్యాధి పేరు, విశ్వాస స్కోరు, వివరణాత్మక లక్షణాలు మరియు నిరూపితమైన చికిత్స సిఫార్సులు పొందండి." },
  
  // CTA
  startToday: { en: "Start Detecting Diseases Today", hi: "आज ही रोगों का पता लगाना शुरू करें", te: "ఈరోజే వ్యాధులను గుర్తించడం ప్రారంభించండి" },
  joinFarmers: { en: "Join farmers, students, and researchers worldwide using AI to protect crops and promote sustainable agriculture", hi: "फसलों की रक्षा करने और टिकाऊ कृषि को बढ़ावा देने के लिए AI का उपयोग करने वाले दुनिया भर के किसानों, छात्रों और शोधकर्ताओं से जुड़ें", te: "పంటలను రక్షించడానికి మరియు స్థిరమైన వ్యవసాయాన్ని ప్రోత్సహించడానికి AI ఉపయోగిస్తున్న ప్రపంచవ్యాప్తంగా రైతులు, విద్యార్థులు మరియు పరిశోధకులతో చేరండి" },
  startFree: { en: "Start Free Detection", hi: "मुफ्त डिटेक्शन शुरू करें", te: "ఉచిత గుర్తింపు ప్రారంభించండి" },
  
  // Footer
  about: { en: "About", hi: "हमारे बारे में", te: "గురించి" },
  contact: { en: "Contact", hi: "संपर्क करें", te: "సంప్రదించండి" },
  login: { en: "Login", hi: "लॉगिन", te: "లాగిన్" },
  privacy: { en: "Privacy", hi: "गोपनीयता", te: "గోప్యత" },
  
  // Dashboard
  welcome: { en: "Welcome to Your Dashboard", hi: "अपने डैशबोर्ड में आपका स्वागत है", te: "మీ డాష్‌బోర్డ్‌కు స్వాగతం" },
  welcomeDesc: { en: "Upload a clear image of a crop leaf to detect diseases and receive instant treatment recommendations", hi: "रोगों का पता लगाने और तत्काल उपचार सिफारिशें प्राप्त करने के लिए फसल की पत्ती की स्पष्ट छवि अपलोड करें", te: "వ్యాధులను గుర్తించడానికి మరియు తక్షణ చికిత్స సిఫార్సులు పొందడానికి పంట ఆకు యొక్క స్పష్టమైన చిత్రాన్ని అప్‌లోడ్ చేయండి" },
  uploadLeafImage: { en: "Upload Leaf Image", hi: "पत्ती की छवि अपलोड करें", te: "ఆకు చిత్రం అప్‌లోడ్ చేయండి" },
  takePhoto: { en: "Take a well-lit, clear photo of the affected leaf for most accurate results", hi: "सबसे सटीक परिणामों के लिए प्रभावित पत्ती की अच्छी रोशनी वाली, स्पष्ट तस्वीर लें", te: "అత్యంత ఖచ్చితమైన ఫలితాల కోసం ప్రభావిత ఆకు యొక్క మంచి వెలుతురు, స్పష్టమైన ఫోటో తీసుకోండి" },
  clickUpload: { en: "Click to upload or drag and drop", hi: "अपलोड करने के लिए क्लिक करें या ड्रैग और ड्रॉप करें", te: "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా డ్రాగ్ మరియు డ్రాప్ చేయండి" },
  analyzing: { en: "AI is analyzing your image...", hi: "AI आपकी छवि का विश्लेषण कर रहा है...", te: "AI మీ చిత్రాన్ని విశ్లేషిస్తోంది..." },
  detectionResults: { en: "Detection Results", hi: "डिटेक्शन परिणाम", te: "గుర్తింపు ఫలితాలు" },
  status: { en: "Status", hi: "स्थिति", te: "స్థితి" },
  healthy: { en: "Healthy", hi: "स्वस्थ", te: "ఆరోగ్యకరమైన" },
  diseaseDetected: { en: "Disease Detected", hi: "रोग का पता चला", te: "వ్యాధి గుర్తించబడింది" },
  diseaseType: { en: "Disease Type", hi: "रोग का प्रकार", te: "వ్యాధి రకం" },
  confidenceLevel: { en: "Confidence Level", hi: "विश्वास स्तर", te: "విశ్వాస స్థాయి" },
  recommendedTreatment: { en: "Recommended Treatment", hi: "अनुशंसित उपचार", te: "సిఫార్సు చేయబడిన చికిత్స" },
  history: { en: "History", hi: "इतिहास", te: "చరిత్ర" },
  logout: { en: "Logout", hi: "लॉगआउट", te: "లాగ్అవుట్" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language") as Language;
    return stored || "en";
  });

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
