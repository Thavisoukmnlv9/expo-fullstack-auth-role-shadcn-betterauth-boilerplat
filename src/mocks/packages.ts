export type PackageDetail = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  placesIncluded: number;
  badge?: string;
  badgeText?: string;
};

export type FilterOption = {
  id: string;
  label: string;
  isActive?: boolean;
};

export const mockPackages: PackageDetail[] = [
  {
    id: "pkg_city_explorer",
    title: "City Explorer Pass",
    description: "Explore the city's top attractions with this flexible pass.",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    price: 49,
    currency: "USD",
    placesIncluded: 5,
    badge: "primary",
    badgeText: "48h after first use"
  },
  {
    id: "pkg_culture_history",
    title: "Culture & History Package",
    description: "Immerse yourself in the rich heritage of the city.",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    price: 65,
    currency: "USD",
    placesIncluded: 8
  },
  {
    id: "pkg_family_fun",
    title: "Family Fun Pass",
    description: "Enjoy a day of fun with the whole family at top attractions.",
    imageUrl: "https://www.tourismlaos.org/wp-content/uploads/2019/12/that-luang-1-1030x689.jpg",
    price: 120,
    currency: "USD",
    placesIncluded: 4
  }
];

export const mockFilterOptions: FilterOption[] = [
  { id: "duration", label: "Duration" },
  { id: "category", label: "Category" },
  { id: "price", label: "Price" },
  { id: "availability", label: "Availability" },
  { id: "perks", label: "Perks" }
];
