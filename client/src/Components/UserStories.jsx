import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchUserPosts } from "../api/fetchUserPosts";
import storyStyle from "./component-style/story.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import storypopupStyle from "./component-style/storypopup.module.css";
import StoriesComponent from "./StoriesComponent";
import storyclose from "../assets/logos/storyclose.svg";
import previous from "../assets/logos/previous.svg";
import next from "../assets/logos/next.svg";
import link from "../assets/logos/link.svg";

export default function Story() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginToken = localStorage.getItem("loginToken");
        const registerToken = localStorage.getItem("registerToken");
        if (!loginToken || !registerToken) {
          setError(true);
        }
        let user_id;
        if (loginToken) {
          const decodedLoginToken = jwtDecode(loginToken);
          user_id = decodedLoginToken._id;
        } else if (registerToken) {
          const decodedRegisterToken = jwtDecode(registerToken);
          user_id = decodedRegisterToken._id;
        }

        const payload = await fetchUserPosts(
          loginToken || registerToken,
          user_id
        );
        setData(payload.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  const stories = data.flatMap((item) =>
    Array.isArray(item.posts)
      ? [
          {
            slides: item.posts.map((post) => ({
              image_url: decodeURIComponent(post.images),
              heading: post.heading,
              description: post.description,
            })),
          },
        ]
      : []
  );

  const openStory = (index) => {
    setShowModal(true);
    setCurrentStoryIndex(index);
  };

  const closeStory = () => {
    setShowModal(false);
  };

  const showPreviousImage = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <h1 className={storyStyle.pageheading}>Your Stories</h1>
      {stories.map((bundle, index) => (
        <div
          key={index}
          className={storyStyle.story}
          onClick={() => openStory(index)}
        >
          <div className={storyStyle.details}>
            <h3 className={storyStyle.heading}>{bundle.slides[0].heading}</h3>
            <p className={storyStyle.description}>
              {bundle.slides[0].description}
            </p>
          </div>
          <img
            src={bundle.slides[0].image_url}
            className={storyStyle.image}
            alt={`Story ${index}`}
          />
        </div>
      ))}

      {showModal && (
        <Popup
          open={showModal}
          closeOnDocumentClick
          onClose={() => closeStory()}
          contentStyle={{
            width: "49rem",
            height: "37.8rem",
            backgroundColor: "transparent",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
          }}
        >
          <div className={storypopupStyle.toggle}>
            <img
              src={previous}
              className={storypopupStyle.previous}
              width={40}
              height={40}
              onClick={showPreviousImage}
            ></img>
            <img
              src={next}
              width={40}
              height={40}
              className={storypopupStyle.next}
              onClick={showNextImage}
            ></img>
          </div>
          <div className={storypopupStyle.options}>
            <img
              src={storyclose}
              onClick={() => closeStory()}
              width={15}
              height={15}
              className={storypopupStyle.closebtn}
            ></img>
            <img
              src={link}
              width={15}
              height={15}
              className={storypopupStyle.link}
            ></img>
          </div>
          <div className={storypopupStyle.storyContainer}>
            {stories.length > 0 && stories[currentStoryIndex]?.slides ? (
              <StoriesComponent
                currentIndex={currentStoryIndex}
                onAllStoriesEnd={closeStory}
                stories={stories[currentStoryIndex]?.slides}
                onPrevImage={showPreviousImage}
                onNextImage={showNextImage}
                heading={stories[currentStoryIndex]?.slides[0].heading}
                description={stories[currentStoryIndex]?.slides[0].description}
              />
            ) : (
              <p>No stories available</p>
            )}
          </div>
        </Popup>
      )}
    </div>
  );
}
