import React, { useState } from "react";
import { postStory } from "../api/postStory";
import postStyle from "./component-style/postStory.module.css";
import close from "../assets/logos/close.svg";

const MAX_SLIDES = 6;

export default function SlideButton() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const [slides, setSlides] = useState([
    { id: 1, heading: "", description: "", images: "", category: "" },
    { id: 2, heading: "", description: "", images: "", category: "" },
    { id: 3, heading: "", description: "", images: "", category: "" },
  ]);

  const handleAddSlide = () => {
    if (slides.length < MAX_SLIDES) {
      setSlides((prevSlides) => [
        ...prevSlides,
        {
          id: prevSlides.length + 1,
          heading: "",
          description: "",
          images: "",
          category: "",
        },
      ]);
      setCurrentSlide(slides.length + 1);
    }
  };

  const handleRemoveSlide = (index) => {
    if (slides.length > 3) {
      const newSlides = slides.filter((_, i) => i !== index);
      setSlides(newSlides);

      // Adjust current slide to stay within the valid range
      const adjustedCurrentSlide = Math.min(currentSlide, newSlides.length);
      setCurrentSlide(adjustedCurrentSlide);
    }
  };

  const handleInputChange = (e, slideIndex) => {
    const { name, value } = e.target;
    console.log(`Updating slide ${slideIndex} - ${name}: ${value}`);
    setSlides((prevSlides) =>
      prevSlides.map((slide, index) =>
        index + 1 === slideIndex ? { ...slide, [name]: value } : slide
      )
    );
  };

  const handlePost = async () => {
    try {
      console.log("Current slides:", slides);
      // Check if fields are filled in all slides
      for (const slide of slides) {
        if (
          !slide.heading ||
          !slide.description ||
          !slide.images ||
          !slide.category
        ) {
          alert("Please fill in all required fields in all slides.");
          return;
        }
      }

      // Combine data from all slides into a single bundle
      const postData = {
        slides: slides.map(({ id, ...rest }) => rest),
      };

      const token = localStorage.getItem("loginToken");

      const response = await postStory(postData, token);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSlideChange = (id) => {
    setCurrentSlide(id);
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => Math.max(1, prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => Math.min(slides.length, prevSlide + 1));
  };

  return (
    <div>
      <div className={postStyle.btnparent}>
        {slides.map((slide) => (
          <div key={slide.id} className={postStyle.buttoncontainer}>
            <button
              onClick={() => handleSlideChange(slide.id)}
              className={postStyle.slidebtn}
            >
              Slide {slide.id}
              {slide.id >= 4 && (
                <img className={postStyle.btnclose}
                  width={13}
                  height={13}
                  src={close}
                  onClick={() => handleRemoveSlide(slide.id - 1)}
                ></img>
              )}
            </button>
          </div>
        ))}
        <button onClick={handleAddSlide} className={postStyle.addbtn}>Add +</button>
      </div>

      <div className={postStyle.inputs}>
        <label className={postStyle.labels}>Heading: </label>
        <input className={postStyle.heading}
          type="text"
          placeholder="Your Heading"
          name="heading"
          value={slides[currentSlide - 1].heading}
          onChange={(e) => handleInputChange(e, currentSlide)}
        />

        <br />

        <label className={postStyle.labels}>Description: </label>
        <input className={postStyle.description}
          placeholder="Story Description"
          name="description"
          value={slides[currentSlide - 1].description}
          onChange={(e) => handleInputChange(e, currentSlide)}
        ></input>

        <br />

        <label className={postStyle.labels}>Image Url: </label>
        <input className={postStyle.image}
          type="text"
          placeholder="Image URL"
          name="images"
          value={slides[currentSlide - 1].images}
          onChange={(e) => handleInputChange(e, currentSlide)}
        />

        <br />
        
        <label className={postStyle.labels}>Category: </label>
        <select className={postStyle.category}
          name="category"
          value={slides[currentSlide - 1].category}
          onChange={(e) => handleInputChange(e, currentSlide)}
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="food">Food</option>
          <option value="healthandfitness">Health and Fitness</option>
          <option value="travel">Travel</option>
          <option value="movies">Movies</option>
          <option value="education">Education</option>
        </select>
      </div>

      <div className={postStyle.buttons}>
        <button onClick={handlePreviousSlide} className={postStyle.previous}>Previous</button>
        <button onClick={handleNextSlide} className={postStyle.next}>Next</button>
        <button onClick={handlePost} className={postStyle.post}>Post</button>
      </div>
    </div>
  );
}
