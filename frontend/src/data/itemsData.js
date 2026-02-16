// src/data/itemsData.js

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

// Helper to resolve images from src/assets/Bishnupriya Images
const getImg = (filename) => {
  return new URL(`../assets/Bishnupriya Images/${filename}`, import.meta.url).href;
};

export const itemsData = [
  // 1. Panasonic Street Light 25W
  { 
    id: "PAN-STREET-25W", 
    name: "Panasonic Street Light 25W", 
    category: "Outdoor Lighting", 
    brand: "Panasonic", 
    price: 2250, 
    wattage: "25W", 
    details: "LED Street light.", 
    image: getImg("Panasonic Street Light 25W.jpg"), 
    rating: 4.7, 
    reviews: generateReviews(2), 
    specifications: { "IP Rating": "IP65", "Type": "Street Light" } 
  },
  
  // 2. Dura Max Bulb 23W
  { 
    id: "PAN-23W-BULB", 
    name: "Dura Max Bulb 23W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 520, 
    wattage: "23W", 
    details: "High wattage LED Bulb.", 
    image: getImg("Dura Max Bulb 23W.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(10), 
    specifications: { "Base": "B22", "Type": "High Watt Bulb" } 
  },
  
  // 3. Panasonic Smart WiFi Bulb
  { 
    id: "PAN-SMART-9.5", 
    name: "Panasonic Smart WiFi Bulb", 
    category: "Smart Home", 
    brand: "Panasonic", 
    price: 1999, 
    wattage: "9.5W", 
    details: "Smart RGB bulb (Alexa/Google).", 
    image: getImg("Panasonic Smart WiFi Bulb.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(12), 
    specifications: { "Connectivity": "WiFi", "Color": "RGB+CCT", "Music Sync": "Yes" } 
  },
  
  // 4. Ignitos Modan Panel 10W
  { 
    id: "PAN-IGNITOS-10W", 
    name: "Ignitos Modan Panel 10W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 670, 
    wattage: "10W", 
    details: "Slim step panel.", 
    image: getImg("Ignitos Modan Panel 10W.webp"), 
    rating: 4.4, 
    reviews: generateReviews(5), 
    specifications: { "Cut Out": "132mm", "Shape": "Round", "Series": "Ignitos" } 
  },
  
  // 5. PC Panel 15W
  { 
    id: "PAN-PC-15W", 
    name: "PC Panel 15W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 700, 
    wattage: "15W", 
    details: "Integrated driver panel.", 
    image: getImg("PC Panel 15W.jpg"), 
    rating: 4.2, 
    reviews: generateReviews(6), 
    specifications: { "Driver": "Integrated", "Shape": "Round" } 
  },
  
  // 6. Rimless Surface Panel 12W
  { 
    id: "PAN-RIMLESS-12W", 
    name: "Rimless Surface Panel 12W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 850, 
    wattage: "12W", 
    details: "Rimless surface mount panel.", 
    image: getImg("Rimless Surface Panel 12W.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(4), 
    specifications: { "Mounting": "Surface", "Design": "Rimless" } 
  },
  
  // 7. Lumor Anora Downlight 10W
  { 
    id: "PAN-LUMOR-10W", 
    name: "Lumor Anora Downlight 10W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 500, 
    wattage: "10W", 
    details: "Efficient LED downlight.", 
    image: getImg("Lumor Anora Downlight 10W.jpg"), 
    rating: 4.3, 
    reviews: generateReviews(7), 
    specifications: { "Series": "Lumor Anora", "Type": "Downlight" } 
  },
  
  // 8. Altabright Batten 20W
  { 
    id: "PAN-BATTEN-20W", 
    name: "Altabright Batten 20W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 560, 
    wattage: "20W", 
    details: "4 Feet high lumen batten.", 
    image: getImg("Altabright Batten 20W.webp"), 
    rating: 4.5, 
    reviews: generateReviews(15), 
    specifications: { "Length": "4 Feet", "Type": "Batten" } 
  },
  
  // 9. Panasonic Flood Light 50W
  { 
    id: "PAN-FLOOD-50W", 
    name: "Panasonic Flood Light 50W", 
    category: "Outdoor Lighting", 
    brand: "Panasonic", 
    price: 2500, 
    wattage: "50W", 
    details: "IP65 Waterproof flood light.", 
    image: getImg("Panasonic Flood Light 50W.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(3), 
    specifications: { "IP Rating": "IP65", "Type": "Flood Light" } 
  },
  
  // 10. 56 Series Switch 10A
  { 
    id: "56SW110LE-GY", 
    name: "56 Series Switch 10A", 
    category: "Outdoor Lighting", 
    brand: "Schneider Electric", 
    price: 4396, 
    details: "Weatherproof IP66 Outdoor Switch.", 
    image: getImg("56 Series Switch 10A.jpg"), 
    rating: 5.0, 
    reviews: generateReviews(2), 
    specifications: { "Range": "56 Series", "IP Rating": "IP66" } 
  },
  
  // 11. Easy9 SPN DB 4 Way
  { 
    id: "EZ9ESND04", 
    name: "Easy9 SPN DB 4 Way", 
    category: "Distribution Boards", 
    brand: "Schneider Electric", 
    price: 2243, 
    details: "Single Door SPN Distribution Board.", 
    image: getImg("Easy9 SPN DB 4 Way.jpg"), 
    rating: 4.7, 
    reviews: generateReviews(5), 
    specifications: { "Ways": "4 Way", "Door": "Single", "Type": "SPN" } 
  },
  
  // 12. PratiKa Socket 32A
  { 
    id: "PKF32W435", 
    name: "PratiKa Socket 32A", 
    category: "Industrial", 
    brand: "Schneider Electric", 
    price: 1985, 
    details: "Wall Mount Industrial Socket.", 
    image: getImg("PratiKa Socket 32A.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(2), 
    specifications: { "Range": "PratiKa", "Current": "32A", "IP Rating": "IP44" } 
  },
  
  // 13. PratiKa Plug 16A
  { 
    id: "PKE16M423", 
    name: "PratiKa Plug 16A", 
    category: "Industrial", 
    brand: "Schneider Electric", 
    price: 678, 
    details: "Industrial Plug 16A 2P+E IP44.", 
    image: getImg("PratiKa Plug 16A.webp"), 
    rating: 4.8, 
    reviews: generateReviews(3), 
    specifications: { "Range": "PratiKa", "Current": "16A", "IP Rating": "IP44" } 
  },
  
  // 14. AvatarOn 16AX Switch
  { 
    id: "E8331L1_WE_G8", 
    name: "AvatarOn 16AX Switch", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 654, 
    details: "Designer customizable switch.", 
    image: getImg("AvatarOn 16AX Switch.jpg"), 
    rating: 4.9, 
    reviews: generateReviews(5), 
    specifications: { "Range": "AvatarOn", "Design": "Frameless" } 
  },
  
  // 15. Opale 6AX Switch
  { 
    id: "X1001WH", 
    name: "Opale 6AX Switch", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 262, 
    details: "Satin Finish Switch.", 
    image: getImg("Opale 6AX Switch.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(6), 
    specifications: { "Range": "Opale", "Finish": "Satin" } 
  },
  
  // 16. Zencelo 6A 3 Pin Socket
  { 
    id: "IN8426UNS", 
    name: "Zencelo 6A 3 Pin Socket", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 745, 
    details: "Full-Flat socket with shutter.", 
    image: getImg("Zencelo 6A 3 Pin Socket.jpg"), 
    rating: 4.7, 
    reviews: generateReviews(8), 
    specifications: { "Range": "Zencelo", "Current": "6A", "Feature": "Full-Flat" } 
  },
  
  // 17. Zencelo 6AX 1 Way Switch
  { 
    id: "IN8401", 
    name: "Zencelo 6AX 1 Way Switch", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 451, 
    details: "Full-Flat Switch mechanism.", 
    image: getImg("Zencelo 6AX 1 Way Switch.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(12), 
    specifications: { "Range": "Zencelo", "Current": "6A", "Feature": "Full-Flat" } 
  },
  
  // 18. Miluz ZeTa 10A Switch
  { 
    id: "MZSW101M1W_WH", 
    name: "Miluz ZeTa 10A Switch", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 150, 
    details: "Modular switch, modern design.", 
    image: getImg("Miluz ZeTa 10A Switch.jpg"), 
    rating: 4.4, 
    reviews: generateReviews(10), 
    specifications: { "Range": "Miluz ZeTa", "Current": "10A" } 
  },
  
  // 19. Livia Dimmer 400W
  { 
    id: "P3004", 
    name: "Livia Dimmer 400W", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 1629, 
    details: "Fan/Light Dimmer.", 
    image: getImg("Livia Dimmer 400W.jpg"), 
    rating: 4.3, 
    reviews: generateReviews(5), 
    specifications: { "Range": "Livia", "Power": "400W" } 
  },
  
  // 20. Livia 6A 3-Pin Socket
  { 
    id: "P2005NS", 
    name: "Livia 6A 3-Pin Socket", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 289, 
    details: "3-Pin Socket with safety shutter.", 
    image: getImg("Livia 6A 3-Pin Socket.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(15), 
    specifications: { "Range": "Livia", "Current": "6A", "Shutter": "Yes" } 
  },
  
  // 21. Livia 1 Way Switch 10AX
  { 
    id: "P1001", 
    name: "Livia 1 Way Switch 10AX", 
    category: "Switches & Sockets", 
    brand: "Schneider Electric", 
    price: 145, 
    details: "Anti-Bacterial Range, White Finish.", 
    image: getImg("Livia 1 Way Switch 10AX.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(20), 
    specifications: { "Range": "Livia", "Current": "10AX", "Function": "1 Way" } 
  },
  
  // 22. Easy9 TPN DB 6 Way
  { 
    id: "EZ9ETND06", 
    name: "Easy9 TPN DB 6 Way", 
    category: "Distribution Boards", 
    brand: "Schneider Electric", 
    price: 6490, 
    details: "TPN Distribution Board for 3-phase.", 
    image: getImg("Easy9 TPN DB 6 Way.jpg"), 
    rating: 4.9, 
    reviews: generateReviews(2), 
    specifications: { "Ways": "6 Way", "Door": "Double", "Type": "TPN" } 
  },
  
  // 23. Easy9 SPN DB 12 Way
  { 
    id: "EZ9ESND12", 
    name: "Easy9 SPN DB 12 Way", 
    category: "Distribution Boards", 
    brand: "Schneider Electric", 
    price: 3041, 
    details: "Double Door Metal SPN DB.", 
    image: getImg("Easy9 SPN DB 12 Way.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(7), 
    specifications: { "Ways": "12 Way", "Door": "Double Metal", "Type": "SPN" } 
  },
  
  // 24. Easy9 RCCB 4-Pole 40A
  { 
    id: "EZ9R35440", 
    name: "Easy9 RCCB 4-Pole 40A", 
    category: "Switchgear", 
    brand: "Schneider Electric", 
    price: 5028, 
    details: "4 Pole RCCB for 3-phase shock protection.", 
    image: getImg("Easy9 RCCB 4-Pole 40A.jpg"), 
    rating: 4.9, 
    reviews: generateReviews(3), 
    specifications: { "Poles": "4 Pole", "Current": "40A", "Sensitivity": "30mA" } 
  },
  
  // 25. Wiser 16A Connected Switch
  { 
    id: "CS16A1MSW_WE", 
    name: "Wiser 16A Connected Switch", 
    category: "Smart Home", 
    brand: "Schneider Electric", 
    price: 7200, 
    details: "Smart WiFi enabled switch.", 
    image: getImg("Wiser 16A Connected Switch.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(4), 
    specifications: { "Protocol": "Zigbee/WiFi", "Current": "16A", "App": "Wiser" } 
  },
  
  // 26. Surface Mount PIR Sensor
  { 
    id: "CSS54E_WE", 
    name: "Surface Mount PIR Sensor", 
    category: "Smart Home", 
    brand: "Schneider Electric", 
    price: 4099, 
    details: "360 Degree Motion Sensor.", 
    image: getImg("Surface Mount PIR Sensor.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(3), 
    specifications: { "Type": "PIR", "Mounting": "Surface" } 
  },
  
  // 27. Fabia Super Decorative
  { 
    id: "SCFZ101948", 
    name: "Fabia Super Decorative", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 3400, 
    wattage: "53W", 
    details: "High speed decorative fan.", 
    image: getImg("Fabia Super Decorative.jpg"), 
    rating: 4.3, 
    reviews: generateReviews(10), 
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM", "Air Delivery": "220 CMM" } 
  },
  
  // 28. Hush-Flo BLDC
  { 
    id: "SCFP301050", 
    name: "Hush-Flo BLDC", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 4200, 
    wattage: "37W", 
    details: "Silent BLDC motor fan with remote.", 
    image: getImg("Hush-Flo BLDC.jpg"), 
    rating: 4.7, 
    reviews: generateReviews(18), 
    specifications: { "Sweep": "1240mm", "Motor": "BLDC", "Remote": "Yes" } 
  },
  
  // 29. Winzo BLDC
  { 
    id: "SCFP302448", 
    name: "Winzo BLDC", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 3800, 
    wattage: "34W", 
    details: "Energy saving BLDC fan.", 
    image: getImg("Winzo BLDC.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(7), 
    specifications: { "Sweep": "1200mm", "Motor": "BLDC" } 
  },
  
  // 30. Opus Prime BLDC
  { 
    id: "SCFP301948", 
    name: "Opus Prime BLDC", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 4000, 
    wattage: "30W", 
    details: "Premium BLDC fan.", 
    image: getImg("Opus Prime BLDC.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(5), 
    specifications: { "Sweep": "1200mm", "Motor": "BLDC" } 
  },
  
  // 31. Tavola Decorative
  { 
    id: "SCFP302248", 
    name: "Tavola Decorative", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 2900, 
    wattage: "53W", 
    details: "Stylish decorative fan.", 
    image: getImg("Tavola Decorative.jpg"), 
    rating: 4.2, 
    reviews: generateReviews(5), 
    specifications: { "Sweep": "1200mm", "Speed": "370 RPM" } 
  },
  
  // 32. Airavat Dlx
  { 
    id: "SCFS501548", 
    name: "Airavat Dlx", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 2100, 
    wattage: "53W", 
    details: "Deluxe standard fan.", 
    image: getImg("Airavat Dlx.jpg"), 
    rating: 4.1, 
    reviews: generateReviews(12), 
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM" } 
  },
  
  // 33. Mayra Classic
  { 
    id: "SCFS502248", 
    name: "Mayra Classic", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 2300, 
    wattage: "52W", 
    details: "Classic look ceiling fan.", 
    image: getImg("Mayra Classic.jpg"), 
    rating: 4.3, 
    reviews: generateReviews(8), 
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM" } 
  },
  
  // 34. Airavat Standard
  { 
    id: "SCFS501248", 
    name: "Airavat Standard", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 1800, 
    wattage: "53W", 
    details: "Robust standard fan.", 
    image: getImg("Airavat Standard.jpg"), 
    rating: 4.1, 
    reviews: generateReviews(25), 
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM" } 
  },
  
  // 35. Marut BLDC
  { 
    id: "SCFS500748", 
    name: "Marut BLDC", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 2600, 
    wattage: "30W", 
    details: "Affordable BLDC fan.", 
    image: getImg("Marut BLDC.jpg"), 
    rating: 4.4, 
    reviews: generateReviews(15), 
    specifications: { "Sweep": "1200mm", "Motor": "BLDC" } 
  },
  
  // 36. Speedo-X Pedestal
  { 
    id: "PFP300316", 
    name: "Speedo-X Pedestal", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 3100, 
    wattage: "130W", 
    details: "High speed pedestal fan.", 
    image: getImg("Speedo-X Pedestal.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(8), 
    specifications: { "Sweep": "400mm", "Speed": "2350 RPM", "Type": "Pedestal" } 
  },
  
  // 37. Environ BLDC Exhaust
  { 
    id: "AFP700606", 
    name: "Environ BLDC Exhaust", 
    category: "Fans", 
    brand: "Goldmedal", 
    price: 1200, 
    wattage: "5W", 
    details: "Low power exhaust fan.", 
    image: getImg("Environ BLDC Exhaust.jpg"), 
    rating: 4.4, 
    reviews: generateReviews(4), 
    specifications: { "Sweep": "150mm", "Speed": "2300 RPM", "Type": "Exhaust" } 
  },
  
  // 38. Dura Saver Bulb 5W
  { 
    id: "PAN-5W-BULB", 
    name: "Dura Saver Bulb 5W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 110, 
    wattage: "5W", 
    details: "B22 Base LED Bulb.", 
    image: getImg("Dura Saver Bulb 5W.jpg"), 
    rating: 4.3, 
    reviews: generateReviews(30), 
    specifications: { "Base": "B22", "CCT": "6500K", "Type": "Bulb" } 
  },
  
  // 39. Dura Saver Bulb 12W
  { 
    id: "PAN-12W-BULB", 
    name: "Dura Saver Bulb 12W", 
    category: "LED Lighting", 
    brand: "Panasonic", 
    price: 200, 
    wattage: "12W", 
    details: "Bright 12W LED Bulb.", 
    image: getImg("Dura Saver Bulb 12W.jpg"), 
    rating: 4.4, 
    reviews: generateReviews(20), 
    specifications: { "Base": "B22", "CCT": "6500K", "Type": "Bulb" } 
  },
  
  // 40. Easy9 RCCB 2-Pole 25A
  { 
    id: "EZ9R35225", 
    name: "Easy9 RCCB 2-Pole 25A", 
    category: "Switchgear", 
    brand: "Schneider Electric", 
    price: 3775, 
    details: "Residual Current Circuit Breaker.", 
    image: getImg("Easy9 RCCB 2-Pole 25A.jpg"), 
    rating: 5.0, 
    reviews: generateReviews(6), 
    specifications: { "Poles": "2 Pole", "Current": "25A", "Sensitivity": "30mA" } 
  },
  
  // 41. Zolo Dual Color 12W+12W
  { 
    id: "GL91285", 
    name: "Zolo Dual Color 12W+12W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 945, 
    wattage: "24W", 
    details: "High brightness dual color panel.", 
    image: getImg("Zolo Dual Color 12W+12W.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(9), 
    specifications: { "Type": "Dual Color", "Driver": "Inbuilt", "Mode": "Switch Controlled" } 
  },
  
  // 42. Todos Panel 3W
  { 
    id: "GL91240", 
    name: "Todos Panel 3W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 280, 
    wattage: "3W", 
    details: "Affordable 3W panel.", 
    image: getImg("Todos Panel 3W.webp"), 
    rating: 4.2, 
    reviews: generateReviews(2), 
    specifications: { "Driver": "External", "Shape": "Round", "Series": "Todos" } 
  },
  
  // 43. Todos Panel 10W
  { 
    id: "GL91242", 
    name: "Todos Panel 10W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 580, 
    wattage: "10W", 
    details: "Affordable 10W panel.", 
    image: getImg("Todos Panel 10W.webp"), 
    rating: 4.3, 
    reviews: generateReviews(4), 
    specifications: { "Driver": "External", "Shape": "Round", "Series": "Todos" } 
  },
  
  // 44. Todos Panel 20W
  { 
    id: "GL91244", 
    name: "Todos Panel 20W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 1050, 
    wattage: "20W", 
    details: "High power 20W Todos panel.", 
    image: getImg("Todos Panel 20W.webp"), 
    rating: 4.5, 
    reviews: generateReviews(6), 
    specifications: { "Driver": "External", "Shape": "Round", "Series": "Todos" } 
  },
  
  // 45. Zion Adjustable Panel 12W
  { 
    id: "GL91273", 
    name: "Zion Adjustable Panel 12W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 775, 
    wattage: "12W", 
    details: "Adjustable cutout LED panel.", 
    image: getImg("Zion Adjustable Panel 12W.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(5), 
    specifications: { "Feature": "Adjustable Cutout", "Wattage": "12W" } 
  },
  
  // 46. Zion Adjustable Panel 24W
  { 
    id: "GL91276", 
    name: "Zion Adjustable Panel 24W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 1560, 
    wattage: "24W", 
    details: "Large adjustable cutout panel.", 
    image: getImg("Zion Adjustable Panel 24W.jpg"), 
    rating: 4.7, 
    reviews: generateReviews(4), 
    specifications: { "Feature": "Adjustable Cutout", "Wattage": "24W" } 
  },
  
  // 47. Apollo Downlight 10W
  { 
    id: "GL91318", 
    name: "Apollo Downlight 10W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 780, 
    wattage: "10W", 
    details: "PDC Aluminium body downlight.", 
    image: getImg("Apollo Downlight 10W.webp"), 
    rating: 4.6, 
    reviews: generateReviews(6), 
    specifications: { "Body": "PDC Aluminium", "Type": "Downlight", "Series": "Apollo" } 
  },
  
  // 48. Ola Detachable Downlight 6W
  { 
    id: "GL91348", 
    name: "Ola Detachable Downlight 6W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 560, 
    wattage: "6W", 
    details: "Innovative detachable design.", 
    image: getImg("Ola Detachable Downlight 6W.webp"), 
    rating: 4.7, 
    reviews: generateReviews(8), 
    specifications: { "Feature": "Detachable", "Type": "Downlight", "Series": "Ola" } 
  },
  
  // 49. Wella Downlight 6W
  { 
    id: "GL91333", 
    name: "Wella Downlight 6W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 510, 
    wattage: "6W", 
    details: "Sleek Wella downlight.", 
    image: getImg("Wella Downlight 6W.jpg"), 
    rating: 4.4, 
    reviews: generateReviews(3), 
    specifications: { "Series": "Wella", "Type": "Downlight" } 
  },
  
  // 50. Glazz Downlight 5W
  { 
    id: "GL91363", 
    name: "Glazz Downlight 5W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 310, 
    wattage: "5W", 
    details: "Glass finish decorative downlight.", 
    image: getImg("Glazz Downlight 5W.webp"), 
    rating: 4.5, 
    reviews: generateReviews(5), 
    specifications: { "Finish": "Glass", "Type": "Downlight", "Series": "Glazz" } 
  },
  
  // 51. Evo COB Module 7W
  { 
    id: "GL9C2302107BK", 
    name: "Evo COB Module 7W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 730, 
    wattage: "7W", 
    details: "COB Module for Gio series rings. Black finish.", 
    image: getImg("Evo COB Module 7W.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(3), 
    specifications: { "Type": "COB Module", "Color": "Black", "Compatible With": "Gio Rings" } 
  },
  
  // 52. Divine COB Spotlight 7W
  { 
    id: "GL9C0704107", 
    name: "Divine COB Spotlight 7W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 945, 
    wattage: "7W", 
    details: "Premium COB spotlight with focused beam.", 
    image: getImg("Divine COB Spotlight 7W.webp"), 
    rating: 4.8, 
    reviews: generateReviews(5), 
    specifications: { "Type": "Spotlight", "Source": "COB", "Series": "Divine" } 
  },
  
  // 53. Orbix COB Spotlight 3W
  { 
    id: "GL91926", 
    name: "Orbix COB Spotlight 3W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 565, 
    wattage: "3W", 
    details: "Deep recessed COB spotlight.", 
    image: getImg("Orbix COB Spotlight 3W.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(3), 
    specifications: { "Type": "Deep Recessed", "Source": "COB", "Series": "Orbix" } 
  },
  
  // 54. G-Tilt COB Downlight 3W
  { 
    id: "GL91600", 
    name: "G-Tilt COB Downlight 3W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 550, 
    wattage: "3W", 
    details: "Tiltable COB downlight.", 
    image: getImg("G-Tilt COB Downlight 3W.jpg"), 
    rating: 4.4, 
    reviews: generateReviews(4), 
    specifications: { "Feature": "Tiltable", "Source": "COB", "Series": "G-Tilt" } 
  },
  
  // 55. Easy9 MCB 3-Pole 32A
  { 
    id: "EZ9F76332", 
    name: "Easy9 MCB 3-Pole 32A", 
    category: "Switchgear", 
    brand: "Schneider Electric", 
    price: 1465, 
    details: "Three Pole MCB for 3-phase applications.", 
    image: getImg("Easy9 MCB 3-Pole 32A.webp"), 
    rating: 5.0, 
    reviews: generateReviews(4), 
    specifications: { "Poles": "3 Pole", "Current": "32A", "Breaking Capacity": "6kA" } 
  },
  
  // 56. Easy9 MCB 2-Pole 6A
  { 
    id: "EZ9F76206", 
    name: "Easy9 MCB 2-Pole 6A", 
    category: "Switchgear", 
    brand: "Schneider Electric", 
    price: 943, 
    details: "Double Pole MCB for main protection.", 
    image: getImg("Easy9 MCB 2-Pole 6A.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(5), 
    specifications: { "Poles": "2 Pole", "Current": "6A", "Breaking Capacity": "6kA" } 
  },
  
  // 57. Easy9 MCB 1-Pole 40A
  { 
    id: "EZ9F76140", 
    name: "Easy9 MCB 1-Pole 40A", 
    category: "Switchgear", 
    brand: "Schneider Electric", 
    price: 579, 
    details: "Schneider Easy9 MCB 1P 40A C-Curve.", 
    image: getImg("Easy9 MCB 1-Pole 40A.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(6), 
    specifications: { "Poles": "1 Pole", "Current": "40A", "Breaking Capacity": "6kA" } 
  },
  
  // 58. Easy9 MCB 1-Pole 32A
  { 
    id: "EZ9F76132", 
    name: "Easy9 MCB 1-Pole 32A", 
    category: "Switchgear", 
    brand: "Schneider Electric", 
    price: 253, 
    details: "Schneider Easy9 MCB 1P 32A C-Curve.", 
    image: getImg("Easy9 MCB 1-Pole 32A.jpg"), 
    rating: 4.9, 
    reviews: generateReviews(8), 
    specifications: { "Poles": "1 Pole", "Current": "32A", "Breaking Capacity": "6kA" } 
  },
  
  // 59. Easy9 MCB 1-Pole 6A
  { 
    id: "EZ9F76106", 
    name: "Easy9 MCB 1-Pole 6A", 
    category: "Switchgear", 
    brand: "Schneider Electric", 
    price: 253, 
    details: "Schneider Easy9 MCB 1P 6A C-Curve.", 
    image: getImg("Easy9 MCB 1-Pole 6A.jpg"), 
    rating: 4.9, 
    reviews: generateReviews(15), 
    specifications: { "Poles": "1 Pole", "Current": "6A", "Breaking Capacity": "6kA" } 
  },
  
  // 60. Goldmedal LED Lamp 5W
  { 
    id: "GL91030", 
    name: "Goldmedal LED Lamp 5W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 135, 
    wattage: "5W", 
    details: "Standard LED bulb.", 
    image: getImg("Goldmedal LED Lamp 5W.jpg"), 
    rating: 4.2, 
    reviews: generateReviews(15), 
    specifications: { "Base": "B22", "Type": "Bulb" } 
  },
  
  // 61. Goldmedal Batten 8W
  { 
    id: "GL9C2001608", 
    name: "Goldmedal Batten 8W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 715, 
    wattage: "8W", 
    details: "2 Feet LED Batten.", 
    image: getImg("Goldmedal Batten 8W.webp"), 
    rating: 4.3, 
    reviews: generateReviews(10), 
    specifications: { "Size": "2 Feet", "Type": "Batten", "Mounting": "Surface" } 
  },
  
  // 62. G-Brix Linear 3W
  { 
    id: "GL90880", 
    name: "G-Brix Linear 3W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 815, 
    wattage: "3W", 
    details: "Linear brick light.", 
    image: getImg("G-Brix Linear 3W.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(3), 
    specifications: { "Shape": "Linear", "Series": "G-Brix" } 
  },
  
  // 63. Loofix Linear 6W
  { 
    id: "GL9C0716506BK", 
    name: "Loofix Linear 6W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 1350, 
    wattage: "6W", 
    details: "Architectural linear lighting solution.", 
    image: getImg("Loofix Linear 6W.jpg"), 
    rating: 4.9, 
    reviews: generateReviews(2), 
    specifications: { "Shape": "Linear", "Finish": "Black", "Series": "Loofix" } 
  },
  
  // 64. Torro LED Panel 8W
  { 
    id: "GL9C0203108", 
    name: "Torro LED Panel 8W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 440, 
    wattage: "8W", 
    details: "High brightness 8W panel.", 
    image: getImg("Torro LED Panel 8W.jpg"), 
    rating: 4.6, 
    reviews: generateReviews(3), 
    specifications: { "Dimensions": "120x30mm", "Shape": "Round", "Driver": "Inbuilt" } 
  },
  
  // 65. Torro LED Panel 12W
  { 
    id: "GL9C0203112", 
    name: "Torro LED Panel 12W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 680, 
    wattage: "12W", 
    details: "Standard 12W ceiling panel.", 
    image: getImg("Torro LED Panel 12W.jpg"), 
    rating: 4.8, 
    reviews: generateReviews(8), 
    specifications: { "Dimensions": "170x30mm", "Shape": "Round", "Driver": "Inbuilt" } 
  },
  
  // 66. Torro LED Panel 15W
  { 
    id: "GL9C0203115", 
    name: "Torro LED Panel 15W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 700, 
    wattage: "15W", 
    details: "Powerful 15W LED panel.", 
    image: getImg("Torro LED Panel 15W.webp"), 
    rating: 4.7, 
    reviews: generateReviews(4), 
    specifications: { "Dimensions": "170x30mm", "Shape": "Round", "Driver": "Inbuilt" } 
  },
  
  // 67. Torro LED Panel 18W
  { 
    id: "GL9C0203118", 
    name: "Torro LED Panel 18W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 845, 
    wattage: "18W", 
    details: "High-power 18W panel.", 
    image: getImg("Torro LED Panel 18W.webp"), 
    rating: 4.9, 
    reviews: generateReviews(10), 
    specifications: { "Dimensions": "190x30mm", "Shape": "Round", "Driver": "Inbuilt" } 
  },
  
  // 68. Geolite Round Panel 3W
  { 
    id: "GL91256", 
    name: "Geolite Round Panel 3W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 310, 
    wattage: "3W", 
    details: "Compact 3W round panel.", 
    image: getImg("Geolite Round Panel 3W.jpg"), 
    rating: 4.4, 
    reviews: generateReviews(2), 
    specifications: { "Shape": "Round", "Type": "Geolite", "Mounting": "Recessed" } 
  },
  
  // 69. Geolite Round Panel 6W
  { 
    id: "GL91257", 
    name: "Geolite Round Panel 6W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 440, 
    wattage: "6W", 
    details: "6W Round panel for accent lighting.", 
    image: getImg("Geolite Round Panel 6W.webp"), 
    rating: 4.5, 
    reviews: generateReviews(4), 
    specifications: { "Shape": "Round", "Type": "Geolite", "Mounting": "Recessed" } 
  },
  
  // 70. Geolite Round Panel 15W
  { 
    id: "GL91259", 
    name: "Geolite Round Panel 15W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 990, 
    wattage: "15W", 
    details: "Bright 15W round panel.", 
    image: getImg("Geolite Round Panel 15W.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(6), 
    specifications: { "Shape": "Round", "Type": "Geolite", "Mounting": "Recessed" } 
  },
  
  // 71. Geolite Square Panel 4W
  { 
    id: "GL9C0203204", 
    name: "Geolite Square Panel 4W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 310, 
    wattage: "4W", 
    details: "Modern 4W square panel design.", 
    image: getImg("Geolite Square Panel 4W.jpg"), 
    rating: 4.3, 
    reviews: generateReviews(3), 
    specifications: { "Shape": "Square", "Type": "Geolite", "Mounting": "Recessed" } 
  },
  
  // 72. Geolite Square Panel 12W
  { 
    id: "GL9C0203212", 
    name: "Geolite Square Panel 12W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 680, 
    wattage: "12W", 
    details: "12W Square panel.", 
    image: getImg("Geolite Square Panel 12W.webp"), 
    rating: 4.6, 
    reviews: generateReviews(7), 
    specifications: { "Shape": "Square", "Type": "Geolite", "Mounting": "Recessed" } 
  },
  
  // 73. Quoro Round Panel 4W
  { 
    id: "GL9C0204104", 
    name: "Quoro Round Panel 4W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 390, 
    wattage: "4W", 
    details: "Premium panel with external driver.", 
    image: getImg("Quoro Round Panel 4W.jpg"), 
    rating: 4.7, 
    reviews: generateReviews(4), 
    specifications: { "Driver": "External", "Shape": "Round", "Series": "Quoro" } 
  },
  
  // 74. Quoro Round Panel 12W
  { 
    id: "GL9C0204112", 
    name: "Quoro Round Panel 12W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 705, 
    wattage: "12W", 
    details: "12W Round panel Reliability.", 
    image: getImg("Quoro Round Panel 12W.jpeg"), 
    rating: 4.8, 
    reviews: generateReviews(5), 
    specifications: { "Driver": "External", "Shape": "Round", "Series": "Quoro" } 
  },
  
  // 75. Quoro Square Panel 12W
  { 
    id: "GL9C0204212", 
    name: "Quoro Square Panel 12W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 775, 
    wattage: "12W", 
    details: "12W Square panel with external driver.", 
    image: getImg("Quoro Square Panel 12W.jpg"), 
    rating: 4.5, 
    reviews: generateReviews(3), 
    specifications: { "Driver": "External", "Shape": "Square", "Series": "Quoro" } 
  },
  
  // 76. Zolo Dual Color 3W+3W
  { 
    id: "GL91283", 
    name: "Zolo Dual Color 3W+3W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 430, 
    wattage: "6W", 
    details: "Dual color white + warm white.", 
    image: getImg("Zolo Dual Color 3W+3W.jpg"), 
    rating: 4.9, 
    reviews: generateReviews(12), 
    specifications: { "Type": "Dual Color", "Driver": "Inbuilt", "Mode": "Switch Controlled" } 
  },
  
  // 77. Torro LED Panel 4W
  { 
    id: "GL9C0203104", 
    name: "Torro LED Panel 4W", 
    category: "LED Lighting", 
    brand: "Goldmedal", 
    price: 310, 
    wattage: "4W", 
    details: "Slim LED panel.", 
    image: getImg("Torro LED Panel 4W.webp"), 
    rating: 4.5, 
    reviews: generateReviews(5), 
    specifications: { "Dimensions": "86x30mm", "Shape": "Round", "Driver": "Inbuilt" } 
  },

  // --- 78-97: FANS FROM CATALOGUE ---
  {
    id: "CFZ100750",
    name: "Hush-Air BLDC",
    category: "Fans",
    brand: "Goldmedal",
    price: 4300,
    wattage: "53W",
    details: "Super decorative fan with innovative blade design.",
    image: getImg("Hush-Flo BLDC.jpg"),
    rating: 4.8,
    reviews: generateReviews(12),
    specifications: { "Sweep": "1250mm", "Motor": "BLDC" }
  },
  {
    id: "SCFZ101448",
    name: "Daisy",
    category: "Fans",
    brand: "Goldmedal",
    price: 4600,
    wattage: "40W",
    details: "Luxury fan with electroplated finish.",
    image: getImg("Fabia Super Decorative.jpg"),
    rating: 4.7,
    reviews: generateReviews(15),
    specifications: { "Sweep": "1200mm", "Type": "Decorative" }
  },
  {
    id: "SCFZ100148",
    name: "Phantom",
    category: "Fans",
    brand: "Goldmedal",
    price: 4800,
    wattage: "40W",
    details: "Classical-modern mix with LED under-light.",
    image: getImg("Fabia Super Decorative.jpg"),
    rating: 4.9,
    reviews: generateReviews(8),
    specifications: { "Sweep": "1200mm", "Remote": "Yes" }
  },
  {
    id: "SCFZ101124",
    name: "Thor",
    category: "Fans",
    brand: "Goldmedal",
    price: 2850,
    wattage: "65W",
    details: "Unique 4-blade compact design.",
    image: getImg("Tavola Decorative.jpg"),
    rating: 4.5,
    reviews: generateReviews(6),
    specifications: { "Sweep": "600mm", "Speed": "850 RPM" }
  },
  {
    id: "SCFP300348",
    name: "Flora",
    category: "Fans",
    brand: "Goldmedal",
    price: 3150,
    wattage: "52W",
    details: "Flower petal inspired aerodynamic blades.",
    image: getImg("Mayra Classic.jpg"),
    rating: 4.6,
    reviews: generateReviews(10),
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM" }
  },
  {
    id: "SCFP301548",
    name: "Hero Prime",
    category: "Fans",
    brand: "Goldmedal",
    price: 3350,
    wattage: "53W",
    details: "Anti-corrosive wider blades for better air thrust.",
    image: getImg("Airavat Dlx.jpg"),
    rating: 4.4,
    reviews: generateReviews(20),
    specifications: { "Sweep": "1200mm", "Speed": "380 RPM" }
  },
  {
    id: "SCFP300548",
    name: "Insignia",
    category: "Fans",
    brand: "Goldmedal",
    price: 3500,
    wattage: "53W",
    details: "Aerodynamically superior quiet fan.",
    image: getImg("Tavola Decorative.jpg"),
    rating: 4.7,
    reviews: generateReviews(5),
    specifications: { "Sweep": "1200mm", "Air Delivery": "220 CMM" }
  },
  {
    id: "SCFP501448",
    name: "Air Crest",
    category: "Fans",
    brand: "Goldmedal",
    price: 2950,
    wattage: "52W",
    details: "Wide blades with high-grade copper motor.",
    image: getImg("Airavat Dlx.jpg"),
    rating: 4.3,
    reviews: generateReviews(14),
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM" }
  },
  {
    id: "SCFS502048",
    name: "Vellfire",
    category: "Fans",
    brand: "Goldmedal",
    price: 2600,
    wattage: "53W",
    details: "Elegant standard fan with a 16-pole motor.",
    image: getImg("Airavat Standard.jpg"),
    rating: 4.2,
    reviews: generateReviews(9),
    specifications: { "Sweep": "1200mm", "Type": "Standard" }
  },
  {
    id: "LFP801000",
    name: "Oxyrich",
    category: "Fans",
    brand: "Goldmedal",
    price: 11500,
    wattage: "48W",
    details: "Bladeless air purifying lifestyle fan.",
    image: getImg("Hush-Flo BLDC.jpg"),
    rating: 4.8,
    reviews: generateReviews(4),
    specifications: { "Type": "Bladeless", "Sensor": "PM2.5" }
  },
  {
    id: "PFP300216",
    name: "Vista 360",
    category: "Fans",
    brand: "Goldmedal",
    price: 3750,
    wattage: "53W",
    details: "Pedestal fan with 360-degree oscillation.",
    image: getImg("Speedo-X Pedestal.jpg"),
    rating: 4.6,
    reviews: generateReviews(10),
    specifications: { "Sweep": "400mm", "Oscillation": "360 Deg" }
  },
  {
    id: "PFP300716",
    name: "Grace",
    category: "Fans",
    brand: "Goldmedal",
    price: 3950,
    wattage: "56W",
    details: "Pedestal fan with temperature sensor display.",
    image: getImg("Speedo-X Pedestal.jpg"),
    rating: 4.7,
    reviews: generateReviews(7),
    specifications: { "Sweep": "400mm", "Speed Settings": "12" }
  },
  {
    id: "LFF800118",
    name: "Tricool",
    category: "Fans",
    brand: "Goldmedal",
    price: 4200,
    wattage: "80W",
    details: "Multipurpose 3-in-1 fan.",
    image: getImg("Speedo-X Pedestal.jpg"),
    rating: 4.5,
    reviews: generateReviews(18),
    specifications: { "Type": "Pedestal/Wall/Table" }
  },
  {
    id: "PFP500118",
    name: "Air Fiesta",
    category: "Fans",
    brand: "Goldmedal",
    price: 4400,
    wattage: "90W",
    details: "Lifestyle fan with air freshener slot.",
    image: getImg("Speedo-X Pedestal.jpg"),
    rating: 4.6,
    reviews: generateReviews(12),
    specifications: { "Feature": "Air Freshener Slot" }
  },
  {
    id: "WFP200416",
    name: "Fusion DG",
    category: "Fans",
    brand: "Goldmedal",
    price: 3100,
    wattage: "68W",
    details: "Wall fan with touch panel and remote.",
    image: getImg("Speedo-X Pedestal.jpg"),
    rating: 4.4,
    reviews: generateReviews(15),
    specifications: { "Type": "Wall", "Remote": "Yes" }
  },
  {
    id: "WFP200716",
    name: "Adora",
    category: "Fans",
    brand: "Goldmedal",
    price: 2750,
    wattage: "55W",
    details: "Portable wall fan with flexible vertical adjustment.",
    image: getImg("Speedo-X Pedestal.jpg"),
    rating: 4.3,
    reviews: generateReviews(6),
    specifications: { "Sweep": "400mm", "Blades": "5-Leaf" }
  },
  {
    id: "PCS650909",
    name: "Tristar",
    category: "Fans",
    brand: "Goldmedal",
    price: 2200,
    wattage: "45W",
    details: "Compact mini personal fan.",
    image: getImg("Environ BLDC Exhaust.jpg"),
    rating: 4.5,
    reviews: generateReviews(30),
    specifications: { "Sweep": "225mm", "Type": "Personal" }
  },
  {
    id: "PCS650212",
    name: "Astor",
    category: "Fans",
    brand: "Goldmedal",
    price: 2450,
    wattage: "75W",
    details: "Sturdy cabin fan with protective grill.",
    image: getImg("Environ BLDC Exhaust.jpg"),
    rating: 4.4,
    reviews: generateReviews(8),
    specifications: { "Sweep": "300mm", "Type": "Cabin" }
  },
  {
    id: "AFP700706",
    name: "Frost Prime",
    category: "Fans",
    brand: "Goldmedal",
    price: 1600,
    wattage: "25W",
    details: "Axial fan featuring LED lights.",
    image: getImg("Environ BLDC Exhaust.jpg"),
    rating: 4.6,
    reviews: generateReviews(5),
    specifications: { "Type": "Axial", "LED": "Yes" }
  },
  {
    id: "EFS850912",
    name: "Havoc",
    category: "Fans",
    brand: "Goldmedal",
    price: 3200,
    wattage: "45W",
    details: "Exhaust fan with metal blades and bird guard.",
    image: getImg("Environ BLDC Exhaust.jpg"),
    rating: 4.7,
    reviews: generateReviews(10),
    specifications: { "Type": "Exhaust", "Material": "Metal" }
  },

  // --- 98-117: LED LIGHTING FROM CATALOGUE ---
  {
    id: "GL91241X",
    name: "Zolo Slim Panel 6W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 400,
    wattage: "6W",
    details: "Ultra-slim LED panel with inbuilt driver.",
    image: getImg("Zolo Dual Color 3W+3W.jpg"),
    rating: 4.6,
    reviews: generateReviews(5),
    specifications: { "Series": "Zolo", "Cut Out": "97mm" }
  },
  {
    id: "GL91242X",
    name: "Zolo Slim Panel 10W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 580,
    wattage: "10W",
    details: "Mid-range Zolo series panel.",
    image: getImg("Zolo Dual Color 3W+3W.jpg"),
    rating: 4.7,
    reviews: generateReviews(8),
    specifications: { "Series": "Zolo", "Cut Out": "125mm" }
  },
  {
    id: "GL91357X",
    name: "Twilite LED Panel",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 560,
    wattage: "12W",
    details: "Panel featuring a blue ambient ring.",
    image: getImg("Zolo Dual Color 12W+12W.jpg"),
    rating: 4.8,
    reviews: generateReviews(4),
    specifications: { "Colors": "Daylight + Blue" }
  },
  {
    id: "GL9C0307109X",
    name: "Orzo Downlight 9W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 730,
    wattage: "9W",
    details: "Premium PDC Aluminium downlight.",
    image: getImg("Apollo Downlight 10W.webp"),
    rating: 4.5,
    reviews: generateReviews(6),
    specifications: { "Body": "Aluminium", "Driver": "External" }
  },
  {
    id: "GL91249X",
    name: "Tesla Round Downlight 8W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 655,
    wattage: "8W",
    details: "Sleek round Tesla series downlight.",
    image: getImg("Rimless Surface Panel 12W.jpg"),
    rating: 4.4,
    reviews: generateReviews(7),
    specifications: { "Series": "Tesla", "Cut Out": "109mm" }
  },
  {
    id: "GL9C0302112X",
    name: "Enzo Round Downlight 12W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 425,
    wattage: "12W",
    details: "Economical and bright round downlight.",
    image: getImg("Lumor Anora Downlight 10W.jpg"),
    rating: 4.3,
    reviews: generateReviews(12),
    specifications: { "Series": "Enzo", "Shape": "Round" }
  },
  {
    id: "GL9C1304110X",
    name: "Coral Downlight 10W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 585,
    wattage: "10W",
    details: "Colored ambient effect downlight.",
    image: getImg("Zolo Dual Color 12W+12W.jpg"),
    rating: 4.6,
    reviews: generateReviews(5),
    specifications: { "Effect": "Ambient" }
  },
  {
    id: "GL91514X",
    name: "Jugnoo Downlight 7W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 300,
    wattage: "7W",
    details: "Vibrant mini series downlight.",
    image: getImg("Glazz Downlight 5W.webp"),
    rating: 4.5,
    reviews: generateReviews(20),
    specifications: { "Series": "Jugnoo", "Size": "Compact" }
  },
  {
    id: "GL91459X",
    name: "Miro Downlight 3W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 215,
    wattage: "3W",
    details: "Perfect for cabinetry or accent lighting.",
    image: getImg("Todos Panel 3W.webp"),
    rating: 4.4,
    reviews: generateReviews(10),
    specifications: { "Series": "Miro", "Type": "Accent" }
  },
  {
    id: "GL91512X",
    name: "Duos Round 6W+3W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 560,
    wattage: "9W",
    details: "Two-in-one decorative downlight.",
    image: getImg("Zolo Dual Color 12W+12W.jpg"),
    rating: 4.9,
    reviews: generateReviews(3),
    specifications: { "Type": "Dual Light" }
  },
  {
    id: "GL91508X",
    name: "G-Spiro Round 5W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 330,
    wattage: "5W",
    details: "Vibrant spiral diffusion design.",
    image: getImg("Glazz Downlight 5W.webp"),
    rating: 4.2,
    reviews: generateReviews(15),
    specifications: { "Series": "G-Spiro" }
  },
  {
    id: "GL90103X",
    name: "Magicline LED Batten 20W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 580,
    wattage: "20W",
    details: "Slim high lumen output batten.",
    image: getImg("Altabright Batten 20W.webp"),
    rating: 4.6,
    reviews: generateReviews(25),
    specifications: { "Series": "Magicline", "Length": "1135mm" }
  },
  {
    id: "GL91033X",
    name: "Wow LED Lamp 9W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 168,
    wattage: "9W",
    details: "Energy-saving LED bulb.",
    image: getImg("Dura Saver Bulb 12W.jpg"),
    rating: 4.5,
    reviews: generateReviews(50),
    specifications: { "Base": "B22", "Series": "Wow" }
  },
  {
    id: "GL91001X",
    name: "Genie LED Night Lamp",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 55,
    wattage: "0.5W",
    details: "Colorful 0.5W night lamp.",
    image: getImg("Goldmedal LED Lamp 5W.jpg"),
    rating: 4.8,
    reviews: generateReviews(100),
    specifications: { "Series": "Genie", "Type": "Night Lamp" }
  },
  {
    id: "GL90701X",
    name: "Crimson LED Strip 5m",
    category: "Smart Home",
    brand: "Goldmedal",
    price: 580,
    wattage: "25W",
    details: "Flexible strip for mood lighting.",
    image: getImg("Panasonic Smart WiFi Bulb.jpg"),
    rating: 4.7,
    reviews: generateReviews(15),
    specifications: { "Length": "5 Meters" }
  },
  {
    id: "GL9C0903530X",
    name: "Beacon Flood Light 30W",
    category: "Outdoor Lighting",
    brand: "Goldmedal",
    price: 1450,
    wattage: "30W",
    details: "Rugged outdoor light with IP65 protection.",
    image: getImg("Panasonic Flood Light 50W.jpg"),
    rating: 4.6,
    reviews: generateReviews(5),
    specifications: { "IP Rating": "IP65" }
  },
  {
    id: "GL90801X",
    name: "Optimus Street Light 20W",
    category: "Outdoor Lighting",
    brand: "Goldmedal",
    price: 1695,
    wattage: "20W",
    details: "Street lighting for residential complexes.",
    image: getImg("Panasonic Street Light 25W.jpg"),
    rating: 4.5,
    reviews: generateReviews(4),
    specifications: { "Series": "Optimus" }
  },
  {
    id: "GL9U213X",
    name: "Nuvoline Suspended Light",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 1485,
    wattage: "12W",
    details: "Designer suspended linear light.",
    image: getImg("Loofix Linear 6W.jpg"),
    rating: 4.9,
    reviews: generateReviews(2),
    specifications: { "Type": "Suspended" }
  },
  {
    id: "GL9X101",
    name: "Zolo Round Panel 15W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 780,
    wattage: "15W",
    details: "Powerful round Zolo series panel.",
    image: getImg("Zolo Dual Color 12W+12W.jpg"),
    rating: 4.6,
    reviews: generateReviews(6),
    specifications: { "Series": "Zolo", "Shape": "Round" }
  },
  {
    id: "GL9X102",
    name: "Miro Square Downlight 6W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 340,
    wattage: "6W",
    details: "Square accent downlight for interiors.",
    image: getImg("Geolite Square Panel 4W.jpg"),
    rating: 4.5,
    reviews: generateReviews(10),
    specifications: { "Series": "Miro", "Shape": "Square" }
  },

  // --- 118-128: ADDITIONAL FANS FROM 2025 CATALOGUE ---
  {
    id: "SCFP302548",
    name: "Opus BLDC",
    category: "Fans",
    brand: "Goldmedal",
    price: 4100,
    wattage: "30W",
    details: "Energy-efficient fan with BLDC technology.",
    image: getImg("Opus Prime BLDC.jpg"),
    rating: 4.8,
    reviews: generateReviews(6),
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM" }
  },
  {
    id: "SCFP300524",
    name: "Insignia 600",
    category: "Fans",
    brand: "Goldmedal",
    price: 2900,
    wattage: "65W",
    details: "Ultra high speed compact decorative fan.",
    image: getImg("Tavola Decorative.jpg"),
    rating: 4.6,
    reviews: generateReviews(4),
    specifications: { "Sweep": "600mm", "Speed": "850 RPM" }
  },
  {
    id: "SCFP301748",
    name: "Eva Prime",
    category: "Fans",
    brand: "Goldmedal",
    price: 3250,
    wattage: "53W",
    details: "Sleek and stylish decorative fan.",
    image: getImg("Mayra Classic.jpg"),
    rating: 4.5,
    reviews: generateReviews(7),
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM" }
  },
  {
    id: "SCFP302348",
    name: "Legacy Prime",
    category: "Fans",
    brand: "Goldmedal",
    price: 3450,
    wattage: "52W",
    details: "Premium decorative fan with metallized rings.",
    image: getImg("Airavat Dlx.jpg"),
    rating: 4.7,
    reviews: generateReviews(9),
    specifications: { "Sweep": "1200mm", "Speed": "390 RPM" }
  },
  {
    id: "SCFS501348",
    name: "Legacy 390",
    category: "Fans",
    brand: "Goldmedal",
    price: 1950,
    wattage: "52W",
    details: "Standard ceiling fan with sophisticated design.",
    image: getImg("Airavat Standard.jpg"),
    rating: 4.2,
    reviews: generateReviews(12),
    specifications: { "Sweep": "1200mm", "Speed": "390 RPM" }
  },
  {
    id: "CFS500948",
    name: "Geo Fox BLDC",
    category: "Fans",
    brand: "Goldmedal",
    price: 2750,
    wattage: "35W",
    details: "High performance fan with 65% energy savings.",
    image: getImg("Marut BLDC.jpg"),
    rating: 4.4,
    reviews: generateReviews(15),
    specifications: { "Sweep": "1200mm", "Motor": "BLDC" }
  },
  {
    id: "SCFS501648",
    name: "Volt 400",
    category: "Fans",
    brand: "Goldmedal",
    price: 1750,
    wattage: "52W",
    details: "Economy fan designed for affordable comfort.",
    image: getImg("Airavat Standard.jpg"),
    rating: 4.1,
    reviews: generateReviews(20),
    specifications: { "Sweep": "1200mm", "Speed": "400 RPM" }
  },
  {
    id: "SCFS501848",
    name: "Gati 400 Neo",
    category: "Fans",
    brand: "Goldmedal",
    price: 1800,
    wattage: "50W",
    details: "Affordable economy fan with high-speed performance.",
    image: getImg("Airavat Standard.jpg"),
    rating: 4.2,
    reviews: generateReviews(8),
    specifications: { "Sweep": "1200mm", "Speed": "400 RPM" }
  },
  {
    id: "SCFE700948",
    name: "Speedo Air",
    category: "Fans",
    brand: "Goldmedal",
    price: 1850,
    wattage: "52W",
    details: "Standard economy fan defined by timeless style.",
    image: getImg("Airavat Standard.jpg"),
    rating: 4.3,
    reviews: generateReviews(10),
    specifications: { "Sweep": "1200mm", "Type": "Economy" }
  },
  {
    id: "AFP700506",
    name: "Airfy Neo",
    category: "Fans",
    brand: "Goldmedal",
    price: 1450,
    wattage: "18W",
    details: "Axial exhaust fan featuring built-in lighting.",
    image: getImg("Environ BLDC Exhaust.jpg"),
    rating: 4.6,
    reviews: generateReviews(5),
    specifications: { "Sweep": "150mm", "Speed": "2200 RPM" }
  },
  {
    id: "EFS850112",
    name: "Torque DBB",
    category: "Fans",
    brand: "Goldmedal",
    price: 2600,
    wattage: "75W",
    details: "Powerful vent exhaust fan with metal blades.",
    image: getImg("Environ BLDC Exhaust.jpg"),
    rating: 4.7,
    reviews: generateReviews(8),
    specifications: { "Sweep": "300mm", "Speed": "1350 RPM" }
  },

  // --- 129-150: NEW LED LIGHTING ITEMS FROM CATALOGUE ---
  {
    id: "GL91260X",
    name: "Geolite Round Panel 18W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 1135,
    wattage: "18W",
    details: "High-power 18W round panel with inbuilt driver.",
    image: getImg("Geolite Round Panel 15W.jpg"),
    rating: 4.8,
    reviews: generateReviews(5),
    specifications: { "Shape": "Round", "Cut Out": "203mm", "Dimension": "220x30" }
  },
  {
    id: "GL9C0203215X",
    name: "Geolite Square Panel 15W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 730,
    wattage: "15W",
    details: "Standard 15W square panel for commercial and residential use.",
    image: getImg("Geolite Square Panel 12W.webp"),
    rating: 4.6,
    reviews: generateReviews(3),
    specifications: { "Shape": "Square", "Cut Out": "155x155", "Dimension": "170x170x30" }
  },
  {
    id: "GL9C0204108X",
    name: "Quoro Round Panel 8W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 625,
    wattage: "8W",
    details: "8W Premium panel with external driver for enhanced reliability.",
    image: getImg("Quoro Round Panel 12W.jpeg"),
    rating: 4.7,
    reviews: generateReviews(4),
    specifications: { "Series": "Quoro", "Driver": "External", "Cut Out": "105mm" }
  },
  {
    id: "GL9C0204208X",
    name: "Quoro Square Panel 8W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 580,
    wattage: "8W",
    details: "High-efficiency 8W square panel with slim PDC-Aluminium body.",
    image: getImg("Quoro Square Panel 12W.jpg"),
    rating: 4.5,
    reviews: generateReviews(5),
    specifications: { "Series": "Quoro", "Shape": "Square", "Cut Out": "105x105" }
  },
  {
    id: "GL91243CCT",
    name: "Zolo Slim Panel 15W CCT",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 940,
    wattage: "15W",
    details: "Switch-controlled 3-color temperature panel for adjustable mood lighting.",
    image: getImg("Zolo Dual Color 12W+12W.jpg"),
    rating: 4.9,
    reviews: generateReviews(8),
    specifications: { "Feature": "CCT Adjustable", "Cut Out": "149mm", "Driver": "Inbuilt" }
  },
  {
    id: "GL91244X",
    name: "Zolo Slim Panel 20W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 1050,
    wattage: "20W",
    details: "Powerful 20W round slim panel for high illumination.",
    image: getImg("Zolo Dual Color 3W+3W.jpg"),
    rating: 4.7,
    reviews: generateReviews(10),
    specifications: { "Series": "Zolo", "Cut Out": "199mm", "Dimension": "220x27" }
  },
  {
    id: "GL91358X",
    name: "Twilite LED Panel 18W+4W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 810,
    wattage: "22W",
    details: "Large Twilite panel featuring a striking blue ambient ring.",
    image: getImg("Zolo Dual Color 12W+12W.jpg"),
    rating: 4.8,
    reviews: generateReviews(4),
    specifications: { "Color": "Cool Day + Blue", "Series": "Twilite", "Cut Out": "95mm" }
  },
  {
    id: "GL91274X",
    name: "Zion Adjustable Panel 18W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 1240,
    wattage: "18W",
    details: "Convenient panel with adjustable clips for varying ceiling cut-out sizes.",
    image: getImg("Zion Adjustable Panel 24W.jpg"),
    rating: 4.6,
    reviews: generateReviews(7),
    specifications: { "Adjustable Cut Out": "65-150mm", "Wattage": "18W" }
  },
  {
    id: "GL91319X",
    name: "Apollo Downlight 15W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 1140,
    wattage: "15W",
    details: "Premium PDC Aluminium downlight with deep recess for low glare.",
    image: getImg("Apollo Downlight 10W.webp"),
    rating: 4.7,
    reviews: generateReviews(5),
    specifications: { "Series": "Apollo", "Cut Out": "145mm", "Driver": "External" }
  },
  {
    id: "GL9C0307112X",
    name: "Orzo Downlight 12W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 780,
    wattage: "12W",
    details: "Sleek and efficient Orzo series downlight with external driver technology.",
    image: getImg("Apollo Downlight 10W.webp"),
    rating: 4.5,
    reviews: generateReviews(6),
    specifications: { "Cut Out": "95mm", "Body": "Aluminium", "Driver": "External" }
  },
  {
    id: "GL9C0307136X",
    name: "Orzo Downlight 36W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 1820,
    wattage: "36W",
    details: "High-power industrial grade downlight for expansive ceiling heights.",
    image: getImg("Apollo Downlight 10W.webp"),
    rating: 4.9,
    reviews: generateReviews(3),
    specifications: { "Cut Out": "195mm", "Driver": "External", "Wattage": "36W" }
  },
  {
    id: "GL91350X",
    name: "Ola Detachable 12W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 915,
    wattage: "12W",
    details: "User-friendly detachable design for easy maintenance and cleaning.",
    image: getImg("Ola Detachable Downlight 6W.webp"),
    rating: 4.7,
    reviews: generateReviews(9),
    specifications: { "Feature": "Detachable", "Series": "Ola", "Cut Out": "158mm" }
  },
  {
    id: "GL91251X",
    name: "Tesla Downlight 15W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 1040,
    wattage: "15W",
    details: "High-lumen PDC Aluminium downlight from the modern Tesla series.",
    image: getImg("Rimless Surface Panel 12W.jpg"),
    rating: 4.6,
    reviews: generateReviews(6),
    specifications: { "Series": "Tesla", "Cut Out": "159mm", "Driver": "External" }
  },
  {
    id: "GL91366X",
    name: "Glazz Downlight 15W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 690,
    wattage: "15W",
    details: "Decorative glass-finish downlight offering a premium aesthetic touch.",
    image: getImg("Glazz Downlight 5W.webp"),
    rating: 4.5,
    reviews: generateReviews(10),
    specifications: { "Finish": "Glass", "Series": "Glazz", "Cut Out": "125mm" }
  },
  {
    id: "GL91334X",
    name: "Wella Downlight 12W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 645,
    wattage: "12W",
    details: "Compact and stylish Wella series downlight for modern ceiling designs.",
    image: getImg("Wella Downlight 6W.jpg"),
    rating: 4.4,
    reviews: generateReviews(12),
    specifications: { "Series": "Wella", "Cut Out": "153mm", "Dimension": "170x37" }
  },
  {
    id: "GL9C0304110CNW",
    name: "Tango Downlight 10W CNW",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 675,
    wattage: "10W",
    details: "Premium Tango downlight in Cool Natural White for specialized interiors.",
    image: getImg("Lumor Anora Downlight 10W.jpg"),
    rating: 4.6,
    reviews: generateReviews(5),
    specifications: { "Series": "Tango", "Color": "CNW", "Cut Out": "99mm" }
  },
  {
    id: "GL9C0303103X",
    name: "Jugnoo Downlight 3W CCT",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 310,
    wattage: "3W",
    details: "Small but effective color-changing downlight for accent tasks.",
    image: getImg("Glazz Downlight 5W.webp"),
    rating: 4.5,
    reviews: generateReviews(15),
    specifications: { "Series": "Jugnoo", "Feature": "CCT Adjustable", "Cut Out": "45mm" }
  },
  {
    id: "GL91459RG",
    name: "Miro Downlight 3W RG",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 215,
    wattage: "3W",
    details: "Miniature downlight with a luxurious Rose Gold finish.",
    image: getImg("Todos Panel 3W.webp"),
    rating: 4.8,
    reviews: generateReviews(8),
    specifications: { "Finish": "Rose Gold", "Series": "Miro", "Cut Out": "43mm" }
  },
  {
    id: "GL91499CCT",
    name: "G-Fix Downlight 3W CCT",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 200,
    wattage: "3W",
    details: "Compact series downlight with adjustable color temperature functionality.",
    image: getImg("Glazz Downlight 5W.webp"),
    rating: 4.4,
    reviews: generateReviews(10),
    specifications: { "Series": "G-Fix", "Feature": "CCT/RBP", "Cut Out": "55mm" }
  },
  {
    id: "GL91529X",
    name: "Belo Downlight 7W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 270,
    wattage: "7W",
    details: "Affordable and elegant Belo series downlight with uniform beam output.",
    image: getImg("Lumor Anora Downlight 10W.jpg"),
    rating: 4.3,
    reviews: generateReviews(14),
    specifications: { "Series": "Belo", "Cut Out": "48mm", "Dimension": "86.5x43" }
  },
  {
    id: "GL9C0717125BK",
    name: "Odin COB Spotlight 25W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 3590,
    wattage: "25W",
    details: "High-intensity COB spotlight for focused architectural highlights.",
    image: getImg("Evo COB Module 7W.jpg"),
    rating: 4.9,
    reviews: generateReviews(5),
    specifications: { "Series": "Odin", "Source": "COB", "Cut Out": "85mm" }
  },
  {
    id: "GL91601X",
    name: "G-Tilt Downlight 6W",
    category: "LED Lighting",
    brand: "Goldmedal",
    price: 900,
    wattage: "6W",
    details: "Adjustable tilt mechanism for directed spotlighting in residential areas.",
    image: getImg("G-Tilt COB Downlight 3W.jpg"),
    rating: 4.6,
    reviews: generateReviews(7),
    specifications: { "Feature": "Tiltable", "Source": "COB", "Cut Out": "75mm" }
  },
  // --- 151-173: ADDITIONAL MODELS ---
  {
    id: "SCFP301050_NEO",
    name: "Hush-Flo Neo BLDC",
    category: "Fans",
    brand: "Goldmedal",
    price: 4350,
    wattage: "35W",
    details: "Ultra-quiet BLDC motor with advanced aerodynamics and high energy efficiency.",
    image: getImg("Hush-Flo BLDC.jpg"),
    rating: 4.8,
    reviews: generateReviews(8),
    specifications: { "Sweep": "1200mm", "Motor": "BLDC", "Remote": "Yes" }
  },
  {
    id: "SCFZ101948_PRIME",
    name: "Fabia Prime Decorative",
    category: "Fans",
    brand: "Goldmedal",
    price: 3550,
    wattage: "53W",
    details: "Premium decorative ceiling fan with metallized ornaments and a sleek body design.",
    image: getImg("Fabia Super Decorative.jpg"),
    rating: 4.7,
    reviews: generateReviews(5),
    specifications: { "Sweep": "1200mm", "Speed": "350 RPM", "Finish": "Metallic" }
  },
  // --- 174-175: MURUGAPPA GROUP FANS & VARIANTS ---
  {
    id: "MUR-TEJAS-FAN",
    name: "CG High Spped Magnus",
    category: "Fans",
    brand: "Murugappa Group",
    price: 2450,
    wattage: "52W",
    details: "High-performance Tejas ceiling fan from Murugappa Group, designed for heavy-duty use and durability.",
    image: getImg("Murugappa 1.jpg"),
    rating: 4.8,
    reviews: generateReviews(10),
    specifications: { "Sweep": "1200mm", "Speed": "380 RPM", "Variants": "Standard, High-Speed, Metallic" }
  },
  {
    id: "MUR-RIDE-FAN",
    name: "CG High Spped Ceiling Fan",
    category: "Fans",
    brand: "Murugappa Group",
    price: 2150,
    wattage: "65W",
    details: "Reliable Ride series high-speed fan from Murugappa Group, offering instant cooling and superior air thrust.",
    image: getImg("Murugappa 2.jpg"),
    rating: 4.7,
    reviews: generateReviews(8),
    specifications: { "Sweep": "900mm", "Speed": "850 RPM", "Variants": "Standard, Cabin, Decorative" }
  }
];