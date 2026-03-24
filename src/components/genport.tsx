// src/pages/Genport.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { PortfolioPDF } from "../components/MyDocument";
import type { PDFProps, SkillItem, ActivityItem } from "../components/MyDocument";

/* ── Types ── */
type Personal = {
  prefix?: string;
  first_name?: string;
  last_name?: string;
  portfolio_name?: string;
  phone_number1?: string;
  phone_number2?: string;
  email?: string;
  province?: string;
  district?: string;
  subdistrict?: string;
  postal_code?: string;
  address?: string;
  date_birth?: string;
  nationality?: string;
  national_id?: string;
  introduce?: string;
};

type Port = { port_id: string; profile_url?: string; user_id?: string };

type Education = {
  school?: string;
  educational_qualifications?: string;
  graduation?: string;
  study_path?: string;
  grade_average?: string | number;
  study_results?: string;
};

type Skill = {
  language?: string;
  listening?: string;
  speaking?: string;
  reading?: string;
  writing?: string;
};

type Activity = {
  photo?: string;
  name_project?: string;
  date?: string;
  details?: string;   // ✅ เปลี่ยนจาก description → details ให้ตรงกับ API
};

type University = {
  university?: string;
  faculty?: string;
  major?: string;
  details?: string;
};

type GenData = {
  port: Port;
  personal: Personal | null;
  education: Education[];
  skills: Skill[];
  activities: Activity[];
  university: University | null;
};

const emptyGenData: GenData = {
  port: { port_id: "", profile_url: "" },
  personal: null,
  education: [],
  skills: [],
  activities: [],
  university: null,
};

/* ── Helpers ── */
const toThaiDate = (iso?: string) => {
  if (!iso) return { day: "", month: "", year: "" };
  const d = new Date(iso);
  return {
    day:   d.getDate(),
    month: d.toLocaleString("th-TH", { month: "long" }),
    year:  d.getFullYear() + 543,
  };
};

const parsePhotos = (json?: string): string[] => {
  try {
    if (!json) return [];
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

/* ── Mapping ── */
const mapGenDataToPdfProps = (data: GenData): PDFProps => {
  const { personal, port, education, skills, activities, university } = data;

  const {
    prefix = "", first_name = "", last_name = "",
    email = "", phone_number1 = "", phone_number2 = "",
    address = "", province = "", district = "",
    subdistrict = "", postal_code = "",
    introduce = "", date_birth,
    nationality = "", national_id = "",
  } = personal ?? {};

  const { day: birth_day, month: birth_month, year: birth_year } =
    toThaiDate(date_birth);

  const firstEdu = education[0] ?? {};

  /* ✅ map ทุก skill */
  const mappedSkills: SkillItem[] = skills.map((s) => ({
    language:  s.language,
    listening: s.listening,
    speaking:  s.speaking,
    reading:   s.reading,
    writing:   s.writing,
  }));

  /* ✅ map ทุก activity แยก photos ของตัวเอง + description */
const mappedActivities: ActivityItem[] = activities.map((act) => ({
  name_project: act.name_project,
  date:         act.date,
  description:  act.details,        // ✅ map details → description
  photos:       parsePhotos(act.photo),
}));

  return {
    introduce,
    prefix, first_name, last_name,
    birth_day, birth_month, birth_year,
    nationality,
    id_card:     national_id,
    phonenumber1: phone_number1,
    phonenumber2: phone_number2,
    email,
    address, province, district, subdistrict, postal_code,

    personal_image: port?.profile_url ?? null,

    skills:     mappedSkills,
    activities: mappedActivities,

    university: university?.university ?? "",
    faculty:    university?.faculty    ?? "",
    major:      university?.major      ?? "",
    reason:     university?.details    ?? "",

    school:                    firstEdu.school                    ?? "",
    graduation:                firstEdu.graduation                ?? "",
    educational_qualifications: firstEdu.educational_qualifications ?? "",
    study_path:                firstEdu.study_path                ?? "",
    grade_average:             firstEdu.grade_average             ?? "",
    study_results:             firstEdu.study_results             ?? "",
  };
};

/* ── Component ── */
const Genport = () => {
  const [data, setData]       = useState<GenData>(emptyGenData);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const token  = localStorage.getItem("token");

    if (!userId) { navigate("/login"); return; }

    const fetchAllData = async () => {
      try {
        const portRes    = await fetch(
          `https://daily-life-backend-theta.vercel.app/getport/${userId}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        const portResult = await portRes.json();

        if (portResult.success && portResult.data?.length) {
          const portId = portResult.data[0].port_id;

          const [personalRes, eduRes, skillRes, activityRes, uniRes] =
            await Promise.all([
              fetch(`https://daily-life-backend-theta.vercel.app/getpersonal_info/${portId}`),
              fetch(`https://daily-life-backend-theta.vercel.app/geteducational/${portId}`),
              fetch(`https://daily-life-backend-theta.vercel.app/getskills_abilities/${portId}`),
              fetch(`https://daily-life-backend-theta.vercel.app/getactivities_certificates/${portId}`),
              fetch(`https://daily-life-backend-theta.vercel.app/getuniversity_choice/${portId}`),
            ]);

          const [personalJson, eduJson, skillJson, activityJson, uniJson] =
            await Promise.all([
              personalRes.json(), eduRes.json(),  skillRes.json(),
              activityRes.json(), uniRes.json(),
            ]);

          setData({
            port:       portResult.data[0],
            personal:   personalJson.success  ? personalJson.data[0]  : null,
            education:  eduJson.success       ? eduJson.data          : [],
            skills:     skillJson.success     ? skillJson.data        : [],
            activities: activityJson.success  ? activityJson.data     : [],
            university: uniJson.success       ? uniJson.data[0]       : null,
          });
        }
      } catch (e) {
        console.error("❌ Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-lg">
        กำลังโหลดข้อมูล...
      </div>
    );

  if (!data.personal)
    return (
      <div className="p-10 text-center text-red-500">
        ไม่พบข้อมูลส่วนตัว
      </div>
    );

  const pdfProps: PDFProps = mapGenDataToPdfProps(data);
  const fileName = data.personal?.portfolio_name?.trim()
    ? `${data.personal.portfolio_name}.pdf`
    : "Portfolio.pdf";

  return (
    <div className="p-6 bg-zinc-100 min-h-screen flex flex-col items-center">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 transition"
        >
          ย้อนกลับ
        </button>

        <PDFDownloadLink
          document={<PortfolioPDF {...pdfProps} />}
          fileName={fileName}
          className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          {({ loading }) =>
            loading ? "กำลังสร้าง PDF…" : "⬇ ดาวน์โหลด PDF"
          }
        </PDFDownloadLink>
      </div>

      <PDFViewer
        width="100%"
        height={900}
        style={{ border: "none", borderRadius: 8 }}
      >
        <PortfolioPDF {...pdfProps} />
      </PDFViewer>
    </div>
  );
};

export default Genport;