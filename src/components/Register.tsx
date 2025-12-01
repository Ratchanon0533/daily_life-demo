import { useState, useEffect } from "react";
import "./css/login-register.css"
import { useNavigate } from "react-router-dom";

const Reg = () => {
    const [mode, setMode] = useState<"login" | "register">("login");

    // Login
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState("primary");
    const [loading, setLoading] = useState(false);
    const navigatory = useNavigate();

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone: string) => /^[0-9]{10}$/.test(phone);

    // ================== HANDLE LOGIN ==================
    const handleLogin = async () => {
        if (!loginUsername || !loginPassword) {
            setMessage("Please fill in all fields");
            setAlertType("danger");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://daily-life-backend.vercel.app/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: loginUsername, password: loginPassword }),
            });

            const data = await response.json();
            if (data.message === "Login Success") {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token || "");
                setMessage("Login successful!");
                setAlertType("success");
                navigatory("/home");
            } else {
                setMessage(data.message || "Login failed");
                setAlertType("danger");
            }
        } catch (error) {
            setMessage("Error connecting to server");
            setAlertType("danger");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ================== HANDLE REGISTER ==================
    const handleRegister = async () => {
        if (!firstname || !lastname || !email || !phone || !username || !password) {
            setMessage("❌ Please fill in all fields");
            setAlertType("danger");
            return;
        }

        if (!isValidEmail(email)) {
            setMessage("❌ Invalid email format");
            setAlertType("danger");
            return;
        }

        if (!isValidPhone(phone)) {
            setMessage("❌ Phone must be 10 digits");
            setAlertType("danger");
            return;
        }

        if (password.length < 6) {
            setMessage("❌ Password must be at least 6 characters");
            setAlertType("danger");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://daily-life-backend.vercel.app/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, email, phone, username, password }),
            });

            const data = await response.json();
            if (data.message === "Register Success") {
                setMessage("✅ Registration successful! Please login.");
                setAlertType("success");
                setFirstname(""); setLastname(""); setEmail(""); setPhone(""); setUsername(""); setPassword("");
                setTimeout(() => setMode("login"), 1500);
            } else {
                setMessage(data.message || "Registration failed");
                setAlertType("danger");
            }
        } catch (error) {
            setMessage("Error connecting to server");
            setAlertType("danger");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // ================== RETURN JSX ==================
    return (
        <div className="google-page">
            <div className="google-card">
                <img className="google-logo" src="img/daily_life.png" alt="daily_life logo" />
                <h2 className="google-title">{mode === "login" ? "Sign in" : "Create your account"}</h2>
                <p className="google-sub">{mode === "login" ? "to continue" : "Continue to our system"}</p>

                <p className="google-switch">
                    {mode === "login" ? (
                        <>ยังไม่มีบัญชี? <button className="google-switch-btn" onClick={() => setMode("register")}>สมัครสมาชิก</button></>
                    ) : (
                        <>มีบัญชีแล้ว? <button className="google-switch-btn" onClick={() => setMode("login")}>เข้าสู่ระบบ</button></>
                    )}
                </p>

                {/* LOGIN FORM */}
                {mode === "login" && (
                    <div className="google-input-group-column">
                        <input className="google-input" placeholder="Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                        <input className="google-input" placeholder="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        <button className="google-btn" onClick={handleLogin} disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
                    </div>
                )}

                {/* REGISTER FORM */}
                {mode === "register" && (
                    <>
                        <div className="google-input-group">
                            <input className="google-input" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                            <input className="google-input" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div className="google-input-group-column">
                            <input className="google-input" style={{marginTop:'1rem'}} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input className="google-input" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input className="google-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input className="google-input" placeholder="Password (min 6 characters)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className="google-btn" onClick={handleRegister} disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
                        </div>
                    </>
                )}

                {message && <div className={`alert alert-${alertType} mt-3`}>{message}</div>}
            </div>
        </div>
    );
};

export default Reg;
