import { confirm, toast } from "@/lib/ui";
import { goLogin } from "@/lib/router";
import { ENV } from "@/lib/env";
import { auth } from "@/src/auth/auth";

type ApiErrorShape = { message?: string; error?: string } | null;

async function parseJsonSafe(res: Response): Promise<ApiErrorShape> {
  try {
    const data = await res.clone().json();
    if (typeof data === "object" && data !== null) {
      return data as ApiErrorShape;
    }
    return null;
  } catch {
    return null;
  }
}

function defaultMsg(status: number) {
  switch (status) {
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 422:
      return "Invalid Data";
    case 429:
      return "Too Many Requests";
    case 500:
      return "Server Error";
    case 502:
      return "Bad Gateway";
    case 503:
      return "Service Unavailable";
    case 504:
      return "Gateway Timeout";
    default:
      return status >= 500
        ? "Server Error"
        : status >= 400
          ? "Bad Request"
          : "An Error Occurred";
  }
}

async function getErrorMessage(res: Response): Promise<string> {
  const ct = res.headers.get("content-type");
  if (ct?.includes("application/json")) {
    const data = await parseJsonSafe(res);
    const message = data?.message || data?.error;
    if (message) return String(message);
  }
  try {
    const text = await res.clone().text();
    if (text.trim().startsWith("<") || text.includes("<!DOCTYPE"))
      return defaultMsg(res.status);
    if (text.length < 200 && !text.includes("<")) return text;
  } catch {}
  return defaultMsg(res.status);
}

export async function handleError(res: Response): Promise<void> {
  const message = await getErrorMessage(res);
  if (res.status === 401) {
    const ok = await confirm({
      title: "Session Expired",
      description: "Please log in again to continue.",
      confirmText: "Log In",
    });
    if (ok) goLogin();
  } else if (res.status === 403) {
    toast.error("Forbidden", {
      description: "You don't have permission to access.",
    });
  } else if (res.status >= 400 && res.status < 500) {
    toast.error("Request Error", { description: String(message) });
  } else if (res.status >= 500) {
    toast.error("Server Error", { description: String(message) });
  } else {
    toast.error("An Error Occurred", { description: String(message) });
  }
}

async function requestJson<T>(
  path: string,
  init: RequestInit,
  withAuth = true
): Promise<T> {
  try {
    const headers = new Headers(init.headers || {});
    const url = `${ENV.API_BASE}${path}`;

    // Add cookies from Better Auth
    try {
      const cookies = auth.getCookie();
      if (cookies) {
        headers.set('Cookie', cookies);
      }
    } catch (error) {
      // Silent fail for cookie retrieval
    }

    const res = await fetch(url, { ...init, headers, credentials: 'include' });

    if (!res.ok) {
      const msg = await getErrorMessage(res);
      const error = new Error(msg || `HTTP ${res.status}: ${res.statusText}`);
      (error as any).response = {
        status: res.status,
        statusText: res.statusText,
        data: { error: msg },
      };
      throw error;
    }
    const ct = res.headers.get("content-type");
    if (!ct || !ct.includes("application/json")) return {} as T;
    
    const responseData = await res.json();
    return responseData as T;
  } catch (e) {
    if (e instanceof Error && !e.message.startsWith("HTTP")) {
      toast.error("Network Error", {
        description: "Please check your connection.",
      });
    }
    throw e;
  }
}

export const fetcher = {
  get: async <T>(p: string, _?: Record<string, unknown>, withAuth = true) =>
    requestJson<T>(p, { method: "GET" }, withAuth),
  post: async <T>(p: string, body?: unknown, withAuth = true) =>
    requestJson<T>(
      p,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
        credentials: "include",
      },
      withAuth
    ),
  postForm: async <T>(p: string, body: FormData, withAuth = true) =>
    requestJson<T>(p, { method: "POST", body: body as any }, withAuth),
  put: async <T>(p: string, body?: unknown, withAuth = true) =>
    requestJson<T>(
      p,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
        credentials: "include",
      },
      withAuth
    ),
  putForm: async <T>(p: string, body: FormData, withAuth = true) =>
    requestJson<T>(p, { method: "PUT", body: body as any }, withAuth),
  patch: async <T>(p: string, body?: unknown, withAuth = true) =>
    requestJson<T>(
      p,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
        credentials: "include",
      },
      withAuth
    ),
  patchForm: async <T>(p: string, body: FormData, withAuth = true) =>
    requestJson<T>(p, { method: "PATCH", body: body as any }, withAuth),
  delete: async <T>(p: string, withAuth = true) =>
    requestJson<T>(p, { method: "DELETE" }, withAuth),
};

export const authApi = {
  getSession: async () => {
    return fetcher.get<{
      user: {
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
      };
      session: {
        id: string;
        token: string;
        expiresAt: string;
        createdAt: string;
        updatedAt: string;
        ipAddress: string;
        userAgent: string;
        userId: string;
        impersonatedBy: string | null;
      };
      permissions: string[];
    }>("/api/auth/get-session");
  },

  // Session management functions
  session: {
    get: () => auth.getSession(),
    signOut: () => auth.signOut(),
  },
};
