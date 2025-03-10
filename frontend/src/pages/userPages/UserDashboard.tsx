import NavBar from "@/components/NavBar";

import { RecommendedJobs } from "@/components/user/Recommended-Jobs";
// import { UserDataContext } from "@/context/UserContext";
import { Job } from "@/types";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Search } from "lucide-react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Pagination,
} from "react-instantsearch";
import { searchClient, indexName } from "@/lib/algolia";
import SearchHit from "@/components/user/SearchHit";


//TODO -> Implement the filters for the search results(also if no search results are found to show no results found) and also test pagination with adding more jobs to db and also to algoia index

const UserDashboard = () => {
  // const { userData } = useContext(UserDataContext)!;
  const [loading, setLoading] = useState(true);
  const [sampleJobs, setSampleJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/jobs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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
  }, []);


  return (
    <div>
      <NavBar pathname="/users/jobs" />
      <Toaster richColors position="top-right" />
      {loading ? (
        <div className="flex justify-center py-6">Loading...</div>
      ) : (
        <div className="flex justify-center py-6">
          <div className="w-full max-w-3xl space-y-6">
            {/* Recommended Jobs Section */}
            <RecommendedJobs jobs={sampleJobs?.slice(0, 3)} />

            {/* Search Bar with Icon */}
            <InstantSearch searchClient={searchClient} indexName={indexName}>
              <div className="relative flex items-center border border-black/50 rounded-full bg-white px-3 py-2 w-full">
                <Search className="w-5 h-5 text-gray-600" />

                <SearchBox
                  placeholder="Search for jobs..."
                  classNames={{
                    input: "pl-3 bg-white w-full outline-none",
                    form: "flex-grow w-full", // Ensures the search box expands fully
                    submitIcon: "hidden",
                    resetIcon: "hidden",
                    loadingIcon: "hidden",
                    root: "flex-grow w-full",
                  }}
                  autoFocus
                />
              </div>

              {/* Filter by Location */}
              <RefinementList attribute="location" className="mt-4" />

              {/* Search Results */}
              <Hits hitComponent={SearchHit} classNames={{
                "list": "space-y-4",
                "emptyRoot": "text-center mt-4",
              }} />


              {/* Pagination (5 per page) */}
              <div className="mt-4 flex justify-center">
                <Pagination
                  classNames={{
                    list: "flex space-x-2",
                    link: "px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-200",
                    selectedItem: "bg-gray-200  text-white",
                  }}
                  padding={2}
                  showLast={true}
                />
              </div>
            </InstantSearch>

            {/* Currently dont need the job listing table(as we are dealing with search results)
            Job Listings Table
            <JobsTable jobs={sampleJobs} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
