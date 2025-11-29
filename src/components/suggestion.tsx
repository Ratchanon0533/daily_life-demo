import "./css/suggestion.css";

const Suggestion = () => {
    // 15 items total (5 columns × 3 rows)
    const careers = [
        "./logo_un/KU.png",
        "./logo_un/CU.png",
        "./logo_un/MU.svg",
        "./logo_un/TU.svg",
        "./logo_un/BUU.svg",
        "./logo_un/KMITL.svg",
        "./logo_un/SWU.png",
        "./logo_un/BU.svg",
        "./logo_un/AIT.svg",
        "./logo_un/PIM.svg",
        "./logo_un/KMUTNB.svg",
        "./logo_un/KMUTT.svg",
        "./logo_un/RMUTI.png",
        "./logo_un/SDU.svg",

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
