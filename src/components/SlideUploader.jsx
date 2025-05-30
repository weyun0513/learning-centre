import axios from "axios";
import { useEffect, useState } from "react";

function SlideUploader() {
  const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;

  const [slides, setSlides] = useState([
    { image: "", title: "", description: "", },
    { image: "", title: "", description: "", },
    { image: "", title: "", description: "", },
  ]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${serverUrl}/api/slides`);
debugger
          setSlides(res.data)
        } catch (err) {
          console.error("取得slide失敗", err);
        }

      };
      fetchData();
    }, []);
  const [status, setStatus] = useState("");
  const handleUploadImage = async (index, file) => {
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const res = await fetch(`${serverUrl}/api/upload-image`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const updated = [...slides];
      updated[index].image = data.imageUrl;
      setSlides(updated);
      setStatus(`✅ Image uploaded for Card ${index + 1}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Failed to upload image for Card ${index + 1}`);
    }
  };
  const handleChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    debugger
    setSlides(updatedSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Uploading...");

    try {
      const res = await axios.post(`${serverUrl}/api/slides/upload`, slides);
      if (res.ok) {
        setStatus("✅ All slides uploaded!");

      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
        Upload 3 Slides
      </h2>

      <form className="space-y-10" onSubmit={handleSubmit}>
        {slides.map((slide, index) => (
          <div key={index} className="border p-4 rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Slide {index + 1}</h3>
            <input
              value={slide.image}
              onChange={(e) => handleChange(index, "image", e.target.value)}
              placeholder="Image URL"
              className="w-full border px-3 py-2 mb-2 rounded"
              required
            />
            <input
              value={slide.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Title"
              className="w-full border px-3 py-2 mb-2 rounded"
              required
            />
            <textarea
              value={slide.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              placeholder="Description"
              className="w-full border px-3 py-2 mb-2 rounded"
              required
            />
            <img
              src={`${serverUrl}${slide.image}`}
              className="w-full h-44 object-cover mb-2 rounded"
              alt={`preview-${index}`}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUploadImage(index, e.target.files[0])}
              className="mb-3"
            />

          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Upload All Slides
        </button>
      </form>

      {status && <p className="text-center mt-4 text-gray-600">{status}</p>}
    </div>
  );
}

export default SlideUploader;