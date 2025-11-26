import { useState } from "react";
import "./css/quicksearch.css";

const QuickSearchHome = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("right");

    // Replace the text with image URLs - เปลี่ยนเป็น path รูปในโปรเจค
    const slides = [
        [
            "./logo_un/KU.png",
            "./logo_un/CU.png",
            "./logo_un/MU.svg",
            "./logo_un/TU.svg",
            "./logo_un/BUU.svg",
            "./logo_un/KMITL.svg",
            "./logo_un/SWU.png",
        ],
        [
            "./logo_un/BU.svg",
            "./logo_un/AIT.svg",
            "./logo_un/PIM.svg",
            "./logo_un/KMUTNB.svg",
            "./logo_un/KMUTT.svg",
            "./logo_un/RMUTI.png",
            "./logo_un/SDU.svg",
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
