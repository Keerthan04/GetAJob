"use client";

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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/MultiSelect";

import {
  User,
  Briefcase,
  Link2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserRegisterService } from "@/services/FetchDataServices";


const JOB_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "INTERNSHIP",
  "CONTRACT",
  "REMOTE",
] as const;

//!IMP -> working now(if error in registering loading only not showing error so fix it)


import { toast, Toaster } from "sonner";
import { JobType } from "@/types";
import { registerUserSchema } from "@/validation/authValidation";

type RegistrationFormValues = z.infer<typeof registerUserSchema>;

export function UserRegistration() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      location: "",
      skills: [], // Will be split into an array later
      experience: 0,
      education: "",
      portfolio: "",
      jobTitle: "",
      jobType: [], // Multi-select
      availability: true,
    },
    mode: "onChange"
  });
  console.log("Errors:", form.formState.errors);

  const onSubmit = async (data: RegistrationFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Registering...");

    try {
      const responseData = await UserRegisterService({
        ...data,
        experience: Number(data.experience),
        jobType: data.jobType as JobType[],
      });

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
      console.error("Registration Error:", error);
      if (error.response?.data?.message) {
                    const backendErrors = error.response.data.message; // Expected to be the structured Zod error format from backend
            
                    if (typeof backendErrors === "object") {
                      Object.keys(backendErrors).forEach((field) => {
                        form.setError(field as keyof z.infer<typeof registerUserSchema>, {
                          type: "server",
                          message: backendErrors[field]._errors.join(", "),
                        });
                      });
                    }else{
                      toast.error(error.response.data?.message || "Something went wrong", {
                        id: toastId,
                      });
                    }
      } else {
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
            Join GetAJob Today
          </h1>
          <p className="text-lg text-blue-700">
            Connect with top employers and find your dream job.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-slate-600">Create your professional profile</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-slate-600">Get matched with relevant jobs</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Link2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-slate-600">Connect with employers directly</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="flex-1 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Create Your <span className="text-blue-900">User</span> Account
            </CardTitle>
            <CardDescription>
              Fill in your details to get started
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
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-700">
                      Basic Information
                    </h3>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.name?.message}
                            </FormMessage>
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
                              <Input
                                type="password"
                                placeholder="••••••••"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.password?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (555) 000-0000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.phone?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-700">
                      Professional Information
                    </h3>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.location?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Software Engineer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.jobTitle?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.experience?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Highest Education(Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="string"
                                placeholder="Btech..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.education?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="portfolio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio Link(Optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="string"
                                placeholder="https://example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-600">
                              {form.formState.errors.portfolio?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-slate-700">
                      Preferences
                    </h3>
                    <Separator />
                    <FormField
                      control={form.control}
                      name="availability"
                      render={() => (
                        <FormItem>
                          <FormLabel>Open to Job Offers?</FormLabel>
                          <Select defaultValue="true">
                            <SelectTrigger>
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">
                                Yes, I'm open
                              </SelectItem>
                              <SelectItem value="false">No, not now</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-600">
                            {form.formState.errors.availability?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills (comma-separated)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E.g., React, Node.js, TypeScript"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-600">
                            {form.formState.errors.skills?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Job Type</FormLabel>
                          <MultiSelect
                            selected={field.value}
                            options={JOB_TYPES.map((job) => ({
                              value: job,
                              label: job.replace("_", " "),
                            }))}
                            onChange={(values) =>
                              field.onChange(values.map((item) => item.value))
                            }
                          />
                          <FormMessage className="text-red-600">
                            {form.formState.errors.jobType?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Creating your account..." : "Create Account"}
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
