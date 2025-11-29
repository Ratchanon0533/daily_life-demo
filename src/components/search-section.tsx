import { useNavigate } from "react-router-dom";
import './css/searchsection.css';
import '../App.css';
import { useState } from 'react';


const SearchSection = () => {
    const navigatory = useNavigate();
    const [inputuniversity, setInputUniversity] = useState('');
    // const [inputlocation, setInputLocation] = useState('');
    // const [inputValue, setInputValue] = useState('');
    const handleClear = () => {
        setInputUniversity('');
    };

    const handlesearch = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/search-university', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ university: inputuniversity }),
            });

            const data = await response.json();

            // const contentType = response.headers.get("content-type") || "";
            // console.log("Content-Type:", contentType);
            if (data != null) {
                console.log('Success:', data);
                navigatory("/search", { state: data});
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="card-container" >
                <div className='card-box p-5 '>

                    <div className="card-title mb-4">
                        <span style={{ fontSize: "1.5rem" }}>ค้นหามหาวิทยาลัย</span>
                        <span style={{ fontSize: "1.25rem" }}> จากทั่วประเทศ</span>
                    </div>

                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <svg
                                className="search-icon"
                                aria-hidden="true"
                                viewBox="0 0 24 24"

                            >
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                                </g>
                            </svg>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="ชื่อมหาวิทยาลัย"
                                value={inputuniversity}
                                onChange={(e) => setInputUniversity(e.target.value)}
                            />
                            <svg className="search-icon-right" width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}
                                onClick={handleClear} >
                                <rect width="2.78362" height="13.4269" rx="1.39181" transform="matrix(0.7402 -0.672387 0.7402 0.672387 0 1.87158)" fill="#B8B8B8" />
                                <rect width="2.78362" height="13.4269" rx="1.39181" transform="matrix(-0.7402 -0.672387 -0.7402 0.672387 12 1.87207)" fill="#B8B8B8" />
                            </svg>

                        </div>
                        <div className="search-input-wrapper">
                            <svg
                                className="search-icon"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                            >
                                <path d="M11.7651 0.0443034C10.5753 0.247948 9.58927 0.76242 8.7211 1.65203C7.68144 2.71312 7.15625 3.98858 7.15625 5.46769C7.15625 7.08613 7.74575 8.43662 9.18198 10.1408C9.72861 10.7839 11.5614 12.8311 12.2259 13.5385L12.6547 13.9886L13.4585 13.0454C14.7876 11.4806 16.2238 9.75495 16.5882 9.26191C17.3278 8.27584 17.8851 7.17187 18.0459 6.32514C18.0888 6.11078 18.1316 5.69277 18.1316 5.39266C18.1316 3.91356 17.5529 2.57379 16.4703 1.52341C15.645 0.719547 14.7018 0.226512 13.63 0.0443034ZM13.212 2.9382C14.2088 3.15257 15.0448 3.97787 15.2806 4.97465C15.495 5.89641 15.227 6.79674 14.5411 7.49342C13.7158 8.31872 12.526 8.52236 11.4864 8.01861C9.79291 7.20403 9.41778 5.00681 10.7361 3.67776C11.4114 3.00251 12.2902 2.73456 13.212 2.9382Z" fill="black" />
                                <path d="M17.7034 9.0153C17.5748 9.21894 17.4676 9.39043 17.4676 9.41187C17.4676 9.4333 18.9253 10.1836 20.6938 11.0839C22.473 11.9842 23.9199 12.7452 23.9092 12.7559C23.9092 12.7881 21.5619 14.6209 19.5576 16.1643L19.2682 16.3894L17.1032 14.4708L14.9381 12.5523L14.7988 12.6916C14.713 12.7666 14.6487 12.8631 14.6487 12.8845C14.6487 12.9167 15.5812 13.7742 16.728 14.7924C18.0464 15.9607 18.7752 16.6466 18.743 16.6681C18.593 16.7538 12.4301 19.1868 12.4193 19.1654C12.4086 19.1547 10.7044 17.0218 8.62511 14.4387C6.54579 11.8449 4.85233 9.71198 4.86304 9.70126C4.87376 9.69054 5.53829 9.6691 6.32071 9.64767L7.75694 9.61551L7.47827 9.16535L7.1996 8.70447H6.00989C5.35608 8.70447 4.61653 8.72591 4.35929 8.73662L3.89841 8.76878L1.99058 10.0764C0.0077206 11.4269 -0.0565883 11.4912 0.0184388 11.7806C0.0720295 11.9949 8.58224 24.4602 8.72158 24.5352C8.9145 24.6424 9.12887 24.5673 9.34323 24.3101C9.45041 24.1922 10.2864 23.1633 11.2082 22.0486L12.8802 20.0014L16.235 18.6616L19.5898 17.3219L22.1836 15.3069C23.6091 14.2029 24.8845 13.2168 25.0132 13.1096C25.2811 12.8845 25.3561 12.7023 25.2597 12.488C25.1954 12.3272 25.0132 12.2307 20.533 9.95849L17.9285 8.65088L17.7034 9.0153ZM7.94987 14.3851C10.0078 16.9467 11.7763 19.1439 11.8834 19.2726L12.0764 19.5191L10.5329 21.4055C9.68621 22.4451 8.97881 23.3026 8.95738 23.3133C8.93594 23.324 1.59401 12.5844 1.19744 11.9521L1.11169 11.8235L2.63367 10.7838C3.46968 10.2157 4.17708 9.74413 4.1878 9.74413C4.20924 9.73341 5.9027 11.8235 7.94987 14.3851Z" fill="black" />
                            </svg>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="สถานที่ตั้ง"
                            />
                            <svg className="search-icon-right" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(0.68282 -0.730587 0.68282 0.730587 0 2.6377)" fill="#B8B8B8" />
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(-0.68282 -0.730587 -0.68282 0.730587 15.5488 2.58252)" fill="#B8B8B8" />
                            </svg>

                        </div>
                        <div className="search-input-wrapper">
                            <img
                                src="/img/graduation-hat-3 1.png"
                                alt="Logo"
                                className="search-icon"
                            />


                            <input
                                className="search-input"
                                type="text"
                                placeholder="คณะสาขาวิชา"
                            />
                            <svg className="search-icon-right" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(0.68282 -0.730587 0.68282 0.730587 0 2.6377)" fill="#B8B8B8" />
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(-0.68282 -0.730587 -0.68282 0.730587 15.5488 2.58252)" fill="#B8B8B8" />
                            </svg>
                        </div>

                        <button className="search-button" onClick={handlesearch}>
                            ค้นหา
                        </button>
                    </div>
                    <div className="search-box ">
                        <button className='dropdown-search'>
                            ค่าเทอม
                            <svg className="search-icon-right ms-2" width="20" height="20" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(0.68282 -0.730587 0.68282 0.730587 0 2.6377)" fill="#B8B8B8" />
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(-0.68282 -0.730587 -0.68282 0.730587 15.5488 2.58252)" fill="#B8B8B8" />
                            </svg>
                        </button>
                        <button className='dropdown-search'>
                            ประเภทมหาล้ย
                            <svg className="search-icon-right ms-2" width="20" height="20" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(0.68282 -0.730587 0.68282 0.730587 0 2.6377)" fill="#B8B8B8" />
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(-0.68282 -0.730587 -0.68282 0.730587 15.5488 2.58252)" fill="#B8B8B8" />
                            </svg>
                        </button>
                        <button className='dropdown-search'>
                            ระดับการศึกษา
                            <svg className="search-icon-right ms-2" width="20" height="20" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(0.68282 -0.730587 0.68282 0.730587 0 2.6377)" fill="#B8B8B8" />
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(-0.68282 -0.730587 -0.68282 0.730587 15.5488 2.58252)" fill="#B8B8B8" />
                            </svg>
                        </button>
                        <button className='dropdown-search'>
                            การเดินทาง
                            <svg className="search-icon-right ms-2" width="20" height="20" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(0.68282 -0.730587 0.68282 0.730587 0 2.6377)" fill="#B8B8B8" />
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(-0.68282 -0.730587 -0.68282 0.730587 15.5488 2.58252)" fill="#B8B8B8" />
                            </svg>
                        </button>
                        <button className='dropdown-search'>
                            อื่นๆ
                            <svg className="search-icon-right ms-2" width="20" height="20" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(0.68282 -0.730587 0.68282 0.730587 0 2.6377)" fill="#B8B8B8" />
                                <rect width="3.53518" height="11.3126" rx="1.76759" transform="matrix(-0.68282 -0.730587 -0.68282 0.730587 15.5488 2.58252)" fill="#B8B8B8" />
                            </svg>
                        </button>
                        <button className='reset-button'>
                            รีเซ็ตการตั้งค่า
                        </button>


                    </div>
                </div>



               
            </div>
        </>
    )
}


export default SearchSection;