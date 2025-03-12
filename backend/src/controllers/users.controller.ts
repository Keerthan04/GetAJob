import { Request, Response } from "express";
import { getAllJobs, getJob, getUserAppliedJobs, jobApplication, updateUserResumeLink } from "../services/users.service";
import { ApplicationStatus, Job } from "@prisma/client";
import { UserMiddlewareRequest } from "../middleware/auth.middleware";
import { getDocumentSummary } from "../services/gemini.service";

export async function getJobs(req: UserMiddlewareRequest, res: Response): Promise<void> {
    try {
        const jobs = await getAllJobs() || [];
        res.status(200).json({
            success: true,
            data: jobs
        });
    } catch (error) {
        console.error("Get Jobs Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}
interface JobDetailsRequest extends UserMiddlewareRequest{
    params: {
        job_id: string;
    }
}
export async function getJobDetails(
  req: JobDetailsRequest,
  res: Response<{
    success: boolean;
    data?: {
      job: Job;
      isApplied: boolean;
      company: {
        id: string;
        name: string;
        companyName: string;
        companyWebsite?: string;
        companySize: string;
        industry: string;
        location: string;
        description?: string;
        logoUrl?: string;
        verified: boolean;
      };
      applicationStatus?: ApplicationStatus;
    };
    message?: string;
    error?: string;
  }>
): Promise<void> {
  try {
    const { job_id } = req.params;
    const user_id = req.user?.id;
    const job = await getJob(user_id as string, job_id);
    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Job details fetched successfully",
      data: {
        job: job.job,
        isApplied: job.isApplied,
        company: {
          ...job.company,
          companyWebsite: job.company.companyWebsite ?? undefined,
          description: job.company.description ?? undefined,
          logoUrl: job.company.logoUrl ?? undefined,
        },
        applicationStatus: job.applicationStatus ?? undefined,
      },
    });
  } catch (error) {
    console.error("Get Job Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}

export async function applyForJob(req: JobDetailsRequest, res: Response): Promise<void> {
    try {
        const { job_id } = req.params;
        const user_id = req.user?.id;
        const applicationStatus = await jobApplication(user_id as string, job_id);
        res.status(200).json({
            success: true,
            message: "Job Applied Successfully",
            data: applicationStatus
        });
    } catch (error) {
        console.error("Apply for Job Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}


export async function getAppliedJobs(req: UserMiddlewareRequest, res: Response): Promise<void> {
    try {
        const jobs = await getUserAppliedJobs(req.user?.id as string) || [];
        //remove job if job is null
        jobs.forEach((job, index) => {
            if (!job) {
                jobs.splice(index, 1);
            }
        });
        res.status(200).json({
          success: true,
          message: "Applied Jobs fetched successfully",
          data: jobs,
        });
    } catch (error) {
        console.error("Get Applied Jobs Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}

export async function getUserProfile(req: UserMiddlewareRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        //wont as in middleware only will be sent back so
        res.status(401).json({
          success: false,
          message: "Unauthorized: User not found in request",
        });
        return;
      }
      if(!user.resumeLink){
        res.status(200).json({
            success: true,
            data: {user:user,AI_summary:""}//so if no resume link no ai summary
        });
      }
      else{
        const AI_summary = await getDocumentSummary(user.resumeLink);
        res.status(200).json({
            success: true,
            data: {user:user,AI_summary:AI_summary}
        });
      }
    } catch (error) {
        console.error("Get User Profile Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}
//TODO-> if AI_summary instead of always asking for it better to ask once and a column in db for it and then update it when the user updates the resume link

//for updating the resume link
export async function updateUserProfile(req: UserMiddlewareRequest, res: Response): Promise<void> {
    try {
        const userId = req.user?.id;
        if (!userId) {
          res.status(401).json({
            success: false,
            message: "Unauthorized: User not found in request",
          });
          return;
        }

        const { resumeLink } = req.body;
        if (!resumeLink) {
          res.status(400).json({
            success: false,
            message: "resumeLink is required",
          });
          return;
        }

        // Update the user record with the new resumeLink
        const updatedUserResumeLink = await updateUserResumeLink(userId, resumeLink);
        if (!updatedUserResumeLink) {
          res.status(404).json({
            success: false,
            message: "Failed to update user information",
          });
          return;
        }
        const AI_summary = await getDocumentSummary(resumeLink);


        res.status(200).json({ success: true, data: {resumeLink:updatedUserResumeLink,AI_summary:AI_summary} });
        return;
    }
    catch (error) {
        console.error("Update User Profile Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}
//TODO-> for update of the complete user profile we need to do the same as above but with all the fields and also check if the user is present in the db or not