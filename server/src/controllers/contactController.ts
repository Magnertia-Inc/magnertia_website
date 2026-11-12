import { Request, Response, NextFunction } from "express";
import { isDbReady } from "../config/db";
import { contactSchema, insertContact, listContacts, removeContact, isUuid } from "../models/submissions";

// POST /api/contacts
export const createContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!isDbReady()) {
      res.status(503).json({ success: false, error: "Database is not available. Please try again shortly." });
      return;
    }
    const parsed = contactSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      res.status(400).json({ success: false, error: "Please check the form fields and try again." });
      return;
    }
    const contact = await insertContact(parsed.data);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// GET /api/contacts (admin)
export const getContacts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!isDbReady()) {
      res.status(200).json({ success: true, data: [], connected: false });
      return;
    }
    const contacts = await listContacts();
    res.status(200).json({ success: true, data: contacts, connected: true });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contacts/:id (admin)
export const deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      res.status(400).json({ success: false, error: "Invalid ID format." });
      return;
    }
    const deleted = await removeContact(id);
    res.status(200).json({ success: true, message: deleted ? "Contact deleted." : "Record already removed." });
  } catch (error) {
    next(error);
  }
};
