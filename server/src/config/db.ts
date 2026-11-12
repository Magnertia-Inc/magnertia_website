import { Pool } from "pg";

/**
 * PostgreSQL connection pool.
 * On Railway, DATABASE_URL is a reference to the Postgres service's private URL
 * (postgres.railway.internal), so no SSL is needed. Set DATABASE_SSL=true for
 * external hosts that require it.
 */
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

pool.on("error", (err) => {
  console.error("⚠️ Postgres pool error:", err.message);
});

let ready = false;

export const isDbReady = (): boolean => ready;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS inquiries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     varchar(100)  NOT NULL,
  email         varchar(255)  NOT NULL,
  phone         varchar(20)   NOT NULL,
  company       varchar(120),
  business_type varchar(60),
  product       varchar(80),
  requirements  varchar(1000),
  quantity      varchar(20),
  deployment    varchar(60),
  gst           varchar(20),
  location      varchar(120),
  fleet_size    varchar(20),
  purpose       varchar(300),
  created_at    timestamptz   NOT NULL DEFAULT now(),
  updated_at    timestamptz   NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);

CREATE TABLE IF NOT EXISTS contacts (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name  varchar(100)  NOT NULL,
  email      varchar(255)  NOT NULL,
  phone      varchar(20)   NOT NULL,
  message    varchar(1000) NOT NULL,
  created_at timestamptz   NOT NULL DEFAULT now(),
  updated_at timestamptz   NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts (created_at DESC);

CREATE TABLE IF NOT EXISTS admin_users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         varchar(255) NOT NULL UNIQUE,
  password_hash text         NOT NULL,
  created_at    timestamptz  NOT NULL DEFAULT now(),
  updated_at    timestamptz  NOT NULL DEFAULT now()
);
`;

/**
 * Connects, creates tables if needed and runs `onReady` once.
 * Retries every 5s until the database is reachable (Railway may start
 * Postgres after the API).
 */
export async function initDatabase(onReady?: () => Promise<void>): Promise<void> {
  if (!connectionString) {
    console.warn("⚠️ DATABASE_URL is not set — form submissions and admin login are disabled.");
    return;
  }
  for (;;) {
    try {
      await pool.query(SCHEMA);
      ready = true;
      console.log("✅ Connected to PostgreSQL and schema is up to date.");
      if (onReady) await onReady();
      return;
    } catch (error) {
      console.error("⚠️ PostgreSQL not ready:", (error as Error).message, "— retrying in 5s");
      await new Promise((r) => setTimeout(r, 5_000));
    }
  }
}
