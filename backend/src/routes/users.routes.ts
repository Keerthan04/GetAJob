import { Router } from "express";
// /api/users router

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from users routes");
});

export default router;