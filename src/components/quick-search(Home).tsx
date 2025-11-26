import { useState } from "react";
import "./css/quicksearch.css";

const QuickSearchHome = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("right");

    // Replace the text with image URLs
    const slides = [
        [
            "https://",
            "https://",
            "https://via.placeholder.com/150?text=Uni+3",
            "https://via.placeholder.com/150?text=Uni+4",
            "https://via.placeholder.com/150?text=Uni+5",
            "https://via.placeholder.com/150?text=Uni+6",
            "https://via.placeholder.com/150?text=Uni+7",
        ],
        [
            "https://via.placeholder.com/150?text=Uni+5",
            "https://via.placeholder.com/150?text=Uni+6",
            "https://via.placeholder.com/150?text=Uni+7",
            "https://via.placeholder.com/150?text=Uni+8",
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
        <div className="quick-box">
            <div className="quick-content p-5">
                <div className="quick-header">
                    หาที่เรียนด่วน (Quick Search)
                </div>

                <hr className="divider" />

                <div className="quick-slideshow">
                    <div
                        key={current + direction}
                        className={`slide slide-${direction}`}
                    >
                        <div className="seven-box-container">
                            {slides[current].map((imgUrl, index) => (
                                <div className="seven-box-item" key={index}>
                                    <div className="image-box">
                                        <img src={imgUrl} alt={`Quick Search ${index + 1}`} />
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="quick-slide-btn quick-prev" onClick={prevSlide}>❮</button>
                    <button className="quick-slide-btn quick-next" onClick={nextSlide}>❯</button>
                </div>
            </div>
        </div>
    );
};

export default QuickSearchHome;
