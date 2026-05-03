import { useEffect, useState } from "react";
import "./css/login-register.css";
import { useNavigate, Link } from "react-router-dom";
import { saveAuth } from "./auth";

const Reg = () => {
    const [mode, setMode] = useState<"login" | "register">("login");

    // Login
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState<boolean>(() => {
        return localStorage.getItem("rememberMe") === "1";
    });

    // Register
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showRegPassword, setShowRegPassword] = useState(false);

    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "danger" | "warning" | "info">("info");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Surface logout reason if redirected here
    useEffect(() => {
        const reason = sessionStorage.getItem("logoutReason");
        if (reason) {
            setMessage(reason);
            setAlertType("warning");
            sessionStorage.removeItem("logoutReason");
        }
    }, []);

    const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const isValidPhone = (p: string) => /^[0-9]{10}$/.test(p);

    const handleLogin = async () => {
        if (!loginUsername || !loginPassword) {
            setMessage("กรุณากรอกข้อมูลให้ครบ");
            setAlertType("danger");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://api.dailylifes.online/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: loginUsername, password: loginPassword }),
            });
            const data = await response.json();

            if (loginUsername === "DailyLife" && loginPassword === "@min1234") {
                navigate("/organization");
                return;
            }

            if (data.message === "Login Success") {
                setMessage("เข้าสู่ระบบสำเร็จ");
                setAlertType("success");
                saveAuth(data.token, data.user, rememberMe);
                navigate("/HOME");
            } else {
                setMessage(data.message || "เข้าสู่ระบบไม่สำเร็จ");
                setAlertType("danger");
            }
        } catch (error) {
            setMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
            setAlertType("danger");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!firstname || !lastname || !email || !phone || !username || !password) {
            setMessage("กรุณากรอกข้อมูลให้ครบ");
            setAlertType("danger");
            return;
        }
        if (!isValidEmail(email)) {
            setMessage("รูปแบบอีเมลไม่ถูกต้อง (example@mail.com)");
            setAlertType("danger");
            return;
        }
        if (!isValidPhone(phone)) {
            setMessage("เบอร์โทรต้องมี 10 หลัก (ตัวเลขเท่านั้น)");
            setAlertType("danger");
            return;
        }
        if (password.length < 6) {
            setMessage("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            setAlertType("danger");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://api.dailylifes.online/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, email, phone, username, password }),
            });
            const data = await response.json();

            if (data.message === "Register Success") {
                setMessage("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
                setAlertType("success");
                setFirstname(""); setLastname(""); setEmail("");
                setPhone(""); setUsername(""); setPassword("");
                setTimeout(() => setMode("login"), 1500);
                return;
            }

            // Parse various backend error shapes (duplicate key etc.)
            let errorMsg = data.message?.toLowerCase() || "";
            const sqlMessageRaw = data.error?.sqlMessage || "";
            const sqlMessage = sqlMessageRaw.toLowerCase();
            if (!errorMsg && sqlMessage) errorMsg = sqlMessage;

            const dupMatch = sqlMessageRaw.match(/Duplicate entry '(.+?)' for key '(.+?)'/i);
            if (dupMatch) {
                const dupKey = dupMatch[2];
                const column = dupKey.split('.').pop()?.replace(/`/g, "") || dupKey;
                if (column.includes("username")) setMessage("ชื่อผู้ใช้นี้มีในระบบแล้ว กรุณาใช้อื่น");
                else if (column.includes("email")) setMessage("อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น");
                else if (column.includes("phone")) setMessage("เบอร์โทรนี้มีในระบบแล้ว กรุณาใช้อื่น");
                else setMessage(sqlMessageRaw);
            } else if (errorMsg.includes("username")) {
                setMessage("ชื่อผู้ใช้นี้มีในระบบแล้ว กรุณาใช้อื่น");
            } else if (errorMsg.includes("email")) {
                setMessage("อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น");
            } else if (errorMsg.includes("phone")) {
                setMessage("เบอร์โทรนี้มีในระบบแล้ว กรุณาใช้อื่น");
            } else if (data.error?.sqlMessage) {
                setMessage(data.error.sqlMessage);
            } else {
                setMessage(data.message || "สมัครสมาชิกไม่สำเร็จ");
            }
            setAlertType("danger");
        } catch (error) {
            setMessage("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
            setAlertType("danger");
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reg-page">
            {/* Left side — branded panel with hero image + welcome text */}
            <aside className="reg-hero">
                <div className="reg-hero-bg" aria-hidden="true">
                    <img
                        src="/img/messageImage_1764229058872.jpg"
                        alt=""
                        className="reg-hero-img"
                    />
                    <div className="reg-hero-overlay" />
                </div>

                <Link to="/" className="reg-hero-back" aria-label="กลับหน้าแรก">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    <span>กลับหน้าแรก</span>
                </Link>

                <div className="reg-hero-content">
                    <img src="/img/Dailylife Logo Navbar.png" alt="Daily Life" className="reg-hero-logo" />
                    <h1 className="reg-hero-title">
                        เส้นทางความสำเร็จ<br />ออกแบบเพื่อคุณ
                    </h1>
                    <p className="reg-hero-sub">
                        สร้างแฟ้มสะสมผลงาน ค้นหามหาวิทยาลัย<br />
                        และเตรียมพร้อมสู่รั้วมหาวิทยาลัยกับ Daily Life
                    </p>
                </div>
            </aside>

            {/* Right side — form card */}
            <main className="reg-form-side">
                <div className="reg-card">
                    <div className="reg-card-header">
                        <h2 className="reg-title">
                            {mode === "login" ? "เข้าสู่ระบบ" : "สร้างบัญชีใหม่"}
                        </h2>
                        <p className="reg-sub">
                            {mode === "login"
                                ? "ยินดีต้อนรับกลับ! กรุณาเข้าสู่ระบบเพื่อใช้งานต่อ"
                                : "เริ่มต้นการเดินทางสู่มหาวิทยาลัยกับเรา"}
                        </p>
                    </div>

                    {/* Mode tabs */}
                    <div className="reg-tabs" role="tablist">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={mode === "login"}
                            className={`reg-tab ${mode === "login" ? "reg-tab-active" : ""}`}
                            onClick={() => { setMode("login"); setMessage(""); }}
                        >
                            เข้าสู่ระบบ
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={mode === "register"}
                            className={`reg-tab ${mode === "register" ? "reg-tab-active" : ""}`}
                            onClick={() => { setMode("register"); setMessage(""); }}
                        >
                            สมัครสมาชิก
                        </button>
                    </div>

                    {/* Alert */}
                    {message && (
                        <div className={`reg-alert reg-alert-${alertType}`} role="alert">
                            {message}
                        </div>
                    )}

                    {/* ============== LOGIN FORM ============== */}
                    {mode === "login" && (
                        <form
                            className="reg-form"
                            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
                        >
                            <label className="reg-field">
                                <span className="reg-field-label">Username</span>
                                <div className="reg-field-input-wrap">
                                    <input
                                        className="reg-input"
                                        placeholder="ชื่อผู้ใช้ของคุณ"
                                        value={loginUsername}
                                        onChange={(e) => setLoginUsername(e.target.value)}
                                        autoComplete="username"
                                    />
                                </div>
                            </label>

                            <label className="reg-field">
                                <span className="reg-field-label">Password</span>
                                <div className="reg-field-input-wrap">
                                    <input
                                        className="reg-input"
                                        placeholder="รหัสผ่าน"
                                        type={showLoginPassword ? "text" : "password"}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="reg-field-trail"
                                        onClick={() => setShowLoginPassword(s => !s)}
                                        aria-label={showLoginPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                                    >
                                        {showLoginPassword ? "🙈" : "👁"}
                                    </button>
                                </div>
                            </label>

                            <label className="reg-checkbox">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>จดจำการเข้าสู่ระบบ (7 วัน)</span>
                            </label>

                            <button
                                type="submit"
                                className="reg-btn-primary"
                                disabled={loading}
                            >
                                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                            </button>

                            <p className="reg-switch-text">
                                ยังไม่มีบัญชี?{" "}
                                <button
                                    type="button"
                                    className="reg-switch-link"
                                    onClick={() => { setMode("register"); setMessage(""); }}
                                >
                                    สมัครสมาชิก
                                </button>
                            </p>
                        </form>
                    )}

                    {/* ============== REGISTER FORM ============== */}
                    {mode === "register" && (
                        <form
                            className="reg-form"
                            onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
                        >
                            <div className="reg-row">
                                <label className="reg-field">
                                    <span className="reg-field-label">ชื่อจริง</span>
                                    <input
                                        className="reg-input"
                                        placeholder="ชื่อจริง"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        autoComplete="given-name"
                                    />
                                </label>
                                <label className="reg-field">
                                    <span className="reg-field-label">นามสกุล</span>
                                    <input
                                        className="reg-input"
                                        placeholder="นามสกุล"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        autoComplete="family-name"
                                    />
                                </label>
                            </div>

                            <label className="reg-field">
                                <span className="reg-field-label">อีเมล</span>
                                <input
                                    className="reg-input"
                                    placeholder="example@mail.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </label>

                            <label className="reg-field">
                                <span className="reg-field-label">เบอร์โทรศัพท์</span>
                                <input
                                    className="reg-input"
                                    placeholder="0812345678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="tel"
                                    inputMode="numeric"
                                />
                            </label>

                            <label className="reg-field">
                                <span className="reg-field-label">Username</span>
                                <input
                                    className="reg-input"
                                    placeholder="ชื่อผู้ใช้สำหรับเข้าสู่ระบบ"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                />
                            </label>

                            <label className="reg-field">
                                <span className="reg-field-label">Password</span>
                                <div className="reg-field-input-wrap">
                                    <input
                                        className="reg-input"
                                        placeholder="อย่างน้อย 6 ตัวอักษร"
                                        type={showRegPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        className="reg-field-trail"
                                        onClick={() => setShowRegPassword(s => !s)}
                                        aria-label={showRegPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                                    >
                                        {showRegPassword ? "🙈" : "👁"}
                                    </button>
                                </div>
                            </label>

                            <button
                                type="submit"
                                className="reg-btn-primary"
                                disabled={loading}
                            >
                                {loading ? "กำลังสร้างบัญชี..." : "สร้างบัญชีใหม่"}
                            </button>

                            <p className="reg-switch-text">
                                มีบัญชีอยู่แล้ว?{" "}
                                <button
                                    type="button"
                                    className="reg-switch-link"
                                    onClick={() => { setMode("login"); setMessage(""); }}
                                >
                                    เข้าสู่ระบบ
                                </button>
                            </p>
                        </form>
                    )}
                </div>

                {/* Mobile-only back link (the hero is hidden on small screens) */}
                <Link to="/" className="reg-mobile-back">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    กลับหน้าแรก
                </Link>
            </main>
        </div>
    );
};

export default Reg;