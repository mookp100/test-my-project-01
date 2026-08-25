const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
const DB_NAME = process.env.DB_NAME || 'my_database';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Secret123';

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

const server = http.createServer(async (req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        return serveStaticFile(res, path.join(__dirname, 'pubilc', 'index.html'), 'text/html');
    }

    if (req.url === '/api/teachers' && req.method === 'GET') {
        return getTeachers(res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

async function getTeachers(res) {
    try {
        const teachers = await fetchTeachers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(teachers));
    } catch (error) {
        console.error('Error fetching teacher data:', error);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getFallbackTeachers()));
    }
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
    fetchTeachers,
    server,
};
