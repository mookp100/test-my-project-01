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

    const query = (payload.message || '').toLowerCase();
    let reply = '';
    let suggestions = [];

    if (query.includes('สมัคร') || query.includes('รับสมัคร') || query.includes('เข้าเรียน')) {
      reply = `🎓 **การรับสมัครนักศึกษาใหม่ แผนกวิชาเทคโนโลยีสารสนเทศ**\n\n- เปิดรับสมัครทั้งระดับ **ปวช.** (จบ ม.3) และ **ปวส.** (จบ ม.6 / ปวช.)\n- มีทั้งโควตาผลการเรียนดี, ทวิภาคีร่วมกับบริษัทชั้นนำ, และรอบรับตรงทั่วไป\n- สามารถยื่นเอกสารออนไลน์ได้ที่เว็บ หรือติดต่อห้องวิชาการ อาคาร 1 ได้ทุกวันจันทร์ - ศุกร์ ครับ`;
      suggestions = ['หลักสูตร ปวช. และ ปวส. มีอะไรบ้าง?', 'ค่าเทอมเท่าไหร่?', 'ติดต่ออาจารย์'];
    } else if (query.includes('หลักสูตร') || query.includes('เรียนอะไร') || query.includes('ปวช') || query.includes('ปวส')) {
      reply = `💻 **หลักสูตรที่เปิดสอนในแผนก IT NSTVC**\n\n1. **ระดับ ปวช. (3 ปี)**: เน้นปูพื้นฐานการเขียนโปรแกรม Python/JavaScript, โครงข่ายคอมพิวเตอร์, การสร้างเว็บไซต์ และการซ่อมบำรุง\n2. **ระดับ ปวส. (2 ปี)**: เจาะลึก Full-Stack Web Development, Cloud & DevOps (Docker, Linux), AI & IoT, และความปลอดภัยทางไซเบอร์ (Cybersecurity)\n\nทุกหลักสูตรเน้นการปฏิบัติจริงในห้องแล็บที่ทันสมัย 100% ครับ!`;
      suggestions = ['ห้องแล็บมีอะไรบ้าง?', 'จบแล้วทำงานอะไรได้บ้าง?', 'ค่าเทอม'];
    } else if (query.includes('อาจารย์') || query.includes('ครู')) {
      reply = `👨‍🏫 **คณาจารย์ประจำแผนกวิชาเทคโนโลยีสารสนเทศ**\n\n- **ดร.สมใจ ใจดี** (หัวหน้าแผนก - Web & Cloud Systems)\n- **อ.วิชัย กล้าหาญ** (รองหัวหน้าแผนก - Network & Cybersecurity)\n- **อ.พรพรรณ ทองดี** (UI/UX & Mobile App Development)\n- **อ.ธนกฤต ศรีมงคล** (AI, Data Science & IoT)\n\nสามารถดูข้อมูลการติดต่อได้ที่หัวข้อ "คณาจารย์ประจำสาขา" ครับ`;
      suggestions = ['ห้องแล็บอยู่ที่ไหน?', 'งานแข่งขันทักษะมีอะไรบ้าง?'];
    } else if (query.includes('ค่าเทอม') || query.includes('ค่าใช้จ่าย') || query.includes('ทุน')) {
      reply = `💰 **ค่าธรรมเนียมการศึกษาและทุนการศึกษา**\n\n- ระดับ **ปวช.**: เรียนฟรีตามนโยบายเรียนฟรี 15 ปีอย่างมีคุณภาพ\n- ระดับ **ปวส.**: ค่าธรรมเนียมตามประกาศวิทยาลัยฯ (ประมาณ 3,000 - 4,500 บาท/ภาคเรียน)\n- **ทุนการศึกษา**: มีกองทุน กยศ., กรอ., และทุนสนับสนุนจากสถานประกอบการสำหรับนักศึกษาทวิภาคี`;
      suggestions = ['สมัครเรียนอย่างไร?', 'มีโครงการทวิภาคีไหม?'];
    } else if (query.includes('ห้องแล็บ') || query.includes('ห้องปฏิบัติการ') || query.includes('แล็บ')) {
      reply = `🔬 **ห้องปฏิบัติการที่ทันสมัย (Smart Facilities)**\n\n1. **Smart Software & AI Studio (ห้อง 301)**: คอมฯ สเปกแรง RTX 4060 จอคู่ 27"\n2. **Cisco Networking Lab (ห้อง 204)**: อุปกรณ์ Switch/Router และ Firewall ของแท้ตามมาตรฐาน Cisco\n3. **Creative UI/UX Space (ห้อง 302)**: เครื่อง Mac Studio สำหรับงานกราฟิกและแอปพลิเคชัน\n4. **IoT & Maker Space (ห้อง 105)**: 3D Printer และชุดทดลองไมโครคอนโทรลเลอร์`;
      suggestions = ['จำลองคำนวณเกรด', 'ดูผลงานและรางวัล'];
    } else {
      reply = `สวัสดีครับ! ผมคือน้อง **IT-Bot** ผู้ช่วยอัจฉริยะประจำแผนกวิชาเทคโนโลยีสารสนเทศ ยินดีให้บริการครับ\n\nคุณสามารถสอบถามเกี่ยวกับ:\n• หลักสูตรการเรียนการสอน (ปวช./ปวส.)\n• การรับสมัครและค่าเทอม\n• คณาจารย์และห้องปฏิบัติการ\n• กิจกรรมและผลงานของแผนก\n\nหรือคลิกที่ตัวเลือกด้านล่างได้เลยครับ! 😊`;
      suggestions = ['สมัครเรียนอย่างไร?', 'หลักสูตรมีอะไรบ้าง?', 'ห้องแล็บมีอะไรบ้าง?', 'อาจารย์ประจำสาขา'];
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ reply, suggestions }));
  });
};
