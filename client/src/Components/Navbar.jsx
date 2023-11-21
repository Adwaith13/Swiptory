import React, { Fragment, useState } from "react";
import navbar from "./component-style/navbar.module.css";
import RegisterButton from "./RegisterButton";
import LoginButton from "./LoginButton";
import profile from "../assets/images/profile.png";
import bookmark from "../assets/logos/bookmark.svg";
import hamburger from "../assets/logos/hamburger.svg"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setRegister] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleRegistration = () => {
    setRegister(true);
  };

  const navigate = useNavigate()

  return (
    <div className={navbar.container}>
      <h1 className={navbar.heading}>SwipTory</h1>
      {isLoggedIn || isRegistered ? (
        <div className={navbar.buttons}>
          <button className={navbar.bookmark} onClick={()=>navigate("/bookmark")}>
            <img
              src={bookmark}
              alt="bookmark-icon"
              width={20}
              height={18}
              className={navbar.bookmarkicon}
            ></img>
            Bookmarks
          </button>
          <button className={navbar.addStory}>Add Story</button>
          <img src={profile} alt="profile-icon" className={navbar.profile}></img>
          <img src={hamburger} alt="hamburger" width={25} className={navbar.hamburger}></img>
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
