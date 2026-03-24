import Nav from './nav-bar';
import Navlogin from './nav-bar(login)';
import styles from './css/portfolio.module.css';
import Contact from './HomeSection/contact';
import { useState, useMemo, useEffect, } from 'react';
import {
    getDaysInMonth,
    format,
} from 'date-fns';
import { th } from 'date-fns/locale';
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PortfolioPDF } from "./MyDocument";


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
    study_results?: string | File | null;
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
    others?: string | null;
    language_skills?: LanguageSkill[] | null;
}

interface ActivityCertificate {
    number?: number | null;
    name_project?: string | null;
    date?: string | null;
    photo?: File | null;
    details?: string | null;
    // เพิ่มวันที่อิสระสำหรับแต่ละตัว
    day?: number;
    month?: number;
    year?: number;
}

interface UniversityChoice {
    university?: string | null;
    faculty?: string | null;
    major?: string | null;
    details?: string | null;
}

interface Userdata {
    id: string;
    username: string;
    firstname: string; // เพิ่มตัวนี้
    lastname: string;  // เพิ่มตัวนี้
}

const Portfolio = () => {

    const navigatory = useNavigate();

    // ===== User data state =====
    const [userData, setUserData] = useState<Userdata | undefined>();

    // mark userData as read to avoid TS "declared but never read" (used for debug/side-effects)
    useEffect(() => {
        if (userData) {
            // intentional no-op to mark as read
            // console.log(userData);
        }
    }, [userData]);

    // ===== State for UI =====
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        personal: false,
        education: false,
        talent: false,
        certificate: false,
        university: false,
    });

    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const [port, setAllport] = useState<"allport" | "create">("allport");
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<string | null>(null);

    // ===== State for form visibility =====
    const [showEducation, setShowEducation] = useState(false);
    const [showTalent, setShowTalent] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showUniversity, setShowUniversity] = useState(false);
    const [showPersonal, setShowPersonal] = useState(false);

    // ===== State for date picker (birth date) =====
    const [day, setDay] = useState<number>(1);
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    // ===== State for form data =====
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

    const [profileImage, setProfileImage] = useState<File | null>(null);

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
        {
            number: 1,
            name_project: '',
            date: '',
            photo: null,
            details: '',
            day: 1,
            month: 0,
            year: new Date().getFullYear()
        }
    ]);

    const [universityChoice, setUniversityChoice] = useState<UniversityChoice[]>([
        { university: '', faculty: '', major: '', details: '' }
    ]);

    const [userId, setUserId] = useState<number | string>('');
    const [portId, setPortId] = useState<string>('');

    // ===== Memoized values =====
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

    // ===== Helper function to get days in cert month =====
    const getDaysInCertMonth = (certMonth: number, certYear: number) => {
        const date = new Date(certYear, certMonth);
        return getDaysInMonth(date);
    };

    // ===== Effects for initialization =====
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setMode("login");
        } else {
            setMode("no-login");
        }
    }, []);

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
                const maybeObj = userData || JSON.parse(raw);
                if (maybeObj && (maybeObj.id || maybeObj.user_id)) {
                    setUserId(maybeObj.id || maybeObj.user_id);
                } else if (typeof raw === 'string') {
                    setUserId(Number(raw) || raw);
                }
            } catch (e) {
                setUserId(Number(raw) || raw);
            }
        }



        if (!portId) {
            const storedUserData = localStorage.getItem("user");
            if (storedUserData) {
                const parsed = JSON.parse(storedUserData);
                setUserData(parsed);
                // ✅ ใช้จากตัวแปร parsed โดยตรง ไม่ต้องรอ State
                const seed = parsed.username || 'anon';
                const id = parsed.id || 'anon';
                setPortId(`port_${seed}_${id}`);
            }
        }
    }, []);

    // ===== Effects for birth date =====
    useEffect(() => {
        try {
            const d = new Date(year, month, day);
            if (!isNaN(d.getTime())) {
                setPersonal(prev => ({
                    ...prev,
                    date_birth: d.toISOString().slice(0, 10)
                }));
            }
        } catch (e) {
            // ignore
        }
    }, [day, month, year]);

    // ===== Effects for section visibility =====
    useEffect(() => {
        if (openSections.education) {
            setShowEducation(true);
        } else if (showEducation) {
            const timeout = setTimeout(() => setShowEducation(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.education]);

    useEffect(() => {
        if (openSections.talent) {
            setShowTalent(true);
        } else if (showTalent) {
            const timeout = setTimeout(() => setShowTalent(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.talent]);

    useEffect(() => {
        if (openSections.certificate) {
            setShowCertificate(true);
        } else if (showCertificate) {
            const timeout = setTimeout(() => setShowCertificate(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.certificate]);

    useEffect(() => {
        if (openSections.university) {
            setShowUniversity(true);
        } else if (showUniversity) {
            const timeout = setTimeout(() => setShowUniversity(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.university]);

    useEffect(() => {
        if (openSections.personal) {
            setShowPersonal(true);
        } else if (showPersonal) {
            const timeout = setTimeout(() => setShowPersonal(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.personal]);



    // ===== Update functions =====
    const toggleSection = (key: string) => {
        setOpenSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const updatePersonal = (field: keyof PersonalInfo, value: any) => {
        setPersonal(prev => ({ ...prev, [field]: value }));
    };

    const updateEducational = (index: number, field: keyof EducationalItem, value: any) => {
        setEducational(prev => {
            const copy = [...prev];
            copy[index] = { ...(copy[index] || {}), [field]: value };
            return copy;
        });
    };

    const updateSkills = (field: keyof SkillsAbilities, value: any) => {
        setSkillsAbilities(prev => ({ ...(prev || {}), [field]: value }));
    };

    const updateLanguageSkill = (index: number, field: keyof LanguageSkill, value: any) => {
        setSkillsAbilities(prev => {
            const ls = prev?.language_skills ? [...prev.language_skills] : [];
            ls[index] = { ...(ls[index] || {}), [field]: value };
            return { ...(prev || {}), language_skills: ls };
        });
    };

    const addLanguageSkill = () => {
        setSkillsAbilities(prev => {
            const ls = prev?.language_skills ? [...prev.language_skills] : [];
            ls.push({ language: '', listening: '', speaking: '', reading: '', writing: '' });
            return { ...(prev || {}), language_skills: ls };
        });
    };

    const removeLanguageSkill = (index: number) => {
        setSkillsAbilities(prev => {
            const ls = prev?.language_skills ? [...prev.language_skills] : [];
            ls.splice(index, 1);
            return { ...(prev || {}), language_skills: ls.length > 0 ? ls : [{ language: '', listening: '', speaking: '', reading: '', writing: '' }] };
        });
    };

    const updateActivity = (index: number, field: keyof ActivityCertificate, value: any) => {
        setActivitiesCertificates(prev => {
            const copy = [...prev];
            copy[index] = { ...(copy[index] || {}), [field]: value };
            return copy;
        });
    };

    const addActivity = () => {
        setActivitiesCertificates(prev => [
            ...prev,
            {
                number: prev.length + 1,
                name_project: '',
                date: '',
                photo: null,
                details: '',
                day: 1,
                month: 0,
                year: new Date().getFullYear()
            }
        ]);
    };

    const removeActivity = (index: number) => {
        setActivitiesCertificates(prev => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy.length > 0 ? copy : [{
                number: 1,
                name_project: '',
                date: '',
                photo: null,
                details: '',
                day: 1,
                month: 0,
                year: new Date().getFullYear()
            }];
        });
    };

    const updateUniversity = (index: number, field: keyof UniversityChoice, value: any) => {
        setUniversityChoice(prev => {
            const copy = [...prev];
            copy[index] = { ...(copy[index] || {}), [field]: value };
            return copy;
        });
    };

    // ===== File upload handler =====
    const handleEducationFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        updateEducational(index, 'study_results', file);
    };

    // ===== Build payload for API =====
    const buildCreatePortPayload = (): FormData => {
        const formData = new FormData();

        const data = {
            user_id: userId,
            port_id: portId,
            personal_info: Personal,
            educational,
            skills_abilities: skillsAbilities,
            activities_certificates: activitiesCertificates.map(({ photo, day, month, year, ...rest }) => rest),
            university_choice: universityChoice
        };

        formData.append('data', JSON.stringify(data));

        // Add profile image
        if (profileImage) {
            formData.append('profile', profileImage);
        }

        // Add education files
        educational.forEach((edu) => {
            if (edu.study_results instanceof File) {
                formData.append('transcript', edu.study_results);
            }
        });

        // Add certificate files
        activitiesCertificates.forEach((activity) => {
            if (activity.photo instanceof File) {
                formData.append('certificate', activity.photo);
            }
        });

        return formData;
    };

    // ===== Handle save =====
    const handleSavePort = async () => {

        setSaveMessage(null);
        setSaving(true);
        try {
            const payload = buildCreatePortPayload();
            const token = localStorage.getItem('token');

            const res = await fetch('https://daily-life-backend-theta.vercel.app/createport', {
                method: 'POST',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: payload
            });

            // if (!res.ok) {
            //     const text = await res.text();
            //     throw new Error(text || `HTTP ${res.status}`);
            // }
            if (!res.ok) {
                const text = await res.text();
                console.log("❌ Backend error:", text);
                throw new Error(`HTTP ${res.status}: ${text}`);
            }

            setSaveMessage('บันทึกสำเร็จ!');
            location.reload();
        } catch (err: any) {
            console.error(err);
            setSaveMessage(`เกิดข้อผิดพลาด: ${err.message || err}`);
        } finally {
            setSaving(false);
        }
    };

    // ===== Render functions =====
    const renderLanguageSkills = () => {
        return (
            <>
                {skillsAbilities.language_skills?.map((lang, idx) => (
                    <div key={idx} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h4>ภาษาที่ {idx + 1}</h4>
                            {skillsAbilities.language_skills && skillsAbilities.language_skills.length > 1 && (
                                <button
                                    onClick={() => removeLanguageSkill(idx)}
                                    style={{ padding: '5px 10px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    ลบ
                                </button>
                            )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                            <div className={styles["name-group"]}>
                                <p>ภาษา</p>
                                <select
                                    className={styles["port-input"]}
                                    value={lang.language || ''}
                                    onChange={e => updateLanguageSkill(idx, 'language', e.target.value)}
                                >
                                    <option value="" disabled selected hidden>เลือกภาษา</option>
                                    <option value="อังกฤษ">อังกฤษ</option>
                                    <option value="จีน">จีน</option>
                                    <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                                </select>
                            </div>
                            <div className={styles["name-group"]}>
                                <p>การฟัง</p>
                                <select
                                    className={styles["port-input"]}
                                    value={lang.listening || ''}
                                    onChange={e => updateLanguageSkill(idx, 'listening', e.target.value)}
                                >
                                    <option value="" disabled selected hidden>เลือกระดับ</option>
                                    <option value="พอใช้">พอใช้</option>
                                    <option value="ดี">ดี</option>
                                    <option value="ดีมาก">ดีมาก</option>
                                </select>
                            </div>
                            <div className={styles["name-group"]}>
                                <p>การพูด</p>
                                <select
                                    className={styles["port-input"]}
                                    value={lang.speaking || ''}
                                    onChange={e => updateLanguageSkill(idx, 'speaking', e.target.value)}
                                >
                                    <option value="" disabled selected hidden>เลือกระดับ</option>
                                    <option value="พอใช้">พอใช้</option>
                                    <option value="ดี">ดี</option>
                                    <option value="ดีมาก">ดีมาก</option>
                                </select>
                            </div>
                            <div className={styles["name-group"]}>
                                <p>การอ่าน</p>
                                <select
                                    className={styles["port-input"]}
                                    value={lang.reading || ''}
                                    onChange={e => updateLanguageSkill(idx, 'reading', e.target.value)}
                                >
                                    <option value="" disabled selected hidden>เลือกระดับ</option>
                                    <option value="พอใช้">พอใช้</option>
                                    <option value="ดี">ดี</option>
                                    <option value="ดีมาก">ดีมาก</option>
                                </select>
                            </div>
                            <div className={styles["name-group"]}>
                                <p>การเขียน</p>
                                <select
                                    className={styles["port-input"]}
                                    value={lang.writing || ''}
                                    onChange={e => updateLanguageSkill(idx, 'writing', e.target.value)}
                                >
                                    <option value="" disabled selected hidden>เลือกระดับ</option>
                                    <option value="พอใช้">พอใช้</option>
                                    <option value="ดี">ดี</option>
                                    <option value="ดีมาก">ดีมาก</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    const renderActivities = () => {
        return (
            <>
                {activitiesCertificates.map((activity, idx) => {
                    const daysInCertificateMonth = getDaysInCertMonth(activity.month || 0, activity.year || new Date().getFullYear());

                    return (
                        <div key={idx} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <h4>ลำดับที่ {idx + 1}</h4>
                                {activitiesCertificates.length > 1 && (
                                    <button
                                        onClick={() => removeActivity(idx)}
                                        style={{ padding: '5px 10px', backgroundColor: '#ff6b6b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        ลบ
                                    </button>
                                )}
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ชื่อโครงการ/กิจกรรม</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={activity.name_project || ''}
                                        onChange={e => updateActivity(idx, 'name_project', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <p>ช่วงวันที่</p>
                                <div className={styles["date-group"]} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.day || 1}
                                        onChange={(e) => updateActivity(idx, 'day', Number(e.target.value))}
                                        style={{ flex: 1 , minWidth: '120px' }}
                                    >
                                        {Array.from({ length: daysInCertificateMonth }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.month || 0}
                                        onChange={(e) => updateActivity(idx, 'month', Number(e.target.value))}
                                        style={{ flex: 1 , minWidth: '120px'}}
                                    >
                                        {thaiMonths.map((m) => (
                                            <option key={m.value} value={m.value}>{m.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.year || new Date().getFullYear()}
                                        onChange={(e) => updateActivity(idx, 'year', Number(e.target.value))}
                                        style={{ flex: 1 ,  minWidth: '120px'}}
                                    >
                                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                            <option key={y} value={y}>{y + 543}</option>
                                        ))}
                                    </select>
                                </div>
                                {(() => {
                                    try {
                                        const certYear = activity.year || new Date().getFullYear();
                                        const certMonth = activity.month !== undefined ? activity.month : 0;
                                        const certDay = activity.day || 1;
                                        const d = new Date(certYear, certMonth, certDay);
                                        if (!isNaN(d.getTime())) {
                                            const dateStr = d.toISOString().slice(0, 10);
                                            if (activity.date !== dateStr) {
                                                updateActivity(idx, 'date', dateStr);
                                            }
                                        }
                                    } catch (e) {
                                        // ignore
                                    }
                                    return null;
                                })()}
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>แนบรูปภาพกิจกรรม/เกียรติบัตร</p>
                                    <input
                                        id={`cert-upload-${idx}`}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                updateActivity(idx, 'photo', file);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor={`cert-upload-${idx}`}
                                        className={styles["port-upload-btn"]}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {activity.photo ? '✓ เลือกไฟล์แล้ว' : 'เลือกรูปภาพ'}
                                    </label>
                                    {activity.photo && (
                                        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                            {(activity.photo as File).name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '100%' }}>
                                    <p>ระบุรายละเอียด</p>
                                    <textarea
                                        className={styles["port-textarea"]}
                                        rows={4}
                                        style={{ height: '150px', resize: 'vertical' }}
                                        value={activity.details || ''}
                                        onChange={e => updateActivity(idx, 'details', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    const renderPortfolioContent = () => (
        <div className={styles["portfolio-box"]}>
            <div className={styles["port-progress"]}>
                <div className={styles["port-progress-content"]}>
                    <div className={styles["port-progress-image"]} style={{ overflow: 'hidden' }}>
                        {profileImage ? (
                            <img
                                className={styles["port-image"]}
                                src={URL.createObjectURL(profileImage)}
                                alt="Portfolio"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        ) : (
                            <div className={styles["port-image-placeholder"]}>ไม่มีรูปภาพ</div>
                        )}
                    </div>
                    <div className={styles["port-name"]}>
                        {Personal.first_name ? `${Personal.first_name} ${Personal.last_name || ''}` : 'ชื่อผู้ใช้'}
                    </div>
                    <div className={styles["port-btn-group"]}>
                        <div className={styles["upload-btn-group"]}>
                            <input
                                id="port-image-upload1"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={e => {
                                    const file = e.target.files?.[0] || null;
                                    setProfileImage(file);
                                }}
                            />
                            <label
                                htmlFor="port-image-upload1"
                                className={styles["port-upload-btn"]}
                            >
                                อัพโหลดรูปภาพ
                            </label>
                            <button className={styles["port-preview-btn"]}>
                                เลือกเทมเพลต
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles["port-progress-group"]}>
                    <div className={styles["divider"]}></div>
                    <div className={styles["progression-bar"]}>
                        <p>ความสมบูรณ์ของแฟ้มสะสมผลงาน : ครบถ้วน</p>
                        <p>100%</p>
                    </div>
                    <div className={styles["bar"]}></div>
                    <div className={styles["progress-info"]}>
                        แฟ้มสะสมผลงานของคุณสมบูรณ์แล้ว
                    </div>
                    <div className={styles["progress-info"]}>
                        ข้อมูลครบถ้วน
                    </div>
                    <div className={styles["progress-info-btn-group"]}>
                        <button
                            className={styles["progress-info-btn"]}
                            onClick={handleSavePort}
                            disabled={saving}
                        >
                            {saving ? 'กำลังบันทึก...' : 'สร้างพอต'}
                        </button>
                    </div>
                    <PDFDownloadLink
                        document={
                            <PortfolioPDF
                                personal_image={profileImage ? URL.createObjectURL(profileImage) : null}
                                introduce={Personal.introduce || ''}
                                prefix={Personal.prefix || ''}
                                first_name={Personal.first_name || ''}
                                last_name={Personal.last_name || ''}
                                birth_day={day}
                                birth_month={thaiMonths.find(m => m.value === month)?.name || ''}
                                birth_year={year + 543}
                                nationality={Personal.nationality || ''}
                                id_card={Personal.national_id || ''}
                                email={Personal.email || ''}
                                phonenumber1={Personal.phone_number1 || ''}
                                phonenumber2={Personal.phone_number2 || ''}
                                address={Personal.address || ''}
                                province={Personal.province || ''}
                                district={Personal.district || ''}
                                subdistrict={Personal.subdistrict || ''}
                                postal_code={Personal.postal_code || ''}

                                school={educational[0]?.school || ''}
                                graduation={educational[0]?.graduation || ''}
                                educational_qualifications={educational[0]?.educational_qualifications || ''}
                                study_path={educational[0]?.study_path || ''}
                                grade_average={educational[0]?.grade_average || ''}
                                study_results={educational[0]?.study_results || ''}
                                province_edu={educational[0]?.province || ''}
                                district_edu={educational[0]?.district || ''}

                                skills_details={skillsAbilities.details || ''}
                                others_skills={skillsAbilities.others || ''}
                                skills={skillsAbilities.language_skills || []}

                                activities={activitiesCertificates.map(act => ({
                                    name_project: act.name_project,
                                    date: act.date,
                                    description: act.details,
                                    photos: act.photo ? [URL.createObjectURL(act.photo)] : []
                                }))}

                                university={universityChoice[0]?.university || ''}
                                faculty={universityChoice[0]?.faculty || ''}
                                major={universityChoice[0]?.major || ''}
                                reason={universityChoice[0]?.details || ''}



                            />


                        }
                        fileName={
                            Personal.portfolio_name && Personal.portfolio_name.trim() !== ''
                                ? `${Personal.portfolio_name}.pdf`
                                : 'Portfolio.pdf'
                        }
                    >
                        {({ loading }) => (
                            <button
                                type="button"
                                className={styles["export-btn"]}
                                disabled={loading}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: loading ? '#ccc' : '#e67e22',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {loading ? 'กำลังสร้าง PDF...' : 'Export to PDF'}
                            </button>
                        )}
                    </PDFDownloadLink>
                    {saveMessage && (
                        <div style={{
                            marginTop: 8,
                            color: saveMessage.startsWith('เกิดข้อผิดพลาด') ? 'crimson' : 'green',
                            padding: '10px',
                            backgroundColor: saveMessage.startsWith('เกิดข้อผิดพลาด') ? '#ffe0e0' : '#e0ffe0',
                            borderRadius: '4px'
                        }}>
                            {saveMessage}
                        </div>
                    )}
                </div>
            </div>

            {/* ข้อมูลส่วนตัว */}
            <div className={`${styles["portfolio-data"]} ${openSections.personal ? styles["open"] : ""}`}
                onClick={() => toggleSection("personal")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}>
                        <img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />
                        ข้อมูลส่วนตัว
                    </div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข</div>
                </div>

                {showPersonal && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.personal ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <p>ชื่อแฟ้มสะสมผลงาน</p>
                            <input
                                type="text"
                                className={styles["port-input"]}
                                value={Personal.portfolio_name || ''}
                                onChange={e => updatePersonal('portfolio_name', e.target.value)}
                            />
                            <p>แนะนำตัว</p>
                            <textarea
                                className={styles["port-textarea"]}
                                rows={4}
                                value={Personal.introduce || ''}
                                onChange={e => updatePersonal('introduce', e.target.value)}
                            />

                            <div className={styles["personal-section"]}>
                                <div className={styles["custom-name-group"]}>
                                    <p>คำนำหน้า</p>
                                    <select
                                        className={styles["port-input"]}
                                        value={Personal.prefix || ''}
                                        onChange={e => updatePersonal('prefix', e.target.value)}
                                    >
                                        <option value="" disabled selected hidden>คำนำหน้า</option>
                                        <option value="นาย">นาย</option>
                                        <option value="นางสาว">นางสาว</option>
                                        <option value="นาง">นาง</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ชื่อ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.first_name || ''}
                                        onChange={e => updatePersonal('first_name', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>นามสกุล</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.last_name || ''}
                                        onChange={e => updatePersonal('last_name', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["custom-birth-date"]}>
                                    <p>วันเดือนปีเกิด</p>
                                    <div className={styles["date-group"]}>
                                        <select
                                            className={styles["port-input"]}
                                            value={day}
                                            onChange={(e) => setDay(Number(e.target.value))}
                                        >
                                            {Array.from({ length: daysInMonth }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={month}
                                            onChange={(e) => setMonth(Number(e.target.value))}
                                        >
                                            {thaiMonths.map((m) => (
                                                <option key={m.value} value={m.value}>{m.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={year}
                                            onChange={(e) => setYear(Number(e.target.value))}
                                        >
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                                <option key={y} value={y}>{y + 543}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สัญชาติ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.nationality || ''}
                                        onChange={e => updatePersonal('nationality', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>หมายเลขบัตรประชาชน</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.national_id || ''}
                                        onChange={e => updatePersonal('national_id', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>เบอร์ติดต่อ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.phone_number1 || ''}
                                        onChange={e => updatePersonal('phone_number1', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เบอร์ติดต่อ (สำรอง)</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.phone_number2 || ''}
                                        onChange={e => updatePersonal('phone_number2', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>อีเมล</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.email || ''}
                                        onChange={e => updatePersonal('email', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '100%' }}>
                                    <p>ที่อยู่ปัจจุบัน</p>
                                    <textarea
                                        className={styles["port-textarea"]}
                                        rows={4}
                                        style={{ height: '150px', resize: 'vertical' }}
                                        value={Personal.address || ''}
                                        onChange={e => updatePersonal('address', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>จังหวัด</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.province || ''}
                                        onChange={e => updatePersonal('province', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เขต/อำเภอ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.district || ''}
                                        onChange={e => updatePersonal('district', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>แขวง/ตำบล</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.subdistrict || ''}
                                        onChange={e => updatePersonal('subdistrict', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>รหัสไปรษณีย์</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.postal_code || ''}
                                        onChange={e => updatePersonal('postal_code', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ประวัติการศึกษา */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.education ? styles["open"] : ""}`}
                onClick={() => toggleSection("education")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}>
                        <img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />
                        ประวัติการศึกษา
                    </div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข</div>
                </div>

                {showEducation && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.education ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>โรงเรียน/สถาบันการศึกษา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={educational[0]?.school || ''}
                                        onChange={e => updateEducational(0, 'school', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ปีจบการศึกษา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={educational[0]?.graduation || ''}
                                        onChange={e => updateEducational(0, 'graduation', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>วุฒิการศึกษา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={educational[0]?.educational_qualifications || ''}
                                        onChange={e => updateEducational(0, 'educational_qualifications', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>จังหวัด</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={educational[0]?.province || ''}
                                        onChange={e => updateEducational(0, 'province', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>อำเภอ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={educational[0]?.district || ''}
                                        onChange={e => updateEducational(0, 'district', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>สายการเรียน</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={educational[0]?.study_path || ''}
                                        onChange={e => updateEducational(0, 'study_path', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เกรดเฉลี่ย</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={String(educational[0]?.grade_average || '')}
                                        onChange={e => updateEducational(0, 'grade_average', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>แนบใบ ปพ.</p>
                                    <input
                                        id="edu-upload-0"
                                        type="file"
                                        accept="image/*,application/pdf"
                                        style={{ display: 'none' }}
                                        onChange={e => handleEducationFileUpload(e, 0)}
                                    />
                                    <label
                                        htmlFor="edu-upload-0"
                                        className={styles["port-upload-btn"]}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {educational[0]?.study_results instanceof File ? '✓ เลือกไฟล์แล้ว' : 'เลือกไฟล์'}
                                    </label>
                                    {educational[0]?.study_results instanceof File && (
                                        <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                            {(educational[0].study_results as File).name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ทักษะ/ความสามารถ */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.talent ? styles["open"] : ""}`}
                onClick={() => toggleSection("talent")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}>
                        <img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />
                        ทักษะ/ความสามารถ
                    </div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข</div>
                </div>

                {showTalent && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.talent ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={styles["personal-section"]}>
                                <p>ทักษะความรู้ตามสาขาวิชา</p>
                            </div>
                            <textarea
                                className={styles["port-textarea"]}
                                rows={4}
                                style={{ resize: 'vertical', marginBottom: '20px' }}
                                value={skillsAbilities.details || ''}
                                onChange={e => updateSkills('details', e.target.value)}
                            />

                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`} style={{ marginBottom: '20px' }}>
                                <h3>ทักษะด้านภาษาต่างประเทศ</h3>
                                <button
                                    onClick={addLanguageSkill}
                                    style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    + เพิ่มภาษา
                                </button>
                            </div>

                            {renderLanguageSkills()}

                            <div className={styles["personal-section"]}>
                                <p>ทักษะอื่นๆ</p>
                            </div>
                            <textarea
                                className={styles["port-textarea"]}
                                rows={4}
                                style={{ resize: 'vertical' }}
                                value={skillsAbilities.others || ''}
                                onChange={e => updateSkills('others', e.target.value)}
                                placeholder="ระบุทักษะอื่นๆ เช่น การใช้คอมพิวเตอร์, ทักษะการสื่อสาร, ฯลฯ"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* กิจกรรม/เกียรติบัตร */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.certificate ? styles["open"] : ""}`}
                onClick={() => toggleSection("certificate")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}>
                        <img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />
                        กิจกรรม/เกียรติบัตร
                    </div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข</div>
                </div>

                {showCertificate && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.certificate ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`} style={{ marginBottom: '20px' }}>
                                <h3>รายการเกียรติบัตร/กิจกรรม ({activitiesCertificates.length})</h3>
                                <button
                                    onClick={addActivity}
                                    style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    + เพิ่มเกียรติบัตร
                                </button>
                            </div>

                            {renderActivities()}
                        </div>
                    </div>
                )}
            </div>

            {/* มหาวิทยาลัยที่ต้องการ */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.university ? styles["open"] : ""}`}
                onClick={() => toggleSection("university")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}>
                        <img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />
                        มหาวิทยาลัยที่ต้องการ
                    </div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข</div>
                </div>

                {showUniversity && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.university ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>มหาวิทยาลัย</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={universityChoice[0]?.university || ''}
                                        onChange={e => updateUniversity(0, 'university', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>คณะ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={universityChoice[0]?.faculty || ''}
                                        onChange={e => updateUniversity(0, 'faculty', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สาขาวิชา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={universityChoice[0]?.major || ''}
                                        onChange={e => updateUniversity(0, 'major', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '100%' }}>
                                    <p>เหตุผลที่สนใจมหาวิทยาลัยนี้</p>
                                    <textarea
                                        className={styles["port-textarea"]}
                                        rows={4}
                                        style={{ height: '150px', resize: 'vertical' }}
                                        value={universityChoice[0]?.details || ''}
                                        onChange={e => updateUniversity(0, 'details', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const TEMPLATES = [
        { id: 'classic', name: 'Classic Portfolio', desc: 'เน้นความเรียบหรู ดูสะอาดตา' },
        { id: 'modern', name: 'Modern Dark', desc: 'โทนสีมืด ทันสมัย เหมาะกับสาย Tech' },
        { id: 'minimal', name: 'Minimalist', desc: 'น้อยแต่มาก เน้นเนื้อหาเป็นหลัก' },
    ];

    const [selectedTempl, setSelectedTempl] = useState<string>('classic');

    const goToGenport = () => {
        localStorage.setItem('userid', userData?.id || '');
        navigatory('/genport')
    }

    return (
        <>
            {mode === "login" && (
                <>
                    <Nav />
                    <h1 style={{ textAlign: 'center', padding: '40px', color: '#333' }}>
                        กรุณาลงชื่อเข้าใช้เพื่อสร้างแฟ้มสะสมผลงาน
                    </h1>
                </>
            )}

            {mode === "no-login" && (
                <>
                    <Navlogin />
                    <div className={styles["portfolio-wrapper"]}>
                        <div className={styles["portfolio-btn-group"]}>
                            <button
                                className={styles["port-btn"]}
                                onClick={() => setAllport("allport")}
                                style={{ backgroundColor: port === "allport" ? '#007bff' : '#6c757d' }}
                            >
                                จัดการแฟ้มสะสมผลงานทั้งหมด
                            </button>
                            <button
                                className={styles["port-btn"]}
                                onClick={() => setAllport("create")}
                                style={{ backgroundColor: port === "create" ? '#007bff' : '#6c757d' }}
                            >
                                สร้างแฟ้มสะสมผลงาน
                            </button>
                        </div>
                    </div>


                    {port === "allport" && (
                        <div style={{ padding: "40px" }}>

                            <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                                เลือกรูปแบบ (Template)
                            </h3>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: "20px",
                                    maxWidth: "900px",
                                    margin: "0 auto"
                                }}
                            >
                                {TEMPLATES.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedTempl(item.id)}
                                        style={{
                                            border: selectedTempl === item.id ? "2px solid #3b82f6" : "2px solid #ddd",
                                            borderRadius: "10px",
                                            padding: "20px",
                                            cursor: "pointer",
                                            background: selectedTempl === item.id ? "#eff6ff" : "white"
                                        }}
                                    >
                                        <p style={{ fontSize: "12px", color: "#888" }}>
                                            {item.id.toUpperCase()}
                                        </p>

                                        <h4>{item.name}</h4>

                                        <p style={{ fontSize: "14px", color: "#666" }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ textAlign: "center", marginTop: "40px" }}>
                                <p>
                                    คุณกำลังเลือกใช้: <b>{selectedTempl}</b>
                                </p>

                                <button
                                    onClick={goToGenport}
                                    style={{
                                        marginTop: "10px",
                                        padding: "10px 30px",
                                        background: "#2563eb",
                                        color: "white",
                                        borderRadius: "6px",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    ใช้ Template นี้
                                </button>
                            </div>

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