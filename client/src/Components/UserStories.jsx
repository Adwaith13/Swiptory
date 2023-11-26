// Stories.jsx
import { useEffect, useState } from "react";
import StoryModal from "./StoryModal";
import { jwtDecode } from "jwt-decode";
import { fetchUserPosts } from "../api/fetchUserPosts";
import storyStyle from "./component-style/story.module.css";

export default function Story() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStories, setSelectedStories] = useState([]);
  const [error, setError] = useState(false);

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

   const openModal = (stories) => {
    setSelectedStories(stories);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1 className={storyStyle.pageheading}>Your Stories</h1>
      {stories.map((bundle, index) => (
        <div
          key={index}
          className={storyStyle.story}
          onClick={() => openModal(bundle.slides)}
        >
          <div className={storyStyle.details}>
            <h3 className={storyStyle.heading}>{bundle.slides[0].heading}</h3>
            <p className={storyStyle.description}>
              {bundle.slides[0].description}
            </p>
          </div>
          <img src={bundle.slides[0].image_url} className={storyStyle.image} />
        </div>
      ))}
      <StoryModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        stories={selectedStories}
      />
    </div>
  );
}
