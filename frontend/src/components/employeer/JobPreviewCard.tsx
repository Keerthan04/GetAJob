import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react";

export function JobPreviewCard() {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900">
          Senior Frontend Developer
        </CardTitle>
        <p className="text-gray-600">Tech Corp</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4" />
            <span>Full-Time</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4" />
            <span>$120k - $150k</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Posted: {new Date().toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-gray-700">
            We are looking for a skilled Senior Frontend Developer to join our
            dynamic team at Tech Corp. In this role, you will be responsible for
            building and maintaining high-quality web applications that serve
            millions of users.
          </p>
          <div>
            <h4 className="font-semibold mb-2">Responsibilities:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Benefits:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Required Skills:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">CSS</Badge>
              <Badge variant="secondary">HTML</Badge>
              <Badge variant="secondary">Git</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
