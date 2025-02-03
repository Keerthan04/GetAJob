import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "./Job-card";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedDate: string;
}

interface RecommendedJobsProps {
  jobs: Job[];
}

export function RecommendedJobs({ jobs }: RecommendedJobsProps) {
  return (
    <Card className="bg-gray-100 mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-blue-900">Recommended Jobs</CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on your resume and profile
        </p>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 justify-center">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </CardContent>
    </Card>
  );
}
