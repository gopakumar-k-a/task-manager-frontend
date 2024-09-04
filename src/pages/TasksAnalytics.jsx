import React from "react";
import TaskStatusChart from "../components/Tasks/taskAnalytics/TaskStatusChart";
import { useSelector } from "react-redux";
import TaskStatusMixed from "../components/Tasks/taskAnalytics/TaskStatusMixed";
import useGetTasks from "../hooks/useGetTasks";
function TasksAnalytics() {
  // const tasks = useSelector((state) => state.task.tasks);
  const {tasks}=useGetTasks()
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-600 text-lg font-semibold rounded-lg shadow-md">
        No tasks available to display.
      </div>
    );
  } else {
    return (
      <>
        <div className="max-w-md mx-auto mt-8">
          <h2 className="text-center text-xl font-semibold mb-4">
            Task Status
          </h2>
          <TaskStatusMixed />
          <TaskStatusChart />
        </div>
      </>
    );
  }
}

export default TasksAnalytics;
