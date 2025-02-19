import { Router } from "express";
import { employerVerification } from "../middleware/auth.middleware";
import { getEmployerJobs, getJobAndApplications } from "../controllers/employeer.controller";
// /api/employeer router

const router = Router();

//to get all the jobs posted by the employer
router.get("/jobs", employerVerification, getEmployerJobs);

//to get the details of a particular job
router.get("/jobs/:job_id", employerVerification, getJobAndApplications);

//to create a new job(shd create and also add the job to the algolia search index)
router.post("/jobs", (req, res) => {
  res.send("Hello from employeer routes");
});

//to update a job
router.put("/jobs/:job_id", (req, res) => {
  res.send("Hello from employeer routes");
});

//to delete a job
router.delete("/jobs/:job_id", (req, res) => {
  res.send("Hello from employeer routes");
});

router.put("/jobs/:job_id/applications/:application_id/status", (req, res) => {
  res.send("Hello from employeer routes");
});



export default router;
