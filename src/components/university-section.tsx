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
            "https://i.ytimg.com/vi/eEspYsI-zz4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC0Vv8m-5-PI-BgDSsRK_dwUzVc4g",
            "https://campus.campus-star.com/app/uploads/2019/05/DSC_0828-1024x678.jpgbugตอนกดย้ิน",
        ],
        [
            "https://campus.campus-star.com/app/uploads/2017/01/MFU-5.jpg",
            "https://campus.campus-star.com/app/uploads/2017/01/KKU-3.jpg",
            "https://campus.campus-star.com/app/uploads/2017/01/KKU-2.jpg",
            "https://campus.campus-star.com/app/uploads/2017/01/NU-4.jpeg",
        ],
        [
            "https://campus.campus-star.com/app/uploads/2017/01/KU-9.jpg",
            "https://campus.campus-star.com/app/uploads/2017/01/SUT-1.jpeg",
            "https://campus.campus-star.com/app/uploads/2017/01/06-1.jpg",
            "https://campus.campus-star.com/app/uploads/2017/01/KMITL-2.jpg",
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
