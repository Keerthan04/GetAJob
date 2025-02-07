import { ApplicationStatus } from "@prisma/client";
import { prisma } from "../db/db";
export const getAllJobs = async () => {
    // get all jobs
    const jobs = await prisma.job.findMany();//this will be an jobs object array
    return jobs;
};

export const getJob = async (user_id: string, job_id: string) => {
    // get job by id
    const job = await prisma.job.findUnique({
        where: {
            id: job_id
        }
    });
    if (!job) {
        return null;
    }
    const isAppliedByUser = await prisma.application.findFirst({
      where: {
        jobId: job_id,
        userId: user_id,
      },
    });
    const companyDetails = await prisma.employer.findUnique({
        where: {
            id: job.employerId
        },
        select:{
            id: true,
            name: true,
            companyName: true,
            companyWebsite: true,
            companySize: true,
            industry: true,
            location: true,
            description: true,
            logoUrl: true,
            verified: true
        }
    });
    if (!companyDetails) {
        return null;
    }
    if (isAppliedByUser) {
        //get the application status
        const applicationStatus = await prisma.application.findFirst({
            where: {
                jobId: job_id,
                userId: user_id
            },
            select: {
                status: true
            }
        });
      return {
        job: job,
        isApplied: true,
        company: companyDetails,
        applicationStatus: applicationStatus?.status,
      };
    }else{
        return {
            job: job,
            isApplied: false,
            company: companyDetails,
        };
    }
}

export const jobApplication = async (user_id: string, job_id: string): Promise<ApplicationStatus> => {
    // apply for a job
    const application = await prisma.application.create({
        data: {
            jobId: job_id,
            userId: user_id,
            status: "UNDER_CONSIDERATION",
        }
    });
    return application.status;
}