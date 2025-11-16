// Nav.tsx
import './css/navbar.css'
import Button from './UI/ButtonHover1'; // สมมติว่า ButtonHover1 ใช้สำหรับ 'สร้างแฟ้มของคุณ'
import { useNavigate } from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate();
    
    // ฟังก์ชันสำหรับจัดการ NavLink Clicks
    const handleNavigation = (path: string, isButton: boolean = false) => {
        if (!isButton) {
            // ป้องกันการ navigate ซ้ำถ้าเป็นลิงก์ภายนอก หรือใช้ Link component แทน
            if (path.startsWith('/')) {
                navigate(path);
            }
        }
    };

    return (
        <>
            {/* Navbar หลัก: fixed-top และใช้ class custom-navbar สำหรับสไตล์ */}
            <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
                <div className="container-fluid container-xl"> {/* ใช้ container-xl เพื่อจำกัดความกว้างบนจอใหญ่ */}
                    
                    {/* โลโก้/แบรนด์: ใช้ class สำหรับกำหนดขนาด */}
                    <a className="navbar-brand" href="/">
                         <img 
                            src="img/image 1.png" 
                            alt="Daily Life Logo" 
                            className="navbar-logo icon" 
                        />
                    </a>

                    {/* ปุ่ม burger */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        {/* ไอคอน Toggler: ใช้ class เพื่อกำหนดสีขาวใน CSS */}
                        <span className="navbar-toggler-icon custom-toggler-icon"></span>
                    </button>

                    {/* เมนูที่ Collapse ได้ */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        
                        {/* nav-list-custom สำหรับจัดระยะห่างของ items ใน CSS */}
                        <ul className="navbar-nav nav-list-custom"> 
                            
                            {/* หน้าหลัก */}
                            <li className="nav-item">
                                {/* ใช้ onClick สำหรับการนำทาง React Router */}
                                <a className="nav-link nav-text-custom" href="/*">
                                    หน้าหลัก
                                </a>
                            </li>
                            
                            {/* สร้างแฟ้มของคุณ (ใช้ Button Component) */}
                            <li className="nav-item">
                                <div onClick={() => navigate('/Create')} className="nav-button-wrapper">
                                    <Button text="สร้างแฟ้ม" />
                                </div>
                            </li>
                            
                            {/* อัพเกรด */}
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" href="/Promotion">
                                    อัพเกรด
                                </a>
                            </li>
                            
                            {/* สมัครสมาชิก/เข้าสู่ระบบ */}
                            <li className="nav-item">
                                <a className="nav-link nav-text-custom" href="/Register">
                                    สมัครสมาชิก/เข้าสู่ระบบ
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;