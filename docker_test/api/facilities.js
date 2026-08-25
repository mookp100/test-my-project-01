const facilities = [
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
  res.end(JSON.stringify(facilities));
};
