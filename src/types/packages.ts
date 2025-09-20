export type PriceDisplay = {
  amount: number        // 49, 65, 120
  currency: 'USD' | 'LAK' | 'THB'
  formatted: string     // "$49", "₭250,000"
}

export type PackageListItem = {
  id: string
  title: string
  description: string
  imageUrl: string
  validityBadge?: string    // "48h after first use"
  includesPlacesCount: number
  price: PriceDisplay
}
