import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
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
  if (!isAuthConfigured()) {
    console.warn(
      "⚠️  Admin login disabled: set ADMIN_EMAIL, ADMIN_PASSWORD and AUTH_SECRET (32+ chars)."
    );
  }
  // Listen on "::" so Railway's private network (IPv6) and IPv4 both reach the API.
  app.listen(Number(PORT), "::", () => {
    console.log(`🚀 Magnertia API server running on port ${PORT}`);
  });
  await connectDB();
};

start();
