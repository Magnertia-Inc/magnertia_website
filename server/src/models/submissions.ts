import { z } from "zod";
import { pool } from "../config/db";

// ─── Validation (mirrors the column limits) ──────────────────────────────────

const req = (max: number) => z.string().trim().min(1).max(max);
const opt = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : null));

export const inquirySchema = z.object({
  fullName: req(100),
  email: z.string().trim().email().max(255),
  phone: req(20),
  company: opt(120),
  businessType: opt(60),
  product: opt(80),
  requirements: opt(1000),
  quantity: opt(20),
  deployment: opt(60),
  gst: opt(20),
  location: opt(120),
  fleetSize: opt(20),
  purpose: opt(300),
});

export const contactSchema = z.object({
  fullName: req(100),
  email: z.string().trim().email().max(255),
  phone: req(20),
  message: req(1000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;

// ─── Row → API shape (keeps the `_id` / camelCase shape the dashboard expects) ─

type Row = Record<string, any>;

function toInquiry(r: Row) {
  return {
    _id: r.id,
    type: "inquiry" as const,
    fullName: r.full_name,
    email: r.email,
    phone: r.phone,
    company: r.company ?? undefined,
    businessType: r.business_type ?? undefined,
    product: r.product ?? undefined,
    requirements: r.requirements ?? undefined,
    quantity: r.quantity ?? undefined,
    deployment: r.deployment ?? undefined,
    gst: r.gst ?? undefined,
    location: r.location ?? undefined,
    fleetSize: r.fleet_size ?? undefined,
    purpose: r.purpose ?? undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function toContact(r: Row) {
  return {
    _id: r.id,
    type: "contact" as const,
    fullName: r.full_name,
    email: r.email,
    phone: r.phone,
    message: r.message,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (id: string): boolean => UUID_RE.test(id);

// ─── Inquiries ────────────────────────────────────────────────────────────────

export async function insertInquiry(d: InquiryInput) {
  const { rows } = await pool.query(
    `INSERT INTO inquiries
       (full_name, email, phone, company, business_type, product, requirements,
        quantity, deployment, gst, location, fleet_size, purpose)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [
      d.fullName, d.email, d.phone, d.company, d.businessType, d.product, d.requirements,
      d.quantity, d.deployment, d.gst, d.location, d.fleetSize, d.purpose,
    ]
  );
  return toInquiry(rows[0]);
}

export async function listInquiries() {
  const { rows } = await pool.query(`SELECT * FROM inquiries ORDER BY created_at DESC`);
  return rows.map(toInquiry);
}

export async function removeInquiry(id: string): Promise<boolean> {
  const { rowCount } = await pool.query(`DELETE FROM inquiries WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export async function insertContact(d: ContactInput) {
  const { rows } = await pool.query(
    `INSERT INTO contacts (full_name, email, phone, message)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [d.fullName, d.email, d.phone, d.message]
  );
  return toContact(rows[0]);
}

export async function listContacts() {
  const { rows } = await pool.query(`SELECT * FROM contacts ORDER BY created_at DESC`);
  return rows.map(toContact);
}

export async function removeContact(id: string): Promise<boolean> {
  const { rowCount } = await pool.query(`DELETE FROM contacts WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}
