import "./css/Login.css";
// import "../css/";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Mode = "login" | "register";
type Mode2 = "unversity" | "organizers";

const Login = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const [mode2, setMode2] = useState<Mode2>("unversity");

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    organizer_name: "",
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= REGISTER =================
  const handleRegister = async () => {
    const organizer_type =
      mode2 === "unversity" ? "UNIVERSITY" : "ORGANIZER";

    try {
      const res = await fetch("https://api.dailylifes.online/reg/organizers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          organizer_type
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "สมัครไม่สำเร็จ");
        return;
      }

      alert("สมัครสมาชิกสำเร็จ 🎉");
      setMode("login");
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };


  
  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      const res = await fetch("https://api.dailylifes.online/login/organizers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }

      // เก็บ user ไว้ใช้งาน
      localStorage.setItem("user", JSON.stringify(data));
      console.log(localStorage.getItem("user"));



      alert("เข้าสู่ระบบสำเร็จ ✅");

      // redirect (ตัวอย่าง)
      if (data.user.organizer_type === "UNIVERSITY") {
        navigate("/dashboard-university");
      } else {
        navigate("/dashboard-organizers");
      }
    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้");
    }
  };


  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* LOGIN MODE */}
        {mode === "login" && (
          <>
            <div className="login-header">
              <h1>Daily Life</h1>
              <p>Organization Management System</p>
            </div>
            <div className="login-content">
              <div className="form-group">
                <label htmlFor="username">ชื่อผู้ใช้</label>
                <input
                  id="username"
                  name="username"
                  placeholder="กรอกชื่อผู้ใช้"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="กรอกรหัสผ่าน"
                  onChange={handleChange}
                />
              </div>
              <button className="submit-btn" onClick={handleLogin}>
                ลงชื่อเข้าใช้
              </button>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ color: '#666', marginBottom: '10px' }}>ยังไม่มีบัญชี?</p>
                <button
                  className="submit-btn"
                  onClick={() => setMode("register")}
                  style={{
                    background: '#f5f5f5',
                    color: '#667eea',
                    border: '2px solid #667eea'
                  }}
                >
                  สมัครใช้งาน
                </button>
              </div>
            </div>
          </>
        )}

        {/* REGISTER MODE */}
        {mode === "register" && (
          <>
            <div className="login-header">
              <h1>สมัครใช้งาน</h1>
              <p>สร้างบัญชีใหม่</p>
            </div>
            <div className="login-content">
              <div className="form-mode-toggle">
                <button
                  className={`${mode2 === "unversity" ? "active" : ""}`}
                  onClick={() => setMode2("unversity")}
                >
                  มหาวิทยาลัย
                </button>
                <button
                  className={`${mode2 === "organizers" ? "active" : ""}`}
                  onClick={() => setMode2("organizers")}
                >
                  ผู้จัดกิจกรรม
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstname">ชื่อ</label>
                  <input
                    id="firstname"
                    name="firstname"
                    placeholder="กรอกชื่อ"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">นามสกุล</label>
                  <input
                    id="lastname"
                    name="lastname"
                    placeholder="กรอกนามสกุล"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">อีเมล</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="กรอกอีเมล"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">เบอร์โทร</label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="กรอกเบอร์โทร"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="organizer_name">
                  {mode2 === "unversity" ? "มหาวิทยาลัย (ชื่อเต็มภาษาไทย)" : "ชื่อผู้จัดกิจกรรม"}
                </label>
                <input
                  id="organizer_name"
                  name="organizer_name"
                  placeholder={mode2 === "unversity" ? "กรอกชื่อมหาวิทยาลัย" : "กรอกชื่อผู้จัดกิจกรรม"}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-username">ชื่อผู้ใช้</label>
                  <input
                    id="reg-username"
                    name="username"
                    placeholder="กรอกชื่อผู้ใช้"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-password">รหัสผ่าน</label>
                  <input
                    id="reg-password"
                    type="password"
                    name="password"
                    placeholder="กรอกรหัสผ่าน"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="submit-btn" onClick={handleRegister}>
                สมัครใช้งาน
              </button>
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <button
                  onClick={() => setMode("login")}
                  style={{
                    background: 'transparent',
                    color: '#667eea',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.95em'
                  }}
                >
                  กลับไปหน้า Login
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
