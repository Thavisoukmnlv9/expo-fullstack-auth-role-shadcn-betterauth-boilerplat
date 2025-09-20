import { Order, PaymentIntent, Ticket } from '@/src/types/checkout';

export const mockCheckoutData = {
  order: {
    id: "ord_1001",
    currencyCode: "LAK",
    total: 5000,
    baseCurrency: "USD",
    exchangeRate: 0.000047,
    totalInBase: 0.235,
    status: "pending" as const,
    channel: "web",
    purchaserName: "Alice",
    purchaserEmail: "alice@example.com",
    createdAt: "2025-09-21T02:16:00Z",
    expiresAt: "2025-09-21T02:17:00Z",
    items: [
      {
        id: "oi_1",
        packageId: "pkg_city_48h",
        packagesPriceId: "pp_lak_std",
        quantity: 1,
        unitPrice: 5000,
        currencyCode: "LAK",
        lineTotal: 5000
      }
    ]
  } as Order,
  paymentIntent: {
    id: "pi_laoqr_7788",
    orderId: "ord_1001",
    method: "LAO_QR" as const,
    amount: 5000,
    currencyCode: "LAK",
    qrPayload: "LAOQR|AMOUNT=5000|CUR=LAK|BILLNO=pi_laoqr_7788|MERCHANT=CityPass",
    qrImageDataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    createdAt: "2025-09-21T02:16:05Z",
    expiresAt: "2025-09-21T02:17:05Z",
    status: "requires_payment" as const
  } as PaymentIntent,
  ticket: {
    id: "tix_9001",
    orderId: "ord_1001",
    orderItemId: "oi_1",
    packageId: "pkg_city_48h",
    packageName: "City Explorer 48h",
    packagesPriceId: "pp_lak_std",
    priceSnapshot: 5000,
    currencyCode: "LAK",
    tier: "standard",
    holderName: "Alice",
    status: "active" as const,
    activatedAt: "2025-09-21T02:18:00Z",
    expiresAt: "2025-09-23T02:18:00Z",
    qrPublicId: "QR123XYZ",
    entitlements: [
      { 
        placeId: "pl_museum", 
        placeName: "National Museum", 
        allowedVisits: 2, 
        remainingVisits: 2, 
        cooldownMinutes: 60, 
        lastRedeemedAt: null 
      },
      { 
        placeId: "pl_aquarium", 
        placeName: "River Aquarium", 
        allowedVisits: 1, 
        remainingVisits: 1, 
        cooldownMinutes: 0, 
        lastRedeemedAt: null 
      }
    ],
    redemptions: [
      {
        id: 1,
        ticketId: "tix_9001",
        placeId: "pl_museum",
        placeName: "National Museum",
        ts: "2025-09-21T10:00:00Z",
        method: "qr",
        delta: -1,
        success: true
      }
    ]
  } as Ticket
};
