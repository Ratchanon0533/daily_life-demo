import { useState } from "react";
import "./css/university.css";

const University = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("right");

    const slides = [
        ["Box 1", "Box 2", "Box 3", "Box 4"],
        ["Box 5", "Box 6", "Box 7", "Box 8"],
        ["Box 9", "Box 10", "Box 11", "Box 12"],
    ];

    const nextSlide = () => {
        setDirection("right");
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection("left");
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="university-box">
            <div className="university-content p-5">

                <div className="university-header">
                    มหาวิทยาลัยยอดนิยมในปี 2025 (Top University of 2025)
                </div>

                <hr className="divider" />

                <div className="uni-slideshow">

                    <div
                        key={current + direction}
                        className={`slide slide-${direction}`}
                    >
                        <div className="four-box-container">
                            {slides[current].map((item, index) => (
                                <div className="four-box-item" key={index}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>  


                    <button className="slide-btn prev" onClick={prevSlide}>❮</button>
                    <button className="slide-btn next" onClick={nextSlide}>❯</button>
                </div>
            </div>
        </div>
    );
};

export default University;
