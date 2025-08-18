import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName||"");
  const [lastName, setLastName] = useState(user.lastName||"");
  const [age, setAge] = useState(user.age||"");
  const [about, setAbout] = useState(user.about||"");
  const [gender, setGender] = useState(user.gender||"");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl||"");
  const [toast, setToast] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setToast("✅ Profile saved successfully!"); 

     
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.log(err);
      setToast("❌ Failed to save profile");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-8 relative">
     
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success shadow-lg">
            <span>{toast}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Edit Profile Form */}
        <div className="card bg-base-200 shadow-xl p-6">
          <h2 className="card-title text-center text-2xl font-semibold mb-4">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
                required
              >
                <option disabled value="">
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Photo URL */}
            <div>
              <label htmlFor="photoUrl" className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                id="photoUrl"
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="4"
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>

            {/* Save Button */}
            <button type="submit" className="btn btn-primary w-full">
              Save Changes
            </button>
          </form>
        </div>

        {/* Live Preview Card */}
        <div className="flex items-center justify-center">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
