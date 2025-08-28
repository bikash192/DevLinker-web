import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);
  const [message, setMessage] = useState(["Hello World"]);
  const user=useSelector((store)=>store.user);
const userId=user?._id;  /*loggedIn User  */

useEffect(()=>{
  if(!userId) {
    return;
  }

  // As soon as the page load the socket connection is made and join chat event  emitted
  const socket=createSocketConnection();
  socket.emit("joinChat",{firstName:user.firstName,userId,targetUserId});

return()=>{


  socket.disconnect();
}


},[userId,targetUserId])




  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto border border-gray-700 rounded-2xl mt-6 h-[75vh] flex flex-col bg-gray-900 shadow-xl">
      {/* Header */}
      <h1 className="p-4 border-b border-gray-700 text-lg font-semibold text-white bg-gray-800 rounded-t-2xl">
        Chat with {targetUserId || "User"}
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {message.map((msg, index) => (
          <div key={index} className="space-y-6">
            {/* Friend message */}
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring ring-indigo-500 ring-offset-2">
                  <img
                    alt="user"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header text-gray-300">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50 ml-2">12:45</time>
              </div>
              <div className="chat-bubble bg-gray-800 text-gray-100 shadow-md">
                You were the Chosen One!
              </div>
              <div className="chat-footer text-xs opacity-50 text-gray-400">
                Delivered
              </div>
            </div>

            {/* My message */}
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ring ring-indigo-500 ring-offset-2">
                  <img
                    alt="me"
                    src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header text-gray-300">
                Anakin
                <time className="text-xs opacity-50 ml-2">12:46</time>
              </div>
              <div className="chat-bubble bg-indigo-600 text-white shadow-md">
                I hate you!
              </div>
              <div className="chat-footer text-xs opacity-50 text-gray-400">
                Seen at 12:46
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-gray-800 rounded-b-2xl">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="btn btn-secondary rounded-full px-6">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
