

import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "sonner";
import { Brain, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import ReactMarkdown from "react-markdown";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ProfileComponent() {
  const [user, setUser] = useState<User| null>(null);
  const [loading, setLoading] = useState(true);
  const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [AI_summary, setAI_summary] = useState<string>("");
    //TODO->if resume is updated then the changed in the backend and all and new thing we get but the old is only shown(the resume preview changes but the ai and all not so shd look into it(also old one delete and a dialog for confirmation))
  // Fetch user profile and, if exists, fetch the resume preview URL
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const fetchedUser = response.data.data.user;//data will have user details
        setAI_summary( response.data.data.AI_summary);
        setUser(fetchedUser);

        if (fetchedUser.resumeLink) {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/aws/get-presigned-url`,
            {
              params: { key: fetchedUser.resumeLink },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setResumePreviewUrl(res.data.data);//data will have url
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, []);

  // React Dropzone handler for file uploads
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setUploading(true);
    try {
      // Request a pre-signed URL for uploading the file
      const presignedRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/aws/generate-presigned-url`,
        {
          params: { fileName: file.name, fileType: file.type },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { url, key } = presignedRes.data.data;//data will have url and key

      // Upload the file directly to S3 using the pre-signed URL
      await axios.put(url, file, {
        headers: { "Content-Type": file.type },
      });

      // Retrieve the URL for viewing the uploaded resume
      const getUrlRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/aws/get-presigned-url`, {
        params: { key },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const previewUrl = getUrlRes.data.data;
      setResumePreviewUrl(previewUrl);

      //if updated then update the user resume link
      //TODO->if update and all the deleting of previous and all not done just a new key stored so shd look into it
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        { resumeLink: key },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const resumeLink = res.data.data.resumeLink;
      setAI_summary( res.data.data.AI_summary);//on update also get the AI_summary from the backend
      // Optionally update the user state with the new resume key
      setUser((prev) => (prev ? { ...prev, resumeLink: resumeLink } : prev));
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { "application/pdf": [".pdf"] },
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE,
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: User Details and Resume Upload */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-900">
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user && (
              <div className="space-y-4">
                <div>
                  <strong>Name:</strong> {user.name}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                {user.phone && (
                  <div>
                    <strong>Phone:</strong> {user.phone}
                  </div>
                )}
                {user.location && (
                  <div>
                    <strong>Location:</strong> {user.location}
                  </div>
                )}
                {user.skills && user.skills.length > 0 && (
                  <div>
                    <strong>Skills:</strong> {user.skills.join(", ")}
                  </div>
                )}
                <div>
                  <strong>Experience:</strong> {user.experience} years
                </div>
                {user.education && (
                  <div>
                    <strong>Education:</strong> {user.education}
                  </div>
                )}
                {user.jobTitle && (
                  <div>
                    <strong>Job Title:</strong> {user.jobTitle}
                  </div>
                )}
                {user.portfolio && (
                  <div>
                    <strong>Portfolio:</strong> {user.portfolio}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {user?.resumeLink ? "Update Resume" : "Upload Resume"}
              </h3>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the PDF here ...</p>
                ) : (
                  <p>
                    Drag &amp; drop your resume PDF here, or click to select a
                    file (Max 5MB)
                  </p>
                )}
                {fileRejections.length > 0 && (
                  <p className="text-red-500 mt-2">
                    File is too large or not a valid PDF.
                  </p>
                )}
              </div>
              {uploading && (
                <div className="mt-2 flex items-center">
                  <Loader2 className="animate-spin mr-2" />
                  <span>Uploading...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Resume Viewer */}
        <div className="flex flex-col items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-900">
                Your Resume Looks Like This
              </CardTitle>
            </CardHeader>
            <CardContent>
              {resumePreviewUrl ? (
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                    resumePreviewUrl
                  )}&embedded=true`}
                  className="w-full h-96"
                  title="Your Resume"
                />
              ) : (
                <div className="text-center text-gray-500">
                  Upload your resume to view it here.
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-full mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-900 flex gap-2">
                <Brain></Brain>AI Summary for your Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto">
                {AI_summary ? (
                  <ReactMarkdown>{AI_summary}</ReactMarkdown>
                ) : (
                  <div className="text-center text-gray-500">
                    AI Summary will be generated once you upload your resume.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
