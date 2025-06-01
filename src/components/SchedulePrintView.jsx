 
import { useEffect, useState } from "react";
import axios from "axios";


const SchedulePrintView = ({ data }) => {
    const [schedule, setSchedule] = useState([]);
    const [dailySchedule, setDailySchedule] = useState([]);
    const serverAPIUrl = import.meta.env.VITE_SERVER_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [schedulesRes, coursesRes] = await axios.all([
                    axios.get(`${serverAPIUrl}/api/schedules`),
                    axios.get(`${serverAPIUrl}/api/dailySchedules`),
                ]);

                setSchedule(schedulesRes.data);
                setDailySchedule(coursesRes.data);
            } catch (err) {
                console.error("資料載入錯誤", err);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="max-w-5xl mx-auto mt-20 p-6 bg-white/50 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Summer Camp Weeks</h2>

            <div className="grid grid-cols-1 gap-10">
                {schedule.map((schedule, index) => (
                    <div
                        key={schedule._id || index}
                        className="bg-[#ffdeb9] rounded-xl p-6 border border-orange-800 shadow-sm text-center"
                    >
                        <div className="bg-[#f16144] text-white font-bold text-sm px-6 py-2 rounded-full inline-block mb-2">
                            {schedule.title || `WEEK ${index + 1}`}
                        </div>
                        <div className="text-orange-700 text-base font-semibold mb-2">{schedule.subtitle}</div>
                        <div className="text-green-900 text-sm font-medium mb-1">{schedule.description}</div>
                        <div className="text-green-800 text-sm font-medium italic">{schedule.date}</div>
                    </div>
                ))}
            </div>
            <div className="max-w-3xl mx-auto mt-20 p-6 bg-white rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">Daily Schedule</h2>

                <table className="w-full table-fixed border border-gray-300">
                    <thead className="bg-orange-100">
                        <tr>
                            <th className="w-1/3 border border-gray-300 px-4 py-2 text-left">Time</th>
                            <th className="w-2/3 border border-gray-300 px-4 py-2 text-left">Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailySchedule.map((item, index) => (
                            <tr key={index} className="odd:bg-white even:bg-orange-50">
                                <td className="border border-gray-300 px-4 py-2 font-medium">{item.time}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.course}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default SchedulePrintView;
