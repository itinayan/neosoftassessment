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

const CompletedTasks = () => {
  const tasksAdded = useSelector((state) => state.taskManagement);
  const [allTasks, setAllTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterTasks = (stage) => {
      const filteredTasks = tasksAdded?.tasks?.filter(
        (task) => task?.stage === stage
      );
      setAllTasks((prevState) => {
        prevState = filteredTasks;
        return prevState;
      });
    };
    tasksAdded?.tasks?.length > 0 && filterTasks(3);
  }, [tasksAdded]);

  const stageLevelUp = (id) => {
    dispatch(stageUp(id));
  };
  const stageLevelDown = (id) => {
    dispatch(stageDown(id));
  };
  return (
    <div>
      <NavBar />
      <h2>CompletedTasks</h2>
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
    </div>
  );
};

export default CompletedTasks;
