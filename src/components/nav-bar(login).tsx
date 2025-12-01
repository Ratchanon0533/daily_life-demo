// Nav.tsx
import './css/navbar.css'
import { useNavigate } from 'react-router-dom';

const Navlogin = () => {
    const navigate = useNavigate();

    // ฟังก์ชันสำหรับจัดการ NavLink Clicks
    // const handleNavigation = (path: string, isButton: boolean = false) => {
    //     if (!isButton) {
    //         // ป้องกันการ navigate ซ้ำถ้าเป็นลิงก์ภายนอก หรือใช้ Link component แทน
    //         if (path.startsWith('/')) {
    //             navigate(path);
    //         }
    //     }
    // };

    return (
        <>
            <nav className="navbar navbar-expand-lg  custom-navbar" >
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
                                <a className="nav-link nav-text-custom" href="/quick_search">ค้นหาที่เรียนด่วน</a>
                            </li>
                            <li className="nav-item dropdown">
                                <button
                                    className="nav-text-dropdown dropdown-toggle d-flex align-items-center"
                                    id="regionDropdown"
                                    aria-expanded="false"
                                >
                                    ค้นหามหาลัย
                                    <span className="v-icon"></span>
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="regionDropdown">
                                    <li><a className="dropdown-item" href="#">จุฬาฯ</a></li>
                                    <li><a className="dropdown-item" href="#">ศิลปากร</a></li>
                                    <li><a className="dropdown-item" href="#">ศรีปทุม</a></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown">
                                <button
                                    className="nav-text-dropdown dropdown-toggle d-flex align-items-center"
                                    id="regionDropdown"
                                    aria-expanded="false"
                                >
                                    ภูมิภาค
                                    <span className="v-icon"></span>
                                </button>

                                <ul className="dropdown-menu" aria-labelledby="regionDropdown" style={{ right: 30 }}>
                                    <li><a className="dropdown-item" href="#">เอเชีย</a></li>
                                    <li><a className="dropdown-item" href="#">ยุโรป</a></li>
                                    <li><a className="dropdown-item" href="#">อเมริกา</a></li>
                                </ul>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" href="/About" >เกี่ยวกับเดลี่ไลพ์</a>
                            </li>
                            <li className="nav-item dropdown">
                                <img
                                    src="./img/5987424.png"
                                    alt="menu"
                                    className="dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        width: "3rem",
                                        marginLeft: "3rem",
                                        marginRight: "5rem",
                                        cursor: "pointer"
                                    }}
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
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
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