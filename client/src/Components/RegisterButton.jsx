import React,{ Fragment, useState } from "react";
import Modal from "react-modal";
import button from "./component-style/button.module.css";
import close from "../assets/logos/close.svg";
import { registerUser } from "../api/register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastStyles from "../Components/component-style/toast.module.css";
import Toast from "../Components/Toast";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "43vh",
    width: "35vw",
    borderRadius: "20px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function RegisterButton({onRegister}) {
  //check if modal is open
  const [modalIsOpen, setIsOpen] = useState(false);

  //opens modal
  function openModal() {
    setIsOpen(true);
  }

  //closes modal
  function closeModal() {
    setIsOpen(false);
  }

  //handling formdata
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  //handle user registration
  const handleRegister = async () => {
    try {
      if (!registerData.username || !registerData.password) {
        setError(true);
        return;
      }
      const payload = await registerUser(registerData);
      onRegister();
      setError(false);
      console.log("User Registered", payload);

      //reset form values
      setRegisterData({
        username: "",
        password: "",
      });

      //show toast when registration successfull
      toast.success("User Registered successfully!", {
        progressClassName: toastStyles["green-progress-bar"],
      });

      //close modal after successfull registraton
      closeModal();
    } catch (err) {
      console.error("Error during registration:", err.message);
    }
  };

  return (
    <Fragment>
      <Toast />
      <button className={button.register} onClick={openModal}>
        Register Now
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img
          src={close}
          height={30}
          width={30}
          className={button.close}
          onClick={closeModal}
        ></img>
        <h1 className={button.modalHead}>Register to SwipTory</h1>
        <form>
          <div className={button.username}>
            <label className={button.usernamelabel}> Username </label>
            <input
              className={button.usernameinput}
              placeholder="Enter your Username"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            ></input>{" "}
            <br />
          </div>
          <br />
          <div className={button.passwordcontainer}>
            <label className={button.passwordlabel}> Password </label>
            <input
              type="password"
              className={button.passwordinput}
              placeholder="Enter your Password"
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            ></input>
          </div>
          <span className={button.error}>
            {error ? "Username and password required" : ""}
          </span>
          <br />
        </form>
        <br />
        <button className={button.registerbtn} onClick={handleRegister}>
          Register
        </button>
      </Modal>
    </Fragment>
  );
}
