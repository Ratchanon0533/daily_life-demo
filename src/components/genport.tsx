import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Genport = () => {
  const printRef = useRef();

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2, // เพิ่มความชัดของรูปภาพ
      useCORS: true,
    });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('my-portfolio.pdf');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* ปุ่มกด Export */}
      <button
        onClick={handleDownloadPdf}
        className="mb-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Download as PDF
      </button>

      {/* ส่วนเนื้อหา Portfolio ที่จะถูก Export */}
      <div
        ref={printRef}
        className="w-[210mm] min-h-[297mm] bg-white p-10 shadow-xl"
        id="portfolio-content"
      >
        {/* Header Section */}
        <header className="border-b-2 border-blue-500 pb-6 mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">ชื่อ-นามสกุล ของคุณ</h1>
            <p className="text-xl text-blue-600">Full Stack Developer</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>Email: example@email.com</p>
            <p>Tel: 08x-xxx-xxxx</p>
          </div>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-3 border-l-4 border-blue-500 pl-2">Skills</h3>
            <ul className="text-gray-700 space-y-1 mb-6">
              <li>React / Next.js</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
              <li>PostgreSQL</li>
            </ul>

            <h3 className="font-bold text-lg mb-3 border-l-4 border-blue-500 pl-2">Languages</h3>
            <p className="text-gray-700">Thai (Native)</p>
            <p className="text-gray-700">English (Communicative)</p>
          </div>

          {/* Main Experience */}
          <div className="col-span-2">
            <section className="mb-8">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Experience</h3>
              <div className="mb-4">
                <h4 className="font-semibold">Senior Developer - Company A</h4>
                <p className="text-sm text-gray-500">2022 - Present</p>
                <p className="text-gray-600 mt-1">รับผิดชอบการออกแบบโครงสร้างโปรเจกต์และดูแลทีม Frontend...</p>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-xl mb-4 text-gray-800">Education</h3>
              <div>
                <h4 className="font-semibold">Bachelor of Computer Science</h4>
                <p className="text-sm text-gray-500">University Name, 2018 - 2022</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genport;