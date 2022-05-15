import React, { useState } from "react";
import styles from "./TaskCard.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  createTask,
  stageUp,
  stageDown,
  deleteTask,
  changeStage,
} from "../../features/taskManagement/taskManagementSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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
  const [forbidDrag, setForbidDrag] = useState(false);
  const tasksAdded = useSelector((state) => state.taskManagement);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState(id);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const dispatch = useDispatch();
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "div",
    drop: (item) => handleShowModal(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // const [{ isOver }, dropRef] = useDrop(() => ({
  //   accept: "div",
  //   drop: (item) => deleteItem(item.id),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));

  const handleShowModal = (id) => {
    // setTaskId(id);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const deleteItem = (id) => {
    setShowModal(false);
    dispatch(deleteTask(id));
  };
  return (
    <>
      {isDragging && (
        <div
          ref={dropRef}
          className={styles.deleteAreaStyle}
        >
          <h3>Drop the item here to delete it.</h3>
        </div>
      )}

      <div>
        <Dialog
          open={showModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Please Confirm Task Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to delete this task ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>NO</Button>
            <Button onClick={()=>deleteItem(id)} autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        style={{
          border: isDragging ? "2px solid green" : "0px",
          cursor: isDragging ? "move" : "default",
        }}
        ref={drag}
      >
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
    </>
  );
};

export default TaskCard;
