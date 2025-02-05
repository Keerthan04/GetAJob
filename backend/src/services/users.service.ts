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
      return {
        job: job,
        isApplied: true,
        company: companyDetails,
      };
    }else{
        return {
            job: job,
            isApplied: false,
            company: companyDetails,
        };
    }
}