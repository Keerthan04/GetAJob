import NavBar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { JobsTable } from "@/components/user/Jobs-table";
import { RecommendedJobs } from "@/components/user/Recommended-Jobs";
import { UserDataContext } from "@/context/UserContext";
import { Job } from "@/types";
import { Search } from "lucide-react";
import { useEffect, useContext, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";


const UserDashboard = () => {
  const { userData } = useContext(UserDataContext)!;
  const [loading, setLoading] = useState(true);
  const [sampleJobs, setSampleJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/jobs`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSampleJobs(res.data.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
        toast.success("Jobs fetched successfully");
      }
    };
      fetchJobs();
  },[]);
  return (
    <div>
      <NavBar pathname="/users/jobs" user={userData} />
      <Toaster richColors position="top-right" />
      {loading ? (
        <div className="flex justify-center py-6">Loading...</div>
      ) : (
        <div className="flex justify-center py-6">
          <div className="w-full max-w-3xl space-y-6">
            {" "}
            {/* Centering with max-width */}
            {/* Recommended Jobs Section */}
            <RecommendedJobs jobs={sampleJobs?.slice(0, 3)} />
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for jobs..."
                className="pl-10 bg-white w-full"
              />
            </div>
            {/* Job Listings Table */}
            <JobsTable jobs={sampleJobs} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
