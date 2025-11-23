import { useState } from "react";
import "./css/login-register.css"
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
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />

                        <button className="google-btn">Sign in</button>
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
                                style={{marginTop:'0.7rem'}}
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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className="google-btn">Create account</button>
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
