import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div
        className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 
                      w-[360px] rounded-2xl shadow-lg hover:shadow-pink-500/30 
                      overflow-hidden transition-transform hover:scale-[1.03] duration-300"
      >
        {/* Profile Image */}
        <figure className="h-[280px] overflow-hidden relative">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </figure>

        {/* Card Body */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {age} • {gender}
          </p>
          <p className="mt-3 text-gray-300 text-sm line-clamp-3">{about}</p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="cursor-pointer w-1/2 py-2 rounded-lg 
                         bg-gradient-to-r from-pink-500 to-rose-500 
                         text-white font-semibold shadow-md 
                         hover:shadow-lg hover:shadow-rose-500/40 
                         transition duration-300"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="cursor-pointer w-1/2 py-2 rounded-lg 
                         bg-gradient-to-r from-indigo-500 to-purple-500 
                         text-white font-semibold shadow-md 
                         hover:shadow-lg hover:shadow-purple-500/40 
                         transition duration-300"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
