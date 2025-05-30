import { useEffect, useState } from "react";

function CardManager() {
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState("");
  const MIN_CARD_COUNT = 2;

  const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    fetch(`${serverUrl}/api/cards`)
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        const padded = [
          ...arr,
          ...Array.from({ length: Math.max(0, MIN_CARD_COUNT - arr.length) }, () => ({
            title: "",
            description: "",
            image: "",
          })),
        ];
       
        setCards(padded);
      })
      .catch(() => {
        setCards([
          { title: "", description: "", image: "" },
          { title: "", description: "", image: "" },
          { title: "", description: "", image: "" },
        ]);
      });
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
  };

  const handleSave = async (index) => {
    const card = cards[index];
    const method = card._id ? "PUT" : "POST";
    const url = card._id
      ? `${serverUrl}/api/cards/${card._id}`
      : `${serverUrl}/api/cards`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });

    const result = await res.json();
    if (method === "POST") {
      const updated = [...cards];
      updated[index] = result;
      setCards(updated);
    }

    setStatus(`✅ Card ${index + 1} saved`);
  };

  const handleUploadImage = async (index, file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(serverAPIUrl + "/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const updated = [...cards];
      updated[index].image = data.imageUrl;
      setCards(updated);
      setStatus(`✅ Image uploaded for Card ${index + 1}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to upload image for Card ${index + 1}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Maintain Cards</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={card._id || index} className="bg-gray-50 border p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Card {index + 1}</h3>

            <input
              type="text"
              placeholder="Title"
              value={card.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={card.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded"
              rows={3}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={`${serverUrl}${card.image}`}
              onChange={(e) => handleChange(index, "image", e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            {card.image && (
              <img
                src={`${serverUrl}${card.image}`}
                className="w-full h-32 object-cover mb-2 rounded"
                alt={`preview-${index}`}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadImage(index, e.target.files[0])}
              className="mb-3"
            />

            <button
              onClick={() => handleSave(index)}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ))}
      </div>

      {status && <p className="mt-6 text-center text-sm text-gray-600">{status}</p>}
    </div>
  );
}

export default CardManager;