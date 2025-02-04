//api/users/
import { Router } from "express";
import { userVerification } from "../middleware/auth.middleware";
import { getJobs } from "../controllers/users.controller";


const router = Router();

// the validation still to be done
router.get('/jobs', userVerification, getJobs);

export default router;