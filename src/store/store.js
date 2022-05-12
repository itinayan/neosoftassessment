import { configureStore } from '@reduxjs/toolkit'
import taskManagementReducer from '../features/taskManagement/taskManagementSlice';
const store = configureStore({
    reducer: {
        taskManagement: taskManagementReducer,
    },
  })
export default store;