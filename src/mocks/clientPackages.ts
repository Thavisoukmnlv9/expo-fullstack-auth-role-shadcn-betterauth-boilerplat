import { PackageListItem } from '../types/packages'

export const mockPackages: PackageListItem[] = [
  {
    id: 'city-explorer-pass',
    title: 'City Explorer Pass',
    description: 'Explore the city\'s top attractions with this flexible pass.',
    imageUrl: 'https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg',
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
    imageUrl: 'https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg',
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
    imageUrl: 'https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg',
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
