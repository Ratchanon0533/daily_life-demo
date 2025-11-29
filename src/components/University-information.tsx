import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useEffect, useState } from "react";
import { 
        // useNavigate,
        useLocation 
       }
     from "react-router-dom";
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
            setUniversities(data.data);
        }
        setLoading(false);
    }, [location.state]);

    // Parse JSON string to array
    const parseJsonField = (field: any): string[] => {
        if (!field) return [];
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
        }

        return (
            <div className="universities-container">
                {universities.map((u, index) => (
                    <div key={index} className="university-card">
                        <div className="university-header">
                            {u.logo && <img src={u.logo} alt={u.university_th} className="university-logo" />}
                            <div className="university-info">
                                <h2>{u.university_th}</h2>
                                <p className="university-en">{u.university_en}</p>
                                <div className="university-meta">
                                    <span className="badge shortname">{u.university_shortname}</span>
                                    <span className="badge type">{u.university_type}</span>
                                </div>
                            </div>
                        </div>

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
                                </div>
                            )}

                            {parseJsonField(u.faculties).length > 0 && (
                                <div className="detail-item">
                                    <label>คณะ:</label>
                                    <span>{parseJsonField(u.faculties).join(", ")}</span>
                                </div>
                            )}

                            {parseJsonField(u.majors).length > 0 && (
                                <div className="detail-item">
                                    <label>สาขา:</label>
                                    <span>{parseJsonField(u.majors).join(", ")}</span>
                                </div>
                            )}
                        </div>

                        <div className="university-actions">
                            <button className="btn btn-primary">ดูรายละเอียด</button>
                            <button className="btn btn-secondary">เพิ่มเป็นรายการโปรด</button>
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
                    <h1>ผลการค้นหามหาวิทยาลัย</h1>
                    <p>พบข้อมูล {universities.length} มหาวิทยาลัย</p>
                </div>
                {renderContent()}
            </div>
        </>
    );
};

export default UN;