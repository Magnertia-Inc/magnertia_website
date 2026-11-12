import { Request, Response, NextFunction } from "express";
import { isDbReady } from "../config/db";
import { inquirySchema, insertInquiry, listInquiries, removeInquiry, isUuid } from "../models/submissions";

// POST /api/inquiries
export const createInquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!isDbReady()) {
      res.status(503).json({ success: false, error: "Database is not available. Please try again shortly." });
      return;
    }
    const parsed = inquirySchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({ success: false, error: "Please check the form fields and try again." });
      return;
    }
    const inquiry = await insertInquiry(parsed.data);
    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// GET /api/inquiries (admin)
export const getInquiries = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!isDbReady()) {
      res.status(200).json({ success: true, data: [], connected: false });
      return;
    }
    const inquiries = await listInquiries();
    res.status(200).json({ success: true, data: inquiries, connected: true });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/inquiries/:id (admin)
export const deleteInquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      res.status(400).json({ success: false, error: "Invalid ID format." });
      return;
    }
    const deleted = await removeInquiry(id);
    res.status(200).json({ success: true, message: deleted ? "Inquiry deleted." : "Record already removed." });
  } catch (error) {
    next(error);
  }
};
