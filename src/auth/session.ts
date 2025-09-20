import { auth } from "./auth";
import { authApi } from "@/src/lib/fetcher";
import { useState, useEffect } from "react";

export type Role = "admin" | "staff" | "client";

export interface ApiUser {
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

export interface ApiSession {
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

export interface SessionData {
  user: ApiUser;
  session: ApiSession;
  permissions: string[];
}

export function useSession() {
  const { data: session, isPending: isLoading, error } = auth.useSession();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [sessionError, setSessionError] = useState<Error | null>(null);

  // Fetch detailed session data when auth session is available
  useEffect(() => {
    const fetchSessionData = async () => {
      if (session && !isLoading) {
        setIsLoadingSession(true);
        setSessionError(null);
        try {
          const data = await authApi.getSession();
          setSessionData(data);
        } catch (err) {
          console.error("Failed to fetch session data:", err);
          setSessionError(err as Error);
        } finally {
          setIsLoadingSession(false);
        }
      } else if (!session && !isLoading) {
        setSessionData(null);
      }
    };

    fetchSessionData();
  }, [session, isLoading]);

  const user = sessionData?.user || (session as any)?.user;
  const token =
    sessionData?.session?.token ||
    ((session as any)?.token as string | undefined);
  const permissions = sessionData?.permissions || [];

  const isValidRole = (role: string): role is Role => {
    return ["admin", "staff", "client"].includes(role);
  };

  const role = user?.role && isValidRole(user.role) ? user.role : null;
  const roleNames = role ? [role] : [];
  const roles = role ? [{ id: user?.id || "", name: role }] : [];


  return {
    session: sessionData || session,
    user,
    token,
    roles,
    roleNames,
    permissions,
    isLoading: isLoading || isLoadingSession,
    error: error || sessionError,
  };
}
