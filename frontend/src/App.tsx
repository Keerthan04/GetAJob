import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/authPages/AuthPage"
import Error from "./pages/Error"
import UserDashboard from "./pages/userPages/UserDashboard"
import EmployerDashboard from "./pages/employeerPages/EmployerDashboard"
import { UserRegistration } from "./pages/authPages/UserRegistration"
import { EmployerRegistration } from "./pages/authPages/EmployerRegistration"
import ViewJob from "./pages/userPages/ViewJob"


const App = () => {
  return (
    <Routes>
      {/* Routes go here */}
      <Route path="/auth/login" element={<AuthPage />} />
      <Route path="/auth/register/user" element={<UserRegistration />} />
      <Route
        path="/auth/register/employer"
        element={<EmployerRegistration />}
      />
      <Route path="/users" element={<UserDashboard />} />
      <Route path="/users/jobs/:job_id" element={<ViewJob />} />
      <Route path="/employer" element={<EmployerDashboard />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App
