// Nav.tsx — Modern redesign (logged out)
import './css/navbar.css';
import { useEffect, useState } from 'react';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Track scroll to add a subtle shadow when sticky
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const isActive = (path: string) =>
        currentPath === path || currentPath.toLowerCase() === path.toLowerCase();

    return (
        <header className={`dl-nav ${scrolled ? 'dl-nav-scrolled' : ''}`}>
            <div className="dl-nav-inner">
                {/* Brand */}
                <a href="/" className="dl-nav-brand" aria-label="Daily Life — กลับหน้าแรก">
                    <img
                        src="img/Dailylife Logo Navbar.png"
                        alt="Daily Life"
                        className="dl-nav-logo"
                    />
                </a>

                {/* Burger (mobile) */}
                <button
                    className="dl-nav-burger"
                    aria-label="เปิด/ปิดเมนู"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(o => !o)}
                >
                    <span /><span /><span />
                </button>

                {/* Menu */}
                <nav className={`dl-nav-menu ${menuOpen ? 'dl-nav-menu-open' : ''}`}>
                    <a href="/" className={`dl-nav-link ${isActive('/') ? 'dl-nav-link-active' : ''}`}>
                        หน้าแรก
                    </a>
                    <a href="/quiz" className={`dl-nav-link ${isActive('/quiz') ? 'dl-nav-link-active' : ''}`}>
                        แบบทดสอบ
                    </a>
                    <a href="/portfolio" className={`dl-nav-link ${isActive('/portfolio') ? 'dl-nav-link-active' : ''}`}>
                        แฟ้มสะสมผลงาน
                    </a>
                    <a href="/activities" className={`dl-nav-link ${isActive('/activities') ? 'dl-nav-link-active' : ''}`}>
                        ค้นหากิจกรรม
                    </a>
                    <a href="/About" className={`dl-nav-link ${isActive('/About') ? 'dl-nav-link-active' : ''}`}>
                        เกี่ยวกับเดลี่ไลพ์
                    </a>

                    <a href="/Register" className="dl-nav-cta">
                        เข้าสู่ระบบ
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Nav;