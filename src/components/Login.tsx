import { useState } from "react";
import Button from "./UI/ButtonHover2";
import Input1 from "./UI/Input1";
import Nav from "./nav-bar";

const Login = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
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
        alert('Now ' + data.message);
    };

    return (
        <>  
                {/* Username + Password */}
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "2rem" }}>
                    <h1 style={{ marginBottom: "40px" }}>Login Page</h1>
                    <Input1 text="Username" onChange={(e) => setUsername(e.target.value)} />
                    <Input1 text="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>


            <Button text="Next" onClick={handleSubmit} />
        </>
    );
};

export default Login;
