//api/users/
import { Router } from "express";
import { userVerification } from "../middleware/auth.middleware";
import { getJobs, getJobDetails } from "../controllers/users.controller";


const router = Router();

// the validation still to be done
router.get('/jobs', userVerification, getJobs);

//validation to be done(returns the job details)
//requires to pass the job id as params
router.get('/jobs/:job_id', userVerification, getJobDetails);

export default router;