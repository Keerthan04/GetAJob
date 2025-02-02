import { Request, Response, Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/users.controller";
// /api/auth router

const router = Router();

//working in both thunder client and frontend setup
router.post("/user/login", LoginUser);

//Working now in thunder client
// TODO -> setup frontend and work
router.post("/user/register",RegisterUser);

export default router;

//TODO
//should setup the validators also