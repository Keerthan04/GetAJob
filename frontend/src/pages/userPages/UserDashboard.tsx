import { UserDataContext } from "@/context/UserContext";
import { useContext } from "react"


const UserDashboard = () => {
  const {userData} = useContext(UserDataContext)!;
  console.log(userData);
  return (
    <div>
      Welcome to User Dashboard
    </div>
  )
}

export default UserDashboard
