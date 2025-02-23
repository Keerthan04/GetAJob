import { z } from "zod";
import { JobType, JobStatus } from "@/types";

export const postJobSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Job title must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters long" }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long" }),
  salaryRange: z.string().optional(),
  jobType: z.nativeEnum(JobType),
  jobStatus: z.nativeEnum(JobStatus),
});
//skills required should be an array of strings but not need in validation in frontend as it is sent and backend we need
//TODO -> shd add the responsibilities and all those fields
