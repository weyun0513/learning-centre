function Services(){
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">我們的服務</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {[
          { title: "嬰幼兒照護 (0-2歲)", desc: "專業保育員，溫馨照顧您的寶寶。" },
          { title: "學前教育 (3-5歲)", desc: "提供優質學前教育，培養孩子的學習能力。" },
          { title: "課後托管 (6-12歲)", desc: "安全環境，幫助孩子完成作業並學習新技能。" }
        ].map((service, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="mt-2 text-gray-700">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
 };
  export default Services;