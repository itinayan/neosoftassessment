import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { LOGIN } from "../../API/api";
import { useSelector, useDispatch } from "react-redux";
// import {addToCart} from '../../actions/actions';
import {
  createTask,
  stageUp,
  stageDown,
  login
} from "../../features/taskManagement/taskManagementSlice";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [captchaKey, setCaptchaKey] = useState(false);
  const storeData = useSelector((state) => state.taskManagement);
  const [loginToken, setLoginToken] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const validateCaptcha = (key) => {
    if (key !== undefined) setCaptchaKey(key);
  };

  const handleLogin = async (event) => {
    const userName = event.userName;
    const password = event.password;
    const loginData = {
      email: userName,
      password: password,
    };
    const methods = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        contentType: "application/json",
      },
    };
    fetch(LOGIN, methods)
      .then((response) => response.json())
      .then((responseData) => console.log(responseData))
      .catch((error) => console.log(error));
      dispatch(login(true))
  };
  useEffect(()=>{
    const redirectLogin=()=>{
      if(storeData.token !==null){
        navigate("/")
      }
    }
    redirectLogin();
  },[storeData])
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.registerContainer}>
          <h2>Login</h2>
          <div style={{ width: "100%" }}>
            <div className={styles.inputs}>
              <div>
                <label htmlFor="userName"> User Name : </label>
                {errors?.userName && (
                  <span className={styles.error}>User Name is required</span>
                )}
              </div>
              <input
                type="text"
                id="userName"
                placeholder="please enter your user name / email"
                {...register("userName", { required: true })}
              />
            </div>

            <div className={styles.inputs}>
              <div>
                <label htmlFor="password">Password :</label>{" "}
                {errors?.password && (
                  <span className={styles.error}>Password is required</span>
                )}
              </div>
              <input
                type="password"
                id="password"
                placeholder="please enter password"
                {...register("password", { required: true })}
              />
            </div>
          </div>
          <div style={{ display: "grid", placeContent: "center" }}>
            <ReCAPTCHA sitekey={SITE_KEY} onChange={validateCaptcha} />
          </div>
          <input type="submit" value="Login" disabled={!captchaKey} />
        <div style={{textAlign: 'center',width:"100%"}}>Don't have an account? <Link to="/register">Register now</Link></div>
        </div>
      </form>
    </div>
  );
};

export default Login;
