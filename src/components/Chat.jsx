import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]); // should be array
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);

  const userId = user?._id; // loggedIn User
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    // join chat
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
      photoUrl: user.photoUrl || "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
    });

    // listen for messages
    socket.on("messageReceived", ({ firstName, text, photoUrl, userId: senderId, createdAt }) => {
      setMessages((prev) => [
        ...prev,
        {
          firstName,
          text,
          photoUrl: photoUrl || "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
          senderId,
          createdAt: createdAt || new Date().toISOString()
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstName, user?.photoUrl]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        firstName: user.firstName,
        userId,
        targetUserId,
        text: newMessage,
        photoUrl: user.photoUrl || "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
        createdAt: new Date().toISOString(),
      });
    }

    // show instantly in UI
    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        text: newMessage,
        photoUrl: user.photoUrl || "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
        senderId: userId,
        createdAt: new Date().toISOString(),
      },
    ]);

    setNewMessage("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto border border-gray-700 rounded-2xl mt-6 h-[75vh] flex flex-col bg-gray-900 shadow-xl">
      {/* Header */}
      <h1 className="p-4 border-b border-gray-700 text-lg font-semibold text-white bg-gray-800 rounded-t-2xl">
        Chat with {targetUserId || "User"}
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {messages.map((msg, index) => {
          const isMine = msg.senderId === userId;
          return (
            <div key={index} className="space-y-6">
              <div className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full ring ring-indigo-500 ring-offset-2">
                    <img alt="user" src={msg.photoUrl} />
                  </div>
                </div>
                <div className="chat-header text-gray-300">
                  {msg.firstName}
                  <time className="text-xs opacity-50 ml-2">
                    {formatTime(msg.createdAt)}
                  </time>
                </div>
                <div
                  className={`chat-bubble ${
                    isMine ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-100"
                  } shadow-md`}
                >
                  {msg.text}
                </div>
                <div className="chat-footer text-xs opacity-50 text-gray-400">
                  {isMine ? "Sent" : "Delivered"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3 bg-gray-800 rounded-b-2xl">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={sendMessage}
          className="btn btn-secondary rounded-full px-6"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
