import { Router } from "express";
import { employerVerification } from "../middleware/auth.middleware";
import { getEmployerJobs } from "../controllers/employeer.controller";
// /api/employeer router

const router = Router();

//to get all the jobs posted by the employer
router.get("/jobs", employerVerification, getEmployerJobs);

//to get the details of a particular job
router.get("/jobs/:job_id", (req, res) => {
  res.send("Hello from employeer routes");
});

//to create a new job
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



export default router;
