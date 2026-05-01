// Quick_search.tsx — Merged advanced-search page (formerly 4 files).
// Includes: page wrapper, hero carousel, search form, suggested universities,
// and a results placeholder. Picks the right navbar based on login state.
//
// Logic kept from the originals:
//   - searches /university/search with the same payload shape
//   - clears all 5 fields with one button
//   - rotates suggested-universities slideshow

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import Contact from "./Contact";
import { getToken, isTokenExpired } from "./auth";
import "./css/quick_search.css";

// ===================================================================
// Data
// ===================================================================

const HERO_SLIDES = [
    {
        image: "/img/handshake-close-up-executives.jpg",
        title: "The Success Path Designed Exclusively for You",
        subtitle: "เส้นทางความสำเร็จ ออกแบบเพื่อคุณ",
    },
    {
        image: "/img/multiracial-group-young-creative-people-smart-casual-wear-discussing-business-brainstorming-meeting-ideas-mobile-application-software-design-project-modern-office-coworker-teamwork-concept.jpg",
        title: "การเรียนรู้ในยุคดิจิทัล",
        subtitle: "หลักสูตรที่ทันสมัยรองรับความต้องการของตลาดงานในอนาคต",
    },
];

const SUGGESTED_UNIS_SLIDES: string[][] = [
    [
        "./logo_un/KU.png", "./logo_un/CU.png", "./logo_un/MU.svg",
        "./logo_un/TU.svg", "./logo_un/BUU.svg", "./logo_un/KMITL.svg", "./logo_un/SWU.png",
    ],
    [
        "./logo_un/BU.svg", "./logo_un/AIT.svg", "./logo_un/PIM.svg",
        "./logo_un/KMUTNB.svg", "./logo_un/KMUTT.svg", "./logo_un/RMUTI.png", "./logo_un/SDU.svg",
    ],
];

// ===================================================================
// Section: Hero carousel
// ===================================================================
const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((c) => (c + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="qs-hero">
            {HERO_SLIDES.map((slide, idx) => (
                <div
                    key={idx}
                    className="qs-hero-slide"
                    style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 2 : 1 }}
                >
                    <img src={slide.image} alt={slide.title} className="qs-hero-img" />
                    <div className="qs-hero-overlay" />
                    <div className="qs-hero-content">
                        <h1 className="qs-hero-title">{slide.title}</h1>
                        <p className="qs-hero-sub">{slide.subtitle}</p>
                    </div>
                </div>
            ))}
            <div className="qs-hero-dots">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        className={`qs-hero-dot ${idx === current ? "qs-hero-dot-active" : ""}`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

// ===================================================================
// Section: Search form
// ===================================================================
const SearchForm = () => {
    const navigate = useNavigate();
    const [university, setUniversity] = useState("");
    const [faculty, setFaculty] = useState("");
    const [major, setMajor] = useState("");
    const [province, setProvince] = useState("");
    const [other, setOther] = useState("");

    const isThaiText = (text: string): boolean => /[\u0E00-\u0E7F]/.test(text);

    const handleClear = () => {
        setUniversity("");
        setFaculty("");
        setMajor("");
        setProvince("");
        setOther("");
    };

    const handleSearch = async () => {
        const hasInput = university.trim() || faculty.trim() || major.trim() || province.trim();
        if (!hasInput) {
            alert("กรุณากรอกข้อมูลค้นหาอย่างน้อย 1 ช่อง");
            return;
        }

        const requestBody: any = {};
        if (university.trim()) {
            const t = university.trim();
            if (isThaiText(t)) requestBody.university_th = t;
            else requestBody.university_en = t;
        }
        if (faculty.trim()) requestBody.faculty = faculty.trim();
        if (major.trim()) requestBody.major = major.trim();
        if (province.trim()) requestBody.province = province.trim();

        try {
            const res = await fetch("https://api.dailylifes.online/university/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });
            const data = await res.json();
            if (data.success) {
                navigate("/search", { state: data });
            } else {
                alert(data.message || "ไม่พบข้อมูล");
            }
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาดในการค้นหา");
        }
    };

    const onEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    // Reusable input-with-icon
    const Field = ({
        icon, placeholder, value, setValue,
    }: {
        icon: React.ReactNode;
        placeholder: string;
        value: string;
        setValue: (v: string) => void;
    }) => (
        <div className="qs-field">
            <span className="qs-field-icon">{icon}</span>
            <input
                type="text"
                className="qs-field-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onEnter}
            />
            {value && (
                <button
                    type="button"
                    className="qs-field-clear"
                    onClick={() => setValue("")}
                    aria-label="Clear"
                >×</button>
            )}
        </div>
    );

    // Inline icons (small, color inherits from currentColor)
    const ICON_SEARCH = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
    const ICON_FACULTY = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
    const ICON_MAJOR = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );
    const ICON_LOCATION = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
    const ICON_OTHER = (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );

    return (
        <section className="qs-search-section">
            <div className="qs-search-inner">
                <h2 className="qs-search-title">
                    หามหาวิทยาลัย <span className="qs-search-subtitle">หาที่เรียนด่วน</span>
                </h2>

                <div className="qs-search-grid">
                    <Field icon={ICON_SEARCH} placeholder="ชื่อมหาวิทยาลัย" value={university} setValue={setUniversity} />
                    <Field icon={ICON_FACULTY} placeholder="เลือกคณะวิชา" value={faculty} setValue={setFaculty} />
                    <Field icon={ICON_MAJOR} placeholder="เลือกสาขาวิชา" value={major} setValue={setMajor} />
                    <Field icon={ICON_LOCATION} placeholder="สถานที่ตั้ง" value={province} setValue={setProvince} />
                    <Field icon={ICON_OTHER} placeholder="อื่นๆ" value={other} setValue={setOther} />
                </div>

                <div className="qs-search-actions">
                    <button className="qs-btn qs-btn-primary" onClick={handleSearch}>
                        ค้นหา
                    </button>
                    <button className="qs-btn qs-btn-secondary" onClick={handleClear}>
                        รีเซ็ตการตั้งค่า
                    </button>
                </div>
            </div>
        </section>
    );
};

// ===================================================================
// Section: Suggested universities (slideshow)
// ===================================================================
const SuggestedUniversities = () => {
    const [current, setCurrent] = useState(0);

    return (
        <section className="qs-section">
            <div className="qs-section-header">
                <h2 className="qs-section-title">
                    มหาวิทยาลัยแนะนำ <span className="qs-section-title-en">(Suggest University)</span>
                </h2>
                <div className="qs-section-divider" />
            </div>

            <div className="qs-slideshow">
                <button
                    className="qs-slide-btn qs-slide-prev"
                    onClick={() => setCurrent((c) => (c - 1 + SUGGESTED_UNIS_SLIDES.length) % SUGGESTED_UNIS_SLIDES.length)}
                    aria-label="Previous"
                >❮</button>

                <div className="qs-logo-grid">
                    {SUGGESTED_UNIS_SLIDES[current].map((url, i) => (
                        <div className="qs-logo-card" key={i}>
                            <img src={url} alt={`uni ${i + 1}`} />
                        </div>
                    ))}
                </div>

                <button
                    className="qs-slide-btn qs-slide-next"
                    onClick={() => setCurrent((c) => (c + 1) % SUGGESTED_UNIS_SLIDES.length)}
                    aria-label="Next"
                >❯</button>
            </div>
        </section>
    );
};

// ===================================================================
// Section: Results placeholder
// ===================================================================
const ResultsPlaceholder = () => (
    <section className="qs-section">
        <div className="qs-section-header">
            <h2 className="qs-section-title">
                ผลการค้นหา <span className="qs-section-title-en">(Result)</span>
            </h2>
            <div className="qs-section-divider" />
        </div>

        <div className="qs-results-empty">
            <div className="qs-results-empty-icon">🔍</div>
            <p>กรอกข้อมูลด้านบนเพื่อค้นหามหาวิทยาลัยที่ตรงกับคุณ</p>
            <Link to="/" className="qs-results-back">← กลับหน้าแรก</Link>
        </div>
    </section>
);

// ===================================================================
// Default export — composes everything
// ===================================================================
const QuickSearch = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const token = getToken();
        return !!token && !isTokenExpired(token);
    });

    // re-check once on mount in case storage changed in another tab
    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token && !isTokenExpired(token));
    }, []);

    return (
        <div className="qs-page">
            {isLoggedIn ? <Navlogin /> : <Nav />}
            <HeroCarousel />
            <SearchForm />
            <SuggestedUniversities />
            <ResultsPlaceholder />
            <Contact />
        </div>
    );
};

export default QuickSearch;