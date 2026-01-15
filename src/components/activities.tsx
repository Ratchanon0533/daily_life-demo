import "./css/activities.css";
import Nav from "./nav-bar";
import Navlogin from "./nav-bar(login)";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ================= INTERFACES ================= */

interface Activity {
  activity_id: string;
  organizer_id: number;
  organizer_name: string;
  title: string;
  description: string;
  location: string;
  open_date: string;
  close_date: string;
  image_url?: string;
  status: string;
}

interface OrganizerResponse {
  organizer_id: number;
  organizer_name: string;
  activities: {
    activity_id: string;
    title: string;
    description: string;
    location: string;
    open_date: string;
    close_date: string;
    status: string;
    image_url?: string;
  }[];
}

/* ================= COMPONENT ================= */

const Activities = () => {
  const [mode, setMode] = useState<"login" | "no-login">("no-login");
  const [activities, setActivities] = useState<Activity[]>([]);

  console.log(activities);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    setMode(token ? "login" : "no-login");

    fetch("https://daily-life-backend.vercel.app/event/get")
      .then((res) => res.json())
      .then((res) => {
        if (!res.success || !Array.isArray(res.data)) return;

        // flatten organizer -> activities[]
        const flatActivities: Activity[] = res.data.flatMap(
          (org: OrganizerResponse) =>
            org.activities.map((act) => ({
              ...act,
              organizer_id: org.organizer_id,
              organizer_name: org.organizer_name,
            }))
        );

        setActivities(flatActivities);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  /* ================= TIME AGO ================= */
  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = (now.getTime() - date.getTime()) / 1000;

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

  /* ================= RENDER ================= */
  return (
    <>
      {mode === "login" ? <Navlogin /> : <Nav />}

      <div className="main-content-wrapper">
        <div className="activities-container">
          <header className="activities-header">
            <h2 className="activities-title">บอร์ดกิจกรรม</h2>
            <div className="header-decoration"></div>
          </header>

          <div className="activities-list">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <Link
                  key={activity.activity_id}
                  to={`/activities/${activity.activity_id}`}
                  className="activity-card"
                >
                  <img
                    src={activity.image_url || "/no-image.png"}
                    alt={activity.title}
                    className="activity-image"
                  />

                  <div className="activity-content">
                    <h3 className="activity-title">
                      {activity.title}
                    </h3>

                    <p className="activity-organizer">
                      {activity.organizer_name}
                    </p>


                    <div className="activity-footer">
                      <span className="activity-location">
                        สถานที่จัด:
                        {activity.location}
                      </span>
                      <span className="activity-time">
                        {timeAgo(activity.open_date)}
                      </span>
                    </div>

                    {/* STATUS */}
                    <span
                      className={`activity-status ${
                        activity.status === "ใกล้เต็ม"
                          ? "status-warning"
                          : "status-open"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-activities">ไม่มีกิจกรรมในขณะนี้</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activities;