import { PostJobComponent } from "@/components/employeer/postJobComponent";
import  EmployerNavbar  from "@/components/EmployerNavbar";
import { EmployerDataContext } from "@/context/EmployeerContext";
import { useContext } from "react";

const PostJob = () => {
    const {employerData} = useContext(EmployerDataContext)!;
  return (
    <div>
      <EmployerNavbar pathname="/employer/post-job" employer={employerData} />
      <PostJobComponent />
    </div>
  );
}

export default PostJob
