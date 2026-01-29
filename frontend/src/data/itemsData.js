// src/data/itemsData.js

// 4 Different Professional Placeholder Images
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=1000&auto=format&fit=crop", // 1. Main View (Industrial/Elec)
  "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000&auto=format&fit=crop", // 2. Detail Shot
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1000&auto=format&fit=crop", // 3. Perspective (Switch/Socket)
  "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1000&auto=format&fit=crop"  // 4. In-situ (Home)
];

// Helper to generate dummy reviews
const generateReviews = (count) => {
  const users = ["Rahul S.", "Amit K.", "Priya D.", "Sneha W.", "Vikram S.", "Anjali M.", "Rohan G.", "Kavita R."];
  const comments = [
    "Excellent product, matches the description perfectly.",
    "Good quality for the price. Fast delivery.",
    "Works well, but the installation was a bit tricky.",
    "Amazing build quality! Highly recommended.",
    "Value for money product. Will buy again.",
    "Sturdy and durable. Fits my requirement.",
    "Packaging was good, item received in perfect condition."
  ];
  
  return Array.from({ length: Math.max(1, count) }, (_, i) => ({
    id: i,
    user: users[i % users.length],
    rating: Math.floor(Math.random() * 2) + 4, // Random 4 or 5 stars
    comment: comments[i % comments.length],
    date: `${Math.floor(Math.random() * 10) + 1} days ago`
  }));
};

export const categories = [
  "All",
  "LED Lighting",
  "Switchgear",
  "Switches & Sockets",
  "Fans",
  "Distribution Boards",
  "Smart Home",
  "Industrial",
  "Outdoor Lighting"
];

export const itemsData = [
  // ==========================================
  // GOLDMEDAL LED LIGHTING
  // ==========================================

  // --- TORRO (Inbuilt Driver) ---
  { id: "GL9C0203104", name: "Torro LED Panel 4W", category: "LED Lighting", brand: "Goldmedal", price: 310, wattage: "4W", details: "Slim LED panel with inbuilt driver technology.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(5), specifications: { "Dimensions": "86x30mm", "Shape": "Round", "Driver": "Inbuilt", "Warranty": "2 Years" } },
  { id: "GL9C0203108", name: "Torro LED Panel 8W", category: "LED Lighting", brand: "Goldmedal", price: 440, wattage: "8W", details: "High brightness 8W panel, ideal for corridors.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(3), specifications: { "Dimensions": "120x30mm", "Shape": "Round", "Driver": "Inbuilt", "Warranty": "2 Years" } },
  { id: "GL9C0203112", name: "Torro LED Panel 12W", category: "LED Lighting", brand: "Goldmedal", price: 680, wattage: "12W", details: "Standard 12W ceiling panel with uniform light.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(8), specifications: { "Dimensions": "170x30mm", "Shape": "Round", "Driver": "Inbuilt", "Warranty": "2 Years" } },
  { id: "GL9C0203115", name: "Torro LED Panel 15W", category: "LED Lighting", brand: "Goldmedal", price: 700, wattage: "15W", details: "15W powerful LED panel for general lighting.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(4), specifications: { "Dimensions": "170x30mm", "Shape": "Round", "Driver": "Inbuilt", "Warranty": "2 Years" } },
  { id: "GL9C0203118", name: "Torro LED Panel 18W", category: "LED Lighting", brand: "Goldmedal", price: 845, wattage: "18W", details: "High-power 18W panel for living rooms.", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(10), specifications: { "Dimensions": "190x30mm", "Shape": "Round", "Driver": "Inbuilt", "Warranty": "2 Years" } },

  // --- GEOLITE (Round/Square) ---
  { id: "GL91256", name: "Geolite Round Panel 3W", category: "LED Lighting", brand: "Goldmedal", price: 310, wattage: "3W", details: "Compact 3W round panel for accent lighting.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(2), specifications: { "Shape": "Round", "Type": "Geolite", "Mounting": "Recessed" } },
  { id: "GL91257", name: "Geolite Round Panel 6W", category: "LED Lighting", brand: "Goldmedal", price: 440, wattage: "6W", details: "6W Round panel for accent lighting.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(4), specifications: { "Shape": "Round", "Type": "Geolite", "Mounting": "Recessed" } },
  { id: "GL91259", name: "Geolite Round Panel 15W", category: "LED Lighting", brand: "Goldmedal", price: 990, wattage: "15W", details: "Bright 15W round panel, energy efficient.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(6), specifications: { "Shape": "Round", "Type": "Geolite", "Mounting": "Recessed" } },
  { id: "GL9C0203204", name: "Geolite Square Panel 4W", category: "LED Lighting", brand: "Goldmedal", price: 310, wattage: "4W", details: "Modern 4W square panel design.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(3), specifications: { "Shape": "Square", "Type": "Geolite", "Mounting": "Recessed" } },
  { id: "GL9C0203212", name: "Geolite Square Panel 12W", category: "LED Lighting", brand: "Goldmedal", price: 680, wattage: "12W", details: "12W Square panel, fits standard grid ceilings.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(7), specifications: { "Shape": "Square", "Type": "Geolite", "Mounting": "Recessed" } },

  // --- QUORO (External Driver) ---
  { id: "GL9C0204104", name: "Quoro Round Panel 4W", category: "LED Lighting", brand: "Goldmedal", price: 390, wattage: "4W", details: "Premium panel with external driver for long life.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(4), specifications: { "Driver": "External", "Shape": "Round", "Series": "Quoro" } },
  { id: "GL9C0204112", name: "Quoro Round Panel 12W", category: "LED Lighting", brand: "Goldmedal", price: 705, wattage: "12W", details: "12W Round panel with external driver reliability.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(5), specifications: { "Driver": "External", "Shape": "Round", "Series": "Quoro" } },
  { id: "GL9C0204212", name: "Quoro Square Panel 12W", category: "LED Lighting", brand: "Goldmedal", price: 775, wattage: "12W", details: "12W Square panel with external driver.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(3), specifications: { "Driver": "External", "Shape": "Square", "Series": "Quoro" } },

  // --- ZOLO (Dual Color) ---
  { id: "GL91283", name: "Zolo Dual Color 3W+3W", category: "LED Lighting", brand: "Goldmedal", price: 430, wattage: "6W", details: "Dual color slim panel (White + Warm White).", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(12), specifications: { "Type": "Dual Color", "Driver": "Inbuilt", "Mode": "Switch Controlled" } },
  { id: "GL91285", name: "Zolo Dual Color 12W+12W", category: "LED Lighting", brand: "Goldmedal", price: 945, wattage: "24W", details: "High brightness dual color panel.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(9), specifications: { "Type": "Dual Color", "Driver": "Inbuilt", "Mode": "Switch Controlled" } },

  // --- TODOS ---
  { id: "GL91240", name: "Todos Panel 3W", category: "LED Lighting", brand: "Goldmedal", price: 280, wattage: "3W", details: "Affordable 3W panel.", images: PRODUCT_IMAGES, rating: 4.2, reviews: generateReviews(2), specifications: { "Driver": "External", "Shape": "Round", "Series": "Todos" } },
  { id: "GL91242", name: "Todos Panel 10W", category: "LED Lighting", brand: "Goldmedal", price: 580, wattage: "10W", details: "Affordable 10W panel.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(4), specifications: { "Driver": "External", "Shape": "Round", "Series": "Todos" } },
  { id: "GL91244", name: "Todos Panel 20W", category: "LED Lighting", brand: "Goldmedal", price: 1050, wattage: "20W", details: "High power 20W Todos panel.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(6), specifications: { "Driver": "External", "Shape": "Round", "Series": "Todos" } },

  // --- ZION (Adjustable) ---
  { id: "GL91273", name: "Zion Adjustable Panel 12W", category: "LED Lighting", brand: "Goldmedal", price: 775, wattage: "12W", details: "Adjustable cutout LED panel.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(5), specifications: { "Feature": "Adjustable Cutout", "Wattage": "12W" } },
  { id: "GL91276", name: "Zion Adjustable Panel 24W", category: "LED Lighting", brand: "Goldmedal", price: 1560, wattage: "24W", details: "Large adjustable cutout panel.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(4), specifications: { "Feature": "Adjustable Cutout", "Wattage": "24W" } },

  // --- DOWNLIGHTS ---
  { id: "GL91318", name: "Apollo Downlight 10W", category: "LED Lighting", brand: "Goldmedal", price: 780, wattage: "10W", details: "PDC Aluminium body downlight.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(6), specifications: { "Body": "PDC Aluminium", "Type": "Downlight", "Series": "Apollo" } },
  { id: "GL91348", name: "Ola Detachable Downlight 6W", category: "LED Lighting", brand: "Goldmedal", price: 560, wattage: "6W", details: "Innovative detachable design.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(8), specifications: { "Feature": "Detachable", "Type": "Downlight", "Series": "Ola" } },
  { id: "GL91333", name: "Wella Downlight 6W", category: "LED Lighting", brand: "Goldmedal", price: 510, wattage: "6W", details: "Sleek Wella downlight.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(3), specifications: { "Series": "Wella", "Type": "Downlight" } },
  { id: "GL91363", name: "Glazz Downlight 5W", category: "LED Lighting", brand: "Goldmedal", price: 310, wattage: "5W", details: "Glass finish decorative downlight.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(5), specifications: { "Finish": "Glass", "Type": "Downlight", "Series": "Glazz" } },

  // --- SPOTLIGHTS ---
  { id: "GL9C2302107BK", name: "Evo COB Module 7W", category: "LED Lighting", brand: "Goldmedal", price: 730, wattage: "7W", details: "COB Module for Gio series rings. Black finish.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(3), specifications: { "Type": "COB Module", "Color": "Black", "Compatible With": "Gio Rings" } },
  { id: "GL9C0704107", name: "Divine COB Spotlight 7W", category: "LED Lighting", brand: "Goldmedal", price: 945, wattage: "7W", details: "Premium COB spotlight with focused beam.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(5), specifications: { "Type": "Spotlight", "Source": "COB", "Series": "Divine" } },
  { id: "GL91600", name: "G-Tilt COB Downlight 3W", category: "LED Lighting", brand: "Goldmedal", price: 550, wattage: "3W", details: "Tiltable COB downlight.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(4), specifications: { "Feature": "Tiltable", "Source": "COB", "Series": "G-Tilt" } },
  { id: "GL91926", name: "Orbix COB Spotlight 3W", category: "LED Lighting", brand: "Goldmedal", price: 565, wattage: "3W", details: "Deep recessed COB spotlight.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(3), specifications: { "Type": "Deep Recessed", "Source": "COB", "Series": "Orbix" } },

  // --- LINEAR & BATTENS ---
  { id: "GL9C0716506BK", name: "Loofix Linear 6W", category: "LED Lighting", brand: "Goldmedal", price: 1350, wattage: "6W", details: "Architectural linear lighting solution.", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(2), specifications: { "Shape": "Linear", "Finish": "Black", "Series": "Loofix" } },
  { id: "GL90880", name: "G-Brix Linear 3W", category: "LED Lighting", brand: "Goldmedal", price: 815, wattage: "3W", details: "Linear brick light.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(3), specifications: { "Shape": "Linear", "Series": "G-Brix" } },
  { id: "GL9C2001608", name: "Goldmedal Batten 8W", category: "LED Lighting", brand: "Goldmedal", price: 715, wattage: "8W", details: "2 Feet LED Batten.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(10), specifications: { "Size": "2 Feet", "Type": "Batten", "Mounting": "Surface" } },
  { id: "GL91030", name: "Goldmedal LED Lamp 5W", category: "LED Lighting", brand: "Goldmedal", price: 135, wattage: "5W", details: "Standard LED bulb.", images: PRODUCT_IMAGES, rating: 4.2, reviews: generateReviews(15), specifications: { "Base": "B22", "Type": "Bulb" } },

  // ==========================================
  // SCHNEIDER ELECTRIC - SWITCHGEAR
  // ==========================================
  { id: "EZ9F76106", name: "Easy9 MCB 1-Pole 6A", category: "Switchgear", brand: "Schneider Electric", price: 253, details: "Schneider Easy9 MCB 1P 6A C-Curve.", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(15), specifications: { "Poles": "1 Pole", "Current": "6A", "Breaking Capacity": "6kA" } },
  { id: "EZ9F76132", name: "Easy9 MCB 1-Pole 32A", category: "Switchgear", brand: "Schneider Electric", price: 253, details: "Schneider Easy9 MCB 1P 32A C-Curve.", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(8), specifications: { "Poles": "1 Pole", "Current": "32A", "Breaking Capacity": "6kA" } },
  { id: "EZ9F76140", name: "Easy9 MCB 1-Pole 40A", category: "Switchgear", brand: "Schneider Electric", price: 579, details: "Schneider Easy9 MCB 1P 40A C-Curve.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(6), specifications: { "Poles": "1 Pole", "Current": "40A", "Breaking Capacity": "6kA" } },
  { id: "EZ9F76206", name: "Easy9 MCB 2-Pole 6A", category: "Switchgear", brand: "Schneider Electric", price: 943, details: "Double Pole MCB for main protection.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(5), specifications: { "Poles": "2 Pole", "Current": "6A", "Breaking Capacity": "6kA" } },
  { id: "EZ9F76332", name: "Easy9 MCB 3-Pole 32A", category: "Switchgear", brand: "Schneider Electric", price: 1465, details: "Three Pole MCB for 3-phase applications.", images: PRODUCT_IMAGES, rating: 5.0, reviews: generateReviews(4), specifications: { "Poles": "3 Pole", "Current": "32A", "Breaking Capacity": "6kA" } },
  { id: "EZ9R35225", name: "Easy9 RCCB 2-Pole 25A", category: "Switchgear", brand: "Schneider Electric", price: 3775, details: "Residual Current Circuit Breaker.", images: PRODUCT_IMAGES, rating: 5.0, reviews: generateReviews(6), specifications: { "Poles": "2 Pole", "Current": "25A", "Sensitivity": "30mA" } },
  { id: "EZ9R35440", name: "Easy9 RCCB 4-Pole 40A", category: "Switchgear", brand: "Schneider Electric", price: 5028, details: "4 Pole RCCB for 3-phase shock protection.", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(3), specifications: { "Poles": "4 Pole", "Current": "40A", "Sensitivity": "30mA" } },

  // --- SCHNEIDER - DBs ---
  { id: "EZ9ESND04", name: "Easy9 SPN DB 4 Way", category: "Distribution Boards", brand: "Schneider Electric", price: 2243, details: "Single Door SPN Distribution Board.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(5), specifications: { "Ways": "4 Way", "Door": "Single", "Type": "SPN" } },
  { id: "EZ9ESND12", name: "Easy9 SPN DB 12 Way", category: "Distribution Boards", brand: "Schneider Electric", price: 3041, details: "Double Door Metal SPN DB.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(7), specifications: { "Ways": "12 Way", "Door": "Double Metal", "Type": "SPN" } },
  { id: "EZ9ETND06", name: "Easy9 TPN DB 6 Way", category: "Distribution Boards", brand: "Schneider Electric", price: 6490, details: "TPN Distribution Board for 3-phase.", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(2), specifications: { "Ways": "6 Way", "Door": "Double", "Type": "TPN" } },

  // --- SCHNEIDER - WIRING DEVICES ---
  { id: "P1001", name: "Livia 1 Way Switch 10AX", category: "Switches & Sockets", brand: "Schneider Electric", price: 145, details: "Anti-Bacterial Range, White Finish.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(20), specifications: { "Range": "Livia", "Current": "10AX", "Function": "1 Way" } },
  { id: "P2005NS", name: "Livia 6A 3-Pin Socket", category: "Switches & Sockets", brand: "Schneider Electric", price: 289, details: "3-Pin Socket with safety shutter.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(15), specifications: { "Range": "Livia", "Current": "6A", "Shutter": "Yes" } },
  { id: "P3004", name: "Livia Dimmer 400W", category: "Switches & Sockets", brand: "Schneider Electric", price: 1629, details: "Fan/Light Dimmer.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(5), specifications: { "Range": "Livia", "Power": "400W" } },
  { id: "MZSW101M1W_WH", name: "Miluz ZeTa 10A Switch", category: "Switches & Sockets", brand: "Schneider Electric", price: 150, details: "Modular switch, modern design.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(10), specifications: { "Range": "Miluz ZeTa", "Current": "10A" } },
  { id: "IN8401", name: "Zencelo 6AX 1 Way Switch", category: "Switches & Sockets", brand: "Schneider Electric", price: 451, details: "Full-Flat Switch mechanism.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(12), specifications: { "Range": "Zencelo", "Current": "6AX", "Feature": "Full-Flat" } },
  { id: "IN8426UNS", name: "Zencelo 6A 3 Pin Socket", category: "Switches & Sockets", brand: "Schneider Electric", price: 745, details: "Full-Flat socket with shutter.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(8), specifications: { "Range": "Zencelo", "Current": "6A", "Feature": "Full-Flat" } },
  { id: "X1001WH", name: "Opale 6AX Switch", category: "Switches & Sockets", brand: "Schneider Electric", price: 262, details: "Satin Finish Switch.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(6), specifications: { "Range": "Opale", "Finish": "Satin" } },
  { id: "E8331L1_WE_G8", name: "AvatarOn 16AX Switch", category: "Switches & Sockets", brand: "Schneider Electric", price: 654, details: "Designer customizable switch.", images: PRODUCT_IMAGES, rating: 4.9, reviews: generateReviews(5), specifications: { "Range": "AvatarOn", "Design": "Frameless" } },

  // --- SCHNEIDER - INDUSTRIAL/OUTDOOR/SMART ---
  { id: "PKE16M423", name: "PratiKa Plug 16A", category: "Industrial", brand: "Schneider Electric", price: 678, details: "Industrial Plug 16A 2P+E IP44.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(3), specifications: { "Range": "PratiKa", "Current": "16A", "IP Rating": "IP44" } },
  { id: "PKF32W435", name: "PratiKa Socket 32A", category: "Industrial", brand: "Schneider Electric", price: 1985, details: "Wall Mount Industrial Socket.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(2), specifications: { "Range": "PratiKa", "Current": "32A", "IP Rating": "IP44" } },
  { id: "56SW110LE-GY", name: "56 Series Switch 10A", category: "Outdoor Lighting", brand: "Schneider Electric", price: 4396, details: "Weatherproof IP66 Outdoor Switch.", images: PRODUCT_IMAGES, rating: 5.0, reviews: generateReviews(2), specifications: { "Range": "56 Series", "IP Rating": "IP66" } },
  { id: "CS16A1MSW_WE", name: "Wiser 16A Connected Switch", category: "Smart Home", brand: "Schneider Electric", price: 7200, details: "Smart WiFi enabled switch.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(4), specifications: { "Protocol": "Zigbee/WiFi", "Current": "16A", "App": "Wiser" } },
  { id: "CSS54E_WE", name: "Surface Mount PIR Sensor", category: "Smart Home", brand: "Schneider Electric", price: 4099, details: "360 Degree Motion Sensor.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(3), specifications: { "Type": "PIR", "Mounting": "Surface" } },

  // ==========================================
  // GOLDMEDAL FANS
  // ==========================================
  { id: "SCFZ101948", name: "Fabia Super Decorative", category: "Fans", brand: "Goldmedal", price: 3400, wattage: "53W", details: "High speed decorative fan.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(10), specifications: { "Sweep": "1200mm", "Speed": "350 RPM", "Air Delivery": "220 CMM" } },
  { id: "SCFP301050", name: "Hush-Flo BLDC", category: "Fans", brand: "Goldmedal", price: 4200, wattage: "37W", details: "Silent BLDC motor fan with remote.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(18), specifications: { "Sweep": "1240mm", "Motor": "BLDC", "Remote": "Yes" } },
  { id: "SCFP302448", name: "Winzo BLDC", category: "Fans", brand: "Goldmedal", price: 3800, wattage: "34W", details: "Energy saving BLDC fan.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(7), specifications: { "Sweep": "1200mm", "Motor": "BLDC" } },
  { id: "SCFP301948", name: "Opus Prime BLDC", category: "Fans", brand: "Goldmedal", price: 4000, wattage: "30W", details: "Premium BLDC fan.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(5), specifications: { "Sweep": "1200mm", "Motor": "BLDC" } },
  { id: "SCFP302248", name: "Tavola Decorative", category: "Fans", brand: "Goldmedal", price: 2900, wattage: "53W", details: "Stylish decorative fan.", images: PRODUCT_IMAGES, rating: 4.2, reviews: generateReviews(5), specifications: { "Sweep": "1200mm", "Speed": "370 RPM" } },
  { id: "SCFS501548", name: "Airavat Dlx", category: "Fans", brand: "Goldmedal", price: 2100, wattage: "53W", details: "Deluxe standard fan.", images: PRODUCT_IMAGES, rating: 4.1, reviews: generateReviews(12), specifications: { "Sweep": "1200mm", "Speed": "350 RPM" } },
  { id: "SCFS502248", name: "Mayra Classic", category: "Fans", brand: "Goldmedal", price: 2300, wattage: "52W", details: "Classic look ceiling fan.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(8), specifications: { "Sweep": "1200mm", "Speed": "350 RPM" } },
  { id: "SCFS501248", name: "Airavat Standard", category: "Fans", brand: "Goldmedal", price: 1800, wattage: "53W", details: "Robust standard fan.", images: PRODUCT_IMAGES, rating: 4.1, reviews: generateReviews(25), specifications: { "Sweep": "1200mm", "Speed": "350 RPM" } },
  { id: "SCFS500748", name: "Marut BLDC", category: "Fans", brand: "Goldmedal", price: 2600, wattage: "30W", details: "Affordable BLDC fan.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(15), specifications: { "Sweep": "1200mm", "Motor": "BLDC" } },
  { id: "PFP300316", name: "Speedo-X Pedestal", category: "Fans", brand: "Goldmedal", price: 3100, wattage: "130W", details: "High speed pedestal fan.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(8), specifications: { "Sweep": "400mm", "Speed": "2350 RPM", "Type": "Pedestal" } },
  { id: "AFP700606", name: "Environ BLDC Exhaust", category: "Fans", brand: "Goldmedal", price: 1200, wattage: "5W", details: "Low power exhaust fan.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(4), specifications: { "Sweep": "150mm", "Speed": "2300 RPM", "Type": "Exhaust" } },

  // ==========================================
  // PANASONIC LIGHTING
  // ==========================================
  { id: "PAN-5W-BULB", name: "Dura Saver Bulb 5W", category: "LED Lighting", brand: "Panasonic", price: 110, wattage: "5W", details: "B22 Base LED Bulb.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(30), specifications: { "Base": "B22", "CCT": "6500K", "Type": "Bulb" } },
  { id: "PAN-12W-BULB", name: "Dura Saver Bulb 12W", category: "LED Lighting", brand: "Panasonic", price: 200, wattage: "12W", details: "Bright 12W LED Bulb.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(20), specifications: { "Base": "B22", "CCT": "6500K", "Type": "Bulb" } },
  { id: "PAN-23W-BULB", name: "Dura Max Bulb 23W", category: "LED Lighting", brand: "Panasonic", price: 520, wattage: "23W", details: "High wattage LED Bulb.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(10), specifications: { "Base": "B22", "Type": "High Watt Bulb" } },
  { id: "PAN-SMART-9.5", name: "Panasonic Smart WiFi Bulb", category: "Smart Home", brand: "Panasonic", price: 1999, wattage: "9.5W", details: "Smart RGB bulb (Alexa/Google).", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(12), specifications: { "Connectivity": "WiFi", "Color": "RGB+CCT", "Music Sync": "Yes" } },
  { id: "PAN-IGNITOS-10W", name: "Ignitos Modan Panel 10W", category: "LED Lighting", brand: "Panasonic", price: 670, wattage: "10W", details: "Slim step panel.", images: PRODUCT_IMAGES, rating: 4.4, reviews: generateReviews(5), specifications: { "Cut Out": "132mm", "Shape": "Round", "Series": "Ignitos" } },
  { id: "PAN-PC-15W", name: "PC Panel 15W", category: "LED Lighting", brand: "Panasonic", price: 700, wattage: "15W", details: "Integrated driver panel.", images: PRODUCT_IMAGES, rating: 4.2, reviews: generateReviews(6), specifications: { "Driver": "Integrated", "Shape": "Round" } },
  { id: "PAN-RIMLESS-12W", name: "Rimless Surface Panel 12W", category: "LED Lighting", brand: "Panasonic", price: 850, wattage: "12W", details: "Rimless surface mount panel.", images: PRODUCT_IMAGES, rating: 4.6, reviews: generateReviews(4), specifications: { "Mounting": "Surface", "Design": "Rimless" } },
  { id: "PAN-LUMOR-10W", name: "Lumor Anora Downlight 10W", category: "LED Lighting", brand: "Panasonic", price: 500, wattage: "10W", details: "Efficient LED downlight.", images: PRODUCT_IMAGES, rating: 4.3, reviews: generateReviews(7), specifications: { "Series": "Lumor Anora", "Type": "Downlight" } },
  { id: "PAN-BATTEN-20W", name: "Altabright Batten 20W", category: "LED Lighting", brand: "Panasonic", price: 560, wattage: "20W", details: "4 Feet high lumen batten.", images: PRODUCT_IMAGES, rating: 4.5, reviews: generateReviews(15), specifications: { "Length": "4 Feet", "Type": "Batten" } },
  { id: "PAN-FLOOD-50W", name: "Panasonic Flood Light 50W", category: "Outdoor Lighting", brand: "Panasonic", price: 2500, wattage: "50W", details: "IP65 Waterproof flood light.", images: PRODUCT_IMAGES, rating: 4.8, reviews: generateReviews(3), specifications: { "IP Rating": "IP65", "Type": "Flood Light" } },
  { id: "PAN-STREET-25W", name: "Panasonic Street Light 25W", category: "Outdoor Lighting", brand: "Panasonic", price: 2250, wattage: "25W", details: "LED Street light.", images: PRODUCT_IMAGES, rating: 4.7, reviews: generateReviews(2), specifications: { "IP Rating": "IP65", "Type": "Street Light" } }
];