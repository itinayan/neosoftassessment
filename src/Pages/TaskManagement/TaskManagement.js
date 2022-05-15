import React, { useEffect, useState,useId } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./TaskManagement.module.css";
import "./TaskManagement.module.css";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import {addToCart} from '../../actions/actions';
import {
  createTask,
  stageUp,
  stageDown,
  deleteTask,
} from "../../features/taskManagement/taskManagementSlice";
import TaskCard from "../../Components/TaskCard/TaskCard";
import TaskStatusCard from "../../Components/TaskStatusCard/TaskStatusCard";

const TaskManagement = () => {
  const [value, setValue] = useState(new Date());
  const [allTasks, setAllTasks] = useState([]);
  const [stage, setStage] = useState(0);
  const dispatch = useDispatch();
  const stages = ["Backlog", "To Do", "On Going", "Done"];
  const tasksAdded = useSelector((state) => state.taskManagement);
  const data = tasksAdded;
  console.log("Redux State Length: ", data?.tasks.length);
  console.log("Redux State : ", tasksAdded);

  const noOfTasksInStage = (number) => {
    const noOfTasks = data?.tasks?.filter(
      (task) => task?.stage === number
    )?.length;
    return noOfTasks;
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleAddTask = (event) => {
    let task = document.getElementById("taskname");
    let priority = document.getElementById("priority");
    console.log("Time: " + value.getHours());
    let newTask = {
      id: Date.now(),
      name: task.value.toLowerCase(),
      priority: priority.value,
      status: "pending",
      deadline: value.getTime(),
      stage: 0,
    };
    newTask !== undefined && dispatch(createTask(newTask));
  };
  const stageLevelUp = (id) => {
    dispatch(stageUp(id));
  };
  const stageLevelDown = (id) => {
    dispatch(stageDown(id));
  };
  const removeTask = (id) => {
    dispatch(deleteTask(id));
  };

  useEffect(() => {
    const filterTasks = (stage) => {
      const filteredTasks = data?.tasks?.filter(
        (task) => task?.stage === stage
      );
      setAllTasks((prevState) => {
        prevState = filteredTasks;
        return prevState;
      });
    };
    filterTasks(stage);
  }, [stage, tasksAdded?.tasks]);

  console.table("All Task Table",allTasks);

  // const dragging = () => {
  //   const elements = document.getElementsByClassName("draggable-container");
  //   // console.log(elements[0]);
  //   // for(let element in elements){
  //   elements[0].addEventListener("drag", (e) => {
  //     e.preventDefault();
  //     elements[0].classList.add("dragging");
  //   });
  //   // element.removeEventListener('dragend',()=>{

  //   // })
  // };

  return (
    <div>
      <NavBar />

      <div>
        <h2>TaskManagement</h2>
        <div>
          <div className={styles.cardContainer}>
            <TaskStatusCard
              setStage={setStage}
              noOfTasksInStage={noOfTasksInStage}
              statusNumber={0}
              title="Back Log"
              id="backlog"
            />
            <TaskStatusCard
              setStage={setStage}
              noOfTasksInStage={noOfTasksInStage}
              statusNumber={1}
              title="To DO"
              id="todo"
            />
            <TaskStatusCard
              setStage={setStage}
              noOfTasksInStage={noOfTasksInStage}
              statusNumber={2}
              title="On Going"
              id="ongoing"
            />
            <TaskStatusCard
              setStage={setStage}
              noOfTasksInStage={noOfTasksInStage}
              statusNumber={3}
              title="Done"
              id="done"
            />

            {/* <div
              className={styles.taskCountCard}
              onClick={() => setStage(1)}
              id="todo"
            >
              <h3>To DO</h3>
              <span>{noOfTasksInStage(1)}</span>
            </div>
            <div className={styles.taskCountCard} onClick={() => setStage(2)}>
              <h3>On Going</h3>
              <span>{noOfTasksInStage(2)}</span>
            </div>
            <div className={styles.taskCountCard} onClick={() => setStage(3)}>
              <h3>Done</h3>
              <span>{noOfTasksInStage(3)}</span>
            </div> */}
          </div>
          <div>
            <form
              onSubmit={handleSubmit(handleAddTask)}
              className={styles.formContainer}
            >
              <input
                type="text"
                id="taskname"
                placeholder="Please enter your task"
                required="true"
                style={{
                  maxWidth: "100%",
                  height: "60px",
                  padding: "20px",
                  margin: "20px",
                }}
              />
              <select
                id="priority"
                placeholder="priority"
                style={{
                  width: "200px",
                  height: "60px",
                  padding: "20px",
                  margin: "20px",
                }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={value}
                  className={styles.timePicker}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <input
                type="submit"
                value="Add Task"
                style={{
                  width: "200px",
                  height: "60px",
                  padding: "20px",
                  margin: "20px",
                }}
              />
            </form>
          </div>

          <div>
            <h3 className={styles.taskStage}>{stages[stage]} tasks</h3>
          </div>
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
                  removeTask={removeTask}
                  id={task.id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
