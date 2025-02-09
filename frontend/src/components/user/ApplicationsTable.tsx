import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { ApplicationStatus, Job } from "@/types";
import { Briefcase, MapPin } from "lucide-react";

interface Application {
  job: Job;
  isApplied: boolean;
  company: {
    id: string;
    name: string;
    companyName: string;
    companyWebsite?: string;
    companySize: string;
    industry: string;
    location: string;
    description?: string;
    logoUrl?: string;
    verified: boolean;
  };
  applicationStatus?: ApplicationStatus;
}

interface ApplicationsTableProps {
  appliedJobs: Application[];
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  appliedJobs,
}) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full max-w-5xl mx-auto mt-6 shadow-md">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Job Applications</h2>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="text-left">Job Title</TableHead>
              <TableHead className="text-left">Company</TableHead>
              <TableHead className="text-left">Location</TableHead>
              <TableHead className="text-left">Salary</TableHead>
              <TableHead className="text-left">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliedJobs.map((app) => (
              <TableRow key={app.job.id} className="hover:bg-gray-50 m-5 p-10
               ">
                {/* Job Title */}
                <TableCell className="flex items-center gap-2 font-medium">
                  <Briefcase size={18} className="text-gray-600" />
                  <span className="truncate">{app.job.title}</span>
                </TableCell>

                {/* Company (Logo + Name in One Row) */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {app.company.companyName}
                    </span>
                  </div>
                </TableCell>

                {/* Location */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gray-600" />
                    <span className="truncate">{app.company.location}</span>
                  </div>
                </TableCell>

                {/* Salary */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* <DollarSign size={18} className="text-gray-600" /> */}
                    <span className="truncate">
                      {app.job.salaryRange || "Not Disclosed"}
                    </span>
                  </div>
                </TableCell>

                {/* Application Status */}
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium block w-fit ${
                      app.applicationStatus === ApplicationStatus.ACCEPTED
                        ? "bg-green-100 text-green-700"
                        : app.applicationStatus === ApplicationStatus.REJECTED
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.applicationStatus?.toLowerCase()}
                  </span>
                </TableCell>

                {/* View Details Button */}
                <TableCell className="text-center">
                  <Button
                    variant="default"
                    style={{ backgroundColor: "#1E40AF" }}
                    onClick={() => navigate(`/users/jobs/${app.job.id}`)}
                    className="px-4 py-2"
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTable;
