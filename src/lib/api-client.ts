/**
 * api-client.ts
 * ─────────────
 * Browser-side REST API client for the Magnertia Express backend.
 * Replaces the former TanStack Start server functions (excel-server.ts).
 *
 * All functions call the Express API at /api/* (proxied via Vite in dev,
 * and proxied to the API service by the Nitro server in production).
 */

import { getLocalSubmissions, deleteLocalSubmission } from "./excel-client";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface InquiryRecord {
  /** Differentiates inquiry vs contact submissions */
  type: "inquiry" | "contact";
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  businessType?: string;
  product?: string;
  requirements?: string;
  quantity?: string;
  deployment?: string;
  gst?: string;
  location?: string;
  fleetSize?: string;
  purpose?: string;
  message?: string;
}

/** MongoDB document shape returned from GET endpoints */
export interface SubmissionDocument extends InquiryRecord {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionsResponse {
  success: boolean;
  inquiries: SubmissionDocument[];
  contacts: SubmissionDocument[];
  isMongoDB?: boolean;
}

// ─── Admin session ───────────────────────────────────────────────────────────

const AUTH_FLAG_KEY = "magnertia_admin_auth";
const AUTH_TOKEN_KEY = "magnertia_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function isAdminLoggedIn(): boolean {
  return Boolean(getAdminToken());
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_FLAG_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("admin_auth_change"));
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Session expired. Please sign in again.");
    this.name = "UnauthorizedError";
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BASE_URL = "/api";

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = getAdminToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && token) {
    clearAdminSession();
    throw new UnauthorizedError();
  }

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    throw new Error(json?.error ?? `${method} ${path} failed (${res.status})`);
  }
  return json as T;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Admin login — credentials are checked on the server, which returns a signed token.
 */
export async function adminLogin(email: string, password: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    /* ignore */
  }
  if (!res.ok || !json?.token) {
    throw new Error(json?.error ?? "Login failed. Please try again.");
  }
  sessionStorage.setItem(AUTH_TOKEN_KEY, json.token);
  sessionStorage.setItem(AUTH_FLAG_KEY, "true");
  window.dispatchEvent(new CustomEvent("admin_auth_change"));
}

/**
 * Save an inquiry submission to MongoDB.
 */
export async function saveInquiry(record: InquiryRecord): Promise<{ success: boolean }> {
  return request("POST", "/inquiries", record);
}

/**
 * Save a contact message to MongoDB.
 */
export async function saveContact(record: InquiryRecord): Promise<{ success: boolean }> {
  return request("POST", "/contacts", record);
}

/**
 * Fetch all inquiries and contacts from MongoDB (admin only).
 * Falls back to this browser's local copies only when the API reports the DB is offline.
 */
export async function getSubmissions(): Promise<SubmissionsResponse> {
  const [inquiriesRes, contactsRes] = await Promise.all([
    request<{ success: boolean; data: SubmissionDocument[]; connected?: boolean }>("GET", "/inquiries"),
    request<{ success: boolean; data: SubmissionDocument[]; connected?: boolean }>("GET", "/contacts"),
  ]);

  const isConnected = inquiriesRes.connected !== false && contactsRes.connected !== false;

  if (!isConnected) {
    const local = getLocalSubmissions();
    const inquiries = local
      .filter((s) => s.type === "inquiry" || !s.type)
      .map((s, idx) => ({ ...s, _id: `local_inq_${idx}`, createdAt: s.timestamp || new Date().toISOString(), updatedAt: s.timestamp || new Date().toISOString() })) as SubmissionDocument[];
    const contacts = local
      .filter((s) => s.type === "contact")
      .map((s, idx) => ({ ...s, _id: `local_cnt_${idx}`, createdAt: s.timestamp || new Date().toISOString(), updatedAt: s.timestamp || new Date().toISOString() })) as SubmissionDocument[];

    return { success: true, inquiries, contacts, isMongoDB: false };
  }

  return {
    success: true,
    inquiries: inquiriesRes.data ?? [],
    contacts: contactsRes.data ?? [],
    isMongoDB: true,
  };
}

/**
 * Delete a submission by its MongoDB _id or local fallback id (admin only).
 */
export async function deleteSubmission(
  type: "inquiry" | "contact",
  id: string
): Promise<{ success: boolean }> {
  deleteLocalSubmission(type, id);
  if (id.startsWith("local_")) return { success: true };
  const path = type === "inquiry" ? `/inquiries/${id}` : `/contacts/${id}`;
  return request("DELETE", path);
}

/**
 * Convenience alias — saves either inquiry or contact based on record.type.
 * Used by components that don't distinguish at call time.
 */
export async function saveSubmission(record: InquiryRecord): Promise<{ success: boolean }> {
  return record.type === "inquiry" ? saveInquiry(record) : saveContact(record);
}
