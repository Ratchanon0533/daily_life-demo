import "./css/Addevent.css";
import React, { useState } from 'react';

interface EventFormData {
    organizer_id: string;
    organizer_name: string;
    title: string;
    description: string;
    location: string;
    open_date: string;
    close_date: string;
    status: 'เปิดรับ' | 'ใกล้เต็ม';
    image: File | null;
    contact1: string;
    contact2: string;
}

export default function AddEvent() {
    const raw = localStorage.getItem("user");
    const parsed = raw ? JSON.parse(raw) : null;
    const user = parsed?.user ?? parsed ?? null; // support both {user, token} and plain user
    const token = parsed?.token ?? null;

    console.log(user.organizer_id);
    console.log(user.organizer_name);


    const [formData, setFormData] = useState<EventFormData>({
        organizer_id: user.organizer_id || '',
        organizer_name: user.organizer_name || '',
        title: '',
        description: '',
        location: '',
        open_date: '',
        close_date: '',
        status: 'เปิดรับ',
        image: null,
        contact1: '',
        contact2: '',
    });

    console.log(formData);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }));
    };

    const uploadImageToS3 = async (file: File): Promise<string> => {
        try {
            const uploadFormData = new FormData();
            uploadFormData.append('image', file);

            const response = await fetch('https://api.dailylifes.online/upload/event-image', {
                method: 'POST',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: uploadFormData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const { imageUrl } = await response.json();
            return imageUrl;
        } catch (err) {
            throw new Error('Failed to upload image to S3');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (!token) throw new Error("Missing auth token. Please login.");

            // upload image to S3 if provided
            let imageUrl: string | null = null;
            if (formData.image) {
                imageUrl = await uploadImageToS3(formData.image);
            }

            // prepare event data (without image File object)
            const eventData = {
                organizer_id: formData.organizer_id,
                organizer_name: formData.organizer_name,
                title: formData.title,
                description: formData.description,
                location: formData.location,
                open_date: new Date(formData.open_date).toISOString(),
                close_date: new Date(formData.close_date).toISOString(),
                image_url: imageUrl,
                contact1: formData.contact1,
                contact2: formData.contact2 || null,
                status: formData.status,
            };

            const response = await fetch('https://api.dailylifes.online/post/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(eventData),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || result.error || 'Failed to create event');
            }

            setSuccess(true);
            setFormData({
                organizer_id: user.organizer_id || '',
                organizer_name: user.organizer_name || '',
                title: '',
                description: '',
                location: '',
                open_date: '',
                close_date: '',
                status: 'เปิดรับ',
                image: null,
                contact1: '',
                contact2: '',
            });

            alert('Event created successfully!');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addevent-container">
            <div className="addevent-wrapper">
                <div className="addevent-header">
                    <h1>เพิ่มกิจกรรมใหม่</h1>
                    <p>กรอกข้อมูลรายละเอียดของกิจกรรม</p>
                </div>

                <form onSubmit={handleSubmit} className="addevent-form">
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">กิจกรรมถูกสร้างเรียบร้อยแล้ว!</div>}

                    {/* Basic Information Section */}
                    <div className="form-section">
                        <h2>ข้อมูลพื้นฐาน</h2>

                        <div className="form-group">
                            <label htmlFor="title">ชื่อกิจกรรม</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="กรอกชื่อกิจกรรม"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">รายละเอียด</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="กรอกรายละเอียดของกิจกรรม"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">สถานที่</label>
                            <input
                                id="location"
                                type="text"
                                name="location"
                                placeholder="กรอกสถานที่จัดกิจกรรม"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Date and Status Section */}
                    <div className="form-section">
                        <h2>วันที่และสถานะ</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="open_date">วันที่เปิดรับสมัคร</label>
                                <input
                                    id="open_date"
                                    type="datetime-local"
                                    name="open_date"
                                    value={formData.open_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="close_date">วันที่ปิดรับสมัคร</label>
                                <input
                                    id="close_date"
                                    type="datetime-local"
                                    name="close_date"
                                    value={formData.close_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">สถานะ</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="เปิดรับ">เปิดรับสมัคร</option>
                                <option value="ใกล้เต็ม">ใกล้เต็ม</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="form-section">
                        <h2>รูปภาพ</h2>

                        <div className="file-input-wrapper">
                            <label htmlFor="image" className="file-input-label">
                                <div className="file-input-text">+ เลือกรูปภาพ</div>
                                <div className="file-input-hint">หรือลากและวางรูปภาพที่นี่</div>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                            {formData.image && (
                                <div className="image-preview">
                                    <img
                                        src={URL.createObjectURL(formData.image)}
                                        alt="Preview"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="form-section">
                        <h2>ข้อมูลติดต่อ</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="contact1">เบอร์โทร 1</label>
                                <input
                                    id="contact1"
                                    type="tel"
                                    name="contact1"
                                    placeholder="กรอกเบอร์โทรติดต่อ"
                                    value={formData.contact1}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact2">เบอร์โทร 2 (ไม่บังคับ)</label>
                                <input
                                    id="contact2"
                                    type="tel"
                                    name="contact2"
                                    placeholder="กรอกเบอร์โทรเพิ่มเติม"
                                    value={formData.contact2}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="button-group">
                        <button
                            type="submit"
                            disabled={loading}
                            className="submit-btn"
                            style={{ position: 'relative' }}
                        >
                            {loading && <span className="loading-spinner"></span>}
                            {loading ? 'กำลังสร้าง...' : 'สร้างกิจกรรม'}
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => window.history.back()}
                        >
                            ยกเลิก
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
