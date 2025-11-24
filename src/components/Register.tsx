import { useState } from "react";
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


    // Validate email format
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle Login
    const handleLogin = async () => {
        if (!loginUsername || !loginPassword) {
            setMessage("Please fill in all fields");
            setAlertType("danger");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: loginUsername,
                    password: loginPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful!");
                setAlertType("success");
                navigatory('/HOME');
                // Save token if needed
                localStorage.setItem("token", data.token);
            } else {
                setMessage(data.message || "Login failed");
                setAlertType("danger");
            }
        } catch (error) {
            setMessage("Error connecting to server");
            setAlertType("danger");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };


    const token = localStorage.getItem("token");

    if (token) {
        console.log("ผู้ใช้ล็อกอินอยู่");
    } else {
        console.log("ยังไม่ได้ล็อกอิน");
    }


    // Handle Register
    const handleRegister = async () => {
        // Validate all fields are filled
        if (!firstname || !lastname || !email || !phone || !username || !password) {
            setMessage("❌ Please fill in all fields");
            setAlertType("danger");
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            setMessage("❌ Please enter a valid email format (example@mail.com)");
            setAlertType("danger");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setMessage("❌ Password must be at least 6 characters");
            setAlertType("danger");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    phone,
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Registration successful! Please login.");
                setAlertType("success");
                // Clear form
                setFirstname("");
                setLastname("");
                setEmail("");
                setPhone("");
                setUsername("");
                setPassword("");
                // Switch to login mode
                setTimeout(() => setMode("login"), 2000);
            } else {
                setMessage(data.message || "Registration failed");
                setAlertType("danger");
            }
        } catch (error) {
            setMessage("Error connecting to server");
            setAlertType("danger");
            console.error("Register error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="google-page">

            <div className="google-card">

                {/* Logo */}
                <img
                    className="google-logo"
                    src="img/daily_life.png"
                    alt="daily_life logo"
                />

                <h2 className="google-title">
                    {mode === "login" ? "Sign in" : "Create your account"}
                </h2>

                <p className="google-sub">
                    {mode === "login" ? "to continue" : "Continue to our system"}
                </p>

                {/* Switch text */}
                <p className="google-switch">
                    {mode === "login" ? (
                        <>
                            หากท่านยังไม่มีบัญชี
                            <button className="google-switch-btn" onClick={() => setMode("register")}>
                                สมัครสมาชิก
                            </button>
                        </>

                    ) : (
                        <>
                            หากท่านมีบัญชีอยู่แล้ว
                            <button className="google-switch-btn" onClick={() => setMode("login")}>
                                เข้าสู่ระบบ
                            </button>
                        </>
                    )}
                </p>

                {/* ================= LOGIN ================= */}
                {mode === "login" && (
                    <div className="google-input-group-column">
                        <input
                            className="google-input"
                            placeholder="Username"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                        />

                        <input
                            className="google-input"
                            placeholder="Password"
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />

                        <button
                            className="google-btn"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                )}

                {/* ================= REGISTER ================= */}
                {mode === "register" && (
                    <>
                        <div className="google-input-group">
                            <input
                                className="google-input"
                                placeholder="First name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <input
                                className="google-input"
                                placeholder="Last name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>

                        <div className="google-input-group-column">
                            <input
                                className="google-input"
                                placeholder="Email"
                                type="email"
                                style={{ marginTop: '0.7rem' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                className="google-input"
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <input
                                className="google-input"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                className="google-input"
                                placeholder="Password (min 6 characters)"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                className="google-btn"
                                onClick={handleRegister}
                                disabled={loading}
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </div>
                    </>
                )}

                {/* ALERT */}
                {message && (
                    <div className={`alert alert-${alertType} mt-3`} role="alert">
                        {message}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Reg;