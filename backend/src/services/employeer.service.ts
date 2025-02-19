import { prisma } from "../db/db";


export const getJobsByEmployerId = async (employerId: string) => {
    const jobs = await prisma.job.findMany({
        where: {
            employerId: employerId
        },
        select:{
            id: true,
            title: true,
            description: true,
            createdAt: true,
        }
    });
    const jobsWithApplicantsCount:{
        id: string;
        title: string;
        description: string;
        createdAt: Date;
        applicantsCount: number;
    }[] = await Promise.all(jobs.map(async (job) => {
        const applicantsCount = await prisma.application.count({
            where: {
                jobId: job.id
            }
        });
        return {
            ...job,
            applicantsCount
        };
    }));
    return jobsWithApplicantsCount;
}
