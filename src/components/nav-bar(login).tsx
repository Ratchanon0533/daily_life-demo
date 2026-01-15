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
                                <a className="nav-link nav-text-custom" href="/HOME">หน้าแรก</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" href="/quick_search">แบบทดสอบ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" href="/quick_search">สร้าง Portfolio</a>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <button
                                    className="nav-text-dropdown dropdown-toggle d-flex align-items-center nav-text-custom"
                                    id="regionDropdown"
                                    aria-expanded="false"
                                >
                                    สร้างPortfolio
                                    <span className="v-icon"></span>
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="regionDropdown">
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยมหิดล (Mahidol University)</a></li>
                                    <li><a className="dropdown-item" href="#">จุฬาลงกรณ์มหาวิทยาลัย (Chulalongkorn University)</a></li>
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยเชียงใหม่ (Chiang Mai University)</a></li>
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยเกษตรศาสตร์ (Kasetsart University)</a></li>
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยขอนแก่น (Khon Kaen University)</a></li>
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (KMUTT)</a></li>
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยสงขลานครินทร์ (Prince of Songkla University)</a></li>
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยธรรมศาสตร์ (Thammasat University)</a></li>
                                    <li><a className="dropdown-item" href="#">Asian Institute of Technology (AIT)</a></li>
                                    <li><a className="dropdown-item" href="#">มหาวิทยาลัยรามคำแหง (Ramkhamhaeng University)</a></li>
                                    <li><a className="dropdown-item" href="#">สถาบันการจัดการปัญญาภิวัฒน์ (PIM)</a></li>
                                </ul>
                            </li> */}

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
                                    alt="menu"
                                    className="dropdown-toggle proflieimg"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                />

                                <ul className="dropdown-menu">
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => navigate("/profile")}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => navigate("/setting")}
                                            style={{ cursor: "pointer" }}
                                        >
                                            Settings
                                        </button>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                navigate("/");
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
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