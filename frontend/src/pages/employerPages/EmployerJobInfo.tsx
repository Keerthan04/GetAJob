import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Application, Job, User, ApplicationStatus, JobStatus } from "@/types";
import axios from "axios";
import { toast } from "sonner";
import {
  Loader2,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import EmployerNavbar from "@/components/EmployerNavbar";
import { EmployerDataContext } from "@/context/EmployeerContext";

interface ApplicationWithUser {
  application: Application;
  user: User;
}
interface Status {
  applicationId: string;
  userId: string;
  status: ApplicationStatus;
}

const EmployerJobInfo = () => {
  const params = useParams<{ job_id: string }>();
  const jobId = params.job_id as string;
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
  const [status, setStatus] = useState<Status>({
    applicationId: "",
    userId: "",
    status: ApplicationStatus.ACCEPTED,
  });
  const [jobStatus, setJobStatus] = useState<JobStatus>(JobStatus.ACTIVE);
  const [isJobStatusDialogOpen, setIsJobStatusDialogOpen] = useState(false);
  const { employerData } = useContext(EmployerDataContext)!;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/employer/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { job, applications } = res.data.data as {
          job: Job;
          applications: ApplicationWithUser[];
        };
        setJobDetails(job);
        setApplications(applications);
        setJobStatus(job.jobStatus);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [jobId]);

  const handleStatusChange = async (
    applicationId: string,
    userId: string,
    status: ApplicationStatus
  ) => {
    try {
      toast.loading("Changing status...");
      const res = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/employer/jobs/${jobId}/applications/${applicationId}/status`,
        {
          status,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Status changed successfully");
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.application.id === applicationId
              ? { ...app, application: { ...app.application, status } } // Ensure proper structure
              : app
          )
        );
      }
    } catch (error) {
      console.error("Failed to change status:", error);
      toast.error("Failed to change status");
    }
  };
  const handleStatusSubmit = () => {
    console.log("Status change state value is", status);
    if (!status.applicationId || !status.userId || !status.status) {
      toast.error("Please select a valid status");
      return;
    }
    handleStatusChange(status.applicationId, status.userId, status.status);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-900" />
      </div>
    );
  }
  const handleJobStatus = async () => {
    try {
      if (!jobDetails?.id) {
        toast.error("Cannot change job status");
        return;
      }
      toast.loading("Updating job status...");
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employer/jobs/${
          jobDetails.id
        }`,
        {
          jobStatus:
            jobStatus === JobStatus.ACTIVE
              ? JobStatus.INACTIVE
              : JobStatus.ACTIVE,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.dismiss(); // Dismiss loading toast
        toast.success("Job status changed successfully");
        setJobStatus(res.data.data.jobStatus);
        setIsJobStatusDialogOpen(false); // Close the dialog manually
      }
    } catch (error) {
      console.error("Failed to change job status:", error);
      toast.dismiss();
      toast.error("Failed to change job status");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <EmployerNavbar pathname="/employer/jobs" employer={employerData} />
      <div className="container mx-auto p-6">
        <Card className="mb-8 border-2 border-blue-100">
          <CardHeader className="bg-blue-50 flex flex-row justify-between">
            <div className="w-1/2">
              <CardTitle className="text-2xl font-bold text-blue-900">
                {jobDetails?.title}
              </CardTitle>
              <CardDescription className="text-blue-700">
                Job Details
              </CardDescription>
              <Badge
                variant={
                  jobDetails?.jobStatus === JobStatus.ACTIVE
                    ? "success"
                    : "destructive"
                }
                className="mt-2"
              >
                {jobDetails?.jobStatus}
              </Badge>
            </div>
            <div className="w-1/2 flex justify-end">
              <Dialog
                open={isJobStatusDialogOpen}
                onOpenChange={setIsJobStatusDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    {jobStatus === JobStatus.ACTIVE
                      ? "Close Application"
                      : "Open Application"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Action</DialogTitle>
                    <DialogDescription>
                      {jobStatus === JobStatus.ACTIVE
                        ? "Are you sure you want to close applications for this job?"
                        : "Are you sure you want to open applications for this job?"}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={handleJobStatus}>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Briefcase className="w-5 h-5 text-blue-900" />
                <span>{jobDetails?.jobType}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-900" />
                <span>{jobDetails?.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <DollarSign className="w-5 h-5 text-blue-900" />
                <span>{jobDetails?.salaryRange ?? "Not Specified"}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5 text-blue-900" />
                <span>
                  Posted on:{" "}
                  {jobDetails?.createdAt
                    ? new Date(jobDetails.createdAt).toLocaleDateString()
                    : "Not Specified"}
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <p className="text-gray-700">{jobDetails?.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900">
              Applications
            </CardTitle>
            <CardDescription>
              {applications.length}{" "}
              {applications.length === 1 ? "applicant" : "applicants"} for this
              position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4">
                {applications.map((application) => (
                  <Card
                    key={application.application.id}
                    className="border-2 border-blue-100"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-blue-900 mb-2">
                            {application.user.name}
                          </h3>
                          <div className="space-y-1">
                            <p className="flex items-center text-gray-600">
                              <Mail className="w-4 h-4 mr-2 text-blue-900" />
                              {application.user.email}
                            </p>
                            <p className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-2 text-blue-900" />
                              {application.user.phone}
                            </p>
                          </div>
                          <Badge
                            className="mt-2"
                            variant={
                              application.application?.status === "ACCEPTED"
                                ? "success"
                                : application.application?.status === "REJECTED"
                                ? "destructive"
                                : application.application?.status ===
                                  "SHORTLISTED"
                                ? "shortlisted"
                                : "underConsideration"
                            }
                          >
                            {application.application?.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Link
                            to={`/employer/view-user-profile/${application.user.id}`}
                          >
                            <Button className="w-full bg-blue-900 hover:bg-blue-800">
                              View Profile
                            </Button>
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="w-full">
                                Change Status
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Change Application Status
                                </DialogTitle>
                                <DialogDescription>
                                  Update the status of {application.user.name}'s
                                  application
                                </DialogDescription>
                              </DialogHeader>
                              <Select
                                onValueChange={(value) =>
                                  setStatus((prev) => ({
                                    ...prev,
                                    applicationId: application.application.id,
                                    userId: application.user.id,
                                    status: value as ApplicationStatus,
                                  }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem
                                    value={ApplicationStatus.ACCEPTED}
                                  >
                                    Accepted
                                  </SelectItem>
                                  <SelectItem
                                    value={ApplicationStatus.SHORTLISTED}
                                  >
                                    Shortlisted
                                  </SelectItem>
                                  <SelectItem
                                    value={ApplicationStatus.REJECTED}
                                  >
                                    Rejected
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    type="submit"
                                    onClick={handleStatusSubmit}
                                  >
                                    Change Status
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerJobInfo;
//TODO->now the status change of application is working but the job status change not so see to that and also for both the toast is not working and again rerender not happening of the component so sudden ui change is not happening so see to that
