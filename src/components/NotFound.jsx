import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-7xl font-extrabold text-orange-500 mb-4">404</h1>
      <p className="text-2xl text-orange-600 font-semibold mb-2">Page Not Found</p>
      <p className="text-gray-700 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/home"
        className="inline-block bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 transition"
      >
        🔙 Back to Home
      </Link>
    </div>
  );
}
