import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center py-3 shadow-md">
      © {new Date().getFullYear()} Created by <span className="font-bold">Developer BKSH</span>
    </div>
  );
};

export default Footer;
