
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  space-y-4">
      <h1 className="text-2xl font-bold mb-6">功能設定</h1>
      <button className="px-6 py-3  text-black rounded-lg hover:bg-blue-600 transition" onClick={() => navigate("/admin/slide")}>
        設定倫波圖
      </button>
      <button className="px-6 py-3 text-black rounded-lg hover:bg-yellow-200 transition" onClick={() => navigate("/admin/cards")}>
        設定卡片
      </button>
      <button className="px-6 py-3 text-black rounded-lg hover:bg-yellow-200 transition" onClick={() => navigate("/admin/ScheduleN")} >
        設定說明
      </button>
      <button className="px-6 py-3 text-black rounded-lg hover:bg-yellow-200 transition" onClick={() => navigate("/admin/scheduleMaintance")} >
        設定課表
      </button>
        <button className="px-6 py-3 text-black rounded-lg hover:bg-yellow-200 transition" onClick={() => navigate("/admin/aboutAdmin")} >
        設定說明
      </button>
    </div>
  );
}

export default AdminPanel;