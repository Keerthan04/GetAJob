import { Request, Response, Router } from "express";
import { LoginEmployer, LoginUser, RegisterEmployer, RegisterUser } from "../controllers/auth.controller";
// /api/auth router

const router = Router();
//users login and register routes

//working in both thunder client and frontend setup
router.post("/user/login", LoginUser);

//Working now in thunder client
// TODO -> setup frontend and work
router.post("/user/register",RegisterUser);

//employers login and register routes

//working in both thunder client and frontend setup
router.post("/employer/login",LoginEmployer);

//Working now in thunder client
// TODO -> setup frontend and work
router.post("/employer/register",RegisterEmployer);

export default router;

//TODO
//should setup the validators also