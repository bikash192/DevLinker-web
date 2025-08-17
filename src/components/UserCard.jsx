import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-[420px] h-[600px] shadow-xl rounded-xl overflow-hidden flex flex-col">
        {/* Profile Image */}
        <figure className="h-[360px]">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body flex flex-col justify-between">
          <div>
            <h2 className="card-title text-xl font-bold">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-gray-400">
              {age} {gender}
            </p>
            <p className="mt-2 text-sm">{about}</p>
          </div>

          {/* Buttons */}
          <div className="card-actions flex justify-between mt-6">
            <button className="btn btn-secondary w-[48%]">Ignored</button>
            <button className="btn btn-primary w-[48%]">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
