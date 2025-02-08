"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Timer,
  DollarSign,
  Bot,
  Globe,
  Users,
  Briefcase,
  Check,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type {Job, companyDetails } from "@/types";
import { ApplicationStatus } from "@/types";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";


interface JobDetailsProps {
  job: Job;
  isApplied: boolean;
  company: companyDetails;
  applicationStatus: ApplicationStatus | null;
}

export function JobDetails({ job, isApplied, company, applicationStatus }: JobDetailsProps) {
  const [showAiAnalysis, setShowAiAnalysis] = useState<boolean>(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);
  const [isAppliedState,setIsAppliedState] = useState<boolean>(isApplied);//since component rerender to show the changes we are using a state variable
  const [onapplyStatus, setApplicationStatus] = useState<ApplicationStatus | null>(applicationStatus);
  // const navigate = useNavigate();

  // Mock data for the enhanced job details
  const responsibilities = [
    "Lead and mentor a team of frontend developers",
    "Architect and implement scalable frontend solutions",
    "Collaborate with product and design teams",
    "Optimize application performance",
    "Write clean, maintainable code",
  ];

  const benefits = [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "Flexible work hours and remote options",
    "Professional development budget",
    "Regular team events and activities",
  ];

  const aiAnalysis = {
    overallMatch: 85,
    skillsMatch: 75,
    experienceMatch: 90,
    cultureFit: 85,
    skillGaps: ["GraphQL", "AWS", "System Design"],
    strengths: ["React", "TypeScript", "Team Leadership"],
  };
  const onApplyClick = async () => {
    const toastId = toast.loading("Submitting Application,Please Wait...");
    try {
      setIsApplyDialogOpen(false);
      console.log(localStorage.getItem("token"));
      //!IMP when a post request is sent the 2nd parameter in axios is data so goes as body to backend the object and the 3rd parameter is the headers but in get request the 2nd parameter is the headers(as in get we cant send body) and the 3rd parameter is the query params
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/jobs/${job.id}/apply`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(res.status === 200){
        toast.success("Application Submitted Successfully", { id: toastId });
        setApplicationStatus(res.data.data);
        setIsAppliedState(true);//so that rerender happens and the apply now button changes to applied(under consid and all)
      }
    } catch (error) {
      console.error("Error applying for job", error);
      toast.error("Failed to submit application", { id: toastId });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-2 border-blue-100">
            <CardHeader className="bg-blue-50">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {job.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{job?.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>{job?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer className="w-4 h-4 text-blue-600" />
                        <span>{job?.jobType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span>{job?.salaryRange}</span>
                      </div>
                    </div>
                  </CardDescription>
                </div>
                {isAppliedState && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Applied
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                About {company?.companyName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                {company?.logoUrl && (
                  <img
                    src={
                      company?.logoUrl || "../../assets/company_placeholder.png"
                    }
                    alt={company?.name}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-blue-100"
                  />
                )}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-blue-900">
                      {company?.companyName}
                    </h3>
                    {company?.verified && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {company?.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      {company?.companySize}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      {company?.industry}
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <a
                        href={company?.companyWebsite}
                        className="text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="prose max-w-none">
                <p className="text-muted-foreground">{company?.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-muted-foreground">{job?.description}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">
                  Key Responsibilities
                </h4>
                <ul className="grid gap-2">
                  {responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job?.skillsRequired.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-lg font-semibold mb-3">Benefits</h4>
                <ul className="grid gap-2">
                  {benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardContent className="pt-6">
                {isAppliedState ? (
                  <div className="space-y-4">
                    {onapplyStatus ===
                      ApplicationStatus.UNDER_CONSIDERATION && (
                      <>
                        <Button variant="outline" className="w-full" disabled>
                          <Check className="w-4 h-4 mr-2 text-yellow-600" />
                          Under Consideration
                        </Button>
                        <p>You have applied for this job</p>
                      </>
                    )}
                    {onapplyStatus === ApplicationStatus.ACCEPTED && (
                      <>
                        <Button variant="outline" className="w-full" disabled>
                          <Check className="w-4 h-4 mr-2 text-green-600" />
                          Accepted
                        </Button>
                        <p>
                          Congratulations! Your application has been accepted
                        </p>
                      </>
                    )}
                    {onapplyStatus === ApplicationStatus.REJECTED && (
                      <>
                        <Button variant="outline" className="w-full" disabled>
                          <X className="w-4 h-4 mr-2 text-red-600" />
                          Rejected
                        </Button>
                        <p>Sorry! Your application has been rejected</p>
                      </>
                    )}
                  </div>
                ) : (
                  <Dialog
                    open={isApplyDialogOpen}
                    onOpenChange={setIsApplyDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full bg-blue-900 hover:bg-blue-800">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply for {job?.title}</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to apply for this position at{" "}
                          {job?.company}?
                          <br></br><br></br>
                          Note: On applying, your application
                          will be submitted with your current profile and resume
                          details. If you want to make any changes, please
                          update your details on the{" "}
                          <Link to="/users/profile">
                            <span className="text-blue-600 underline">
                              Profile
                            </span>
                          </Link>{" "}
                          page before applying.
                          
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsApplyDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-blue-900 hover:bg-blue-800"
                          onClick={async () => {
                            await onApplyClick();
                          }}
                        >
                          Confirm Application
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                <Separator className="my-4" />

                <Dialog open={showAiAnalysis} onOpenChange={setShowAiAnalysis}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Bot className="mr-2 h-4 w-4" />
                      Check Your Job Fit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>AI Job Fit Analysis</DialogTitle>
                      <DialogDescription>
                        Here's how your profile matches with this role
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[60vh]">
                      <div className="space-y-6 p-4">
                        <div className="space-y-4">
                          <h4 className="font-semibold">Overall Match</h4>
                          <div className="flex items-center gap-4">
                            <Progress
                              value={aiAnalysis.overallMatch}
                              className="flex-1"
                            />
                            <span className="text-sm font-medium">
                              {aiAnalysis.overallMatch}%
                            </span>
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold mb-2">Skills Match</h4>
                            <Progress
                              value={aiAnalysis.skillsMatch}
                              className="mb-2"
                            />
                            <div className="mt-4">
                              <p className="text-sm font-medium mb-2">
                                Your Strengths:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {aiAnalysis.strengths.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="bg-green-100 text-green-800"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              Areas for Growth
                            </h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Consider developing these skills to increase your
                              match:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {aiAnalysis.skillGaps.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="secondary"
                                  className="bg-orange-100 text-orange-800"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold mb-2">
                              Experience Match
                            </h4>
                            <Progress
                              value={aiAnalysis.experienceMatch}
                              className="mb-2"
                            />
                            <p className="text-sm text-muted-foreground">
                              Your experience level aligns well with the role
                              requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Job Posted</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">2 days ago</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
