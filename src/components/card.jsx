import React from "react";
import { Link } from "react-router-dom";
const AssistanceCard = ({ title, description, image, buttonText }) => {
  const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-black flex flex-col items-center text-center w-80">
      <img src={`${serverUrl}${image}`} alt={title} className="w-full h-54 object-cover rounded-2xl p-2" />
      {/* <h3 className="text-base font-bold text-gray-800 mt-4">{title}</h3> */}
      {/* <p className="text-gray-600 mt-2 ">{description}</p> */}
      <Link to="/price">
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
        Learn More
      </button>
     </Link>
    </div>
  );
};
  
  export default AssistanceCard;