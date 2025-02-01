import { Request, Response, Router } from "express";
import { LoginUser } from "../controllers/users.controller";
// /api/auth router

const router = Router();

router.post("/login", LoginUser);

router.post("/register", (req:Request, res:Response) => {
  res.send("Hello from auth routes");
});

export default router;

//TODO
//should setup the validators also