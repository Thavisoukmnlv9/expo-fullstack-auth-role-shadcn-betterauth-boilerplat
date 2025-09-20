export type OrderItem = {
  id: string;
  packageId: string;
  packagesPriceId: string;
  quantity: number;
  unitPrice: number;
  currencyCode: string;
  lineTotal: number;
};

export type Order = {
  id: string;
  currencyCode: string;
  total: number;
  baseCurrency?: string;
  exchangeRate?: number;
  totalInBase?: number;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
  channel: string;
  purchaserName?: string;
  purchaserEmail?: string;
  createdAt: string;
  expiresAt: string;
  items: OrderItem[];
};

export type PaymentIntent = {
  id: string;
  orderId: string;
  method: 'LAO_QR' | 'MEMBERSHIP_CARD' | 'BANK_WALLET_PHONE';
  amount: number;
  currencyCode: string;
  qrPayload?: string;
  qrImageDataUrl?: string;
  createdAt: string;
  expiresAt: string;
  status: 'requires_payment' | 'processing' | 'succeeded' | 'expired' | 'failed';
};

export type TicketEntitlement = {
  placeId: string;
  placeName: string;
  allowedVisits: number;
  remainingVisits: number;
  cooldownMinutes: number;
  lastRedeemedAt: string | null;
};

export type TicketRedemption = {
  id: number;
  ticketId: string;
  placeId: string;
  placeName: string;
  ts: string;
  method: string;
  delta: number;
  success: boolean;
};

export type Ticket = {
  id: string;
  orderId: string;
  orderItemId: string;
  packageId: string;
  packageName: string;
  packagesPriceId: string;
  priceSnapshot: number;
  currencyCode: string;
  tier: string;
  holderName: string;
  status: 'active' | 'expired' | 'cancelled';
  activatedAt: string;
  expiresAt: string;
  qrPublicId: string;
  entitlements: TicketEntitlement[];
  redemptions: TicketRedemption[];
};
