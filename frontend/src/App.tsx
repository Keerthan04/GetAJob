import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/authPages/AuthPage"
import Error from "./pages/Error"
import UserDashboard from "./pages/userPages/UserDashboard"
import EmployerDashboard from "./pages/employeerPages/EmployerDashboard"


const App = () => {
  return (
    <Routes>
      {/* Routes go here */}
      <Route path = "/auth/login" element = {<AuthPage/>} />
      <Route path = "/register/user" element = {<AuthPage/>} />
      <Route path = "/register/employer" element = {<AuthPage/>} />
      <Route path = "/users" element = {<UserDashboard/>} />
      <Route path = "/employer" element = {<EmployerDashboard/>} />
      <Route path = "*" element = {<Error/>} />
    </Routes>
  )
}

export default App
