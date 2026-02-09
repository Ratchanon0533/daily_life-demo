import style from "../css/university.module.css";

const slides = [
    [
        "https://www.chula.ac.th/wp-content/uploads/2020/05/cu-executive-hero.jpg",
        "https://f.tpkcdn.com/images-720/5d73749f9fd86421fe2c192954d912f5.jpg",
        "https://i.ytimg.com/vi/eEspYsI-zz4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC0Vv8m-5-PI-BgDSsRK_dwUzVc4g",
        "https://campus.campus-star.com/app/uploads/2019/05/DSC_0828-1024x678.jpg",
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

const University = () => {
    return (
        <div className={style["university-box"]}>
            <div className={style["university-content"] + " p-5"}>
                <div className={style["university-header"]}>
                    มหาวิทยาลัยยอดนิยม (Top University)
                </div>
                <hr className={style["divider"]} />

                <div className={style["uni-slideshow"]}>
                    <div id="universityCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
                        <div className="carousel-indicators">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    data-bs-target="#universityCarousel"
                                    data-bs-slide-to={idx}
                                    className={idx === 0 ? "active" : ""}
                                    aria-current={idx === 0 ? "true" : undefined}
                                    aria-label={`Slide ${idx + 1}`}
                                ></button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {slides.map((slide, idx) => (
                                <div className={`carousel-item${idx === 0 ? " active" : ""}`} key={idx}>
                                    <div className={style["four-box-container"]}>
                                        {slide.map((imgUrl, index) => (
                                            <div className={style["four-box-item"]} key={index}>
                                                <div className={style["image-box"]}>
                                                    <img src={imgUrl} alt={`University ${index + 1}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#universityCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#universityCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default University;