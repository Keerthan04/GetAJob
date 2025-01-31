import { Router } from "express";
// /api/employeer router

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from employeer routes");
});

export default router;