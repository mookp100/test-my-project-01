const events = [
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
  res.end(JSON.stringify(events));
};
