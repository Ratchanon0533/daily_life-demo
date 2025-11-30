import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/UniversityInfo.css";

interface UniversityData {
    id?: number;
    uni_id?: string;
    university_th?: string;
    university_en?: string;
    university_shortname?: string;
    university_type?: string;
    province?: string;
    website?: string;
    logo?: string;
    campuses?: any;
    faculties?: any; // อาจเป็น string (JSON) หรือ array
    majors?: any;    // อาจเป็น string (JSON) หรือ array
}

// ฟังก์ชั่นแปลง JSON String เป็น Array
const safeParseJSON = (data: any): string[] => {
    if (!data) return [];
    
    // ถ้าเป็น array อยู่แล้ว
    if (Array.isArray(data)) {
        return data.map((item) => {
            // ถ้า item เป็น object ให้ดึง faculty_name หรือ name
            if (typeof item === "object" && item !== null) {
                return item.faculty_name || item.name || item.major_name || JSON.stringify(item);
            }
            return String(item);
        });
    }
    
    // ถ้าเป็น object เดี่ยว (ไม่ใช่ array)
    if (typeof data === "object" && data !== null) {
        // ถ้า object มี faculty_name
        if (data.faculty_name) return [data.faculty_name];
        // ถ้า object มี keys ให้ loop
        return Object.values(data)
            .filter(v => typeof v === "string")
            .map(String);
    }
    
    // ถ้าเป็น string ให้ parse
    if (typeof data === "string") {
        try {
            const parsed = JSON.parse(data);
            // recursive call สำหรับ parsed result
            return safeParseJSON(parsed);
        } catch {
            // ถ้า parse ไม่ได้ ให้ return string เป็น array
            return [data];
        }
    }
    
    return [];
};

const UniversityInfo = () => {
    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const [university, setUniversity] = useState<UniversityData | null>(null);
    const [faculties, setFaculties] = useState<string[]>([]);
    const [majors, setMajors] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setMode(token ? "login" : "no-login");

        // ข้อมูลที่ส่งมา
        const data = location.state as UniversityData | null;
        console.log("University Data:", data);

        if (data) {
            setUniversity(data);
            setFaculties(safeParseJSON(data.faculties));
            setMajors(safeParseJSON(data.majors));
        }
        setLoading(false);
    }, [location.state]);

    if (loading) {
        return (
            <>
                {mode === "login" ? <Navlogin /> : <Nav />}
                <div className="text-center p-10 text-lg">กำลังโหลดข้อมูล... ⏳</div>
            </>
        );
    }

    if (!university) {
        return (
            <>
                {mode === "login" ? <Navlogin /> : <Nav />}
                <div className="text-center p-10 text-lg text-red-600">❌ ไม่พบข้อมูลมหาวิทยาลัย</div>
            </>
        );
    }

    return (
        <>
            {mode === "login" ? <Navlogin /> : <Nav />}

            <div className="suggestion-header pt-10 pb-10">
                <div className="results-header text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-blue-800">🎓 ข้อมูลมหาวิทยาลัย</h1>
                </div>

                <div className="uni-container-main bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto my-10 border-t-4 border-blue-500">
                    
                    {/* --- Header/Logo Section --- */}
                    <div className="flex items-center space-x-6 pb-6 border-b mb-6">
                        {university.logo ? (
                            <img 
                                src={university.logo} 
                                alt={university.university_shortname} 
                                className="w-20 h-20 object-contain rounded-full border p-1"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">🏛️</div>
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {university.university_th || "ไม่ระบุชื่อ"}
                            </h1>
                            <p className="text-xl text-gray-600">
                                {university.university_en || ""}
                            </p>
                            <p className="text-sm text-gray-400">
                                ({university.university_shortname || "-"})
                            </p>
                        </div>
                    </div>

                    {/* --- General Information --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-8">
                        <div>
                            <span className="font-semibold text-blue-600">📋 ประเภท:</span> 
                            <span className="ml-2">{university.university_type || "-"}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-blue-600">📍 ที่ตั้ง:</span> 
                            <span className="ml-2">{university.province || "-"}</span>
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <span className="font-semibold text-blue-600">🌐 เว็บไซต์:</span> 
                            {university.website ? (
                                <a 
                                    href={university.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:underline ml-2"
                                >
                                    {university.website}
                                </a>
                            ) : (
                                <span className="ml-2 text-gray-400">ไม่มีข้อมูล</span>
                            )}
                        </div>
                    </div>

                    {/* --- Faculties Section --- */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                            📚 คณะที่เปิดสอน ({faculties.length})
                        </h2>
                        {faculties.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {faculties.map((faculty, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-yellow-50 p-4 rounded-lg shadow-sm border-l-4 border-yellow-500"
                                    >
                                        <p className="text-sm font-medium text-gray-800">✓ {faculty}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">ไม่พบข้อมูลคณะที่เปิดสอน</p>
                        )}
                    </div>

                    {/* --- Majors Section --- */}
                    {majors.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                                📖 สาขาวิชา ({majors.length})
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                {majors.map((major, index) => (
                                    <span 
                                        key={index} 
                                        className="bg-green-100 text-green-700 text-xs font-medium px-3 py-2 rounded-full text-center"
                                    >
                                        {major}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default UniversityInfo;