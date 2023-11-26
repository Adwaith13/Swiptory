// FilterModal.jsx
import React from "react";
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

const FilterModal = ({ isOpen, closeModal, selectedStory, currentImageIndex, openNextModal }) => {
    let stories = [];
    if (Array.isArray(selectedStory)) {
      // If selectedStory is an array, use it as is
      stories = selectedStory;
    } else if (selectedStory && typeof selectedStory === "object") {
      // If selectedStory is an object, convert it to an array
      stories = [selectedStory];
    }
  
    const startIndex = currentImageIndex;
    const endIndex = Math.min(startIndex + 6, stories.length);
    const displayedStories = stories.slice(startIndex, endIndex);

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
          {displayedStories.length > 0 && (
            <div>
              <Stories
                stories={displayedStories.map((story) => story.images)}
                defaultInterval={3000}
                width={380}
                height={579}
                isPaused={false}
              />
              {displayedStories.map((story, index) => (
                <div key={index} className={storyModalStyle.details}>
                  <h3 className={storyModalStyle.heading}>{story.heading}</h3>
                  <p className={storyModalStyle.description}>{story.description}</p>
                  <div className={storyModalStyle.postdata}>
                <img src={bookmark} width={25} height={25} className={storyModalStyle.bookmark}></img>
                <img src={likebutton} width={25} height={25} className={storyModalStyle.likebtn}></img>
              </div>
                </div>
                
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
