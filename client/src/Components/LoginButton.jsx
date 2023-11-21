import { Fragment, useState } from "react";
import Modal from "react-modal";
import button from "./component-style/button.module.css";
import close from "../assets/logos/close.svg";
import { loginUser } from "../api/login";
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

export default function LoginButton() {
  //check if modal is open
  const [modalIsOpen, setIsOpen] = useState(false);

  //open modal
  function openModal() {
    setIsOpen(true);
  }

  //close modal
  function closeModal() {
    setIsOpen(false);
  }

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleUserLogin = async () => {
    try {
      if (!loginData.username || !loginData.password) {
        setError(true);
        return;
      }
      const payload = await loginUser(loginData);
      setError(false);
      console.log("User Logged In", payload);

      //reset form
      setLoginData({
        username: "",
        password: "",
      });

      //show toast when login successfull
      toast.success("User Logged In successfully!", {
        progressClassName: toastStyles["green-progress-bar"],
      });

      //close modal after successfull registraton
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Toast />
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
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            ></input>
          </div>
          <br />
          <div className={button.passwordcontainerlogin}>
            <label className={button.passwordlabel}> Password </label>
            <input
              type="password"
              className={button.passwordinput}
              placeholder="Enter your Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            ></input>
          </div>
          <span className={button.error}>
            {error ? "Please enter valid Username" : ""}
          </span>
        </form>
        <br />
        <button className={button.loginbtn} onClick={handleUserLogin}>
          Login
        </button>
      </Modal>
    </Fragment>
  );
}
