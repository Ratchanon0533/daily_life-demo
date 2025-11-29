import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface University {
    id?: number;
    university?: string;
    university_shortname?: string;
    university_type?: string;
    province?: string;
    website?: string;
    logo?: string;
    type?: string;
    faculties?: string[];
    departments?: string[];
    programs?: string[];
}

const UN = () => {
    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const [universities, setUniversities] = useState<University[]>([]);  // <<< FIX HERE

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setMode(token ? "login" : "no-login");

        const data: any = location.state;
        console.log("STATE =", data);

        if (data && data.message) {
            setUniversities(data.message);
        }
    }, [location.state]);

    return (
        <>
            {mode === "login" ? (
                <>
                    <Navlogin />

                    <div className="suggestion-header">
                        {universities.length > 0 ? (
                            universities.map((u, index) => (
                                <div key={index}>
                                    <div>{u.university}</div>
                                    <div>{u.id}</div>
                                    <div>{u.university_shortname}</div>
                                    <div>{u.university_type}</div>
                                    <div>{u.province}</div>
                                    <div>{u.website}</div>
                                    <img src={u.logo} alt="" />
                                    <div>{u.type}</div>
                                    <div>{u.faculties?.join(", ")}</div>
                                    <div>{u.departments?.join(", ")}</div>
                                    <div>{u.programs?.join(", ")}</div>
                                    
                                </div>
                            ))
                        ) : (
                            "กำลังโหลดข้อมูล..."
                        )}
                    </div>
                </>
            ) : (
                <>
                    <Navlogin />

                    <div className="suggestion-header">
                        {universities.length > 0 ? (
                            universities.map((u, index) => (
                                <div key={index}>
                                    <div>{u.university}</div>
                                    <div>{u.id}</div>
                                    <div>{u.university_shortname}</div>
                                    <div>{u.university_type}</div>
                                    <div>{u.province}</div>
                                    <div>{u.website}</div>
                                    <img src={u.logo} alt="" />
                                    <div>{u.type}</div>
                                    <div>{u.faculties?.join(", ")}</div>
                                    <div>{u.departments?.join(", ")}</div>
                                    <div>{u.programs?.join(", ")}</div>
                                    
                                </div>
                            ))
                        ) : (
                            "กำลังโหลดข้อมูล..."
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default UN;
