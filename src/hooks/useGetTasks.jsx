import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksThunk } from "../redux/thunk/taskThunk";
function useGetTasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const error = useSelector((state) => state.task.error);

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  return { tasks, loading, error };
}

export default useGetTasks;
