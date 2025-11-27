import "./css/suggestion.css";

const Suggestion = () => {
    // 15 items total (5 columns × 3 rows)
    const careers = [
        "./suggestion/dev.jpg",
        "./suggestion/doctor.jpg",
        "./suggestion/marketing.jpg",
        "./suggestion/business.jpg",
        "./suggestion/finance.jpg",
        "./suggestion/teacher.jpg",
        "./suggestion/engineer.jpg",
        "./suggestion/doctor.jpg",
        "./suggestion/lawyer.jpg",
        "./suggestion/accountant.jpg",
        "./suggestion/marketing.jpg",
        "./suggestion/business.jpg",
        "./suggestion/dev.jpg",
        "./suggestion/teacher.jpg",
      
    ];

    return (
        <div className="suggestion-box">
            <div className="suggestion-content p-5">
                
                <div className="suggestion-header">
                    มหาวิทยาลัยแนะนำ (Suggest University)
                </div>

                <hr className="divider" />

                <div className="suggestion-grid">
                    {careers.map((imgUrl, index) => (
                        <div className="suggestion-grid-item" key={index}>
                            <div className="suggestion-image-box">
                                <img src={imgUrl} alt={`suggestion ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Suggestion;
