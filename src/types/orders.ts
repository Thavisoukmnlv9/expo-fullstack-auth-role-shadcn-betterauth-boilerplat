export type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'refunded';

export type OrderItem = {
  placeId: string;
  placeName: string;
  allowedVisits: number;
};

export type OrderFX = {
  usd?: number;
  lak?: number;
  thb?: number;
};

export type Order = {
  id: string;
  packageId: string;
  packageName: string;
  tier: string;
  currencyCode: string;
  total: number;
  status: OrderStatus;
  purchaserName: string;
  purchaserEmail: string;
  createdAt: string;
  paidAt: string | null;
  issuedAt: string | null;
  refundedAt?: string | null;
  paymentMethod: string | null;
  fx?: OrderFX;
  items: OrderItem[];
};

export type OrderTab = {
  id: OrderStatus | 'all';
  label: string;
  count: number;
};
