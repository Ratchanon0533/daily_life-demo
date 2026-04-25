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
    profile_image_url?: string | null;

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
    photo?: string | File | null;
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
    id: string | null;
    username: string | null;
    firstname: string | null; // เพิ่มตัวนี้
    lastname: string | null;  // เพิ่มตัวนี้
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
    const [uploadingDuringSave, setUploadingDuringSave] = useState(false);

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

    // const [userId, setUserId] = useState<number | string>('');
    const [portId, setPortId] = useState<string>('');
    const [userId, setUserId] = useState<number | string>('');
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

    // ===== Completion progress =====
    const completionPercent = useMemo(() => {
        // Accepts: non-empty string, File, non-zero number
        const isFilled = (v: any) => {
            if (v === null || v === undefined) return false;
            if (v instanceof File) return true;
            if (typeof v === 'number') return true;
            return String(v).trim() !== '';
        };

        // --- Personal info (40%) ---
        const personalFields: (keyof PersonalInfo)[] = [
            'portfolio_name', 'introduce', 'prefix', 'first_name', 'last_name',
            'date_birth', 'nationality', 'national_id', 'phone_number1', 'email',
            'address', 'province', 'district', 'subdistrict', 'postal_code'
        ];
        const filledPersonal = personalFields.filter(f => isFilled(Personal[f])).length;
        const personalScore = (filledPersonal / personalFields.length) * 40;

        // --- Profile image (12%) ---
        // Count existing URL too (for edit mode where image already uploaded)
        const hasProfile = !!profileImage || isFilled(Personal.profile_image_url);
        const profileScore = hasProfile ? 12 : 0;

        // --- Education (12%) - count filled fields across ALL education entries ---
        const eduFieldsPerEntry: (keyof EducationalItem)[] = [
            'school', 'graduation', 'educational_qualifications',
            'province', 'district', 'study_path', 'grade_average', 'study_results'
        ];
        const eduTotal = educational.length * eduFieldsPerEntry.length;
        const eduFilled = educational.reduce((sum, edu) => {
            return sum + eduFieldsPerEntry.filter(f => isFilled(edu[f])).length;
        }, 0);
        const eduScore = eduTotal > 0 ? (eduFilled / eduTotal) * 12 : 0;

        // --- Skills (12%) - details, others, plus ALL language skill fields ---
        const langFieldsPerEntry: (keyof LanguageSkill)[] = ['language', 'listening', 'speaking', 'reading', 'writing'];
        const langSkills = skillsAbilities.language_skills || [];
        // 2 fields at top level (details, others) + langFieldsPerEntry * number of languages
        const skillsTotal = 2 + (langSkills.length * langFieldsPerEntry.length);
        let skillsFilled = 0;
        if (isFilled(skillsAbilities.details)) skillsFilled++;
        if (isFilled(skillsAbilities.others)) skillsFilled++;
        langSkills.forEach(lang => {
            skillsFilled += langFieldsPerEntry.filter(f => isFilled(lang[f])).length;
        });
        const skillsScore = skillsTotal > 0 ? (skillsFilled / skillsTotal) * 12 : 0;

        // --- Activities/certificates (12%) - count across ALL entries ---
        const actFieldsPerEntry: (keyof ActivityCertificate)[] = ['name_project', 'date', 'photo', 'details'];
        const actTotal = activitiesCertificates.length * actFieldsPerEntry.length;
        const actFilled = activitiesCertificates.reduce((sum, act) => {
            return sum + actFieldsPerEntry.filter(f => isFilled(act[f])).length;
        }, 0);
        const activitiesScore = actTotal > 0 ? (actFilled / actTotal) * 12 : 0;

        // --- University (12%) - count across ALL choices ---
        const uniFieldsPerEntry: (keyof UniversityChoice)[] = ['university', 'faculty', 'major', 'details'];
        const uniTotal = universityChoice.length * uniFieldsPerEntry.length;
        const uniFilled = universityChoice.reduce((sum, u) => {
            return sum + uniFieldsPerEntry.filter(f => isFilled(u[f])).length;
        }, 0);
        const uniScore = uniTotal > 0 ? (uniFilled / uniTotal) * 12 : 0;

        const total = personalScore + profileScore + eduScore + skillsScore + activitiesScore + uniScore;
        return Math.round(total);
    }, [Personal, profileImage, educational, skillsAbilities, activitiesCertificates, universityChoice]);

    const completionLabel = useMemo(() => {
        if (completionPercent >= 100) return 'ครบถ้วน';
        if (completionPercent >= 70) return 'เกือบครบแล้ว';
        if (completionPercent >= 40) return 'กำลังดำเนินการ';
        if (completionPercent > 0) return 'เริ่มต้น';
        return 'ยังไม่ได้กรอกข้อมูล';
    }, [completionPercent]);

    // Status colors matched to the completion level (used for bar + info boxes)
    const completionStatus = useMemo(() => {
        if (completionPercent >= 100) {
            return { bar: '#28a745', bg: '#d4edda', text: '#155724', border: '#28a745', icon: '✅' };
        }
        if (completionPercent >= 70) {
            return { bar: '#17a2b8', bg: '#d1ecf1', text: '#0c5460', border: '#17a2b8', icon: '💪' };
        }
        if (completionPercent >= 40) {
            return { bar: '#ffc107', bg: '#fff3cd', text: '#856404', border: '#ffc107', icon: '⏳' };
        }
        if (completionPercent > 0) {
            return { bar: '#fd7e14', bg: '#ffe5d0', text: '#7d3c00', border: '#fd7e14', icon: '📝' };
        }
        return { bar: '#dc3545', bg: '#f8d7da', text: '#721c24', border: '#dc3545', icon: '⚠️' };
    }, [completionPercent]);

    // Per-section completion flags (true = at least one required field filled in that section)
    const sectionStatus = useMemo(() => {
        const isFilled = (v: any) => {
            if (v === null || v === undefined) return false;
            if (v instanceof File) return true;
            if (typeof v === 'number') return true;
            return String(v).trim() !== '';
        };

        // Personal: require name + at least one contact field
        const personalDone =
            isFilled(Personal.first_name) &&
            isFilled(Personal.last_name) &&
            (isFilled(Personal.phone_number1) || isFilled(Personal.email));

        // Education: at least school + qualification on the first entry
        const edu = educational[0];
        const educationDone = !!edu && isFilled(edu.school) && isFilled(edu.educational_qualifications);

        // Skills: details OR at least one language with all 5 sub-fields filled
        const langOK = (skillsAbilities.language_skills || []).some(l =>
            isFilled(l.language) && isFilled(l.listening) && isFilled(l.speaking) && isFilled(l.reading) && isFilled(l.writing)
        );
        const skillsDone = isFilled(skillsAbilities.details) || langOK;

        // Activities: at least one activity with name + date
        const activitiesDone = activitiesCertificates.some(a => isFilled(a.name_project) && isFilled(a.date));

        // University: at least one with university + faculty + major filled
        const uni = universityChoice[0];
        const universityDone = !!uni && isFilled(uni.university) && isFilled(uni.faculty) && isFilled(uni.major);

        return {
            personal: personalDone,
            education: educationDone,
            skills: skillsDone,
            activities: activitiesDone,
            university: universityDone,
        };
    }, [Personal, educational, skillsAbilities, activitiesCertificates, universityChoice]);

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
            const storedUserData = localStorage.getItem("user") || '{}';
            try {
                const maybeObj = userData || JSON.parse(storedUserData);
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
                setPortId(`port_${seed}_${Date.now()}_${Math.floor(Math.random() * 1000)}`);
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

    // ===== File upload to API (for use during save) =====
    const uploadFileToAPI = async (file: File, endpoint: 'profile' | 'transcript' | 'certificate'): Promise<string | null> => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`https://api.dailylifes.online/upload/${endpoint}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await res.json();
            if (res.ok && data.imageUrl) {
                return data.imageUrl;
            } else {
                console.error('Upload failed:', data.message);
                throw new Error(data.message || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            throw err;
        }
    };

    // ===== File input handlers (store files in state, don't upload yet) =====
    const handleProfileFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setProfileImage(file);
    };

    const handleEducationFileUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        updateEducational(index, 'study_results', file);
    };

    const handleCertificateFileSelect = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const file = e.target.files?.[0];
        if (file) {
            updateActivity(idx, 'photo', file);
        }
    };

    // ===== Handle save with file uploads =====
    const handleSavePort = async () => {
        setSaveMessage(null);
        setSaving(true);
        setUploadingDuringSave(true);
        try {
            // Step 1: Upload profile image if exists
            let profileImageUrl: string | null = null;
            if (profileImage instanceof File) {
                profileImageUrl = await uploadFileToAPI(profileImage, 'profile');
            }

            // Step 2: Upload transcript files
            const educationalWithUrls = await Promise.all(
                educational.map(async (edu) => {
                    let studyResultsUrl: string | null = null;
                    if (edu.study_results instanceof File) {
                        studyResultsUrl = await uploadFileToAPI(edu.study_results, 'transcript');
                    }
                    return {
                        ...edu,
                        study_results: studyResultsUrl || (typeof edu.study_results === 'string' ? edu.study_results : null),
                    };
                })
            );

            // Step 3: Upload certificate files
            const activitiesWithUrls = await Promise.all(
                activitiesCertificates.map(async (activity) => {
                    const { photo, day, month, year, ...rest } = activity;
                    let photoUrl: string | null = null;
                    if (photo instanceof File) {
                        photoUrl = await uploadFileToAPI(photo, 'certificate');
                    } else if (typeof photo === 'string') {
                        photoUrl = photo;
                    }
                    return {
                        ...rest,
                        photo_url: photoUrl,
                    };
                })
            );

            // Step 5: Send to createport or updateport endpoint
            const token = localStorage.getItem('token');

            let res: Response;
            if (editingPortId) {
                // UPDATE existing portfolio
                const updatePayload = {
                    user_id: userId,
                    port_id: editingPortId,
                    personal_info: {
                        ...Personal,
                        profile_image_url: profileImageUrl ?? Personal.profile_image_url ?? null,
                    },
                    educational: educationalWithUrls,
                    skills_abilities: skillsAbilities,
                    activities_certificates: activitiesWithUrls,
                    university_choice: universityChoice
                };
                res = await fetch(`https://api.dailylifes.online/updateport/${editingPortId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                    },
                    body: JSON.stringify(updatePayload)
                });
            } else {
                // CREATE new portfolio
                const formData = new FormData();
                const data = {
                    user_id: userId,
                    port_id: portId,
                    personal_info: {
                        ...Personal,
                        profile_image_url: profileImageUrl,
                    },
                    educational: educationalWithUrls,
                    skills_abilities: skillsAbilities,
                    activities_certificates: activitiesWithUrls,
                    university_choice: universityChoice
                };
                formData.append('data', JSON.stringify(data));
                res = await fetch('https://api.dailylifes.online/createport', {
                    method: 'POST',
                    headers: {
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                    },
                    body: formData
                });
            }

            if (!res.ok) {
                const text = await res.text();
                console.log("❌ Backend error:", text);
                throw new Error(`HTTP ${res.status}: ${text}`);
            }

            setSaveMessage(editingPortId ? 'อัปเดตสำเร็จ!' : 'บันทึกสำเร็จ!');
            if (editingPortId) {
                setEditingPortId(null);
            } else {
                // Regenerate portId for the next create so we don't collide
                const storedUserData = localStorage.getItem("user");
                const parsed = storedUserData ? JSON.parse(storedUserData) : null;
                const seed = parsed?.username || 'anon';
                setPortId(`port_${seed}_${Date.now()}_${Math.floor(Math.random() * 1000)}`);
            }
            // setTimeout(() => location.reload(), 1500);
        } catch (err: any) {
            console.error(err);
            setSaveMessage(`เกิดข้อผิดพลาด: ${err.message || err}`);
        } finally {
            setSaving(false);
            setUploadingDuringSave(false);
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
                                        style={{ flex: 1, minWidth: '120px' }}
                                    >
                                        {Array.from({ length: daysInCertificateMonth }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.month || 0}
                                        onChange={(e) => updateActivity(idx, 'month', Number(e.target.value))}
                                        style={{ flex: 1, minWidth: '120px' }}
                                    >
                                        {thaiMonths.map((m) => (
                                            <option key={m.value} value={m.value}>{m.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        className={styles["port-input"]}
                                        value={activity.year || new Date().getFullYear()}
                                        onChange={(e) => updateActivity(idx, 'year', Number(e.target.value))}
                                        style={{ flex: 1, minWidth: '120px' }}
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
                                        disabled={saving}
                                        onChange={e => handleCertificateFileSelect(e, idx)}
                                    />
                                    <label
                                        htmlFor={`cert-upload-${idx}`}
                                        className={styles["port-upload-btn"]}
                                        style={{ cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}
                                    >
                                        {activity.photo instanceof File ? '✓ เลือกไฟล์แล้ว' : 'เลือกรูปภาพ'}
                                    </label>
                                    {activity.photo instanceof File && (
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
                                disabled={saving}
                                onChange={handleProfileFileSelect}
                            />
                            <label
                                htmlFor="port-image-upload1"
                                className={styles["port-upload-btn"]}
                                style={{ opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
                            >
                                {profileImage ? '✓ เลือกรูปแล้ว' : 'อัพโหลดรูปภาพ'}
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
                        <p>ความสมบูรณ์ของแฟ้มสะสมผลงาน : {completionLabel}</p>
                        <p style={{ color: completionStatus.text, fontWeight: 'bold' }}>{completionPercent}%</p>
                    </div>
                    <div
                        className={styles["bar"]}
                        style={{
                            position: 'relative',
                            background: '#e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}
                    >
                        <div
                            style={{
                                width: `${completionPercent}%`,
                                height: '100%',
                                background: completionStatus.bar,
                                transition: 'width 0.4s ease, background 0.4s ease'
                            }}
                        />
                    </div>
                    <div
                        className={styles["progress-info"]}
                        style={{
                            background: completionStatus.bg,
                            color: completionStatus.text,
                            borderLeft: `4px solid ${completionStatus.border}`,
                            padding: '10px 14px',
                            borderRadius: '6px',
                            fontWeight: 500
                        }}
                    >
                        <span style={{ marginRight: '8px' }}>{completionStatus.icon}</span>
                        {completionPercent >= 100 ? 'แฟ้มสะสมผลงานของคุณสมบูรณ์แล้ว' : `ยังขาดอีก ${100 - completionPercent}% เพื่อให้สมบูรณ์`}
                    </div>
                    <div
                        className={styles["progress-info"]}
                        style={{
                            background: completionStatus.bg,
                            color: completionStatus.text,
                            borderLeft: `4px solid ${completionStatus.border}`,
                            padding: '10px 14px',
                            borderRadius: '6px',
                            fontWeight: 500
                        }}
                    >
                        <span style={{ marginRight: '8px' }}>{completionStatus.icon}</span>
                        {completionPercent >= 100 ? 'ข้อมูลครบถ้วน' : 'กรุณากรอกข้อมูลให้ครบถ้วน'}
                    </div>
                    <div className={styles["progress-info-btn-group"]}>
                        <button
                            className={styles["progress-info-btn"]}
                            onClick={handleSavePort}
                            disabled={saving || uploadingDuringSave}
                        >
                            {uploadingDuringSave ? 'กำลังอัพโหลดไฟล์...' : (saving ? 'กำลังบันทึก...' : (editingPortId ? 'อัปเดตข้อมูล' : 'บันทึกข้อมูล'))}
                        </button>
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
                                    study_results={educational[0]?.study_results && educational[0].study_results instanceof File ? URL.createObjectURL(educational[0].study_results) : (typeof educational[0]?.study_results === 'string' ? educational[0].study_results : '')}
                                    province_edu={educational[0]?.province || ''}
                                    district_edu={educational[0]?.district || ''}

                                    skills_details={skillsAbilities.details || ''}
                                    others_skills={skillsAbilities.others || ''}
                                    skills={skillsAbilities.language_skills || []}

                                    activities={activitiesCertificates.map(act => ({
                                        name_project: act.name_project,
                                        date: act.date,
                                        description: act.details,
                                        photos: act.photo instanceof File ? [URL.createObjectURL(act.photo)] : (typeof act.photo === 'string' ? [act.photo] : [])
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
                                        padding: '8px',
                                        backgroundColor: loading ? '#ccc' : '#e67e22',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: loading ? 'not-allowed' : 'pointer',


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
                </div>
            </div>

            {/* ข้อมูลส่วนตัว */}
            <div className={`${styles["portfolio-data"]} ${openSections.personal ? styles["open"] : ""}`}
                onClick={() => toggleSection("personal")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}>
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: sectionStatus.personal ? '#28a745' : '#dc3545',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginRight: '8px',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {sectionStatus.personal ? '✓' : '✗'}
                        </span>
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
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: sectionStatus.education ? '#28a745' : '#dc3545',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginRight: '8px',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {sectionStatus.education ? '✓' : '✗'}
                        </span>
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
                                        disabled={saving}
                                        onChange={e => handleEducationFileUpload(e, 0)}
                                    />
                                    <label
                                        htmlFor="edu-upload-0"
                                        className={styles["port-upload-btn"]}
                                        style={{ cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}
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
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: sectionStatus.skills ? '#28a745' : '#dc3545',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginRight: '8px',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {sectionStatus.skills ? '✓' : '✗'}
                        </span>
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
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: sectionStatus.activities ? '#28a745' : '#dc3545',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginRight: '8px',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {sectionStatus.activities ? '✓' : '✗'}
                        </span>
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
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: sectionStatus.university ? '#28a745' : '#dc3545',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginRight: '8px',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            {sectionStatus.university ? '✓' : '✗'}
                        </span>
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

    // ===== Delete portfolio function =====
    const handleDeletePortfolio = async (port_id: string) => {
        // ยืนยันก่อนลบ
        const confirmDelete = window.confirm(
            `คุณแน่ใจหรือว่าต้องการลบแฟ้มสะสมผลงาน? การลบนี้ไม่สามารถกู้คืนได้`
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://api.dailylifes.online/deleteport/${port_id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(`เกิดข้อผิดพลาด: ${data.message || 'ไม่สามารถลบ Portfolio'}`);
                return;
            }

            if (data.success) {
                alert('ลบ Portfolio สำเร็จ');
                // รีเฟรชรายการ
                await handlegetport();
            }
        } catch (error: any) {
            console.error('Delete error:', error);
            alert(`เกิดข้อผิดพลาด: ${error.message}`);
        }
    };

    // เพิ่ม state
    const [portList, setPortList] = useState<any[]>([]);
    const [editingPortId, setEditingPortId] = useState<string | null>(null);


    const handlegetport = async () => {
        try {
            const response = await fetch(`https://api.dailylifes.online/getport/${userData?.id}`);
            const result = await response.json();
            if (result.success) {
                // Fetch portfolio_name for each port from personal_info
                const enrichedPorts = await Promise.all(
                    result.data.map(async (p: any) => {
                        try {
                            const piRes = await fetch(`https://api.dailylifes.online/getpersonal_info/${p.port_id}`);
                            const piJson = await piRes.json();
                            const name = piJson?.data?.[0]?.portfolio_name || null;
                            return { ...p, portfolio_name: name, created_at: p.created_at || new Date().toISOString() };
                        } catch {
                            return { ...p, portfolio_name: null, created_at: p.created_at || new Date().toISOString() };
                        }
                    })
                );
                setPortList(enrichedPorts);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (port === "allport" && userData?.id) {
            handlegetport();
        }
    }, [port, userData?.id]);

    // ===== Load portfolio data for editing =====
    const handleEditPortfolio = async (port_id: string) => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            // Fetch all 5 sections in parallel
            const [
                personalRes,
                educationalRes,
                skillsRes,
                activitiesRes,
                universityRes
            ] = await Promise.all([
                fetch(`https://api.dailylifes.online/getpersonal_info/${port_id}`, { headers }),
                fetch(`https://api.dailylifes.online/geteducational/${port_id}`, { headers }),
                fetch(`https://api.dailylifes.online/getskills_abilities/${port_id}`, { headers }),
                fetch(`https://api.dailylifes.online/getactivities_certificates/${port_id}`, { headers }),
                fetch(`https://api.dailylifes.online/getuniversity_choice/${port_id}`, { headers }),
            ]);

            const [personalData, educationalData, skillsData, activitiesData, universityData] = await Promise.all([
                personalRes.json(),
                educationalRes.json(),
                skillsRes.json(),
                activitiesRes.json(),
                universityRes.json(),
            ]);

            // --- Personal info ---
            if (personalData.success && personalData.data?.length > 0) {
                const p = personalData.data[0];
                setPersonal(p);
                if (p.date_birth) {
                    const d = new Date(p.date_birth);
                    if (!isNaN(d.getTime())) {
                        setDay(d.getDate());
                        setMonth(d.getMonth());
                        setYear(d.getFullYear());
                    }
                }
            }

            // --- Educational ---
            if (educationalData.success && educationalData.data?.length > 0) {
                setEducational(educationalData.data);
            }

            // --- Skills: backend returns flat rows (one row per language), group them ---
            if (skillsData.success && skillsData.data?.length > 0) {
                const rows = skillsData.data;
                // details & others are the same across rows (from skills_abilities table)
                const details = rows[0].details ?? '';
                const others = rows[0].others ?? '';
                // Each row is one language skill
                const language_skills: LanguageSkill[] = rows
                    .filter((r: any) => r.language) // skip rows with no language
                    .map((r: any) => ({
                        language: r.language,
                        listening: r.listening,
                        speaking: r.speaking,
                        reading: r.reading,
                        writing: r.writing,
                    }));
                setSkillsAbilities({
                    details,
                    others,
                    language_skills: language_skills.length > 0
                        ? language_skills
                        : [{ language: '', listening: '', speaking: '', reading: '', writing: '' }]
                });
            }

            // --- Activities/certificates ---
            if (activitiesData.success && activitiesData.data?.length > 0) {
                const activities = activitiesData.data.map((act: any) => {
                    let actDay = 1, actMonth = 0, actYear = new Date().getFullYear();
                    const photo = act.photo_url || act.photo || null;
                    if (act.date) {
                        const d = new Date(act.date);
                        if (!isNaN(d.getTime())) {
                            actDay = d.getDate();
                            actMonth = d.getMonth();
                            actYear = d.getFullYear();
                        }
                    }
                    return { ...act, photo, day: actDay, month: actMonth, year: actYear };
                });
                setActivitiesCertificates(activities);
            }

            // --- University choice ---
            if (universityData.success && universityData.data?.length > 0) {
                setUniversityChoice(universityData.data);
            }

            // Switch to edit mode
            setEditingPortId(port_id);
            setAllport("create");

        } catch (error: any) {
            console.error('Edit load error:', error);
            alert(`เกิดข้อผิดพลาด: ${error.message}`);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                                onClick={() => {
                                    setAllport("create");
                                    setEditingPortId(null);
                                    // Generate a fresh portId whenever user opens the create tab
                                    const storedUserData = localStorage.getItem("user");
                                    const parsed = storedUserData ? JSON.parse(storedUserData) : null;
                                    const seed = parsed?.username || 'anon';
                                    setPortId(`port_${seed}_${Date.now()}_${Math.floor(Math.random() * 1000)}`);
                                }}
                                style={{ backgroundColor: port === "create" ? '#007bff' : '#6c757d' }}
                            >
                                สร้างแฟ้มสะสมผลงาน
                            </button>
                        </div>
                    </div>

                    {port === "allport" && (
                        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                            <h2 style={{ marginBottom: '24px', color: '#333' , fontFamily: 'Kanit, sans-serif'}}>แฟ้มสะสมผลงานของฉัน</h2>

                            {portList.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px 200px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '8px',
                                    color: '#666'
                                }}>
                                    <p style={{ fontSize: '16px', marginBottom: '20px' }}>
                                        คุณยังไม่มีแฟ้มสะสมผลงาน
                                    </p>
                                    <button
                                        onClick={() => setAllport("create")}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '14px'
                                        }}
                                    >
                                        สร้างแฟ้มสะสมผลงานใหม่
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {portList.map((item) => (
                                        <div
                                            key={item.port_id}
                                            style={{
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                padding: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                background: '#fff',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                                            }}
                                        >
                                            {/* Profile section */}
                                            <div
                                                onClick={() => handleEditPortfolio(item.port_id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        parent.style.background = '#f5f5f5';
                                                        parent.style.borderColor = '#0066cc';
                                                        parent.style.boxShadow = '0 2px 8px rgba(0, 102, 204, 0.1)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    const parent = e.currentTarget.parentElement;
                                                    if (parent) {
                                                        parent.style.background = '#fff';
                                                        parent.style.borderColor = '#ddd';
                                                        parent.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                                                    }
                                                }}
                                            >
                                                {/* Profile image */}
                                                {item.profile_url ? (
                                                    <img
                                                        src={item.profile_url}
                                                        alt={item.portfolio_name}
                                                        style={{
                                                            width: '60px',
                                                            height: '60px',
                                                            borderRadius: '8px',
                                                            objectFit: 'cover',
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: '60px',
                                                            height: '60px',
                                                            borderRadius: '8px',
                                                            background: '#e0e0e0',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '24px',
                                                            color: '#888',
                                                            flexShrink: 0
                                                        }}
                                                    >
                                                        📁
                                                    </div>
                                                )}

                                                {/* Portfolio info */}
                                                <div style={{ textAlign: 'left' }}>
                                                    <div style={{
                                                        fontWeight: 'bold',
                                                        fontSize: '16px',
                                                        color: '#000000',
                                                        marginBottom: '4px'
                                                    }}>
                                                        {item.portfolio_name || 'ไม่มีชื่อ'}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '12px',
                                                        color: '#666',
                                                        marginBottom: '4px'
                                                    }}>
                                                        {new Date(item.created_at).toLocaleDateString('th-TH', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '11px',
                                                        color: '#999'
                                                    }}>
                                                        ID: {item.port_id}
                                                    </div>
                                                </div>

                                                {/* Arrow icon */}
                                                <div style={{
                                                    fontSize: '18px',
                                                    color: '#0066cc',
                                                    transition: 'transform 0.3s ease'
                                                }}>
                                                    →
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div style={{
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end'
                                            }}>
                                                {/* Edit button */}
                                                <button
                                                    onClick={() => handleEditPortfolio(item.port_id)}
                                                    style={{
                                                        padding: '10px 28px',
                                                        backgroundColor: '#007bff',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        fontWeight: 'bold',
                                                        transition: 'all 0.3s ease',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#0056b3';
                                                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 86, 179, 0.3)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#007bff';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    แก้ไข
                                                </button>

                                                {/* Delete button */}
                                                <button
                                                    onClick={() => handleDeletePortfolio(item.port_id)}
                                                    style={{
                                                        padding: '10px 28px',
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        fontWeight: 'bold',
                                                        transition: 'all 0.3s ease',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#c82333';
                                                        e.currentTarget.style.boxShadow = '0 2px 6px rgba(220, 53, 69, 0.3)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#dc3545';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                >
                                                    ลบ
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                    )}

                    {port === "create" && renderPortfolioContent()}
                </>
            )}
            </div>

            <Contact />
        </div>
    );
}

export default Portfolio;