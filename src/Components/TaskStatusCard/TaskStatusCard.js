import React, { useState } from "react";
import { useDrop } from "react-dnd";
import styles from "./TaskStatusCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
    createTask,
    stageUp,
    stageDown,
    deleteTask,
    changeStage,
  } from "../../features/taskManagement/taskManagementSlice";

const TaskStatusCard = ({setStage,noOfTasksInStage,statusNumber,title,id}) => {
    const tasksAdded = useSelector((state) => state.taskManagement);
    const data = tasksAdded;
    const [allTasks, setAllTasks] = useState([]);
    const dispatch = useDispatch();
    const [{isOver},dropRef] = useDrop(()=>({
        accept:"div",
        drop:(item)=> changeStatus(item.id,statusNumber),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
      }));

      const changeStatus = (id,statusNumber) =>{
          setStage(statusNumber)
        dispatch(changeStage({id:id,stage:statusNumber}))
      }
  return (
    <div
      className={styles.taskCountCard}
      onClick={() => setStage(statusNumber)}
      ref={dropRef}
      id={id}
    >
      <h3>{title}</h3>
      <span>{noOfTasksInStage(statusNumber)}</span>
    </div>
  );
};

export default TaskStatusCard;
