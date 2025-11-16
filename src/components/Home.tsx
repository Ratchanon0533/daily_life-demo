// main.tsx
import './css/main.css';
import Input2 from './UI/Input2'; // Component สำหรับช่อง input, สมมติว่ารับ prop 'text'

const Home = () => {
    return (
        // Wrapper หลัก: ใช้ container-fluid เพื่อความกว้างเต็มจอ และ padding-top/bottom
        <div className="container-fluid main-page-wrapper">
            
            {/* 1. ส่วน Title และ Header */}
            <header className="text-center py-5 header-section">
                {/* Title หลัก: ใช้ display-3, ตัวหนาพิเศษ, และสี primary */}
                <h1 className="main-title display-3 fw-bolder text-primary" style={{marginTop:'5rem'}}>Daily Life 💡</h1>
                {/* Subtitle: คำอธิบายเพิ่มเติม */}
                <p className="lead text-secondary">ค้นหาสถานที่เรียนและหลักสูตรที่น่าสนใจ เพื่อพัฒนาชีวิตประจำวันของคุณ</p>
            </header>

            {/* 2. ส่วนค้นหา: ใช้ Container เพื่อจำกัดความกว้างบนจอใหญ่ */}
            <div className="container">
                {/* Card ครอบ: เพิ่มเงา (shadow-lg) และมุมโค้งมนที่กำหนดเอง (search-card-custom) */}
                <div className="card shadow-lg p-4 p-md-5 mb-5 search-card-custom"> 
                    <h3 className="card-title mb-4 fw-bold text-dark">ค้นหาข้อมูลเชิงลึก 🔎</h3>
                    
                    {/* Grid Layout สำหรับ Input Fields: ใช้ g-3 (gap) และจัดให้อยู่กึ่งกลางแนวตั้ง */}
                    <div className="row g-3 align-items-center"> 
                        
                        {/* ค้นหามหาวิทยาลัย: ใช้ 5/12 ของพื้นที่ (col-lg-5) */}
                        <div className="col-12 col-md-5 col-lg-5 form-control-custom"> 
                            <Input2 text='ค้นหามหาวิทยาลัย (เช่น จุฬาฯ, มธ.)'></Input2>
                        </div>
                        
                        {/* ค้นหาคณะวิชาสาขา: ใช้ 5/12 ของพื้นที่ (col-lg-5) */}
                        <div className="col-12 col-md-5 col-lg-5 form-control-custom">
                            <Input2 text='ค้นหาคณะวิชาสาขา (เช่น วิศวะคอม, บัญชี)'></Input2>
                        </div>
                        
                        {/* ปุ่มค้นหา: ใช้ 2/12 ของพื้นที่ (col-lg-2) */}
                        <div className="col-12 col-md-2 col-lg-2"> 
                            {/* ปุ่ม: ขยายเต็มความกว้าง (w-100) และใช้ class search-button-custom สำหรับสไตล์เฉพาะ */}
                            <button className="btn btn-primary w-100 search-button-custom py-2 fw-bold" type="button">
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. ส่วน Carousel: ใช้ Container เพื่อจำกัดความกว้าง */}
            <div className="container">
                {/* Carousel หลัก: ใช้ fade effect, interval 5s, เงา (shadow-xl) และมุมโค้งมน */}
                <div id="carouselExampleCaptions" 
                     className="carousel slide carousel-fade mb-5 shadow-xl rounded-3 overflow-hidden" 
                     data-bs-ride="carousel"
                     data-bs-interval="5000">
                    
                    {/* Indicators (จุดนำทาง) */}
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>

                    {/* Inner Content (เนื้อหาแต่ละสไลด์) */}
                    <div className="carousel-inner custom-carousel-height"> 
                        
                        {/* Slide 1 */}
                        <div className="carousel-item active">
                            {/* รูปภาพ: d-block w-100 และ class carousel-img สำหรับ object-fit */}
                            <img src="img/handshake-close-up-executives.jpg" className="d-block w-100 carousel-img" alt="First Slide: Daily Life" />
                            <div className="carousel-overlay"></div> {/* Overlay สีดำจางๆ */}
                            <div className="carousel-caption text-center">
                                {/* Title พร้อม animation effect */}
                                <h5 className='carousel-title display-5 fw-bold animate__animated animate__fadeInDown'>สร้างเครือข่ายมืออาชีพ</h5>
                                {/* Text พร้อม animation effect และซ่อนบนมือถือเล็ก (d-none d-sm-block) */}
                                <p className='carousel-text lead d-none d-sm-block animate__animated animate__fadeInUp'>โอกาสในการทำงานร่วมกับผู้เชี่ยวชาญจากหลากหลายสาขา</p>
                            </div>
                        </div>
                        
                        {/* Slide 2 */}
                        <div className="carousel-item">
                            <img src="img/multiracial-group-young-creative-people-smart-casual-wear-discussing-business-brainstorming-meeting-ideas-mobile-application-software-design-project-modern-office-coworker-teamwork-concept.jpg" className="d-block w-100 carousel-img" alt="Second Slide: Teamwork" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption text-center">
                                <h5 className='carousel-title display-5 fw-bold animate__animated animate__fadeInDown'>การเรียนรู้ในยุคดิจิทัล</h5>
                                <p className='carousel-text lead d-none d-sm-block animate__animated animate__fadeInUp'>หลักสูตรที่ทันสมัยรองรับความต้องการของตลาดงานในอนาคต</p>
                            </div>
                        </div>
                        
                        {/* Slide 3 */}
                        <div className="carousel-item">
                            <img src="img/11177.jpg" className="d-block w-100 carousel-img" alt="Third Slide: Study & Learning" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption text-center">
                                <h5 className='carousel-title display-5 fw-bold animate__animated animate__fadeInDown'>ชีวิตที่สมดุล</h5>
                                <p className='carousel-text lead d-none d-sm-block animate__animated animate__fadeInUp'>ค้นหาความรู้ที่นำไปปรับใช้ได้จริงในชีวิตประจำวัน</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls (ปุ่มเลื่อน ซ้าย/ขวา) */}
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
            
            <div className='pb-5'></div> {/* เพิ่ม Padding ด้านล่างสุด */}
        </div>
    )
}

export default Home