import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ApiLoader from "../Loader/ApiLoader";
import AddTaskButton from "./AddTaskButton";
import { FiPlusCircle } from "react-icons/fi";

// import { addTask } from "../../api/tasks";
import { addNewTask } from "../../api/task";
const AddTaskDialogue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("description is required "),
    status: Yup.string()
      .oneOf(["todo", "in-progress", "completed"], "Invalid status")
      .required("Status is required"),
    priority: Yup.string()
      .oneOf(["low", "medium", "high"], "Invalid priority")
      .required("Priority is required"),
    dueDate: Yup.date()
      .required("Due date is required")
      .test(
        "is-future-date",
        "Due date cannot be in the past",
        function (value) {
          if (!value) return true;

          // Check if the due date is today or in the future
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Reset today's time to midnight
          const selectedDate = new Date(value);

          return selectedDate >= today;
        }
      ),

    dueTime: Yup.string()
      .required("Due time is required")
      .test("is-future", "Due time cannot be in the past", function (value) {
        const { dueDate } = this.parent;
        if (!dueDate || !value) return true;

        // Use a more explicit date parsing method
        const [hours, minutes] = value.split(":").map(Number);
        const selectedDateTime = new Date(dueDate);
        selectedDateTime.setHours(hours, minutes, 0, 0);

        // Compare against the current time in the same timezone
        return selectedDateTime > new Date();
      }),
  });

  const handleSubmit = async (values) => {
    try {

      setLoading(true);
      //   const res = await addTask(values);
      const res = await addNewTask(values);
      if (res) {
        setIsOpen(false);
        toast.success("Task added successfully");
      }
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {/* <AddTaskButton onClick={()=>clicked()} />
        <button onClick={()=>clicked()}>click </button> */}
      <button
        onClick={openModal}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add new Task
        <FiPlusCircle className="h-5 w-5 ml-2" />
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
                  Add New Task
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
                    title: "",
                    description: "",
                    status: "todo",
                    priority: "medium",
                    dueDate: "",
                    dueTime: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    {/* Title */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="text"
                        name="title"
                        id="title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="title"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Task Title
                      </label>
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Description */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        as="textarea"
                        name="description"
                        id="description"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        rows="3"
                      />
                      <label
                        htmlFor="description"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Task Description
                      </label>
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Status */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        as="select"
                        name="status"
                        id="status"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </Field>
                      <label
                        htmlFor="status"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Task Status
                      </label>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Priority */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        as="select"
                        name="priority"
                        id="priority"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Field>
                      <label
                        htmlFor="priority"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Task Priority
                      </label>
                      <ErrorMessage
                        name="priority"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Due Date */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="dueDate"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Due Date
                      </label>
                      <ErrorMessage
                        name="dueDate"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Due Time */}
                    <div className="relative z-0 w-full mb-5 group">
                      <Field
                        type="time"
                        name="dueTime"
                        id="dueTime"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="dueTime"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Due Time
                      </label>
                      <ErrorMessage
                        name="dueTime"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add Task
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

export default AddTaskDialogue;
