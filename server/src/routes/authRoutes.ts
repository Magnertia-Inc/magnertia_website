import { Router } from "express";
import { isAuthConfigured, issueToken, requireAdmin } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";
import { authenticateAdmin } from "../models/admins";

const router = Router();

// POST /api/auth/login  { email, password } -> { token, expiresAt }
router.post("/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), async (req, res, next) => {
  try {
    if (!isAuthConfigured()) {
      res.status(503).json({ success: false, error: "Admin login is not available right now." });
      return;
    }
    const { email, password } = req.body ?? {};
    if (typeof email !== "string" || typeof password !== "string" || !email || !password || password.length > 200) {
      res.status(401).json({ success: false, error: "Invalid email or password." });
      return;
    }
    const adminId = await authenticateAdmin(email, password);
    if (!adminId) {
      res.status(401).json({ success: false, error: "Invalid email or password." });
      return;
    }
    res.json({ success: true, ...issueToken(adminId) });
  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me -> 200 if the token is still valid
router.get("/me", requireAdmin, (_req, res) => {
  res.json({ success: true });
});

export default router;
