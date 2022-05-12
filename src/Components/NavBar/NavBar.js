import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = (props) => {
  const [navMenu, setNavMenu] = useState(false);
  const location = useLocation();
  const navRef = useRef();
  const width = window.innerWidth;
  const addStyle = (element, style) => {
    for (const property in style) element.style[property] = style[property];
  };
  const toggleMenu = () => {
    const navElement = navRef.current;
    navElement.focus();
    !navMenu
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflowY = "auto");
    setNavMenu((prev) => {
      prev = !navMenu;
      return prev;
    });
    addStyle(
      navElement,
      !navMenu
        ? {
            transform: "translateX(0%)",
            transition: "all 0.5s",
            backdrop: true,
          }
        : { transform: "translateX(-100%)" }
    );
  };

  return (
    <div>
      {/* <nav className={styles.nav}>
        {location.pathname === "/" && <h3>Dashboard</h3>}
        {width < 769 && (
          <span className={styles.menuIcon}>
            {navMenu ? (
              <CloseIcon onClick={toggleMenu} />
            ) : (
              <MenuIcon onClick={toggleMenu} />
            )}
          </span>
        )}

        <div
          className={navMenu ? styles.backdrop : styles.ulContainer}
          onClick={width < 769 ? toggleMenu : {()=>{}} }
        >
          {location.pathname !== "/" && (
            <ul >
              <li>
                <Link to="/totaltasks" id="totaltasks">
                  Total Tasks
                </Link>
              </li>
              <li>
                <Link to="/completedtasks" id="completedtasks">
                  Completed Tasks
                </Link>
              </li>

              <li>
                <Link to="/pendingtasks" id="pendingtasks">
                  Pending Tasks
                </Link>
              </li>
              <li>
                <Link to="/taskmanagement" id="taskmanagement">
                  Task Management
                </Link>
              </li>
            </ul>
          )}
        </div>
        <span>User Name</span>
      </nav> */}
      <ul>
        <li>
          <Link to="/" id="home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/totaltasks" id="totaltasks">
            Total Tasks
          </Link>
        </li>
        <li>
          <Link to="/completedtasks" id="completedtasks">
            Completed Tasks
          </Link>
        </li>

        <li>
          <Link to="/pendingtasks" id="pendingtasks">
            Pending Tasks
          </Link>
        </li>
        <li>
          <Link to="/taskmanagement" id="taskmanagement">
            Task Management
          </Link>
        </li>
      </ul>
      <div>{props.children}</div>
    </div>
  );
};

export default NavBar;
