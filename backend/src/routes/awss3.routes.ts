import { Router } from "express";
import { generatePresignedUrl, getPresignedUrl } from "../controllers/awss3.controller";
const router = Router();
//router for aws s3 it is as /api/awss3

//to generate the file key url from s3 for uploading the file
router.get("/generate-presigned-url", generatePresignedUrl);

//to get the file key url from s3 for viewing the file
router.get("/get-presigned-url", getPresignedUrl);
//TODO-> again i doubt of hitting of this get-presigned-url from frontend should be like from any service where key is there then ask for url for it so see for that(Also set up react dropzone and see if it is working)

export default router;