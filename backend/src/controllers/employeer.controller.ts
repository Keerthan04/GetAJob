import { EmployerMiddlewareRequest } from "../middleware/auth.middleware";
import { Response, Request } from "express";
import { getJobsByEmployerId } from "../services/employeer.service";
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
