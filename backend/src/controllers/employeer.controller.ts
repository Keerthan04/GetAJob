import { EmployerMiddlewareRequest } from "../middleware/auth.middleware";
import { Response, Request } from "express";
import { createJobService, getJobsByEmployerId } from "../services/employeer.service";
import {
  getApplicationsByJobId,
} from "../services/employeer.service";
import { ApplicationStatus, Job, JobStatus } from "@prisma/client";
import {
  updateApplicationStatus,
  updateJobStatus,
} from "../services/employeer.service";
import { getUserById, getJobById, addJobToAlgolia } from "../services/utils.service";
import { sendEmail } from "../mail/sendEmail";
import { emailTemplates } from "../mail/emailTemplate";


type EmailTemplateKey = keyof typeof emailTemplates;

export async function getEmployerJobs(
  req: EmployerMiddlewareRequest,
  res: Response
) {
  try {
    const employer = req.employer;
    if (!employer) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const jobs = (await getJobsByEmployerId(employer.id)) || [];
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error("Get employer Jobs Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}

interface JobAndApplicationsRequest extends EmployerMiddlewareRequest {
  params: {
    job_id: string;
  };
}

//when the employer clicks on a job, this function is called to get the job and the applications for that job so that we can show the employer the applications and the details of the applicants
export async function getJobAndApplications(
  req: JobAndApplicationsRequest,
  res: Response
) {
  try {
    const employer = req.employer;
    if (!employer) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const { job_id } = req.params;
    const job = await getJobById(job_id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    const applications = await getApplicationsByJobId(job_id);
    res.status(200).json({ success: true, data: { job, applications } });
  } catch (error) {
    console.error("Get job and applications Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}

interface ChangeApplicationStatusRequest extends EmployerMiddlewareRequest {
  params: {
    job_id: string;
    application_id: string;
  };
  body: {
    status: ApplicationStatus;
    userId: string;
  };
}

export async function changeApplicationStatus(
  req: ChangeApplicationStatusRequest,
  res: Response
) {
  try {
    const employer = req.employer;
    if (!employer) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const { job_id, application_id } = req.params;
    const { status, userId } = req.body;
    const application = await updateApplicationStatus(
      application_id,
      status,
      userId
    );
    if (!application) {
      res
        .status(404)
        .json({ success: false, message: "Application not found" });
      return;
    }
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const job = await getJobById(job_id);
    if (!job) {
      res.status(404).json({ success: false, message: "Job not found" });
      return;
    }
    const email = user.email;
    const userName = user.name;
    const jobTitle = job.title;
    const companyName = job.company;
    const statusString = status.toString() as EmailTemplateKey;
    if (emailTemplates[statusString]) {
      const emailContent = emailTemplates[statusString](
        userName,
        jobTitle,
        companyName
      );
      await sendEmail({
        to: email,
        subject: emailContent.subject,
        text: emailContent.subject, // Plain text fallback
        html: emailContent.html,
      });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    console.error("Change application status Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}

interface ChangeJobStatusRequest extends EmployerMiddlewareRequest {
  params: {
    job_id: string;
  };
  body: {
    jobStatus: JobStatus;
  };
}
export async function changeJobStatus(
  req: ChangeJobStatusRequest,
  res: Response
) {
  try {
    const employer = req.employer;
    if (!employer) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const { job_id } = req.params;
    const { jobStatus } = req.body;
    const job = await updateJobStatus(job_id, jobStatus);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("Change job status Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}

export async function getEmployerProfile(req: EmployerMiddlewareRequest, res: Response) {
  try {
    const employer = req.employer;
    if (!employer) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    res.status(200).json({ success: true, data: employer });
  } catch (error) {
    console.error("Get Employer Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}


export interface CreateJobRequest extends EmployerMiddlewareRequest {
  body:{
    job: Omit<Job, "id" | "createdAt" | "updatedAt">;
  }
}

export async function createJob(req: CreateJobRequest, res: Response) {
  try {
    const employer = req.employer;
    if (!employer) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const { job } = req.body;
    const createdJob = await createJobService(job,employer.id);
    const addedJobToAlgolia = await addJobToAlgolia(createdJob);
    if(!addedJobToAlgolia){
      res.status(500).json({ success: false, message: "Failed to add job to Algolia" });
      return;
    }
    res.status(201).json({ success: true, data: createdJob });
  } catch (error) {
    console.error("Create job Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
}
//TODO->logic issue is if job created but algolia failed, we need to delete the job from the database or we shd make the algolia first then add job to the database(both when we do we shd check if the job is added to the database and algolia)(so another call with delete job from the database and also delete job from the algolia(will be used in the delete job controller also so easy to implement))
//TODO->make the delete job controller and also make the delete job from the algolia controller(will be used in the delete job controller also so easy to implement))
//TODO->make the update job controller and also make the update job from the algolia controller(will be used in the update job controller also so easy to implement))
