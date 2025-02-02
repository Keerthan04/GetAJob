import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoginService } from "@/services/FetchDataServices";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserDataContext } from "@/context/UserContext";
import { EmployerDataContext } from "@/context/EmployeerContext";
import { User, Employer } from "@/types";


//to do is to use the shadcn form and validation
const AuthFormContent = ({ role }: { role: "user" | "employer" }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { setUserData } = useContext(UserDataContext)!;
  const { setEmployerData } = useContext(EmployerDataContext)!;
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in..."); // Get the toast ID
    const data = {
      email,
      password,
      role,
    };
    try {
      const responseData = await LoginService(data);

      if (responseData.success) {
        toast.success(responseData.message, { id: toastId });

        localStorage.setItem("token", responseData.token!);
        if (role === "user") {
          setUserData(responseData.user as User);
        } else {
          setEmployerData(responseData.user as Employer);
        }

        setTimeout(() => {
          if (role === "user") {
            navigate("/user");
          } else {
            navigate("/employer");
          }
        }, 2000);
      } else {
        toast.error(responseData.message || "Login Failed", { id: toastId });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("Login Error:", error);

      if (error.response) {
        // Error response from server (like 401, 403, 500)
        toast.error(error.response.data?.message || "Something went wrong",{ id: toastId });
      } else {
        // Network error or request failure
        toast.error("Internal Server Error", { id: toastId });
      }
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  //!IMP problem is if server return 401 and all it is direct going to catch block not the else part(shd check)

  return (
    <form onSubmit={(e) => submitHandler(e)} className="space-y-6 p-4">
      {/* Email & Password Fields */}
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          required
          className="p-3"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="Password"
          required
          className="p-3"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button className="w-full bg-[#0044CC] hover:bg-[#003399] p-3 text-lg">
          Login
        </Button>
      </div>

      {/* Separator Line */}
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Register Section */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Don't have an account?
        </p>
        <Button variant="outline" className="w-full text-md">
          {role === "user" ? (
            <Link to="/register/user">Register as User</Link>
          ) : (
            <Link to="/register/employeer">Register as Employeer</Link>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AuthFormContent;
