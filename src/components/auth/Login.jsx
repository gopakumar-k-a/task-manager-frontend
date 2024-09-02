import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import ApiLoader from "../Loader/ApiLoader";
import { loginUserThunk } from "../../redux/thunk/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, user } = useSelector((state) => state.auth);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handlePasswordToggle = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const { email } = location.state || {};

  const handleSubmit = async (values) => {
    try {
      dispatch(loginUserThunk(values));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border p-6 rounded-lg border-gray-300">
        <div className="flex justify-center">
          <h2 className="text-4xl font-bold mb-4">Image Drive</h2>
        </div>
        <Formik
          initialValues={{
            email: email ? email : "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="max-w-sm mx-auto">
              <div className="flex justify-start">
                <h2 className="text-2xl font-bold mb-4">Log In</h2>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                <span
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="flex justify-end p-4">
                <h1>
                  Don't have an account?{" "}
                  <Link to={"/sign-up"}>
                    <span className="text-blue-600 font-medium underline cursor-pointer">
                      Register
                    </span>
                  </Link>
                </h1>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                sign in
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {isLoading && <ApiLoader />}
      {user && <p>user is logged in</p>}
    </>
  );
}

export default Login;
