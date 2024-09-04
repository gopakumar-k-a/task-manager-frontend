import React, { useState } from "react";

const TaskCard = () => {
  const [taskTitle, setTaskTitle] = useState("Design a new landing page");
  const [assignee, setAssignee] = useState("Sarah Brown");
  const [taskStatus, setTaskStatus] = useState("in-progress");
  const [taskDate, setTaskDate] = useState("");
  const [modal, setModal] = useState("");

  // Assignees list
  const assignees = [
    { name: "Sarah Brown", src: "https://source.unsplash.com/IF9TK5Uy-KI" },
    { name: "Serena Wang", src: "https://source.unsplash.com/2crxTr4jCkc" },
    { name: "James Wilson", src: "https://source.unsplash.com/5n3JP9WAJTs" },
    { name: "Damian Taylor", src: "https://source.unsplash.com/ICZWButbZx4" },
  ];

  // Status list
  const statusOptions = ["completed", "in-progress", "suspended", "delayed"];

  const toggleModal = (modalName) => {
    setModal(modal === modalName ? "" : modalName);
  };

  const saveTaskTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const saveAssignee = (e) => {
    const selectedAssignee = assignees.find(
      (assignee) => assignee.name === e.target.value
    );
    setAssignee(selectedAssignee.name);
  };

  const saveStatus = (e) => {
    setTaskStatus(e.target.value);
  };

  const saveDate = (e) => {
    setTaskDate(e.target.value);
  };

  return (
    <div className="container mx-auto max-w-sm px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-xl font-semibold text-blue-500 text-center mb-4">
          {taskTitle}
        </h1>
        <div className="flex justify-between bg-blue-500 p-4 rounded-md">
          {/* <div className="flex flex-col items-center bg-white p-4 rounded-md">
            <img
              src={assignees.find((a) => a.name === assignee)?.src}
              alt={assignee}
              className="w-12 h-12 rounded-full mb-2"
            />
            <div className="text-sm font-medium">{assignee}</div>
            <div className="text-xs text-gray-500">Assignee</div>
          </div> */}
          <div className="flex-col  items-center bg-white w-full rounded-md">
            <div className="flex gap-4 justify-between">
              <div className="text-xs text-gray-500">Status</div>
              <div
                className={`text-sm font-medium capitalize ${
                  taskStatus === "completed"
                    ? "bg-green-100 text-green-600"
                    : taskStatus === "in-progress"
                    ? "bg-yellow-100 text-yellow-600"
                    : taskStatus === "suspended"
                    ? "bg-red-100 text-red-600"
                    : "bg-orange-100 text-orange-600"
                } p-1 rounded-md`}
              >
                {taskStatus}
              </div>
            </div>
            <div className="flex gap-4 justify-around">
              <div className="text-sm font-medium">
                {taskDate || "No Date Set"}
              </div>
              <div className="text-xs text-gray-500">Start Date</div>
            </div>
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <button
            onClick={() => toggleModal("title")}
            className="text-blue-500"
          >
            Edit Title
          </button>
          <button
            onClick={() => toggleModal("assignee")}
            className="text-blue-500"
          >
            Change Assignee
          </button>
          <button
            onClick={() => toggleModal("status")}
            className="text-blue-500"
          >
            Change Status
          </button>
          <button onClick={() => toggleModal("date")} className="text-blue-500">
            Set Date
          </button>
        </div>
      </div>

      {/* Modals */}
      {modal === "title" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Task Title</h2>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => toggleModal("")} className="text-gray-500">
                Cancel
              </button>
              <button onClick={() => toggleModal("")} className="text-blue-500">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "assignee" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Change Assignee</h2>
            <select
              onChange={saveAssignee}
              value={assignee}
              className="border border-gray-300 rounded px-3 py-1 mb-4 w-full"
            >
              {assignees.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => toggleModal("")} className="text-gray-500">
                Cancel
              </button>
              <button onClick={() => toggleModal("")} className="text-blue-500">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "status" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Change Status</h2>
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={status}
                  name="status"
                  value={status}
                  checked={taskStatus === status}
                  onChange={saveStatus}
                  className="mr-2"
                />
                <label htmlFor={status} className="capitalize">
                  {status}
                </label>
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button onClick={() => toggleModal("")} className="text-gray-500">
                Cancel
              </button>
              <button onClick={() => toggleModal("")} className="text-blue-500">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "date" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Set Task Date</h2>
            <input
              type="date"
              value={taskDate}
              onChange={saveDate}
              className="border border-gray-300 rounded px-3 py-1 mb-4 w-full"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => toggleModal("")} className="text-gray-500">
                Cancel
              </button>
              <button onClick={() => toggleModal("")} className="text-blue-500">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
