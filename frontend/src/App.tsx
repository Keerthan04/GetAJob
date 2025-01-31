import { Route, Routes } from "react-router-dom"
import AuthPage from "./pages/authPages/AuthPage"
import Error from "./pages/Error"


const App = () => {
  return (
    <Routes>
      {/* Routes go here */}
      <Route path = "/auth/login" element = {<AuthPage/>} />
      <Route path = "/register/user" element = {<AuthPage/>} />
      <Route path = "/register/employeer" element = {<AuthPage/>} />
      <Route path = "*" element = {<Error/>} />
    </Routes>
  )
}

export default App
