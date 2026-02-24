import Nav from './nav-bar';
import Navlogin from './nav-bar(login)';
import styles from './css/portfolio.module.css';
import Contact from './HomeSection/contact';
import { useState, useMemo, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PortfolioPDF } from './MyDocument';

import {
    getDaysInMonth,

} from 'date-fns';
<<<<<<< HEAD
import { th } from 'date-fns/locale';
=======
import { picture } from 'framer-motion/client';
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48

interface PersonalInfo {
    portfolio_name?: string | null;
    introduce?: string | null;
    prefix?: string | null;
    first_name?: string | null;
    last_name?: string | null;
<<<<<<< HEAD
    date_birth?: string | null;
=======
    day?: string;
    month?: string;
    year?: string;
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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
    others_skills?: string | null;
    details?: string | null;
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

const Portfolio = () => {
<<<<<<< HEAD
    // ===== State for UI =====
=======


    const [showPopup, setShowPopup] = useState(false);

>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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
    const [month, setMonth] = useState<string>('');
    const [year, setYear] = useState<number>(new Date().getFullYear());

<<<<<<< HEAD
    // ===== State for form data =====
=======
    const daysInMonth = useMemo(() => {
        const date = new Date(year);
        return getDaysInMonth(date);
    }, [month, year]);


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


>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
    const [Personal, setPersonal] = useState<PersonalInfo>({
        portfolio_name: '',
        introduce: '',
        prefix: '',
        first_name: '',
        last_name: '',
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

<<<<<<< HEAD
    const [profileImage, setProfileImage] = useState<File | null>(null);
=======

    ;

    useEffect(() => {
        try {
            const d = new Date(year, day);
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

>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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
        others_skills: '',
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
        educational.forEach((edu, index) => {
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

            const res = await fetch('http://localhost:5000/createport', {
                method: 'POST',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: payload
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `HTTP ${res.status}`);
            }

            const data = await res.json();
            setSaveMessage('บันทึกสำเร็จ!');
            console.log('createport response', data);
        } catch (err: any) {
            console.error(err);
            setSaveMessage(`เกิดข้อผิดพลาด: ${err.message || err}`);
        } finally {
            setSaving(false);
        }
    };
<<<<<<< HEAD
=======

>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48

    // ===== Render functions =====
    const renderLanguageSkills = () => {
        return (
            <>
                {skillsAbilities.language_skills?.map((lang, idx) => (
                    <div key={idx} className={styles["personal-section"]}>
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
                                    <option value="">เลือกภาษา</option>
                                    <option value="อังกฤษ">อังกฤษ</option>
                                    <option value="จีน">จีน</option>
                                    <option value="ญี่ปุ่น">ญี่ปุ่น</option>
                                    <option value="เกาหลี">เกาหลี</option>
                                    <option value="ไทย">ไทย</option>
                                </select>
                            </div>
                            <div className={styles["name-group"]}>
                                <p>การฟัง</p>
                                <select
                                    className={styles["port-input"]}
                                    value={lang.listening || ''}
                                    onChange={e => updateLanguageSkill(idx, 'listening', e.target.value)}
                                >
                                    <option value="">เลือก</option>
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
                                    <option value="">เลือก</option>
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
                                    <option value="">เลือก</option>
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
                                    <option value="">เลือก</option>
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
                                <div className={styles["date-group"]} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.day || 1}
                                        onChange={(e) => updateActivity(idx, 'day', Number(e.target.value))}
                                        style={{ flex: 1 }}
                                    >
                                        {Array.from({ length: daysInCertificateMonth }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.month || 0}
                                        onChange={(e) => updateActivity(idx, 'month', Number(e.target.value))}
                                        style={{ flex: 1 }}
                                    >
                                        {thaiMonths.map((m) => (
                                            <option key={m.value} value={m.value}>{m.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.year || new Date().getFullYear()}
                                        onChange={(e) => updateActivity(idx, 'year', Number(e.target.value))}
                                        style={{ flex: 1 }}
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
                        <button 
                            className={styles["progress-info-btn"]} 
                            onClick={handleSavePort} 
                            disabled={saving}
                        >
                            {saving ? 'กำลังบันทึก...' : 'สร้างพอต'}
                        </button>
                        <PDFDownloadLink
                            key={JSON.stringify(Personal)}
                            document={<PortfolioPDF
                                introduce={Personal.introduce ?? ''}
                                first_name={Personal.first_name ?? ''}
                                last_name={Personal.last_name ?? ''}
                                prefix={Personal.prefix ?? ''}
                                birth_day={day ?? ''}
                                birth_month={month ?? ''}
                                birth_year={year ?? ''}
                                nationality={Personal.nationality ?? ''}
                                id_card={Personal.national_id ?? ''}
                                phonenumber1={Personal.phone_number1 ?? ''}
                                phonenumber2={Personal.phone_number2 ?? ''}
                                email={Personal.email ?? ''}
                                address={Personal.address ?? ''}
                                province={Personal.province ?? ''}
                                district={Personal.district ?? ''}
                                subdistrict={Personal.subdistrict ?? ''}
                                postal_code={Personal.postal_code ?? ''}
                                height={Personal.height ?? ''}
                                weight={Personal.weight ?? ''}
                                gender={Personal.gender ?? ''}
                                marital_status={Personal.marital_status ?? ''}
                                disability={Personal.disability ?? ''}
                                military_status={Personal.military_status ?? ''}
                                personal_image={Personal.image ? (Personal.image instanceof File ? URL.createObjectURL(Personal.image) : String(Personal.image)) : undefined}
                                skills_details={skillsAbilities.details || ''}
                                language_skill={skillsAbilities.language_skills?.[0]?.language || ''}
                                listening_skill={skillsAbilities.language_skills?.[0]?.listening || ''}
                                speaking_skill={skillsAbilities.language_skills?.[0]?.speaking || ''}
                                reading_skill={skillsAbilities.language_skills?.[0]?.reading || ''}
                                writing_skill={skillsAbilities.language_skills?.[0]?.writing || ''}
                                others_skills={skillsAbilities.others_skills || ''}
                                university={universityChoice[0]?.university || ''}
                                faculty={universityChoice[0]?.faculty || ''}
                                major={universityChoice[0]?.major || ''}
                                reason={universityChoice[0]?.details || ''}

                                school={educational[0]?.school || ''}
                                graduation={educational[0]?.graduation || ''}
                                educational_qualifications={educational[0]?.educational_qualifications || ''}
                                province_edu={educational[0]?.province || ''}
                                district_edu={educational[0]?.district || ''}
                                study_path={educational[0]?.study_path || ''}
                                grade_average={educational[0]?.grade_average || ''}
                                study_results={educational[0]?.study_results || ''}
                                

                            />}

                            fileName={
                                Personal.portfolio_name && Personal.portfolio_name.trim() !== ''
                                    ? Personal.portfolio_name
                                    : 'Portfolio.pdf'
                            }
                        >
                            {({ loading }) => (
                                <button
                                    type="button"
                                    style={{
                                        padding: '8px 16px',
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
                    </div>

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
<<<<<<< HEAD
=======
                    
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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
                                style={{ minHeight: '100px', resize: 'vertical' }}
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
<<<<<<< HEAD
                                        <option value="">เลือก</option>
=======
                                        <option value="">ไม่ระบุ</option>
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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
                                            value={Personal.day}
                                            onChange={(e) => setDay(Number(e.target.value))}
                                        >

                                            {Array.from({ length: daysInMonth }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
<<<<<<< HEAD
                                            value={month}
                                            onChange={(e) => setMonth(Number(e.target.value))}
=======
                                            value={Personal.month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            onClick={e => e.stopPropagation()}
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
                                        >

                                            <option value="มกราคม">มกราคม</option>
                                            <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                                            <option value="มีนาคม">มีนาคม</option>
                                            <option value="เมษายน">เมษายน</option>
                                            <option value="พฤษภาคม">พฤษภาคม</option>
                                            <option value="มิถุนายน">มิถุนายน</option>
                                            <option value="กรกฎาคม">กรกฎาคม</option>
                                            <option value="สิงหาคม">สิงหาคม</option>
                                            <option value="กันยายน">กันยายน</option>
                                            <option value="ตุลาคม">ตุลาคม</option>
                                            <option value="พฤศจิกายน">พฤศจิกายน</option>
                                            <option value="ธันวาคม">ธันวาคม</option>
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={Personal.year}
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
                                        style={{ minHeight: '150px', resize: 'vertical' }}
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

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ส่วนสูง (ซม.)</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.height || ''}
                                        onChange={e => updatePersonal('height', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>น้ำหนัก (กก.)</p>
                                    <input
                                        type="text"
                                        className={styles["port-input"]}
                                        value={Personal.weight || ''}
                                        onChange={e => updatePersonal('weight', e.target.value)}
                                    />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เพศ</p>
                                    <select
                                        className={styles["port-input"]}
                                        value={Personal.gender || ''}
                                        onChange={e => updatePersonal('gender', e.target.value)}
                                    >
<<<<<<< HEAD
                                        <option value="">เลือก</option>
=======
                                        <option value="" disabled>
                                            กรุณาเลือกเพศ
                                        </option>
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
                                        <option value="ชาย">ชาย</option>
                                        <option value="หญิง">หญิง</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สถานภาพสมรส</p>
                                    <select
                                        className={styles["port-input"]}
                                        value={Personal.marital_status || ''}
                                        onChange={e => updatePersonal('marital_status', e.target.value)}
                                    >
<<<<<<< HEAD
                                        <option value="">เลือก</option>
=======
                                        <option value="" disabled>
                                            กรุณาเลือกสถานภาพสมรส
                                        </option>
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
                                        <option value="โสด">โสด</option>
                                        <option value="สมรส">สมรส</option>
                                        <option value="หย่า">หย่า</option>
                                    </select>
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ความพิการ</p>
<<<<<<< HEAD
                                    <div className={styles["radio-container"]}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="disability"
                                                checked={Personal.disability !== 'have'}
                                                onChange={() => updatePersonal('disability', 'none')}
                                            /> ไม่มี
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="disability"
                                                checked={Personal.disability === 'have'}
                                                onChange={() => updatePersonal('disability', 'have')}
                                            /> มีความพิการ
                                        </label>
                                    </div>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สถานภาพทางทหาร</p>
                                    <div className={styles["radio-container"]}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="militaryStatus"
                                                checked={Personal.military_status === 'exempt'}
                                                onChange={() => updatePersonal('military_status', 'exempt')}
                                            /> ได้รับการยกเว้น
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="militaryStatus"
                                                checked={Personal.military_status === 'completed'}
                                                onChange={() => updatePersonal('military_status', 'completed')}
                                            /> ผ่านการเกณฑ์ทหารแล้ว
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="militaryStatus"
                                                checked={Personal.military_status === 'waiting'}
                                                onChange={() => updatePersonal('military_status', 'waiting')}
                                            /> รอการเกณฑ์ทหาร
                                        </label>
                                    </div>
=======
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.disability || ''}
                                        onChange={e => updatePersonal('disability', e.target.value)}
                                    >
                                        <option value="" disabled>
                                            กรุณาเลือกความพิการ
                                        </option>
                                        <option value="ไม่มี">ไม่มี</option>
                                        <option value="มี">มีความพิการ</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]} style={{ width: '30%' }}>
                                    <p>สถานภาพทางทหาร</p>
                                    <select
                                        className={styles["port-input"]}
                                        onClick={e => e.stopPropagation()}
                                        value={Personal.military_status || ''}
                                        onChange={e => updatePersonal('military_status', e.target.value)}
                                    >
                                        <option value="" disabled>
                                            กรุณาเลือกสถานภาพทางทหาร
                                        </option>
                                        <option value="ได้รับการยกเว้น">ได้รับการยกเว้น</option>
                                        <option value="รอการเกณฑ์ทหาร">รอการเกณฑ์ทหาร</option>\
                                        <option value="ผ่านการเกณฑ์ทหารแล้ว">ผ่านการเกณฑ์ทหารแล้ว</option>
                                    </select>
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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
<<<<<<< HEAD

                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`} style={{ marginBottom: '20px' }}>
                                <h3>ทักษะด้านภาษาต่างประเทศ</h3>
                                <button
                                    onClick={addLanguageSkill}
                                    style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    + เพิ่มภาษา
                                </button>
=======
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
                                        <option value="" disabled>
                                            กรุณาเลือกภาษา
                                        </option>
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
                                        <option value="" disabled>
                                            กรุณาเลือกระดับ
                                        </option>
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
                                        <option value="" disabled>
                                            กรุณาเลือกระดับ
                                        </option>
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
                                        <option value="" disabled>
                                            กรุณาเลือกระดับ
                                        </option>
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
                                        <option value="" disabled>
                                            กรุณาเลือกระดับ
                                        </option>
                                        <option value="พอใช้">พอใช้</option>
                                        <option value="ดี">ดี</option>
                                        <option value="ดีมาก">ดีมาก</option>
                                    </select>
                                </div>
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
                            </div>

                            {renderLanguageSkills()}

                            <div className={styles["personal-section"]}>
                                <p>ทักษะอื่นๆ</p>
                            </div>
<<<<<<< HEAD
                            <textarea 
                                className={styles["port-textarea"]} 
                                rows={4} 
                                style={{ resize: 'vertical' }}
                                placeholder="ระบุทักษะอื่นๆ เช่น การใช้คอมพิวเตอร์, ทักษะการสื่อสาร, ฯลฯ"
=======
                            <textarea
                                className={styles["port-textarea"]}
                                onClick={e => e.stopPropagation()}
                                rows={4}
                                style={{ resize: 'vertical' }}
                                value={skillsAbilities.others_skills || ''}
                                onChange={e => updateSkills('others_skills', e.target.value)}
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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

<<<<<<< HEAD
                            {renderActivities()}
=======
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
                                            onChange={(e) => setMonth(e.target.value)}
                                            onClick={e => e.stopPropagation()}
                                        >

                                            <option value="มกราคม">มกราคม</option>
                                            <option value="กุมภาพันธ์">กุมภาพันธ์</option>
                                            <option value="มีนาคม">มีนาคม</option>
                                            <option value="เมษายน">เมษายน</option>
                                            <option value="พฤษภาคม">พฤษภาคม</option>
                                            <option value="มิถุนายน">มิถุนายน</option>
                                            <option value="กรกฎาคม">กรกฎาคม</option>
                                            <option value="สิงหาคม">สิงหาคม</option>
                                            <option value="กันยายน">กันยายน</option>
                                            <option value="ตุลาคม">ตุลาคม</option>
                                            <option value="พฤศจิกายน">พฤศจิกายน</option>
                                            <option value="ธันวาคม">ธันวาคม</option>
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
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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
                                <div className={styles["name-group"]}>
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

    return (
        <>
            {mode === "no-login" && (
                <>
                    <Nav />
                    <h1 style={{ textAlign: 'center', padding: '40px', color: '#333' }}>
                        กรุณาลงชื่อเข้าใช้เพื่อสร้างแฟ้มสะสมผลงาน
                    </h1>
                </>
            )}

            {mode === "login" && (
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
                        <>
                            <div 
                                className={`${styles["portfolio-data"]} ${styles["main-portfolio"]}`}
                                onClick={() => toggleSection("personal")}
                            >
                                <div className={styles["port-data-wrapper"]}>
                                    <div className={styles["portfolio-data-content"]}>ชื่อแฟ้มผลงาน</div>
                                    <div className={styles["portfolio-data-content"]}>v</div>
                                </div>
<<<<<<< HEAD

                                {showPersonal && (
                                    <div
                                        className={`${styles["portfolio-expand"]} ${openSections.personal ? styles["slide-down"] : styles["slide-up"]}`}
                                        style={{ overflow: "hidden" }}
                                    >
                                        {renderPortfolioContent()}
=======
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
>>>>>>> 9ca4102539cde9c8b0523ed15f5065a82cd6fc48
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