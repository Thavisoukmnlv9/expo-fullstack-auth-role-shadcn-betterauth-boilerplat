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
