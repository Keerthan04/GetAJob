import { Input } from "@/components/ui/input";
import { JobsTable } from "@/components/jobs-table";
import { RecommendedJobs } from "@/components/recommended-jobs";
import { Search } from "lucide-react";

// This would normally come from an API
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
  // Add more sample jobs as needed
];

export default function JobsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <RecommendedJobs jobs={sampleJobs.slice(0, 3)} />

      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for jobs..." className="pl-10 bg-white" />
      </div>

      <JobsTable jobs={sampleJobs} />
    </div>
  );
}
