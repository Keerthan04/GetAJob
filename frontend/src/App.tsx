import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/authPages/AuthPage"
import Error from "./pages/Error"
import UserDashboard from "./pages/userPages/UserDashboard"
import EmployerDashboard from "./pages/employeerPages/EmployerDashboard"
import { UserRegistration } from "./pages/authPages/UserRegistration"
import { EmployerRegistration } from "./pages/authPages/EmployerRegistration"
import ViewJob from "./pages/userPages/ViewJob"
import JobApplicationPage from "./pages/userPages/JobApplicationPage"
import ApplicationsPage from "./pages/userPages/ApplicationsPage"
import LandingPage from "./components/LandingPage"
import UserProfile from "./pages/userPages/userProfile"


const App = () => {
  return (
    <Routes>
      {/* Routes go here */}
      <Route path="/" element={<LandingPage/>} />
      <Route path="/auth/login" element={<AuthPage />} />
      <Route path="/auth/register/user" element={<UserRegistration />} />
      <Route
        path="/auth/register/employer"
        element={<EmployerRegistration />}
      />

      <Route path="/users/profile" element={<UserProfile/>} />
      <Route path="/users/jobs" element={<UserDashboard />} />
      <Route path="/users/jobs/:job_id" element={<ViewJob />} />
      <Route path="/users/jobs/:job_id/apply" element={<JobApplicationPage />} />
      <Route path = "/users/applications" element = {<ApplicationsPage/>}/>
      <Route path="/employer" element={<EmployerDashboard />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App
