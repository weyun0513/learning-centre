// src/pages/OrientationSchedule.jsx
import React from "react";
import banner from "../assets/home.jpg";
import AboutSummercAMP from "./about-summer-camp";
const Price = () => {
  
  return (
    <div
      className="min-h-screen w-screen bg-repeat bg-center bg-[length:400px]   px-4 py-10"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/schedule_bg2.png')` }} // 改成你的背景圖
    >


      {/* 套個半透明白底容器，讓排程內容易於閱讀 */}

      <div className="bg-white/20   ">
        <AboutSummercAMP   />
      </div>
    </div>
  );
};

export default Price;