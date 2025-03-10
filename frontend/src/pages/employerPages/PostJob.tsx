import { PostJobComponent } from "@/components/employeer/PostJobComponent";
import  EmployerNavbar  from "@/components/EmployerNavbar";
// import { EmployerDataContext } from "@/context/EmployeerContext";
// import { useContext } from "react";

const PostJob = () => {
    // const {employerData} = useContext(EmployerDataContext)!;
  return (
    <div>
      <EmployerNavbar pathname="/employer/post-job"  />
      <PostJobComponent />
    </div>
  );
}

export default PostJob
