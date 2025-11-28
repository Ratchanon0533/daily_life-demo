import styles from './css/about-carousel.module.css';


const AboutCarousel = () => {
    

    return (
        <>


            <div className={styles["container"]}>
                <div id="carouselExampleCaptions"
                    className="carousel slide   shadow-xl  overflow-hidden"
                    data-bs-ride="carousel"
                    data-bs-interval="5000">

                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        {/* <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button> */}
                    </div>

                    <div className={`${styles["carousel-inner"]} ${styles["custom-carousel-height"]}`}>

                        <div className="carousel-item active">
                            <img src="\img\handshake-close-up-executives.jpg" className="d-block w-100 carousel-img" alt="First Slide: Daily Life" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption text-center">
                                <h5 className='carousel-title display-5 fw-bold animate__animated animate__fadeInDown'>The Success Path Designed Exclusively for You
                                </h5>
                                <p className='carousel-text lead d-none d-sm-block animate__animated animate__fadeInUp'>เส้นทางความสำเร็จ ออกแบบเพื่อคุณ</p>
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


export default AboutCarousel;