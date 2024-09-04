import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTasks } from "../../api/task";
export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const { tasks } = await getAllTasks();
    return tasks;
  }
);
