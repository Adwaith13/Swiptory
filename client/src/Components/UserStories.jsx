import React, { useEffect, useState, Fragment } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchUserPosts } from "../api/fetchUserPosts";
import storyStyle from "./component-style/story.module.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import storypopupStyle from "./component-style/storypopup.module.css";
import StoriesComponent from "./StoriesComponent";

export default function Story() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

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

  const openStory = (index) => {
    setPopupOpen(true);
  };

  const closeStory = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <h1 className={storyStyle.pageheading}>Your Stories</h1>
      {data.map((bundle, index) => (
        <Popup
          key={index}
          trigger={
            <div className={storyStyle.story}>
              <div className={storyStyle.details}>
                <h3 className={storyStyle.heading}>
                  {bundle.posts[0].heading}
                </h3>
                <p className={storyStyle.description}>
                  {bundle.posts[0].description}
                </p>
              </div>
              <img src={bundle.posts[0].images} className={storyStyle.image} />
            </div>
          }
          modal
          nested
          onClose={closeStory}
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
          <div className={storypopupStyle.storyContainer}>
            {data[index].posts.length > 0 ? (
              <StoriesComponent
                data={data[index].posts}
                closeStory={closeStory}
                onAllStoriesEnd={closeStory}
              />
            ) : (
              <p>No stories available</p>
            )}
          </div>
        </Popup>
      ))}
    </div>
  );
}
