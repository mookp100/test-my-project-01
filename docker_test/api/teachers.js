const teachers = [
  {
    full_name: 'นางสาวสมใจ ใจดี',
    position: 'ครูแผนกเทคโนโลยีสารสนเทศ',
    expertise: 'Web Development, Database, JavaScript',
    email: 'somjai@school.ac.th',
    phone: '081-234-5678',
    photo_url: ''
  },
  {
    full_name: 'นายวิชัย กล้าหาญ',
    position: 'ครูแผนกเทคโนโลยีสารสนเทศ',
    expertise: 'Network, Linux, Cybersecurity',
    email: 'wichai@school.ac.th',
    phone: '082-345-6789',
    photo_url: ''
  },
  {
    full_name: 'นางสาวพรพรรณ ทองดี',
    position: 'ครูแผนกเทคโนโลยีสารสนเทศ',
    expertise: 'UI/UX, Frontend, Design Thinking',
    email: 'pornpun@school.ac.th',
    phone: '083-456-7890',
    photo_url: ''
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
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(teachers));
};
