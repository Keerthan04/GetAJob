import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LoginService } from "@/services/FetchDataServices";
import {  useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserDataContext } from "@/context/UserContext";
import { EmployerDataContext } from "@/context/EmployeerContext";
import { User, Employer } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validation/authValidation";
import { z } from "zod";
import { Input } from "../ui/input";

const AuthFormContent = ({ role }: { role: "user" | "employer" }) => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserDataContext)!;
  const { setEmployerData } = useContext(EmployerDataContext)!;

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",//to show the errors dynamically to the user
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data: z.infer<typeof loginSchema>) => {
    const toastId = toast.loading("Logging in...");
    const newData = {
      ...data,
      role,
    };

    try {
      const responseData = await LoginService(newData);

      if (responseData.success) {
        toast.success(responseData.message, { id: toastId });

        localStorage.setItem("token", responseData.token!);
        if (role === "user") {
          setUserData(responseData.user as User);
        } else {
          setEmployerData(responseData.user as Employer);
        }

        setTimeout(() => {
          navigate(role === "user" ? "/users/jobs" : "/employer");
        }, 2000);
      } else {
        toast.error(responseData.message || "Login Failed", { id: toastId });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login Error:", error);

      //since using zod only in backend then we can check if the error is from backend and of zod then update the form state so shown in red below the input fields
      if (error.response?.data?.message) {
        const backendErrors = error.response.data.message; // Expected to be the structured Zod error format from backend

        if (typeof backendErrors === "object") {
          Object.keys(backendErrors).forEach((field) => {
            form.setError(field as keyof z.infer<typeof loginSchema>, {
              type: "server",
              message: backendErrors[field]._errors.join(", "),
            });
          });
        } else {
          toast.error(error.response.data?.message || "Something went wrong", {
            id: toastId,
          });
        }
      } else {
        toast.error("Internal Server Error", { id: toastId });
      }
    }
  };


  return (
    //using shadcn forms to properly use zod and useForm
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-6 p-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="text-red-600">
                {form.formState.errors.email?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage className="text-red-600">
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button className="w-full bg-[#0044CC] hover:bg-[#003399] p-3 text-lg">
          Login
        </Button>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Don't have an account?
          </p>
          <Button variant="outline" className="w-full text-md">
            {role === "user" ? (
              <Link to="/auth/register/user">Register as User</Link>
            ) : (
              <Link to="/auth/register/employer">Register as Employer</Link>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthFormContent;
