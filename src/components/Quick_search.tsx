import Navnologin from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuickSearch = () => {

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
            {/* ================= USER LOGGED IN ================= */}
            {mode === "login" && (
                <>
                    <Navlogin />
                    <div>ยินดีต้อนรับผู้ใช้ที่ล็อกอินแล้ว!</div>

                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/Register");
                        }}
                    >
                        Logout
                    </button>
                </>
            )}

            {/* ================= USER NOT LOGGED IN ================= */}
            {mode === "no-login" && (
                <>
                    <Navnologin />
                    <div>ผู้ใช้ยังไม่ล็อกอิน!</div>
                </>
            )}
        </>
    );
};

export default QuickSearch;
