import crypto from "crypto";
import { promisify } from "util";
import { pool } from "../config/db";

const scrypt = promisify(crypto.scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: crypto.ScryptOptions
) => Promise<Buffer>;

// scrypt parameters (N=2^15, r=8, p=1) — ~32 MB, a few tens of ms per hash.
const N = 32768;
const R = 8;
const P = 1;
const KEYLEN = 64;
const MAXMEM = 64 * 1024 * 1024;

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, KEYLEN, { N, r: R, p: P, maxmem: MAXMEM });
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, n, r, p, saltB64, hashB64] = stored.split("$");
  if (algo !== "scrypt" || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
    maxmem: MAXMEM,
  });
  return crypto.timingSafeEqual(actual, expected);
}

// Used when the email doesn't exist, so response time doesn't reveal valid emails.
let dummyHash: string | null = null;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** Returns the admin id when the email/password pair is valid, otherwise null. */
export async function authenticateAdmin(email: string, password: string): Promise<string | null> {
  const { rows } = await pool.query(
    `SELECT id, password_hash FROM admin_users WHERE email = $1`,
    [normalizeEmail(email)]
  );
  if (rows.length === 0) {
    dummyHash ??= await hashPassword(crypto.randomBytes(16).toString("hex"));
    await verifyPassword(password, dummyHash);
    return null;
  }
  return (await verifyPassword(password, rows[0].password_hash)) ? rows[0].id : null;
}

export async function adminExists(id: string): Promise<boolean> {
  const { rowCount } = await pool.query(`SELECT 1 FROM admin_users WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

/** Creates the admin, or resets the password if the email already exists. */
export async function upsertAdmin(email: string, password: string): Promise<void> {
  const hash = await hashPassword(password);
  await pool.query(
    `INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = now()`,
    [normalizeEmail(email), hash]
  );
}

export async function countAdmins(): Promise<number> {
  const { rows } = await pool.query(`SELECT count(*)::int AS n FROM admin_users`);
  return rows[0].n;
}
