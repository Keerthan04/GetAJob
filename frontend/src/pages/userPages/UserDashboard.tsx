import NavBar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { JobsTable } from "@/components/user/Jobs-table";
import { RecommendedJobs } from "@/components/user/Recommended-Jobs";
import { Search } from "lucide-react";

const sampleJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    type: "Full-time",
    postedDate: "2d ago",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "StartupCo",
    location: "Remote",
    type: "Full-time",
    postedDate: "1d ago",
  },
];

const UserDashboard = () => {
  return (
    <div>
      <NavBar pathname="/users" />
      <div className="flex justify-center py-6">
        <div className="w-full max-w-3xl space-y-6">
          {" "}
          {/* Centering with max-width */}
          {/* Recommended Jobs Section */}
          <RecommendedJobs jobs={sampleJobs.slice(0, 3)} />
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
    </div>
  );
};

export default UserDashboard;
