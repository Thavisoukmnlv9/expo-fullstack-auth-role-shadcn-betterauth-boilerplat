import * as SecureStore from "expo-secure-store";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  banned: string | null;
  banReason: string | null;
  banExpires: string | null;
  isAnonymous: boolean | null;
  phoneNumber: string | null;
  phoneNumberVerified: boolean | null;
}

export interface MockSession {
  id: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  impersonatedBy: string | null;
}

export interface MockSessionData {
  user: MockUser;
  session: MockSession;
  permissions: string[];
}

// Mock users for development
const MOCK_USERS: Record<string, { password: string; user: MockUser }> = {
  "admin@admin.com": {
    password: "123456",
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@admin.com",
      emailVerified: true,
      image: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: "admin",
      banned: null,
      banReason: null,
      banExpires: null,
      isAnonymous: false,
      phoneNumber: null,
      phoneNumberVerified: false,
    },
  },
  "staff@staff.com": {
    password: "123456",
    user: {
      id: "2",
      name: "Staff User",
      email: "staff@staff.com",
      emailVerified: true,
      image: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: "staff",
      banned: null,
      banReason: null,
      banExpires: null,
      isAnonymous: false,
      phoneNumber: null,
      phoneNumberVerified: false,
    },
  },
  "client@client.com": {
    password: "123456",
    user: {
      id: "3",
      name: "Client User",
      email: "client@client.com",
      emailVerified: true,
      image: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: "client",
      banned: null,
      banReason: null,
      banExpires: null,
      isAnonymous: false,
      phoneNumber: null,
      phoneNumberVerified: false,
    },
  },
};

const STORAGE_KEYS = {
  SESSION: "mock_session",
  USER: "mock_user",
};

export class MockAuthService {
  private static instance: MockAuthService;
  private currentSession: MockSessionData | null = null;

  static getInstance(): MockAuthService {
    if (!MockAuthService.instance) {
      MockAuthService.instance = new MockAuthService();
    }
    return MockAuthService.instance;
  }

  async signInWithEmail(email: string, password: string): Promise<MockSessionData> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userData = MOCK_USERS[email];
    if (!userData || userData.password !== password) {
      throw new Error("Invalid email or password");
    }

    const session: MockSession = {
      id: `session_${Date.now()}`,
      token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ipAddress: "127.0.0.1",
      userAgent: "MockApp/1.0",
      userId: userData.user.id,
      impersonatedBy: null,
    };

    const permissions = this.getPermissionsForRole(userData.user.role);

    const sessionData: MockSessionData = {
      user: userData.user,
      session,
      permissions,
    };

    this.currentSession = sessionData;
    await this.saveSession(sessionData);
    return sessionData;
  }

  async signInWithSocial(provider: string): Promise<MockSessionData> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, return admin user for social login
    const userData = MOCK_USERS["admin@admin.com"];
    const session: MockSession = {
      id: `session_${Date.now()}`,
      token: `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ipAddress: "127.0.0.1",
      userAgent: "MockApp/1.0",
      userId: userData.user.id,
      impersonatedBy: null,
    };

    const permissions = this.getPermissionsForRole(userData.user.role);

    const sessionData: MockSessionData = {
      user: userData.user,
      session,
      permissions,
    };

    this.currentSession = sessionData;
    await this.saveSession(sessionData);
    return sessionData;
  }

  async getSession(): Promise<MockSessionData | null> {
    if (this.currentSession) {
      return this.currentSession;
    }

    try {
      const sessionData = await this.loadSession();
      if (sessionData && this.isSessionValid(sessionData.session)) {
        this.currentSession = sessionData;
        return sessionData;
      } else {
        await this.clearSession();
        return null;
      }
    } catch (error) {
      console.error("Failed to load session:", error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    this.currentSession = null;
    await this.clearSession();
  }

  private getPermissionsForRole(role: string): string[] {
    switch (role) {
      case "admin":
        return ["read:users", "write:users", "delete:users", "read:orders", "write:orders", "delete:orders"];
      case "staff":
        return ["read:users", "read:orders", "write:orders"];
      case "client":
        return ["read:own_profile", "write:own_profile"];
      default:
        return [];
    }
  }

  private isSessionValid(session: MockSession): boolean {
    return new Date(session.expiresAt) > new Date();
  }

  private async saveSession(sessionData: MockSessionData): Promise<void> {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  }

  private async loadSession(): Promise<MockSessionData | null> {
    try {
      const sessionData = await SecureStore.getItemAsync(STORAGE_KEYS.SESSION);
      return sessionData ? JSON.parse(sessionData) : null;
    } catch (error) {
      console.error("Failed to load session:", error);
      return null;
    }
  }

  private async clearSession(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.SESSION);
    } catch (error) {
      console.error("Failed to clear session:", error);
    }
  }

  getCookie(): string | null {
    if (this.currentSession) {
      return `session=${this.currentSession.session.token}; expires=${this.currentSession.session.expiresAt}`;
    }
    return null;
  }
}

export const mockAuth = MockAuthService.getInstance();
