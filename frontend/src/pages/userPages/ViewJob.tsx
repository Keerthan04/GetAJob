// import { UserDataContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { ApplicationStatus, companyDetails, Job } from "@/types";
import { JobDetails } from "@/components/user/JobDetails";
import { Toaster,toast } from "sonner";

const ViewJob = () => {
  const { job_id } = useParams<{ job_id: string }>();
  console.log(job_id)
  // const { userData } = useContext(UserDataContext)!;
  const [job, setJob] = useState<Job | null>(null);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [company, setCompany] = useState<companyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      const toastId = toast.loading("Fetching job details...");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/jobs/${job_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { job, company, isApplied, applicationStatus } = res.data.data;
        setJob(job);
        setCompany(company);
        setIsApplied(isApplied);
        if(applicationStatus === undefined) {
          setApplicationStatus(null);
        }else{
          setApplicationStatus(applicationStatus);
        }
        toast.success(res.data.message,{id: toastId});
      } catch (error) {
        console.error("Failed to fetch job:", error);
        toast.error("Failed to fetch job details", {id: toastId});
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [job_id]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <NavBar pathname="/users"  />
      {loading ? (
        <div className="text-center flex h-screen w-screen items-center justify-center">Loading...</div>
      )
      : (
        <JobDetails
          job={job as Job}
          isApplied={isApplied}
          company={company as companyDetails}
          applicationStatus={applicationStatus}
        />
      )}
    </>
  );
};

export default ViewJob;
