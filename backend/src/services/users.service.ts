import { prisma } from "../db/db";
export const getAllJobs = async () => {
    // get all jobs
    const jobs = await prisma.job.findMany();//this will be an jobs object array
    return jobs;
};