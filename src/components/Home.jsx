import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
import AssistanceCard from "../components/card";
 
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
    <div >
      <div className="p-2 mt-20 pt-10 bg-white  flex justify-center items-center  ">
        <HeroCarousel slides={slides} />
      </div>
      {/* One-to-One Assistance Section */}
      <div className="flex flex-col items-center">
        {/* <h2 className="text-2xl font-bold text-center text-gray-600 mb-10">
          One-to-One Assistance for Your Learner
        </h2> */}
        <div className="mx-auto w-[90%] flex flex-col md:flex-row justify-center gap-6">
          {cards.map((card, index) => (
            <AssistanceCard key={index} {...card} />
          ))}
        </div>
        {/* <div className="p-8">
          <UniqueSection imageUrl={assistanceImg} />
        </div> */}
        
      </div>
      <div><SchoolSection /></div>
    </div>

  );
}

export default Home;