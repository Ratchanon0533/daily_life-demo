// Nav.tsx — Modern redesign (logged in)
// Now includes an inline Profile modal (no separate /profile page).
import './css/navbar.css';
import { useEffect, useRef, useState } from 'react';
import { getUser, getToken, forceLogout } from './auth';

interface UserProfile {
    firstname?: string;
    lastname?: string;
    username?: string;
    profile?: string;
}

const Navlogin = () => {
    const [profile, setProfile] = useState<UserProfile>({});
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Profile-modal local state
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [draftDisplay, setDraftDisplay] = useState('');
    const [draftUsername, setDraftUsername] = useState('');
    const [draftImageFile, setDraftImageFile] = useState<File | null>(null);
    const [draftImagePreview, setDraftImagePreview] = useState<string | null>(null);

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

    // Close modal on Escape
    useEffect(() => {
        if (!profileModalOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeProfileModal();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [profileModalOpen]);

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const isActive = (path: string) =>
        currentPath === path || currentPath.toLowerCase() === path.toLowerCase();

    const handleLogout = () => {
        if (window.confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
            forceLogout();
        }
    };

    // Open the profile modal — seed drafts from current profile
    const openProfileModal = () => {
        const display = `${profile.firstname || ''}${profile.lastname ? ' ' + profile.lastname : ''}`.trim();
        setDraftDisplay(display);
        setDraftUsername(profile.username || '');
        setDraftImageFile(null);
        setDraftImagePreview(profile.profile || null);
        setEditing(false);
        setProfileModalOpen(true);
        setDropdownOpen(false);
    };

    const closeProfileModal = () => {
        setProfileModalOpen(false);
        setEditing(false);
        setDraftImageFile(null);
        if (draftImagePreview && draftImagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(draftImagePreview);
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setDraftImageFile(file);
        if (draftImagePreview && draftImagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(draftImagePreview);
        }
        setDraftImagePreview(URL.createObjectURL(file));
    };

    // Save draft → API → update local profile + storage
    const handleSave = async () => {
        const stored = getUser() || {};
        if (!stored.id) {
            alert('ไม่พบข้อมูลผู้ใช้');
            return;
        }

        // Split display name back into firstname / lastname
        const parts = draftDisplay.trim().split(/\s+/);
        const firstname = parts[0] || '';
        const lastname = parts.slice(1).join(' ');

        setSaving(true);
        try {
            let body: BodyInit;
            const headers: Record<string, string> = {};

            if (draftImageFile) {
                const fd = new FormData();
                fd.append('profile_image', draftImageFile);
                fd.append('firstname', firstname);
                fd.append('lastname', lastname);
                fd.append('username', draftUsername);
                body = fd;
            } else {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify({ firstname, lastname, username: draftUsername });
            }

            const res = await fetch(`https://api.dailylifes.online/user/update/${stored.id}`, {
                method: 'PUT',
                headers,
                body,
            });
            const data = await res.json();
            if (!res.ok) {
                alert('Update failed: ' + (data.message || res.statusText));
                return;
            }

            const updated: UserProfile = {
                ...profile,
                firstname,
                lastname,
                username: draftUsername,
                profile: data?.user?.profile_image || draftImagePreview || profile.profile,
            };

            // Persist back to whichever storage already holds the session
            const merged = JSON.stringify({ ...stored, ...updated });
            if (localStorage.getItem('user')) localStorage.setItem('user', merged);
            else if (sessionStorage.getItem('user')) sessionStorage.setItem('user', merged);

            setProfile(updated);
            setEditing(false);
            alert('บันทึกข้อมูลเรียบร้อย');
        } catch (err) {
            console.error(err);
            alert('เกิดข้อผิดพลาดในการบันทึก');
        } finally {
            setSaving(false);
        }
    };

    // Avatar fallback — first letter of firstname or username
    const initial = (profile.firstname || profile.username || '?')[0].toUpperCase();

    return (
        <>
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
                                        onClick={openProfileModal}
                                    >
                                        โปรไฟล์
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

            {/* ===== Profile modal ===== */}
            {profileModalOpen && (
                <div
                    className="dl-profile-modal-backdrop"
                    onClick={closeProfileModal}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="dl-profile-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="dl-profile-modal-header">
                            <h2 className="dl-profile-modal-title">
                                {editing ? 'แก้ไขโปรไฟล์' : 'โปรไฟล์'}
                            </h2>
                            <button
                                className="dl-profile-modal-close"
                                onClick={closeProfileModal}
                                aria-label="ปิด"
                            >×</button>
                        </div>

                        <div className="dl-profile-modal-body">
                            {/* Avatar with edit button overlay */}
                            <div className="dl-profile-avatar-wrap">
                                <div className="dl-profile-avatar-ring">
                                    {draftImagePreview ? (
                                        <img
                                            src={draftImagePreview}
                                            alt="profile"
                                            className="dl-profile-avatar"
                                        />
                                    ) : (
                                        <div className="dl-profile-avatar dl-profile-avatar-fallback">
                                            {initial}
                                        </div>
                                    )}
                                </div>
                                {editing && (
                                    <label className="dl-profile-avatar-edit" aria-label="เลือกรูปใหม่">
                                        📷
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageSelect}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="dl-profile-field">
                                <label className="dl-profile-field-label">Display name</label>
                                <input
                                    type="text"
                                    className="dl-profile-field-input"
                                    value={draftDisplay}
                                    disabled={!editing}
                                    onChange={(e) => setDraftDisplay(e.target.value)}
                                />
                            </div>

                            <div className="dl-profile-field">
                                <label className="dl-profile-field-label">Username</label>
                                <input
                                    type="text"
                                    className="dl-profile-field-input"
                                    value={draftUsername}
                                    disabled={!editing}
                                    onChange={(e) => setDraftUsername(e.target.value)}
                                />
                            </div>

                            <p className="dl-profile-helper">
                                โปรไฟล์ของคุณช่วยให้ผู้อื่นจดจำคุณได้บนแพลตฟอร์ม
                            </p>
                        </div>

                        <div className="dl-profile-modal-footer">
                            {!editing ? (
                                <button
                                    className="dl-profile-btn dl-profile-btn-primary"
                                    onClick={() => setEditing(true)}
                                >
                                    แก้ไขข้อมูล
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="dl-profile-btn dl-profile-btn-ghost"
                                        onClick={() => {
                                            setEditing(false);
                                            const display = `${profile.firstname || ''}${profile.lastname ? ' ' + profile.lastname : ''}`.trim();
                                            setDraftDisplay(display);
                                            setDraftUsername(profile.username || '');
                                            setDraftImageFile(null);
                                            setDraftImagePreview(profile.profile || null);
                                        }}
                                        disabled={saving}
                                    >
                                        ยกเลิก
                                    </button>
                                    <button
                                        className="dl-profile-btn dl-profile-btn-primary"
                                        onClick={handleSave}
                                        disabled={saving}
                                    >
                                        {saving ? 'กำลังบันทึก...' : 'บันทึก'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navlogin;