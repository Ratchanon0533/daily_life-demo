// Nav.tsx — Modern redesign (logged in)
import './css/navbar.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getToken, forceLogout } from './auth';

interface UserProfile {
    firstname?: string;
    lastname?: string;
    username?: string;
    profile?: string;
}

const Navlogin = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile>({});
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load user from auth helper
    useEffect(() => {
        const token = getToken();
        if (!token) return;
        const userData = getUser();
        if (userData) setProfile(userData);
    }, []);

    // Sticky scroll shadow
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const isActive = (path: string) =>
        currentPath === path || currentPath.toLowerCase() === path.toLowerCase();

    const handleLogout = () => {
        if (window.confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
            forceLogout();
        }
    };

    // Avatar fallback — first letter of firstname or username
    const initial = (profile.firstname || profile.username || '?')[0].toUpperCase();

    return (
        <header className={`dl-nav ${scrolled ? 'dl-nav-scrolled' : ''}`}>
            <div className="dl-nav-inner">
                {/* Brand */}
                <a href="/HOME" className="dl-nav-brand" aria-label="Daily Life — หน้าหลัก">
                    <img
                        src="img/Dailylife Logo Navbar.png"
                        alt="Daily Life"
                        className="dl-nav-logo"
                    />
                </a>

                {/* Burger */}
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
                    <a href="/HOME" className={`dl-nav-link ${isActive('/HOME') ? 'dl-nav-link-active' : ''}`}>
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

                    {/* Profile dropdown */}
                    <div className="dl-nav-profile" ref={dropdownRef}>
                        <button
                            className="dl-nav-profile-btn"
                            onClick={() => setDropdownOpen(o => !o)}
                            aria-expanded={dropdownOpen}
                            aria-label="เมนูบัญชี"
                        >
                            {profile.profile ? (
                                <img
                                    src={profile.profile}
                                    alt="profile"
                                    className="dl-nav-avatar"
                                    onError={(e) => {
                                        // fall back to initial on broken image
                                        const img = e.currentTarget;
                                        const fb = document.createElement('div');
                                        fb.className = 'dl-nav-avatar dl-nav-avatar-fallback';
                                        fb.textContent = initial;
                                        img.parentNode?.replaceChild(fb, img);
                                    }}
                                />
                            ) : (
                                <div className="dl-nav-avatar dl-nav-avatar-fallback">{initial}</div>
                            )}
                        </button>

                        {dropdownOpen && (
                            <div className="dl-nav-dropdown" role="menu">
                                <div className="dl-nav-dropdown-header">
                                    <div className="dl-nav-dropdown-name">
                                        {profile.firstname || profile.username || 'ผู้ใช้'}
                                    </div>
                                    {profile.username && (
                                        <div className="dl-nav-dropdown-username">@{profile.username}</div>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className="dl-nav-dropdown-item"
                                    onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                                >
                                    โปรไฟล์
                                </button>
                                <button
                                    type="button"
                                    className="dl-nav-dropdown-item"
                                    onClick={() => { setDropdownOpen(false); navigate('/setting'); }}
                                >
                                    ตั้งค่า
                                </button>
                                <div className="dl-nav-dropdown-divider" />
                                <button
                                    type="button"
                                    className="dl-nav-dropdown-item dl-nav-dropdown-item-danger"
                                    onClick={() => { setDropdownOpen(false); handleLogout(); }}
                                >
                                    ออกจากระบบ
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navlogin;