import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../layout/NavBar";
import { Outlet } from "react-router-dom";
function PrivateRoute() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      {user ? (
        <>
          <NavBar />
          <Outlet />
        </>
      ) : null}
    </>
  );
}

export default PrivateRoute;
