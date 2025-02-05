import { Request, Response } from "express";
import { getAllJobs, getJob } from "../services/users.service";
import { Job } from "@prisma/client";
import { UserMiddlewareRequest } from "../middleware/auth.middleware";

export async function getJobs(req: Request, res: Response): Promise<void> {
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
export async function getJobDetails(req: JobDetailsRequest, res: Response<{
    success: boolean;
    data?: {
        job: Job,
        isApplied: boolean,
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
        }
    };
    message?: string;
    error?: string;
}>): Promise<void> {
    try{

        const { job_id} = req.params;
        const user_id = req.user?.id;
        const job = await getJob(user_id as string, job_id);
        if(!job){
            res.status(404).json({
                success: false,
                message: "Job not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {
                job: job.job,
                isApplied: job.isApplied,
                company: {
                    ...job.company,
                    companyWebsite: job.company.companyWebsite ?? undefined,
                    description: job.company.description ?? undefined,
                    logoUrl: job.company.logoUrl ?? undefined
                }
            }
        })
    }catch(error){
        console.error("Get Job Details Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}