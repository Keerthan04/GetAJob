import { Request, Response } from "express";
import {
  LoginEmployerRequest,
  LoginEmployerResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterEmployerRequest,
  RegisterEmployerResponse,
  RegisterUserRequest,
  RegisterUserResponse,
} from "../Types/users";
import {
  findUserByEmail,
  comparePasswords,
  generateToken,
  getUserWithoutPassword,
  createUser,
  findEmployerByEmail,
  getEmployerWithoutPassword,
  createEmployer,
} from "../services/auth.service";

/**
 * Handles user login
 * @param req - Request object with email and password in the body
 * @param res - Response object
 * @returns A response with a JSON object containing a success boolean, a message string, a token string, and a user object without password
 */
export const LoginUser = async (
  req: Request<{}, {}, LoginUserRequest>,
  res: Response<LoginUserResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body; //shd validate the request body already in the middleware so not here

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await comparePasswords(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user);

    const userWithoutPassword = await getUserWithoutPassword(user.email);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
    return;
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: errorMessage,
      });
    return;
  }
};

/**
 * Handles user registration
 * @param req - Request object with user data in the body
 * @param res - Response object
 * @returns A response with a JSON object containing a success boolean, a message string, and a user object
 */
export const RegisterUser = async (
  req: Request<{}, {}, RegisterUserRequest>,
  res: Response<RegisterUserResponse>
): Promise<void> => {
  try {
    const RegisterUser = req.body;
    //shd validate the request body already in the middleware so not here

    const user = await findUserByEmail(RegisterUser.email);
    if (user) {
      res.status(409).json({ success: false, message: "User already exists" });
      return;
    }
    const newUser = await createUser(RegisterUser);

    res.status(201).json({
      success: true,
      message: "User Registered successfully",
      user: newUser,
    });
    //no token as we will then navigate him to login page
    return;
  } catch (error) {
    console.error("Register Error:", error);
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: errorMessage,
      });
    return;
  }
};

/**
 * Handles employer login
 * @param req - Request object with email and password in the body
 * @param res - Response object
 * @returns A response with a JSON object containing a success boolean, a message string, a token string, and a user object without password
 */
export const LoginEmployer = async (
  req: Request<{}, {}, LoginEmployerRequest>,
  res: Response<LoginEmployerResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const employer = await findEmployerByEmail(email);
    if (!employer) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await comparePasswords(
      password,
      employer.password as string
    );
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }
    const token = generateToken(employer);
    const employerWithoutPassword = await getEmployerWithoutPassword(
      employer.email
    );
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: employerWithoutPassword,
    });
    return;
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: errorMessage,
      });
    return;
  }
};

/**
 * Handles employer registration.
 * @param req - Request object with employer data in the body.
 * @param res - Response object.
 * @returns A response with a JSON object containing a success boolean, 
 * a message string, and an employer object without password.
 */

export const RegisterEmployer = async (
  req: Request<{}, {}, RegisterEmployerRequest>,
  res: Response<RegisterEmployerResponse>
): Promise<void> => {
  try {
    const RegisterUser = req.body;
    //shd validate the request body already in the middleware so not here

    const user = await findEmployerByEmail(RegisterUser.email);
    if (user) {
      res.status(409).json({ success: false, message: "Employer already exists" });
      return;
    }
    const newEmployer = await createEmployer(RegisterUser);

    res.status(201).json({
      success: true,
      message: "Employer Registered successfully",
      user: newEmployer,
    });
    //no token as we will then navigate him to login page
    return;
  } catch (error) {
    console.error("Register Error:", error);
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: errorMessage,
      });
    return;
  }
}