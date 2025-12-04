import "./css/activities.css";
import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Activity {
  activity_id: string;
  title: string;
  description: string;
  location: string;
  open_date: string;
  close_date: string;
  status: string;
  image?: string;
  contact1?: string;
  contact2?: string;
}

interface Organizer {
  organizer_id: string;
  organizer_name: string;
  activities: Activity[];
}

const Activities = () => {
  const [mode, setMode] = useState<"login" | "no-login">("no-login");
  const [organizers, setOrganizers] = useState<Organizer[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setMode(token ? "login" : "no-login");

    fetch("https://daily-life-backend.vercel.app/event/get")
      .then(res => res.json())
      .then(res => setOrganizers(res.data || []))
      .catch(err => console.error(err));
  }, []);

  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = (now.getTime() - date.getTime()) / 1000; // วินาที

    if (diff < 60) return "เมื่อสักครู่";
    if (diff < 3600) return `${Math.floor(diff / 60)} นาทีที่แล้ว`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ชั่วโมงที่แล้ว`;
    if (diff < 172800) return "เมื่อวานนี้";
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {mode === "login" ? <Navlogin /> : <Nav />}
      <div className="main-content-wrapper">
        <div className="activities-container">
          <header className="activities-header">
            <h2 className="activities-title">บอร์ดกิจกรรม</h2>
            <div className="header-decoration"></div>
          </header>

          <ul className="activities-list">
            {organizers.map(org =>
              org.activities.map(act => (
                <li key={act.activity_id} className="activity-item-card">
                  <Link to={`/activities/${act.activity_id}`} className="activity-link">
                    <div className="activity-image-wrapper">
                      <img
                        src={act.image || "https://www.pim.ac.th/wp-content/uploads/2018/11/PP-0560.jpg"}
                        alt={act.title}
                        className="activity-image"
                      />
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{act.title}</p>
                      <p>{act.description}</p>
                      <span className="activity-timestamp">
                        สถานะ: {act.status}
                      </span>
                      <span className="activity-timestamp">
                        วันที่เปิด: {timeAgo(act.open_date)} | ปิด: {timeAgo(act.close_date)}
                      </span>
                      {act.contact1 && <span className="activity-timestamp">ติดต่อ 1: {act.contact1}</span>}
                      {act.contact2 && <span className="activity-timestamp">ติดต่อ 2: {act.contact2}</span>}
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Activities;