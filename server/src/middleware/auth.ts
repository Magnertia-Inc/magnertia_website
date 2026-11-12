import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

/**
 * Minimal stateless admin auth.
 *
 * Credentials come from environment variables (never from the frontend bundle):
 *   ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET
 *
 * A successful login returns a signed token "<expiresAtMs>.<hmac>" that the
 * dashboard sends back as `Authorization: Bearer <token>`.
 */

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function getSecret(): string | null {
  const secret = process.env.AUTH_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && getSecret());
}

export function checkCredentials(email: unknown, password: unknown): boolean {
  if (!isAuthConfigured()) return false;
  if (typeof email !== "string" || typeof password !== "string") return false;
  const emailOk = safeEqual(email.trim().toLowerCase(), process.env.ADMIN_EMAIL!.trim().toLowerCase());
  const passOk = safeEqual(password, process.env.ADMIN_PASSWORD!);
  return emailOk && passOk;
}

export function issueToken(): { token: string; expiresAt: number } {
  const secret = getSecret();
  if (!secret) throw new Error("AUTH_SECRET is not configured.");
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = String(expiresAt);
  return { token: `${payload}.${sign(payload, secret)}`, expiresAt };
}

export function verifyToken(token: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload, secret))) return false;
  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token || !verifyToken(token)) {
    res.status(401).json({ success: false, error: "Unauthorized." });
    return;
  }
  next();
}
