import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.jpg";
import qrcode from "../assets/qr_wechat.png";


function Navbar() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/home");
  };

  const menuItems = [

    { to: "/home", label: "Home" },
    { to: "/schedules", label: "Schedule" },
    { to: "/home#school", label: "Location" },
    { to: "/contact", label: "Contact" },
  ];
  const [showQR, setShowQR] = useState(false);
  return (

    <div className="w-full shadow-md z-50 fixed top-0 left-0 bg-white">
      {/* 上層 Logo + 標題 + 按鈕 */}
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-14" />
          <div>
            <h1 className="text-2xl font-bold text-pink-800">MAGPIE LEARNING CENTER</h1>
            <p className="text-sm italic text-lime-600">
              Inspiring & Promoting Excellence in Magpie
            </p>

          </div>

          <div className="place-items-end pl-20">
            <img src={qrcode} alt="Logo" className="h-14"  onClick={() => setShowQR(true)} />
          </div>
        </div>

        <div className="hidden md:flex gap-3">

          {isLoggedIn && (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-red-500 hover:underline text-sm">登出</button>

          )}

        </div>

        {/* 漢堡選單按鈕（手機） */}
        <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {/* 下層導覽列（桌機） */}
      <nav className="bg-pink-800 text-white text-sm uppercase font-semibold tracking-wide hidden md:block">
        <div className="flex justify-center gap-6 px-4 py-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:underline ${location.pathname === item.to ? "text-yellow-300 underline" : ""
                }`}
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              to="/admin/adminPanel"
              className={`hover:underline ${location.pathname === "/admin/adminPanel" ? "text-yellow-300 underline" : ""
                }`}
            >
              Admin
            </Link>
          )}
        </div>
      </nav>

      {/* 下層導覽列（手機） */}
      {isMenuOpen && (
        <div className="bg-yellow-700 text-white flex flex-col md:hidden px-4 py-2 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:underline ${location.pathname === item.to ? "text-yellow-300 underline" : ""
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              to="/admin/adminPanel"
              className={`hover:underline ${location.pathname === "/admin/adminPanel" ? "text-yellow-300 underline" : ""
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              設定
            </Link>
          )}

        </div>
      )}
      {showQR && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowQR(false)} // 點擊遮罩關閉
        >
          <div className="bg-white p-4 rounded shadow-xl">
            <img src={qrcode} alt="Large QR Code" className="h-64 w-64" />
          </div>
        </div>
      )}
    </div>
    
  );
}

export default Navbar;
