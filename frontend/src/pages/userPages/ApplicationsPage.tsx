import NavBar from "@/components/NavBar";
import ApplicationsTable from "@/components/user/ApplicationsTable";
// import { UserDataContext } from "@/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const ApplicationsPage = () => {
  // const { userData } = useContext(UserDataContext)!;
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/applied`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAppliedJobs(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast.error("Failed to fetch Applications");
      } finally {
        setLoading(false);
        toast.success("Your Applications Fetched successfully");
      }
    };
    fetchJobs();
  }, []);
  return (
    <div>
      <NavBar pathname="/users/applications" />
      <Toaster richColors position="top-right" />
      {loading ? (
        <div className="flex justify-center py-6">Loading...</div>
      ) : (
        <ApplicationsTable appliedJobs={appliedJobs}/>
      )}
      ;
    </div>
  );
};

export default ApplicationsPage;
