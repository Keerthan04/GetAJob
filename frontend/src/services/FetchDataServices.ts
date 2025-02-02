import axios from "axios";
import { LoginResponse } from "@/types";
export const LoginService = async (data: {
  email: string;
  password: string;
  role: "user" | "employeer";
}): Promise<LoginResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/${data.role}/login`,
    {
      email: data.email,
      password: data.password,
    }
  );

  return response.data;
};
