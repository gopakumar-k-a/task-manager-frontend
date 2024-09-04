import React, { useState, useEffect } from "react";
import AddTaskDialogue from "./AddTaskDialogue";
import ClockCard from "../clock/ClockCard";
import TaskDetCard from "./TaskDetCard";
import useGetTasks from "../../hooks/useGetTasks";
import ApiLoader from "../Loader/ApiLoader";
import { deleteTask, editTask } from "../../api/task";
function MyTasksMain() {

  const { tasks, loading } = useGetTasks();
  const [editSubmitLoading, setEditSubmitLoading] = useState(false);
  const onUpdate = async (payload) => {
    try {
      setEditSubmitLoading(true);
      await editTask(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setEditSubmitLoading(false);
    }
  };

  const onDelete = async (payload) => {
    try {
      setEditSubmitLoading(true);
      await deleteTask(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setEditSubmitLoading(false);
    }
  };

  // const fetchAllTasks = async () => {
  //   const { tasks } = await getAllTasks();
  //   setTaskData(tasks);
  // };

  // useEffect(() => {
  //   fetchAllTasks();
  // }, []);
  return (
    <>
      <div>
  
        <div className="flex flex-col sm:flex-row justify-between  space-y-6 sm:space-y-0 sm:space-x-8 p-6">
          {/* Clock Card */}
          <ClockCard />

          {/* Add Task Dialogue */}
          <div>
            <AddTaskDialogue />
          </div>
        </div>

        <div>
          <div className="flex-col justify-center">
            {/* <TaskCard /> */}
            {tasks?.length > 0 ? (
              tasks.map((task) => (
                <TaskDetCard
                  data={task}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                  key={task._id}
                  editSubmitLoading={editSubmitLoading}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-600 text-lg font-semibold rounded-lg shadow-md">
                No tasks
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <ApiLoader />}
    </>
  );
}

export default MyTasksMain;
