import { useState, useEffect } from "react";
import Stories from "react-insta-stories";
import storypopupStyle from "./component-style/storypopup.module.css";
import { likeApi } from "../api/likeapi";
import likeicon from "../assets/logos/likebutton.svg";
import bookmarkicon from "../assets/logos/bookmarkicon.svg";

const StoriesComponent = ({
  stories,
  onPrevImage,
  onNextImage,
  heading,
  description,
  closeStory,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [stories]);

  const likeAction = async () => {
    const registerToken = localStorage.getItem("registerToken");
    const loginToken = localStorage.getItem("loginToken");
    let token;
    if (registerToken) {
      token = registerToken;
    } else if (loginToken) {
      token = loginToken;
    }
    try {
      const likePost = await likeApi(token);
      return likePost;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={storypopupStyle.details}>
        <h2 className={storypopupStyle.heading}>{heading}</h2>
        <p className={storypopupStyle.description}>{description}</p>
        <div className={storypopupStyle.postAction}>
          <img src={bookmarkicon} className={storypopupStyle.bookmarkbtn}></img>
          <img
            src={likeicon}
            onClick={likeAction}
            className={storypopupStyle.likebtn}
          ></img>
        </div>
      </div>
      <Stories
        className={storypopupStyle.storyContainer}
        width={350}
        height={560}
        currentIndex={currentSlideIndex}
        onNext={onNextImage}
        onPrev={onPrevImage}
        onAllStoriesEnd={closeStory}
        stories={stories.map((slide, slideIndex) => ({
          url: slide.image_url,
        }))}
      />
    </div>
  );
};

export default StoriesComponent;
