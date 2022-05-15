import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompletedTasks from "./Pages/CompletedTasks/CompletedTasks";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import PendingTasks from "./Pages/PendingTasks/PendingTasks";
import Register from "./Pages/Register/Register";
import TaskManagement from "./Pages/TaskManagement/TaskManagement";
import TotalTasks from "./Pages/TotalTasks/TotalTasks";
import store from "./store/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
    <Provider store={store}>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/taskmanagement"  element={<TaskManagement />} />
          <Route path="/totaltasks"  element={<TotalTasks />} />
          <Route path="/completedtasks"  element={<CompletedTasks />} />
          <Route path="/pendingtasks"  element={<PendingTasks />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/login"  element={<Login />} />
        </Routes>
      </Router>
    </Provider>
    </DndProvider>
  );
};

export default App;
