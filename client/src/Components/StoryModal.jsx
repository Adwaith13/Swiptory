import React from "react";
import Modal from "react-modal";
import Stories from "react-insta-stories";
import storyModalStyle from "./component-style/storyModal.module.css";
import storyclose from "../assets/logos/storyclose.svg";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    height: "80vh",
    width: "25vw",
    borderRadius: "20px",
    bottom: "auto",
    marginRight: "-13vw",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
  },
};

const StoryModal = ({ isOpen, closeModal, stories }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className={storyModalStyle.modalContent}>
          <img
            src={storyclose}
            width={15}
            height={15}
            onClick={closeModal}
            className={storyModalStyle.close}
          ></img>
        <div className={storyModalStyle.imageContainer}>
          <Stories
            stories={stories}
            defaultInterval={3000}
            width={380}
            height={579}
            isPaused={false}
          />
          <div className={storyModalStyle.details}>
            <h3 className={storyModalStyle.heading}>hello</h3>
            <p className={storyModalStyle.description}>hello</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoryModal;
