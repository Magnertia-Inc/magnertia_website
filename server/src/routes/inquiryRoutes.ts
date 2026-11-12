import { Router } from "express";
import {
  createInquiry,
  getInquiries,
  deleteInquiry,
} from "../controllers/inquiryController";
import { requireAdmin } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";

const router = Router();

// Public: website visitors submit enquiries (rate limited against spam)
router.post("/", rateLimit({ windowMs: 10 * 60 * 1000, max: 10 }), createInquiry);
// Admin only: read and delete leads
router.get("/", requireAdmin, getInquiries);
router.delete("/:id", requireAdmin, deleteInquiry);

export default router;
