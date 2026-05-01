// home.tsx — All home-page sections merged into a single file.
// Replaces: Carousel, Banner, QuickSearchHome, University, Career, Suggestion, Partner, Applying.
// Renders the right navbar based on whether the user is logged in.
// Footer is delegated to the standalone <Contact /> component (also used on other pages).

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import Contact from "./Contact";
import { getToken, isTokenExpired } from "./auth";
import "./css/home.css";

// ===================================================================
// Shared data
// ===================================================================

const HERO_SLIDES = [
    {
        image: "/img/messageImage_1764229058872.jpg",
        title: "The Success Path Designed Exclusively for You",
        subtitle: "เส้นทางความสำเร็จ ออกแบบเพื่อคุณ",
    },
    {
        image: "img/multiracial-group-young-creative-people-smart-casual-wear-discussing-business-brainstorming-meeting-ideas-mobile-application-software-design-project-modern-office-coworker-teamwork-concept.jpg",
        title: "การเรียนรู้ในยุคดิจิทัล",
        subtitle: "หลักสูตรที่ทันสมัยรองรับความต้องการของตลาดงานในอนาคต",
    },
    {
        image: "img/11177.jpg",
        title: "ชีวิตที่สมดุล",
        subtitle: "ค้นหาความรู้ที่นำไปปรับใช้ได้จริงในชีวิตประจำวัน",
    },
];

const QUICK_SEARCH_SLIDES: string[][] = [
    [
        "./logo_un/KU.png", "./logo_un/CU.png", "./logo_un/MU.svg", "./logo_un/TU.svg",
        "./logo_un/BUU.svg", "./logo_un/KMITL.svg", "./logo_un/SWU.png",
    ],
    [
        "./logo_un/BU.svg", "./logo_un/AIT.svg", "./logo_un/PIM.svg", "./logo_un/KMUTNB.svg",
        "./logo_un/KMUTT.svg", "./logo_un/RMUTI.png", "./logo_un/SDU.svg",
    ],
];

const TOP_UNI_SLIDES: string[][] = [
    [
        "https://www.chula.ac.th/wp-content/uploads/2020/05/cu-executive-hero.jpg",
        "https://f.tpkcdn.com/images-720/5d73749f9fd86421fe2c192954d912f5.jpg",
        "https://i.ytimg.com/vi/eEspYsI-zz4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC0Vv8m-5-PI-BgDSsRK_dwUzVc4g",
        "https://campus.campus-star.com/app/uploads/2019/05/DSC_0828-1024x678.jpg",
    ],
    [
        "https://campus.campus-star.com/app/uploads/2017/01/MFU-5.jpg",
        "https://campus.campus-star.com/app/uploads/2017/01/KKU-3.jpg",
        "https://campus.campus-star.com/app/uploads/2017/01/KKU-2.jpg",
        "https://campus.campus-star.com/app/uploads/2017/01/NU-4.jpeg",
    ],
    [
        "https://campus.campus-star.com/app/uploads/2017/01/KU-9.jpg",
        "https://campus.campus-star.com/app/uploads/2017/01/SUT-1.jpeg",
        "https://campus.campus-star.com/app/uploads/2017/01/06-1.jpg",
        "https://campus.campus-star.com/app/uploads/2017/01/KMITL-2.jpg",
    ],
];

const CAREER_SLIDES: string[][] = [
    [
        "./career/dev.jpg", "./career/doctor.jpg", "./career/marketing.jpg",
        "./career/business.jpg", "./career/finance.jpg",
    ],
    [
        "./career/teacher.jpg", "./career/engineer.jpg", "./career/doctor.jpg",
        "./career/lawyer.jpg", "./career/accountant.jpg",
    ],
];

const SUGGESTED_UNIS: string[] = [
    "./logo_un/KU.png", "./logo_un/CU.png", "./logo_un/MU.svg", "./logo_un/TU.svg",
    "./logo_un/BUU.svg", "./logo_un/KMITL.svg", "./logo_un/SWU.png", "./logo_un/BU.svg",
    "./logo_un/AIT.svg", "./logo_un/PIM.svg", "./logo_un/KMUTNB.svg", "./logo_un/KMUTT.svg",
    "./logo_un/RMUTI.png", "./logo_un/SDU.svg",
];

const PARTNER_LOGOS: string[] = [
    "./logo_un/PIM.svg", "./logo_un/KU.png", "./logo_un/KMUTT.svg",
    "./logo_un/BUU.svg", "./logo_un/KMITL.svg", "./logo_un/BU.svg", "./logo_un/TU.svg",
];

interface ApplyingStep {
    step: string;
    title: string;
    description: string;
    bullets: string[];
}

const APPLYING_STEPS: ApplyingStep[] = [
    {
        step: "01",
        title: "รอบ Portfolio (แฟ้มสะสมผลงาน)",
        description: "เน้นผลงานและประสบการณ์ของผู้สมัครเป็นหลัก",
        bullets: [
            "ไม่ต้องใช้คะแนนสอบกลาง (บางคณะอาจมีสอบเสริม/สัมภาษณ์)",
            "ใช้แฟ้มสะสมผลงาน เช่น ผลงานแข่งขัน, กิจกรรม, ฝึกงาน",
            "ต้องมี GPAX และคุณสมบัติตามที่คณะกำหนด",
            "เหมาะกับคนที่มีผลงานเด่นและเตรียมตัวล่วงหน้า",
        ],
    },
    {
        step: "02",
        title: "รอบ Quota (โควตา)",
        description: "รับตามพื้นที่/เงื่อนไขเฉพาะของแต่ละคณะ",
        bullets: [
            "เน้นนักเรียนในจังหวัดหรือภูมิภาคที่กำหนด",
            "อาจใช้เกรดขั้นต่ำ + คะแนนสอบ TGAT/TPAT หรือ A-Level",
            "บางคณะมีเงื่อนไขเฉพาะ เช่น แผนการเรียน วิทย์-คณิต, ศิลป์ภาษา",
            "มีโอกาสแข่งขันน้อยกว่ารอบ Admission",
        ],
    },
    {
        step: "03",
        title: "รอบ Admission (ระบบกลาง)",
        description: "รอบใหญ่ที่ใช้คำนวณคะแนนจากข้อสอบกลาง",
        bullets: [
            "ใช้คะแนน TGAT, TPAT และ A-Level ตามสัดส่วนที่คณะกำหนด",
            "ระบบคัดเลือกกลาง — จัดอันดับความต้องการคณะ",
            "เหมาะกับคนที่ไม่มี portfolio แต่พร้อมสอบคะแนน",
            "เป็นรอบที่ผู้สมัครจำนวนมากที่สุด",
        ],
    },
    {
        step: "04",
        title: "รอบ Direct Admission (รับตรงอิสระ)",
        description: "รอบสุดท้ายของปี แต่ละมหาวิทยาลัยจัดเอง",
        bullets: [
            "ใช้คะแนนสอบกลาง / สอบของมหาวิทยาลัย / สัมภาษณ์",
            "ใช้สำหรับรับเพิ่มในคณะที่ยังไม่เต็ม",
            "โอกาสสุดท้ายสำหรับคนที่พลาดรอบก่อนหน้า",
        ],
    },
];

// ===================================================================
// Section: University search (under navbar)
// ===================================================================
const SearchSection = () => {
    const navigate = useNavigate();
    const [inputUniversity, setInputUniversity] = useState("");
    const [inputProvince, setInputProvince] = useState("");
    const [inputFaculty, setInputFaculty] = useState("");

    const isThaiText = (text: string): boolean => /[\u0E00-\u0E7F]/.test(text);

    const handleClear = () => {
        setInputUniversity("");
        setInputProvince("");
        setInputFaculty("");
    };

    const handleSearch = async () => {
        const hasInput = inputUniversity.trim() || inputProvince.trim() || inputFaculty.trim();
        if (!hasInput) {
            alert("กรุณากรอกข้อมูลค้นหาอย่างน้อย 1 ช่อง");
            return;
        }

        const requestBody: any = {};
        if (inputUniversity.trim()) {
            const t = inputUniversity.trim();
            if (isThaiText(t)) requestBody.university_th = t;
            else requestBody.university_en = t;
        }
        if (inputProvince.trim()) requestBody.province = inputProvince.trim();
        if (inputFaculty.trim()) requestBody.faculty = inputFaculty.trim();

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

    return (
        <section className="dl-search-section">
            <div className="dl-search-inner">
                <h2 className="dl-search-title">
                    ค้นหามหาวิทยาลัย <span className="dl-search-subtitle">จากทั่วประเทศ</span>
                </h2>

                <div className="dl-search-row">
                    {/* University name */}
                    <div className="dl-search-input-wrap">
                        <svg className="dl-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            className="dl-search-input"
                            placeholder="ชื่อมหาวิทยาลัย (ไทย/English)"
                            value={inputUniversity}
                            onChange={(e) => setInputUniversity(e.target.value)}
                            onKeyDown={onEnter}
                        />
                        {inputUniversity && (
                            <button
                                type="button"
                                className="dl-search-clear"
                                onClick={() => setInputUniversity("")}
                                aria-label="Clear"
                            >×</button>
                        )}
                    </div>

                    {/* Province */}
                    <div className="dl-search-input-wrap">
                        <svg className="dl-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <input
                            type="text"
                            className="dl-search-input"
                            placeholder="สถานที่ตั้ง (จังหวัด)"
                            value={inputProvince}
                            onChange={(e) => setInputProvince(e.target.value)}
                            onKeyDown={onEnter}
                        />
                        {inputProvince && (
                            <button
                                type="button"
                                className="dl-search-clear"
                                onClick={() => setInputProvince("")}
                                aria-label="Clear"
                            >×</button>
                        )}
                    </div>

                    {/* Faculty */}
                    <div className="dl-search-input-wrap">
                        <svg className="dl-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                        <input
                            type="text"
                            className="dl-search-input"
                            placeholder="คณะสาขาวิชา"
                            value={inputFaculty}
                            onChange={(e) => setInputFaculty(e.target.value)}
                            onKeyDown={onEnter}
                        />
                        {inputFaculty && (
                            <button
                                type="button"
                                className="dl-search-clear"
                                onClick={() => setInputFaculty("")}
                                aria-label="Clear"
                            >×</button>
                        )}
                    </div>

                    <button className="dl-search-btn" onClick={handleSearch}>
                        ค้นหา
                    </button>
                </div>

                {/* Filter pills (placeholders, like the original) */}
                <div className="dl-search-filters">
                    <button className="dl-search-pill" disabled>ค่าเทอม ▾</button>
                    <button className="dl-search-pill" disabled>ประเภทมหาวิทยาลัย ▾</button>
                    <button className="dl-search-pill" disabled>ระดับการศึกษา ▾</button>
                    <button className="dl-search-pill" disabled>การเดินทาง ▾</button>
                    <button className="dl-search-pill" disabled>อื่นๆ ▾</button>
                    <button className="dl-search-reset" onClick={handleClear}>
                        รีเซ็ตการตั้งค่า
                    </button>
                </div>

                <div className="dl-search-deep">
                    <Link to="/quick_search" className="dl-search-deep-link">
                        ค้นหาแบบละเอียด →
                    </Link>
                </div>
            </div>
        </section>
    );
};

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
        <section className="dl-hero">
            {HERO_SLIDES.map((slide, idx) => (
                <div
                    key={idx}
                    className="dl-hero-slide"
                    style={{
                        opacity: idx === current ? 1 : 0,
                        zIndex: idx === current ? 2 : 1,
                    }}
                >
                    <img src={slide.image} alt={slide.title} className="dl-hero-img" />
                    <div className="dl-hero-overlay" />
                    <div className="dl-hero-content">
                        <h1 className="dl-hero-title">{slide.title}</h1>
                        <p className="dl-hero-sub">{slide.subtitle}</p>
                    </div>
                </div>
            ))}

            <div className="dl-hero-dots">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        className={`dl-hero-dot ${idx === current ? "dl-hero-dot-active" : ""}`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

// ===================================================================
// Section: Banner
// ===================================================================
const Banner = () => (
    <section className="dl-section dl-banner">
        <img src="/img/Group 47.png" alt="Banner" className="dl-banner-img" />
    </section>
);

// ===================================================================
// Reusable section header
// ===================================================================
const SectionHeader = ({ titleTh, titleEn }: { titleTh: string; titleEn: string }) => (
    <div className="dl-section-header">
        <h2 className="dl-section-title">
            {titleTh} <span className="dl-section-title-en">({titleEn})</span>
        </h2>
        <div className="dl-section-divider" />
    </div>
);

// ===================================================================
// Section: Quick search
// ===================================================================
const QuickSearch = () => {
    const [current, setCurrent] = useState(0);
    return (
        <section className="dl-section">
            <SectionHeader titleTh="หาที่เรียนด่วน" titleEn="Quick Search" />
            <div className="dl-slideshow">
                <button
                    className="dl-slide-btn dl-slide-prev"
                    onClick={() => setCurrent((c) => (c - 1 + QUICK_SEARCH_SLIDES.length) % QUICK_SEARCH_SLIDES.length)}
                    aria-label="Previous"
                >❮</button>
                <div className="dl-logo-grid dl-logo-grid-7">
                    {QUICK_SEARCH_SLIDES[current].map((url, i) => (
                        <div className="dl-logo-card" key={i}>
                            <img src={url} alt={`uni ${i + 1}`} />
                        </div>
                    ))}
                </div>
                <button
                    className="dl-slide-btn dl-slide-next"
                    onClick={() => setCurrent((c) => (c + 1) % QUICK_SEARCH_SLIDES.length)}
                    aria-label="Next"
                >❯</button>
            </div>
        </section>
    );
};

// ===================================================================
// Section: Top universities
// ===================================================================
const TopUniversity = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((c) => (c + 1) % TOP_UNI_SLIDES.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="dl-section">
            <SectionHeader titleTh="มหาวิทยาลัยยอดนิยม" titleEn="Top University" />
            <div className="dl-slideshow">
                <button
                    className="dl-slide-btn dl-slide-prev"
                    onClick={() => setCurrent((c) => (c - 1 + TOP_UNI_SLIDES.length) % TOP_UNI_SLIDES.length)}
                    aria-label="Previous"
                >❮</button>
                <div className="dl-image-grid dl-image-grid-4">
                    {TOP_UNI_SLIDES[current].map((url, i) => (
                        <div className="dl-image-card" key={i}>
                            <img src={url} alt={`top university ${i + 1}`} />
                        </div>
                    ))}
                </div>
                <button
                    className="dl-slide-btn dl-slide-next"
                    onClick={() => setCurrent((c) => (c + 1) % TOP_UNI_SLIDES.length)}
                    aria-label="Next"
                >❯</button>
                <div className="dl-slide-dots">
                    {TOP_UNI_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            className={`dl-slide-dot ${i === current ? "dl-slide-dot-active" : ""}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// ===================================================================
// Section: Popular careers
// ===================================================================
const PopularCareer = () => {
    const [current, setCurrent] = useState(0);
    return (
        <section className="dl-section">
            <SectionHeader titleTh="อาชีพยอดนิยม" titleEn="Popular Career" />
            <div className="dl-slideshow">
                <button
                    className="dl-slide-btn dl-slide-prev"
                    onClick={() => setCurrent((c) => (c - 1 + CAREER_SLIDES.length) % CAREER_SLIDES.length)}
                    aria-label="Previous"
                >❮</button>
                <div className="dl-image-grid dl-image-grid-5">
                    {CAREER_SLIDES[current].map((url, i) => (
                        <div className="dl-image-card" key={i}>
                            <img src={url} alt={`career ${i + 1}`} />
                        </div>
                    ))}
                </div>
                <button
                    className="dl-slide-btn dl-slide-next"
                    onClick={() => setCurrent((c) => (c + 1) % CAREER_SLIDES.length)}
                    aria-label="Next"
                >❯</button>
            </div>
        </section>
    );
};

// ===================================================================
// Section: Suggested universities
// ===================================================================
const Suggestion = () => (
    <section className="dl-section">
        <SectionHeader titleTh="มหาวิทยาลัยแนะนำ" titleEn="Suggest University" />
        <div className="dl-logo-grid dl-logo-grid-7">
            {SUGGESTED_UNIS.map((url, i) => (
                <div className="dl-logo-card" key={i}>
                    <img src={url} alt={`suggestion ${i + 1}`} />
                </div>
            ))}
        </div>
    </section>
);

// ===================================================================
// Section: Partners
// ===================================================================
const Partner = () => (
    <section className="dl-section">
        <SectionHeader titleTh="พันธมิตรของเรา" titleEn="Our Partner" />
        <div className="dl-logo-grid dl-logo-grid-7">
            {PARTNER_LOGOS.map((url, i) => (
                <div className="dl-logo-card" key={i}>
                    <img src={url} alt={`partner ${i + 1}`} />
                </div>
            ))}
        </div>
    </section>
);

// ===================================================================
// Section: Applying steps
// ===================================================================
const Applying = () => {
    const [active, setActive] = useState<number | null>(null);

    return (
        <section className="dl-section">
            <SectionHeader titleTh="เกี่ยวกับการสมัครเข้ามหาลัย" titleEn="University Applying" />
            <div className="dl-applying-grid">
                {APPLYING_STEPS.map((step, idx) => {
                    const isActive = active === idx;
                    return (
                        <div
                            key={idx}
                            className={`dl-applying-card ${isActive ? "dl-applying-card-active" : ""}`}
                            onMouseEnter={() => setActive(idx)}
                            onMouseLeave={() => setActive(null)}
                            onClick={() => setActive(isActive ? null : idx)}
                        >
                            <div className="dl-applying-step">{step.step}</div>
                            <h3 className="dl-applying-title">{step.title}</h3>
                            <p className="dl-applying-desc">{step.description}</p>
                            {isActive && (
                                <ul className="dl-applying-bullets">
                                    {step.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

// ===================================================================
// Default export — composes everything
// ===================================================================
interface HomeProps {
    /** Force a specific navbar; otherwise auto-detect from token */
    loggedIn?: boolean;
}

const Home = ({ loggedIn }: HomeProps = {}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        if (typeof loggedIn === "boolean") return loggedIn;
        const token = getToken();
        return !!token && !isTokenExpired(token);
    });

    useEffect(() => {
        if (typeof loggedIn === "boolean") {
            setIsLoggedIn(loggedIn);
        }
    }, [loggedIn]);

    return (
        <div className="dl-home">
            {isLoggedIn ? <Navlogin /> : <Nav />}

            <SearchSection />

            <HeroCarousel />
            <Banner />
            <QuickSearch />
            <TopUniversity />
            <PopularCareer />
            <Suggestion />
            <Partner />
            <Applying />

            <Contact />
        </div>
    );
};

export default Home;