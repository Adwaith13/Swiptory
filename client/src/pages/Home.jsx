import React from "react";
import FilterCard from "../Components/FilterCard";
import UserStories from "../Components/UserStories";
import FoodStories from "../Components/FoodStories";
import Health from "../Components/Health";
import Travel from "../Components/Travel";
import Movies from "../Components/Movies";
import Education from "../Components/Education";

export default function Home() {
  
  return (
    <div>
      <FilterCard />
      <UserStories />
      <FoodStories />
      <Health />
      <Travel />
      <Movies />
      <Education />
    </div>
  );
}
