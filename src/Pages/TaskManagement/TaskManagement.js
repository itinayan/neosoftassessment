import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./TaskManagement.module.css";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
// import {addToCart} from '../../actions/actions';
import {
  createTask,
  stageUp,
  stageDown,
  deleteTask,
} from "../../features/taskManagement/taskManagementSlice";
import TaskCard from "../../Components/TaskCard/TaskCard";

const TaskManagement = () => {
  const [value, setValue] = useState(new Date());
  const [allTasks, setAllTasks] = useState([]);
  const [stage, setStage] = useState(0);
  const dispatch = useDispatch();
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
  }, [stage, tasksAdded]);

  return (
    <div>
      <NavBar />
      <div>
        <h2>TaskManagement</h2>
        <div>
          <div className={styles.cardContainer}>
            <div className={styles.taskCountCard} onClick={() => setStage(0)} >
              <h3>Back log</h3>
              <span>{noOfTasksInStage(0)}</span>
            </div>
            <div className={styles.taskCountCard} onClick={() => setStage(1)}>
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
            </div>
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
