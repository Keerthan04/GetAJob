import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    region: process.env.AWS_S3_BUCKET_REGION as string,
});

const s3 = new AWS.S3();

//for getting the presigned url for uploading the file to s3
//key is the path where the file is stored in s3
export async function uploadFileToS3PresignedUrl(fileName: string,fileType: string) {
    try {
        const key = `resumes/${Date.now()}-${fileName}`; //key to store the file in s3 and also to access it
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: key,
            Expires: 60,
            ContentType: fileType,
        };
        const url = await s3.getSignedUrlPromise("putObject", params);
        return { url, key };//url to frontend send so request send and file uploaded to s3, key to store in db so that we can access the file or allow for access
    } catch (error) {
        console.log(error);
        throw new Error('Error while generating presigned url');
    }
}

export async function deleteFileFromS3(key: string) {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: key,
        };
        await s3.deleteObject(params).promise();
    } catch (error) {
        console.log(error);
        throw new Error('Error while deleting file from S3');
    }
}

//for getting the presigned url for viewing the file from s3
//key is the path where the file is stored in s3
export async function getFileFromS3PresignedUrl(key: string) {
    try {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME as string,
            Key: key,
        };//shd see if we need to add expiry time
        const url = await s3.getSignedUrlPromise("getObject", params);
        return url;
    } catch (error) {
        console.log(error);
        throw new Error('Error while generating presigned url');
    }
}
