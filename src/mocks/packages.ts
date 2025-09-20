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
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYIngSIOvTbOaFWeIvU7WLhB66Ub9lSj876es2Ivv7Z_K2Ha1i9LvP-hwYwMxQcBSL65jnrAAj0Pt6qPVNlkK0br6EhivCgCVS--pglY8oANbSBijdn-d6ARJ66_AFW03l1Go7OJquiKDh82sdatioYK4xR1YeYNHS6olUJh_vqo7GRNitp5Nu-cPqB6fX9mVpTlhwJW1qeBLBKwETm3tN52AYHpLd3HXqoak7f526uRM8325lX4AySF55Jix7pvzHKoiapSqxOjU",
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
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8sek-Fc7UNDRA3DpDn6_FCr3S5xO0H9tDyO5u0iSQXuUCZmULRy1yv9iRHcqxuaer4Uw_iSBxEmrrsLT2NvA7JoBh1RZrQRFoesMOTz_y5mVdKOcXdgariZEA2YTvt5n0DsAqkMaaRCoQv3VFxQ7ZhninBzIWBOTsFUwg5VAlEj_nTkcvNdGu8UBap4chQv_R15W7dKgMnU_xslZjke1XXPkfsjVVGyzCqQOXAiUofcVJWo8TVYSECDpdyXk9CB-fT_AzaMMtpeQ",
    price: 65,
    currency: "USD",
    placesIncluded: 8
  },
  {
    id: "pkg_family_fun",
    title: "Family Fun Pass",
    description: "Enjoy a day of fun with the whole family at top attractions.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7EaUjLm_jnC_8Ak1LgmB6bIlQpro_HR2HaGUUswGgyKtfl6NenTfdbcARtn8X33xhxII45xrJLgvwk-63HXpxZDHN1Cmv7aO2w52lKf9Fu1VFnnnbceMD_711L3WiAQsPtpmO8Skkn1_PaovIA7XDM1ladAx8LezYlrhPsOA9vDmsjkXrWgECw3_QJKtEFXslDnfCl6C1VD3UZZ5dUFiTH54dYB_8vkGV2SfriK0jbiskau029Zd3LihomAMiq8jN7R-O5ee96Gs",
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
