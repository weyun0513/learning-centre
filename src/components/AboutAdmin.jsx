import { useState } from "react";
import axios from "axios";

function AboutAdmin() {
  const [form, setForm] = useState({
    title: "",
    highlight: "",
    content1: "",
    content2: "",
    image: null,
  });

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("highlight", form.highlight);
    data.append("content1", form.content1);
    data.append("content2", form.content2);
    data.append("image", form.image);
    const serverAPIUrl = import.meta.env.VITE_SERVER_BASE_URL;
    try {
      await axios.post(`${serverAPIUrl}/api/about`, data);
      alert("上傳成功");
    } catch (err) {
      alert("上傳失敗");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <input type="text" placeholder="標題" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border p-2 w-full" />
      <input type="text" placeholder="粗體字" value={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.value })} className="border p-2 w-full mt-2" />
      <textarea placeholder="段落一" value={form.content1} onChange={(e) => setForm({ ...form, content1: e.target.value })} className="border p-2 w-full mt-2" />
      <textarea placeholder="段落二" value={form.content2} onChange={(e) => setForm({ ...form, content2: e.target.value })} className="border p-2 w-full mt-2" />
      <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} className="mt-2" />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        儲存
      </button>
    </div>
  );
}

export default AboutAdmin;
