import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import OrientationSchedule from "./components/OrientationSchedule";
import Layout from "./components/Layout";
import SlideUploader from "./components/SlideUploader";
import Services from "./components/Services";
import CardManager from "./components/CardManager";
import LoginForm from "./components/LoginForm";
import AdminPanel from "./components/AdminPanel";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import ScheduleMaintance from "./components/ScheduleMaintance";
import AboutAdmin from "./components/AboutAdmin";



function App() {


    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("isLoggedIn") === "true"
    );

    useEffect(() => {
        const checkLogin = () => {
            setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
            alert("aaa");
        };

        window.addEventListener("storage", checkLogin); // cross-tab sync
        return () => window.removeEventListener("storage", checkLogin);
    }, []);
    return (
        <Router>
            <div className="min-h-screen"> {/* 设置背景色为鹅黄色，并确保最小高度为屏幕高度 */}
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <div className="w-full">
                    <div className="grid place-items-center h-screen">
                        <Routes>
                            <Route path="/" element={<Layout><Home /></Layout>} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/schedules" element={<Layout><OrientationSchedule /></Layout>} />
                            <Route path="/contact" element={<Layout><Contact /></Layout>} />
                            <Route path="/admin/slide" element={<SlideUploader />} />
                            <Route path="/service" element={<Services />} />
                            <Route path="/admin/cards" element={<CardManager />} />
                            <Route path="/admin" element={<LoginForm />} />
                            <Route path="/admin/adminPanel" element={<ProtectedRoute>

                                <AdminPanel />
                            </ProtectedRoute>} />
 
                            {/* <Route path="/admin/ScheduleForm" element={<ScheduleForm />} /> */}
                            <Route path="/admin/scheduleMaintance" element={<ProtectedRoute><Layout><ScheduleMaintance /></Layout></ProtectedRoute>} />
                            <Route path="/admin/aboutAdmin" element={<ProtectedRoute>
                                <AboutAdmin />
                            </ProtectedRoute>} />

                        </Routes>

                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;