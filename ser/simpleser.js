const http = require('http');  

const server = http.createServer((req, res) => {

    if(req.url === "/"){
        res.end("Welcome to the home page!");
    }

    else if(req.url === "/about"){
        res.end("Welcome to the about page!");
    }

    else if(req.url === "/students"){
        res.end("Welcome to the students page!");
    }

    else{
        res.end("404 Not Found");
    }
});

server.listen(3000, () => console.log('Server running on port 3000'));