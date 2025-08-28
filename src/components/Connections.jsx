import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link} from "react-router-dom";

const Connections = () => {
  
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return null;
  if (connection.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-400">
          No Connection found!!!
        </h1>
      </div>
    );

  return (
    <div className="px-6 py-12 min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold text-center mb-10 text-white">
        Your Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {connection.map((con, index) => {
          const {_id, firstName, lastName, age, gender, about, photoUrl } = con;
          return (
            <div
              key={_id}
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300"
            >
              {/* Profile Image */}
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
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
              <p className="text-sm text-gray-400">{age} • {gender}</p>
              <p className="mt-2 text-gray-300 text-sm line-clamp-3">
                {about || "No description available."}
              </p>
              {/* Chat Button */}
              <Link to={"/chat/"+_id}>
                <button className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
