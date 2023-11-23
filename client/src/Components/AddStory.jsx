import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import addStory from "./component-style/addstory.module.css";
import close from "../assets/logos/close.svg";
import Slide from "./Slide";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "60vh",
    width: "40vw",
    borderRadius: "20px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function AddStory() {
  const [modalIsOpen, setIsOpen] = useState(false);

  //opens modal
  function openModal() {
    setIsOpen(true);
  }

  //closes modal
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Fragment>
      <button onClick={openModal} className={addStory.btn}>
        Add Story
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img src={close} onClick={closeModal} className={addStory.close}></img>
        <p className={addStory.para}>Add upto 6 slides</p>
        <Slide />
      </Modal>
    </Fragment>
  );
}
