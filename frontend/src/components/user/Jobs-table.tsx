"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";
import { Link } from "react-router-dom";

interface JobsTableProps {
  jobs: Job[];
}

export function JobsTable({ jobs }: JobsTableProps) {
  return (
    <div className="rounded-md border shadow-md bg-white mx-auto w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell className="text-right">
                <Link to={`/users/jobs/${job.id}`}>
                <Button
                  variant="default"
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  Apply
                </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
