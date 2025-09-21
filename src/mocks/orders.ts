import { Order } from "../types/orders";

export const mockOrders: Order[] = [
  {
    id: "ord_20250921_001",
    packageId: "pkg_kuta",
    packageName: "Kuta Beach Paradise",
    tier: "VIP",
    currencyCode: "LAK",
    total: 5000,
    status: "paid",
    purchaserName: "Alice",
    purchaserEmail: "alice@example.com",
    createdAt: "2025-09-21T02:16:00Z",
    paidAt: "2025-09-21T02:17:00Z",
    issuedAt: "2025-09-21T02:18:00Z",
    paymentMethod: "Lao QR",
    fx: { usd: 0.25 },
    items: [
      { placeId: "pl_beach", placeName: "Kuta Beach", allowedVisits: 2 },
      { placeId: "pl_sunset", placeName: "Sunset Viewpoint", allowedVisits: 1 }
    ]
  },
  {
    id: "ord_20250921_002",
    packageId: "pkg_city",
    packageName: "City Explorer 48h",
    tier: "Standard",
    currencyCode: "USD",
    total: 49.99,
    status: "pending",
    purchaserName: "Bob",
    purchaserEmail: "bob@example.com",
    createdAt: "2025-09-21T08:00:00Z",
    paidAt: null,
    issuedAt: null,
    paymentMethod: null,
    fx: { lak: 950000 },
    items: [
      { placeId: "pl_museum", placeName: "City Museum", allowedVisits: 1 },
      { placeId: "pl_park", placeName: "Central Park", allowedVisits: 2 }
    ]
  },
  {
    id: "ord_20250921_003",
    packageId: "pkg_hike",
    packageName: "Mountain Hike Bundle",
    tier: "Standard",
    currencyCode: "THB",
    total: 3200,
    status: "cancelled",
    purchaserName: "Sophia",
    purchaserEmail: "sophia@example.com",
    createdAt: "2025-09-19T09:30:00Z",
    paidAt: null,
    issuedAt: null,
    paymentMethod: null,
    items: [
      { placeId: "pl_volcano", placeName: "Volcano Trail", allowedVisits: 1 },
      { placeId: "pl_summit", placeName: "Mountain Summit", allowedVisits: 1 }
    ]
  },
  {
    id: "ord_20250920_004",
    packageId: "pkg_temple",
    packageName: "Temple Explorer Pass",
    tier: "Premium",
    currencyCode: "USD",
    total: 75.00,
    status: "refunded",
    purchaserName: "David",
    purchaserEmail: "david@example.com",
    createdAt: "2025-09-20T14:30:00Z",
    paidAt: "2025-09-20T14:35:00Z",
    issuedAt: "2025-09-20T14:36:00Z",
    paymentMethod: "Credit Card",
    refundedAt: "2025-09-21T10:00:00Z",
    items: [
      { placeId: "pl_temple1", placeName: "Wat Phra Kaew", allowedVisits: 1 },
      { placeId: "pl_temple2", placeName: "Wat Pho", allowedVisits: 1 },
      { placeId: "pl_temple3", placeName: "Wat Arun", allowedVisits: 1 }
    ]
  }
];

export const getOrdersByStatus = (
  status: "all" | "pending" | "paid" | "cancelled" | "refunded"
) => {
  if (status === "all") {
    return mockOrders;
  }
  return mockOrders.filter((order) => order.status === status);
};

export const getOrderById = (id: string) => {
  return mockOrders.find((order) => order.id === id);
};
