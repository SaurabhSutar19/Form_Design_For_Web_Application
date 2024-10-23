import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignUp from "./Components/SignUp"
import Profile from "./Components/Profile"
import VerifyOTP from "./Components/VerifyOTP"
import ChangePassword from "./Components/ChangePassword"
import ForgetPassword from "./Components/ForgetPassword"
import SignIn from "./Components/SignIn"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/sign_up", element: <SignUp></SignUp>  },
  { path: "/sign_in", element: <SignIn></SignIn> },
  { path: "/forget_password", element: <ForgetPassword></ForgetPassword>  },
  { path: "/change_password", element: <ChangePassword></ChangePassword>   },
  { path: "/verify_otp", element: <VerifyOTP></VerifyOTP>  },
  { path: "/profile", element: <Profile></Profile>  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
