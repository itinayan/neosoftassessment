import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, } from "react-router-dom";
// import {addToCart} from '../../actions/actions';
import {
  createTask,
  stageUp,
  stageDown,
} from "../../features/taskManagement/taskManagementSlice";
import TaskCard from "../../Components/TaskCard/TaskCard";
import styles from "./Home.module.css";

const Home = () => {
  const tasksAdded = useSelector((state) => state.taskManagement);
  const [allTasks, setAllTasks] = useState({
    allTasks:[],
    pendingTasks:[],
    completedTasks:[],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const getAllTasks = () => {
      setAllTasks((prevState) => {
        prevState.allTasks = tasksAdded?.tasks;
        return {...prevState};
      });
    };
    const completedTasks = () => {
     let completedTasks = tasksAdded?.tasks?.filter((task) => {
        if (task?.status === "completed") return task;
      });
      setAllTasks((prevState) => {
        prevState.completedTasks = completedTasks;
        return prevState;
      });
    };
    const pendingTasks = () => {
     let pendingTasks = tasksAdded?.tasks?.filter((task) => {
        if (task?.status === "pending") return task;
      });
      setAllTasks((prevState) => {
        prevState.pendingTasks = pendingTasks;
        return prevState;
      });
    };
    getAllTasks();
    completedTasks();
    pendingTasks();
    
    console.log("Completed Tasks", completedTasks);
  }, [tasksAdded]);
  useEffect(()=>{
    const redirectLogin=()=>{
      if(tasksAdded.token ==null){
        navigate("/login")
      }
    }
    redirectLogin();
  },[])

  // const Home = () => {
  return (
    <div>
      <NavBar>
        {tasksAdded.token !==null &&(<div className={styles.cardContainer}>
          <div className={styles.taskCountCard}>
            <h3>Total Tasks</h3>
            <span>{allTasks?.allTasks?.length}</span>
          </div>
          <div className={styles.taskCountCard}>
            <h3>Completed Tasks</h3>
            <span>{allTasks?.completedTasks?.length}</span>
          </div>
          <div className={styles.taskCountCard}>
            <h3>Pending Tasks</h3>
            <span>{allTasks?.pendingTasks?.length}</span>
          </div>
        </div>)}
      </NavBar>
    </div>
  );
};

export default Home;
