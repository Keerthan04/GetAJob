import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Application, Job, User } from "@/types";
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

const EmployerJobInfo = () => {
  const params = useParams<{ job_id: string }>();
  const jobId = params.job_id as string;
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
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
    status: string
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
        setApplications(
          applications.map((app) =>
            app.application.id === applicationId
              ? { ...app, application: res.data.data }
              : app
          )
        );
      }
    } catch (error) {
      console.error("Failed to change status:", error);
      toast.error("Failed to change status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <EmployerNavbar pathname="/employer/jobs" employer={employerData} />
      <div className="container mx-auto p-6">
        <Card className="mb-8 border-2 border-blue-100">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-2xl font-bold text-blue-900">
              {jobDetails?.title}
            </CardTitle>
            <CardDescription className="text-blue-700">
              Job Details
            </CardDescription>
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
                                ? "default"
                                : application.application?.status === "REJECTED"
                                ? "destructive"
                                : "secondary"
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
                                  handleStatusChange(
                                    application.application.id,
                                    application.user.id,
                                    value
                                  )
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ACCEPTED">
                                    Accepted
                                  </SelectItem>
                                  <SelectItem value="SHORTLISTED">
                                    Shortlisted
                                  </SelectItem>
                                  <SelectItem value="REJECTED">
                                    Rejected
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Close
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
//TODO-> now the status change is not form and all so some issues so make like select then click on done button then change the status
