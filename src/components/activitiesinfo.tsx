import "./css/activitiesinfo.css";
import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Activity {
  activity_id: string;
  title: string;
  description: string;
  location: string;
  open_date: string;
  close_date: string;
  status: string;
  image_url?: string;
  contact1?: string;
  contact2?: string;
}

type UserProfile = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: string;
  level?: number;
  badges?: string[];
  recent?: string[];
  profile_image?: string;
};

// interface Organizer {
//   organizer_id: string;
//   organizer_name: string;
//   activities: Activity[];
// }

const Activitiesinfo = () => {

  const [activity_id, setActivityId] = useState<string>("");
  const [organizer_name, setOrganizerName] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");


  const [profile, setProfile] = useState<UserProfile>({});
  const [mode, setMode] = useState<"login" | "no-login">("no-login");
  // const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [activity, setActivity] = useState<Activity | null>(null);
  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    const token = localStorage.getItem("token");
    setMode(token ? "login" : "no-login");
    setProfile(JSON.parse(localStorage.getItem("user") || "{}"));
    

    fetch("https://daily-life-backend.vercel.app/event/get")
      .then(res => res.json())
      .then(res => {
        // setOrganizers(res.data || []);
        // หา activity ตาม id
        for (const org of res.data) {
          const found = org.activities.find((a: Activity) => a.activity_id === id);
            setOrganizerName(org.organizer_name);
          if (found) {
            setActivity(found);
            break;
          }
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!activity) return <p>กำลังโหลดกิจกรรม...</p>;
  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = (now.getTime() - date.getTime()) / 1000; // วินาที

    if (diff < 60) return "เมื่อสักครู่";
    if (diff < 3600) return `${Math.floor(diff / 60)} นาทีที่แล้ว`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ชั่วโมงที่แล้ว`;
    if (diff < 172800) return "เมื่อวานนี้";
    return date.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
  };

  const handleRegister = async () => {
  try {
    const response = await fetch("http://localhost:5000/register-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity_id: activity_id,
        organizer_name: organizer_name,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
      }),
    });

    if (!response.ok) {
      throw new Error("ลงทะเบียนไม่สำเร็จ");
    }

    const data = await response.json();
    alert("ลงทะเบียนสำเร็จ 🎉");
    console.log(data);
  } catch (error) {
    console.error(error);
    alert("เกิดข้อผิดพลาดในการลงทะเบียน");
  }
};


  return (
    <>
      {mode === "login" ? <Navlogin /> : <Nav />}
      <div className="activities-container">
        <div className="activity-card">
          {activity.image_url && (
            <div className="activity-image">
              <img src={activity.image_url} alt={activity.title} />
            </div>
          )}
          <div className="activity-content">
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <p>สถานที่: {activity.location}</p>
            <p>
              วันที่เปิดรับ: {timeAgo(activity.open_date)} | ปิดรับ: {timeAgo(activity.close_date)}
            </p>
            <p>สถานะ: {activity.status}</p>
            {activity.contact1 && <p>ติดต่อ 1: {activity.contact1}</p>}
            {activity.contact2 && <p>ติดต่อ 2: {activity.contact2}</p>}
            <button
              onClick={() => {
                setActivityId(activity.activity_id);
                setFirstname(profile.firstname || "");
                setLastname(profile.lastname || "");
                setPhone(profile.phone || "");
                handleRegister();
              }}
            >
              ลงทะเบียน
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Activitiesinfo;