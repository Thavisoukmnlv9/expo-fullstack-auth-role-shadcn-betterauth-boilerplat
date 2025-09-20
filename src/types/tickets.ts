export type TicketStatus = 'active' | 'upcoming' | 'expired';

export type TicketEntitlement = {
  placeId: string;
  placeName: string;
  remainingVisits: number;
  allowedVisits: number;
  cooldownMinutes?: number;
  lastRedeemedAt?: string;
};

export type TicketRedemption = {
  placeName: string;
  usedAt: string;
  success?: boolean;
};

export type Ticket = {
  id: string;
  packageName: string;
  tier: string;
  status: TicketStatus;
  validityRule: string;
  activatedAt: string | null;
  expiresAt: string;
  qrCode: string;
  remainingTime?: string;
  entitlements: TicketEntitlement[];
  redemptions: TicketRedemption[];
  imageUrl?: string;
};

export type TicketTab = {
  id: TicketStatus;
  label: string;
  count: number;
};
