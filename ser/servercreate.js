const http = require('http');

let item = ['apple', 'banana'];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
        res.end(JSON.stringify(item));
    }  
    
    else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            items.push(body);
            res.end('item added: ' + body );
        });


    } else if (req.method === 'PUT') {
        items[0] = 'updated item';
        res.end('first item updated');
    }


     else if (req.method === 'DELETE') {
        items.pop();
        res.end('last item deleted');
    }

});

server.listen(3000, () => console.log('Server running on port 3000'));