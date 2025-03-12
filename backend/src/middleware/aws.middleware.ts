import e, { Request, Response, NextFunction } from "express";
import { findUserByEmail, getUserWithoutPassword } from "../services/auth.service";
import jwt from "jsonwebtoken";
import { UserMiddlewareRequest } from "./auth.middleware";
export interface PresignedUrlQuery extends UserMiddlewareRequest {
    query: {
        fileName: string;
        fileType: string;
    };
}
//to validate the query for the presigned url for uploading the file to s3
const validatePresignedUrlQuery = async (
  req: PresignedUrlQuery,
  res: Response,
  next: NextFunction
) => {
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
    const { fileName, fileType } = req.query;

    if (!fileName || !fileType) {
       res.status(400).json({
        error: "Missing required query parameters: fileName and fileType",
      });
      return
    }

    // Cast to the proper types if needed
    req.query = {
      fileName: String(fileName),
      fileType: String(fileType),
    } as any;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
};

export interface getPresignedUrlQuery  extends UserMiddlewareRequest {
    query: {
        key: string;
    };
}
//to validate the query for the presigned url for viewing the file from s3
const validateGetPresignedUrl = async (
  req: getPresignedUrlQuery,
  res: Response,
  next: NextFunction
) => {
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
    const { key } = req.query;

    if (!key) {
       res.status(400).json({
        error: "Missing required query parameters: key",
      });
      return
    }

    // Cast to the proper types if needed
    req.query = {
      key: String(key),
    } as any;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
};
export { validatePresignedUrlQuery, validateGetPresignedUrl };
