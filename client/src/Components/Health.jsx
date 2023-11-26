import React, { useEffect, useState } from "react";
import { fetchCategoryApi } from "../api/fetchCategory";
import FilterModal from "./FilterModals";
import storyStyle from "./component-style/story.module.css";

export default function FoodStories() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchFoodApi = async () => {
      try {
        const payload = await fetchCategoryApi ('healthandfitness');
        setData(payload.data.posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFoodApi();
  }, []);

  const openModal = (story) => {
    setSelectedStory(story);
    setCurrentImageIndex(0);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openNextModal = () => {
    const nextImageIndex = currentImageIndex + 6;
    openModal(selectedStory, nextImageIndex);
  };

  return (
    <div>
      <h1 className={storyStyle.pageheading}>Top Stories about Health and Fitness</h1>
      {data.map((item, index) => (
        <div key={index} onClick={() => openModal(item)} className={storyStyle.story}>
          <div className={storyStyle.details}>
            <h3 className={storyStyle.heading}>{item.heading}</h3>
            <p className={storyStyle.description}>{item.description}</p>
          </div >
          <img
            src={item.images}
            className={storyStyle.image}
          />
        </div>
      ))}
      <FilterModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        selectedStory={selectedStory}
        currentImageIndex={currentImageIndex}
        openNextModal={openNextModal}
      />
    </div>
  );
}
