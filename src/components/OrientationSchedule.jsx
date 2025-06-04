// src/pages/OrientationSchedule.jsx
import React from "react";
import SchedulePrintView from "../components/SchedulePrintView";
const OrientationSchedule = () => {
  const data = [
    {
      _id: "682b4c3c624bd33da59ad50e",
      date: "2025-05-19",
      title: "Meeting with client",
      time: "45 min",
      duration: "c",
    },
    {
      _id: "682b4c6f624bd33da59ad510",
      date: "2025-05-21",
      title: "hi",
      time: "9:20 AM",
      duration: "20min",
    },
  ];
  return (
    <div
      className="min-h-screen w-screen bg-repeat bg-center bg-[length:400px]   px-4 py-10"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/schedule_bg2.png')` }} // 改成你的背景圖
    >


      {/* 套個半透明白底容器，讓排程內容易於閱讀 */}

      <div className="bg-white/20   ">
        <SchedulePrintView data={data} />
      </div>
    </div>
  );
};

export default OrientationSchedule;