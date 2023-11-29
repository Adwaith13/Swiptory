import React, { useEffect } from "react";
import { fetchUserBookMark } from "../api/fetchUserBookMarks";
import { jwtDecode } from "jwt-decode";

export default function Bookmark() {
  const loginToken = localStorage.getItem("loginToken");
  const registerToken = localStorage.getItem("registerToken");

  useEffect(() => {
    const fetchBookMarks = async () => {
      try {
        if (!loginToken || !registerToken) {
          return "User not authorized";
        }
        let user_id;
        if (loginToken) {
          const decodedLoginToken = jwtDecode(loginToken);
          console.log(decodedLoginToken)
          user_id = decodedLoginToken._id;
        } else if (registerToken) {
          const decodedRegisterToken = jwtDecode(registerToken);
          user_id = decodedRegisterToken._id;
        }

        const payload = await fetchUserBookMark(
          loginToken || registerToken,
          user_id
        );
        console.log(payload.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookMarks();
  },[]);

  return <div>Bookmark</div>;
}
