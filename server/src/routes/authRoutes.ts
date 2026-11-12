import { Router } from "express";
import { checkCredentials, isAuthConfigured, issueToken, requireAdmin } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// POST /api/auth/login  { email, password } -> { token, expiresAt }
router.post("/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), (req, res) => {
  if (!isAuthConfigured()) {
    res.status(503).json({ success: false, error: "Admin login is not configured on the server." });
    return;
  }
  const { email, password } = req.body ?? {};
  if (!checkCredentials(email, password)) {
    res.status(401).json({ success: false, error: "Invalid email or password." });
    return;
  }
  res.json({ success: true, ...issueToken() });
});

// GET /api/auth/me -> 200 if the token is still valid
router.get("/me", requireAdmin, (_req, res) => {
  res.json({ success: true });
});

export default router;
