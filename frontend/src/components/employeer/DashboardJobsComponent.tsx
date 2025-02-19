import type React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  applicantsCount: number;
}

const DashboardJobsComponent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [sampleJobs, setSampleJobs] = useState<JobPosting[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/employer/jobs`,
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

  return loading ? (
    <div className="flex justify-center py-6">Loading...</div>
  ) : (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">
        Your Job Postings
      </h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {sampleJobs.length === 0 ? (
          <div className="flex justify-center py-6 text-gray-500 flex-col items-center gap-2">
            <h2>No jobs posted, Post a job to get started </h2>
            <Link to="/employeer/post-job">
              <Button className="bg-blue-900 hover:bg-blue-800 cursor-pointer">
                Post a job
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleJobs.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-900">
                    {job.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-600 mb-4">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      <span>
                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Badge variant="secondary" className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicantsCount} Applicants
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/employeer/jobs/${job.id}`}>
                    <Button className="w-full bg-blue-900 hover:bg-blue-800">
                      View Applications
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DashboardJobsComponent;
