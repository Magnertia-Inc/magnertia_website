import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
  code?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("❌ Error:", err.message);

  // Malformed JSON body
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ success: false, error: "Invalid request body." });
    return;
  }

  const statusCode = err.status ?? 500;
  // Don't leak internal error details (DB hostnames etc.) to the public in production.
  const hideDetails = statusCode >= 500 && process.env.NODE_ENV === "production";
  res.status(statusCode).json({
    success: false,
    error: hideDetails ? "Internal Server Error" : err.message || "Internal Server Error",
  });
};
