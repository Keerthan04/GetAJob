import { User } from "../Types/users";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const findUserByEmail = async (email: string): Promise<User> => {
  //dummy return
  return {
    id: "123",
    email: "email",
    role: "user",
  };
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  //shd be bcrypt logic
  return bycrypt.compare(password, hashedPassword);
};

export const generateToken = (user: User): string => {
  const { role, id } = user;
  return jwt.sign({ role, id }, process.env.JWT_SECRET as string);
};
