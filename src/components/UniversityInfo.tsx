import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/UniversityInfo.css"; // ตรวจสอบว่ามี CSS ไฟล์นี้อยู่จริง

// Type สำหรับข้อมูลมหาวิทยาลัยตัวเดียว (เพราะเราส่งข้อมูลมหาวิทยาลัยตัวเดียวมา)
interface UniversityData {
    id?: number;
    uni_id: string; // ให้แน่ใจว่า uni_id มีค่า
    university_th: string;
    university_en: string;
    university_shortname?: string;
    university_type?: string;
    province?: string;
    website?: string;
    logo?: string;
    campuses?: string; // เปลี่ยนจาก any เป็น string หรือ Array<string> ตามข้อมูลจริง
    faculties?: string; // เปลี่ยนจาก any เป็น string (ถ้าเป็น JSON string)
    majors?: string; // เปลี่ยนจาก any เป็น string (ถ้าเป็น JSON string)
}

// Function เพื่อแปลง JSON String เป็น Array (ถ้าข้อมูล faculties/majors ถูกส่งมาเป็น string)
const safeParseJSON = (jsonString: string | undefined): string[] => {
    if (!jsonString) return [];
    try {
        // อาจจะต้องปรับตามรูปแบบ JSON จริงที่ได้รับมา เช่นถ้าเป็น Array of String
        const parsed = JSON.parse(jsonString);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Error parsing JSON string:", error);
        return [];
    }
};

// เปลี่ยนชื่อ Component เพื่อความชัดเจน
const UniversityInfo = () => {
    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    // เปลี่ยนชื่อ State ให้เป็น university แทน faculty เพื่อไม่ให้สับสน
    const [university, setUniversity] = useState<UniversityData | null>(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setMode(token ? "login" : "no-login");

        // ข้อมูลที่ส่งมาจาก navigate("/faculty", { state: universityData })
        const data: UniversityData | null = location.state as UniversityData | null;
        console.log("STATE (University Data) =", data);

        if (data && data.uni_id) { // ตรวจสอบว่ามีข้อมูลและมี uni_id (key หลัก)
            setUniversity(data);
        }
        setLoading(false);
    }, [location.state]);

    // **ลบ Function faculty_data** เพราะตอนนี้เรามีข้อมูลอยู่ใน state 'university' แล้ว

    const renderUniversityContent = () => {
        if (loading) {
            return <div className="text-center p-5 text-lg">กำลังโหลดข้อมูล... ⏳</div>;
        }

        if (!university) {
            return <div className="text-center p-5 text-lg">ไม่พบข้อมูลมหาวิทยาลัยที่ค้นหา 🧐</div>;
        }

        // ดึงและแปลงข้อมูล faculties/majors ที่อาจเป็น JSON String
        const facultyList = safeParseJSON(university.faculties);
        const majorList = safeParseJSON(university.majors);
        console.log("Parsed Faculties =", facultyList);
        console.log("Parsed Majors =", majorList);

        return (
            <div className="uni-container-main bg-white shadow-lg rounded-xl p-8 max-w-4xl mx-auto my-10 border-t-4 border-blue-500">
                
                {/* --- Header/Logo Section --- */}
                <div className="flex items-center space-x-6 pb-6 border-b mb-6">
                    {university.logo && (
                        <img src={university.logo} alt={`${university.university_shortname} logo`} className="w-20 h-20 object-contain rounded-full border p-1" />
                    )}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{university.university_th}</h1>
                        <p className="text-xl text-gray-600">{university.university_en}</p>
                        <p className="text-sm text-gray-400">({university.university_shortname})</p>
                    </div>
                </div>
                
                {/* --- General Information --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-8">
                    <p>
                        <span className="font-semibold text-blue-600">ประเภท:</span> {university.university_type || '-'}
                    </p>
                    <p>
                        <span className="font-semibold text-blue-600">ที่ตั้ง:</span> {university.province || '-'}
                    </p>
                    <p className="col-span-1 md:col-span-2">
                        <span className="font-semibold text-blue-600">เว็บไซต์:</span> 
                        <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                            {university.website || 'ไม่มีข้อมูล'}
                        </a>
                    </p>
                </div>
                
                {/* --- Faculties Section --- */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">คณะที่เปิดสอน ({facultyList.length})</h2>
                {facultyList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {facultyList.map((item, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg shadow-sm text-sm border-l-4 border-yellow-500">
                                {item}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">ไม่พบข้อมูลคณะที่เปิดสอน</p>
                )}
                
                {/* --- Majors Section (Optional, ถ้ามีข้อมูล) --- */}
                {majorList.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2">สาขาที่เปิดสอน ({majorList.length})</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                            {majorList.map((item, index) => (
                                <span key={index} className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full text-center">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </>
                )}

            </div>
        );
    };

    return (
        <>
            {mode === "login" ? <Navlogin /> : <Nav />}

            <div className="suggestion-header pt-10 pb-10">
                <div className="results-header text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-blue-800">ข้อมูลมหาวิทยาลัย</h1>
                </div>
                
                {renderUniversityContent()}
            </div>
        </>
    );
};

export default UniversityInfo;