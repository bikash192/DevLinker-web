import React from "react";

const UserCard = ({user}) => {
    console.log(user)
    const{firstName,lastName,age,gender,about,photoUrl}=user
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src={user.photoUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" "+lastName}</h2>
          <p>
                {age+" "+gender}
          </p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignored</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
