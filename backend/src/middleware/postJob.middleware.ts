import { Request, Response, NextFunction } from "express";
import { postJobSchema } from "../validation/postJobValidation";
import { CreateJobRequest } from "../controllers/employeer.controller";

export const verifyPostJobForm = async (
  req: CreateJobRequest,
  res: Response,
  next: NextFunction
) => {
  const result = postJobSchema.safeParse(req.body.job);
  if (result.success) {
    next();
  } else {
    res.status(400).json({ success: false, message: result.error.format() });
  }
};