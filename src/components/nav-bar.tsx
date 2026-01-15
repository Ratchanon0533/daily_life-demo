// Nav.tsx
import './css/navbar.css';

const Nav = () => {

;

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

                            <li className="nav-item">
                                <a className="nav-link signin-custom" href="/Register">เข้าสู่ระบบ</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;