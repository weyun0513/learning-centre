import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroCarousel({ slides }) {
  const serverUrl= import.meta.env.VITE_SERVER_BASE_URL;
    return (
      <section className="w-full mt-20 sm:mt-40 md:mt-60 flex justify-center">
        <div className="w-full min-h-[300px] h-[40vh] sm:h-[50vh] md:h-[60vh] max-h-[400px] bg-cover bg-center ">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop
            className="w-full h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center relative rounded-xl overflow-hidden"
                  style={{ backgroundImage: `url(${serverUrl}${slide.image})` }}
                >
                  {/* 半透明遮罩 */}
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
  
                  {/* 文字內容 */}
                  <div className="text-center text-white z-10 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-gray-300 drop-shadow-md max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                    {/* {slide.buttonText && (
                      <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                        {slide.buttonText}
                      </button>
                    )} */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    );
  }