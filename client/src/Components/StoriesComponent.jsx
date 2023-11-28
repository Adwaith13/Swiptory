import React, { useState, useEffect } from "react";
import storypopupStyle from "./component-style/storypopup.module.css";
import { likeApi } from "../api/likeapi";
import storyclose from "../assets/logos/storyclose.svg";
import previous from "../assets/logos/previous.svg";
import next from "../assets/logos/next.svg";
import link from "../assets/logos/link.svg";
import likeicon from "../assets/logos/likebutton.svg";
import bookmarkicon from "../assets/logos/bookmarkicon.svg";
import Toast from "./Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastStyles from "../Components/component-style/toast.module.css";
import LoadingBar from "react-top-loading-bar";

const StoriesComponent = ({ data, closeStory }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const [loadingBarProgress, setLoadingBarProgress] = useState(0);

  useEffect(() => {
    // Reset the slide index when stories change
    setCurrentSlideIndex(0);
  }, [data]);

  const startLoadingBar = () => {
    setLoadingBarProgress(0);
    const interval = setInterval(() => {
      setLoadingBarProgress((prevProgress) => prevProgress + 5);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setLoadingBarProgress(100);
    }, 10000);
  };

  useEffect(() => {
    startLoadingBar();
    const timer = setTimeout(() => {
      showNextImage();
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  const showPreviousImage = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const likeAction = async (postID) => {
    const registerToken = localStorage.getItem("registerToken");
    const loginToken = localStorage.getItem("loginToken");
    let token;
    if (registerToken) {
      token = registerToken;
    } else if (loginToken) {
      token = loginToken;
    }
    try {
      const likePost = await likeApi(token, postID);
      console.log(likePost);
      return likePost;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseStory = () => {
    setCurrentSlideIndex(0);
    closeStory();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <div>
      <Toast />
      <div className={storypopupStyle.toggle}>
        <img
          src={previous}
          className={storypopupStyle.previous}
          width={40}
          height={40}
          onClick={showPreviousImage}
          alt="Previous"
        ></img>
        <img
          src={next}
          width={40}
          height={40}
          className={storypopupStyle.next}
          onClick={showNextImage}
          alt="Next"
        ></img>
      </div>

      <div className={storypopupStyle.storyContainer}>
      <LoadingBar className={storypopupStyle.loadingBar}
            color="white"
            width="20%"
            progress={loadingBarProgress}
            onLoaderFinished={() => setLoadingBarProgress()}
          />
        <div className={storypopupStyle.options}>
          <img
            src={storyclose}
            onClick={closeStory}
            width={18}
            height={18}
            className={storypopupStyle.closebtn}
            alt="Close"
          ></img>
          <img
            src={link}
            onClick={copyToClipboard}
            width={18}
            height={18}
            className={storypopupStyle.link}
            alt="Link"
          ></img>
        </div>

        <div className={storypopupStyle.details}>
          <h2 className={storypopupStyle.heading}>
            {data[currentSlideIndex]?.heading}
          </h2>
          <p className={storypopupStyle.description}>
            {data[currentSlideIndex]?.description}
          </p>
          <div className={storypopupStyle.postAction}>
            <img
              src={bookmarkicon}
              className={storypopupStyle.bookmarkbtn}
              alt="Bookmark"
            ></img>
            <img
              src={likeicon}
              /* onClick={() => likeAction(data[currentSlideIndex]?._id)} */
              className={storypopupStyle.likebtn}
              alt="Like"
            ></img>
          </div>
        </div>

        {data.map((slide, index) => (
          <div key={index} className={storypopupStyle.storyItem}>
            <img
              className={storypopupStyle.images}
              src={slide.images}
              alt={`Story ${index}`}
              style={{
                display: index === currentSlideIndex ? "block" : "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesComponent;
