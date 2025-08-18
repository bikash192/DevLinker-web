import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    <div className="flex justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 w-[360px] rounded-2xl shadow-2xl overflow-hidden transition-transform hover:scale-[1.02]">
        
        {/* Profile Image */}
        <figure className="h-[280px] overflow-hidden">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </figure>

        {/* Card Body */}
        <div className="p-5 text-center">
          <h2 className="text-2xl font-bold text-white">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-400">
            {age} • {gender}
          </p>
          <p className="mt-3 text-gray-300 text-sm line-clamp-3">
            {about}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className=" cursor-pointer w-1/2 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-md hover:opacity-90 transition">
              Ignore
            </button>
            <button className=" cursor-pointer w-1/2 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-90 transition">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
