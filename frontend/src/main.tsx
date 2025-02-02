import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.tsx'
import EmployeerContext from './context/EmployeerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <EmployeerContext>
    <UserContext>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>,
      </BrowserRouter>
    </UserContext>
  </EmployeerContext>
)
