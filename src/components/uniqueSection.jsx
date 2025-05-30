import PropTypes from "prop-types";
export default function UniqueSection({ imageUrl }) {
    return (
      <div className="flex flex-col md:flex-row items-center border rounded-lg p-6 shadow-lg bg-whiteFg">
        {/* 左側圖片 */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={imageUrl}
            alt="Teacher and student"
            className="rounded-lg w-full md:w-auto max-h-[300px] max-w-[300px]"
          />
        </div>
  
        {/* 右側文本內容 */}
        <div className="md:w-1/2 w-full mt-6 md:mt-0 md:pl-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            What Makes Us Unique
          </h2>
          <p className="mt-4 text-gray-700">
            <strong className="text-gray-900">The Vancouver Learning Centre</strong> is served by two professional disciplines, <strong>teaching</strong> and <strong>psychology</strong>, integrated in a seamless manner by a strategic, targeted, and individualized program designed for each learner.
          </p>
          <p className="mt-4 text-gray-700">
            Each program is built on updated neuroscientific knowledge grounded in real understanding of teaching practice and research findings on the <strong className="text-gray-900">effect of neuroplasticity on performance.</strong>
          </p>
          {/* <p className="mt-4 text-gray-700">
            Vancouver Learning Centre programs are delivered by professional teaching teams trained, supervised and directed by <a href="#" className="text-blue-600 underline">Dr. Geraldine Schwartz</a>, Senior Psychologist and Founder, and led on the floor by Principal and Head Teacher, <a href="#" className="text-blue-600 underline">Andrew Taylor</a> MA.
          </p> */}
        </div>
      </div>
    );
  }