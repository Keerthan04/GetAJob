import { EmployerDataContext } from "@/context/EmployeerContext"
import { useContext } from "react"


const EmployeerDashboard = () => {
  const { employerData } = useContext(EmployerDataContext)!;
  console.log(employerData);
  return (
    <div>
      Welcome to Employeer Dashboard
    </div>
  )
}

export default EmployeerDashboard
