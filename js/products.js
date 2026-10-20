// HARSH Walkwear - Product Catalog Data
// Inspired by Neeman's minimalist comfort footwear
// Color-Synced Realistic Product Images

const PRODUCTS = [
  {
    id: "harsh-cloud-wool-01",
    name: "The Cloud Merino Classic",
    subtitle: "All-day breathable wool sneaker with featherlight sole",
    category: "sneakers",
    badge: "Bestseller",
    price: 2899,
    originalPrice: 4299,
    spec: "Australian Merino Wool",
    isNew: false,
    description: "Crafted with 100% natural Merino wool fibers, this flagship sneaker regulates temperature to keep your feet cool in summer and warm in winter. Designed without stiffeners for zero break-in time from your first step in Chandigarh or anywhere across the globe.",
    materials: "Australian Merino Wool Upper, Castor Bean Oil Insole, Sugar-cane Derived EVA Sole",
    weight: "220g (Ultra Light)",
    sizes: [6, 7, 8, 9, 10, 11],
    features: [
      "Natural Merino Wool - Odor-free & breathable",
      "No socks required - Super soft plush inner",
      "Shock-absorbing bounce sole",
      "Machine washable with cold gentle cycle"
    ],
    colors: [
      {
        name: "Oatmeal Stone",
        hex: "#D8C7B5",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        filter: "none",
        gallery: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Obsidian Black",
        hex: "#1E1E24",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(0.32) contrast(1.3) grayscale(0.85)",
        gallery: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Sage Eucalyptus",
        hex: "#6B7F6D",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.35) hue-rotate(65deg) saturate(0.9) brightness(0.88)",
        gallery: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Terracotta Amber",
        hex: "#B45309",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.55) hue-rotate(-15deg) saturate(1.4) brightness(0.88)",
        gallery: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
        ]
      }
    ]
  },
  {
    id: "harsh-merino-slipon-02",
    name: "Breeze Knit Slip-On",
    subtitle: "Effortless laceless comfort for quick transitions",
    category: "slipons",
    badge: "Most Loved",
    price: 2499,
    originalPrice: 3599,
    spec: "Recycled Ocean Knit",
    isNew: true,
    description: "Slip on, step out. Engineered with high-tensile breathable knit weave that flexes with your stride. Ergonomic heel cushion prevents slipping while hugging your ankles in cloud-soft comfort.",
    materials: "Recycled Ocean Plastic Knit Yarn, Memory Arch Insole, Flexible Honeycomb Rubber Base",
    weight: "195g (Featherweight)",
    sizes: [6, 7, 8, 9, 10, 11],
    features: [
      "Stretch collar for effortless hands-free wear",
      "Dynamic arch support for all-day standing",
      "Breathable air-mesh keeps sweat away",
      "Anti-skid textured traction pattern"
    ],
    colors: [
      {
        name: "Chalk Ivory",
        hex: "#EAE6DF",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(1.05) contrast(0.95)",
        gallery: [
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1617606002842-9988a876a394?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Fog Charcoal",
        hex: "#383B3E",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(0.4) grayscale(0.9) contrast(1.15)",
        gallery: [
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1617606002842-9988a876a394?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Desert Sand",
        hex: "#C2A88F",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.5) hue-rotate(5deg) saturate(1.1) brightness(0.9)",
        gallery: [
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Olive Pine",
        hex: "#4F5D48",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.4) hue-rotate(70deg) saturate(0.85) brightness(0.75)",
        gallery: [
          "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80"
        ]
      }
    ]
  },
  {
    id: "harsh-reknit-loafer-03",
    name: "The Urban ReKnit Loafer",
    subtitle: "Modern tailored silhouette meets casual athletic comfort",
    category: "loafers",
    badge: "Trending",
    price: 3199,
    originalPrice: 4799,
    spec: "Organic Hemp & Cork Sole",
    isNew: false,
    description: "Work meetings, evening cafe visits in Sector 35, or weekend travels. The Urban Loafer brings tailored sophistication with zero stiffness, thanks to premium organic weaves and structured heel contours.",
    materials: "Organic Cotton & Hemp Blend, Natural Cork Infused Cushion, Soft Gum Sole",
    weight: "240g",
    sizes: [7, 8, 9, 10, 11],
    features: [
      "Classic penny loafer profile with athletic sole",
      "Cork footbed with natural anti-microbial properties",
      "Zero heel rub with velvet-lined collar",
      "Durable water-repellent eco coating"
    ],
    colors: [
      {
        name: "Vintage Cognac",
        hex: "#8B5A2B",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        filter: "none",
        gallery: [
          "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Midnight Onyx",
        hex: "#1C1C1E",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(0.35) contrast(1.2) grayscale(0.8)",
        gallery: [
          "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Deep Navy",
        hex: "#1E293B",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.3) hue-rotate(185deg) saturate(1.2) brightness(0.65)",
        gallery: [
          "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80"
        ]
      }
    ]
  },
  {
    id: "harsh-active-stride-04",
    name: "AeroGlide Daily Walker",
    subtitle: "High rebound energy return for 10,000+ daily steps",
    category: "walkers",
    badge: "Cloud Sole",
    price: 3499,
    originalPrice: 4999,
    spec: "Supercritical Bio-Foam",
    isNew: true,
    description: "Engineered specifically for active walkers and commuters. Features a double-density supercritical foam midsole that propels you forward with every stride while relieving knee & heel pressure.",
    materials: "Engineered Jacquard Breathable Mesh, Aeroglide Supercritical Foam, Carbon Rubber Pods",
    weight: "235g",
    sizes: [6, 7, 8, 9, 10, 11],
    features: [
      "Double cushion midsole absorbing 85% impact",
      "Wide toe box allowing natural toe splay",
      "Reflective accents for evening Sukhna Lake strolls",
      "Grip engineered for wet and dry pavements"
    ],
    colors: [
      {
        name: "Pure Chalk White",
        hex: "#F4F4F5",
        image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80",
        filter: "none",
        gallery: [
          "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Stealth Black",
        hex: "#1A1A1C",
        image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(0.3) contrast(1.3) grayscale(0.9)",
        gallery: [
          "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Slate Graphite",
        hex: "#55606E",
        image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80",
        filter: "grayscale(0.6) brightness(0.65) contrast(1.1)",
        gallery: [
          "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80"
        ]
      }
    ]
  },
  {
    id: "harsh-canvas-oxford-05",
    name: "The Minimalist Derby",
    subtitle: "Semi-formal elegance with the soft feel of a sneaker",
    category: "loafers",
    badge: "Premium Edition",
    price: 3699,
    originalPrice: 5299,
    spec: "High-Density Eco Canvas",
    isNew: false,
    description: "The shoe you can wear to boardroom meetings and keep on for rooftop dinners. Built with structured organic canvas and hand-stitched welt detailing, it eliminates the rigid pain of traditional dress shoes.",
    materials: "Premium High-Density Canvas, Vegetal Tanned Leather Accents, Ergonomic Flex Sole",
    weight: "260g",
    sizes: [7, 8, 9, 10, 11],
    features: [
      "Discreet elastic eyelet flex for snug fit",
      "Dual-layer latex foam arch support",
      "Timeless minimalist silhouette without loud branding",
      "Stain-resistant nano shield treatment"
    ],
    colors: [
      {
        name: "Espresso Mocha",
        hex: "#4A3525",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
        filter: "none",
        gallery: [
          "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Jet Obsidian",
        hex: "#18181B",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(0.4) grayscale(0.9) contrast(1.2)",
        gallery: [
          "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Caramel Tan",
        hex: "#A67449",
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.5) saturate(1.3) brightness(1.1)",
        gallery: [
          "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80"
        ]
      }
    ]
  },
  {
    id: "harsh-retro-court-06",
    name: "Retro Heritage Court",
    subtitle: "80s tennis court heritage re-engineered with cloud tech",
    category: "sneakers",
    badge: "Harsh Exclusive",
    price: 2999,
    originalPrice: 4499,
    spec: "Recycled Microfiber Leather",
    isNew: true,
    description: "Inspired by vintage court shoes, reimagined with sustainable luxury materials. Clean perforated detailing, contrast heel tab, and our proprietary cushioned cupsole make this the ultimate everyday style weapon.",
    materials: "Recycled Microfiber Leather, Organic Cotton Lining, Natural Rubber Cupsole",
    weight: "270g",
    sizes: [6, 7, 8, 9, 10, 11],
    features: [
      "Supple vegan microfiber - scuff resistant",
      "Signature Harsh vintage court emblem",
      "Ortholite hybrid memory footbed",
      "Reinforced toe cap for extended durability"
    ],
    colors: [
      {
        name: "Triple White Minimal",
        hex: "#FFFFFF",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(1.05) contrast(1.02)",
        gallery: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "White & Terracotta",
        hex: "#C05621",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.35) hue-rotate(-25deg) saturate(1.2)",
        gallery: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Shadow Night",
        hex: "#22252A",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(0.35) contrast(1.2) grayscale(0.8)",
        gallery: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80"
        ]
      }
    ]
  },
  {
    id: "harsh-trail-runner-08",
    name: "The Chandigarh Trail Strider",
    subtitle: "All-weather grip for park walks, trails, and urban commute",
    category: "walkers",
    badge: "New Release",
    price: 3799,
    originalPrice: 5499,
    spec: "Chevron All-Weather Lug",
    isNew: true,
    description: "Designed right here in the City Beautiful. Engineered with multi-directional chevron lug rubber soles that grip wet grass, gravel, and marble floors effortlessly, paired with water-resistant ripstop knit upper.",
    materials: "Ripstop Eco-Knit Upper, Dual-Density EVA Core, Rugged Rubber Lug Outsole",
    weight: "275g",
    sizes: [7, 8, 9, 10, 11],
    features: [
      "4mm chevron lugs for supreme traction",
      "Mudguard reinforcement around toe and heel",
      "Breathable membrane that keeps splashes out",
      "Quick-cinch speed lacing mechanism"
    ],
    colors: [
      {
        name: "Olive Khaki",
        hex: "#556B2F",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.4) hue-rotate(60deg) saturate(0.9) brightness(0.85)",
        gallery: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Shadow Night",
        hex: "#1F2937",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
        filter: "brightness(0.32) contrast(1.25) grayscale(0.85)",
        gallery: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80"
        ]
      },
      {
        name: "Desert Dune",
        hex: "#C5A880",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
        filter: "sepia(0.5) saturate(1.2) brightness(0.95)",
        gallery: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80"
        ]
      }
    ]
  }
];

// Promotional Coupons
const PROMO_CODES = {
  "HARSH10": { discountPercent: 10, label: "10% Off Your Entire Order" },
  "CHANDIGARH": { flatDiscount: 300, label: "₹300 City Exclusive Privilege" },
  "WELCOME500": { flatDiscount: 500, minOrder: 3000, label: "₹500 Off (Orders over ₹3,000)" }
};
