import { useState } from "react";
import "../css/career.css";

const PopularCareer = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("right");

    // Replace the text with image URLs - เปลี่ยนเป็น path รูปในโปรเจค
    const slides = [
        [
            "./career/dev.jpg",
            "./career/doctor.jpg",
            "./career/marketing.jpg",
            "./career/business.jpg",
            "./career/finance.jpg",
        ],
        [
            "./career/teacher.jpg",
            "./career/engineer.jpg",
            "./career/doctor.jpg",
            "./career/lawyer.jpg",
            "./career/accountant.jpg",
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
        <div className="career-box">
            <div className="career-content p-5">
                <div className="career-header">
                    อาชีพยอดนิยม (Popular Career)
                </div>

                <hr className="divider" />

                <div className="career-slideshow">
                    <div
                        key={current + direction}
                        className={`slide slide-${direction}`}
                    >
                        <div className="five-box-container">
                            {slides[current].map((imgUrl, index) => (
                                <div className="five-box-item" key={index}>
                                    <div className="image-box">
                                        <img src={imgUrl} alt={`Career ${index + 1}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="career-slide-btn career-prev" onClick={prevSlide}>❮</button>
                    <button className="career-slide-btn career-next" onClick={nextSlide}>❯</button>
                </div>
            </div>
        </div>
    );
};

export default PopularCareer;
