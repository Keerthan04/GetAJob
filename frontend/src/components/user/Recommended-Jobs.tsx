import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobCard } from "./job-card";

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
    <Card className="bg-blue-50">
      <CardHeader>
        <CardTitle className="text-blue-900">Recommended Jobs</CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on your resume and profile
        </p>
      </CardHeader>
      <CardContent className="grid gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </CardContent>
    </Card>
  );
}
