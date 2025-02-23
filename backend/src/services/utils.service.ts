import { prisma } from "../db/db";
import { Job } from "@prisma/client";
import { algoliasearch } from "algoliasearch";
import dotenv from "dotenv";
dotenv.config();

export const getJobById = async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });
  return job;
};


export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  return user;
};


export const addJobToAlgolia = async (job: Job) => {
  try {
    const algoliaClient = algoliasearch(
      process.env.ALGOLIA_APPLICATION_ID as string,
      process.env.ALGOLIA_WRITE_API_KEY as string
    );
    const indexName = process.env.ALGOLIA_INDEX_NAME as string;
    const record = {
      objectID: job.id,
      ...job,
    };
    const {taskID} = await algoliaClient.saveObject({
      indexName,
      body: record,
    });
    await algoliaClient.waitForTask({
      indexName,
      taskID,
    });
    return true;
  } catch (error) {
    console.error("Error adding job to Algolia:", error);
    return false;
  }
};
