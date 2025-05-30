import React, { useEffect, useState } from "react";
import axios from "axios";
function ScheduleMaintance() {
    const [schedules, setSchedules] = useState([]);

    const [schedulePageSettings, setSchedulePageSettings] = useState({
        bg: "",
        title: ""
        // 可加上其他欄位，例如 title, subtitle 等
    });
    const [dailySchedules, setDailySchedules] = useState([]);
    const [editMode, setEditMode] = useState({}); // 每筆資料的編輯狀態
    const serverAPIUrl = import.meta.env.VITE_SERVER_BASE_URL;

    const serverUrl = import.meta.env.VITE_SERVER_BASE_URL;
    useEffect(() => {
        axios.get(`${serverAPIUrl}/api/schedules/`)
            .then(res => setSchedules(res.data))
            .catch(err => console.error("Schedule error:", err));

        axios.get(`${serverAPIUrl}/api/dailySchedules/`)
            .then(res => setDailySchedules(res.data))
            .catch(err => console.error("DailySchedule error:", err));
    }, []);

    const handleScheduleToggleEdit = async (id) => {
        const isEditing = editMode[id];
        const schedule = schedules.find((s) => s._id === id);

        if (isEditing) {
            try {
                let updatedSchedule = schedule;

                if (String(schedule._id).startsWith("new-")) {
                    // 新資料 → POST
                    const { _id, ...payload } = schedule;

                    const res = await axios.post(`${serverAPIUrl}/api/schedules/`, payload);
                    updatedSchedule = res.data;

                    setSchedules((prev) =>
                        prev.map((s) => (s._id === id ? updatedSchedule : s))
                    );
                } else {
                    // 舊資料 → PUT
                    await axios.put(`${serverAPIUrl}/api/schedules/${id}`, schedule);
                }

                alert("儲存成功！");
            } catch (err) {
                console.error("儲存錯誤:", err);
                alert("儲存失敗！");
                return;
            }
        }

        // 切換編輯狀態
        setEditMode((prev) => ({ ...prev, [id]: !isEditing }));
    };

    const handleDailyScheduleToggleEdit = async (id) => {
        const isEditing = editMode[id];
        const dailySchedule = dailySchedules.find((s) => s._id === id);

        if (isEditing) {
            try {
                let updatedDailySchedule = dailySchedule;

                if (String(updatedDailySchedule._id).startsWith("new-")) {
                    // 新資料 → POST
                    const { _id, ...payload } = updatedDailySchedule;

                    const res = await axios.post(`${serverAPIUrl}/dailySchedules/`, payload);
                    updatedDailySchedule = res.data;

                    setDailySchedules((prev) =>
                        prev.map((s) => (s._id === id ? updatedDailySchedule : s))
                    );
                } else {
                    // 舊資料 → PUT
                    await axios.put(`${serverAPIUrl}/dailySchedules/${id}`, schedule);
                }

                alert("儲存成功！");
            } catch (err) {
                console.error("儲存錯誤:", err);
                alert("儲存失敗！");
                return;
            }
        }

        // 切換編輯狀態
        setEditMode((prev) => ({ ...prev, [id]: !isEditing }));
    };

    const handleScheduleDelete = async (id) => {

        const confirmDelete = window.confirm("你確定要刪除這筆資料嗎？");
        if (!confirmDelete) return;
        try {
            await axios.delete(`${serverAPIUrl}/schedules/${id}`);

            setSchedules((prev) => prev.filter((schedule) => schedule._id !== id));
            alert("刪除成功！");
        } catch (err) {
            console.error("刪除錯誤:", err);
            alert("刪除失敗，請稍後再試");
        }
    };
    const handleDailyDelete = async (id) => {

        const confirmDelete = window.confirm("你確定要刪除這筆資料嗎？");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${serverAPIUrl}/dailySchedules/${id}`);

            setDailySchedules((prev) => prev.filter((dailySchedule) => dailySchedule._id !== id));
            alert("刪除成功！");
        } catch (err) {
            console.error("刪除錯誤:", err);
            alert("刪除失敗，請稍後再試");
        }
    };

    const handleAdd = () => {
        const newCourse = {
            _id: "new-" + Date.now().toString(),
            title: "ENTER TITLE",
            subtitle: "SUBTITLE",
            description: "描述",
            date: "Date range",
        };
        setSchedules([...schedules, newCourse]);
    };

    const handleDailyScheduleAdd = () => {
        const newCourse = {
            _id: "new-" + Date.now().toString(),
            tiem: "time range",
            course: "action",

        };
        setDailySchedules([...dailySchedules, newCourse]);
    };

    const handleChange = (id, key, value) => {
        setSchedules(
            schedules.map((schedule) =>
                schedule._id === id ? { ...schedule, [key]: value } : schedule
            )
        );
    };

    const handleScheduleSettingChange = (id, key, value) => {
        setSchedulePageSettings(
            schedules.map((schedule) =>
                schedule._id === id ? { ...schedule, [key]: value } : schedule
            )
        );
    };
    const handleDailyChange = (id, key, value) => {
        setDailySchedules(
            dailyschedules.map((dailyschedule) =>
                dailyschedule._id === id ? { ...dailyschedule, [key]: value } : dailyschedule
            )
        );
    };
    const renderTable = () => (
        <div className="p-10 max-w-7xl mx-auto">
            <button
                onClick={handleAdd}
                className="mb-6 bg-green-500 text-white px-4 py-2 rounded"
            >
                Add Week
            </button>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Subtitle</th>
                        <th className="p-2 border">Discription</th>

                        <th className="p-2 border">Date Range</th>
                        <th className="p-2 border text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => {
                        const isEditing = editMode[schedule._id];
                        return (
                            <tr key={schedule._id} className="border-t text-sm">
                                {/* Title */}
                                <td className="p-2 border">
                                    {isEditing ? (
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={schedule.title}
                                            onChange={(e) =>
                                                handleChange(schedule._id, "title", e.target.value)
                                            }
                                        />
                                    ) : (
                                        schedule.title
                                    )}
                                </td>

                                {/* Subtitle */}
                                <td className="p-2 border">
                                    {isEditing ? (
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={schedule.subtitle}
                                            onChange={(e) =>
                                                handleChange(schedule._id, "subtitle", e.target.value)
                                            }
                                        />
                                    ) : (
                                        schedule.subtitle
                                    )}
                                </td>
                                {/* Discription */}
                                <td className="p-2 border">
                                    {isEditing ? (
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={schedule.description}
                                            onChange={(e) =>
                                                handleChange(schedule._id, "description", e.target.value)
                                            }
                                        />
                                    ) : (
                                        schedule.description
                                    )}
                                </td>
                                {/* Date */}
                                <td className="p-2 border">
                                    {isEditing ? (
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={schedule.date}
                                            onChange={(e) =>
                                                handleChange(schedule._id, "date", e.target.value)
                                            }
                                        />
                                    ) : (
                                        schedule.date
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="p-2 border text-center space-x-2">
                                    <button
                                        onClick={() => handleScheduleToggleEdit(schedule._id)}
                                        className={`px-3 py-1 rounded text-white ${isEditing ? "bg-blue-500" : "bg-yellow-500"
                                            }`}
                                    >
                                        {isEditing ? "SAVE" : "EDIT"}
                                    </button>
                                    <button
                                        onClick={() => handleScheduleDelete(schedule._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        DEL
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const dailyTable = () => (
        <div className="p-10 max-w-7xl mx-auto">
            <button
                onClick={handleDailyScheduleAdd}
                className="mb-6 bg-green-500 text-white px-4 py-2 rounded"
            >
                Add item
            </button>

            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        <th className="p-2 border">time</th>
                        <th className="p-2 border">course</th>
                        <th className="p-2 border text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dailySchedules.map((dailySchedule) => {
                        const isEditing = editMode[dailySchedule._id];
                        return (
                            <tr key={dailySchedule._id} className="border-t text-sm">
                                {/* Title */}
                                <td className="p-2 border">
                                    {isEditing ? (
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={dailySchedule.time}
                                            onChange={(e) =>
                                                handleDailyChange(dailySchedule._id, "time", e.target.value)
                                            }
                                        />
                                    ) : (
                                        dailySchedule.time
                                    )}
                                </td>

                                {/* Subtitle */}
                                <td className="p-2 border">
                                    {isEditing ? (
                                        <input
                                            className="w-full border rounded px-2 py-1"
                                            value={dailySchedule.course}
                                            onChange={(e) =>
                                                handleDailyChange(dailySchedule._id, "course", e.target.value)
                                            }
                                        />
                                    ) : (
                                        dailySchedule.course
                                    )}
                                </td>


                                {/* Actions */}
                                <td className="p-2 border text-center space-x-2">
                                    <button
                                        onClick={() => handleDailyScheduleToggleEdit(dailySchedule._id)}
                                        className={`px-3 py-1 rounded text-white ${isEditing ? "bg-blue-500" : "bg-yellow-500"
                                            }`}
                                    >
                                        {isEditing ? "SAVE" : "EDIT"}
                                    </button>
                                    <button
                                        onClick={() => handleDailyDelete(dailySchedule._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        DEL
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
    const handleUploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(`${serverAPIUrl}/upload-image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
 
            const imageUrl = res.data?.imageUrl || res.data?.path; // 視後端回傳格式而定
            if (!imageUrl) throw new Error("No image URL returned from server");

            // 假設你是要更新某個 state，例如 schedulesetting：
          setSchedulePageSettings(prev => {
  const updated = { ...prev, bg: imageUrl };
  console.log("🟢 更新 bg 成功：", updated);
  return updated;
});

            // 可選擇性顯示成功訊息
            // setStatus(`✅ 上傳成功！圖片路徑：${imageUrl}`);

        } catch (err) {
            console.error("上傳錯誤:", err);
            // setStatus(`❌ 圖片上傳失敗`);
        }
    };
    return (
        <>
            <div className="pt-20 pl-10">
                <form className="space-y-10"  >

                    <label >標題</label>
                    <input
                        value="url"

                        placeholder=" "
                        className="w-full border rounded"
                        required
                    />
                    <label >背景</label>
                    <img
                        src={`${serverUrl}${schedulePageSettings.bg}`}
                        className="w-full h-44 object-cover mb-2 rounded"

                    />
                    <input
                        value={schedulePageSettings.bg}
                        onChange={(e) =>
                            setSchedulePageSettings((prev) => ({
                                ...prev,
                                bg: e.target.value,
                            }))
                        }
                        placeholder="Image URL"
                        className="w-full border px-3 py-2 mb-2 rounded"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadImage(e.target.files[0])}
                        className="mb-3"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        save
                    </button>
                </form >

            </div >
            {renderTable()}
            {dailyTable()}
        </>



    );
}

export default ScheduleMaintance;
