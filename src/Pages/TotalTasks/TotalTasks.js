import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
// import {addToCart} from '../../actions/actions';
import {
  createTask,
  stageUp,
  stageDown,
} from "../../features/taskManagement/taskManagementSlice";
import TaskCard from "../../Components/TaskCard/TaskCard";

const TotalTasks = () => {
  const tasksAdded = useSelector((state) => state.taskManagement);
  const [allTasks, setAllTasks] = useState([]);
  const dispatch = useDispatch();

  const stageLevelUp = (id) => {
    dispatch(stageUp(id));
  };
  const stageLevelDown = (id) => {
    dispatch(stageDown(id));
  };

  useEffect(() => {
    const getAllTasks = () => {
      setAllTasks((prevState) => {
        prevState = tasksAdded?.tasks;
        return prevState;
      });
    };
    tasksAdded?.tasks?.length > 0 && getAllTasks();
  }, [tasksAdded]);
  return (
    <div>
      <NavBar>
        <h2>TotalTasks</h2>
        <div>
          {allTasks?.length > 0 &&
            allTasks?.map((task, index) => {
              return (
                <TaskCard
                  name={task.name}
                  priority={task.priority}
                  stage={task.stage}
                  deadline={task.deadline}
                  index={index}
                  stageLevelUp={stageLevelUp}
                  stageLevelDown={stageLevelDown}
                  id={task.id}
                />
              );
            })}
        </div>
      </NavBar>
    </div>
  );
};

export default TotalTasks;
