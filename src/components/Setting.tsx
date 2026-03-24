import { useState } from 'react';
import "./css/setting.css";

const Setting = () => {

    const storedUserString = localStorage.getItem("user");
    const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

    const [firstname, setFirstname] = useState(storedUser?.firstname || "");
    const [lastname, setLastname] = useState(storedUser?.lastname || "");
    const [username, setUsername] = useState(storedUser?.username || "");
    const [email, setEmail] = useState(storedUser?.email || "");
    const [phone, setPhone] = useState(storedUser?.phone || "");

    console.log("Stored User:", storedUser);

    const updateProfile = async () => {
        try {
            const response = await fetch(`https://daily-life-backend-theta.vercel.app/user/update/${storedUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    phone:phone,
                    username:username,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Server Error:", data);
                alert("Update failed: " + data.message);
                return;
            }

            alert("Profile updated successfully!");

            console.log("Update Response:", data);

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Network Error: Cannot connect to server");
        }
    };

    return (
        <div className="profile-page">

            <div className='head'>
                <h1>Edit Profile</h1>
            </div>

            {!storedUser ? (
                <h1>No user data found</h1>
            ) : (
                <div className="profile-card">

                    <div className="img-box">
                        <img
                            src={storedUser.profile_image}
                            alt="profile"
                        />
                    </div>

                    <div className="form-group">
                        <label>Firstname</label>
                        <input
                            className="input-box"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Lastname</label>
                        <input
                            className="input-box"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="input-box"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="input-box"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            className="input-box"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button className="save-btn" onClick={updateProfile}>
                        Save Changes
                    </button>

                </div>
            )}
        </div>
    );
}

export default Setting;
