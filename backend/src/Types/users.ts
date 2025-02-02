import {User,Employer,Job,Application,ApplicationStatus,JobType,CompanySize,Industry} from '@prisma/client';
export {User,Employer,Job,Application,ApplicationStatus,JobType,CompanySize,Industry} from '@prisma/client';

//login user types
export interface LoginUserRequest {
  email: string;
  password: string;
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

//login employer types
export interface LoginEmployerRequest {
  email: string;
  password: string;
}//repeated if possible replace both to simple loginrequest

export interface LoginEmployerResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: Omit<Employer, "password">;
  error?: string;
}

//register employer types
export type RegisterEmployerRequest = Omit<Employer,"id">;//we dont need id as it is auto generated

export interface RegisterEmployerResponse {
  success: boolean;
  message: string;
  user?: Omit<Employer, "password">;
  error?: string;
}