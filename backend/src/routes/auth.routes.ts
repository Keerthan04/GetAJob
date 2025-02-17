import { Request, Response, Router } from "express";
import { LoginEmployer, LoginUser, RegisterEmployer, RegisterUser } from "../controllers/auth.controller";
import { validateLogin, validateRegisterEmployer, validateRegisterUser } from "../middleware/auth.middleware";
// /api/auth router

const router = Router();
//users login and register routes

//working in both thunder client and frontend setup
router.post("/user/login", validateLogin ,LoginUser);

//Working now in thunder client
// TODO -> setup frontend and work
router.post("/user/register",validateRegisterUser ,RegisterUser);

//employers login and register routes

//working in both thunder client and frontend setup
router.post("/employer/login",validateLogin,LoginEmployer);

//Working now in thunder client
// TODO -> setup frontend and work
router.post("/employer/register",validateRegisterEmployer, RegisterEmployer);

export default router;

//TODO
//should setup the validators also