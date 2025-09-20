import { Ticket } from '@/src/types/tickets';

export const mockTickets: Ticket[] = [
  {
    id: "tix_001",
    packageName: "Kuta Beach Paradise",
    tier: "VIP",
    status: "active",
    validityRule: "48h after first use",
    activatedAt: "2025-09-20T10:00:00Z",
    expiresAt: "2025-09-22T10:00:00Z",
    qrCode: "QR123VIP",
    remainingTime: "36h 24m",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-14b1e0d0b6b3?w=400&h=200&fit=crop",
    entitlements: [
      { 
        placeId: "pl_beach", 
        placeName: "Kuta Beach", 
        remainingVisits: 2,
        allowedVisits: 3,
        cooldownMinutes: 0,
        lastRedeemedAt: "2025-09-20T15:30:00Z"
      },
      { 
        placeId: "pl_sunset", 
        placeName: "Sunset Viewpoint", 
        remainingVisits: 1,
        allowedVisits: 2,
        cooldownMinutes: 30
      }
    ],
    redemptions: [
      { 
        placeName: "Kuta Beach", 
        usedAt: "2025-09-20T15:30:00Z",
        success: true
      }
    ]
  },
  {
    id: "tix_002",
    packageName: "City Explorer Pass",
    tier: "Premium",
    status: "upcoming",
    validityRule: "Valid from Dec 2025",
    activatedAt: null,
    expiresAt: "2026-01-05T00:00:00Z",
    qrCode: "QR456PREM",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    entitlements: [
      { 
        placeId: "pl_museum", 
        placeName: "Museum of Modern Art", 
        remainingVisits: 3,
        allowedVisits: 3
      },
      { 
        placeId: "pl_zoo", 
        placeName: "Central Park Zoo", 
        remainingVisits: 1,
        allowedVisits: 1
      },
      { 
        placeId: "pl_empire", 
        placeName: "Empire State Building", 
        remainingVisits: 2,
        allowedVisits: 2
      }
    ],
    redemptions: []
  },
  {
    id: "tix_003",
    packageName: "Mountain Hike Bundle",
    tier: "Standard",
    status: "expired",
    validityRule: "72h after first use",
    activatedAt: "2025-06-10T09:00:00Z",
    expiresAt: "2025-06-13T09:00:00Z",
    qrCode: "QR789STD",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-14b1e0d0b6b3?w=400&h=200&fit=crop",
    entitlements: [
      { 
        placeId: "pl_volcano", 
        placeName: "Volcano Trail", 
        remainingVisits: 0,
        allowedVisits: 1
      },
      { 
        placeId: "pl_summit", 
        placeName: "Mountain Summit", 
        remainingVisits: 0,
        allowedVisits: 1
      }
    ],
    redemptions: [
      { 
        placeName: "Volcano Trail", 
        usedAt: "2025-06-11T11:15:00Z",
        success: true
      }
    ]
  }
];

export const getTicketsByStatus = (status: 'active' | 'upcoming' | 'expired') => {
  return mockTickets.filter(ticket => ticket.status === status);
};

export const getTicketById = (id: string) => {
  return mockTickets.find(ticket => ticket.id === id);
};
