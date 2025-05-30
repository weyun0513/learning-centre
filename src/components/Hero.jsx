import homeImg from "../assets/home.jpg"; // 這裡導入圖片
 
function Hero() {
    return (
      <section
     className="h-[60vh] mx-auto w-[70%]  h-screen bg-cover flex items-center justify-center relative "
        style={{ backgroundImage: `url(${homeImg})` }}
      >
        {/* 半透明遮罩讓文字更清晰 */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
        <div className="text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Empowering Students to Succeed
          </h1>
          <p className="text-lg text-gray-300 drop-shadow-md">
            Personalized learning programs for students of all ages.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            Learn More
          </button>
        </div>
      </section>
    );
  }
  
  export default Hero;