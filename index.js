const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initial Data Store
let teachersData = [
  {
    id: 1,
    full_name: 'ดร.สมใจ ใจดี',
    position: 'หัวหน้าแผนกวิชาเทคโนโลยีสารสนเทศ',
    expertise: 'Web Application Development, Cloud Architecture, Database Systems',
    education: 'ปร.ด. เทคโนโลยีสารสนเทศ (IT), วท.ม. วิทยาการคอมพิวเตอร์',
    email: 'somjai.j@nstvc.ac.th',
    phone: '081-234-5678',
    room: 'ห้องพักครู IT 302 อาคารปฏิบัติการ 4 ชั้น 3',
    status: 'พร้อมให้คำปรึกษา',
    badge: 'หัวหน้าแผนก',
    avatar_color: 'from-cyan-500 to-blue-600',
    tags: ['Full-Stack', 'Node.js', 'PostgreSQL', 'Docker']
  },
  {
    id: 2,
    full_name: 'อ.วิชัย กล้าหาญ',
    position: 'รองหัวหน้าแผนกฯ ฝ่ายวิชาการและโครงข่าย',
    expertise: 'Computer Network, Linux Administration, Cybersecurity & IoT',
    education: 'วศ.ม. วิศวกรรมคอมพิวเตอร์และโทรคมนาคม',
    email: 'wichai.k@nstvc.ac.th',
    phone: '082-345-6789',
    room: 'ห้องปฏิบัติการ Network Cisco Lab (IT 204)',
    status: 'ติดการสอนในห้อง Lab',
    badge: 'ผู้เชี่ยวชาญโครงข่าย',
    avatar_color: 'from-indigo-500 to-purple-600',
    tags: ['Cisco CCNA', 'Cybersecurity', 'Linux Server', 'MikroTik']
  },
  {
    id: 3,
    full_name: 'อ.พรพรรณ ทองดี',
    position: 'ครูประจำแผนกฯ ฝ่ายสื่อดิจิทัลและ UI/UX',
    expertise: 'UI/UX Design, Frontend Engineering, Mobile App Development, Design Thinking',
    education: 'วท.ม. เทคโนโลยีมัลติมีเดียและแอนิเมชัน',
    email: 'pornpun.t@nstvc.ac.th',
    phone: '083-456-7890',
    room: 'ห้องปฏิบัติการ Creative & UI Studio (IT 301)',
    status: 'พร้อมให้คำปรึกษา',
    badge: 'ผู้เชี่ยวชาญ UI/UX',
    avatar_color: 'from-pink-500 to-rose-600',
    tags: ['Figma', 'React/Vue', 'Flutter', 'Modern CSS']
  },
  {
    id: 4,
    full_name: 'อ.ธนกฤต ศรีมงคล',
    position: 'ครูประจำแผนกฯ ฝ่ายปัญญาประดิษฐ์และนวัตกรรม',
    expertise: 'Artificial Intelligence, Machine Learning, Data Analytics, Python Automation',
    education: 'วท.ม. ปัญญาประดิษฐ์และวิทยาการข้อมูล',
    email: 'thanakrit.s@nstvc.ac.th',
    phone: '084-567-8901',
    room: 'ห้อง AI & Robotics Innovation Space (IT 201)',
    status: 'พร้อมให้คำปรึกษา',
    badge: 'ผู้เชี่ยวชาญ AI & IoT',
    avatar_color: 'from-emerald-500 to-teal-600',
    tags: ['Python', 'TensorFlow', 'Data Science', 'IoT Arduino/ESP32']
  }
];

let studentsData = [
  {
    id: 1,
    student_id: '6620901001',
    full_name: 'นายกิตติศักดิ์ รื่นรมย์',
    level: 'ปวส.2',
    track: 'การพัฒนาซอฟต์แวร์ (Software Dev)',
    email: 'kittisak.r@student.nstvc.ac.th',
    phone: '081-111-2222',
    role: 'หัวหน้าห้อง / Developer',
    gpa: '3.88',
    status: 'ออนไลน์',
    skills: ['JavaScript', 'Node.js', 'React', 'Git']
  },
  {
    id: 2,
    student_id: '6620901002',
    full_name: 'นางสาวณัฐพร พิทักษ์',
    level: 'ปวส.2',
    track: 'ความปลอดภัยไซเบอร์และเครือข่าย',
    email: 'natthaporn.p@student.nstvc.ac.th',
    phone: '082-333-4444',
    role: 'ประธานชมรม IT Club',
    gpa: '3.95',
    status: 'ว่าง',
    skills: ['Cisco Routing', 'Wireshark', 'Linux', 'Network Security']
  },
  {
    id: 3,
    student_id: '6720901015',
    full_name: 'นายชาญชัย ปัญญา',
    level: 'ปวส.1',
    track: 'ปัญญาประดิษฐ์และวิทยาการข้อมูล',
    email: 'chanchai.p@student.nstvc.ac.th',
    phone: '083-555-6666',
    role: 'นักศึกษา',
    gpa: '3.65',
    status: 'ติดเรียน Lab',
    skills: ['Python', 'SQL', 'Pandas', 'Power BI']
  },
  {
    id: 4,
    student_id: '6720901020',
    full_name: 'นางสาวสุดารัตน์ บุญมี',
    level: 'ปวส.1',
    track: 'ดิจิทัลมีเดียและแอปพลิเคชัน',
    email: 'sudarat.b@student.nstvc.ac.th',
    phone: '084-777-8888',
    role: 'UI/UX Designer ประจำทีม',
    gpa: '3.92',
    status: 'ออนไลน์',
    skills: ['Figma', 'HTML/CSS', 'Tailwind', 'Photoshop']
  },
  {
    id: 5,
    student_id: '6520901008',
    full_name: 'นายภาณุวัฒน์ สุขสวัสดิ์',
    level: 'ปวช.3',
    track: 'เทคโนโลยีสารสนเทศทั่วไป',
    email: 'panuwat.s@student.nstvc.ac.th',
    phone: '085-999-0000',
    role: 'ตัวแทนแข่งขันทักษะคอมพิวเตอร์',
    gpa: '3.74',
    status: 'ว่าง',
    skills: ['C#', 'Database Design', 'Hardware Repair', 'PC Build']
  },
  {
    id: 6,
    student_id: '6520901012',
    full_name: 'นางสาวพิมพ์ชนก รัตนโกสินทร์',
    level: 'ปวช.3',
    track: 'เทคโนโลยีสารสนเทศทั่วไป',
    email: 'pimchanok.r@student.nstvc.ac.th',
    phone: '086-222-3333',
    role: 'เหรัญญิกแผนกวิชา',
    gpa: '3.82',
    status: 'ออนไลน์',
    skills: ['Office Automation', 'Web Basic', 'Accounting IT', 'Presentation']
  }
];

let facilitiesData = [
  {
    id: 'lab-301',
    name: 'Smart Software & AI Innovation Studio',
    room: 'ห้อง 301 ชั้น 3 อาคาร 4',
    icon: 'fa-laptop-code',
    tag: 'Coding & AI',
    seats: '40 ที่นั่ง',
    specs: 'Intel Core i7 Gen 13, RAM 32GB, RTX 4060, Dual Monitor 27" 165Hz',
    software: 'VS Code, PyCharm, Docker, Node.js, Unity, Android Studio',
    status: 'เปิดใช้งานพร้อมระบบ AI Workstation'
  },
  {
    id: 'lab-204',
    name: 'Cisco Networking & Cyber Defense Lab',
    room: 'ห้อง 204 ชั้น 2 อาคาร 4',
    icon: 'fa-network-wired',
    tag: 'Network & Security',
    seats: '35 ที่นั่ง',
    specs: 'Rack Server Cisco Catalyst 3850, MikroTik CCR, Firewall FortiGate 60F',
    software: 'Cisco Packet Tracer, GNS3, Wireshark, Kali Linux, VMware ESXi',
    status: 'ห้องปฏิบัติการมาตรฐาน Cisco Academy'
  },
  {
    id: 'lab-302',
    name: 'Creative Media & UI/UX Experience Space',
    room: 'ห้อง 302 ชั้น 3 อาคาร 4',
    icon: 'fa-palette',
    tag: 'UI/UX & Multimedia',
    seats: '30 ที่นั่ง',
    specs: 'Apple Mac Studio M2 Max, 32GB Unified Memory, Display 4K Retina',
    software: 'Adobe Creative Cloud Complete, Figma Pro, Blender, DaVinci Resolve',
    status: 'พร้อมใช้งานสำหรับงานออกแบบและสื่อดิจิทัล'
  },
  {
    id: 'lab-105',
    name: 'IoT & Smart Hardware Maker Space',
    room: 'ห้อง 105 ชั้น 1 อาคาร 4',
    icon: 'fa-microchip',
    tag: 'IoT & Embedded Systems',
    seats: '25 ที่นั่ง',
    specs: '3D Printer Bambu Lab X1C, Oscilloscope, Logic Analyzer, Solder Stations',
    software: 'Arduino IDE, PlatformIO, Fusion 360, KiCad, MQTT Broker Server',
    status: 'พื้นที่ประดิษฐ์และทดลองนวัตกรรมอัจฉริยะ'
  }
];

let coursesData = {
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

let eventsData = [
  {
    id: 1,
    title: 'การแข่งขันทักษะการพัฒนาเว็บแอปพลิเคชันและทักษะเครือข่าย ระดับภาคใต้',
    date: '15 - 18 พฤศจิกายน 2026',
    location: 'ศูนย์แข่งขันทักษะวิชาชีพ ภาคใต้',
    type: 'การแข่งขัน',
    status: 'กำลังเตรียมการฝึกซ้อม',
    badge: 'Skill Competition'
  },
  {
    id: 2,
    title: 'IT Hackathon 2026: สร้างสรรค์ Smart City นครศรีธรรมราชด้วย AI & IoT',
    date: '28 - 30 ธันวาคม 2026',
    location: 'ห้องประชุมใหญ่ วิทยาลัยอาชีวศึกษานครศรีธรรมราช',
    type: 'Hackathon',
    status: 'เปิดรับสมัครทีม',
    badge: 'Hackathon'
  },
  {
    id: 3,
    title: 'อบรมเชิงปฏิบัติการ Cloud Native & Docker Microservices โดยวิทยากรพิเศษจากอุตสาหกรรม',
    date: '10 มกราคม 2027',
    location: 'ห้อง Smart Software Lab (IT 301)',
    type: 'สัมมนา & เวิร์กช็อป',
    status: 'รับสมัคร 40 ที่นั่ง',
    badge: 'Workshop'
  }
];

let awardsData = [
  {
    title: 'รางวัลชนะเลิศ เหรียญทอง อันดับ 1 ระดับชาติ',
    event: 'การแข่งขันทักษะการพัฒนาซอฟต์แวร์และแอปพลิเคชัน งานประชุมวิชาการองค์การวิชาชีพในอนาคตแห่งประเทศไทย (อวท.) ระดับชาติ',
    year: 'ปีการศึกษา 2568',
    team: 'ทีมนักศึกษา ปวส.2 เทคโนโลยีสารสนเทศ IT NSTVC'
  },
  {
    title: 'รางวัลชนะเลิศ เหรียญทอง นวัตกรรมสิ่งประดิษฐ์คนรุ่นใหม่',
    event: 'ระบบ AI ตรวจวัดและแจ้งเตือนภัยน้ำท่วมชุมชนอัจฉริยะผ่าน IoT & Line Bot',
    year: 'ปีการศึกษา 2568',
    team: 'ชมรมวิชาชีพเทคโนโลยีสารสนเทศ'
  },
  {
    title: 'รางวัลเกียรติยศ แผนกวิชาดีเด่นด้านการจัดการเรียนรู้อาชีวศึกษาระบบทวิภาคี',
    event: 'สำนักงานคณะกรรมการการอาชีวศึกษา (สอศ.) ร่วมกับสมาคมอุตสาหกรรมเทคโนโลยีสารสนเทศไทย',
    year: 'ปีการศึกษา 2568',
    team: 'แผนกวิชาเทคโนโลยีสารสนเทศ วอศ.นครศรีธรรมราช'
  }
];

// --- REST API Endpoints ---

// 1. Teachers API
app.get('/api/teachers', (req, res) => {
  res.json(teachersData);
});

// 2. Students & Users API
app.get('/api/students', (req, res) => {
  res.json(studentsData);
});

app.get('/api/users', (req, res) => {
  res.json(studentsData);
});

app.post('/api/users', (req, res) => {
  const { full_name, student_id, level, track, email, phone, role, gpa, status, skills } = req.body;
  if (!full_name || !email) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อ-นามสกุล และอีเมลให้ครบถ้วน' });
  }

  const newStudent = {
    id: Date.now(),
    student_id: student_id || `67${Math.floor(10000000 + Math.random() * 90000000)}`,
    full_name: full_name.trim(),
    level: level || 'ปวส.1',
    track: track || 'เทคโนโลยีสารสนเทศ',
    email: email.trim(),
    phone: phone ? phone.trim() : '-',
    role: role || 'นักศึกษา',
    gpa: gpa ? Number(gpa).toFixed(2) : '3.50',
    status: status || 'ออนไลน์',
    skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : ['General IT', 'Web Dev'])
  };

  studentsData.unshift(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = studentsData.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'ไม่พบข้อมูลนักศึกษา/ผู้ใช้งาน' });
  }

  const current = studentsData[index];
  const { full_name, student_id, level, track, email, phone, role, gpa, status, skills } = req.body;

  studentsData[index] = {
    ...current,
    full_name: full_name !== undefined ? full_name.trim() : current.full_name,
    student_id: student_id !== undefined ? student_id.trim() : current.student_id,
    level: level !== undefined ? level.trim() : current.level,
    track: track !== undefined ? track.trim() : current.track,
    email: email !== undefined ? email.trim() : current.email,
    phone: phone !== undefined ? phone.trim() : current.phone,
    role: role !== undefined ? role.trim() : current.role,
    gpa: gpa !== undefined ? Number(gpa).toFixed(2) : current.gpa,
    status: status !== undefined ? status.trim() : current.status,
    skills: skills !== undefined ? (Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim())) : current.skills
  };

  res.json(studentsData[index]);
});

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const beforeLen = studentsData.length;
  studentsData = studentsData.filter(s => s.id !== id);

  if (studentsData.length === beforeLen) {
    return res.status(404).json({ error: 'ไม่พบข้อมูลนักศึกษา/ผู้ใช้งานที่ต้องการลบ' });
  }

  res.json({ success: true, message: 'ลบข้อมูลสำเร็จ' });
});

// Also alias for /api/students
app.post('/api/students', (req, res) => {
  // Delegate to /api/users logic
  req.url = '/api/users';
  app._router.handle(req, res);
});

// 3. Stats & Overview
app.get('/api/stats', (req, res) => {
  res.json({
    total_students: studentsData.length + 420,
    total_teachers: teachersData.length,
    employment_rate: '100%',
    national_awards: '28+',
    labs_count: facilitiesData.length,
    active_projects: '15+'
  });
});

// 4. Facilities, Courses, Events, Awards
app.get('/api/facilities', (req, res) => {
  res.json(facilitiesData);
});

app.get('/api/courses', (req, res) => {
  res.json(coursesData);
});

app.get('/api/events', (req, res) => {
  res.json(eventsData);
});

app.get('/api/awards', (req, res) => {
  res.json(awardsData);
});

// 5. Contact / Admission Inquiry
app.post('/api/contact', (req, res) => {
  const { name, email, phone, topic, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
  }

  res.json({
    success: true,
    message: 'ได้รับข้อความของคุณเรียบร้อยแล้ว เจ้าหน้าที่ฝ่ายวิชาการจะติดต่อกลับภายใน 24 ชม.',
    data: { name, email, topic, date: new Date().toISOString() }
  });
});

// 6. Intelligent IT Chatbot API
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: 'ขออภัยครับ กรุณาพิมพ์คำถามที่ต้องการทราบ' });
  }

  const query = message.toLowerCase();
  let reply = '';
  let suggestions = [];

  if (query.includes('สมัคร') || query.includes('รับสมัคร') || query.includes('เข้าเรียน') || query.includes('สมัครเรียน')) {
    reply = `🎓 **การรับสมัครนักศึกษาใหม่ แผนกวิชาเทคโนโลยีสารสนเทศ**\n\n- เปิดรับสมัครทั้งระดับ **ปวช.** (จบ ม.3) และ **ปวส.** (จบ ม.6 / ปวช.)\n- มีทั้งโควตาผลการเรียนดี, ทวิภาคีร่วมกับบริษัทชั้นนำ, และรอบรับตรงทั่วไป\n- สามารถยื่นเอกสารออนไลน์ได้ที่เว็บ หรือติดต่อห้องวิชาการ อาคาร 1 ได้ทุกวันจันทร์ - ศุกร์ ครับ`;
    suggestions = ['หลักสูตร ปวช. และ ปวส. มีอะไรบ้าง?', 'ค่าเทอมเท่าไหร่?', 'ติดต่ออาจารย์'];
  } else if (query.includes('หลักสูตร') || query.includes('เรียนอะไร') || query.includes('ปวช') || query.includes('ปวส') || query.includes('วิชา')) {
    reply = `💻 **หลักสูตรที่เปิดสอนในแผนก IT NSTVC**\n\n1. **ระดับ ปวช. (3 ปี)**: เน้นปูพื้นฐานการเขียนโปรแกรม Python/JavaScript, โครงข่ายคอมพิวเตอร์, การสร้างเว็บไซต์ และการซ่อมบำรุง\n2. **ระดับ ปวส. (2 ปี)**: เจาะลึก Full-Stack Web Development, Cloud & DevOps (Docker, Linux), AI & IoT, และความปลอดภัยทางไซเบอร์ (Cybersecurity)\n\nทุกหลักสูตรเน้นการปฏิบัติจริงในห้องแล็บที่ทันสมัย 100% ครับ!`;
    suggestions = ['ห้องแล็บมีอะไรบ้าง?', 'จบแล้วทำงานอะไรได้บ้าง?', 'ค่าเทอม'];
  } else if (query.includes('อาจารย์') || query.includes('ครู') || query.includes('ผู้สอน') || query.includes('ติดต่ออาจารย์')) {
    reply = `👨‍🏫 **คณาจารย์ประจำแผนกวิชาเทคโนโลยีสารสนเทศ**\n\n- **ดร.สมใจ ใจดี** (หัวหน้าแผนก - Web & Cloud Systems)\n- **อ.วิชัย กล้าหาญ** (รองหัวหน้าแผนก - Network & Cybersecurity)\n- **อ.พรพรรณ ทองดี** (UI/UX & Mobile App Development)\n- **อ.ธนกฤต ศรีมงคล** (AI, Data Science & IoT)\n\nสามารถดูข้อมูลการติดต่อและเบอร์โทรศัพท์ได้ที่หัวข้อ "คณาจารย์ประจำสาขา" บนหน้าเว็บครับ`;
    suggestions = ['ห้องแล็บอยู่ที่ไหน?', 'งานแข่งขันทักษะมีอะไรบ้าง?'];
  } else if (query.includes('ค่าเทอม') || query.includes('ค่าใช้จ่าย') || query.includes('ทุน') || query.includes('กู้')) {
    reply = `💰 **ค่าธรรมเนียมการศึกษาและทุนการศึกษา**\n\n- ระดับ **ปวช.**: เรียนฟรีตามนโยบายเรียนฟรี 15 ปีอย่างมีคุณภาพ (มีเฉพาะค่าบำรุงการศึกษาและกิจกรรมตามระเบียบ)\n- ระดับ **ปวส.**: ค่าธรรมเนียมตามประกาศวิทยาลัยฯ (ประมาณ 3,000 - 4,500 บาท/ภาคเรียน)\n- **ทุนการศึกษา**: มีกองทุน กยศ., กรอ., และทุนสนับสนุนจากสถานประกอบการสำหรับนักศึกษาโครงการทวิภาคี`;
    suggestions = ['สมัครเรียนอย่างไร?', 'มีโครงการทวิภาคีไหม?'];
  } else if (query.includes('ห้องแล็บ') || query.includes('ห้องปฏิบัติการ') || query.includes('แล็บ') || query.includes('คอมพิวเตอร์') || query.includes('อุปกรณ์')) {
    reply = `🔬 **ห้องปฏิบัติการที่ทันสมัย (Smart Facilities)**\n\n1. **Smart Software & AI Studio (ห้อง 301)**: คอมฯ สเปกแรง RTX 4060 จอคู่ 27"\n2. **Cisco Networking Lab (ห้อง 204)**: อุปกรณ์ Switch/Router และ Firewall ของแท้ตามมาตรฐาน Cisco\n3. **Creative UI/UX Space (ห้อง 302)**: เครื่อง Mac Studio สำหรับงานกราฟิกและแอปพลิเคชัน\n4. **IoT & Maker Space (ห้อง 105)**: 3D Printer และชุดทดลองไมโครคอนโทรลเลอร์`;
    suggestions = ['จำลองคำนวณเกรด', 'ดูผลงานและรางวัล'];
  } else if (query.includes('งาน') || query.includes('จบแล้ว') || query.includes('อาชีพ') || query.includes('เงินเดือน')) {
    reply = `🚀 **แนวทางการประกอบอาชีพหลังสำเร็จการศึกษา**\n\n- Frontend / Backend / Full-Stack Web Developer\n- Network Administrator & Cloud Engineer\n- Cybersecurity Specialist\n- UI/UX Designer & Mobile App Developer\n- IT Support & System Integrator\n- ศึกษาต่อระดับปริญญาตรี (วศ.บ. คอมพิวเตอร์ / วท.บ. เทคโนโลยีสารสนเทศ) ได้ทุกมหาวิทยาลัย`;
    suggestions = ['หลักสูตรมีอะไรบ้าง?', 'สมัครเรียน'];
  } else if (query.includes('เกรด') || query.includes('gpa') || query.includes('คำนวณ')) {
    reply = `🧮 **ระบบคำนวณเกรดเฉลี่ย GPA & GPAX**\n\nคุณสามารถเลื่อนลงไปยังส่วน **"เครื่องมือคำนวณเกรดเฉลี่ยอัจฉริยะ (GPA Calculator)"** บนหน้าเว็บ เพื่อใส่เกรดและหน่วยกิตเพื่อคำนวณ GPA ทันที พร้อมระบบเฉลิมฉลองหากได้เกรดสวยงามครับ!`;
    suggestions = ['หลักสูตร ปวช./ปวส.', 'รายชื่อนักศึกษา'];
  } else {
    reply = `สวัสดีครับ! ผมคือน้อง **IT-Bot** ผู้ช่วยอัจฉริยะประจำแผนกวิชาเทคโนโลยีสารสนเทศ ยินดีให้บริการครับ\n\nคุณสามารถสอบถามเกี่ยวกับ:\n• หลักสูตรการเรียนการสอน (ปวช./ปวส.)\n• การรับสมัครและค่าเทอม\n• คณาจารย์และห้องปฏิบัติการ\n• กิจกรรมและผลงานของแผนก\n\nหรือคลิกที่ตัวเลือกด้านล่างได้เลยครับ! 😊`;
    suggestions = ['สมัครเรียนอย่างไร?', 'หลักสูตรมีอะไรบ้าง?', 'ห้องแล็บมีอะไรบ้าง?', 'อาจารย์ประจำสาขา'];
  }

  res.json({ reply, suggestions });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` IT Department NSTVC Server is running on port ${PORT}`);
  console.log(` Open URL: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});

module.exports = app;