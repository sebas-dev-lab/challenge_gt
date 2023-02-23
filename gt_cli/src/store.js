import { configureStore } from "@reduxjs/toolkit";
import taskReducers from "./modules/tasks/redux/reducers.tasks";

export default configureStore({
  reducer: {
    tasks: taskReducers,
  },
});
