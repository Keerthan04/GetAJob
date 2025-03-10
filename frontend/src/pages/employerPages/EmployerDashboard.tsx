// import { EmployerDataContext } from "@/context/EmployeerContext"
// import { useContext } from "react"
import EmployerNavbar from "@/components/EmployerNavbar"
import { Toaster } from "sonner";
import DashboardJobsComponent from "@/components/employeer/DashboardJobsComponent";
const EmployerDashboard = () => {
  // const { employerData } = useContext(EmployerDataContext)!;
  // console.log(employerData);
  return (
    <div>
      <EmployerNavbar pathname="/employer/jobs" />
      <Toaster richColors position="top-right" />
      <DashboardJobsComponent />
    </div>
  );
}

export default EmployerDashboard
