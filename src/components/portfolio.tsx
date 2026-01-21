import Nav from './nav-bar';
import Navlogin from './nav-bar(login)';
import styles from './css/portfolio.module.css';
import Contact from './contact';
import { useState, useMemo, useEffect } from 'react';
import {
    getDaysInMonth,
    format,
} from 'date-fns';
import { th } from 'date-fns/locale';


const Portfolio = () => {

    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        personal: false,
        education: false,
        talent: false,
        certificate: false,
        university: false,
    });

    const [mode, setMode] = useState<"login" | "no-login">("no-login");
    const [port, setAllport] = useState<"allport" | "create">("allport");


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setMode("login");
        } else {
            setMode("no-login");
        }
    }, []);

    const toggleSection = (key: string) => {
        setOpenSections(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };


    const [day, setDay] = useState<number>(1);
    const [month, setMonth] = useState<number>(0);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const daysInMonth = useMemo(() => {
        const date = new Date(year, month);
        return getDaysInMonth(date);
    }, [month, year]);

    const thaiMonths = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            name: format(new Date(2024, i, 1), 'MMMM', { locale: th }),
            value: i
        }));
    }, []);


    const [showEducation, setShowEducation] = useState(false);

    useEffect(() => {
        if (openSections.education) {
            setShowEducation(true);
        } else if (showEducation) {
            const timeout = setTimeout(() => setShowEducation(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.education]);

    const [showTalent, setShowTalent] = useState(false);

    useEffect(() => {
        if (openSections.talent) {
            setShowTalent(true);
        } else if (showTalent) {
            const timeout = setTimeout(() => setShowTalent(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.talent]);

    const [showCertificate, setShowCertificate] = useState(false);

    useEffect(() => {
        if (openSections.certificate) {
            setShowCertificate(true);
        } else if (showCertificate) {
            const timeout = setTimeout(() => setShowCertificate(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.certificate]);

    const [showUniversity, setShowUniversity] = useState(false);

    useEffect(() => {
        if (openSections.university) {
            setShowUniversity(true);
        } else if (showUniversity) {
            const timeout = setTimeout(() => setShowUniversity(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.university]);

    const [showPersonal, setShowPersonal] = useState(false);

    useEffect(() => {
        if (openSections.personal) {
            setShowPersonal(true);
        } else if (showPersonal) {
            const timeout = setTimeout(() => setShowPersonal(false), 400);
            return () => clearTimeout(timeout);
        }
    }, [openSections.personal]);

    const renderPortfolioContent = () => (
        <div className={styles["portfolio-box"]}>
            <div className={styles["port-progress"]}>
                <div className={styles["port-progress-content"]}>
                    <div className={styles["port-progress-image"]}></div>
                    <div className={styles["port-name"]}>UserName</div>
                    <div className={styles["port-btn-group"]}>
                        <div className={styles["upload-btn-group"]}>
                            <button className={styles["port-upload-btn"]}>
                                อัพโหลดรูปภาพ
                            </button>
                            <button className={styles["port-upload-btn"]}>
                                แก้ไขรูปภาพ
                            </button>
                        </div>
                        <button className={styles["port-preview-btn"]}>
                            ดูตัวอย่างแฟ้มสะสมผลงาน
                        </button>
                    </div>
                </div>
                <div className={styles["port-progress-group"]}>
                    <div className={styles["update-date"]}>อัพเดทล่าสุด : 18 ธันวาคม 2568</div>
                    <div className={styles["divider"]}></div>
                    <div className={styles["progression-bar"]}>
                        <p>ความสมบูรณ์ของแฟ้มสะสมผลงาน : ครบถ้วน</p>
                        <p>100%</p>
                    </div>
                    <div className={styles["bar"]}></div>
                    <div className={styles["progress-info"]}>
                        แฟ้มสะสมผลงานของคุณสมบูรณ์แล้ว
                    </div>
                    <div className={styles["progress-info"]}>
                        ข้อมูลครบถ้วน
                    </div>
                    <div className={styles["progress-info-btn-group"]}>
                        <button className={styles["progress-info-btn"]}>บันทึกการเปลี่ยนแปลง</button>
                        <button className={styles["progress-info-btn"]}>เผยแพร่</button>
                    </div>
                    <p className={styles["progress-caution"]}>*หมายเหตุ :เมื่อกดปุ่มเผยแพร่ ระบบจะใช้เวลาประมวลผลภายใน 30 นาที ทางมหาวิทยาลัยจึงจะสามารถมองเห็นแฟ้มสะสมผลงานของคุณได้</p>
                </div>
            </div>

            {/* ข้อมูลส่วนตัว */}
            <div className={`${styles["portfolio-data"]} ${openSections.personal ? styles["open"] : ""}`}
                onClick={() => toggleSection("personal")}
            >
                <div className={styles["port-data-wrapper"]} >
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />ข้อมูลส่วนตัว</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
                </div>

                {showPersonal && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.personal ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <p>ชื่อแฟ้มสะสมผลงาน</p>
                            <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                            <p>แนะนำตัว</p>
                            <textarea className={styles["port-textarea"]} onClick={e => e.stopPropagation()} rows={4} />

                            <div className={styles["personal-section"]}>
                                <div className={styles["custom-name-group"]}>
                                    <p>คำนำหน้า</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option >นาย</option>
                                        <option>นางสาว</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ชื่อ</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>นามสกุล</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["custom-birth-date"]}>
                                    <p>วันเดือนปีเกิด</p>
                                    <div className={styles["date-group"]}>
                                        <select
                                            className={styles["port-input"]}
                                            value={day}
                                            onChange={(e) => setDay(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {Array.from({ length: daysInMonth }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={month}
                                            onChange={(e) => setMonth(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {thaiMonths.map((m) => (
                                                <option key={m.value} value={m.value}>{m.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={year}
                                            onChange={(e) => setYear(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                                <option key={y} value={y}>{y + 543}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สัญชาติ</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>หมายเลขบัตรประชาชน</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>เบอร์ติดต่อ</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เบอร์ติดต่อ (สำรอง)</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>อีเมล</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '100%' }}>
                                    <p>ที่อยู่ปัจจุบัน</p>
                                    <textarea className={styles["port-textarea"]} onClick={e => e.stopPropagation()} rows={4} style={{ height: '150px', resize: 'vertical' }} />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>จังหวัด</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เขต/อำเภอ</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>แขวง/ตำบล</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>รหัสไปรษณีย์</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ส่วนสูง</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>น้ำหนัก</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เพศ</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option >ชาย</option>
                                        <option>หญิง</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สถานภาพสมรส</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option>โสด</option>
                                        <option>สมรส</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '30%' }}>
                                    <p>ความพิการ</p>
                                    <div className={styles["radio-container"]} onClick={e => e.stopPropagation()}>
                                        <label>
                                            <input type="radio" name="disability" value="none" /> ไม่มี
                                        </label>
                                        <label>
                                            <input type="radio" name="disability" value="have" /> มีความพิการ
                                        </label>
                                    </div>
                                </div>
                                <div className={styles["name-group"]} style={{ width: '65%' }}>
                                    <p>สถานภาพทางทหาร</p>
                                    <div className={styles["radio-container"]} onClick={e => e.stopPropagation()}>
                                        <label>
                                            <input type="radio" name="militaryStatus" value="exempt" /> ได้รับการยกเว้น
                                        </label>
                                        <label>
                                            <input type="radio" name="militaryStatus" value="completed" /> ผ่านการเกณฑ์ทหารแล้ว
                                        </label>
                                        <label>
                                            <input type="radio" name="militaryStatus" value="waiting" /> รอการเกณฑ์ทหาร
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ประวัติการศึกษา */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.education ? styles["open"] : ""}`}
                onClick={() => toggleSection("education")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />ประวัติการศึกษา</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
                </div>

                {showEducation && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.education ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`}>
                                <h1>ลำดับที่ 1</h1>
                                <button>เพิ่มประวัติการศึกษา</button>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>โรงเรียน/สถาบันการศึกษา</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ปีจบการศึกษา</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>วุฒิการศึกษา</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>จังหวัด</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>อำเภอ</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>สายการเรียน</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>เกรดเฉลี่ย</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>แนบใบ ปพ.</p>
                                    <button className={styles['edu-upload-btn']}>อัพโหลดไฟล์</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ทักษะ/ความสามารถ */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.talent ? styles["open"] : ""}`}
                onClick={() => toggleSection("talent")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />ทักษะ/ความสามารถ</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
                </div>

                {showTalent && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.talent ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={styles["personal-section"]}>
                                <p>ทักษะความรู้ตามสาขาวิชา</p>
                            </div>
                            <textarea className={styles["port-textarea"]} onClick={e => e.stopPropagation()} rows={4} style={{ resize: 'vertical' }} />
                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`}>
                                <p>ทักษะด้านภาษาต่างประเทศ</p>
                                <button>เพิ่มภาษา</button>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ภาษา</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option>อังกฤษ</option>
                                        <option>จีน</option>
                                        <option>ญี่ปุ่น</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การฟัง</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option>พอใช้</option>
                                        <option>ดี</option>
                                        <option>ดีมาก</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การพูด</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option>พอใช้</option>
                                        <option>ดี</option>
                                        <option>ดีมาก</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การอ่าน</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option>พอใช้</option>
                                        <option>ดี</option>
                                        <option>ดีมาก</option>
                                    </select>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>การเขียน</p>
                                    <select className={styles["port-input"]} onClick={e => e.stopPropagation()} >
                                        <option>พอใช้</option>
                                        <option>ดี</option>
                                        <option>ดีมาก</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <p>ทักษะอื่นๆ</p>
                            </div>
                            <textarea className={styles["port-textarea"]} onClick={e => e.stopPropagation()} rows={4} style={{ resize: 'vertical' }} />
                        </div>
                    </div>
                )}
            </div>

            {/* กิจกรรม/เกียรติบัตร */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.certificate ? styles["open"] : ""}`}
                onClick={() => toggleSection("certificate")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />กิจกรรม/เกียรติบัตร</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
                </div>

                {showCertificate && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.certificate ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={`${styles["personal-section"]} ${styles["add-education"]}`}>
                                <h1>ลำดับที่ 1</h1>
                                <button>เพิ่มเกียรติบัตร</button>
                            </div>

                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>ชื่อโครงการ/กิจกรรม</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>ช่วงวันที่</p>
                                    <div className={styles["date-group"]}>
                                        <select
                                            className={styles["port-input"]}
                                            value={day}
                                            onChange={(e) => setDay(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {Array.from({ length: daysInMonth }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={month}
                                            onChange={(e) => setMonth(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {thaiMonths.map((m) => (
                                                <option key={m.value} value={m.value}>{m.name}</option>
                                            ))}
                                        </select>
                                        <select
                                            className={styles["port-input"]}
                                            value={year}
                                            onChange={(e) => setYear(Number(e.target.value))}
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                                <option key={y} value={y}>{y + 543}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>แนบรูปภาพกิจกรรม/เกียรติบัตร</p>
                                    <button className={styles['edu-upload-btn']}>อัพโหลดไฟล์</button>
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '100%' }}>
                                    <p>ระบุรายละเอียด</p>
                                    <textarea className={styles["port-textarea"]} onClick={e => e.stopPropagation()} rows={4} style={{ height: '150px', resize: 'vertical' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* มหาวิทยาลัยที่ต้องการ */}
            <div
                className={`${styles["portfolio-data"]} ${openSections.university ? styles["open"] : ""}`}
                onClick={() => toggleSection("university")}
            >
                <div className={styles["port-data-wrapper"]}>
                    <div className={styles["portfolio-data-content"]}><img className={styles["check-icon"]} src="/green-check-mark-verified-circle-16223.png" alt="check-icon" />มหาวิทยาลัยที่ต้องการ</div>
                    <div className={styles["portfolio-data-content"]}>แก้ไข </div>
                </div>

                {showUniversity && (
                    <div
                        className={`${styles["portfolio-expand"]} ${openSections.university ? styles["slide-down"] : styles["slide-up"]}`}
                        style={{ overflow: "hidden" }}
                    >
                        <div className={styles["portfolio-expand-content"]} onClick={e => e.stopPropagation()}>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]}>
                                    <p>มหาวิทยาลัย</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>คณะ</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                                <div className={styles["name-group"]}>
                                    <p>สาขาวิชา</p>
                                    <input type="text" className={styles["port-input"]} onClick={e => e.stopPropagation()} />
                                </div>
                            </div>
                            <div className={styles["personal-section"]}>
                                <div className={styles["name-group"]} style={{ width: '100%' }}>
                                    <p>เหตุผลที่สนใจมหาวิทยาลัยนี้</p>
                                    <textarea className={styles["port-textarea"]} onClick={e => e.stopPropagation()} rows={4} style={{ height: '150px', resize: 'vertical' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {mode === "no-login" && (
                <>
                    <Nav />
                    <h1>กรุณาลงชื่อเข้าใช้</h1>
                </>
            )}

            {mode === "login" && (
                <>
                    <Navlogin />
                    <div className={styles["portfolio-wrapper"]}>
                        <div className={styles["portfolio-btn-group"]}>
                            <button className={styles["port-btn"]} onClick={() => setAllport("allport")}>จัดการแฟ้มสะสมผลงานทั้งหมด</button>
                            <button className={styles["port-btn"]} onClick={() => setAllport("create")}>สร้างแฟ้มสะสมผลงาน</button>
                        </div>
                    </div>

                    {port === "allport" && (
                        <>
                            <div className={`${styles["portfolio-data"]} ${styles["main-portfolio"]}`}
                                onClick={() => toggleSection("personal")}
                            >
                                <div className={styles["port-data-wrapper"]} >
                                    <div className={styles["portfolio-data-content"]}>ชื่อแฟ้มผลงาน</div>
                                    <div className={styles["portfolio-data-content"]}>v</div>
                                </div>

                                {showPersonal && (
                                    <div
                                        className={`${styles["portfolio-expand"]} ${openSections.personal ? styles["slide-down"] : styles["slide-up"]}`}
                                        style={{ overflow: "hidden" }}
                                    >
                                        {renderPortfolioContent()}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {port === "create" && renderPortfolioContent()}
                </>
            )}

            <Contact />
        </>
    );
}

export default Portfolio;