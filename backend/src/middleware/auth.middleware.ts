import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findEmployerByEmail, findUserByEmail, getEmployerWithoutPassword, getUserWithoutPassword } from "../services/auth.service";
import { Employer, User } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

interface UserMiddleware extends Request{
    user?: Omit<User, "password">;
}
interface EmployerMiddleware extends Request{
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
  req: UserMiddleware,
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
  req: EmployerMiddleware,
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