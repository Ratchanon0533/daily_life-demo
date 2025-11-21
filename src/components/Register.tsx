import { useState } from "react";
import Button from "./UI/ButtonHover2";
import Input1 from "./UI/Input1";
import Nav from "./nav-bar";

const Reg = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState<"primary" | "danger" | "warning" | "success">("primary");

    const validateEmail = (email: string) => {
        // regex ตรวจสอบ email แบบง่าย
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async () => {
        // 🔹 ตรวจสอบข้อมูลครบ
        if (!firstname || !lastname || !email || !phone || !username || !password) {
            setMessage("กรุณากรอกข้อมูลให้ครบ");
            setAlertType("primary");
            return;
        }

        // 🔹 ตรวจสอบรูปแบบ email
        if (!validateEmail(email)) {
            setMessage("รูปแบบ E-mail ไม่ถูกต้อง");
            setAlertType("primary");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    phone,
                    username,
                    password
                })
            });

            const data = await res.json();

            if (res.ok && data.message === "Register Success") {
                setMessage("สมัครสำเร็จ");
                setAlertType("success");
                // ล้าง form
                setFirstname(""); setLastname(""); setEmail(""); setPhone(""); setUsername(""); setPassword("");
                window.location.href = "/Login";
            } else if (data.message === "Insert Failed") {
                setMessage("มีปัญหาที่ server");
                setAlertType("danger");
            } else {
                setMessage("สมัครไม่ผ่าน");
                setAlertType("warning");
            }

        } catch (err) {
            console.log(err);
            setMessage("มีปัญหาที่ server");
            setAlertType("danger");
        }
    };

    return (
        <>
            <Nav />
            <div style={{ textAlign: "center", marginTop: "50px", marginBottom: "20px" }}>
                <h1 style={{ marginBottom: "40px" }}>Register Page</h1>

                {/* ชื่อ + นามสกุล */}
                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                    <Input1 text="ชื่อจริง" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <Input1 text="นามสกุล" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>

                {/* อีเมล + เบอร์ */}
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "2rem" }}>
                    <Input1 text="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input1 text="เบอร์โทรศัพท์" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                {/* Username + Password */}
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "2rem" }}>
                    <Input1 text="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input1 text="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            <Button text="Next" onClick={handleSubmit} />

            {/* Alert แสดงผล */}
            {message && (
                <div className={`alert alert-${alertType} mt-3`} role="alert">
                    {message}
                </div>
            )}
        </>
    );
};

export default Reg;
