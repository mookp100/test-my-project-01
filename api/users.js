let users = [
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

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathParts = url.pathname.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];
  const id = Number(lastPart);

  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(users));
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let payload = {};
    try {
      if (body) payload = JSON.parse(body);
    } catch (e) {}

    if (req.method === 'POST') {
      const newUser = {
        id: Date.now(),
        student_id: payload.student_id || `67${Math.floor(10000000 + Math.random() * 90000000)}`,
        full_name: (payload.full_name || 'นักศึกษาใหม่').trim(),
        level: payload.level || 'ปวส.1',
        track: payload.track || 'เทคโนโลยีสารสนเทศ',
        email: (payload.email || 'student@nstvc.ac.th').trim(),
        phone: payload.phone || '-',
        role: payload.role || 'นักศึกษา',
        gpa: payload.gpa ? Number(payload.gpa).toFixed(2) : '3.50',
        status: payload.status || 'ออนไลน์',
        skills: payload.skills || ['General IT', 'Web Dev']
      };
      users.unshift(newUser);
      res.statusCode = 201;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(newUser));
      return;
    }

    if (req.method === 'PUT' && Number.isInteger(id)) {
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
      }
      users[idx] = { ...users[idx], ...payload };
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(users[idx]));
      return;
    }

    if (req.method === 'DELETE' && Number.isInteger(id)) {
      users = users.filter(u => u.id !== id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ success: true }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  });
};
