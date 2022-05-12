import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./TaskCard.module.css";

const TaskCard = ({
  name,
  stage,
  priority,
  deadline,
  index,
  id,
  stageLevelUp,
  stageLevelDown,
  removeTask,
}) => {
  return (
    <div>
      <div className={styles.taskCard}>
        <span>{index + 1}</span>
        <span>{name}</span>
        <span>{priority}</span>
        <span>{deadline}</span>
        <span>{stage}</span>
        {stage > 0 && (
          <button onClick={() => stageLevelDown(id)}>Stage Down</button>
        )}
        {stage < 3 && (
          <button onClick={() => stageLevelUp(id)}>Stage Up</button>
        )}
        <button>Edit</button>
        <button onClick={() => removeTask(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
