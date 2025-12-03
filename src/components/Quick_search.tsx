import Navnologin from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import QuicksearchMain from "./quick-search-main";
import QuicksearchCarousel from "./quicksearch-carousel";

const QuickSearch = () => {

    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    // const navigate = useNavigate();

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
                    <QuicksearchCarousel />
                    <QuicksearchMain />
                </>
            )}

            {/* ================= USER NOT LOGGED IN ================= */}
            {mode === "no-login" && (
                <>
                    <Navnologin />
                    <QuicksearchCarousel />
                    <QuicksearchMain />
                    
                </>
            )}


        </>
    );
};

export default QuickSearch;
