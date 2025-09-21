export const accountMockData = {
  profile: {
    id: "user_001",
    name: "Sophia Chen",
    email: "sophia.chen@email.com",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    language: "English",
    currency: "USD"
  },
  favorites: [
    {
      id: "pkg_kuta",
      type: "package",
      title: "Kuta Beach Paradise",
      location: "Bali, INA",
      rating: 4.8,
      priceLabel: "$720",
      thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      features: ["beach", "food", "sunset", "24h"]
    },
    {
      id: "pkg_city_48h",
      type: "package",
      title: "City Explorer 48h",
      location: "Vientiane, LAO",
      rating: 4.6,
      priceLabel: "₭250,000",
      thumb: "https://images.unsplash.com/photo-1549887534-3db1bd59dcca",
      features: ["museum", "map", "family", "48h"]
    },
    {
      id: "pkg_foodie",
      type: "package",
      title: "Foodie Pass",
      location: "Night Market",
      rating: 4.7,
      priceLabel: "$59.99",
      thumb: "https://images.unsplash.com/photo-1541542684-4a4a5c36d1a8",
      features: ["food", "coupon", "evening"]
    }
  ],
  settings: {
    languages: ["Lao", "English", "Thai"],
    currencies: ["LAK", "USD", "THB"]
  }
};

// Feature icon mapping
export const featureIconMap: Record<string, string> = {
  beach: "🏖",
  museum: "🏛",
  food: "🍽",
  sunset: "🌅",
  map: "🗺",
  family: "👨‍👩‍👧‍👦",
  "24h": "🕘",
  "48h": "⏱",
  coupon: "🎟",
  evening: "🌙"
};
