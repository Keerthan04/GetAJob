import { Request, Response } from "express";
import { getAllJobs } from "../services/users.service";

export async function getJobs(req: Request, res: Response): Promise<void> {
    try {
        const jobs = await getAllJobs() || [];
        res.status(200).json({
            success: true,
            data: jobs
        });
    } catch (error) {
        console.error("Get Jobs Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: (error as Error).message
        });
    }
}