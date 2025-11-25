

import './css/searchsection.css';
import './css/carousel.css';


const Carousel = () => {
    
    return (
        <>
            

                <div className="container">
                <div id="carouselExampleCaptions" 
                    className="carousel slide carousel-fade mb-5 shadow-xl  overflow-hidden" 
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



            
        </>
    )
}


export default Carousel;