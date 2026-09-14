export const initialProducts = [
  // 1. Running Shoes
  {
    id: "stepx-run-01",
    name: "STEPX VaporFly Apex Pro",
    brand: "STEPX",
    category: "Running Shoes",
    gender: "Men",
    price: 189.99,
    discountPrice: 149.99,
    discountPercent: 21,
    rating: 4.9,
    reviewsCount: 148,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 24,
    colors: [
      { name: "Electric Volt / Jet Black", hex: "#ccff00", bg: "#111" },
      { name: "Obsidian / Hyper Crimson", hex: "#ff4600", bg: "#1a1a1a" },
      { name: "Pure Stealth Black", hex: "#111111", bg: "#000000" }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Engineered for marathon-grade speed and elite energy return. Features a full-length carbon composite plate wrapped in ultra-lightweight ZoomX foam for explosive toe-offs.",
    features: [
      "Full-length carbon propulsion plate",
      "VaporWeave breathable hydrophobic upper",
      "Responsive Dual-Density Cushioning",
      "High-abrasion engineered rubber outsole"
    ],
    specs: {
      weight: "198g (Size 9)",
      heelDrop: "8mm",
      archSupport: "Neutral",
      surface: "Road / Track"
    },
    reviews: [
      { id: "r1", user: "Marcus V.", rating: 5, date: "2026-08-14", comment: "Shattered my 10K PR on first wear. Incredible bounce and feather-light feel!", verified: true },
      { id: "r2", user: "Elena R.", rating: 5, date: "2026-08-02", comment: "The carbon plate responsiveness is unparalleled. Looks even sharper in person.", verified: true }
    ]
  },
  {
    id: "stepx-run-02",
    name: "STEPX CloudPulse Ultra",
    brand: "STEPX",
    category: "Running Shoes",
    gender: "Women",
    price: 165.00,
    discountPrice: 129.99,
    discountPercent: 21,
    rating: 4.8,
    reviewsCount: 112,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    stock: 18,
    colors: [
      { name: "Frost White / Coral Glow", hex: "#ff7f50", bg: "#f5f5f5" },
      { name: "Lavish Lilac / Silver", hex: "#c8a2c8", bg: "#e6e6fa" },
      { name: "Midnight Teal", hex: "#008080", bg: "#0d2b2a" }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 10],
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Designed for endless daily training miles. High-cushion CloudCore pods eliminate impact fatigue while the 3D-knit upper hugs your foot like a custom second skin.",
    features: [
      "Multi-pod CloudCore impact absorption",
      "Seamless 3D engineered mesh",
      "Padded Achilles lockdown collar",
      "Bio-based eco-traction grip"
    ],
    specs: {
      weight: "220g (Size 7.5)",
      heelDrop: "10mm",
      archSupport: "High / Structured",
      surface: "Road / Pavement"
    },
    reviews: [
      { id: "r3", user: "Sophia K.", rating: 5, date: "2026-07-28", comment: "Cured my plantar fasciitis discomfort during long morning jogs. 10/10 recommended!", verified: true }
    ]
  },
  {
    id: "stepx-run-03",
    name: "STEPX AeroGlide Stealth",
    brand: "STEPX",
    category: "Running Shoes",
    gender: "Men",
    price: 145.00,
    discountPrice: 119.00,
    discountPercent: 18,
    rating: 4.7,
    reviewsCount: 89,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 30,
    colors: [
      { name: "Phantom Black", hex: "#1a1a1a", bg: "#000000" },
      { name: "Reflective Slate", hex: "#708090", bg: "#2f4f4f" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The essential daily runner engineered with aero-dynamic stability fins, shock-diffusing heel geometries, and moisture-wicking aerodynamic liners.",
    features: [
      "Aero dynamic airflow channel vents",
      "Dynamic arch bridge support",
      "Reflective night-run accents"
    ],
    specs: {
      weight: "245g",
      heelDrop: "9mm",
      archSupport: "Neutral",
      surface: "Road / Treadmill"
    },
    reviews: [
      { id: "r4", user: "Dave L.", rating: 4, date: "2026-07-15", comment: "Solid daily workhorse. Very durable outsole after 200 miles.", verified: true }
    ]
  },
  {
    id: "stepx-run-04",
    name: "STEPX TerraFlow Trail Runner",
    brand: "STEPX",
    category: "Running Shoes",
    gender: "Unisex",
    price: 175.00,
    discountPrice: 139.99,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 94,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    stock: 15,
    colors: [
      { name: "Earth Khaki / Safety Orange", hex: "#ff5500", bg: "#8b7355" },
      { name: "Forest Moss / Granite", hex: "#556b2f", bg: "#2f4f4f" }
    ],
    sizes: [7, 8, 9, 10, 11, 11.5, 12],
    image: "https://images.unsplash.com/photo-1551107696-a4b085a6d9a6?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b085a6d9a6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Master steep technical descents and muddy singletracks with Vibram-grade multi-directional lugs and a rock-plate reinforced midsole.",
    features: [
      "Aggressive 5mm chevron lug pattern",
      "Ballistic rock shield plate",
      "GORE-TEX water repellent coating",
      "Quick-lace bungee toggle system"
    ],
    specs: {
      weight: "280g",
      heelDrop: "6mm",
      archSupport: "Stable Trail",
      surface: "Mud / Rocky Trail / Forest"
    },
    reviews: [
      { id: "r5", user: "Toby S.", rating: 5, date: "2026-06-30", comment: "Unbeatable grip on wet boulders and mud. Keeps socks completely dry!", verified: true }
    ]
  },

  // 2. Sneakers
  {
    id: "stepx-snk-01",
    name: "STEPX Retro Air 90 High",
    brand: "STEPX",
    category: "Sneakers",
    gender: "Men",
    price: 199.99,
    discountPrice: 159.99,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 320,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    stock: 45,
    colors: [
      { name: "Chicago Red / Classic Black", hex: "#d90429", bg: "#000" },
      { name: "Shadow Grey / White", hex: "#8d99ae", bg: "#ffffff" },
      { name: "Royal Obsidian Blue", hex: "#1d3557", bg: "#0a192f" }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12, 13],
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The ultimate iconic high-top silhouette. Crafted from supple full-grain tumbled leather with heritage color blocking and an encapsulated air-sole unit.",
    features: [
      "Full-grain tumbled Italian leather",
      "Encapsulated air cushion heel unit",
      "Padded high-cut collar for ankle support",
      "Heritage pivot-circle rubber cupsole"
    ],
    specs: {
      style: "High-Top Heritage Sneaker",
      material: "100% Genuine Leather",
      closure: "Lace-up with dual eyelet locks",
      lining: "Breathable padded textile"
    },
    reviews: [
      { id: "r6", user: "Jordan B.", rating: 5, date: "2026-08-11", comment: "Grail quality! Leather feels premium right out of the box. Endless compliments.", verified: true },
      { id: "r7", user: "Liam W.", rating: 5, date: "2026-07-29", comment: "Super clean design, goes with literally any streetwear fit.", verified: true }
    ]
  },
  {
    id: "stepx-snk-02",
    name: "STEPX Cyber Dunk Low",
    brand: "STEPX",
    category: "Sneakers",
    gender: "Unisex",
    price: 150.00,
    discountPrice: 120.00,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 215,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 28,
    colors: [
      { name: "Panda Black & Crisp White", hex: "#000000", bg: "#ffffff" },
      { name: "Vintage University Blue", hex: "#70d6ff", bg: "#e0f2fe" },
      { name: "Matcha Green / Off-White", hex: "#a7c957", bg: "#f2e9e4" }
    ],
    sizes: [6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Classic low-profile skater aesthetic reinvented with modern comfort geometry. Plush foam tongue and durable cupsole provide day-long comfort.",
    features: [
      "Premium smooth leather upper",
      "Vintage pre-aged midsole finish",
      "Padded low-cut collar",
      "Perforated toe box for thermal regulation"
    ],
    specs: {
      style: "Low-Top Lifestyle Sneaker",
      material: "Premium Split & Full Leather",
      closure: "Flat cotton laces",
      weight: "340g"
    },
    reviews: [
      { id: "r8", user: "Chloe M.", rating: 5, date: "2026-08-01", comment: "The Panda colorway matches everything in my closet. Fits true to size!", verified: true }
    ]
  },
  {
    id: "stepx-snk-03",
    name: "STEPX Matrix Chunky Runner",
    brand: "STEPX",
    category: "Sneakers",
    gender: "Women",
    price: 179.00,
    discountPrice: 139.00,
    discountPercent: 22,
    rating: 4.7,
    reviewsCount: 160,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    stock: 20,
    colors: [
      { name: "Cream Alabaster / Metallic Silver", hex: "#f0ebd8", bg: "#e2e8f0" },
      { name: "Triple Monochrome White", hex: "#ffffff", bg: "#f8fafc" }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Futuristic oversized chunky sole aesthetic with multi-layered suede and technical mesh. Makes an undeniable fashion statement while maintaining supreme arch support.",
    features: [
      "Sculpted architectural EVA midsole",
      "Layered suede and breathable mesh upper",
      "TPU side stabilizer cage",
      "Memory foam comfort insole"
    ],
    specs: {
      soleHeight: "45mm",
      material: "Suede / Mesh / TPU",
      weight: "360g"
    },
    reviews: [
      { id: "r9", user: "Zoe T.", rating: 5, date: "2026-07-19", comment: "Gives me extra height and looks super chic with baggy trousers and dresses.", verified: true }
    ]
  },
  {
    id: "stepx-snk-04",
    name: "STEPX Minimalist Canvas Low",
    brand: "STEPX",
    category: "Sneakers",
    gender: "Unisex",
    price: 89.00,
    discountPrice: 69.99,
    discountPercent: 21,
    rating: 4.6,
    reviewsCount: 78,
    isNew: false,
    isBestSeller: false,
    isTrending: false,
    stock: 50,
    colors: [
      { name: "Crisp White", hex: "#ffffff", bg: "#ffffff" },
      { name: "Charcoal Black", hex: "#222222", bg: "#111111" }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Pure casual minimalism. 12oz organic canvas upper matched with vulcanized rubber foxing tape and an OrthoLite anti-microbial footbed.",
    features: [
      "100% Organic cotton canvas",
      "Reinforced rubber toe cap",
      "Vulcanized waffle grip sole"
    ],
    specs: {
      material: "Organic Canvas",
      washable: "Yes (Gentle Hand Wash)"
    },
    reviews: [
      { id: "r10", user: "Ethan C.", rating: 4, date: "2026-07-04", comment: "Great casual everyday sneaker. Super light and breathable.", verified: true }
    ]
  },

  // 3. Casual Shoes
  {
    id: "stepx-cas-01",
    name: "STEPX Urban Glide Slip-On",
    brand: "STEPX",
    category: "Casual Shoes",
    gender: "Men",
    price: 119.99,
    discountPrice: 95.00,
    discountPercent: 20,
    rating: 4.7,
    reviewsCount: 132,
    isNew: true,
    isBestSeller: true,
    isTrending: false,
    stock: 35,
    colors: [
      { name: "Heather Gray", hex: "#808080", bg: "#d3d3d3" },
      { name: "Deep Navy Blue", hex: "#000080", bg: "#191970" },
      { name: "Pitch Black", hex: "#111111", bg: "#000000" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Hands-free step-in design engineered for city commuters, travelers, and airport security speed. Adaptive knit upper flexes with every stride.",
    features: [
      "Patented Step-In collapsible heel counter",
      "Memory foam dual-layer footbed",
      "Ultra-breathable micro-knit fabric",
      "Featherweight injection-molded sole"
    ],
    specs: {
      closure: "Slip-on (Laceless)",
      weight: "185g",
      care: "Machine washable cold"
    },
    reviews: [
      { id: "r11", user: "Sammy T.", rating: 5, date: "2026-08-12", comment: "The step-in heel is genius. Easiest shoe I've ever owned.", verified: true }
    ]
  },
  {
    id: "stepx-cas-02",
    name: "STEPX Monaco Suede Loafer",
    brand: "STEPX",
    category: "Casual Shoes",
    gender: "Men",
    price: 159.00,
    discountPrice: 129.00,
    discountPercent: 18,
    rating: 4.8,
    reviewsCount: 88,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    stock: 22,
    colors: [
      { name: "Cognac Tan Suede", hex: "#9a3412", bg: "#c2410c" },
      { name: "Navy Velvet", hex: "#1e3a8a", bg: "#172554" },
      { name: "Dark Chocolate", hex: "#451a03", bg: "#291508" }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Refined Italian-inspired driving loafer crafted in velvety calf suede with rubber pebble flex grip. Ideal for smart-casual weekends and resort getaways.",
    features: [
      "Velveteen European calf suede",
      "Hand-stitched moc toe construction",
      "Segmented driver pebble outsole",
      "Supple lambskin interior lining"
    ],
    specs: {
      material: "100% Calf Suede",
      lining: "Lambskin",
      craftsmanship: "Hand-finished"
    },
    reviews: [
      { id: "r12", user: "Arthur G.", rating: 5, date: "2026-07-22", comment: "Luxurious feel, perfect with chinos and linen shirts.", verified: true }
    ]
  },
  {
    id: "stepx-cas-03",
    name: "STEPX Breeze Knit Walker",
    brand: "STEPX",
    category: "Casual Shoes",
    gender: "Women",
    price: 109.99,
    discountPrice: 84.99,
    discountPercent: 22,
    rating: 4.7,
    reviewsCount: 95,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    stock: 26,
    colors: [
      { name: "Rose Quartz / White", hex: "#f43f5e", bg: "#ffe4e6" },
      { name: "Oatmeal Heather", hex: "#e5e5e5", bg: "#f5f5f4" }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
    image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Everyday cloud-like walking comfort. Features breathable airflow jacquard mesh and an ergonomic arch bridge that prevents foot fatigue on long strolls.",
    features: [
      "Jacquard cooling ventilation weave",
      "Ergonomic arch cradle",
      "Shock absorbing honey-comb insole"
    ],
    specs: {
      weight: "170g",
      archSupport: "High Comfort"
    },
    reviews: [
      { id: "r13", user: "Maria P.", rating: 5, date: "2026-08-05", comment: "Walked 25,000 steps in Rome with zero blisters. Love these shoes!", verified: true }
    ]
  },

  // 4. Sports Shoes
  {
    id: "stepx-spt-01",
    name: "STEPX HyperCourt Pro Elite",
    brand: "STEPX",
    category: "Sports Shoes",
    gender: "Men",
    price: 169.99,
    discountPrice: 135.00,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 110,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 32,
    colors: [
      { name: "Hyper Crimson / Lightning Yellow", hex: "#ff3b19", bg: "#ffee00" },
      { name: "Cobalt Blue / Pure White", hex: "#2563eb", bg: "#ffffff" }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Built for explosive lateral agility on indoor tennis, badminton, and pickleball courts. Reinforced TPU side drag-guards prevent lateral rollover.",
    features: [
      "Lateral outrigger stability wall",
      "Non-marking multi-surface herringbone rubber",
      "Abrasion-resistant Kurim toe guard",
      "Dynamic midfoot lockdown straps"
    ],
    specs: {
      sport: "Tennis / Badminton / Pickleball",
      outsole: "Non-marking Clay/Hard Court",
      stability: "Maximum Lateral"
    },
    reviews: [
      { id: "r14", user: "Vikram N.", rating: 5, date: "2026-07-25", comment: "Insane grip on hard courts. My ankles feel 100% secure during sharp cuts.", verified: true }
    ]
  },
  {
    id: "stepx-spt-02",
    name: "STEPX StrikeForce Turf Cleat",
    brand: "STEPX",
    category: "Sports Shoes",
    gender: "Men",
    price: 139.99,
    discountPrice: 109.99,
    discountPercent: 21,
    rating: 4.8,
    reviewsCount: 74,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    stock: 19,
    colors: [
      { name: "Solar Neon / Black", hex: "#39ff14", bg: "#000000" },
      { name: "Fire Red / White", hex: "#ef4444", bg: "#ffffff" }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11],
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Precision touch soccer/football turf shoe. 3D textured ball-control upper and hundreds of micro-rubber studs for relentless traction on artificial turf.",
    features: [
      "Micro-textured grip zones for ball control",
      "Low-profile turf stud configuration",
      "Asymmetrical lace cage for clean strike zone"
    ],
    specs: {
      surface: "Artificial Grass / Turf / 3G 4G",
      upper: "SkinTouch Synthetic Microfiber"
    },
    reviews: [
      { id: "r15", user: "Carlos D.", rating: 5, date: "2026-06-18", comment: "Outstanding ball control and zero stud pressure on artificial turf.", verified: true }
    ]
  },

  // 5. Training Shoes
  {
    id: "stepx-trn-01",
    name: "STEPX Metrix CrossTrain 5",
    brand: "STEPX",
    category: "Training Shoes",
    gender: "Unisex",
    price: 155.00,
    discountPrice: 124.99,
    discountPercent: 19,
    rating: 4.9,
    reviewsCount: 190,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 40,
    colors: [
      { name: "Stealth Black / Gunmetal", hex: "#334155", bg: "#0f172a" },
      { name: "Military Olive / Safety Orange", hex: "#65a30d", bg: "#ea580c" },
      { name: "Chalk White / Gum Sole", hex: "#f8fafc", bg: "#d97706" }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The gold standard for CrossFit, HIIT, and heavy barbell lifts. Wide, flat heel base with removable HyperLift insert creates an unshakeable platform.",
    features: [
      "Wide flat heel with rigid internal plate",
      "Rope-wrap rubber sidewalls for rope climbs",
      "Breathable tear-resistant chain-link mesh upper",
      "Handstand push-up heel clip"
    ],
    specs: {
      heelDrop: "4mm (expandable to 8mm)",
      purpose: "CrossFit / Weightlifting / HIIT",
      sole: "High-density dual compound"
    },
    reviews: [
      { id: "r16", user: "Brock H.", rating: 5, date: "2026-08-16", comment: "Squatting 405 feels glued to the floor. Best training shoe on the market.", verified: true },
      { id: "r17", user: "Hannah M.", rating: 5, date: "2026-07-30", comment: "Great flexibility for box jumps and burpees without sacrificing stability.", verified: true }
    ]
  },
  {
    id: "stepx-trn-02",
    name: "STEPX FlexPower Gym Core",
    brand: "STEPX",
    category: "Training Shoes",
    gender: "Women",
    price: 129.99,
    discountPrice: 99.99,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 84,
    isNew: false,
    isBestSeller: false,
    isTrending: false,
    stock: 25,
    colors: [
      { name: "Dusty Rose / Charcoal", hex: "#fb7185", bg: "#334155" },
      { name: "Pure Onyx Black", hex: "#000000", bg: "#1e293b" }
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Versatile gym sneaker designed for agility, functional bodyweight circuits, and treadmill warm-ups. Deep flex grooves promote natural foot mechanics.",
    features: [
      "Tri-star multi-directional flex grooves",
      "Flywire midfoot integration cords",
      "Soft padded heel cup prevents slippage"
    ],
    specs: {
      flexibility: "Extreme 360° Flex",
      weight: "195g"
    },
    reviews: [
      { id: "r18", user: "Jessica W.", rating: 5, date: "2026-07-12", comment: "Incredibly flexible and lightweight. Ideal for my daily pilates and HIIT classes.", verified: true }
    ]
  },

  // 6. Basketball Shoes
  {
    id: "stepx-bb-01",
    name: "STEPX DunkMaster Air High",
    brand: "STEPX",
    category: "Basketball Shoes",
    gender: "Men",
    price: 195.00,
    discountPrice: 159.00,
    discountPercent: 18,
    rating: 4.9,
    reviewsCount: 245,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 36,
    colors: [
      { name: "Solar Orange / Royal Black", hex: "#ff4500", bg: "#000000" },
      { name: "Lakers Purple & Gold", hex: "#7e22ce", bg: "#eab308" },
      { name: "Triple Stealth", hex: "#111111", bg: "#1f2937" }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Pro-level basketball shoe engineered for high-flying dunkers and explosive slashers. Double-stacked pressurized Air Zoom units deliver maximum vertical launch.",
    features: [
      "Double-stacked forefoot Zoom Air pods",
      "Carbon fiber midfoot shank for torsional rigidity",
      "Molded ankle collar with memory foam cushions",
      "Translucent multi-zone radial traction grip"
    ],
    specs: {
      cushioning: "Max Air Zoom Double Stack",
      collarHeight: "High-Top 3/4 Collar",
      surface: "Indoor Hardwood & Outdoor Streetball"
    },
    reviews: [
      { id: "r19", user: "DeAndre K.", rating: 5, date: "2026-08-18", comment: "The bounce is ridiculous. Landing feels like landing on pillows. 10/10 court feel.", verified: true },
      { id: "r20", user: "Trey M.", rating: 5, date: "2026-08-04", comment: "No heel slip whatsoever. Screeching grip on indoor wood floors.", verified: true }
    ]
  },
  {
    id: "stepx-bb-02",
    name: "STEPX CourtVision Zero Low",
    brand: "STEPX",
    category: "Basketball Shoes",
    gender: "Men",
    price: 160.00,
    discountPrice: 129.99,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 130,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    stock: 22,
    colors: [
      { name: "Cyan Teal / Neon Lime", hex: "#06b6d4", bg: "#84cc16" },
      { name: "Oreo Black & White", hex: "#0f172a", bg: "#f8fafc" }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Low-cut speed weapon designed for sharpshooters and playmaking point guards who need rapid directional crossovers and unrestricted ankle mobility.",
    features: [
      "Low-cut featherweight design",
      "Full-length responsive React foam",
      "Herringbone blade multi-angle rubber",
      "Reinforced ripstop wireframe upper"
    ],
    specs: {
      position: "Point Guard / Shooting Guard",
      weight: "325g",
      closure: "Adaptive Ghillie Lacing"
    },
    reviews: [
      { id: "r21", user: "Kyrie A.", rating: 5, date: "2026-07-14", comment: "Fastest shoe on the hardwood. Super responsive court feel for handles.", verified: true }
    ]
  },

  // 7. Formal Shoes
  {
    id: "stepx-for-01",
    name: "STEPX Oxford Royal Cap-Toe",
    brand: "STEPX",
    category: "Formal Shoes",
    gender: "Men",
    price: 249.99,
    discountPrice: 199.99,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 165,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 18,
    colors: [
      { name: "Hand-Burnished Mahogany", hex: "#78350f", bg: "#451a03" },
      { name: "Jet Black Mirror Finish", hex: "#000000", bg: "#171717" }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The pinnacle of black-tie sophistication. Goodyear-welted full-grain French calfskin with a hand-burnished cap-toe and concealed memory cushioning.",
    features: [
      "Goodyear Welted construction (resoleable for life)",
      "French box calf leather with hand-stained patina",
      "Cork-filled cavity molds to your foot shape",
      "Solid stacked leather heel with brass nail accents"
    ],
    specs: {
      construction: "360° Goodyear Welt",
      sole: "Oiled Italian Leather Sole",
      origin: "Handcrafted in Portugal"
    },
    reviews: [
      { id: "r22", user: "Alexander B.", rating: 5, date: "2026-08-09", comment: "Wore them for my wedding. Superb craftsmanship and shockingly comfortable.", verified: true },
      { id: "r23", user: "Jonathan D.", rating: 5, date: "2026-07-21", comment: "Better finish than shoes double the price. The patina is gorgeous.", verified: true }
    ]
  },
  {
    id: "stepx-for-02",
    name: "STEPX Milano Double Monk Strap",
    brand: "STEPX",
    category: "Formal Shoes",
    gender: "Men",
    price: 229.00,
    discountPrice: 185.00,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 92,
    isNew: true,
    isBestSeller: false,
    isTrending: true,
    stock: 14,
    colors: [
      { name: "Cognac Amber", hex: "#b45309", bg: "#78350f" },
      { name: "Midnight Noir", hex: "#0a0a0a", bg: "#000000" }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sartorial flair meets modern elegance. Double buckle monk straps in antique gunmetal hardware with sweeping quarter lines and chiselled toe box.",
    features: [
      "Dual brushed gunmetal buckles",
      "Full-grain calfskin leather",
      "Gentle elastic gusset on instep strap for effortless entry"
    ],
    specs: {
      closure: "Dual Buckle Monk Straps",
      leather: "Calfskin Crust",
      style: "Business & Formal"
    },
    reviews: [
      { id: "r24", user: "Sebastian K.", rating: 5, date: "2026-07-16", comment: "The buckles add so much personality to a navy suit.", verified: true }
    ]
  },
  {
    id: "stepx-for-03",
    name: "STEPX Kensington Chelsea Boot",
    brand: "STEPX",
    category: "Formal Shoes",
    gender: "Unisex",
    price: 219.00,
    discountPrice: 175.00,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 140,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    stock: 25,
    colors: [
      { name: "Midnight Black Napa", hex: "#171717", bg: "#000000" },
      { name: "Tobacco Brown Suede", hex: "#92400e", bg: "#451a03" }
    ],
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The timeless silhouette that transitions effortlessly from the boardroom to night out. Premium elastic side gores and woven pull-tabs for effortless on/off.",
    features: [
      "Wholecut clean vamp design",
      "Heavy-duty woven pull tabs",
      "Reinforced elastic side gores",
      "Dainite-style studded rubber sole for wet weather grip"
    ],
    specs: {
      shaftHeight: "15cm",
      sole: "Rubber studded all-weather",
      material: "Premium Napa / Suede"
    },
    reviews: [
      { id: "r25", user: "Edward V.", rating: 5, date: "2026-08-10", comment: "Sleek profile, no bulky toe. Perfect with tailored slim trousers.", verified: true }
    ]
  },

  // 8. Sandals & Slides
  {
    id: "stepx-san-01",
    name: "STEPX HydroComfort Recovery Slide",
    brand: "STEPX",
    category: "Sandals",
    gender: "Unisex",
    price: 59.99,
    discountPrice: 44.99,
    discountPercent: 25,
    rating: 4.8,
    reviewsCount: 280,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 60,
    colors: [
      { name: "Matte Charcoal", hex: "#262626", bg: "#0a0a0a" },
      { name: "Bone White", hex: "#f5f5f4", bg: "#e7e5e4" },
      { name: "Vibrant Volt Accent", hex: "#ccff00", bg: "#1c1917" }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Post-workout recovery slides injected with super-plush EVA marshmallow foam that absorbs 37% more impact than standard footwear foams.",
    features: [
      "Proprietary OOfoam recovery technology",
      "Ergonomic sculpted footbed cradle",
      "Waterproof and floatable design",
      "Anti-slip textured inner sole"
    ],
    specs: {
      material: "100% Closed-Cell Injected Foam",
      waterproof: "100% Waterproof",
      weight: "120g"
    },
    reviews: [
      { id: "r26", user: "Claire D.", rating: 5, date: "2026-08-15", comment: "Putting these on after a 15-mile run is pure heaven for the feet.", verified: true }
    ]
  },
  {
    id: "stepx-san-02",
    name: "STEPX TrailTrek Rugged Adventure Sandal",
    brand: "STEPX",
    category: "Sandals",
    gender: "Unisex",
    price: 89.99,
    discountPrice: 69.99,
    discountPercent: 22,
    rating: 4.7,
    reviewsCount: 110,
    isNew: false,
    isBestSeller: false,
    isTrending: false,
    stock: 30,
    colors: [
      { name: "Desert Khaki / Black", hex: "#a8a29e", bg: "#292524" },
      { name: "Canyon Orange / Teal", hex: "#f97316", bg: "#0f766e" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "All-terrain river and trail strap sandal with triple adjustable velcro webbings, quick-dry neoprene padding, and aggressive rubber lug traction.",
    features: [
      "Triple-point customizable velcro fit",
      "Quick-dry REPREVE recycled webbing",
      "ShocPad heel absorption cushion",
      "Spider Rubber water-drainage outsole"
    ],
    specs: {
      purpose: "Kayaking / River Rafting / Hiking",
      straps: "Water-resistant Recycled Webbing"
    },
    reviews: [
      { id: "r27", user: "Nick G.", rating: 5, date: "2026-07-08", comment: "Stayed secure through raging river currents and muddy trails.", verified: true }
    ]
  },

  // 9. Kids Shoes
  {
    id: "stepx-kid-01",
    name: "STEPX Junior Speedster Flash",
    brand: "STEPX",
    category: "Kids Shoes",
    gender: "Kids",
    price: 69.99,
    discountPrice: 49.99,
    discountPercent: 29,
    rating: 4.9,
    reviewsCount: 175,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 45,
    colors: [
      { name: "Electric Cyan / Neon Pink", hex: "#06b6d4", bg: "#ec4899" },
      { name: "Racer Red / Black", hex: "#dc2626", bg: "#18181b" }
    ],
    sizes: [1, 2, 3, 4, 5, 6],
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Built for non-stop playground energy! Easy on-off hook-and-loop velcro strap with elastic laces, ultra-cushioned foam, and non-marking scuff-free soles.",
    features: [
      "Easy-strap hook and loop + elastic bungee",
      "Reinforced rubber toe cap for kick durability",
      "Light-up step motion sensor heel pods",
      "Breathable washable knit mesh"
    ],
    specs: {
      closure: "Velcro Strap & Elastic",
      weight: "140g",
      ageGroup: "Kids (4-12 years)"
    },
    reviews: [
      { id: "r28", user: "Sarah L.", rating: 5, date: "2026-08-17", comment: "My 7-year-old puts them on in 3 seconds flat. Holds up great against playground kicks!", verified: true }
    ]
  },
  {
    id: "stepx-kid-02",
    name: "STEPX Little Star High-Top",
    brand: "STEPX",
    category: "Kids Shoes",
    gender: "Kids",
    price: 65.00,
    discountPrice: 52.00,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 89,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    stock: 28,
    colors: [
      { name: "Rainbow Galaxy Glow", hex: "#a855f7", bg: "#3b82f6" },
      { name: "Monochrome White Leather", hex: "#ffffff", bg: "#f4f4f5" }
    ],
    sizes: [1, 2, 3, 4, 5],
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Stylish retro high-top with side-zip entry for quick access. Padded ankle collar protects little ankles during running and jumping games.",
    features: [
      "Inner zipper for swift entry without untying laces",
      "Soft padded collar and tongue",
      "Durable synthetic leather easy to wipe clean"
    ],
    specs: {
      closure: "Laces + Side Zip",
      material: "Easy-wipe Synthetic Leather"
    },
    reviews: [
      { id: "r29", user: "Danielle P.", rating: 5, date: "2026-07-27", comment: "The side zipper is a lifesaver every morning before school.", verified: true }
    ]
  },

  // Additional Premium Showcases for total 32 products
  {
    id: "stepx-ltd-01",
    name: "STEPX Quantum Carbon X [Limited Drop]",
    brand: "STEPX",
    category: "Running Shoes",
    gender: "Unisex",
    price: 299.99,
    discountPrice: 249.99,
    discountPercent: 17,
    rating: 5.0,
    reviewsCount: 88,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    isLimited: true,
    stock: 8,
    colors: [
      { name: "Cyber Volt / Metallic Titanium", hex: "#ccff00", bg: "#0a0a0a" }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Limited Edition World Athletics approved super-shoe. Ultra-curved carbon chassis with nitrogen-infused hyper-foam. Only 500 numbered pairs produced globally.",
    features: [
      "Numbered limited edition laser engraved heel",
      "100% autoclave cured curved carbon plate",
      "Supercritical nitrogen foaming matrix",
      "Featherweight 178 grams"
    ],
    specs: {
      edition: "Limited Release (500 pairs worldwide)",
      weight: "178g",
      certification: "World Athletics Certified"
    },
    reviews: [
      { id: "r30", user: "Eliud O.", rating: 5, date: "2026-08-20", comment: "Pure magic on race day. Unbelievable return on every stride.", verified: true }
    ]
  },
  {
    id: "stepx-snk-05",
    name: "STEPX Obsidian Prime Low",
    brand: "STEPX",
    category: "Sneakers",
    gender: "Men",
    price: 139.00,
    discountPrice: 109.00,
    discountPercent: 22,
    rating: 4.8,
    reviewsCount: 104,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    stock: 24,
    colors: [
      { name: "Total Obsidian", hex: "#0b0f19", bg: "#000000" },
      { name: "Smoke Gray", hex: "#64748b", bg: "#1e293b" }
    ],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 11, 12],
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sleek low-cut court sneaker with waxed laces and a plush memory sockliner designed for sharp everyday style.",
    features: [
      "Tumbled leather upper",
      "Waxed water-repellent laces",
      "Cushioned tongue"
    ],
    specs: {
      material: "Top Grain Leather",
      weight: "310g"
    },
    reviews: [
      { id: "r31", user: "Mason F.", rating: 5, date: "2026-07-10", comment: "Top tier styling. Pairs with jeans or trousers perfectly.", verified: true }
    ]
  },
  {
    id: "stepx-spt-03",
    name: "STEPX AeroTrack Speed Spike",
    brand: "STEPX",
    category: "Sports Shoes",
    gender: "Unisex",
    price: 149.00,
    discountPrice: 119.00,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 66,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    stock: 16,
    colors: [
      { name: "Neon Acid Yellow / Carbon", hex: "#e2ff3b", bg: "#111" }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Track and field sprint spikes featuring a 6-pin removable spike plate and aerodynamic heel shroud for 100m to 400m acceleration.",
    features: [
      "6-pin lightweight aluminum spike plate",
      "Spike wrench and spare spikes included",
      "Seamless monofilament upper"
    ],
    specs: {
      sport: "Track & Field Sprinting",
      weight: "145g"
    },
    reviews: [
      { id: "r32", user: "Justin G.", rating: 5, date: "2026-08-03", comment: "Explosive out of the starting blocks. Lightweight perfection.", verified: true }
    ]
  }
];

export const productCategories = [
  "All Shoes",
  "Running Shoes",
  "Sneakers",
  "Casual Shoes",
  "Sports Shoes",
  "Training Shoes",
  "Basketball Shoes",
  "Formal Shoes",
  "Sandals",
  "Kids Shoes"
];

export const shoeSizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
