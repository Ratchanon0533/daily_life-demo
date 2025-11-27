import "./css/partner.css";

const Partner = () => {
    // 15 items total (5 columns × 3 rows)
    const careers = [
        "./partner/dev.jpg",
        "./partner/doctor.jpg",
        "./partner/marketing.jpg",
        "./partner/business.jpg",
        "./partner/finance.jpg",
        "./partner1/teacher.jpg",
        "./partner/engineer.jpg",
  
      
    ];

    return (
        <div className="partner-box">
            <div className="partner-content p-5">
                
                <div className="partner-header">
                    พันธมิตรของเรา (Our Partner)
                </div>

                <hr className="divider" />

                <div className="partner-grid">
                    {careers.map((imgUrl, index) => (
                        <div className="partner-grid-item" key={index}>
                            <div className="partner-image-box">
                                <img src={imgUrl} alt={`partner ${index + 1}`} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Partner;
