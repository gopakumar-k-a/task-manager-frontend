import { createSlice } from "@reduxjs/toolkit";
import { fetchTasksThunk } from "../thunk/taskThunk";
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setNewTask: (state, action) => {
      const { newTask } = action.payload;
      state.tasks = [newTask, ...state.tasks];
    },
    updateEditedTask: (state, action) => {
      const { updatedTask } = action.payload;
      if (state.tasks?.length > 0) {
        const taskIndex = state.tasks.findIndex(
          (task) => task._id === updatedTask._id
        );

        if (taskIndex !== -1) {
          state.tasks[taskIndex] = {
            ...state.tasks[taskIndex],
            ...updatedTask,
          };
        }
      }
    },
    deleteTaskById: (state, action) => {
      const { deletedTaskId } = action.payload;

      if (state.tasks.length > 0) {
        const deletedTaskIndex = state.tasks.findIndex(
          (task) => task._id == deletedTaskId
        );

        if (deletedTaskIndex != -1) {
          state.tasks.splice(deletedTaskIndex, 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setNewTask, updateEditedTask,deleteTaskById } = taskSlice.actions;

export default taskSlice.reducer;
