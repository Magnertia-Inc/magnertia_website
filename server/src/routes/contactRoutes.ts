import { Router } from "express";
import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController";
import { requireAdmin } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Public: website visitors send contact messages (rate limited against spam)
router.post("/", rateLimit({ windowMs: 10 * 60 * 1000, max: 10 }), createContact);
// Admin only: read and delete messages
router.get("/", requireAdmin, getContacts);
router.delete("/:id", requireAdmin, deleteContact);

export default router;
