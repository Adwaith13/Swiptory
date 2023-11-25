// Stories.jsx
import { useEffect, useState } from "react";
import StoryModal from "./StoryModal";
import { fetchAllPosts } from "../api/fetchAllUserPosts";
import storyStyle from "./component-style/story.module.css";

export default function Story() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStories, setSelectedStories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await fetchAllPosts();
        setData(responseData.data.post);
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
          <img
            src={bundle.slides[0].image_url}
            className={storyStyle.image}
          />
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
