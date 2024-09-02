import React from "react";
import { useLocation } from "react-router-dom";
import WelcomeSlider from "../components/auth/WelcomSlider";
const Login = React.lazy(() => import("../components/auth/Login"));
const Register = React.lazy(() => import("../components/auth/Register"));
function AuthPage() {
  const location = useLocation();
  return (
    <>
      <div className="flex flex-col-reverse gap-4  sm:grid sm:grid-cols-2 sm:gap-2">
        <div className="col-span-1">
       <WelcomeSlider/>
        </div>
        <div className="col-span-1">
          {location.pathname == "/login" && <Login />}
          {location.pathname == "/sign-up" && <Register />}
        </div>
      </div>
    </>
  );
}

export default AuthPage;
