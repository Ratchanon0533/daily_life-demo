// Nav.tsx
import './css/navbar.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserProfile = {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    phone?: string;
    level?: number;
    recent?: string[];
    profile_image?: string;
};


const Navlogin = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile>({});


    const storedUserString = localStorage.getItem("user");
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
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
                recent: ["Logged in successfully"],
                profile_image: storedUser.profile_image || ''
            });
        }
    }, [navigate]);

    return (
        <>
            <nav className="navbar navbar-expand-xl  custom-navbar" >
                <div className="container-fluid p-0">

                    <a className="navbar-brand me-auto " href="/">
                        <img
                            src="img/Dailylife Logo Navbar.png"
                            alt="Daily Life Logo"
                            className="navbar-logo"
                        />
                    </a>


                    {/* Burger button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon custom-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav nav-list-custom">
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" style={{ marginTop: "-0.01rem" }} href="/">หน้าแรก</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" style={{ marginTop: "-0.01rem" }} href="/quiz">แบบทดสอบ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" style={{ marginTop: "-0.01rem" }} href="/portfolio">สร้างแฟ้มสะสมผลงาน</a>
                            </li>



                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" style={{ marginTop: "-0.01rem" }} href="/activities" >ค้นหากิจกรรม</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" style={{ marginTop: "-0.01rem" }} href="/About" >ค้นหาตัวตน</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" style={{ marginTop: "-0.01rem" }} href="/About" >เกี่ยวกับเดลี่ไลพ์</a>
                            </li>

                            <li className="nav-item dropdown">
                                <img
                                    src={profile.profile_image || "./img/5987424.png"}
                                    alt="menu" className="dropdown-toggle proflieimg"
                                    data-bs-toggle="dropdown" aria-expanded="false" />
                                <ul className="dropdown-menu">
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => navigate("/profile")}
                                            style={{ cursor: "pointer" }} >
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => navigate("/setting")}
                                            style={{ cursor: "pointer" }} >
                                            Settings
                                        </button>
                                    </li>
                                    <li>
                                        <hr
                                            className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => { localStorage.removeItem("token"); navigate("/"); }}
                                            style={{ cursor: "pointer" }} >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navlogin;