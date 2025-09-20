import { PackageListItem } from '../types/packages'

export const mockPackages: PackageListItem[] = [
  {
    id: 'city-explorer-pass',
    title: 'City Explorer Pass',
    description: 'Explore the city\'s top attractions with this flexible pass.',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=225&fit=crop',
    validityBadge: '48h after first use',
    includesPlacesCount: 5,
    price: {
      amount: 49,
      currency: 'USD',
      formatted: '$49'
    }
  },
  {
    id: 'culture-history-package',
    title: 'Culture & History Package',
    description: 'Immerse yourself in the rich heritage of the city.',
    imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c0a4?w=400&h=225&fit=crop',
    includesPlacesCount: 8,
    price: {
      amount: 65,
      currency: 'USD',
      formatted: '$65'
    }
  },
  {
    id: 'family-fun-pass',
    title: 'Family Fun Pass',
    description: 'Enjoy a day of fun with the whole family at top attractions.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=225&fit=crop',
    includesPlacesCount: 4,
    price: {
      amount: 120,
      currency: 'USD',
      formatted: '$120'
    }
  }
]

export const filterOptions = {
  duration: ['24h', '48h', '72h', '7d'],
  category: ['All', 'Culture', 'Nature', 'Family', 'Food'],
  price: ['Low', 'Medium', 'High'],
  availability: ['Relative', 'Fixed Dates'],
}
