const courses = {
  pvc: [
    {
      code: 'IT-PVC-01',
      title: 'การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้นและเว็บแอปพลิเคชัน',
      credits: '3 หน่วยกิต (2-2-3)',
      desc: 'หลักการคิดเชิงคำนวณ (Computational Thinking), ภาษา Python, การสร้างหน้าเว็บ HTML5, CSS3, JavaScript และ Responsive Web Design',
      tag: 'ปวช. ชั้นปีที่ 1-2'
    },
    {
      code: 'IT-PVC-02',
      title: 'ระบบคอมพิวเตอร์และเครือข่ายเบื้องต้น (Network Essentials)',
      credits: '3 หน่วยกิต (2-2-3)',
      desc: 'ฮาร์ดแวร์คอมพิวเตอร์, การติดตั้งและบำรุงรักษา, ระบบเครือข่าย LAN/WAN, โปรโตคอล TCP/IP และการตั้งค่า Router/Switch',
      tag: 'ปวช. ชั้นปีที่ 2'
    },
    {
      code: 'IT-PVC-03',
      title: 'ระบบฐานข้อมูลและเทคโนโลยีมัลติมีเดีย',
      credits: '3 หน่วยกิต (2-2-3)',
      desc: 'การออกแบบฐานข้อมูลเชิงสัมพันธ์ Relational Database (SQL/MySQL), การสร้างสื่อกราฟิก, แอนิเมชัน และตัดต่อวิดีโอดิจิทัล',
      tag: 'ปวช. ชั้นปีที่ 3'
    }
  ],
  pvs: [
    {
      code: 'IT-PVS-01',
      title: 'การพัฒนาฟูลสแตกเว็บแอปพลิเคชันและ API (Full-Stack Dev)',
      credits: '3 หน่วยกิต (2-2-3)',
      desc: 'Frontend Frameworks (React, Vue), RESTful API & GraphQL ด้วย Node.js / Express, PostgreSQL / MongoDB, และระบบ Authentication JWT',
      tag: 'ปวส. ชั้นปีที่ 1'
    },
    {
      code: 'IT-PVS-02',
      title: 'ระบบคลาวด์คอมพิวติ้งและความปลอดภัยไซเบอร์ (Cloud & Security)',
      credits: '3 หน่วยกิต (2-2-3)',
      desc: 'Cloud Infrastructure (AWS/GCP), Containerization ด้วย Docker & Kubernetes, การทดสอบความปลอดภัยเบื้องต้น, และการบริหารจัดการ Linux Server',
      tag: 'ปวส. ชั้นปีที่ 1-2'
    },
    {
      code: 'IT-PVS-03',
      title: 'ปัญญาประดิษฐ์และอินเทอร์เน็ตของสรรพสิ่ง (AI & IoT Innovation)',
      credits: '3 หน่วยกิต (2-2-3)',
      desc: 'Machine Learning Models ด้วย Python, Image Processing / Computer Vision, การเชื่อมต่ออุปกรณ์ IoT เซ็นเซอร์เข้ากับระบบ Cloud และ Dashboard',
      tag: 'ปวส. ชั้นปีที่ 2'
    },
    {
      code: 'IT-PVS-04',
      title: 'โครงงานนวัตกรรมเทคโนโลยีสารสนเทศ (IT Capstone Project)',
      credits: '4 หน่วยกิต (0-8-4)',
      desc: 'การพัฒนาระบบซอฟต์แวร์หรือนวัตกรรมขนาดใหญ่เพื่อแก้ปัญหาจริงในสถานประกอบการ หรือส่งเข้าประกวดสิ่งประดิษฐ์คนรุ่นใหม่ระดับชาติ',
      tag: 'ปวส. ชั้นปีที่ 2'
    }
  ]
};

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(courses));
};
