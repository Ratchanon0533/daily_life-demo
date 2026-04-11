// src/pages/EditPort.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

import { PortfolioPDF } from "./MyDocument";
import type { PDFProps, SkillItem, ActivityItem } from "./MyDocument";

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
  number?: number;
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
  number?: number;
  photo?: string;
  name_project?: string;
  date?: string;
  details?: string;
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
    day: d.getDate(),
    month: d.toLocaleString("th-TH", { month: "long" }),
    year: d.getFullYear() + 543,
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

const toISODate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
};

/* ── Mapping ── */
const mapGenDataToPdfProps = (data: GenData): PDFProps => {
  const { personal, port, education, skills, activities, university } = data;

  const {
    prefix = "",
    first_name = "",
    last_name = "",
    email = "",
    phone_number1 = "",
    phone_number2 = "",
    address = "",
    province = "",
    district = "",
    subdistrict = "",
    postal_code = "",
    introduce = "",
    date_birth,
    nationality = "",
    national_id = "",
  } = personal ?? {};

  const { day: birth_day, month: birth_month, year: birth_year } =
    toThaiDate(date_birth);

  const firstEdu = education[0] ?? {};

  const mappedSkills: SkillItem[] = skills.map((s) => ({
    language: s.language,
    listening: s.listening,
    speaking: s.speaking,
    reading: s.reading,
    writing: s.writing,
  }));

  const mappedActivities: ActivityItem[] = activities.map((act) => ({
    name_project: act.name_project,
    date: act.date,
    description: act.details,
    photos: parsePhotos(act.photo),
  }));

  return {
    introduce,
    prefix,
    first_name,
    last_name,
    birth_day,
    birth_month,
    birth_year,
    nationality,
    id_card: national_id,
    phonenumber1: phone_number1,
    phonenumber2: phone_number2,
    email,
    address,
    province,
    district,
    subdistrict,
    postal_code,

    personal_image: port?.profile_url ?? null,

    skills: mappedSkills,
    activities: mappedActivities,

    university: university?.university ?? "",
    faculty: university?.faculty ?? "",
    major: university?.major ?? "",
    reason: university?.details ?? "",

    school: firstEdu.school ?? "",
    graduation: firstEdu.graduation ?? "",
    educational_qualifications:
      firstEdu.educational_qualifications ?? "",
    study_path: firstEdu.study_path ?? "",
    grade_average: firstEdu.grade_average ?? "",
    study_results: firstEdu.study_results ?? "",
  };
};

/* ── Component ── */
const EditPort = () => {
  const { port_id } = useParams<{ port_id: string }>();
  const [data, setData] = useState<GenData>(emptyGenData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  // Load data from API
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!port_id) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.dailylifes.online/getport_details/${port_id}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const result = await res.json();

        if (result.success) {
          const skillsData = result.data.skills || {};
          setData({
            port: {
              port_id: result.data.port_id,
              profile_url: result.data.profile_url,
              user_id: result.data.user_id,
            },
            personal: result.data.personal || null,
            education: result.data.educational || [],
            skills: skillsData.languages || [],
            activities: result.data.activities || [],
            university: result.data.university?.[0] || null,
          });
        }
      } catch (e) {
        console.error("❌ Fetch error:", e);
        alert("ไม่สามารถโหลดข้อมูล Portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [port_id, navigate]);

  // Handle form changes
  const handlePersonalChange = (
    field: keyof Personal,
    value: string | number
  ) => {
    setData((prev) => ({
      ...prev,
      personal: prev.personal ? { ...prev.personal, [field]: value } : null,
    }));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string | number
  ) => {
    setData((prev) => {
      const newEdu = [...prev.education];
      newEdu[index] = { ...newEdu[index], [field]: value };
      return { ...prev, education: newEdu };
    });
  };

  const handleSkillChange = (
    index: number,
    field: keyof Skill,
    value: string
  ) => {
    setData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], [field]: value };
      return { ...prev, skills: newSkills };
    });
  };

  const handleActivityChange = (
    index: number,
    field: keyof Activity,
    value: string
  ) => {
    setData((prev) => {
      const newActivities = [...prev.activities];
      newActivities[index] = { ...newActivities[index], [field]: value };
      return { ...prev, activities: newActivities };
    });
  };

  const handleUniversityChange = (
    field: keyof University,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      university: prev.university ? { ...prev.university, [field]: value } : null,
    }));
  };

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setData((prev) => ({
          ...prev,
          port: { ...prev.port, profile_url: result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem("token");

    try {
      const payload = {
        personal_info: data.personal,
        educational: data.education,
        skills_abilities: {
          details: "",
          language_skills: data.skills,
        },
        activities_certificates: data.activities,
        university_choice: data.university ? [data.university] : [],
      };

      const res = await fetch(
        `https://api.dailylifes.online/editport/${port_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("บันทึกข้อมูล Portfolio สำเร็จแล้ว");
        navigate(`/portfolio/${port_id}`);
      } else {
        alert(`เกิดข้อผิดพลาด: ${result.message}`);
      }
    } catch (e) {
      console.error("❌ Submit error:", e);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">แก้ไข Portfolio</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              {showPreview ? "ซ่อน" : "แสดง"} Preview
            </button>
            <PDFDownloadLink
              document={<PortfolioPDF {...pdfProps} />}
              fileName={fileName}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              {({ loading }) =>
                loading ? "สร้าง PDF…" : "⬇ ดาวน์โหลด PDF"
              }
            </PDFDownloadLink>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-2">
                  ข้อมูลส่วนตัว
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="คำนำหน้า"
                    value={data.personal?.prefix || ""}
                    onChange={(e) =>
                      handlePersonalChange("prefix", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    value={data.personal?.first_name || ""}
                    onChange={(e) =>
                      handlePersonalChange("first_name", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="นามสกุล"
                    value={data.personal?.last_name || ""}
                    onChange={(e) =>
                      handlePersonalChange("last_name", e.target.value)
                    }
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="ชื่อ Portfolio"
                    value={data.personal?.portfolio_name || ""}
                    onChange={(e) =>
                      handlePersonalChange("portfolio_name", e.target.value)
                    }
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="อีเมล"
                    value={data.personal?.email || ""}
                    onChange={(e) =>
                      handlePersonalChange("email", e.target.value)
                    }
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="เบอร์โทรศัพท์ 1"
                    value={data.personal?.phone_number1 || ""}
                    onChange={(e) =>
                      handlePersonalChange("phone_number1", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="เบอร์โทรศัพท์ 2"
                    value={data.personal?.phone_number2 || ""}
                    onChange={(e) =>
                      handlePersonalChange("phone_number2", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="date"
                    value={toISODate(data.personal?.date_birth)}
                    onChange={(e) =>
                      handlePersonalChange("date_birth", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="สัญชาติ"
                    value={data.personal?.nationality || ""}
                    onChange={(e) =>
                      handlePersonalChange("nationality", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="รหัสประจำตัวประชาชน"
                    value={data.personal?.national_id || ""}
                    onChange={(e) =>
                      handlePersonalChange("national_id", e.target.value)
                    }
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <textarea
                    placeholder="แนะนำตัวเอง"
                    value={data.personal?.introduce || ""}
                    onChange={(e) =>
                      handlePersonalChange("introduce", e.target.value)
                    }
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    rows={3}
                  />
                  <input
                    type="text"
                    placeholder="ที่อยู่"
                    value={data.personal?.address || ""}
                    onChange={(e) =>
                      handlePersonalChange("address", e.target.value)
                    }
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="จังหวัด"
                    value={data.personal?.province || ""}
                    onChange={(e) =>
                      handlePersonalChange("province", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="เขต"
                    value={data.personal?.district || ""}
                    onChange={(e) =>
                      handlePersonalChange("district", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="แขวง"
                    value={data.personal?.subdistrict || ""}
                    onChange={(e) =>
                      handlePersonalChange("subdistrict", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="รหัสไปรษณีย์"
                    value={data.personal?.postal_code || ""}
                    onChange={(e) =>
                      handlePersonalChange("postal_code", e.target.value)
                    }
                    className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* Profile Image */}
                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ภาพโปรไฟล์
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  {data.port?.profile_url && (
                    <img
                      src={data.port.profile_url}
                      alt="profile"
                      className="mt-3 w-24 h-24 rounded-lg object-cover"
                    />
                  )}
                </div>
              </section>

              {/* Education */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-green-600 pb-2">
                  ข้อมูลการศึกษา
                </h2>
                {data.education.map((edu, idx) => (
                  <div key={idx} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">
                      ระดับ {idx + 1}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="โรงเรียน/มหาวิทยาลัย"
                        value={edu.school || ""}
                        onChange={(e) =>
                          handleEducationChange(idx, "school", e.target.value)
                        }
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="วุฒิการศึกษา"
                        value={edu.educational_qualifications || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            idx,
                            "educational_qualifications",
                            e.target.value
                          )
                        }
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <input
                        type="date"
                        value={toISODate(edu.graduation)}
                        onChange={(e) =>
                          handleEducationChange(idx, "graduation", e.target.value)
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="สาขา"
                        value={edu.study_path || ""}
                        onChange={(e) =>
                          handleEducationChange(idx, "study_path", e.target.value)
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="เกรดเฉลี่ย"
                        step="0.01"
                        value={edu.grade_average || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            idx,
                            "grade_average",
                            e.target.value
                          )
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="ผลการเรียน"
                        value={edu.study_results || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            idx,
                            "study_results",
                            e.target.value
                          )
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    </div>
                  </div>
                ))}
              </section>

              {/* Skills */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-yellow-600 pb-2">
                  ทักษะและภาษา
                </h2>
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">
                      ภาษาที่ {idx + 1}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ภาษา"
                        value={skill.language || ""}
                        onChange={(e) =>
                          handleSkillChange(idx, "language", e.target.value)
                        }
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      />
                      <select
                        value={skill.listening || ""}
                        onChange={(e) =>
                          handleSkillChange(idx, "listening", e.target.value)
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">เลือกระดับ (ฟัง)</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                      </select>
                      <select
                        value={skill.speaking || ""}
                        onChange={(e) =>
                          handleSkillChange(idx, "speaking", e.target.value)
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">เลือกระดับ (พูด)</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                      </select>
                      <select
                        value={skill.reading || ""}
                        onChange={(e) =>
                          handleSkillChange(idx, "reading", e.target.value)
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">เลือกระดับ (อ่าน)</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                      </select>
                      <select
                        value={skill.writing || ""}
                        onChange={(e) =>
                          handleSkillChange(idx, "writing", e.target.value)
                        }
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                      >
                        <option value="">เลือกระดับ (เขียน)</option>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                      </select>
                    </div>
                  </div>
                ))}
              </section>

              {/* Activities */}
              <section className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-red-600 pb-2">
                  กิจกรรมและประกาศนียบัตร
                </h2>
                {data.activities.map((activity, idx) => (
                  <div key={idx} className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">
                      กิจกรรมที่ {idx + 1}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="ชื่อโครงการ/กิจกรรม"
                        value={activity.name_project || ""}
                        onChange={(e) =>
                          handleActivityChange(
                            idx,
                            "name_project",
                            e.target.value
                          )
                        }
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                      <input
                        type="date"
                        value={toISODate(activity.date)}
                        onChange={(e) =>
                          handleActivityChange(idx, "date", e.target.value)
                        }
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                      />
                      <textarea
                        placeholder="รายละเอียด"
                        value={activity.details || ""}
                        onChange={(e) =>
                          handleActivityChange(idx, "details", e.target.value)
                        }
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </section>

              {/* University Choice */}
              {data.university && (
                <section className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-purple-600 pb-2">
                    ลำดับความต้องการสมัครเข้ามหาวิทยาลัย
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="มหาวิทยาลัย"
                      value={data.university.university || ""}
                      onChange={(e) =>
                        handleUniversityChange("university", e.target.value)
                      }
                      className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="คณะ"
                      value={data.university.faculty || ""}
                      onChange={(e) =>
                        handleUniversityChange("faculty", e.target.value)
                      }
                      className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="สาขา"
                      value={data.university.major || ""}
                      onChange={(e) =>
                        handleUniversityChange("major", e.target.value)
                      }
                      className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                    <textarea
                      placeholder="เหตุผลที่เลือก"
                      value={data.university.details || ""}
                      onChange={(e) =>
                        handleUniversityChange("details", e.target.value)
                      }
                      className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </section>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
              >
                {saving ? "กำลังบันทึก..." : "💾 บันทึกการแก้ไข"}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="sticky top-6 bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold">
                  Preview PDF
                </div>
                <PDFViewer width="100%" height={600} style={{ border: "none" }}>
                  <PortfolioPDF {...pdfProps} />
                </PDFViewer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPort;