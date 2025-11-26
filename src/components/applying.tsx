import { useState } from "react";
import "./css/applying.css";

const Applying = () => {
    const [active, setActive] = useState<number | null>(null);

    const boxes = [
        { title: "Step 1", content: "Information about step 1 goes here." },
        { title: "Step 2", content: "Details for step 2 when expanded." },
        { title: "Step 3", content: "More information for step 3." },
        { title: "Step 4", content: "Final step details." }
    ];

    return (
        <div className="apply-box">
            <div className="apply-content p-5">
                <div className="apply-header">
                    เกี่ยวกับการสมัครเข้ามหาลัย (University Applying)
                </div>

                <hr className="divider" />
                <div className="apply-row">
                    {boxes.map((box, index) => {
                        const isActive = active === index;

                        return (
                            <div
                                key={index}
                                className={`apply-item ${isActive ? "active" : ""}`}
                                onMouseEnter={() => setActive(index)}
                                onMouseLeave={() => setActive(null)}
                            >
                                <h3>{box.title}</h3>
                                {isActive && <p>{box.content}</p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Applying;
