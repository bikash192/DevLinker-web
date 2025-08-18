import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Hero Section */}
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-300">devLinker</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Connect with developers, showcase your projects, and grow your professional network.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <button
            className="btn btn-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg"
            onClick={() => navigate("/login")}
          >
            🚀 Get Started
          </button>
          <button className="btn btn-lg border-2 border-white hover:bg-white hover:text-black rounded-xl">
            Learn More
          </button>
        </div>

        {/* Features + CTA in a single grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-3">💻</div>
            <h3 className="font-bold text-lg mb-2">Showcase Projects</h3>
            <p className="text-white/80 text-sm">
              Share your work with the community and get feedback from fellow developers.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-bold text-lg mb-2">Collaborate</h3>
            <p className="text-white/80 text-sm">
              Join teams, collaborate on projects, and learn together.
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-3">🌱</div>
            <h3 className="font-bold text-lg mb-2">Grow</h3>
            <p className="text-white/80 text-sm">
              Build your network, enhance your skills, and boost your career.
            </p>
          </div>
        </div>

        {/* Final CTA button */}
        <button
          className="btn btn-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl shadow-lg px-10 py-4"
          onClick={() => navigate("/login")}
        >
          Join Now & Start Building 🚀
        </button>
      </div>
    </div>
  );
};

export default Home;
