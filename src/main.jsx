import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { HashRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";
import VerifyOTP from "./Components/VerifyOTP";
import ChangePassword from "./Components/ChangePassword";
import ForgetPassword from "./Components/ForgetPassword";
import SignIn from "./Components/SignIn";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/forget_password" element={<ForgetPassword />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/verify_otp" element={<VerifyOTP />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
