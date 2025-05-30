import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  const serverAPIUrl = import.meta.env.VITE_SERVER_BASE_URL;
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`${serverAPIUrl}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          const data = await res.json();
          setMessage(data.message);
        } catch (err) {
          console.error(err);
          setMessage("註冊失敗");
        }
      };
    const handleSubmit = async (e) => {
       
        e.preventDefault();
        try {
            setMessage("");
          const res = await fetch(`${serverAPIUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          });
          const data = await res.json();
          console.log(data);
          if (res.status=== 200) {
             sessionStorage.setItem("isLoggedIn", "true"); // 儲存登入狀態
            navigate("/admin/adminPanel");
          }else{
          setMessage(data.message);}
        } catch (err) {
          setMessage('登入失敗');
        }
      };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">登入</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">account</label>
          <input
            
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">密碼</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          login
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginForm;
