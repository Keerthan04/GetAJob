import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Job } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { Building2, MapPin, Timer } from "lucide-react";

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

export function JobCard( { job, compact = false }: JobCardProps) {
  return (
    <Card
      className={`${
        compact ? "border-0 shadow-none" : "border shadow-md"
      } bg-white`}
    >
      <CardContent className={`${compact ? "p-2" : "p-6"}`}>
        <div className="space-y-1.5">
          <h3 className={`font-semibold ${compact ? "text-base" : "text-lg"}`}>
            {job.title}
          </h3>
          <div className="flex items-center text-muted-foreground gap-2">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{job.company}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {job.jobType}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className={`${compact ? "p-2" : "px-6 pb-6"}`}>
        <div className="flex flex-col gap-2 items-center justify-between w-full">
          {/* <span className="text-sm text-muted-foreground">
            Posted {'2 days ago'}
          </span> */}
          <Separator className="w-full" />
          <Button variant="default" className="bg-blue-900 hover:bg-blue-800">
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
