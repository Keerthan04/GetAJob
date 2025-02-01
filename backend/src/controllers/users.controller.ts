import { Request, Response } from "express";
import { LoginUserRequest, LoginUserResponse } from "../Types/users";
import {
  findUserByEmail,
  comparePasswords,
  generateToken,
} from "../services/users.service";

export const LoginUser = async (
  req: Request<{}, {}, LoginUserRequest>,
  res: Response<LoginUserResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await comparePasswords(
      password,
      user.password as string
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
    return;
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ message: "Internal Server Error", error: errorMessage });
    return;
  }
};
