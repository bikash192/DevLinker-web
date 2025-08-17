import React from "react";
 // optional if you use shadcn, else use <button>

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 via-white to-purple-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-purple-600">DevTinder</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
            Login
          </button>
          <button className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-100">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
          Connect with Developers, <br /> Build Projects Together 🚀
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          DevTinder helps you find like-minded developers around the world.
          Collaborate, share ideas, and grow together in tech.
        </p>
        <div className="space-x-4">
          <button className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 shadow-lg">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-xl border border-purple-600 text-purple-600 hover:bg-purple-100 shadow-lg">
            Learn More
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-8 py-16">
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">🌍 Global Community</h3>
          <p className="text-gray-600">
            Find developers from across the globe and connect instantly.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">💡 Collaboration</h3>
          <p className="text-gray-600">
            Work on projects together and bring your ideas to life.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">🔥 Skill Growth</h3>
          <p className="text-gray-600">
            Enhance your coding skills by engaging with real projects.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-purple-600 text-white text-center">
        <p>© {new Date().getFullYear()} DevTinder. Built with ❤️ by developers.</p>
      </footer>
    </div>
  );
};

export default Home;
