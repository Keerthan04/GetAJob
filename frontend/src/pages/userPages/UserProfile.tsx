"use client";

import { DialogFooter } from "@/components/ui/dialog";

import type React from "react";
import { useContext, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserDataContext } from "@/context/UserContext";
import NavBar from "@/components/NavBar";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience: number;
  education?: string;
  resumeLink?: string;
  portfolio?: string;
  jobTitle?: string;
  jobType: string[];
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
];

const UserProfile = () => {
    const {userData} = useContext(UserDataContext)!;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    if(!userData) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [user, setUser] = useState<User>(userData as User);
    
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = () => {
    if (newSkill && !user.skills.includes(newSkill)) {
      setUser({ ...user, skills: [...user.skills, newSkill] });
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setUser({
      ...user,
      skills: user.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleJobTypeChange = (value: string) => {
    const updatedJobTypes = user.jobType.includes(value)
      ? user.jobType.filter((type) => type !== value)
      : [...user.jobType, value];
    setUser({ ...user, jobType: updatedJobTypes });
  };

  const handleAvailabilityChange = () => {
    setUser({ ...user, availability: !user.availability });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/user/update/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsDialogOpen(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred. Try again.");
    }
  };

  return (
    <>
    <NavBar pathname="/users"/>
    <div>
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-xl text-gray-600">
            {user.jobTitle || "No job title specified"}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-scroll ">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <Input
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
              <Input
                name="phone"
                value={user.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
              />
              <Input
                name="location"
                value={user.location || ""}
                onChange={handleChange}
                placeholder="Location"
                />
              <Input
                name="jobTitle"
                value={user.jobTitle || ""}
                onChange={handleChange}
                placeholder="Job Title"
                />
              <Input
                name="education"
                value={user.education || ""}
                onChange={handleChange}
                placeholder="Education"
                />
              <Input
                name="experience"
                value={user.experience}
                onChange={handleChange}
                placeholder="Years of Experience"
                type="number"
                />
              <Input
                name="resumeLink"
                value={user.resumeLink || ""}
                onChange={handleChange}
                placeholder="Resume Link"
                />
              <Input
                name="portfolio"
                value={user.portfolio || ""}
                onChange={handleChange}
                placeholder="Portfolio URL"
              />
              <div>
                <label className="text-sm font-medium">Skills</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    />
                  <Button type="button" onClick={handleSkillAdd}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                      <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleSkillRemove(skill)}
                      >
                      {skill} ✕
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Job Types</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {jobTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={
                        user.jobType.includes(type) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => handleJobTypeChange(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="availability"
                  checked={user.availability}
                  onCheckedChange={handleAvailabilityChange}
                />
                <label htmlFor="availability" className="text-sm font-medium">
                  Available for work
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleUpdate}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>{user.email}</span>
          </div>
          {user.phone && (
              <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>{user.phone}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{user.location}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            <span>{user.experience} years of experience</span>
          </div>
          {user.education && (
              <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-gray-500" />
              <span>{user.education}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Preferred Job Types</h3>
            <div className="flex flex-wrap gap-2">
              {user.jobType.map((type, index) => (
                <Badge key={index}>{type}</Badge>
            ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-500" />
            <span>
              {user.availability
                ? "Available for work"
                : "Not available for work"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {user.resumeLink && (
          <Button asChild variant="outline">
            <a href={user.resumeLink} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </Button>
        )}
        {user.portfolio && (
            <Button asChild variant="outline">
            <a href={user.portfolio} target="_blank" rel="noopener noreferrer">
              View Portfolio
            </a>
          </Button>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Profile created: {new Date(user.createdAt).toLocaleDateString()}</p>
        <p>Last updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default UserProfile;
