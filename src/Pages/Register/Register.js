import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Register.module.css";
import { REGISTER_USER, GET_USERS, GET_SINGLE_USER } from "../../API/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (event) => {
    const userData = {
      name: event.name,
      userName: event.userName,
      email: event.email,
      mobileNumber: event.mobileNumber,
      password: event.password,
    };
    const formData = new FormData();
    let userPic;
    let uploadData;
    if (event.profilePic !== undefined) {
      userPic = event.profilePic[0];
      formData.append("images", userPic, userPic.name);
      uploadData = {
        ...userData,
        profilePic: formData,
      };
    } else {
      uploadData = userData;
    }
    const methods = {
      method: "POST",
      body: JSON.stringify(uploadData),
      headers: {
        contentType: "application/json",
      },
    };
    fetch(REGISTER_USER, methods)
      .then((response) => response.json())
      .then((responseData) => console.log(responseData))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const getAllUsers = () => {
      fetch(GET_USERS)
        .then((response) => response.json())
        .then((responseData) => console.log(responseData));
    };
    getAllUsers();
  },[]);
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleRegister)} method="post">
        <div className={styles.registerContainer}>
          <h2>Register</h2>
          <div style={{ width: "100%" }}>
            <div className={styles.inputs}>
              <div>
                <label htmlFor="name_input">Name : </label>{" "}
                {errors?.name && (
                  <span className={styles.error}>Name is required</span>
                )}
              </div>
              <input
                type="text"
                id="name_input"
                placeholder="please enter your name"
                {...register("name", { required: true })}
              />
            </div>
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
                placeholder="please enter your user name"
                {...register("userName", { required: true })}
              />
            </div>
            <div className={styles.inputs}>
              <div>
                <label htmlFor="mobileNumber"> Mobile Number : </label>
                {errors?.mobileNumber && (
                  <span className={styles.error}>
                    Mobile Number is required
                  </span>
                )}
              </div>
              <input
                type="text"
                id="mobileNumber"
                placeholder="please enter your Mobile No"
                {...register("mobileNumber", { required: true })}
                pattern="[0-9]{10}"
                maxLength="10"
                title="Please Enter a Valid Mobile Number"
              />
            </div>
            <div className={styles.inputs}>
              <div>
                <label htmlFor="email">Email :</label>{" "}
                {errors?.email && (
                  <span className={styles.error}>Email is required</span>
                )}
              </div>
              <input
                type="email"
                id="email"
                placeholder="please enter your email id"
                {...register("email", { required: true })}
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
            <div className={styles.inputs}>
              <div>
                <label htmlFor="profilePic">Choose Profile Picture :</label>{" "}
                {errors?.profilePic && (
                  <span className={styles.error}>Something went wrong</span>
                )}
              </div>
              <input type="file" id="profilePic" {...register("profilePic")} />
            </div>
          </div>
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
