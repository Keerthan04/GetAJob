import NavBar from "@/components/NavBar";
// import { Input } from "@/components/ui/input";
import { JobsTable } from "@/components/user/Jobs-table";
import { RecommendedJobs } from "@/components/user/Recommended-Jobs";
import { UserDataContext } from "@/context/UserContext";
import { Job } from "@/types";
// import { Search } from "lucide-react";
import { useEffect, useContext, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { InstantSearch, SearchBox,Hits} from "react-instantsearch";
import {searchClient,indexName} from '@/lib/algolia';
import { useNavigate } from "react-router-dom";

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
            {/* Search Bar with Algolia */}
            <InstantSearch searchClient={searchClient} indexName={indexName}>
              <SearchBox
                placeholder="Search for jobs..."
                classNames={{
                  input: "pl-10 bg-white w-full",
                }}
              />
              <Hits hitComponent={JobHit} />
            </InstantSearch>
            {/* Job Listings Table */}
            <JobsTable jobs={sampleJobs} />
          </div>
        </div>
      )}
    </div>
  );
};

// Component to display each search result
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JobHit = ({ hit }: { hit: any }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-3 rounded-md shadow-sm">
      <h3 className="font-semibold">{hit.title}</h3>
      <p className="text-sm text-gray-500">{hit.company}</p>
      <p className="text-xs text-gray-400">{hit.location}</p>

      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => navigate(`/users/jobs/${hit.id}`)}
      >
        View More
      </button>
    </div>
  );
};

export default UserDashboard;
