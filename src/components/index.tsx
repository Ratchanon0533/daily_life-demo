// main.tsx
import Nav from './nav-bar';
import './css/main.css';
import Input2 from './UI/Input2';
import '../App.css'



const Main = () => {
    return (
        <>
            <Nav />
            
        <div className="container-fluid main-page-wrapper" >
            
                <div className="card shadow-lg  mb-5 search-card-custom"> 
                    <h3 className="card-title mb-4 fw-bold text-white flex text-center ">ค้นหาข้อมูลเชิงลึก 🔎</h3>
                    
                    <div className="row g-3 align-items-center"> 
                        
                        {/* FIX: ลบ class form-control-custom ออกจาก div นี้ */}
                        <div className="col-12 col-md-5 col-lg-5"> 
                            <Input2 text='ค้นหามหาวิทยาลัย (เช่น จุฬาฯ, มธ.)'></Input2>
                        </div>
                        
                        {/* FIX: ลบ class form-control-custom ออกจาก div นี้ */}
                        <div className="col-12 col-md-5 col-lg-5">
                            <Input2 text='ค้นหาคณะวิชาสาขา (เช่น วิศวะคอม, บัญชี)'></Input2>
                        </div>
                        
                        <div className="col-12 col-md-2 col-lg-2"> 
                            <button className="btn btn-primary w-100 search-button-custom py-2 fw-bold" type="button">
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>
            

            <div className="container">
                <div id="carouselExampleCaptions" 
                    className="carousel slide carousel-fade mb-5 shadow-xl rounded-3 overflow-hidden" 
                    data-bs-ride="carousel"
                    data-bs-interval="5000">
                    
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    <div className="carousel-inner custom-carousel-height"> 
                        
                        <div className="carousel-item active">
                            <img src="img/handshake-close-up-executives.jpg" className="d-block w-100 carousel-img" alt="First Slide: Daily Life" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption text-center">
                                <h5 className='carousel-title display-5 fw-bold animate__animated animate__fadeInDown'>สร้างเครือข่ายมืออาชีพ</h5>
                                <p className='carousel-text lead d-none d-sm-block animate__animated animate__fadeInUp'>โอกาสในการทำงานร่วมกับผู้เชี่ยวชาญจากหลากหลายสาขา</p>
                            </div>
                        </div>
                        
                        <div className="carousel-item">
                            <img src="img/multiracial-group-young-creative-people-smart-casual-wear-discussing-business-brainstorming-meeting-ideas-mobile-application-software-design-project-modern-office-coworker-teamwork-concept.jpg" className="d-block w-100 carousel-img" alt="Second Slide: Teamwork" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption text-center">
                                <h5 className='carousel-title display-5 fw-bold animate__animated animate__fadeInDown'>การเรียนรู้ในยุคดิจิทัล</h5>
                                <p className='carousel-text lead d-none d-sm-block animate__animated animate__fadeInUp'>หลักสูตรที่ทันสมัยรองรับความต้องการของตลาดงานในอนาคต</p>
                            </div>
                        </div>
                        
                        <div className="carousel-item">
                            <img src="img/11177.jpg" className="d-block w-100 carousel-img" alt="Third Slide: Study & Learning" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption text-center">
                                <h5 className='carousel-title display-5 fw-bold animate__animated animate__fadeInDown'>ชีวิตที่สมดุล</h5>
                                <p className='carousel-text lead d-none d-sm-block animate__animated animate__fadeInUp'>ค้นหาความรู้ที่นำไปปรับใช้ได้จริงในชีวิตประจำวัน</p>
                            </div>
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            
            <div className='pb-5'></div>
        </div>
        </>
    )
}

export default Main