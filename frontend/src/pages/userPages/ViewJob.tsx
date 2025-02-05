import { UserDataContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "@/components/NavBar";
import { companyDetails, Job } from "@/types";
import { JobDetails } from "@/components/user/JobDetails";

const ViewJob = () => {
  const { job_id } = useParams<{ job_id: string }>();
  console.log(job_id)
  const { userData } = useContext(UserDataContext)!;
  const [job, setJob] = useState<Job | null>(null);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [company, setCompany] = useState<companyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/jobs/${job_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { job, company, isApplied } = res.data.data;
        setJob(job);
        setCompany(company);
        setIsApplied(isApplied);
      } catch (error) {
        console.error("Failed to fetch job:", error);
        setError("Error fetching job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [job_id]);

  return (
    <>
      <NavBar pathname="/users" user={userData} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <JobDetails
          job={job as Job}
          isApplied={isApplied}
          company={company as companyDetails}
        />
      )}
    </>
  );
};

export default ViewJob;
