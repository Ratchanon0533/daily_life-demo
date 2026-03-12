import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PortfolioPDF } from "./MyDocument";

const Genport = () => {

  type Personal = {
    prefix?: string;
    first_name?: string;
    last_name?: string;
    portfolio_name?: string;
    phone_number1?: string;
    email?: string;
    province?: string;
    postal_code?: string;
    summary?: string;
    about?: string;
    objective?: string;
    profile_summary?: string;
    portfolio_summary?: string;
    introduce?: string;
  };

  type Port = { port_id: string; profile_url?: string; user_id?: string };

  type Education = {
    school?: string;
    educational_qualifications?: string;
    graduation?: string;
    study_path?: string;
    grade_average?: string | number;
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

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem("token");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchAllData = async () => {
      try {

        const portRes = await fetch(
          `https://daily-life-backend.vercel.app/getport/${userId}`,
          {
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          }
        );

        const portResult = await portRes.json();

        if (portResult.success && portResult.data?.length > 0) {

          const portId = portResult.data[0].port_id;

          const [
            personalRes,
            eduRes,
            skillRes,
            activityRes,
            uniRes,
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

          const results = await Promise.all([
            personalRes.json(),
            eduRes.json(),
            skillRes.json(),
            activityRes.json(),
            uniRes.json(),
          ]);

          setData({
            port: portResult.data[0],
            personal: results[0].success ? results[0].data[0] : null,
            education: results[1].success ? results[1].data : [],
            skills: results[2].success ? results[2].data : [],
            activities: results[3].success ? results[3].data : [],
            university: results[4].success ? results[4].data[0] : null,
          });
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  if (loading)
    return (
      <div className="p-10 text-center font-bold">
        กำลังโหลดข้อมูล...
      </div>
    );

  if (!data.personal)
    return (
      <div className="p-10 text-center">
        ไม่พบข้อมูลส่วนตัว
      </div>
    );

  const { personal, port } = data;

  // const summary =
  //   personal?.summary ||
  //   personal?.about ||
  //   personal?.objective ||
  //   personal?.profile_summary ||
  //   personal?.portfolio_summary ||
  //   personal?.introduce ||
  //   "";

  return (
    <div className="p-10 bg-zinc-100 min-h-screen flex flex-col items-center">
      <div className="flex gap-4">

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 rounded shadow"
        >
          ย้อนกลับ
        </button>

        <PDFDownloadLink
          document={
            <PortfolioPDF
              introduce={personal?.introduce ?? ""}
              first_name={personal?.first_name ?? ""}
              last_name={personal?.last_name ?? ""}
              prefix={personal?.prefix ?? ""}

              phonenumber1={personal?.phone_number1 ?? ""}
              email={personal?.email ?? ""}
              province={personal?.province ?? ""}
              postal_code={personal?.postal_code ?? ""}

              personal_image={port?.profile_url}

              language_skill={data.skills?.[0]?.language ?? ""}
              listening_skill={data.skills?.[0]?.listening ?? ""}
              speaking_skill={data.skills?.[0]?.speaking ?? ""}
              reading_skill={data.skills?.[0]?.reading ?? ""}
              writing_skill={data.skills?.[0]?.writing ?? ""}

              university={data.university?.university ?? ""}
              faculty={data.university?.faculty ?? ""}
              major={data.university?.major ?? ""}
              reason={data.university?.details ?? ""}

              school={data.education?.[0]?.school ?? ""}
              graduation={data.education?.[0]?.graduation ?? ""}
              educational_qualifications={
                data.education?.[0]?.educational_qualifications ?? ""
              }
              study_path={data.education?.[0]?.study_path ?? ""}
              grade_average={data.education?.[0]?.grade_average ?? ""}
            />
          }
          fileName={
            personal?.portfolio_name && personal.portfolio_name.trim() !== ""
              ? `${personal.portfolio_name}.pdf`
              : "Portfolio.pdf"
          }
          className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          {({ loading }) =>
            loading ? "กำลังสร้าง PDF..." : "Download PDF"
          }
        </PDFDownloadLink>

      </div>
    </div>
  );
};

export default Genport;