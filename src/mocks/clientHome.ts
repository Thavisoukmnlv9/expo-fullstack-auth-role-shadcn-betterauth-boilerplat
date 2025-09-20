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
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    cta: { label: "Get Coupon", action: "coupon:BEACH50" }
  },
  {
    id: "promo_2",
    title: "Mountain Escape",
    subtitle: "Explore volcanic peaks",
    badge: "30% OFF",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
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
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    id: "borobudur",
    name: "Borobudur Temple",
    category: "culture",
    location: "Java, INA",
    rating: 4.9,
    priceLabel: "$450",
    description: "Ancient Buddhist temple complex",
    image: "https://images.unsplash.com/photo-1548786811-4c1d3b0a5d4e"
  },
  {
    id: "bromo",
    name: "Mount Bromo",
    category: "mountain",
    location: "Java, INA",
    rating: 4.7,
    priceLabel: "$380",
    description: "Spectacular sunrise volcano views",
    image: "https://images.unsplash.com/photo-1535920527003-f6c29f0f9b56"
  },
  {
    id: "ubud_rice",
    name: "Ubud Rice Terraces",
    category: "culture",
    location: "Bali, INA",
    rating: 4.6,
    priceLabel: "$290",
    description: "Traditional rice terraces and culture",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
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
    imageUrl: "https://media.tacdn.com/media/attractions-splice-spp-720x480/0a/32/0e/4a.jpg",
    durationLabel: "8 hours",
    priceLabel: "From $129",
    badge: "Top 5",
  },
  {
    id: "pkg_golden",
    title: "Pha That Luang Tour",
    imageUrl: "https://assets.bucketlistly.blog/sites/5adf778b6eabcc00190b75b1/content_entry5adf77af6eabcc00190b75b6/5ae37032c2c8d80013b0ebda/files/slow-travel-temples-vientiane-laos-main-image-hd-op.webp",
    badge: "Top 5",
    durationLabel: "3 hours",
    priceLabel: "From $49",
  },
  {
    id: "pkg_explore",
    title: "Explore Vientiane",
    imageUrl: "https://www.theplanetedit.com/wp-content/uploads/2022/03/patuxai-vientiane.jpg",
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
    imageUrl: "https://picsum.photos/seed/alcatraz/160/160",
  },
  {
    id: "pl_wharf",
    name: "Morning Market",
    category: "Tourist Attraction",
    distanceLabel: "2.5 km",
    imageUrl: "https://picsum.photos/seed/wharf/160/160",
  },
  {
    id: "pl_lombard",
    name: "Sisak Street",
    category: "Landmark",
    distanceLabel: "3.1 km",
    imageUrl: "https://picsum.photos/seed/lombard/160/160",
  },
];

export const mockTicketReminders: TicketReminder[] = [
  {
    id: "t1",
    packageTitle: "Luang Prabang Heritage",
    expiresInLabel: "Expires in 1d 8h",
    actionLabel: "QR",
    imageUrl: "https://picsum.photos/seed/luang-prabang/200/120",
    status: "active",
    ticketType: "Standard",
    usageDetails: "Museum 2/3, Temple 1/2",
  },
  {
    id: "t2",
    packageTitle: "Vientiane City Explorer",
    expiresInLabel: "Starts in 3 days",
    actionLabel: "QR",
    imageUrl: "https://picsum.photos/seed/vientiane/200/120",
    status: "upcoming",
    ticketType: "VIP",
    usageDetails: "All locations available",
  },
];

export const mockPromo = {
  title: "New Year Special!",
  body: "Get 30% off on all 3-day packages",
  imageUrl: "https://picsum.photos/seed/sale/800/360",
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
