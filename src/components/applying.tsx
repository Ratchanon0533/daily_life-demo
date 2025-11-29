import { useState } from "react";
import "./css/applying.css";

const Applying = () => {
    const [active, setActive] = useState<number | null>(null);

    const boxes = [
        {
            title: "Step 1", content: <p>1. รอบ Portfolio (แฟ้มสะสมผลงาน)
                <br />รอบนี้เน้น ผลงานและประสบการณ์ ของผู้สมัครเป็นหลัก
                <br />ไม่ต้องใช้คะแนนสอบกลาง (บางคณะอาจมีสอบเสริม/สัมภาษณ์)
                <br />ใช้แฟ้มสะสมผลงาน เช่น ผลงานแข่งขัน, กิจกรรม, ประสบการณ์ฝึกงาน, หรือโครงการที่เกี่ยวข้องกับคณะ
                <br />ต้องมี เกรด (GPAX) และคุณสมบัติตามที่คณะกำหนด
                <br />เหมาะกับคนที่มีผลงานเด่นและเตรียมตัวล่วงหน้า</p>
        },
        {
            title: "Step 2", content: <p>2. รอบ Quota (โควตา)
                <br />รอบนี้รับตาม พื้นที่/เงื่อนไขเฉพาะ
                <br />เน้นนักเรียนในจังหวัดหรือภูมิภาคที่กำหนด
                <br />อาจใช้ เกรดขั้นต่ำ + คะแนนสอบ TGAT/TPAT หรือ A-Level
                <br />บางคณะมีเงื่อนไขเฉพาะ เช่น แผนการเรียน วิทย์-คณิต, ศิลป์ภาษา ฯลฯ
                <br />มีโอกาสแข่งขันน้อยกว่ารอบ Admission เพราะจำกัดเฉพาะกลุ่ม</p>
        },
        {
            title: "Step 3", content: <p>3. รอบ Admission (ระบบกลาง)
                <br />รอบใหญ่ที่ใช้ คำนวณคะแนนจากข้อสอบกลาง
                <br />ใช้คะแนน TGAT, TPAT และ A-Level ตามสัดส่วนที่แต่ละคณะกำหนด
                <br />ระบบคัดเลือกกลาง จัดอันดับความต้องการคณะ
                <br />เหมาะกับคนที่ไม่มีผลงาน portfolio แต่พร้อมสอบคะแนน
                <br />เป็นรอบที่ผู้สมัครจำนวนมากที่สุด</p>
        },
        {
            title: "Step 4", content: <p>4. รอบ Direct Admission (รับตรงอิสระ)

                <br />รอบสุดท้ายของปี แต่ละมหาวิทยาลัยจัดเอง
                <br />ใช้เกณฑ์ที่มหาวิทยาลัยกำหนด เช่น
                <br />คะแนนสอบกลาง
                <br />สอบข้อเขียนของมหาวิทยาลัย
                <br />สอบสัมภาษณ์
                <br />ใช้สำหรับรับเพิ่มในคณะที่ยังไม่เต็ม
                <br />โอกาศสุดท้ายสำหรับคนที่พลาดรอบก่อนหน้า</p>
        }
    ];

    return (
        <div className="apply-box">
            <div className="apply-content p-5">
                <div className="apply-header">
                    เกี่ยวกับการสมัครเข้ามหาลัย (University Applying)
                </div>

                <hr className="divider" />
                <div className="apply-row">
                    {boxes.map((box, index) => {
                        const isActive = active === index;

                        return (
                            <div
                                key={index}
                                className={`apply-item ${isActive ? "active" : ""}`}
                                onMouseEnter={() => setActive(index)}
                                onMouseLeave={() => setActive(null)}
                            >
                                <h3>{box.title}</h3>
                                {isActive && <p>{box.content}</p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Applying;
