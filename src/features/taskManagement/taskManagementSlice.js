import { taskManagement, taskStageUp } from "../../reducers/reducers";
import { createSlice } from "@reduxjs/toolkit";

export const taskManagementSlice = createSlice({
  name: "taskManagement",
  initialState: { tasks: [], token: null },
  reducers: {
    createTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    stageUp: (state, action) => {
      const allTasks = state.tasks;
      const updated = allTasks.map((task) => {
        if (task.id === action.payload) {
          if (task.stage === 2)
            return { ...task, stage: task.stage + 1, status: "completed" };
          return { ...task, stage: task.stage + 1 };
        }
        return task;
      });
      state.tasks = updated;
    },
    stageDown: (state, action) => {
      const allTasks = state.tasks;
      const updated = allTasks.map((task) => {
        if (task.id === action.payload)
          return { ...task, stage: task.stage - 1 };
        return task;
      });
      state.tasks = updated;
    },
    changeStage: (state, action) => {
      const allTasks = state.tasks;
      const updated = allTasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, stage: action.payload.stage };
        } else return task;
      });
      state.tasks = updated;
    },
    deleteTask: (state, action) => {
      const allTasks = state.tasks;
      const updated = allTasks.filter((task) => {
        return task.id !== action.payload;
      });
      state.tasks = updated;
    },
    login: (state, action) => {
      const stateValue = state;
      stateValue.token = action.payload;
      // const updated = allTasks.filter((task) => {
      //   return task.id !== action.payload;
      // });
      state = stateValue;
    },
  },
});

export const {
  createTask,
  stageUp,
  stageDown,
  changeStage,
  deleteTask,
  login,
} = taskManagementSlice.actions;

export default taskManagementSlice.reducer;
