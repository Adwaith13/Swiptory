import React from "react";
import card from "./component-style/filtercard.module.css";
import all from "../assets/images/all.png"

export default function FilterCard() {
  const filters = [
    {
      id: 1,
      title: "All",
      image:{all},
    },
    {
      id: 2,
      title: "Food",
    },
    {
      id: 3,
      title: "Health and Fitness",
    },
    {
      id: 4,
      title: "Travel",
    },
    {
      id: 5,
      title: "Movies",
    },
    {
      id: 6,
      title: "Education",
    },
  ];

  return (
    <div className={card.parent}>
      {filters.map((item) => (
        <div key={item.id} className={card.card}>
          {item.title}
        </div>
      ))}
    </div>
  );
}
