// Genport.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PortfolioPDF } from "./MyDocument";

// import type definitions
import type {
  GenData,
  Port,
  Personal,
  Education,
  Skill,
  Activity,
  University,
} from "../types/types";

// import mapper utils (หรือคัดลอกฟังก์ชันมาที่นี่)
import {
  mapPersonal,
  mapEducation,
  mapSkill,
  mapActivity,
  mapUniversity,
} from "../utils/mappers";

const Genport = () => {
  const [data, setData] = useState<GenData>({
    port: { port_id: "", profile_url: "", user_id: "" },
    personal: null,
    education: [],
    skills: [],
    activities: [],
    university: null,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // -------------------------------------------------
  // 1️⃣ ดึงข้อมูลทั้งหมดพร้อม map
  // -------------------------------------------------
  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchAllData = async () => {
      try {
        // ----- ดึงพอร์ต (port) -----
        const portRes = await fetch(
          `https://daily-life-backend.vercel.app/getport/${userId}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const portJson = await portRes.json();

        if (!portJson.success || !portJson.data?.length) {
          throw new Error("ไม่พบพอร์ตของผู้ใช้");
        }

        const portId = portJson.data[0].port_id;

        // ----- ดึงข้อมูลอื่น ๆ พร้อมกัน (Promise.all) -----
        const [
          personalRes,
          educationRes,
          skillRes,
          activityRes,
          universityRes,
        ] = await Promise.all([
          fetch(
            `https://daily-life-backend.vercel.app/getpersonal_info/${portId}`
          ),
          fetch(
            `https://daily-life-backend.vercel.app/geteducational/${portId}`
          ),
          fetch(
            `https://daily-life-backend.vercel.app/getskills_abilities/${portId}`
          ),
          fetch(
            `https://daily-life-backend.vercel.app/getactivities_certificates/${portId}`
          ),
          fetch(
            `https://daily-life-backend.vercel.app/getuniversity_choice/${portId}`
          ),
        ]);

        // ----- แปลง JSON เป็น object raw -----
        const [
          personalRaw,
          educationRaw,
          skillRaw,
          activityRaw,
          universityRaw,
        ] = await Promise.all([
          personalRes.json(),
          educationRes.json(),
          skillRes.json(),
          activityRes.json(),
          universityRes.json(),
        ]);

        // ----- ทำการ map (แปลง) -----
        const mappedData: GenData = {
          port: {
            port_id: portJson.data[0].port_id,
            profile_url: portJson.data[0].profile_url,
            user_id: userId,
          },
          personal:
            personalRaw.success && personalRaw.data?.length
              ? mapPersonal(personalRaw.data[0])
              : null,
          education:
            educationRaw.success && educationRaw.data?.length
              ? (educationRaw.data as any[]).map(mapEducation)
              : [],
          skills:
            skillRaw.success && skillRaw.data?.length
              ? (skillRaw.data as any[]).map(mapSkill)
              : [],
          activities:
            activityRaw.success && activityRaw.data?.length
              ? (activityRaw.data as any[]).map(mapActivity)
              : [],
          university:
            universityRaw.success && universityRaw.data?.length
              ? mapUniversity(universityRaw.data[0])
              : null,
        };

        setData(mappedData);
      } catch (err) {
        console.error("❌ เกิดข้อผิดพลาดขณะดึงข้อมูล :", err);
        // หากต้องการให้ผู้ใช้เห็น error สามารถตั้ง state เพื่อนำไปแสดง UI ได้
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // -------------------------------------------------
  // 2️⃣ UI ระหว่างโหลด / ไม่พบข้อมูล
  // -------------------------------------------------
  if (loading) {
    return (
      <div className="p-10 text-center font-bold">
        กำลังโหลดข้อมูล...
      </div>
    );
  }

  if (!data.personal) {
    return (
      <div className="p-10 text-center">
        ไม่พบข้อมูลส่วนตัว
      </div>
    );
  }

  // -------------------------------------------------
  // 3️⃣ แยกค่าที่ต้องใช้ใน PDF
  // -------------------------------------------------
  const { personal, port, education, skills, activities, university } = data;

  // ตัวอย่างชื่อไฟล์ PDF
  const pdfFileName =
    personal?.portfolio_name?.trim()
      ? `${personal.portfolio_name}.pdf`
      : "Portfolio.pdf";

  // -------------------------------------------------
  // 4️⃣ Render UI (ปุ่มย้อนกลับ + ดาวน์โหลด PDF)
  // -------------------------------------------------
  return (
    <div className="p-10 bg-zinc-100 min-h-screen flex flex-col items-center">
      {/* --- ปุ่มควบคุมด้านบน --- */}
      <div className="flex gap-4 mb-6 w-full max-w-4xl justify-start">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
        >
          ย้อนกลับ
        </button>

        <PDFDownloadLink
          document={
            <PortfolioPDF
              // ---------- Personal ----------
              prefix={personal.prefix ?? ""}
              first_name={personal.first_name ?? ""}
              last_name={personal.last_name ?? ""}
              introduce={personal.introduce ?? ""}
              phonenumber1={personal.phone_number1 ?? ""}
              email={personal.email ?? ""}
              province={personal.province ?? ""}
              postal_code={personal.postal_code ?? ""}

              // ---------- Image ----------
              personal_image={port.profile_url ?? ""}

              // ---------- Skills ----------
              skills={skills} // ส่ง array ทั้งหมด – PDF จะ loop เอง

              // ---------- Education ----------
              education={education} // ส่ง array ทั้งหมด

              // ---------- University ----------
              university={university?.university ?? ""}
              faculty={university?.faculty ?? ""}
              major={university?.major ?? ""}
              reason={university?.details ?? ""}

              // ---------- Activities ----------
              activities={activities} // ส่ง array ทั้งหมด
            />
          }
          fileName={pdfFileName}
          className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          {({ loading }) => (loading ? "กำลังสร้าง PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/*   แสดงตัวอย่างข้อมูลบนหน้า (ไม่บังคับ – เพียงเพื่อให้เห็นว่ามีหลายรายการ */}
      {/* ------------------------------------------------------------------- */}
      <div className="w-full max-w-4xl space-y-8">
        {/* Education List */}
        <section>
          <h2 className="text-xl font-semibold mb-2">ประวัติการศึกษา</h2>
          <ul className="list-disc pl-6">
            {education.map((ed, idx) => (
              <li key={idx}>
                <strong>{ed.school}</strong> – {ed.graduation} (เกรดเฉลี่ย: {ed.grade_average})
              </li>
            ))}
          </ul>
        </section>

        {/* Skills List */}
        <section>
          <h2 className="text-xl font-semibold mb-2">ทักษะ / ความสามารถ</h2>
          <ul className="list-disc pl-6">
            {skills.map((sk, idx) => (
              <li key={idx}>
                {sk.language}: อ่าน({sk.reading}) พูด({sk.speaking}) ฟัง({sk.listening}) เขียน({sk.writing})
              </li>
            ))}
          </ul>
        </section>

        {/* Activities / Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-2">ผลงาน / กิจกรรม</h2>
          <ul className="list-disc pl-6 space-y-2">
            {activities.map((act, idx) => (
              <li key={idx}>
                <strong>{act.name_project}</strong> ({act.date})
                {act.photo && (
                  <div className="mt-1">
                    <img
                      src={act.photo}
                      alt={act.name_project}
                      className="max-w-xs rounded shadow"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* University Choice */}
        {university && (
          <section>
            <h2 className="text-xl font-semibold mb-2">มหาวิทยาลัยที่สมัคร</h2>
            <p>
              <strong>มหาวิทยาลัย:</strong> {university.university}
            </p>
            <p>
              <strong>คณะ:</strong> {university.faculty}
            </p>
            <p>
              <strong>สาขา:</strong> {university.major}
            </p>
            <p>
              <strong>เหตุผล:</strong> {university.details}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Genport;
