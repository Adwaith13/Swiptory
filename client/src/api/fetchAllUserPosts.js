import axios from "axios";

export const fetchAllPosts = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  try {
    const allUserPosts = await axios.get(`${URL}/allposts`);
    if (!allUserPosts) {
      return "Nothing to see here";
    }
    return allUserPosts;
  } catch (err) {
    console.log(err);
  }
};
