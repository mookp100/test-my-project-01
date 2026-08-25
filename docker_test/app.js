const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
const DB_NAME = process.env.DB_NAME || 'my_database';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Secret123';

let inMemoryUsers = getFallbackUsers();

function getFallbackTeachers() {
    return [
        {
            full_name: 'นางสาวสมใจ ใจดี',
            position: 'ครูแผนกเทคโนโลยีสารสนเทศ',
            expertise: 'Web Development, Database, JavaScript',
            email: 'somjai@school.ac.th',
            phone: '081-234-5678',
            photo_url: '',
        },
        {
            full_name: 'นายวิชัย กล้าหาญ',
            position: 'ครูแผนกเทคโนโลยีสารสนเทศ',
            expertise: 'Network, Linux, Cybersecurity',
            email: 'wichai@school.ac.th',
            phone: '082-345-6789',
            photo_url: '',
        },
        {
            full_name: 'นางสาวพรพรรณ ทองดี',
            position: 'ครูแผนกเทคโนโลยีสารสนเทศ',
            expertise: 'UI/UX, Frontend, Design Thinking',
            email: 'pornpun@school.ac.th',
            phone: '083-456-7890',
            photo_url: '',
        },
    ];
}

function getFallbackUsers() {
    return [
        {
            id: 1,
            full_name: 'นายกิตติศักดิ์ รื่นรมย์',
            email: 'kittisak@gmail.com',
            phone: '081-111-2222',
            role: 'Admin',
            status: 'ออนไลน์',
        },
        {
            id: 2,
            full_name: 'นางสาวณัฐพร พิทักษ์',
            email: 'natthaporn@gmail.com',
            phone: '082-333-4444',
            role: 'ผู้ดูแลระบบ',
            status: 'ว่าง',
        },
        {
            id: 3,
            full_name: 'นายชาญชัย ปัญญา',
            email: 'chanchai@gmail.com',
            phone: '083-555-6666',
            role: 'นักศึกษา',
            status: 'ออนไลน์',
        },
    ];
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    if (url.pathname === '/' || url.pathname === '/index.html') {
        return serveStaticFile(res, path.join(__dirname, 'pubilc', 'index.html'), 'text/html');
    }

    if (url.pathname === '/api/teachers' && req.method === 'GET') {
        return getTeachers(res);
    }

    if (url.pathname === '/api/users' && req.method === 'GET') {
        return sendJson(res, 200, inMemoryUsers);
    }

    if (url.pathname === '/api/users' && req.method === 'POST') {
        return handleCreateUser(req, res);
    }

    if (url.pathname.startsWith('/api/users/') && (req.method === 'PUT' || req.method === 'DELETE')) {
        return handleUserById(req, res, url);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

async function getTeachers(res) {
    try {
        const teachers = await fetchTeachers();
        return sendJson(res, 200, teachers);
    } catch (error) {
        console.error('Error fetching teacher data:', error);
        return sendJson(res, 200, getFallbackTeachers());
    }
}

async function handleCreateUser(req, res) {
    try {
        const payload = await readJsonBody(req);
        const fullName = (payload.full_name || '').trim();
        const email = (payload.email || '').trim();
        const phone = (payload.phone || '').trim();
        const role = (payload.role || 'นักศึกษา').trim();
        const status = (payload.status || 'ว่าง').trim();

        if (!fullName || !email) {
            return sendJson(res, 400, { message: 'กรุณากรอกชื่อและอีเมล' });
        }

        const user = {
            id: Date.now(),
            full_name: fullName,
            email,
            phone,
            role,
            status,
        };

        inMemoryUsers = [user, ...inMemoryUsers];
        return sendJson(res, 201, user);
    } catch (error) {
        return sendJson(res, 400, { message: 'ข้อมูลไม่ถูกต้อง' });
    }
}

async function handleUserById(req, res, url) {
    const id = Number(url.pathname.split('/').pop());
    if (!Number.isInteger(id)) {
        return sendJson(res, 400, { message: 'ไอดีผู้ใช้ไม่ถูกต้อง' });
    }

    if (req.method === 'PUT') {
        try {
            const payload = await readJsonBody(req);
            const index = inMemoryUsers.findIndex((user) => user.id === id);
            if (index === -1) {
                return sendJson(res, 404, { message: 'ไม่พบผู้ใช้' });
            }

            inMemoryUsers[index] = {
                ...inMemoryUsers[index],
                full_name: (payload.full_name || inMemoryUsers[index].full_name).trim(),
                email: (payload.email || inMemoryUsers[index].email).trim(),
                phone: (payload.phone || inMemoryUsers[index].phone || '').trim(),
                role: (payload.role || inMemoryUsers[index].role || 'นักศึกษา').trim(),
                status: (payload.status || inMemoryUsers[index].status || 'ว่าง').trim(),
            };

            return sendJson(res, 200, inMemoryUsers[index]);
        } catch (error) {
            return sendJson(res, 400, { message: 'ข้อมูลไม่ถูกต้อง' });
        }
    }

    if (req.method === 'DELETE') {
        const beforeLength = inMemoryUsers.length;
        inMemoryUsers = inMemoryUsers.filter((user) => user.id !== id);
        if (inMemoryUsers.length === beforeLength) {
            return sendJson(res, 404, { message: 'ไม่พบผู้ใช้' });
        }
        return sendJson(res, 200, { success: true });
    }

    return sendJson(res, 405, { message: 'Method not allowed' });
}

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let raw = '';

        req.on('data', (chunk) => {
            raw += chunk;
        });

        req.on('end', () => {
            if (!raw.trim()) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(raw));
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });

        req.on('error', () => reject(new Error('Request error')));
    });
}

async function fetchTeachers() {
    let connection;

    try {
        connection = await mysql.createConnection({
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        });

        const [tables] = await connection.query("SHOW TABLES LIKE '%teacher%'");
        if (!tables.length) {
            return getFallbackTeachers();
        }

        const tableName = tables[0][Object.keys(tables[0])[0]];
        const [columns] = await connection.query(`SHOW COLUMNS FROM \`${tableName}\``);
        const columnNames = columns.map((column) => column.Field);

        const selectMap = {
            full_name: ['full_name', 'name', 'teacher_name', 'teacher'],
            position: ['position', 'title', 'role'],
            expertise: ['expertise', 'subject', 'specialty', 'area'],
            email: ['email'],
            phone: ['phone', 'phone_number', 'mobile', 'tel'],
            photo_url: ['photo_url', 'avatar', 'image_url', 'photo', 'picture'],
        };

        const selectColumns = Object.entries(selectMap).reduce((acc, [alias, candidates]) => {
            const found = candidates.find((candidate) => columnNames.includes(candidate));
            if (found) {
                acc.push(`\`${found}\` AS \`${alias}\``);
            }
            return acc;
        }, []);

        if (!selectColumns.length) {
            return getFallbackTeachers();
        }

        const [rows] = await connection.query(`SELECT ${selectColumns.join(', ')} FROM \`${tableName}\``);
        const mappedRows = rows.map((row) => ({
            full_name: row.full_name || '',
            position: row.position || '',
            expertise: row.expertise || '',
            email: row.email || '',
            phone: row.phone || '',
            photo_url: row.photo_url || '',
        }));

        return mappedRows.length ? mappedRows : getFallbackTeachers();
    } catch (error) {
        console.warn('MySQL unavailable or table missing, using fallback data:', error.message);
        return getFallbackTeachers();
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

function serveStaticFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const PORT = 3000;

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = {
    getFallbackTeachers,
    getFallbackUsers,
    fetchTeachers,
    server,
};
