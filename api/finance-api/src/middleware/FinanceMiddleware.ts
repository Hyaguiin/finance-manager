import { Request, Response, NextFunction } from "express";

export const transactionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { amount, type, description, category, date, userId } = req.body;

    if (!amount || !type || !description || !category || !date || !userId) {
      res.status(400).json({
        error: "Missing required fields",
        message:
          "Amount, type, description, category, date, and userId are required fields.",
      });
    }

    if (typeof amount !== "number" || isNaN(amount)) {
      res.status(400).json({
        error: "Invalid amount",
        message: "'Amount' should be a valid number.",
      });
    }

    if (isNaN(Date.parse(date))) {
      res.status(400).json({
        error: "Invalid date",
        message: "'Date' should be a valid date.",
      });
    }

    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: "Server error",
        message: "An unexpected error occurred.",
      });
    }
  }
};
