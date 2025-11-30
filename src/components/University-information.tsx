import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { 
        // useNavigate,
        useLocation 
       }
     from "react-router-dom";
=======
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> dev
import "./css/University-information.css";

interface University {
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
    faculties?: any;
    majors?: any;
}

const UN = () => {
    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const [universities, setUniversities] = useState<University[]>([]);
    const [loading, setLoading] = useState(true);

    // const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setMode(token ? "login" : "no-login");

        const data: any = location.state;
        console.log("STATE =", data);

        if (data && data.data) {
<<<<<<< HEAD
            setUniversities(data.data);
=======
            setUniversities(Array.isArray(data.data) ? data.data : [data.data]);
        } else if (data && Array.isArray(data)) {
            setUniversities(data);
        } else if (data) {
            setUniversities([data]);
>>>>>>> dev
        }
        setLoading(false);
    }, [location.state]);

    // Parse JSON string to array
    const parseJsonField = (field: any): string[] => {
        if (!field) return [];
<<<<<<< HEAD
        if (typeof field === 'string') {
            try {
                const parsed = JSON.parse(field);
                if (Array.isArray(parsed)) {
                    return parsed.map(item => item.faculty_name || item.major_name || item.campus_name || item);
                }
            } catch (e) {
                return [];
            }
        }
        return [];
    };

    const renderContent = () => {
        if (loading) {
            return <div className="text-center p-5">กำลังโหลดข้อมูล...</div>;
        }

        if (universities.length === 0) {
            return <div className="text-center p-5">ไม่พบข้อมูลมหาวิทยาลัยที่ค้นหา</div>;
=======

        // ถ้าเป็น array อยู่แล้ว
        if (Array.isArray(field)) {
            return field
                .map((item) => {
                    if (typeof item === "object" && item !== null) {
                        return item.faculty_name || item.major_name || item.campus_name || item.name || String(item);
                    }
                    return String(item);
                })
                .filter((item) => item && item.trim() !== "");
        }

        // ถ้าเป็น string ให้ parse
        if (typeof field === "string") {
            try {
                const parsed = JSON.parse(field);
                if (Array.isArray(parsed)) {
                    return parseJsonField(parsed); // recursive
                } else if (typeof parsed === "object" && parsed !== null) {
                    return Object.values(parsed)
                        .filter((v) => typeof v === "string")
                        .map(String)
                        .filter((item) => item && item.trim() !== "");
                }
            } catch (e) {
                console.warn("Failed to parse JSON:", e);
                return [];
            }
        }

        // ถ้าเป็น object
        if (typeof field === "object" && field !== null) {
            const values = Object.values(field)
                .filter((v) => typeof v === "string")
                .map(String);
            return values.filter((item) => item && item.trim() !== "");
        }

        return [];
    };

    // ฟังก์ชั่นดูรายละเอียดคณะ
    const handleFacultyClick = (uni: University) => {
        if (!uni.uni_id) {
            console.warn("Error: University ID (uni_id) not found.");
            return;
        }

        const foundUniversity = universities.find((u) => u.uni_id === uni.uni_id);
        if (foundUniversity) {
            navigate("/faculty", { state: foundUniversity });
        } else {
            console.error(`Error: University ID ${uni.uni_id} not found.`);
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center p-5 text-lg text-gray-600">
                    ⏳ กำลังโหลดข้อมูล...
                </div>
            );
        }

        if (universities.length === 0) {
            return (
                <div className="text-center p-10 text-lg text-red-600">
                    ❌ ไม่พบข้อมูลมหาวิทยาลัยที่ค้นหา
                </div>
            );
>>>>>>> dev
        }

        return (
            <div className="universities-container">
                {universities.map((u, index) => (
                    <div key={index} className="university-card">
<<<<<<< HEAD
                        <div className="university-header">
                            {u.logo && <img src={u.logo} alt={u.university_th} className="university-logo" />}
                            <div className="university-info">
                                <h2>{u.university_th}</h2>
                                <p className="university-en">{u.university_en}</p>
                                <div className="university-meta">
                                    <span className="badge shortname">{u.university_shortname}</span>
                                    <span className="badge type">{u.university_type}</span>
=======
                        {/* Header */}
                        <div className="university-header">
                            {u.logo ? (
                                <img src={u.logo} alt={u.university_th || "University"} className="university-logo" />
                            ) : (
                                <div className="university-logo-placeholder">📚</div>
                            )}
                            <div className="university-info">
                                <h2>{u.university_th || "ไม่ระบุชื่อ"}</h2>
                                <p className="university-en">{u.university_en || ""}</p>
                                <div className="university-meta">
                                    {u.university_shortname && <span className="badge shortname">{u.university_shortname}</span>}
                                    {u.university_type && <span className="badge type">{u.university_type}</span>}
>>>>>>> dev
                                </div>
                            </div>
                        </div>

<<<<<<< HEAD
                        <div className="university-details">
                            <div className="detail-item">
                                <label>จังหวัด:</label>
                                <span>{u.province}</span>
                            </div>

                            <div className="detail-item">
                                <label>เว็บไซต์:</label>
                                <a href={u.website} target="_blank" rel="noopener noreferrer">{u.website}</a>
                            </div>

                            {parseJsonField(u.campuses).length > 0 && (
                                <div className="detail-item">
                                    <label>วิทยาเขต:</label>
                                    <span>{parseJsonField(u.campuses).join(", ")}</span>
=======
                        {/* Details */}
                        <div className="university-details">
                            {u.province && (
                                <div className="detail-item">
                                    <label>📍 จังหวัด:</label>
                                    <span>{u.province}</span>
                                </div>
                            )}

                            {u.website && (
                                <div className="detail-item">
                                    <label>🌐 เว็บไซต์:</label>
                                    <a href={u.website} target="_blank" rel="noopener noreferrer" className="link">
                                        {u.website}
                                    </a>
                                </div>
                            )}

                            {parseJsonField(u.campuses).length > 0 && (
                                <div className="detail-item">
                                    <label>🏫 วิทยาเขต:</label>
                                    <div className="field-list">
                                        {parseJsonField(u.campuses).map((campus, i) => (
                                            <span key={i} className="badge-info">
                                                {campus}
                                            </span>
                                        ))}
                                    </div>
>>>>>>> dev
                                </div>
                            )}

                            {parseJsonField(u.faculties).length > 0 && (
                                <div className="detail-item">
<<<<<<< HEAD
                                    <label>คณะ:</label>
                                    <span>{parseJsonField(u.faculties).join(", ")}</span>
=======
                                    <label>🎓 คณะ:</label>
                                    <div className="field-list">
                                        {parseJsonField(u.faculties).map((faculty, i) => (
                                            <span key={i} className="badge-info">
                                                {faculty}
                                            </span>
                                        ))}
                                    </div>
>>>>>>> dev
                                </div>
                            )}

                            {parseJsonField(u.majors).length > 0 && (
                                <div className="detail-item">
<<<<<<< HEAD
                                    <label>สาขา:</label>
                                    <span>{parseJsonField(u.majors).join(", ")}</span>
=======
                                    <label>📖 สาขา:</label>
                                    <div className="field-list">
                                        {parseJsonField(u.majors).slice(0, 5).map((major, i) => (
                                            <span key={i} className="badge-minor">
                                                {major}
                                            </span>
                                        ))}
                                        {parseJsonField(u.majors).length > 5 && (
                                            <span className="badge-minor">+{parseJsonField(u.majors).length - 5} อื่น ๆ</span>
                                        )}
                                    </div>
>>>>>>> dev
                                </div>
                            )}
                        </div>

<<<<<<< HEAD
                        <div className="university-actions">
                            <button className="btn btn-primary">ดูรายละเอียด</button>
                            <button className="btn btn-secondary">เพิ่มเป็นรายการโปรด</button>
=======
                        {/* Actions */}
                        <div className="university-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleFacultyClick(u)}
                            >
                                ดูรายละเอียด →
                            </button>
                            <button className="btn btn-secondary">
                                ⭐ เพิ่มรายการโปรด
                            </button>
>>>>>>> dev
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            {mode === "login" ? <Navlogin /> : <Nav />}

            <div className="suggestion-header">
                <div className="results-header">
<<<<<<< HEAD
                    <h1>ผลการค้นหามหาวิทยาลัย</h1>
                    <p>พบข้อมูล {universities.length} มหาวิทยาลัย</p>
=======
                    <h1>📚 ผลการค้นหามหาวิทยาลัย</h1>
                    <p>พบข้อมูล <strong>{universities.length}</strong> มหาวิทยาลัย</p>
>>>>>>> dev
                </div>
                {renderContent()}
            </div>
        </>
    );
};

export default UN;