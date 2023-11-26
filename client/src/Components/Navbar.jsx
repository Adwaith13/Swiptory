import React, { Fragment, useEffect, useState } from "react";
import navbar from "./component-style/navbar.module.css";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";
import profile from "../assets/images/profile.png";
import bookmark from "../assets/logos/bookmark.svg";
import Popup from "./PopUp";
import AddStory from "./AddStory";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setRegister] = useState(false);

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken")
    const registerToken = localStorage.getItem("registerToken")
    const getUsernamefromLocalStorage = localStorage.getItem("username");
    if(loginToken || registerToken){
      if (getUsernamefromLocalStorage) {
        setLoggedIn(true);
        setRegister(true);
      }
    }
    else{
      setLoggedIn(false);
        setRegister(false);
    }
    
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegistration = () => {
    setLoggedIn(true);
    setRegister(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setRegister(false);
  };

  const navigate = useNavigate();

  return (
    <div className={navbar.container}>
      <h1 className={navbar.heading}>SwipTory</h1>
      {isLoggedIn || isRegistered ? (
        <div className={navbar.buttons}>
          <button
            className={navbar.bookmark}
            onClick={() => navigate("/bookmark")}
          >
            <img
              src={bookmark}
              alt="bookmark-icon"
              width={20}
              height={18}
              className={navbar.bookmarkicon}
            ></img>
            Bookmarks
          </button>
          <AddStory />
          <img
            src={profile}
            alt="profile-icon"
            className={navbar.profile}
          ></img>
          <Popup onLogout={handleLogout} />
        </div>
      ) : (
        <Fragment>
          <RegisterButton onRegister={handleRegistration}></RegisterButton>
          <LoginButton onLogin={handleLogin}></LoginButton>
        </Fragment>
      )}
    </div>
  );
}
