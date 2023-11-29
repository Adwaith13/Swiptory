import React, { useState, useEffect } from "react";
import storypopupStyle from "./component-style/storypopup.module.css";
import { likeApi } from "../api/likeapi";
import { bookmarkApi } from "../api/bookmarkApi";
import storyclose from "../assets/logos/storyclose.svg";
import previous from "../assets/logos/previous.svg";
import next from "../assets/logos/next.svg";
import link from "../assets/logos/link.svg";
import likeicon from "../assets/logos/likebutton.svg";
import bookmarkicon from "../assets/logos/bookmarkicon.svg";
import Toast from "./Toast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Categories({ data }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [data]);

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
        <div className={storypopupStyle.options}>
          <img
            src={storyclose}
            /* onClick={closeStory} */
            width={18}
            height={18}
            className={storypopupStyle.closebtn}
            alt="Close"
          ></img>
          <img
            src={link}
            /* onClick={copyToClipboard} */
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
            
              className={storypopupStyle.likebtn}
              alt="Like"
            ></img>
          </div>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className={storypopupStyle.storyItem}
            style={{
              display: index === currentSlideIndex ? "block" : "none",
            }}
          >
            <img
              className={storypopupStyle.images}
              src={item.images}
              alt={`Story ${index} - Image ${currentSlideIndex}`}
              style={{
                display: index === currentSlideIndex ? "block" : "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
