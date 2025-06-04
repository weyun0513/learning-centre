import { useEffect, useState } from "react";
import axios from "axios";
import AssistanceCard from "../components/card";
import homeBg from '../assets/home_bg.png';
import HeroCarousel from "./HeroCarousel";
import SchoolSection from './SchoolSection'
function Home() {
  const [loading, setLoading] = useState(true);
  const MIN_CARD_COUNT = 2;
  const [slides, setSlides] = useState([]);
  const [cards, setCards] = useState([]);

  const serverAPIUrl = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const [slidesRes, cardsRes] = await Promise.all([
          axios.get(`${serverAPIUrl}/api/slides`),
          axios.get(`${serverAPIUrl}/api/cards`)
        ]);
        const slideData = Array.isArray(slidesRes.data) ? slidesRes.data : [];
        const cardData = Array.isArray(cardsRes.data) ? cardsRes.data : [];
        setSlides(slideData);

        const paddedCards = [
          ...cardData,
          ...Array.from({ length: Math.max(0, MIN_CARD_COUNT - cardData.length) }, () => ({
            title: "",
            description: "",
            image: "",
          })),
        ];
        setCards(paddedCards);
      } catch (error) {
        console.error("資料載入失敗：", error);
        setCards([
          { title: "", description: "", image: "" },
          { title: "", description: "", image: "" },
          // { title: "", description: "", image: "" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen w-screen bg-center bg-[length:400px]  px-4 py-10"
      style={{
        backgroundImage: `url(${homeBg})`, backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} // 改成你的背景圖
    >
      <div className=" sm:pt-[1000px]  md:pt-[500px] bg-white flex justify-center items-center  ">
        <HeroCarousel slides={slides} />
      </div>

      <section className="relative z-20 bg-white/20 pt-10 flex flex-col items-center">
        <div className="mx-auto w-full max-w-[1200px] min-w-[300px] px-4 flex flex-col md:flex-row justify-center gap-6">
          {cards.map((card, index) => (
            <AssistanceCard key={index} {...card} />
          ))}
        </div>
      </section>
      <div><SchoolSection /></div>
    </div>

  );
}

export default Home;