javascript
const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");


// ============================================================
// 1. CUSTOM EVENT EMITTER
// ============================================================

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("greet", function(name) {
    console.log("[greet event] Hello, " + name + "!");
});

myEmitter.on("exit", function() {
    console.log("[exit event] Server says goodbye. Cleaning up...");
});


// ============================================================
// 2. FILE PATH
// ============================================================

const DATA_FILE = path.join(__dirname, "data.txt");

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
        DATA_FILE,
        "Welcome! This is the initial content of data.txt\n"
    );
}


// ============================================================
// 3. EVENT LOOP DEMO
// ============================================================

function eventLoopDemo() {

    const log = [];

    log.push("1. Synchronous code runs first");

    setTimeout(function() {
        log.push("4. setTimeout callback");
    }, 0);

    setImmediate(function() {
        log.push("5. setImmediate callback");
    });

    process.nextTick(function() {
        log.push("2. process.nextTick callback");
    });

    Promise.resolve().then(function() {
        log.push("3. Promise.then callback");
    });

    return new Promise(function(resolve) {

        setTimeout(function() {
            resolve(log);
        }, 100);

    });
}


// ============================================================
// 4. SEND JSON
// ============================================================

function sendJSON(res, statusCode, data) {

    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data, null, 2));
}


// ============================================================
// 5. CREATE SERVER
// ============================================================

const server = http.createServer(async function(req, res) {

    const method = req.method;
    const url = req.url;

    console.log(method + " " + url);


    // ========================================================
    // HOME
    // ========================================================

    if (method === "GET" && url === "/") {

        sendJSON(res, 200, {
            message: "Node.js FSD Activity Server is running!",
            routes: [
                "GET /greet?name=Student",
                "GET /exit",
                "GET /eventloop",
                "GET /read",
                "POST /create",
                "PUT /update",
                "DELETE /delete"
            ]
        });

        return;
    }


    // ========================================================
    // GREET EVENT
    // ========================================================

    if (method === "GET" && url.indexOf("/greet") === 0) {

        const parsedURL = new URL(
            url,
            "http://" + req.headers.host
        );

        const name =
            parsedURL.searchParams.get("name") || "Guest";

        myEmitter.emit("greet", name);

        sendJSON(res, 200, {
            message: "Greet event emitted",
            name: name
        });

        return;
    }


    // ========================================================
    // EXIT EVENT
    // ========================================================

    if (method === "GET" && url === "/exit") {

        myEmitter.emit("exit");

        sendJSON(res, 200, {
            message: "Exit event emitted"
        });

        return;
    }


    // ========================================================
    // EVENT LOOP
    // ========================================================

    if (method === "GET" && url === "/eventloop") {

        const order = await eventLoopDemo();

        console.log("Event Loop Order:");

        order.forEach(function(item) {
            console.log(item);
        });

        sendJSON(res, 200, {
            message: "Event loop demo completed",
            order: order
        });

        return;
    }


    // ========================================================
    // READ FILE
    // ========================================================

    if (method === "GET" && url === "/read") {

        fs.readFile(
            DATA_FILE,
            "utf8",
            function(err, data) {

                if (err) {

                    sendJSON(res, 500, {
                        error: "Read failed"
                    });

                    return;
                }

                sendJSON(res, 200, {
                    message: "File read successfully",
                    content: data
                });
            }
        );

        return;
    }


    // ========================================================
    // CREATE FILE
    // ========================================================

    if (method === "POST" && url === "/create") {

        let body = "";

        req.on("data", function(chunk) {
            body += chunk;
        });

        req.on("end", function() {

            try {

                const data = JSON.parse(body || "{}");

                const text = data.text || "";

                fs.writeFile(
                    DATA_FILE,
                    text + "\n",
                    function(err) {

                        if (err) {

                            sendJSON(res, 500, {
                                error: "Create failed"
                            });

                            return;
                        }

                        sendJSON(res, 201, {
                            message: "File created/overwritten",
                            content: text
                        });
                    }
                );

            } catch (error) {

                sendJSON(res, 400, {
                    error: "Invalid JSON"
                });
            }
        });

        return;
    }


    // ========================================================
    // UPDATE FILE
    // ========================================================

    if (method === "PUT" && url === "/update") {

        let body = "";

        req.on("data", function(chunk) {
            body += chunk;
        });

        req.on("end", function() {

            try {

                const data = JSON.parse(body || "{}");

                const text = data.text || "";

                fs.appendFile(
                    DATA_FILE,
                    text + "\n",
                    function(err) {

                        if (err) {

                            sendJSON(res, 500, {
                                error: "Update failed"
                            });

                            return;
                        }

                        sendJSON(res, 200, {
                            message: "Content appended",
                            added: text
                        });
                    }
                );

            } catch (error) {

                sendJSON(res, 400, {
                    error: "Invalid JSON"
                });
            }
        });

        return;
    }


    // ========================================================
    // DELETE / CLEAR FILE
    // ========================================================

    if (method === "DELETE" && url === "/delete") {

        fs.writeFile(
            DATA_FILE,
            "",
            function(err) {

                if (err) {

                    sendJSON(res, 500, {
                        error: "Delete failed"
                    });

                    return;
                }

                sendJSON(res, 200, {
                    message: "File content cleared"
                });
            }
        );

        return;
    }


    // ========================================================
    // 404
    // ========================================================

    sendJSON(res, 404, {
        error: "Route not found"
    });

});


// ============================================================
// 6. START SERVER
// ============================================================

const PORT = 3000;

server.listen(PORT, function() {

    console.log("");
    console.log("=================================");
    console.log(" Node.js FSD Activity");
    console.log("=================================");
    console.log("Server running on port " + PORT);
    console.log("http://localhost:" + PORT);
    console.log("=================================");
    console.log("");

});

