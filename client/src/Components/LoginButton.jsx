import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import button from "./component-style/button.module.css";
import close from "../assets/logos/close.svg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "40vh",
    width: "30vw",
    borderRadius: "20px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function LoginButton() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Fragment>
      <button className={button.login} onClick={openModal}>
        Sign In
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img
          src={close}
          width={30}
          height={30}
          className={button.close}
          onClick={closeModal}
        ></img>
        <h1 className={button.loginHead}>Login to SwipTory</h1>
        <form>
          <div className={button.usernamelogin}>
            <label className={button.usernamelabel}> Username </label>
            <input
              className={button.usernameinput}
              placeholder="Enter your Username"
            ></input>
          </div>
          <br />
          <div className={button.passwordcontainerlogin}>
            <label className={button.passwordlabel}> Password </label>
            <input
              type="password"
              className={button.passwordinput}
              placeholder="Enter your Password"
            ></input>
          </div>
        </form>
        <br />
        <button className={button.loginbtn}>Login</button>
      </Modal>
    </Fragment>
  );
}
