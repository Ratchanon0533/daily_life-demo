import style from "../css/suggestion.module.css";

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
        <div className={style["suggestion-box"]}>
            <div className={style["suggestion-content"] + " p-5"}>

                <div className={style["suggestion-header"]}>
                    มหาวิทยาลัยแนะนำ (Suggest University)
                </div>

                <hr className={style["divider"]} />
                <div className={style["suggestion-grid"]}>
                    {careers.map((imgUrl, index) => (
                        <div className={style["suggestion-grid-item"]} key={index}>
                            <div className={style["suggestion-image-box"]}>
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
