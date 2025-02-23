import { prisma } from "../db/db";
import { ApplicationStatus, Job, JobStatus } from "@prisma/client";

export const getJobsByEmployerId = async (employerId: string) => {
  const jobs = await prisma.job.findMany({
    where: {
      employerId: employerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
    },
  });
  const jobsWithApplicantsCount: {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    applicantsCount: number;
  }[] = await Promise.all(
    jobs.map(async (job) => {
      const applicantsCount = await prisma.application.count({
        where: {
          jobId: job.id,
        },
      });
      return {
        ...job,
        applicantsCount,
      };
    })
  );
  return jobsWithApplicantsCount;
};



export const getApplicationsByJobId = async (jobId: string) => {
  const applications = await prisma.application.findMany({
    where: {
      jobId: jobId,
    },
  });
  const userDetails = await prisma.user.findMany({
    where: {
      id: {
        in: applications.map((application) => application.userId),
      },
    },
  });
  const applicationsWithUserDetails = applications.map((application) => {
    const user = userDetails.find((user) => user.id === application.userId);
    return {
      application,
      user,
    };
  });
  return applicationsWithUserDetails;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus,
  userId: string
) => {
  const application = await prisma.application.update({
    where: {
      id: applicationId,
      userId: userId,
    },
    data: {
      status: status,
    },
  });
  return application;
};

export const updateJobStatus = async (jobId: string, jobStatus: JobStatus) => {
  const job = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      jobStatus: jobStatus,
    },
  });
  return job;
};


export const createJobService = async (job: Omit<Job, "id" | "createdAt" | "updatedAt">  ,employerId:string) => {
  const createdJob = await prisma.job.create({
    data: {
      ...job,
      employerId: employerId,
    },
  });
  return createdJob;
};



