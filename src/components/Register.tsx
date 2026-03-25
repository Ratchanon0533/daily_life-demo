import { useState } from "react";
import styles from "./css/login-register.module.css";
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



    // Validate phone number (digits only, 10 digits)
    const isValidPhone = (phone: string) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
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
            const response = await fetch("https://daily-life-backend-theta.vercel.app/api/login", {
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

            if (data.message === "Login Success") {
                setMessage("Admin Login successful!");
                setAlertType("success");
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                navigatory("/HOME");
            }
            else {
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

        // Validate phone number
        if (!isValidPhone(phone)) {
            setMessage("❌ Phone number must be 10 digits (numbers only)");
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
            const response = await fetch("https://daily-life-backend-theta.vercel.app/api/register", {
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

            if (data.message === "Register Success") {
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
                // ตรวจสอบข้อความ error จาก backend
                let errorMsg = data.message?.toLowerCase() || "";
                const sqlMessageRaw = data.error?.sqlMessage || "";
                const sqlMessage = sqlMessageRaw.toLowerCase();

                // ถ้า message ว่าง ให้ใช้ sqlMessage แทน
                if (!errorMsg && sqlMessage) {
                    errorMsg = sqlMessage;
                }

                // ตรวจสอบรูปแบบ Duplicate entry 'value' for key 'users.column'
                const dupMatch = sqlMessageRaw.match(/Duplicate entry '(.+?)' for key '(.+?)'/i);
                if (dupMatch) {
                    const dupValue = dupMatch[1]; // เช่น 'c'
                    const dupKey = dupMatch[2];   // เช่น users.username
                    const column = dupKey.split('.').pop()?.replace(/`/g, "") || dupKey;

                    console.log("Duplicate entry detected:", { dupValue, column });

                    if (column.includes("username")) {
                        setMessage("❌ ชื่อผู้ใช้ (username) นี้มีในระบบแล้ว กรุณาใช้อื่น");
                    } else if (column.includes("email")) {
                        setMessage("❌ อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น");
                    } else if (column.includes("phone")) {
                        setMessage("❌ เบอร์โทรนี้มีในระบบแล้ว กรุณาใช้อื่น");
                    } else if (column.includes("firstname") || column.includes("lastname")) {
                        setMessage("❌ ชื่อหรือนามสกุลนี้มีในระบบแล้ว กรุณาใช้อื่น");
                    } else {
                        // กรณี key ไม่ตรงกับที่คาดไว้ ให้แสดงข้อความ SQL ต้นฉบับ
                        setMessage(`❌ ${sqlMessageRaw}`);
                    }
                } else if (errorMsg.includes("username")) {
                    setMessage("❌ ชื่อผู้ใช้ (username) นี้มีในระบบแล้ว กรุณาใช้อื่น");
                } else if (errorMsg.includes("email")) {
                    setMessage("❌ อีเมลนี้มีในระบบแล้ว กรุณาใช้อีเมลอื่น");
                } else if (errorMsg.includes("phone")) {
                    setMessage("❌ เบอร์โทรนี้มีในระบบแล้ว กรุณาใช้อื่น");
                } else if (data.error?.sqlMessage) {
                    setMessage(`❌ ${data.error.sqlMessage}`);
                } else {
                    setMessage(data.message || "Registration failed");
                }

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
        <div className={styles["google-page"]}>
            <div className={styles["login-container"]}>
                <div className={styles["login-banner"]}>
                    <img src="/img/messageImage_1764229058872.jpg" alt="banner" className={styles["banner-img"]} />
                </div>

                <div className={styles["google-card"]}>


                    {/* Logo */}
                    <img
                        className={styles["google-logo"]}
                        src="img/daily_life.png"
                        alt="daily_life logo"
                    />

                    <h2 className={styles["google-title"]}>
                        {mode === "login" ? "Sign in" : "Create your account"}
                    </h2>

                    <p className={styles["google-sub"]}>
                        {mode === "login" ? "to continue" : "Continue to our system"}
                    </p>

                    {/* Switch text */}
                    <p className={styles["google-switch"]}>
                        {mode === "login" ? (
                            <>
                                หากท่านยังไม่มีบัญชี
                                <button className={styles["google-switch-btn"]} onClick={() => setMode("register")}>
                                    สมัครสมาชิก
                                </button>
                            </>

                        ) : (
                            <>
                                หากท่านมีบัญชีอยู่แล้ว
                                <button className={styles["google-switch-btn"]} onClick={() => setMode("login")}>
                                    เข้าสู่ระบบ
                                </button>
                            </>
                        )}
                    </p>

                    {/* ================= LOGIN ================= */}

                    {mode === "login" && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}>
                            <div className={styles["google-input-group-column"]}>
                                <input
                                    className={styles["google-input"]}
                                    placeholder="Username"
                                    value={loginUsername}
                                    onChange={(e) => setLoginUsername(e.target.value)}
                                />

                                <input
                                    className={styles["google-input"]}
                                    placeholder="Password"
                                    type="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className={styles["google-btn"]}
                                    onClick={handleLogin}
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>
                            </div>
                        </form>
                    )}


                    {/* ================= REGISTER ================= */}
                    {mode === "register" && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleRegister();
                            }}
                        >
                            <>
                                <div className={styles["google-input-group"]}>

                                    <input
                                        className={styles["google-input"]}
                                        placeholder="First name"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                    <input
                                        className={styles["google-input"]}
                                        placeholder="Last name"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}

                                    />
                                </div>

                                <div className={styles["google-input-group-column"]}>
                                    <input
                                        className={styles["google-input"]}
                                        placeholder="Email"
                                        type="email"
                                        style={{ marginTop: '0.7rem' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <input
                                        className={styles["google-input"]}
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />

                                    <input
                                        className={styles["google-input"]}
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />

                                    <input
                                        className={styles["google-input"]}
                                        placeholder="Password (min 6 characters)"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <button
                                        type="submit"
                                        className={styles["google-btn"]}
                                        onClick={handleRegister}
                                        disabled={loading}
                                    >
                                        {loading ? "Creating account..." : "Create account"}
                                    </button>
                                </div>
                            </>
                        </form>
                    )}

                    {/* ALERT */}
                    {message && (
                        <div className={`alert alert-${alertType} mt-3`} role="alert">
                            {message}
                        </div>
                    )}
                    <a href="/" className={styles["back-button-modern"]}>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>Go back home</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Reg;