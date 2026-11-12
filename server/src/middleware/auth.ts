import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { isDbReady } from "../config/db";
import { adminExists } from "../models/admins";

/**
 * Stateless admin sessions.
 *
 * Admin accounts live in Postgres (`admin_users`, scrypt-hashed passwords).
 * A successful login returns a signed token "<adminId>.<expiresAtMs>.<hmac>"
 * that the dashboard sends back as `Authorization: Bearer <token>`.
 * AUTH_SECRET (32+ chars) signs the tokens.
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
  return Boolean(getSecret()) && isDbReady();
}

export function issueToken(adminId: string): { token: string; expiresAt: number } {
  const secret = getSecret();
  if (!secret) throw new Error("AUTH_SECRET is not configured.");
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${adminId}.${expiresAt}`;
  return { token: `${payload}.${sign(payload, secret)}`, expiresAt };
}

/** Returns the admin id for a valid, unexpired token, otherwise null. */
export function verifyToken(token: string): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [adminId, exp, signature] = parts;
  if (!safeEqual(signature, sign(`${adminId}.${exp}`, secret))) return null;
  const expiresAt = Number(exp);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;
  return adminId;
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const adminId = token ? verifyToken(token) : null;
  if (!adminId) {
    res.status(401).json({ success: false, error: "Unauthorized." });
    return;
  }
  try {
    // A deleted admin loses access immediately.
    if (!(await adminExists(adminId))) {
      res.status(401).json({ success: false, error: "Unauthorized." });
      return;
    }
  } catch (error) {
    next(error);
    return;
  }
  next();
}
