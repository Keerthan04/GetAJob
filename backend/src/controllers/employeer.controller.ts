import { EmployerMiddlewareRequest } from "../middleware/auth.middleware";
import { Response, Request } from "express";
import { getJobsByEmployerId } from "../services/employeer.service";
import { getJobById, getApplicationsByJobId } from "../services/employeer.service";
import { ApplicationStatus, JobStatus } from "@prisma/client";
import { updateApplicationStatus, updateJobStatus } from "../services/employeer.service";


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
    const jobs = await getJobsByEmployerId(employer.id) || [];
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
    const application = await updateApplicationStatus(application_id, status,userId);
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
