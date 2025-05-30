const Schedules = ({ data }) => {
    return (
      <div className="p-6  bg-white/50 min-h-screen text-sm">
        <h1 className="text-2xl font-bold text-center mb-8 text-blue-800">Orientation Schedule</h1>
  
        {data.map((day, idx) => (
          <div key={idx} className="mb-10">
            <div className="bg-blue-200 px-4 py-2 font-semibold text-gray-800">
              {day.date} ({day.day})
            </div>
  
            <table className="w-full border border-gray-300 text-left table-fixed">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                 <th className="border border-gray-300 p-2 w-[15%]">Time</th>
    <th className="border border-gray-300 p-2 w-[35%]">Session</th>
    <th className="border border-gray-300 p-2 w-[35%]">Presentation By</th>
    <th className="border border-gray-300 p-2 w-[15%]">Duration</th>
                </tr>
              </thead>
              <tbody>
                {day.rows.map((row, i) => (
                  <tr key={i} className="border-t border-gray-200">
                    <td className="p-2 align-top">{row.time}</td>
                    <td className="p-2 align-top whitespace-pre-line">{row.session}</td>
                    <td className="p-2 align-top whitespace-pre-line">{row.presenter}</td>
                    <td className="p-2 align-top">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
  
        <p className="text-center text-sm mt-8 text-gray-500 font-medium">
          Commencement of Regular Classes from <span className="font-semibold">09.09.2021</span>
        </p>
      </div>
    );
  };
  
  export default Schedules;