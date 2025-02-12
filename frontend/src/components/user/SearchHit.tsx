//this is the component which shows each job in the search results

import { JobType } from "@/types";
import { useNavigate } from "react-router-dom";

import { Hit } from "instantsearch.js"; // Import Algolia's Hit type
import { Building2, MapPin, Timer } from "lucide-react";


type JobHitProps = Hit<{
  title: string;
  description: string;
  location: string;
  company: string;
  salaryRange: string;
  id: string;
  jobType: JobType;
}>;
const SearchHit = ({ hit }: {hit: JobHitProps}) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm bg-white hover:shadow-md transition-all">
      {/* Left Section: Job Info */}
      <div className="flex-grow m-2">
        <h3 className="font-semibold text-lg">
          {hit.title.length > 30 ? `${hit.title.slice(0, 30)}...` : hit.title}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          {hit.description.length > 100
            ? `${hit.description.slice(0, 100)}...`
            : hit.description}
        </p>
        <div className="flex items-center text-sm text-gray-500 mt-2 space-x-3">
          <span className="flex items-center">
            <MapPin className="w-4 h-4" />{" "}
            <span className="ml-1">{hit.location}</span>
          </span>
          <span className="flex items-center">
            <Building2 className="w-4 h-4" />
            <span className="ml-1">{hit.company}</span>
          </span>
          <span className="flex items-center">
            <span className="ml-1">{hit.salaryRange}</span>
          </span>
          <span className="flex items-center">
            <Timer className="w-4 h-4" />
            <span className="ml-1">{hit.jobType}</span>
          </span>
        </div>
      </div>

      {/* Right Section: View More Button */}
      <button
        className="ml-4 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-md  transition-all"
        onClick={() => navigate(`/users/jobs/${hit.id}`)}
      >
        View More
      </button>
    </div>
  );
};

export default SearchHit;