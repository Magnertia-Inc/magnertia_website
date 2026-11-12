import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDatabase } from "./config/db";
import { countAdmins, upsertAdmin } from "./models/admins";
import inquiryRoutes from "./routes/inquiryRoutes";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { isAuthConfigured } from "./middleware/auth";

const app = express();
const PORT = process.env.PORT ?? 4000;
const CORS_ORIGIN = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// Requests arrive via the web service proxy, which sets X-Forwarded-For to the real client IP.
app.set("trust proxy", 1);
app.disable("x-powered-by");

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/contacts", contactRoutes);

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

// ─── Error handler ────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Bootstrap ────────────────────────────────────────────────────────────────
const start = async () => {
  // Listen on "::" so Railway's private network (IPv6) and IPv4 both reach the API.
  app.listen(Number(PORT), "::", () => {
    console.log(`🚀 Magnertia API server running on port ${PORT}`);
  });
  await initDatabase(async () => {
    // Optional bootstrap: ADMIN_EMAIL + ADMIN_PASSWORD create the admin account
    // (or reset its password). The variables can be removed after the first deploy.
    const email = process.env.ADMIN_EMAIL?.trim();
    const password = process.env.ADMIN_PASSWORD;
    if (email && password) {
      if (password.length < 10) {
        console.warn("⚠️ ADMIN_PASSWORD must be at least 10 characters — admin account not updated.");
      } else {
        await upsertAdmin(email, password);
        console.log(`🔐 Admin account ready for ${email.toLowerCase()}`);
      }
    }
    const admins = await countAdmins();
    if (admins === 0) {
      console.warn("⚠️ No admin account yet: set ADMIN_EMAIL and ADMIN_PASSWORD on this service.");
    }
    if (!isAuthConfigured()) {
      console.warn("⚠️ Admin login disabled: AUTH_SECRET must be set (32+ characters).");
    }
  });
};

start();
