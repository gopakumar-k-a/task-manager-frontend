import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { useSelector } from "react-redux";
import ApiLoader from "../Loader/ApiLoader";

const TaskDetCard = ({ data, onUpdate, onDelete, editSubmitLoading }) => {
  const { _id: myId } = useSelector((state) => state.auth.user.credentials);

  const {
    _id,
    title,
    description,
    status,
    priority,
    dueDateTime,
    createdAt,
    updatedAt,
    updatedBy,
    createdBy,
  } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    status: status || "todo",
    priority: priority || "medium",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const currentDateTime = new Date();
  const dueDate = new Date(dueDateTime);
  const isDueFuture = dueDate > currentDateTime;
  const isOwner = createdBy._id === myId;

  const validate = () => {
    const newErrors = {};
    if (isOwner) {
      if (!formData.title) newErrors.title = "Title is required";
      if (!formData.description)
        newErrors.description = "Description is required";
    }
    if (!formData.status) newErrors.status = "Status is required";
    if (isOwner && !formData.priority)
      newErrors.priority = "Priority is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (touched[name]) {
      validate();
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validate();
  };

  const handleEditedSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onUpdate({ ...formData, _id });
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="min-w-full flex justify-center mb-4">
        <div className="card w-full sm:w-8/12 p-4 cursor-pointer rounded-lg bg-gray-100 shadow-lg relative">
          {isOwner && (
            <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
              My added Task
            </span>
          )}
          {/* Title */}
          <h3 className="card__title text-lg font-bold">{title}</h3>
          {/* Description */}
          <p className="card__content break-words text-sm text-gray-600 mt-2">
            {description}
          </p>
          {/* Status */}
          <div className="flex-col sm:flex-row flex gap-6 mt-2">
            <div className="flex gap-8 justify-start">
              <div className="text-ls font-semibold text-gray-500">Status</div>
              <div
                className={`text-ls font-semibold capitalize ${
                  status === "completed"
                    ? "bg-green-100 text-green-600"
                    : status === "in-progress"
                    ? "bg-yellow-100 text-yellow-600"
                    : status === "to-do"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                } p-1 rounded-md`}
              >
                {status}
              </div>
            </div>

            <div className="sm:block hidden">|</div>

            {/* Priority */}
            <div className="flex gap-8 justify-start">
              <div className="text-ls font-semibold text-gray-500">
                Priority
              </div>
              <div
                className={`text-ls font-semibold capitalize ${
                  priority === "low"
                    ? "bg-green-100 text-green-600"
                    : priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : priority === "high"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                } p-1 rounded-md`}
              >
                {priority}
              </div>
            </div>
          </div>
          {/* Created By */}
          <div className="border-t border-b border-gray-300 py-4 mt-4">
            <div className="flex gap-8 justify-start">
              <div className="text-ls font-semibold text-gray-500">
                Created By
              </div>
              <div className="text-black font-semibold">{createdBy.email}</div>
            </div>
            <div className="flex gap-8 justify-start mt-2">
              <div className="text-ls font-semibold text-gray-500">
                Created At
              </div>
              <div className="text-black font-semibold">
                {format(new Date(createdAt), "MMMM dd, yyyy hh:mm a")}
              </div>
            </div>
          </div>
          {/* Updated By */}
          {updatedBy && (
            <div className="border-b border-gray-300 py-4">
              <div className="flex gap-8 justify-start">
                <div className="text-ls font-semibold text-gray-500">
                  Updated By
                </div>
                <div className="text-black font-semibold">
                  {updatedBy.email}
                </div>
              </div>
              <div className="text-ls font-semibold text-gray-500 mt-1">
                Updated At:
                <span className="text-ls font-semibold text-black">
                  {" "}
                  {format(new Date(updatedAt), "MMMM dd, yyyy hh:mm a")}
                </span>
              </div>
            </div>
          )}
          {/* Due Date */}
          <div
            className={`text-ls font-semibold text-gray-500 mt-1 p-2 rounded ${
              isDueFuture ? "bg-green-200" : "bg-red-200"
            }`}
          >
            Due Time{" "}
            <span className="text-ls font-semibold text-black">
              {format(new Date(dueDateTime), "MMMM dd, yyyy hh:mm a")}
            </span>
          </div>
          {/* Edit Button */}
          <div className="flex justify-start gap-4">
            <EditButton onClick={() => setIsModalOpen(true)} />
            {isOwner && <DeleteButton onDelete={onDelete} _id={_id} />}
          </div>
          {/* Modal */}
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="z-10 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
            >
              <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-1/2">
                <h3 className="text-lg font-bold mb-4">Edit Task</h3>
                <form onSubmit={handleEditedSubmit}>
                  {/* Title Field */}
                  {isOwner && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      {errors.title && touched.title && (
                        <div className="text-red-600 text-sm">
                          {errors.title}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description Field */}
                  {isOwner && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                        rows="3"
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-600 text-sm">
                          {errors.description}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="todo">To-Do</option>
                      <option value="in-progress">In-Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    {errors.status && touched.status && (
                      <div className="text-red-600 text-sm">
                        {errors.status}
                      </div>
                    )}
                  </div>

                  {/* Priority Field */}
                  {isOwner && (
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Priority
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                      {errors.priority && touched.priority && (
                        <div className="text-red-600 text-sm">
                          {errors.priority}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Permission Badge */}
                  {!isOwner && (
                    <div className="bg-yellow-200 text-yellow-800 p-2 rounded mb-4">
                      You are not the owner of this task. You can only edit the
                      status.
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {editSubmitLoading && <ApiLoader />}
    </>
  );
};

export default TaskDetCard;
