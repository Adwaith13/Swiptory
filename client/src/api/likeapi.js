import axios from "axios";

export const likeApi = async (token,postID) => {
  try {
    const URL = import.meta.env.VITE_BACKEND_URL;
    const like = await axios.patch(`${URL}/like/${postID}`,{},
      {
        headers: { token },
      }
    );
    return like;
  } catch (err) {
    console.error(err);
  }
};
