import React from "react";

export default function SummerCampPricing() {
  return (
    <>
      <div className="mt-20   min-h-screen py-10 px-4 flex flex-col items-center text-center font-sans ]"
      >
        <h2 className="text-6xl font-bold text-black-800 mb-6 font-msjh">SUMMER CAMP </h2>

        <div className="bg-orange-400 rounded-2xl px-6 py-4 text-white font-semibold text-lg mb-4">
          SUMMER CAMP HOURS<br />
          MONDAY TO FRIDAY<br />
          8:30AM - 5:30PM
        </div>

        <div className="bg-orange-400 rounded-2xl px-6 py-2 text-white font-semibold text-lg mb-6">
          AGE - Kindergarden to Gr. 7
        </div>

        <div className="bg-orange-400 rounded-2xl px-6 py-6 text-white w-full max-w-xl mb-6">
          <h3 className="text-xl font-bold mb-2">SUMMER CAMP TUITION</h3>
          <p className="text-3xl font-msjh">夏令營費用</p>
          <p className="text-base mb-4">INCLUDE BREAKFAST, LUNCH AND SNACKS</p>

          <p className="text-lg font-bold font-msjh">$550 一週 PER WEEK</p>
          <p className="font-bold mt-2 font-msjh">TWO WEEK SPECIAL 兩週 $530 PER WEEK</p>
          <p className="font-bold   font-msjh">FOUR WEEK SPECIAL 四週 $500 PER WEEK</p>
          <p className="text-base text-white mt-1">(choose any weeks from the summer camp)</p>

          <p className="mt-4 text-yellow-200 font-semibold">
            ✨EIGHT WEEK SPECIAL 八週 $450 PER WEEK✨
          </p>
        </div>

        <div className="bg-orange-400 rounded-2xl px-6 py-2 text-white font-semibold text-md">
          EARLY BIRD DISCOUNT 10% OFF<br />
          BEFORE MAY 30TH
        </div>
      </div>

      <div className="mt-20   min-h-screen py-10 px-4 flex flex-col items-center text-center font-sans  ]"
      >
        <h2 className="text-6xl font-bold text-black-800 mb-6 font-msjh">托管班 </h2>

        <div className="bg-orange-400 rounded-2xl px-6 py-4 text-white font-semibold text-lg mb-4">
          <h2>托管班</h2>
          <h2>假期不煩惱 托管來幫忙</h2>
        </div>

        <div className="bg-orange-400 rounded-2xl px-6 py-2 text-white font-semibold text-lg mb-6">
          AGE - Kindergarden to Gr. 7
        </div>

        <div className="bg-orange-400 rounded-2xl px-6 py-6 text-white w-full max-w-xl text-center space-y-2">
          <div className="text-2xl font-bold">托管全天 $100 一天</div>
          <div className="text-2xl font-bold">托管半天 $70 一天</div>
          <div className="text-lg font-bold">8:30am - 1pm or 1pm - 5:30pm</div>
          <div className="text-base font-semibold uppercase">Include breakfast, lunch and snacks</div>

          <div className="p-4 text-lg font-bold leading-relaxed mt-4">
            我們提供全日或半日的托管服務<br />
            在給予家長彈性時間，配合家庭需求<br />
            也給予孩子創造培養興趣愛好，增加課外活動的機會<br />
            幫助孩子全面發展
          </div>

          <div className="text-lg  font-bold leading-relaxed mt-2">
            托管課程包含：<br />
            STORY TELLING, LEGO CREATIVE, PHONICS, 繪畫、<br />
            手工、音樂 等不同主題
          </div>
        </div>


      </div>
    </>
  );
}
