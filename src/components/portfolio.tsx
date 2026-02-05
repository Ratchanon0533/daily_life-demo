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
import { picture } from 'framer-motion/client';

interface PersonalInfo {
    portfolio_name?: string | null;
    introduce?: string | null;
    prefix?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    date_birth?: string | null; // ISO date
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
    image?: File | null;
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
    date?: string | null; // ISO date
    photo?: string | null; // S3 url or base64
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

// interface User{
//     id: number;
//     firstname: string;
//     lastname: string;
//     email: string;
//     phone : string;
// }


const Portfolio = () => {



    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        personal: false,
        education: false,
        talent: false,
        certificate: false,
        university: false,
    });

    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const [port, setAllport] = useState<"allport" | "create">("allport");


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setMode("login");
        } else {
            setMode("no-login");
        }
    }, []);

    // set userId from localStorage and ensure a default portId
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
                // some apps store a JSON user object
                const maybeObj = JSON.parse(raw);
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
            const seed = localStorage.getItem('user_id') || localStorage.getItem('userId') || 'anon';
            setPortId(`port_${seed}_${Date.now()}`);
        }
    }, []);

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

    useEffect(() => {
        if (openSections.education) {
            setShowEducation(true);
        } else if (showEducation) {
            const timeout = setTimeout(() => setShowEducation(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.education]);

    const [showTalent, setShowTalent] = useState(false);

    useEffect(() => {
        if (openSections.talent) {
            setShowTalent(true);
        } else if (showTalent) {
            const timeout = setTimeout(() => setShowTalent(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.talent]);

    const [showCertificate, setShowCertificate] = useState(false);

    useEffect(() => {
        if (openSections.certificate) {
            setShowCertificate(true);
        } else if (showCertificate) {
            const timeout = setTimeout(() => setShowCertificate(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.certificate]);

    const [showUniversity, setShowUniversity] = useState(false);

    useEffect(() => {
        if (openSections.university) {
            setShowUniversity(true);
        } else if (showUniversity) {
            const timeout = setTimeout(() => setShowUniversity(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.university]);

    const [showPersonal, setShowPersonal] = useState(false);

    useEffect(() => {
        if (openSections.personal) {
            setShowPersonal(true);
        } else if (showPersonal) {
            const timeout = setTimeout(() => setShowPersonal(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.personal]);

    // const [users, setUsers] = useState<User[]>([]);
    // setUsers(localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users") || "") : []);
    // ...existing code...
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


;

    // Keep the computed birth date in sync with day/month/year selectors
    useEffect(() => {
        try {
            const d = new Date(year, month, day);
            if (!isNaN(d.getTime())) {
                setPersonal(prev => ({ ...prev, date_birth: d.toISOString().slice(0, 10) } as PersonalInfo));
            }
        } catch (e) {
            // ignore
        }
    }, [day, month, year]);

    const updatePersonal = (field: keyof PersonalInfo, value: any) => {
        setPersonal(prev => ({ ...prev, [field]: value } as PersonalInfo));
    };

    const updateEducational = (index: number, field: keyof EducationalItem, value: any) => {
        setEducational(prev => {
            const copy = [...prev];
            copy[index] = { ...(copy[index] || {}), [field]: value } as EducationalItem;
            return copy;
        });
    };

    const updateSkills = (field: keyof SkillsAbilities, value: any) => {
        setSkillsAbilities(prev => ({ ...(prev || {}), [field]: value } as SkillsAbilities));
    };

    const updateLanguageSkill = (index: number, field: keyof LanguageSkill, value: any) => {
        setSkillsAbilities(prev => {
            const ls = prev?.language_skills ? [...prev.language_skills] : [] as LanguageSkill[];
            ls[index] = { ...(ls[index] || {}), [field]: value } as LanguageSkill;
            return { ...(prev || {}), language_skills: ls } as SkillsAbilities;
        });
    };

    const updateActivity = (index: number, field: keyof ActivityCertificate, value: any) => {
        setActivitiesCertificates(prev => {
            const copy = [...prev];
            copy[index] = { ...(copy[index] || {}), [field]: value } as ActivityCertificate;
            return copy;
        });
    };

    const updateUniversity = (index: number, field: keyof UniversityChoice, value: any) => {
        setUniversityChoice(prev => {
            const copy = [...prev];
            copy[index] = { ...(copy[index] || {}), [field]: value } as UniversityChoice;
            return copy;
        });
    };

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

    const [userId, setUserId] = useState<number | string>('');
    const [portId, setPortId] = useState<string>('');
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
    // ...existing code...


    // const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPersonal(prev => ({ ...prev, image: e.target.files?.[0] || null }));
    // };

    const renderPortfolioContent = () => (
        <div className={styles["portfolio-box"]}>
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
                                        try { URL.revokeObjectURL(src); } catch { /* ignore */ }
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
                    <div className={styles["port-btn-group"]}>
                        <div className={styles["upload-btn-group"]}>
                            <>
                                <input
                                    id="port-image-upload1"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onClick={e => e.stopPropagation()}
                                    onChange={e => {
                                        const file = (e.target as HTMLInputElement).files?.[0] || null;
                                        updatePersonal('image', file);
                                    }}
                                />
                                <label
                                    htmlFor="port-image-upload1"
                                    className={styles["port-upload-btn"]}
                                    onClick={e => e.stopPropagation()}
                                >
                                    อัพโหลดรูปภาพ
                                </label>
                            </>
                            <button className={styles["port-preview-btn"]}>
                                ดูตัวอย่างแฟ้มสะสมผลงาน
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
                        <button className={styles["progress-info-btn"]} onClick={handleSavePort} disabled={saving}>
                            {saving ? 'กำลังบันทึก...' : 'สร้างพอต'}
                        </button>
                    </div>
                    {saveMessage && (
                        <div style={{ marginTop: 8, color: saveMessage.startsWith('เกิดข้อผิดพลาด') ? 'crimson' : 'green' }}>{saveMessage}</div>
                    )}
                    {/* <p className={styles["progress-caution"]}>*หมายเหตุ :เมื่อกดปุ่มเผยแพร่ ระบบจะใช้เวลาประมวลผลภายใน 30 นาที ทางมหาวิทยาลัยจึงจะสามารถมองเห็นแฟ้มสะสมผลงานของคุณได้</p> */}
                </div>
            </div>

            {/* ข้อมูลส่วนตัว */}
            <div className={`${styles["portfolio-data"]} ${openSections.personal ? styles["open"] : ""}`}
                onClick={() => toggleSection("personal")}
            >
                <div className={styles["port-data-wrapper"]} >
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />ข้อมูลส่วนตัว</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
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
                                onClick={e => e.stopPropagation()}
                                value={Personal.portfolio_name || ''}
                                onChange={e => updatePersonal('portfolio_name', e.target.value)}
                            />
                            <p>แนะนำตัว</p>
                            <textarea
                                className={styles["port-textarea"]}
                                onClick={e => e.stopPropagation()}
                                rows={4}
                                value={Personal.introduce || ''}
                                onChange={e => updatePersonal('introduce', e.target.value)}
                            />

                            <div className={styles["personal-section"]}>
                                <div className={styles["custom-name-group"]}>
                                    <p>คำนำหน้า</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.prefix || ''}
                                        onChange={e => updatePersonal('prefix', e.target.value)}
                                    >
                                        <option value="นาย">นาย</option>
                                        <option value="นางสาว">นางสาว</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ชื่อ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.first_name || ''}
                                        onChange={e => updatePersonal('first_name', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>นามสกุล</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
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
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {Array.from({ length: daysInMonth }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={month}
                                            onChange={(e) => setMonth(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {thaiMonths.map((m) => (
                                                <option key={m.value} value={m.value}>{m.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={year}
                                            onChange={(e) => setYear(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.nationality || ''}
                                        onChange={e => updatePersonal('nationality', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>หมายเลขบัตรประชาชน</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.phone_number1 || ''}
                                        onChange={e => updatePersonal('phone_number1', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เบอร์ติดต่อ (สำรอง)</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.phone_number2 || ''}
                                        onChange={e => updatePersonal('phone_number2', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>อีเมล</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.province || ''}
                                        onChange={e => updatePersonal('province', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เขต/อำเภอ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.district || ''}
                                        onChange={e => updatePersonal('district', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>แขวง/ตำบล</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.subdistrict || ''}
                                        onChange={e => updatePersonal('subdistrict', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>รหัสไปรษณีย์</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.postal_code || ''}
                                        onChange={e => updatePersonal('postal_code', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ส่วนสูง</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.height || ''}
                                        onChange={e => updatePersonal('height', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>น้ำหนัก</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.weight || ''}
                                        onChange={e => updatePersonal('weight', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เพศ</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.gender || ''}
                                        onChange={e => updatePersonal('gender', e.target.value)}
                                    >
                                        <option value="ชาย">ชาย</option>
                                        <option value="หญิง">หญิง</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สถานภาพสมรส</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.marital_status || ''}
                                        onChange={e => updatePersonal('marital_status', e.target.value)}
                                    >
                                        <option value="โสด">โสด</option>
                                        <option value="สมรส">สมรส</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '30%' }}>
                                    <p>ความพิการ</p>
                                    <div className={styles["radio-container"]} onClick={e => e.stopPropagation()}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="disability"
                                                value="none"
                                                checked={Personal.disability !== 'have'}
                                                onChange={() => updatePersonal('disability', 'none')}
                                            /> ไม่มี
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="disability"
                                                value="have"
                                                checked={Personal.disability === 'have'}
                                                onChange={() => updatePersonal('disability', 'have')}
                                            /> มีความพิการ
                                        </label>
                                    </div>
                                </div>
                                <div className={styles["name-group"]} style={{ width: '65%' }}>
                                    <p>สถานภาพทางทหาร</p>
                                    <div className={styles["radio-container"]} onClick={e => e.stopPropagation()}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="militaryStatus"
                                                value="exempt"
                                                checked={Personal.military_status === 'exempt'}
                                                onChange={() => updatePersonal('military_status', 'exempt')}
                                            /> ได้รับการยกเว้น
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="militaryStatus"
                                                value="completed"
                                                checked={Personal.military_status === 'completed'}
                                                onChange={() => updatePersonal('military_status', 'completed')}
                                            /> ผ่านการเกณฑ์ทหารแล้ว
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="militaryStatus"
                                                value="waiting"
                                                checked={Personal.military_status === 'waiting'}
                                                onChange={() => updatePersonal('military_status', 'waiting')}
                                            /> รอการเกณฑ์ทหาร
                                        </label>
                                    </div>
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
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />ประวัติการศึกษา</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
                </div>

                {showEducation && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.education ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`}>
                                <h1>ลำดับที่ 1</h1>
                                <button>เพิ่มประวัติการศึกษา</button>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>โรงเรียน/สถาบันการศึกษา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={educational[0]?.school || ''}
                                        onChange={e => updateEducational(0, 'school', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ปีจบการศึกษา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={educational[0]?.graduation || ''}
                                        onChange={e => updateEducational(0, 'graduation', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>วุฒิการศึกษา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
                                        value={educational[0]?.province || ''}
                                        onChange={e => updateEducational(0, 'province', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>อำเภอ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
                                        value={educational[0]?.study_path || ''}
                                        onChange={e => updateEducational(0, 'study_path', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เกรดเฉลี่ย</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
                                        onChange={async e => {
                                            const f = (e.target as HTMLInputElement).files?.[0];
                                            if (!f) return;
                                            const toDataUrl = (file: File) =>
                                                new Promise<string>((resolve, reject) => {
                                                    const reader = new FileReader();
                                                    reader.onload = () => resolve(String(reader.result));
                                                    reader.onerror = reject;
                                                    reader.readAsDataURL(file);
                                                });
                                            try {
                                                const dataUrl = await toDataUrl(f);
                                                updateEducational(0, 'study_results', dataUrl);
                                            } catch (err) {
                                                console.error(err);
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor="edu-upload-0"
                                    className={styles["port-upload-btn"]}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        อัพโหลดไฟล์
                                    </label>
                                    {educational[0]?.study_results && (
                                        <div className={styles['edu-file-preview']}>
                                            {educational[0]?.study_results && (
                                                educational[0].study_results.startsWith('data:image') ? (
                                                    <img
                                                        src={educational[0].study_results}
                                                        alt="แนบ ปพ."
                                                        style={{ maxWidth: '100%', maxHeight: 200, display: 'block' }}
                                                        onClick={e => e.stopPropagation()}
                                                    />
                                                ) : educational[0].study_results.startsWith('data:application/pdf') ? (
                                                    <object
                                                        data={educational[0].study_results}
                                                        type="application/pdf"
                                                        width="100%"
                                                        height="300"
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        <a href={educational[0].study_results} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                                                            ดูไฟล์/รูปที่แนบ
                                                        </a>
                                                    </object>
                                                ) : (
                                                    <a href={educational[0].study_results} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                                                        ดูไฟล์/รูปที่แนบ
                                                    </a>
                                                )
                                            )}
                                        </div>
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
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />ทักษะ/ความสามารถ</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
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
                                onClick={e => e.stopPropagation()}
                                rows={4}
                                style={{ resize: 'vertical' }}
                                value={skillsAbilities.details || ''}
                                onChange={e => updateSkills('details', e.target.value)}
                            />
                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`}>
                                <p>ทักษะด้านภาษาต่างประเทศ</p>
                                <button>เพิ่มภาษา</button>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ภาษา</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={skillsAbilities.language_skills?.[0]?.language || ''}
                                        onChange={e => updateLanguageSkill(0, 'language', e.target.value)}
                                    >
                                        <option value="อังกฤษ">อังกฤษ</option>
                                        <option value="จีน">จีน</option>
                                        <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การฟัง</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={skillsAbilities.language_skills?.[0]?.listening || ''}
                                        onChange={e => updateLanguageSkill(0, 'listening', e.target.value)}
                                    >
                                        <option value="พอใช้">พอใช้</option>
                                        <option value="ดี">ดี</option>
                                        <option value="ดีมาก">ดีมาก</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การพูด</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={skillsAbilities.language_skills?.[0]?.speaking || ''}
                                        onChange={e => updateLanguageSkill(0, 'speaking', e.target.value)}
                                    >
                                        <option value="พอใช้">พอใช้</option>
                                        <option value="ดี">ดี</option>
                                        <option value="ดีมาก">ดีมาก</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การอ่าน</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={skillsAbilities.language_skills?.[0]?.reading || ''}
                                        onChange={e => updateLanguageSkill(0, 'reading', e.target.value)}
                                    >
                                        <option value="พอใช้">พอใช้</option>
                                        <option value="ดี">ดี</option>
                                        <option value="ดีมาก">ดีมาก</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การเขียน</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={skillsAbilities.language_skills?.[0]?.writing || ''}
                                        onChange={e => updateLanguageSkill(0, 'writing', e.target.value)}
                                    >
                                        <option value="พอใช้">พอใช้</option>
                                        <option value="ดี">ดี</option>
                                        <option value="ดีมาก">ดีมาก</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <p>ทักษะอื่นๆ</p>
                            </div>
                            <textarea className={styles["port-textarea"]} onClick={e => e.stopPropagation()} rows={4} style={{ resize: 'vertical' }} />
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
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />กิจกรรม/เกียรติบัตร</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
                </div>

                {showCertificate && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.certificate ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`}>
                                <h1>ลำดับที่ 1</h1>
                                <button>เพิ่มเกียรติบัตร</button>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ชื่อโครงการ/กิจกรรม</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={activitiesCertificates[0]?.name_project || ''}
                                        onChange={e => updateActivity(0, 'name_project', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ช่วงวันที่</p>
                                    <div className={styles["date-group"]}>
                                        <select
                                            className={styles["port-input"]}
                                            value={day}
                                            onChange={(e) => setDay(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {Array.from({ length: daysInMonth }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={month}
                                            onChange={(e) => setMonth(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {thaiMonths.map((m) => (
                                                <option key={m.value} value={m.value}>{m.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={year}
                                            onChange={(e) => setYear(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                                <option key={y} value={y}>{y + 543}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>แนบรูปภาพกิจกรรม/เกียรติบัตร</p>
                                    <button className={styles['edu-upload-btn']}>อัพโหลดไฟล์</button>
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '100%' }}>
                                    <p>ระบุรายละเอียด</p>
                                    <textarea
                                        className={styles["port-textarea"]}
                                        onClick={e => e.stopPropagation()}
                                        rows={4}
                                        style={{ height: '150px', resize: 'vertical' }}
                                        value={activitiesCertificates[0]?.details || ''}
                                        onChange={e => updateActivity(0, 'details', e.target.value)}
                                    />
                                </div>
                            </div>
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
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />มหาวิทยาลัยที่ต้องการ</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
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
                                        onClick={e => e.stopPropagation()}
                                        value={universityChoice[0]?.university || ''}
                                        onChange={e => updateUniversity(0, 'university', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>คณะ</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={universityChoice[0]?.faculty || ''}
                                        onChange={e => updateUniversity(0, 'faculty', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สาขาวิชา</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
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
                                        onClick={e => e.stopPropagation()}
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
                            <button className={styles["port-btn"]} onClick={() => setAllport("allport")}>จัดการแฟ้มสะสมผลงานทั้งหมด</button>
                            <button className={styles["port-btn"]} onClick={() => setAllport("create")}>สร้างแฟ้มสะสมผลงาน</button>
                        </div>
                    </div>

                    {port === "allport" && (
                        <>
                            <div className={`${styles["portfolio-data"]} ${styles["main-portfolio"]}`}
                                onClick={() => toggleSection("personal")}
                            >
                                <div className={styles["port-data-wrapper"]} >
                                    <div className={styles["portfolio-data-content"]}>ชื่อแฟ้มผลงาน</div>
                                    <div className={styles["portfolio-data-content"]}>v</div>
                                </div>

                                {showPersonal && (
                                    <div
                                        className={`${styles["portfolio-expand"]} ${openSections.personal ? styles["slide-down"] : styles["slide-up"]}`}
                                        style={{ overflow: "hidden" }}
                                    >
                                        {renderPortfolioContent()}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {port === "create" && renderPortfolioContent()}
                </>
            )}

            <Contact />
        </>
    );
}

export default Portfolio;