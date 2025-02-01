export interface LoginUserRequest {
  email: string;
  password: string;
  role: "user" | "employeer";
}
export interface LoginUserResponse {
  message: string;
  token?: string;
  user?:User;
  error?: string;
    //TODO: add more fields(based on database schema)
}

//dummy user type
export interface User{
    id:string;
    email:string;
    role:string;
    password?:string;
}