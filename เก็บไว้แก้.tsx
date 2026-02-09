import Nav from './nav-bar';
import Navlogin from './nav-bar(login)';
import styles from './css/portfolio.module.css';
import Contact from './contact';
import { useState, useMemo, useEffect } from 'react';
import {
    getDaysInMonth,
    format,
} from 'date-fns';
import { th } from 'date-fns/locale';

interface PersonalInfo {
    portfolio_name?: string | null;
    introduce?: string | null;
    prefix?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    date_birth?: string | null;
    nationality?: string | null;
    national_id?: string | null;
    phone_number1?: string | null;
    phone_number2?: string | null;
    email?: string | null;
    address?: string | null;
    province?: string | null;
    district?: string | null;
    subdistrict?: string | null;
    postal_code?: string | null;
    height?: string | null;
    weight?: string | null;
    gender?: string | null;
    marital_status?: string | null;
    disability?: string | null;
    military_status?: string | null;
    image?: File | string | null;
}

interface EducationalItem {
    number?: number | null;
    school?: string | null;
    graduation?: string | null;
    educational_qualifications?: string | null;
    province?: string | null;
    district?: string | null;
    study_path?: string | null;
    grade_average?: string | number | null;
    study_results?: string | null;
}

interface LanguageSkill {
    language?: string | null;
    listening?: string | null;
    speaking?: string | null;
    reading?: string | null;
    writing?: string | null;
}

interface SkillsAbilities {
    details?: string | null;
    language_skills?: LanguageSkill[] | null;
}

interface ActivityCertificate {
    number?: number | null;
    name_project?: string | null;
    date?: string | null;
    photo?: string | null;
    details?: string | null;
}

interface UniversityChoice {
    university?: string | null;
    faculty?: string | null;
    major?: string | null;
    details?: string | null;
}

interface CreatePortRequest {
    user_id: number | string;
    port_id: string;
    personal_info?: PersonalInfo | null;
    educational?: EducationalItem[] | null;
    skills_abilities?: SkillsAbilities | null;
    activities_certificates?: ActivityCertificate[] | null;
    university_choice?: UniversityChoice[] | null;
}

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
}

// Interface สำหรับข้อมูลที่ API /getport ส่งกลับมา (จากตัวอย่าง JSON ที่คุณให้)
interface PortfolioItem {
    port_id: string;
    personal_info: {
        id: number;
        port_id: string;
        portfolio_name: string | null;
        introduce: string | null;
        prefix: string | null;
        first_name: string | null;
        last_name: string | null;
        date_birth: string | null;
        nationality: string | null;
        national_id: string | null;
        phone_number1: string | null;
        phone_number2: string | null;
        email: string | null;
        address: string | null;
        province: string | null;
        district: string | null;
        subdistrict: string | null;
        postal_code: string | null;
    } | null;
}

const Portfolio = () => {
    const [showPopup, setShowPopup] = useState(false);

    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        personal: false,
        education: false,
        talent: false,
        certificate: false,
        university: false,
    });

    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const [port, setPort] = useState<"allport" | "create">("allport"); // แก้จาก setAllport เป็น setPort

    const [allPorts, setAllPorts] = useState<PortfolioItem[]>([]);
    const [loadingPorts, setLoadingPorts] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setMode(token ? "login" : "no-login");
    }, []);

    // ดึง userId จาก localStorage
    const [userId, setUserId] = useState<number | string>('');
    const [portId, setPortId] = useState<string>('');

    useEffect(() => {
        const tryGet = (keys: string[]) => {
            for (const k of keys) {
                const v = localStorage.getItem(k);
                if (v) return v;
            }
            return null;
        };

        const raw = tryGet(['user_id', 'userId', 'userid', 'user']);
        if (raw) {
            try {
                const maybeObj = JSON.parse(raw) as User;
                if (maybeObj?.id) {
                    setUserId(maybeObj.id);
                } else {
                    const num = Number(raw);
                    setUserId(isNaN(num) ? raw : num);
                }
            } catch {
                const num = Number(raw);
                setUserId(isNaN(num) ? raw : num);
            }
        }

        // สร้าง portId ใหม่ถ้ายังไม่มี
        if (!portId) {
            const seed = localStorage.getItem('user_id') || localStorage.getItem('userId') || 'anon';
            setPortId(`port_${seed}_${Date.now()}`);
        }
    }, [portId]);

    // ดึงพอร์ตทั้งหมดของ user
    const fetchAllPorts = async () => {
        if (!userId) {
            console.log("ไม่พบ userId ใน localStorage");
            setFetchError("กรุณาเข้าสู่ระบบอีกครั้ง");
            setLoadingPorts(false);
            return;
        }

        try {
            setLoadingPorts(true);
            setFetchError(null);

            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/getport/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`ดึงข้อมูลล้มเหลว: ${res.status} - ${errorText}`);
            }

            const data = await res.json();
            console.log("ข้อมูลพอร์ตทั้งหมด:", data);

            // ตรวจสอบโครงสร้างจริงจาก API
            if (data.success && Array.isArray(data.data)) {
                setAllPorts(data.data);
            } else {
                setAllPorts([]);
            }
        } catch (err: any) {
            console.error("เกิดข้อผิดพลาดตอน fetch:", err);
            setFetchError(err.message || "ไม่สามารถดึงข้อมูลพอร์ตได้");
        } finally {
            setLoadingPorts(false);
        }
    };

    useEffect(() => {
        if (mode === "login" && userId) {
            fetchAllPorts();
        }
    }, [mode, userId]);

    // ────────────────────────────────────────────────
    // ส่วนอื่น ๆ (personal, education, date picker, save ฯลฯ) ยังคงเหมือนเดิมทั้งหมด
    // ────────────────────────────────────────────────

    const toggleSection = (key: string) => {
        setOpenSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const [day, setDay] = useState<number>(1);
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const daysInMonth = useMemo(() => {
        const date = new Date(year, month);
        return getDaysInMonth(date);
    }, [month, year]);

    const thaiMonths = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            name: format(new Date(2024, i, 1), 'MMMM', { locale: th }),
            value: i
        }));
    }, []);

    const [showEducation, setShowEducation] = useState(false);
    const [showTalent, setShowTalent] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showUniversity, setShowUniversity] = useState(false);
    const [showPersonal, setShowPersonal] = useState(false);

    useEffect(() => {
        if (openSections.personal) setShowPersonal(true);
        else if (showPersonal) {
            const timeout = setTimeout(() => setShowPersonal(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.personal]);

    // ... useEffect อื่น ๆ สำหรับ showEducation, showTalent ฯลฯ เหมือนเดิม

    const [Personal, setPersonal] = useState<PersonalInfo>({
        portfolio_name: '',
        introduce: '',
        prefix: '',
        first_name: '',
        last_name: '',
        date_birth: '',
        nationality: '',
        national_id: '',
        phone_number1: '',
        phone_number2: '',
        email: '',
        address: '',
        province: '',
        district: '',
        subdistrict: '',
        postal_code: ''
    });

    useEffect(() => {
        try {
            const d = new Date(year, month, day);
            if (!isNaN(d.getTime())) {
                setPersonal(prev => ({ ...prev, date_birth: d.toISOString().slice(0, 10) }));
            }
        } catch {}
    }, [day, month, year]);

    const updatePersonal = (field: keyof PersonalInfo, value: any) => {
        setPersonal(prev => ({ ...prev, [field]: value }));
    };

    // ... ฟังก์ชัน update อื่น ๆ (educational, skillsAbilities, etc.) เหมือนเดิมทั้งหมด

    const [educational, setEducational] = useState<EducationalItem[]>([
        {
            number: 1,
            school: '',
            graduation: '',
            educational_qualifications: '',
            province: '',
            district: '',
            study_path: '',
            grade_average: '',
            study_results: ''
        }
    ]);

    const [skillsAbilities, setSkillsAbilities] = useState<SkillsAbilities>({
        details: '',
        language_skills: [
            { language: '', listening: '', speaking: '', reading: '', writing: '' }
        ]
    });

    const [activitiesCertificates, setActivitiesCertificates] = useState<ActivityCertificate[]>([
        { number: 1, name_project: '', date: '', photo: '', details: '' }
    ]);

    const [universityChoice, setUniversityChoice] = useState<UniversityChoice[]>([
        { university: '', faculty: '', major: '', details: '' }
    ]);

    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    const buildCreatePortPayload = (): CreatePortRequest => ({
        user_id: userId,
        port_id: portId,
        personal_info: Personal,
        educational,
        skills_abilities: skillsAbilities,
        activities_certificates: activitiesCertificates,
        university_choice: universityChoice
    });

    const handleSavePort = async () => {
        setSaveMessage(null);
        setSaving(true);
        try {
            const payload = buildCreatePortPayload();
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:5000/createport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `HTTP ${res.status}`);
            }

            const data = await res.json();
            setSaveMessage('บันทึกสำเร็จ');
            console.log('createport response', data);
        } catch (err: any) {
            console.error(err);
            setSaveMessage(`เกิดข้อผิดพลาด: ${err.message || err}`);
        } finally {
            setSaving(false);
        }
    };

    const renderPortfolioContent = () => (
        <div className={styles["portfolio-box"]}>
            {/* โค้ดส่วนสร้าง portfolio เดิมทั้งหมดของคุณ ยังคงเหมือนเดิมเป๊ะ ๆ ไม่มีการเปลี่ยนดีไซน์ */}
            <div className={styles["port-progress"]}>
                <div className={styles["port-progress-content"]}>
                    <div className={styles["port-progress-image"]} style={{ overflow: 'hidden' }}>
                        {Personal.image ? (
                            Personal.image instanceof File ? (
                                <img
                                    className={styles["port-image"]}
                                    src={URL.createObjectURL(Personal.image)}
                                    alt="Portfolio"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    onLoad={(e) => {
                                        const src = (e.currentTarget as HTMLImageElement).src;
                                        try { URL.revokeObjectURL(src); } catch {}
                                    }}
                                />
                            ) : (
                                <img
                                    className={styles["port-image"]}
                                    src={String(Personal.image)}
                                    alt="Portfolio"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                            )
                        ) : (
                            <div className={styles["port-image-placeholder"]}>ไม่มีรูปภาพ</div>
                        )}
                    </div>
                    <div className={styles["port-name"]}>UserName</div>
                    {/* ... ส่วนที่เหลือของ renderPortfolioContent เหมือนเดิมทั้งหมด */}
                </div>
                {/* ... ต่อจนจบ renderPortfolioContent เดิม */}
            </div>
            {/* ... ส่วนข้อมูลส่วนตัว, ประวัติการศึกษา, ทักษะ, กิจกรรม, มหาวิทยาลัย เหมือนเดิมทั้งหมด */}
        </div>
    );

    return (
        <>
            {mode === "no-login" && (
                <>
                    <Nav />
                    <h1>กรุณาลงชื่อเข้าใช้</h1>
                </>
            )}

            {mode === "login" && (
                <>
                    <Navlogin />
                    <div className={styles["portfolio-wrapper"]}>
                        <div className={styles["portfolio-btn-group"]}>
                            <button className={styles["port-btn"]} onClick={() => setPort("allport")}>
                                จัดการแฟ้มสะสมผลงานทั้งหมด
                            </button>
                            <button className={styles["port-btn"]} onClick={() => setPort("create")}>
                                สร้างแฟ้มสะสมผลงาน
                            </button>
                        </div>
                    </div>

                    {port === "allport" && (
                        <div className={styles["portfolio-box"]}>
                            <div className={styles["all-port-box"]}>
                                <div className={styles["all-port-content"]}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                        <thead>
                                            <tr style={{ fontSize: "18px", borderBottom: "2px solid #ccc" }}>
                                                <th style={{ paddingBottom: "20px" }}>ชื่อแฟ้มสะสมผลงาน</th>
                                                <th style={{ paddingBottom: "20px" }}>วันที่สร้าง</th>
                                                <th style={{ paddingBottom: "20px" }}>สถานะ</th>
                                                <th style={{ paddingBottom: "20px" }}>การจัดการ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loadingPorts ? (
                                                <tr>
                                                    <td colSpan={4} style={{ padding: "20px", textAlign: "center" }}>
                                                        กำลังโหลดข้อมูลพอร์ต...
                                                    </td>
                                                </tr>
                                            ) : fetchError ? (
                                                <tr>
                                                    <td colSpan={4} style={{ padding: "20px", textAlign: "center", color: "red" }}>
                                                        {fetchError}
                                                    </td>
                                                </tr>
                                            ) : allPorts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={4} style={{ padding: "20px", textAlign: "center" }}>
                                                        ยังไม่มีแฟ้มสะสมผลงาน
                                                    </td>
                                                </tr>
                                            ) : (
                                                allPorts.map((item, idx) => (
                                                    <tr key={item.port_id || idx}>
                                                        <td style={{ paddingTop: "10px", width: "30%" }}>
                                                            {item.personal_info?.portfolio_name || item.port_id || "ไม่ระบุชื่อ"}
                                                        </td>
                                                        <td style={{ paddingTop: "10px", width: "20%" }}>
                                                            {item.personal_info?.date_birth
                                                                ? new Date(item.personal_info.date_birth).toLocaleDateString("th-TH")
                                                                : "-"}
                                                        </td>
                                                        <td style={{ paddingTop: "10px", width: "20%" }}>
                                                            {item.personal_info ? "สมบูรณ์" : "ร่าง"}
                                                        </td>
                                                        <td style={{ paddingTop: "10px", width: "20%" }}>
                                                            <button
                                                                style={{ backgroundColor: "#033E65", color: "white", border: "none", padding: "5px 14px", borderRadius: "4px", cursor: "pointer" }}
                                                                onClick={() => setShowPopup(true)}
                                                            >
                                                                ดู
                                                            </button>
                                                            <button style={{ marginLeft: 8, backgroundColor: "#ff00009d", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
                                                                ลบ
                                                            </button>
                                                            <button style={{ marginLeft: 8, backgroundColor: "#FAC14B", color: "#033E65", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}>
                                                                แก้ไข
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {showPopup && (
                                <div className={styles["popup-overlay"]} onClick={() => setShowPopup(false)}>
                                    <div className={styles["popup-content"]} onClick={e => e.stopPropagation()}>
                                        <img
                                            src="/img/Template01.png"
                                            alt="portfolio preview"
                                            style={{ width: "1500px", maxWidth: "500px", borderRadius: "8px", marginTop: "16px" }}
                                        />
                                        <button
                                            className={styles["popup-close-btn"]}
                                            onClick={() => setShowPopup(false)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {port === "create" && renderPortfolioContent()}
                </>
            )}

            <Contact />
        </>
    );
}

export default Portfolio;