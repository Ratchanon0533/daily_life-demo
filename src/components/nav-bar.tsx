// Nav.tsx
import './css/navbar.css'

const Nav = () => {
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
                                <a className="nav-link nav-text-custom" href="/">หน้าแรก</a>
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
                                    <li><a className="dropdown-item" href="#">ภาคเหนือ</a></li>
                                    <li><a className="dropdown-item" href="#">ภาคกลาง</a></li>
                                    <li><a className="dropdown-item" href="#">ภาคตะวันออก</a></li>
                                    <li><a className="dropdown-item" href="#">ภาคใต้</a></li>
                                </ul>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" href="/About" >เกี่ยวกับเดลี่ไลพ์</a>
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