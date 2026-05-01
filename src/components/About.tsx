// About.tsx — Merged "เกี่ยวกับเดลี่ไลพ์" page (formerly About + about-carousel + about-main).
// Sections: navbar (login-aware), hero carousel, pricing tier cards, footer.

import { useEffect, useState } from "react";
import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import Contact from "./Contact";
import { getToken, isTokenExpired } from "./auth";
import "./css/about.css";

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

interface PricingTier {
    title: string;
    price: string;
    description: string;
    features: string[];
    highlight?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
    {
        title: "Free",
        price: "฿0",
        description: "เริ่มต้นใช้งานฟรี",
        features: [
            "สร้างแฟ้มสะสมผลงานพื้นฐาน",
            "ค้นหามหาวิทยาลัย",
            "เข้าถึงแบบทดสอบฟรี",
        ],
    },
    {
        title: "Tier 1",
        price: "฿99",
        description: "/เดือน",
        features: [
            "ฟีเจอร์ทั้งหมดของ Free",
            "เทมเพลต portfolio เพิ่มเติม",
            "ดาวน์โหลด PDF ไม่จำกัด",
        ],
    },
    {
        title: "Tier 2",
        price: "฿199",
        description: "/เดือน",
        features: [
            "ฟีเจอร์ทั้งหมดของ Tier 1",
            "ที่ปรึกษาเฉพาะบุคคล",
            "เข้าถึงข้อมูลมหาวิทยาลัยขั้นสูง",
        ],
        highlight: true,
    },
    {
        title: "Tier 3",
        price: "฿399",
        description: "/เดือน",
        features: [
            "ฟีเจอร์ทั้งหมดของ Tier 2",
            "Priority support 24/7",
            "Career coaching session",
        ],
    },
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
        <section className="ab-hero">
            {HERO_SLIDES.map((slide, idx) => (
                <div
                    key={idx}
                    className="ab-hero-slide"
                    style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 2 : 1 }}
                >
                    <img src={slide.image} alt={slide.title} className="ab-hero-img" />
                    <div className="ab-hero-overlay" />
                    <div className="ab-hero-content">
                        <h1 className="ab-hero-title">{slide.title}</h1>
                        <p className="ab-hero-sub">{slide.subtitle}</p>
                    </div>
                </div>
            ))}

            <div className="ab-hero-dots">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        className={`ab-hero-dot ${idx === current ? "ab-hero-dot-active" : ""}`}
                        onClick={() => setCurrent(idx)}
                        aria-label={`Slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

// ===================================================================
// Section: Pricing tiers
// ===================================================================
const Pricing = () => (
    <section className="ab-section">
        <div className="ab-section-header">
            <h2 className="ab-section-title">
                ราคา <span className="ab-section-title-en">(Pricing)</span>
            </h2>
            <div className="ab-section-divider" />
        </div>

        <div className="ab-pricing-grid">
            {PRICING_TIERS.map((tier, idx) => (
                <div
                    key={idx}
                    className={`ab-pricing-card ${tier.highlight ? "ab-pricing-card-highlight" : ""}`}
                >
                    {tier.highlight && (
                        <div className="ab-pricing-badge">แนะนำ</div>
                    )}
                    <h3 className="ab-pricing-title">{tier.title}</h3>
                    <div className="ab-pricing-price">
                        <span className="ab-pricing-amount">{tier.price}</span>
                        <span className="ab-pricing-period">{tier.description}</span>
                    </div>
                    <ul className="ab-pricing-features">
                        {tier.features.map((f, j) => (
                            <li key={j}>{f}</li>
                        ))}
                    </ul>
                    <button className="ab-pricing-btn">
                        เลือกแผนนี้
                    </button>
                </div>
            ))}
        </div>
    </section>
);

// ===================================================================
// Default export
// ===================================================================
const About = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const token = getToken();
        return !!token && !isTokenExpired(token);
    });

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token && !isTokenExpired(token));
    }, []);

    return (
        <div className="ab-page">
            {isLoggedIn ? <Navlogin /> : <Nav />}
            <HeroCarousel />
            <Pricing />
            <Contact />
        </div>
    );
};

export default About;