import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react"; // Icon for a job-related feel
import { Link } from "react-router-dom";

export default function Error() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F6F9] dark:bg-[#002B5B] text-center">
      <Card className="max-w-lg bg-white dark:bg-[#001D3D] shadow-lg p-6">
        <CardHeader className="flex flex-col items-center">
          <Briefcase className="w-16 h-16 text-[#FFC107]" />
          <CardTitle className="text-3xl font-bold mt-3 text-[#333] dark:text-white">
            Oops! Job Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Looks like this job or page doesn’t exist. Maybe it's been removed
            or the link is incorrect.
          </p>
          <Button className="mt-6 bg-[#0044CC] hover:bg-[#003399] w-full text-lg">
            <Link to="/">Go to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

//TODO
//add a context like if login to automatically go to the dashboard of them and also if not then go to the login page
