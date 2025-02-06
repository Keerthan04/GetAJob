"use client";
import { useParams, useLocation } from "react-router-dom";
import { JobApplicationForm } from "@/components/user/JobApplicationForm";
import { Job } from "@/types";
import { useContext } from "react";
import { UserDataContext } from "@/context/UserContext";
import NavBar from "@/components/NavBar";

export default function JobApplicationPage() {
  const params = useParams<{ job_id: string }>();
  const location = useLocation();
  const jobData = location.state?.job as Job; 
  const jobId = params.job_id as string;
  const {userData} = useContext(UserDataContext)!;

  if (!jobData || !userData) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Job not found</h1>
        <p>Unable to load job details. Please try again.</p>
      </div>
    );
  }

  return (
    <>
    <NavBar pathname="/users" user={userData} />
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Apply for {jobData.title}</h1>
      <JobApplicationForm job={jobData} userData={userData} jobId={jobId} />
    </div>
    </>
  );
}
