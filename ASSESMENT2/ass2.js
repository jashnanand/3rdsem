const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DIRECTORY_PATH = path.join(__dirname, 'files');

// 1. Ensure the 'files/' directory exists at startup
if (!fs.existsSync(DIRECTORY_PATH)) {
    fs.mkdirSync(DIRECTORY_PATH);
    console.log("Created 'files/' directory.");
}

// Helper function to read request body stream
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => resolve(body));
        req.on('error', err => reject(err));
    });
};

// 2. Create the HTTP Server
const server = http.createServer(async (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    
    // Extract filename from URL (e.g., /files/example.txt -> example.txt)
    const filename = pathname.startsWith('/files/') ? pathname.replace('/files/', '') : null;
    const filePath = filename ? path.join(DIRECTORY_PATH, filename) : null;

    // Set standard response headers
    res.setHeader('Content-Type', 'application/json');

    try {
        // --- READ ALL FILES (GET /files) ---
        if (pathname === '/files' && req.method === 'GET') {
            const files = fs.readdirSync(DIRECTORY_PATH);
            res.statusCode = 200;
            return res.end(JSON.stringify({ success: true, files }));
        }

        // --- CREATE FILE (POST /files/filename.txt) ---
        if (filePath && req.method === 'POST') {
            const content = await getRequestBody(req);
            fs.writeFileSync(filePath, content, 'utf8');
            res.statusCode = 201;
            return res.end(JSON.stringify({ success: true, message: `File '${filename}' created successfully.` }));
        }

        // --- READ FILE (GET /files/filename.txt) ---
        if (filePath && req.method === 'GET') {
            if (!fs.existsSync(filePath)) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: 'File not found' }));
            }
            const data = fs.readFileSync(filePath, 'utf8');
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 200;
            return res.end(data);
        }

        // --- UPDATE FILE (PUT /files/filename.txt) ---
        if (filePath && req.method === 'PUT') {
            if (!fs.existsSync(filePath)) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: 'File not found to update' }));
            }
            const newContent = await getRequestBody(req);
            fs.writeFileSync(filePath, newContent, 'utf8');
            res.statusCode = 200;
            return res.end(JSON.stringify({ success: true, message: `File '${filename}' updated successfully.` }));
        }

        // --- DELETE FILE (DELETE /files/filename.txt) ---
        if (filePath && req.method === 'DELETE') {
            if (!fs.existsSync(filePath)) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: 'File not found to delete' }));
            }
            fs.unlinkSync(filePath);
            res.statusCode = 200;
            return res.end(JSON.stringify({ success: true, message: `File '${filename}' deleted successfully.` }));
        }

        // Route not found
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Route not found' }));

    } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
    }
});

// 3. Start listening on port 3000
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
});
