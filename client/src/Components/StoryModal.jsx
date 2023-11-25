// StoryModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Stories from "react-insta-stories";
import storyModalStyle from "./component-style/storyModal.module.css";
import storyclose from "../assets/logos/storyclose.svg";
import likebutton from "../assets/logos/likebutton.svg";
import bookmark from "../assets/logos/bookmarkicon.svg"

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
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(stories);

  useEffect(() => {
    // Reset current index when stories change
    setCurrentIndex(0);
  }, [stories]);

  const handleStoryEnd = () => {
    closeModal();
  };

  const handleStoryChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className={storyModalStyle.modalContent}>
        <img
          src={storyclose}
          width={15}
          height={15}
          onClick={closeModal}
          className={storyModalStyle.close}
          alt="close"
        />
        <div className={storyModalStyle.imageContainer}>
          <Stories
            stories={stories.map((item, index) => item.image_url)}
            defaultInterval={3000}
            width={380}
            height={579}
            isPaused={false}
            onAllStoriesEnd={handleStoryEnd}
            onStoryChange={handleStoryChange}
          />
          {stories.map((item, index) => (
            <div key={index} className={storyModalStyle.details}>
              <h3 className={storyModalStyle.heading}>{item.heading}</h3>
              <p className={storyModalStyle.description}>{item.description}</p>
              <div className={storyModalStyle.postdata}>
                <img src={bookmark} width={25} height={25} className={storyModalStyle.bookmark}></img>
                <img src={likebutton} width={25} height={25} className={storyModalStyle.likebtn}></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default StoryModal;
