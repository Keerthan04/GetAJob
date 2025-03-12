import { Request, Response } from 'express';
import {getFileFromS3PresignedUrl, uploadFileToS3PresignedUrl} from '../services/awss3.service';
import {
  PresignedUrlQuery,
  getPresignedUrlQuery,
} from "../middleware/aws.middleware";


//to get the presigned url for uploading the file to s3
export async function generatePresignedUrl(
  req: PresignedUrlQuery, //for query shd be like this
  res: Response
) {
  try {
    const { fileName, fileType } = req.query;
    if (!fileName || !fileType) {
      res.status(400).json({
        success: false,
        message: "fileName and fileType are required",
      });
      return;
    }
    const { url, key } = await uploadFileToS3PresignedUrl(fileName, fileType);
    const data = { url, key }; //so send the url and key to frontend and frontend will use the url to upload the file to s3 and key with the user data send when registering the user so then will be stored in db
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = (error as Error).message;
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: errorMessage,
    });
    return;
  }
}
//TODO->check if key is there and also check if the file is uploaded to s3 and then store the key in db(all check once)
//to get the presigned url for viewing the file from s3


//TODO -> basically we dont ask for the url it is done in anyone service where key from db then asked for url for it so see for that basically the below one not hit by frontend so see for that
export async function getPresignedUrl(req: getPresignedUrlQuery, res: Response) {
  try {
    const { key } = req.query;
    if (!key) {
      res.status(400).json({ success: false, message: "key is required" });
      return;
    }
    const url = await getFileFromS3PresignedUrl(key); //this url is for viewing the file
    res.status(200).json({ success: true, data: url });
  } catch (error) {
    console.error("Login Error:", error);
    const errorMessage = (error as Error).message;
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: errorMessage,
    });
    return;
  }
}