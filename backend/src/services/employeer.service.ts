import { prisma } from "../db/db";
import { ApplicationStatus } from "@prisma/client";

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

export const getJobById = async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });
  return job;
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
