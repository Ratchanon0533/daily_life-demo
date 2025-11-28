import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navnologin from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import AboutCarousel from "./about-carousel";
import Aboutmain from "./about-main";
import Contact from "./contact";

const About = () => {

    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setMode("login");
        } else {
            setMode("no-login");
        }
    }, []);

    return (
        <>
            {/* ============ ผู้ใช้ล็อกอินแล้ว ============ */}
            {mode === "login" && (
                <>
                    <Navlogin />
                    <AboutCarousel />
                    <Aboutmain />
                    
                    <h1>This is the Promotion Page</h1>
                    <p>🎉 คุณสามารถดูโปรโมชั่นพิเศษได้เพราะคุณล็อกอินแล้ว</p>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/Register");
                        }}
                    >
                        Logout
                    </button>
                    <Contact />
                </>
            )}

            {/* ============ ผู้ใช้ยังไม่ล็อกอิน ============ */}
            {mode === "no-login" && (
                <>
                    <Navnologin />
                    <AboutCarousel />
                    <Aboutmain />
                    
                    <h1>This is the Promotion Page</h1>
                    <p>⚠ กรุณาเข้าสู่ระบบเพื่อดูโปรโมชั่นทั้งหมด</p>
                    <Contact />
                </>
            )}
        </>
    );
};

export default About;
