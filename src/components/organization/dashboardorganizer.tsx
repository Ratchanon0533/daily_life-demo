import "./css/dashboardorganizer.css";
import { useState, useEffect } from 'react';

interface EventData {
    activity_id: number;
    organizer_id: number;
    organizer_name: string;
    title: string;
    description: string;
    location: string;
    open_date: string;
    close_date: string;
    image_url: string;
    contact1: string;
    contact2: string;
    status: string;
    created_at: string;
}

export default function DashboardOrganizer() {
    
    const [events, setEvents] = useState<EventData[] | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [organizerId, setOrganizerId] = useState<number | null>(null);


    useEffect(() => {
        const raw = localStorage.getItem("user");
        if (!raw) {
            setEvents(null);
            setToken(null);
            return;
        }
        try {
            if (!token && !organizerId){
                console.log("ERROR")
            }
            const parsed = JSON.parse(raw);
            let userPart: any = parsed;
            let tok: string | null = null;

            if (parsed && typeof parsed === 'object' && 'user' in parsed) {
                userPart = parsed.user;
                tok = parsed.token ?? null;
            }

            setOrganizerId(userPart?.organizer_id);
            setToken(tok);
            console.log("Parsed user data:", userPart, tok);

            // Fetch events for this organizer
            if (userPart?.organizer_id && tok) {
                fetchEvents(userPart.organizer_id, tok);
            }
        } catch {
            setEvents(null);
            setToken(null);
        }
    }, []);

    const fetchEvents = async (orgId: number, authToken: string) => {
        try {
            const response = await fetch(`https://api.dailylifes.online/getall/event/${orgId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                setEvents(Array.isArray(data) ? data : data.events || []);
            } else {
                console.error('Failed to fetch events:', data);
                setEvents([]);
            }
        } catch (err) {
            console.error('Error fetching events:', err);
            setEvents([]);
        }
    };

    
    const deleteEvent = async (eventId: number) => {
        if (!token) {
            console.error('No auth token');
            return;
        }

        try {
            const response = await fetch(`https://api.dailylifes.online/event/delete/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await response.json();
            if (response.ok) {
                setEvents(prev => prev ? prev.filter(e => e.activity_id !== eventId) : []);
                console.log('Event deleted:', result);
            } else {
                console.error('Delete failed:', result);
            }
        } catch (error) {
            console.error('Delete event error:', error);
        }
    };

    const editEvent = async (event: EventData) => {
        localStorage.setItem('editEventData', JSON.stringify(event));
        navigator.clipboard.writeText(JSON.stringify(event)).then(() => {
            window.location.href = '/edit-event';
        }).catch(err => {
            console.error('Failed to copy event data for editing:', err);
        });
    };

// ...existing code...
    return (
        <div className="dashboard-organizer-container">
            <div className="dashboard-header">
                <h1>Dashboard สำหรับผู้จัดกิจกรรม</h1>
                <p>ดูและจัดการกิจกรรมของคุณ</p>
            </div>

            <div className="dashboard-content">
                <div style={{ marginBottom: '30px', textAlign: 'right' }}>
                    <button
                        className="submit-btn"
                        onClick={() => window.location.href = '/add-event'}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        + เพิ่มกิจกรรม
                    </button>
                </div>

                {events === null || events.length === 0 ? (
                    <div className="no-events-message">
                        <div className="no-events-icon">📭</div>
                        <p>ยังไม่มีกิจกรรมใดเลย</p>
                    </div>
                ) : (
                    <>
                        <div className="events-grid">
                            {events.map(event => (
                                <div key={event.activity_id} className="event-card">
                                    {event.image_url && (
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderBottom: '1px solid #f0f0f0'
                                            }}
                                        />
                                    )}
                                    <div className="event-card-header">
                                        <h3 className="event-card-title">{event.title}</h3>
                                        <p className="event-card-organizer">{event.organizer_name}</p>
                                    </div>

                                    <div className="event-card-body">
                                        <div className="event-info">
                                            <span className="event-info-label">รายละเอียด</span>
                                            <div className="event-info-value">{event.description}</div>
                                        </div>

                                        <div className="event-info">
                                            <span className="event-info-label">สถานที่</span>
                                            <div className="event-info-value">{event.location}</div>
                                        </div>

                                        <div className="event-info">
                                            <span className="event-info-label">เบอร์ติดต่อ</span>
                                            <div className="event-info-value">{event.contact1}</div>
                                        </div>

                                        {event.contact2 && (
                                            <div className="event-info">
                                                <span className="event-info-label">เบอร์ติดต่อ 2</span>
                                                <div className="event-info-value">{event.contact2}</div>
                                            </div>
                                        )}

                                        <div className="event-status">
                                            <span className={event.status === 'เปิดรับ' ? 'status-open' : 'status-closed'}>
                                                {event.status}
                                            </span>
                                        </div>

                                        <div className="event-dates">
                                            <div className="date-item">
                                                <span className="date-item-label">เปิดรับสมัคร:</span>
                                                <span>{new Date(event.open_date).toLocaleDateString('th-TH')}</span>
                                            </div>
                                            <div className="date-item">
                                                <span className="date-item-label">ปิดรับสมัคร:</span>
                                                <span>{new Date(event.close_date).toLocaleDateString('th-TH')}</span>
                                            </div>
                                            <div className="date-item">
                                                <span className="date-item-label">สร้างเมื่อ:</span>
                                                <span>{new Date(event.created_at).toLocaleDateString('th-TH')}</span>
                                            </div>
                                            
                                        <div className="event-actions" style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                                            <button
                                                className="submit-btn"
                                                style={{ backgroundColor: '#009688', padding: '6px 10px', fontSize: '0.85rem' }}
                                                onClick={() => editEvent(event)}
                                            >
                                                แก้ไข
                                            </button>
                                            <button
                                                className="submit-btn"
                                                style={{ backgroundColor: '#e53935', padding: '6px 10px', fontSize: '0.85rem' }}
                                                onClick={() => {
                                                    if (window.confirm('ยืนยันจะลบกิจกรรมนี้หรือไม่?')) {
                                                        deleteEvent(event.activity_id);
                                                    }
                                                }}
                                            >
                                                ลบ
                                            </button>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
// ...existing code...