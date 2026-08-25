const users = [
  { id: 1, full_name: 'นายกิตติศักดิ์ รื่นรมย์', email: 'kittisak@gmail.com', phone: '081-111-2222', role: 'Admin', status: 'ออนไลน์' },
  { id: 2, full_name: 'นางสาวณัฐพร พิทักษ์', email: 'natthaporn@gmail.com', phone: '082-333-4444', role: 'ผู้ดูแลระบบ', status: 'ว่าง' },
  { id: 3, full_name: 'นายชาญชัย ปัญญา', email: 'chanchai@gmail.com', phone: '083-555-6666', role: 'นักศึกษา', status: 'ออนไลน์' }
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

  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const user = {
          id: Date.now(),
          full_name: payload.full_name || 'ผู้ใช้งานใหม่',
          email: payload.email || 'unknown@example.com',
          phone: payload.phone || '',
          role: payload.role || 'นักศึกษา',
          status: payload.status || 'ว่าง'
        };
        users.unshift(user);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid JSON' }));
      }
    });
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ message: 'Method not allowed' }));
};
