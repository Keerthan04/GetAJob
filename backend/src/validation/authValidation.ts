import { Employer } from "@prisma/client";
import { z } from "zod";

//login user and employer schema(both have only email and password)
export const loginSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


const JOB_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "INTERNSHIP",
  "CONTRACT",
  "REMOTE",
] as const;
//register user schema
export const registerUserSchema = z.object({
  email: z.string().email("Invalid email format").min(5).max(255),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  phone: z.optional(
    z.string().regex(/^\d{10,15}$/, "Phone number must be 10-15 digits long")
  ),
  location: z.optional(
    z.string().min(2, "Location must be at least 2 characters long")
  ),
  skills: z.array(z.string().min(2, "Skill must be at least 2 characters long")),
  experience: z.number().int().min(0, "Experience must be a positive number"),
  education: z.optional(
    z.string().min(2, "Education must be at least 2 characters long")
  ),
  resumeLink: z.optional(z.string().url("Must be a valid URL")),
  portfolio: z.optional(z.string().url("Must be a valid URL")),
  jobTitle: z.optional(z.string()),
  jobType: z.array(z.enum(JOB_TYPES)).min(1, "Select at least one job type"), // Ensure at least one job type is selected
  availability: z.boolean(),
});



//register employer schema
export const registerEmployerSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  companyName: z
    .string()
    .min(2, "Company Name must be at least 2 characters long"),
  companyWebsite: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal("")),
  companySize: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  industry: z.enum([
    "TECH",
    "FINANCE",
    "HEALTHCARE",
    "EDUCATION",
    "MANUFACTURING",
  ]),
  location: z.string().min(2, "Location must be at least 2 characters long"),
  description: z.optional(
    z.string().min(10, "Description must be at least 10 characters long")
  ),
  logoUrl: z.string().url("Invalid URL format").optional().or(z.literal("")),
  verified: z.boolean().default(true), // Always true by default
});
