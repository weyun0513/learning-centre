import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import axios from "axios";
function Contact() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const userId = import.meta.env.VITE_EMAILJS_Public_Key;
  const CONTACTMAIL = import.meta.env.VITE_CONTACT_EMAIL;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [contact, setContact] = useState([]);
  const serverAPIUrl = import.meta.env.VITE_SERVER_BASE_URL;
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${serverAPIUrl}/api/contact`);
        setContact(res.data[0]);
        debugger
      } catch (err) {
        console.error("聯絡資料取得失敗", err);
      }
    };

    fetchContact();
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    if (!name || !message) {
      alert("請填寫姓名和留言！")
      setStatus("請填寫姓名和留言！please leave name and message");
      return;
    }

    const templateParams = {
      name: name,
      tel: tel,
      email: email,
      message: message,
      to_email: CONTACTMAIL,
    };


    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("成功發送！", response.status, response.text);
        alert("已成功發送,會盡快聯繫您")
        setStatus("留言已發送！");
        setName("");
        setMessage("");
      })
      .catch((err) => {
        console.error("發送失敗", err);
        setStatus("發送失敗，請稍後再試");
      });
  };

  return (
    
    <div className="justify-center p-20 flex flex-col items-center min-h-screen bg-gray-100">
      <h5 className="text-3xl w-full font-bold  text-blue-600">我們會盡快聯繫您</h5>
      <h5 className="pt-2 text-2xl w-full   text-black-600">tel: {contact?.tel}</h5>
      <h5 className="text-2xl w-full   text-black-600">email: {contact?.email}</h5>
      <div className="bg-white p-4 w-full rounded-lg shadow-xl ">
        <form className="space-y-4" onSubmit={sendMessage}>
          <div>
            <label className="block text-gray-700 font-medium">姓名</label>
            <input
              type="text"
              placeholder="您的姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">電話</label>
            <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400" placeholder="您的聯絡電話" onChange={(e) => setTel(e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">電子郵件</label>
            <input className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400" type="email" placeholder="您的郵件" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">留言</label>

            <textarea
              placeholder="請輸入您的留言..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all">
            提交
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;