import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast,Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { EmployerRegisterService } from "@/services/FetchDataServices";
// import { MultiSelect } from "@/components/ui/MultiSelect"; // MultiSelect for industry
import { Briefcase, User,Link2 } from "lucide-react";
import { CompanySize, Industry} from "@/types";
import { Textarea } from "@/components/ui/textarea";


// Enums
const COMPANY_SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;
const INDUSTRIES = ["TECH", "HEALTHCARE", "FINANCE", "EDUCATION", "MANUFACTURING"] as const;


// Schema validation using Zod
const employerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().min(2, "Company Name is required"),
  companyWebsite: z.string().url("Invalid URL format").optional(),
  companySize: z.enum(COMPANY_SIZES),
  industry: z.enum(INDUSTRIES),
  location: z.string().min(2, "Location is required"),
  description: z.string().optional(),
  logoUrl: z.string().url("Invalid URL format").optional(),
  verified: z.boolean().default(true), // Always true by default
});

type EmployerFormValues = z.infer<typeof employerSchema>;

export function EmployerRegistration() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<EmployerFormValues>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      companyName: "",
      companyWebsite: "",
      companySize: "SMALL",
      industry: "TECH",
      location: "",
      description: "",
      logoUrl: "",
      verified: true, // Always true(this will be done by us so default shd be false but for now done as true)
    },
  });

  const onSubmit = async (data: EmployerFormValues) => {
    setLoading(true);
    console.log(data);
    const toastId = toast.loading("Registering employer...");
    try {
        const formattedData = {
          ...data,
          companySize: data.companySize as CompanySize, // Ensure type matches
          industry: data.industry as Industry, // Select the first industry
        };
      const responseData = await EmployerRegisterService(formattedData);

      if (responseData.success) {
        toast.success(responseData.message + " Please Login", { id: toastId });
        setTimeout(() => navigate("/auth/login"), 2000);
      } else {
        toast.error(responseData.message || "Registration Failed", {
          id: toastId,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login Error:", error);

      if (error.response) {
        // Error response from server (like 401, 403, 500)
        toast.error(error.response.data?.message || "Something went wrong", {
          id: toastId,
        });
      } else {
        // Network error or request failure
        toast.error("Internal Server Error", { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <Toaster richColors position="top-right" />
      <div className="container flex flex-col lg:flex-row gap-8 max-w-6xl">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col justify-center w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-blue-900">
            Hire Top Talent with GetAJob
          </h1>
          <p className="text-lg text-blue-700">
            Connect with skilled professionals and grow your team effortlessly.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-slate-600">Post job listings with ease</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-slate-600">
                Find qualified candidates instantly
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Link2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-slate-600">
                Build your company’s employer brand
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="flex-1 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Create Your <span className="text-blue-900">Employer</span>{" "}
              Account
            </CardTitle>
            <CardDescription>
              Fill in your company details to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Basic Information */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
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
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Company Information */}
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://yourcompany.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPANY_SIZES.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size.charAt(0) + size.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDUSTRIES.map((ind) => (
                              <SelectItem key={ind} value={ind}>
                                {ind.charAt(0) + ind.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <MultiSelect
                          selected={field.value}
                          options={INDUSTRIES.map((ind) => ({
                            value: ind,
                            label: ind,
                          }))}
                          onChange={(values) =>
                            field.onChange(values.map((item) => item.value))
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief Company Description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Logo URL</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://yourcompany.com/logo.png"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating account..."
                      : "Create Employer Account"}
                  </Button>
                </form>
              </Form>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
