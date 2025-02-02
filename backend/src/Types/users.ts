import {User,Employer,Job,Application,ApplicationStatus,JobType,CompanySize,Industry} from '@prisma/client';
export {User,Employer,Job,Application,ApplicationStatus,JobType,CompanySize,Industry} from '@prisma/client';

//login user types
export interface LoginUserRequest {
  email: string;
  password: string;
  role: "user" | "employeer";
}
export interface LoginUserResponse {
  success: boolean;
  message: string;
  token?: string;
  user?:Omit<User,"password">;
  error?: string;
}

//register user types
export type RegisterUserRequest = Omit<User,"id">;//we dont need id as it is auto generated

export interface RegisterUserResponse {
  success: boolean;
  message: string;
  user?:Omit<User,"password">;
  error?: string;
}