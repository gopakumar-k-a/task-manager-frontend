import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ImExit } from "react-icons/im";
// import { FaImages } from "react-icons/fa";
import { SiTodoist } from "react-icons/si";
import { logout } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="lg:px-16 px-6 rounded-lg bg-white shadow-md flex flex-wrap items-center lg:py-0 py-2 mb-12">
        <div className="flex-1 flex justify-between items-center">
          <Link to={"/"} className="flex text-lg font-semibold">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{
                repeat: Infinity,
                repeatDelay: 2000,
                stiffness: 200,
                damping: 10,
                duration: 0.5,
                delay: 0.5,
              }}
              className="flex text-blue-600"
            >
              <SiTodoist className="w-6 h-6 mt-3 mr-2 mb-3" />
              <div className="mt-3 mb-3 font-bold text-xl">Task Manager</div>
            </motion.div>
          </Link>
        </div>
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer lg:hidden block"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title className="font-bold">menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div
          className={`lg:flex lg:items-center lg:w-auto w-full ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="menu"
        >
          <motion.nav
            initial={{ x: -30 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0">
              <li className="py-2 lg:py-0">
                <Link
                  to="/"
                  className={`${
                    isActive("/")
                      ? "bg-gray-200 rounded-lg"
                      : "hover:bg-gray-200 hover:rounded-lg"
                  } text-black px-3 py-2 font-bold`}
                >
                  Home
                </Link>
              </li>
              <li className="py-2 lg:py-0">
                <Link
                  to="/my-tasks"
                  className={`${
                    isActive("/my-tasks")
                      ? "bg-gray-200 rounded-lg"
                      : "hover:bg-gray-200 hover:rounded-lg"
                  } text-black px-3 py-2 font-bold`}
                >
                  My Tasks
                </Link>
              </li>
              <li className="py-2 lg:py-0">
                <Link
                  to="/tasks-analytics"
                  className={`${
                    isActive("/tasks-analytics")
                      ? "bg-gray-200 rounded-lg"
                      : "hover:bg-gray-200 hover:rounded-lg"
                  } text-black px-3 py-2 font-bold`}
                >
                  Tasks Analytics
                </Link>
              </li>
             
              <li
                className="py-2 lg:py-0 text-red-600 flex items-center justify-center"
                onClick={() => dispatch(logout())}
              >
                <ImExit className="hover:bg-gray-200 h-6 w-6" />
                <span className="lg:hidden ml-2">log out</span>{" "}
              </li>
            </ul>
          </motion.nav>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
