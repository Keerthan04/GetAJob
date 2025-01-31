import { Request, Response, Router } from "express";
// /api/auth router

const router = Router();

router.post("/login", (req:Request, res:Response) => {
  res.send("Hello from auth routes");
});

router.post("/register", (req:Request, res:Response) => {
  res.send("Hello from auth routes");
});

export default router;

//TODO
//should setup the validators also