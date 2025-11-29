import { useState } from "react";
import "./css/applying.css";

const Aboutmain = () => {
    const [active, setActive] = useState<number | null>(null);

    const boxes = [
        { title: "Free", content: "Details about the free pricing tier." },
        { title: "Tier 1", content: "Details for tier 1." },
        { title: "Tier 2", content: "More information for tier 2." },
        { title: "Tier 3", content: "Final tier details." }
    ];

    return (
        <div className="apply-box">
            <div className="apply-content p-5">
                <div className="apply-header">
                 ราคา (Pricing)
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

export default Aboutmain;
