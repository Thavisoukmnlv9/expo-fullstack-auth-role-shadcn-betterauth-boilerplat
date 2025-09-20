export type Promotion = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  cta: {
    label: string;
    action: string;
  };
};

export type Category = {
  id: string;
  label: string;
  icon: string;
  active: boolean;
};

export type FeaturedPlace = {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  priceLabel: string;
  description: string;
  image: string;
};

export type Ticket = {
  id: string;
  packageName: string;
  tier: string;
  status: 'active' | 'upcoming' | 'expired';
  validity: string;
  expiresAt: string;
  qrPublicId: string;
};

export type PackageSummary = {
  id: string;
  title: string;
  imageUrl: string;
  badge?: string;
  durationLabel: string;
  priceLabel: string;
};

export type NearbyPlace = {
  id: string;
  name: string;
  category: string;
  distanceLabel: string;
  imageUrl: string;
};

export type TicketReminder = {
  id: string;
  packageTitle: string;
  expiresInLabel: string;
  actionLabel?: string;
  imageUrl?: string;
  status: 'active' | 'upcoming' | 'expired';
  ticketType: 'Standard' | 'VIP' | 'Premium';
  usageDetails?: string;
};

export const mockUser = { name: "Pern", city: "Vientiane" };

export const mockPromotions: Promotion[] = [
  {
    id: "promo_1",
    title: "Beach Paradise Special",
    subtitle: "Visit 3 beaches get 50% off",
    badge: "50% OFF",
    image: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    cta: { label: "Get Coupon", action: "coupon:BEACH50" }
  },
  {
    id: "promo_2",
    title: "Mountain Escape",
    subtitle: "Explore volcanic peaks",
    badge: "30% OFF",
    image: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    cta: { label: "Book Now", action: "navigate:/packages" }
  }
];

export const mockCategories: Category[] = [
  { id: "all", label: "All", icon: "Sparkles", active: true },
  { id: "beach", label: "Beach", icon: "Sun", active: false },
  { id: "mountain", label: "Mountain", icon: "Mountain", active: false },
  { id: "food", label: "Food", icon: "Utensils", active: false },
  { id: "family", label: "Family", icon: "Users", active: false }
];

export const mockFeaturedPlaces: FeaturedPlace[] = [
  {
    id: "pkg_kuta_beach",
    name: "Kuta Beach Paradise",
    category: "beach",
    location: "Bali, INA",
    rating: 4.8,
    priceLabel: "$720",
    description: "Perfect for surfing and sunset views",
    image: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg"
  },
  {
    id: "borobudur",
    name: "Borobudur Temple",
    category: "culture",
    location: "Java, INA",
    rating: 4.9,
    priceLabel: "$450",
    description: "Ancient Buddhist temple complex",
    image: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg"
  },
  {
    id: "bromo",
    name: "Mount Bromo",
    category: "mountain",
    location: "Java, INA",
    rating: 4.7,
    priceLabel: "$380",
    description: "Spectacular sunrise volcano views",
    image: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg"
  },
  {
    id: "ubud_rice",
    name: "Ubud Rice Terraces",
    category: "culture",
    location: "Bali, INA",
    rating: 4.6,
    priceLabel: "$290",
    description: "Traditional rice terraces and culture",
    image: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg"
  }
];

export const mockTickets: Ticket[] = [
  {
    id: "tix_001",
    packageName: "City Explorer 48h",
    tier: "Standard",
    status: "active",
    validity: "48h after first use",
    expiresAt: "2025-09-21T13:00:00Z",
    qrPublicId: "QR123XYZ"
  }
];

export const mockCities = [
  "Vientiane",
  "Luang Prabang",
  "Pakse",
  "Savannakhet",
  "Thakhek",
  "Luang Namtha",
  "Muang Xay",
  "Phonsavan",
];

export const mockFeaturedPackages: PackageSummary[] = [
  {
    id: "pkg_wine",
    title: "Luang Prabang Tour",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    durationLabel: "8 hours",
    priceLabel: "From $129",
    badge: "Top 5",
  },
  {
    id: "pkg_golden",
    title: "Pha That Luang Tour",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    badge: "Top 5",
    durationLabel: "3 hours",
    priceLabel: "From $49",
  },
  {
    id: "pkg_explore",
    title: "Explore Vientiane",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    durationLabel: "Full day",
    priceLabel: "From $79",
  },
];

export const mockNearbyPlaces: NearbyPlace[] = [
  {
    id: "pl_alcatraz",
    name: "Pha That Luang",
    category: "Historical Site",
    distanceLabel: "1.2 km",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
  },
  {
    id: "pl_wharf",
    name: "Morning Market",
    category: "Tourist Attraction",
    distanceLabel: "2.5 km",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
  },
  {
    id: "pl_lombard",
    name: "Sisak Street",
    category: "Landmark",
    distanceLabel: "3.1 km",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
  },
];

export const mockTicketReminders: TicketReminder[] = [
  {
    id: "t1",
    packageTitle: "Luang Prabang Heritage",
    expiresInLabel: "Expires in 1d 8h",
    actionLabel: "QR",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    status: "active",
    ticketType: "Standard",
    usageDetails: "Museum 2/3, Temple 1/2",
  },
  {
    id: "t2",
    packageTitle: "Vientiane City Explorer",
    expiresInLabel: "Starts in 3 days",
    actionLabel: "QR",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    status: "upcoming",
    ticketType: "VIP",
    usageDetails: "All locations available",
  },
];

export const mockPromo = {
  title: "New Year Special!",
  body: "Get 30% off on all 3-day packages",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
  buttonText: "Claim Now",
};

export const mockSteps = [
  {
    index: 1,
    title: "Buy",
    caption: "Choose your package",
  },
  {
    index: 2,
    title: "Scan",
    caption: "Show QR at locations",
  },
  {
    index: 3,
    title: "Enjoy",
    caption: "Explore amazing places",
  },
];
