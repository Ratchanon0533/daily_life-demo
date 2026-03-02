import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Genport = () => {
  // 1. แก้ไข Never Type โดยการกำหนด Initial State ที่มีโครงสร้างชัดเจน
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

  type Education = { school?: string; educational_qualifications?: string; graduation?: string; study_path?: string; grade_average?: string | number };

  type Skill = { language?: string; listening?: string; speaking?: string; reading?: string; writing?: string };

  type Activity = { photo?: string; name_project?: string; date?: string };

  type University = { university?: string; faculty?: string; major?: string; details?: string };

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
    university: null
  });
  
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userid');
    const token = localStorage.getItem('token');

    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchAllData = async () => {
      try {
        // Step 1: ดึงข้อมูล Port หลัก
        const portRes = await fetch(`http://localhost:5000/getport/${userId}`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        });
        const portResult = await portRes.json();

        if (portResult.success && portResult.data?.length > 0) {
          const portId = portResult.data[0].port_id;

          // Step 2: ดึงข้อมูลส่วนอื่นๆ พร้อมกัน
          const [personalRes, eduRes, skillRes, activityRes, uniRes] = await Promise.all([
            fetch(`http://localhost:5000/getpersonal_info/${portId}`),
            fetch(`http://localhost:5000/geteducational/${portId}`),
            fetch(`http://localhost:5000/getskills_abilities/${portId}`),
            fetch(`http://localhost:5000/getactivities_certificates/${portId}`),
            fetch(`http://localhost:5000/getuniversity_choice/${portId}`)
          ]);

          const results = await Promise.all([
            personalRes.json(), eduRes.json(), skillRes.json(), activityRes.json(), uniRes.json()
          ]);

          setData({
            port: portResult.data[0],
            personal: results[0].success ? results[0].data[0] : null,
            education: results[1].success ? results[1].data : [],
            skills: results[2].success ? results[2].data : [],
            activities: results[3].success ? results[3].data : [],
            university: results[4].success ? results[4].data[0] : null
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



  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;
    try {
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, // อนุญาตดึงภาพข้าม Domain (S3)
        logging: false 
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const contentHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, contentHeight);
      pdf.save(`Portfolio_${data.personal?.first_name || 'Export'}.pdf`);
    } catch (e) {
      console.error(e);
      alert("ไม่สามารถดาวน์โหลด PDF ได้");
    }
  };

  if (loading) return <div className="p-10 text-center font-bold">กำลังโหลดข้อมูล...</div>;
  if (!data.personal) return <div className="p-10 text-center">ไม่พบข้อมูลส่วนตัว</div>;

  // Destructure ข้อมูลมาใช้ (ใช้ Optional Chaining ป้องกัน Error)
  const { personal, education, skills, activities, port, university } = data;
  // alert(data.port.profile_url);

  // รองรับชื่อฟิลด์สรุปที่อาจต่างกันในฐานข้อมูล
  const summary = personal?.summary || personal?.about || personal?.objective || personal?.profile_summary || personal?.portfolio_summary || personal?.introduce || null;

  return (
    <div className="p-8 bg-zinc-100 min-h-screen flex flex-col items-center font-sans">
      <div className="mb-6 flex gap-4">
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-gray-200 rounded shadow text-gray-600">ย้อนกลับ</button>
        <button onClick={handleDownloadPdf} className="px-6 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition">
          Download PDF
        </button>
      </div>

      {/* ใบ Portfolio ขนาด A4 */}
      <div ref={printRef} className="w-[210mm] min-h-[297mm] bg-white p-[20mm] shadow-2xl text-slate-800">
        
        {/* ส่วนหัวและรูปโปรไฟล์ */}
        <header className="border-b-4 border-blue-600 pb-8 mb-8 flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
              {personal?.prefix} {personal?.first_name} {personal?.last_name}
            </h1>
            <p className="text-xl font-semibold text-blue-600 uppercase tracking-wide">
              {personal?.portfolio_name}
            </p>
            <div className="mt-4 text-sm space-y-1 text-slate-500">
              <p><strong>เบอร์โทร:</strong> {personal?.phone_number1}</p>
              <p><strong>อีเมล:</strong> {personal?.email}</p>
              <p><strong>ที่อยู่:</strong> {personal?.province} {personal?.postal_code}</p>
            </div>
          </div>
          
          {/* รูปโปรไฟล์จาก S3 */}
          <div className="ml-8 w-44 h-56 rounded-lg border-2 border-slate-100 overflow-hidden shadow-sm bg-slate-50">
            {data.port?.profile_url ? (
              <img 
                src={data.port.profile_url} 
                alt="Profile" 
                className="w-full h-full object-cover" 
                crossOrigin="anonymous" // สำคัญมาก
              />
            ) : <div className="w-full h-full flex items-center justify-center text-slate-300">ไม่มีรูป</div>}
          </div>
        </header>

        {/* สรุปสั้น ๆ (หากมี) */}
        {summary && (
          <div className="w-full mb-6">
            <div className="bg-slate-50 p-4 rounded border-l-4 border-blue-600 text-slate-700">
              <h4 className="font-semibold text-slate-900 mb-2">สรุป</h4>
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-10">
          {/* Column ซ้าย: ทักษะ */}
          <div className="col-span-4 border-r border-slate-100 pr-8">
            <section className="mb-8">
              <h3 className="text-lg font-bold text-blue-800 border-b-2 border-blue-50 mb-4">ทักษะทางภาษา</h3>
              {skills.map((s, idx) => (
                <div key={idx} className="mb-4 p-3 bg-slate-50 rounded-md">
                  <p className="font-bold text-blue-700 text-sm mb-1 uppercase tracking-tighter">ภาษา{s.language}</p>
                  <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-600 italic font-medium">
                    <p>ฟัง: {s.listening}</p>
                    <p>พูด: {s.speaking}</p>
                    <p>อ่าน: {s.reading}</p>
                    <p>เขียน: {s.writing}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Column ขวา: การศึกษา & ผลงาน */}
          <div className="col-span-8">
            <section className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-6 w-1.5 bg-blue-600 rounded-full"></span> ประวัติการศึกษา
              </h3>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-100">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-sm"></div>
                    <h5 className="font-bold text-lg text-slate-800">{edu.school}</h5>
                    <p className="text-blue-600 text-sm font-semibold">{edu.educational_qualifications} (จบปี {edu.graduation})</p>
                    <p className="text-xs text-slate-400 italic">สายการเรียน: {edu.study_path} | GPAX: {edu.grade_average}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-6 w-1.5 bg-blue-600 rounded-full"></span> เป้าหมายทางการศึกษา
              </h3>
              <div className="bg-blue-50 p-5 rounded-xl border-l-8 border-blue-600 italic text-blue-900">
                <p className="font-bold text-lg">{university?.university}</p>
                <p className="text-blue-700 mb-2 font-medium">{university?.faculty} - {university?.major}</p>
                <p className="text-slate-600 text-xs leading-relaxed">"{university?.details}"</p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="h-6 w-1.5 bg-blue-600 rounded-full"></span> ผลงานและเกียรติบัตร
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {activities.map((act, idx) => {
                  // แปลง String เป็น Array (กิจกรรม)
                  let photos = [];
                  try { photos = act.photo ? JSON.parse(act.photo) : []; } catch(e) { photos = []; }
                  
                  return (
                    <div key={idx} className="border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition">
                      <div className="h-32 bg-slate-100 rounded mb-3 overflow-hidden shadow-inner">
                        {photos.length > 0 ? (
                          <img 
                            src={photos[0]} 
                            className="w-full h-full object-cover" 
                            crossOrigin="anonymous" 
                            alt="Activity" 
                          />
                        ) : <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300 italic">ไม่มีรูปภาพ</div>}
                      </div>
                      <p className="font-bold text-[13px] mb-1 line-clamp-1">{act.name_project}</p>
                      <p className="text-[10px] text-slate-400 mb-2">{act.date ? new Date(act.date).toLocaleDateString('th-TH') : ''}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genport;