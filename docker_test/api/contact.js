module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let payload = {};
    try {
      if (body) payload = JSON.parse(body);
    } catch (e) {}

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      success: true,
      message: 'ได้รับข้อความของคุณเรียบร้อยแล้ว เจ้าหน้าที่ฝ่ายวิชาการจะติดต่อกลับภายใน 24 ชม.',
      data: payload
    }));
  });
};
