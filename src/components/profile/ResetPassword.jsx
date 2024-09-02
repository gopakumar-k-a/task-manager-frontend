import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updatePassword } from "../../api/profile";
import ApiLoader from "../Loader/ApiLoader";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlePasswordToggle = (setter) => () => setter((prev) => !prev);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm new password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await updatePassword(values);

      if (res) {
        setIsOpen(false);
        toast.success("password updated successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
        type="button"
      >
        Change Password
      </button>

      {isOpen && (
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Reset Your Password
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Form Start */}
              <div className="p-4 md:p-5">
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    {/* Current Password */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        id="currentPassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="currentPassword"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Current Password
                      </label>
                      <span
                        onClick={handlePasswordToggle(setShowCurrentPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      >
                        {showCurrentPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                      <ErrorMessage
                        name="currentPassword"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* New Password */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="newPassword"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        New Password
                      </label>
                      <span
                        onClick={handlePasswordToggle(setShowNewPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      >
                        {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Confirm New Password */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type={showConfirmNewPassword ? "text" : "password"}
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="confirmNewPassword"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Confirm New Password
                      </label>
                      <span
                        onClick={handlePasswordToggle(
                          setShowConfirmNewPassword
                        )}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      >
                        {showConfirmNewPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                      <ErrorMessage
                        name="confirmNewPassword"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Update Password
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      {loading && <ApiLoader />}
    </>
  );
};

export default ResetPassword;
