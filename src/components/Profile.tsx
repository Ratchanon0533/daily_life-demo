import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Profile.css';
import { getToken, getUser, isTokenExpired, forceLogout } from './auth';

type UserProfile = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: string;
  level?: number;
  badges?: string[];
  recent?: string[];
  profile_image?: string;
};

const defaultBadges = ['Welcome', 'Verified', 'Contributor'];

const ProfileSteam: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({});
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const storedUser = getUser();

  // โหลดข้อมูลผู้ใช้จาก auth storage ตอนเข้าเพจ
  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      navigate('/Register');
      return;
    }

    if (storedUser) {
      setProfile({
        firstname: storedUser.firstname || "",
        lastname: storedUser.lastname || "",
        username: storedUser.username || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        level: storedUser.level || 1,
        badges: defaultBadges,
        recent: ["Logged in successfully"],
        profile_image: storedUser.profile_image || ''
      });
    }
  }, [navigate]);

  // อัปเดต input
  const handleChange = (key: keyof UserProfile, value: string) => {
    setProfile((p) => ({ ...p, [key]: value }));
  };

  // เปลี่ยนไฟล์รูป
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setImageFile(file);
  //     setProfile((p) => ({ ...p, profile_image: URL.createObjectURL(file) }));
  //   }
  // };

  // Save profile
  const handleSave = async () => {
    setSaving(true);
    try {
      let formData: FormData | null = null;

      if (imageFile) {
        // ถ้ามีไฟล์รูป ให้ส่ง FormData
        formData = new FormData();
        formData.append("profile_image", imageFile);
        formData.append("firstname", profile.firstname || "");
        formData.append("lastname", profile.lastname || "");
        formData.append("email", profile.email || "");
        formData.append("phone", profile.phone || "");
        formData.append("username", profile.username || "");
      }

      const response = await fetch(`https://api.dailylifes.online/user/update${storedUser.id}`, {
        method: 'PUT',
        headers: formData ? {} : { "Content-Type": "application/json" },
        body: formData ? formData : JSON.stringify(profile),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Server Error:", data);
        alert("Update failed: " + data.message);
        return;
      }

      // Persist updated user back to whichever storage already holds it
      // (localStorage if Remember me, sessionStorage otherwise)
      const updated = JSON.stringify({ ...storedUser, ...profile });
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', updated);
      } else if (sessionStorage.getItem('user')) {
        sessionStorage.setItem('user', updated);
      }

      setEditing(false);
      setImageFile(null);
      alert("Profile updated successfully!");
    } catch (e) {
      console.error("Save Error:", e);
      alert("Cannot save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    forceLogout();
  };

  return (
    <div className="ps-page">
      <header className="ps-header">
        <div className="ps-header-bg" />
        <div className="ps-header-inner">
          <div className="ps-avatar-box">
            <img
              src={profile.profile_image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
              alt="Profile"
              className="ps-avatar"
            />
            {/* {editing && (
              <input type="file" onChange={handleFileChange} accept="image/*" />
            )} */}
          </div>

          <div className="ps-user">
            <h2 className="ps-name">
              {(profile.firstname || '') + (profile.lastname ? ` ${profile.lastname}` : '') || profile.username || 'User'}
            </h2>
            <div className="ps-sub">Level {profile.level || 1} · Member</div>
            <div className="ps-ctas">
              {!editing ? (
                <>

                  <button className="ps-btn primary" onClick={() => setEditing(true)}>Edit Profile</button>

                  {/* <button className="ps-btn" onClick={() => setEditing(true)}>Edit</button> */}

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

            <label>Username</label>
            <input
              value={profile.username || ''}
              disabled={!editing}
              onChange={(e) => handleChange('username', e.target.value)}
            />

            <label>Email</label>
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