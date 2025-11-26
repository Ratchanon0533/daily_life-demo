import { useState } from "react";
import "./css/university.css";

const University = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("right");

    // Replace the text with image URLs
    const slides = [
        [
            "https://www.chula.ac.th/wp-content/uploads/2020/05/cu-executive-hero.jpg",
            "https://f.tpkcdn.com/images-720/5d73749f9fd86421fe2c192954d912f5.jpg",
            "https://via.placeholder.com/150?text=Uni+3",
            "https://via.placeholder.com/150?text=Uni+4",
        ],
        [
            "https://via.placeholder.com/150?text=Uni+5",
            "https://via.placeholder.com/150?text=Uni+6",
            "https://via.placeholder.com/150?text=Uni+7",
            "https://via.placeholder.com/150?text=Uni+8",
        ],
        [
            "https://via.placeholder.com/150?text=Uni+9",
            "https://via.placeholder.com/150?text=Uni+10",
            "https://via.placeholder.com/150?text=Uni+11",
            "https://via.placeholder.com/150?text=Uni+12",
        ],
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
                    มหาวิทยาลัยยอดนิยม (Top University)
                </div>

                <hr className="divider" />

                <div className="uni-slideshow">
                    <div
                        key={current + direction}
                        className={`slide slide-${direction}`}
                    >
                        <div className="four-box-container">
                            {slides[current].map((imgUrl, index) => (
                                <div className="four-box-item" key={index}>
                                    <div className="image-box">
                                        <img src={imgUrl} alt={`University ${index + 1}`} />
                                        
                                    </div>
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
