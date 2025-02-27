import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findEmployerByEmail, findUserByEmail, getEmployerWithoutPassword, getUserWithoutPassword } from "../services/auth.service";
import { Employer, User } from "@prisma/client";
import dotenv from "dotenv";
import { loginSchema, registerEmployerSchema, registerUserSchema } from "../validation/authValidation";
dotenv.config();

export interface UserMiddlewareRequest extends Request{
    user?: Omit<User, "password">;
}
export interface EmployerMiddlewareRequest extends Request{
    employer?: Omit<Employer, "password">;
}
/**
 * Verifies user's token and adds user data to request
 * @param {Request} req - Request with user data
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next middleware function
 * @returns {Promise<void>}
 */
export const userVerification = async (
  req: UserMiddlewareRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string =
      req.header("Authorization")?.split(" ")[1] || req.cookies?.token;
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
      id: string;
    };
    const user = await findUserByEmail(decoded.email);

    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    req.user = await getUserWithoutPassword(user.email);
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
};


/**
 * Verifies employer's token and adds employer data to request
 * @param {Request} req - Request with employer data
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next middleware function
 * @returns {Promise<void>}
 */
export const employerVerification = async (
  req: EmployerMiddlewareRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.header("Authorization")?.split(" ")[1] || req.cookies.token;
    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const { email, id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { email: string; id: string };
    const employer = await findEmployerByEmail(email);
    if (!employer) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    req.employer = await getEmployerWithoutPassword(employer.email);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
};




export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = loginSchema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    res.status(400).json({ success: false, message: result.error.format() });
  }
}

//validation middleware for users
export const validateRegisterUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = registerUserSchema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    res.status(400).json({ success: false, message: result.error.format() });
  }
}

//validation middleware for employers
export const validateRegisterEmployer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result = registerEmployerSchema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    res.status(400).json({ success: false, message: result.error.format() });
  }
}