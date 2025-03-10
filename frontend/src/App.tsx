import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/authPages/AuthPage"
import Error from "./pages/Error"
import UserDashboard from "./pages/userPages/UserDashboard"
import EmployerDashboard from "./pages/employerPages/EmployerDashboard"
import { UserRegistration } from "./pages/authPages/UserRegistration"
import { EmployerRegistration } from "./pages/authPages/EmployerRegistration"
import ViewJob from "./pages/userPages/ViewJob"
import JobApplicationPage from "./pages/userPages/JobApplicationPage"
import ApplicationsPage from "./pages/userPages/ApplicationsPage"
import LandingPage from "./components/LandingPage"
import UserProfile from "./pages/userPages/UserProfile"
import EmployerJobInfo from "./pages/employerPages/EmployerJobInfo"
import PostJob from "./pages/employerPages/PostJob"
import UserProtectedWrapper from "./components/middleware/UserProtectedWrapper"
import EmployerProtectedWrapper from "./components/middleware/EmployerProtectedWrapper"

const App = () => {
  return (
    <Routes>
      {/* Routes go here */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<AuthPage />} />
      <Route path="/auth/register/user" element={<UserRegistration />} />
      <Route
        path="/auth/register/employer"
        element={<EmployerRegistration />}
      />

      {/* User Routes */}
      <Route path="/users/profile" element={
        <UserProtectedWrapper>
          <UserProfile />
        </UserProtectedWrapper>} />

      <Route path="/users/jobs" element={
        <UserProtectedWrapper>
          <UserDashboard />
        </UserProtectedWrapper>
        } />
      <Route path="/users/jobs/:job_id" element={
        <UserProtectedWrapper>
          <ViewJob />
        </UserProtectedWrapper>
        } />
      <Route
        path="/users/jobs/:job_id/apply"
        element={
          <UserProtectedWrapper>
        <JobApplicationPage />
        </UserProtectedWrapper>}
      />
      <Route path="/users/applications" element={
        <UserProtectedWrapper>
          <ApplicationsPage />
        </UserProtectedWrapper>}/>

      {/* Employer Routes */}
      <Route path="/employer/jobs" element={
        <EmployerProtectedWrapper>
          <EmployerDashboard />
        </EmployerProtectedWrapper>
        } />
      <Route path="/employer/jobs/:job_id" element={
        <EmployerProtectedWrapper>
          <EmployerJobInfo />
        </EmployerProtectedWrapper>
        } />
      <Route path="/employer/post-job" element={
        <EmployerProtectedWrapper>
          <PostJob />
        </EmployerProtectedWrapper>
        } />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App
