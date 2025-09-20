export interface PackageDetail {
  id: string
  name: string
  location: string
  durationHours: number
  weatherC: number
  rating: {
    score: number
    count: number
  }
  heroImage: string
  photos: string[]
  overview: string
  included: string[]
  prices: Array<{
    currency: string
    tier: string
    price: number
  }>
  reviews: Array<{
    author: string
    rating: number
    text: string
  }>
}

export const mockPackageDetail: PackageDetail = {
  id: "pkg_kuta_beach",
  name: "Kuta Beach Paradise",
  location: "Bali, INA",
  durationHours: 24,
  weatherC: 30,
  rating: { 
    score: 4.8, 
    count: 2847 
  },
  heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  photos: [
    "https://images.unsplash.com/photo-1526481280698-8fcc13fd1a8d",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090"
  ],
  overview: "Kuta Beach is one of the most famous beaches in Bali, known for its stunning sunsets, great surfing conditions, and vibrant beach culture. Experience the perfect blend of relaxation and adventure.",
  included: [
    "Beach access and facilities",
    "Surfboard rental (VIP only)",
    "Sunset viewing spot"
  ],
  prices: [
    { currency: "USD", tier: "standard", price: 950.0 },
    { currency: "USD", tier: "vip", price: 980.0 },
    { currency: "LAK", tier: "standard", price: 21400000 },
    { currency: "LAK", tier: "vip", price: 22100000 },
    { currency: "THB", tier: "standard", price: 32900 },
    { currency: "THB", tier: "vip", price: 34300 }
  ],
  reviews: [
    {
      author: "John Smith",
      rating: 5,
      text: "Amazing beach with perfect sunset views! The water is crystal clear and great for swimming."
    },
    {
      author: "Suda P.",
      rating: 4,
      text: "Loved the vibe. VIP rental made surfing easy. Can be crowded in the evening."
    }
  ]
}

export const getPackageDetail = (id: string): PackageDetail | null => {
  if (id === "pkg_kuta_beach") {
    return mockPackageDetail
  }
  return null
}
