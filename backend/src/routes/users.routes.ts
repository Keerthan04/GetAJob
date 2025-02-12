//api/users/
import { Router } from "express";
import { userVerification } from "../middleware/auth.middleware";
import { getJobs, getJobDetails, applyForJob, getAppliedJobs } from "../controllers/users.controller";


const router = Router();


// the validation still to be done
router.get('/jobs', userVerification, getJobs);

//!NOT to be used anywhere(only for one time update to algolia)
router.get('/algolia/jobs',getJobs);

//validation to be done(returns the job details)
//requires to pass the job id as params
router.get('/jobs/:job_id', userVerification, getJobDetails);

//apply for a job
router.get('/jobs/:job_id/apply', userVerification, applyForJob);

//get all jobs applied by the user
router.get('/applied', userVerification, getAppliedJobs);

export default router;