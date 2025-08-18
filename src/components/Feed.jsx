import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const feedUser = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    feedUser();
  }, []);

  return (
    feed && (
      <div className="min-h-screen flex justify-center items-center 
                      bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950
                      px-4">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
