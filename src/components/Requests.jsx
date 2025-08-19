import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => { 
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  const reviewRequest=async(status,_id)=>{
    try{
        const res=await axios.post(BASE_URL+'/request/review/'+status+"/"+_id,{},{withCredentials:true});
        dispatch(removeRequest(_id));
    }catch(err){
      console.log(err);
    }
  }


  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return null;
  if (request.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-400">
          No request found
        </h1>
      </div>
    );

  return (
    <div className="px-6 py-12 min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold text-center mb-10 text-white">
        Pending Requests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {request.map((req, index) => {
          const { firstName, lastName, age, gender, photoUrl, about } =
            req.fromUserId;

          return (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300"
            >
              {/* Profile Image */}
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-pink-500 shadow-md">
                <img
                  src={photoUrl || "https://via.placeholder.com/150"}
                  alt={firstName + " " + lastName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <h2 className="mt-4 text-xl font-semibold text-white">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-gray-400">
                {age} • {gender}
              </p>
              <p className="mt-2 text-gray-300 text-sm line-clamp-3">
                {about || "No description available."}
              </p>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button onClick={()=> reviewRequest("rejected",req._id)}className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold shadow-md hover:opacity-90 transition cursor-pointer">
                  Reject
                </button>
                <button onClick={()=> reviewRequest("accepted",req._id)}className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-md hover:opacity-90 transition cursor-pointer">
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
