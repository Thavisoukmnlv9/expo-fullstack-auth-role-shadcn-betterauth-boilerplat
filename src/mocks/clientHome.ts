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

export const mockUser = { name: "Pern", city: "Vientiane" };

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
    packageTitle: "Pha That Luang Tour",
    expiresInLabel: "Expires in 2 days",
    actionLabel: "OpenQR",
    imageUrl: "https://picsum.photos/seed/ggb/200/120",
  },
  {
    id: "t2",
    packageTitle: "Pha That Luang",
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
