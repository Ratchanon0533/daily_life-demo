import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Profile.css';

type UserProfile = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: string;
  level?: number;
  badges?: string[];
  recent?: string[];
};

const defaultBadges = ['Welcome', 'Verified', 'Contributor'];

const ProfileSteam: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({});
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // โหลดข้อมูลผู้ใช้จาก localStorage ตอนเข้าเพจ
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/Register');
      return;
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const u = JSON.parse(storedUser);

      setProfile({
        firstname: u.firstname || "",
        lastname: u.lastname || "",
        username: u.username || "",
        email: u.email || "",
        phone: u.phone || "",
        level: u.level || 1,
        badges: defaultBadges,
        recent: ["Logged in successfully"]
      });
    }

  }, [navigate]);

  // ชื่อย่อ Avatar
  const initials = () => {
    const f = profile.firstname || '';
    const l = profile.lastname || '';
    if (f || l) return (f.charAt(0) + (l ? l.charAt(0) : '')).toUpperCase();
    return (profile.username || 'U').charAt(0).toUpperCase();
  };

  // อัปเดตข้อมูล input
  const handleChange = (key: keyof UserProfile, value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
  };

  // Save profile (เก็บเฉพาะใน localStorage)
  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem('user', JSON.stringify(profile));
      setEditing(false);
    } catch (e) {
      console.error('save error', e);
      alert('Cannot save profile');
    } finally {
      setSaving(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="ps-page">
      <header className="ps-header">
        <div className="ps-header-bg" />
        <div className="ps-header-inner">
          <div className="ps-avatar">{initials()}</div>
          <div className="ps-user">
            <h2 className="ps-name">
              {(profile.firstname || '') + (profile.lastname ? ` ${profile.lastname}` : '') || profile.username || 'User'}
            </h2>
            <div className="ps-sub">Level {profile.level || 1} · Member</div>
            <div className="ps-ctas">
              {!editing ? (
                <>
                  <button className="ps-btn primary" onClick={() => setEditing(true)}>Edit Profile</button>
                  <button className="ps-btn" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button className="ps-btn primary" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="ps-btn" onClick={() => setEditing(false)}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="ps-main">
        <section className="ps-left">
          <div className="ps-panel">
            <h3>Profile</h3>

            <label>First name</label>
            <input
              value={profile.firstname || ''}
              disabled={!editing}
              onChange={(e) => handleChange('firstname', e.target.value)}
            />

            <label>Last name</label>
            <input
              value={profile.lastname || ''}
              disabled={!editing}
              onChange={(e) => handleChange('lastname', e.target.value)}
            />

            <label>E-mail</label>
            <input
              value={profile.email || ''}
              disabled={!editing}
              onChange={(e) => handleChange('email', e.target.value)}
            />

            <label>Phone</label>
            <input
              value={profile.phone || ''}
              disabled={!editing}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="ps-panel">
            <h3>Badges</h3>
            <div className="ps-badges">
              {(profile.badges || defaultBadges).map((b, i) => (
                <span key={i} className="ps-badge">{b}</span>
              ))}
            </div>
          </div>
        </section>

        <aside className="ps-right">
          <div className="ps-panel">
            <h3>Recent Activity</h3>
            <ul className="ps-activity">
              {(profile.recent || []).map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>

          <div className="ps-panel">
            <h3>Stats</h3>
            <div className="ps-stats">
              <div className="ps-stat"><strong>12</strong><span>Posts</span></div>
              <div className="ps-stat"><strong>34</strong><span>Likes</span></div>
              <div className="ps-stat"><strong>120</strong><span>Followers</span></div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ProfileSteam;