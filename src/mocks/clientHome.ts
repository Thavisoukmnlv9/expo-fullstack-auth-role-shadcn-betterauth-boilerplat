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
};

export const mockUser = { name: "Sophia", city: "San Francisco, CA" };

export const mockCities = [
  "San Francisco, CA",
  "Los Angeles, CA",
  "New York, NY",
  "Vientiane, LA",
];

export const mockFeaturedPackages: PackageSummary[] = [
  {
    id: "pkg_golden",
    title: "Golden Gate Bridge Tour",
    imageUrl: "https://picsum.photos/seed/ggb/720/400",
    badge: "Top 5",
    durationLabel: "3 hours",
    priceLabel: "From $49",
  },
  {
    id: "pkg_explore",
    title: "Explore San Francisco",
    imageUrl: "https://picsum.photos/seed/sf/720/400",
    durationLabel: "Full day",
    priceLabel: "From $79",
  },
  {
    id: "pkg_wine",
    title: "Napa Valley Wine Tour",
    imageUrl: "https://picsum.photos/seed/napa/720/400",
    durationLabel: "8 hours",
    priceLabel: "From $129",
  },
];

export const mockNearbyPlaces: NearbyPlace[] = [
  {
    id: "pl_alcatraz",
    name: "Alcatraz Island",
    category: "Historical Site",
    distanceLabel: "1.2 km",
    imageUrl: "https://picsum.photos/seed/alcatraz/160/160",
  },
  {
    id: "pl_wharf",
    name: "Fisherman's Wharf",
    category: "Tourist Attraction",
    distanceLabel: "2.5 km",
    imageUrl: "https://picsum.photos/seed/wharf/160/160",
  },
  {
    id: "pl_lombard",
    name: "Lombard Street",
    category: "Landmark",
    distanceLabel: "3.1 km",
    imageUrl: "https://picsum.photos/seed/lombard/160/160",
  },
];

export const mockTicketReminders: TicketReminder[] = [
  {
    id: "t1",
    packageTitle: "Golden Gate Bridge Tour",
    expiresInLabel: "Expires in 2 days",
    actionLabel: "OpenQR",
    imageUrl: "https://picsum.photos/seed/ggb/200/120",
  },
  {
    id: "t2",
    packageTitle: "Alcatraz Island",
    expiresInLabel: "Expires in 5 days",
    actionLabel: "OpenQR",
    imageUrl: "https://picsum.photos/seed/alcatraz/200/120",
  },
];

export const mockPromo = {
  title: "Summer Sale",
  body: "Get 20% off on all packages. Limited time offer.",
  imageUrl: "https://picsum.photos/seed/sale/800/360",
};

export const mockSteps = [
  {
    index: 1,
    title: "Choose your package",
    caption: "Browse and select your desired attractions.",
  },
  {
    index: 2,
    title: "Purchase online",
    caption: "Securely purchase your tickets online.",
  },
  {
    index: 3,
    title: "Enjoy your visit",
    caption: "Access tickets via the app and enjoy.",
  },
];
