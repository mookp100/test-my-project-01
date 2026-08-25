const teachers = [
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
    tags: ['Python', 'TensorFlow', 'Data Science', 'IoT Arduino/ESP32']
  }
];

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
  res.end(JSON.stringify(teachers));
};
