import { Request, Response } from "express";
import { LoginUserRequest, LoginUserResponse, RegisterUserRequest, RegisterUserResponse } from "../Types/users";
import {
  findUserByEmail,
  comparePasswords,
  generateToken,
  getUserWithoutPassword,
  createUser,
} from "../services/users.service";

export const LoginUser = async (
  req: Request<{}, {}, LoginUserRequest>,
  res: Response<LoginUserResponse>
): Promise<void> => {
  try {
    const { email, password } = req.body;//shd validate the request body already in the middleware so not here

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
      user: userWithoutPassword
    });
    return;
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: errorMessage });
    return;
  }
};

export const RegisterUser = async (
  req: Request<{}, {}, RegisterUserRequest>,
  res: Response<RegisterUserResponse>
): Promise<void> => {
  try{
    const RegisterUser = req.body;
    //shd validate the request body already in the middleware so not here

    const user = await findUserByEmail(RegisterUser.email);
    if (user) {
      res.status(409).json({ success: false, message: "User already exists" });
      return;
    }
    const newUser = await createUser(RegisterUser);

    res.status(201).json({ success: true, message: "User created successfully", user: newUser });
    //no token as we will then navigate him to login page
    return;

  }catch(error){
    console.error("Register Error:", error);
    const errorMessage = (error as Error).message;
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: errorMessage });
    return;
  }
};