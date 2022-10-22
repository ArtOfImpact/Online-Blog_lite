
const http = require("http");

const fs = require("fs");

const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`)

    switch (req.url) {
        case "/":
            basePath = createPath("index");
            res.statusCode = 200;
            break;
        case "/contacts":
            basePath = createPath("contacts");
            res.statusCode = 200;
            break;
        default:
            basePath = createPath("error");
            res.statusCode = 404;
            break;
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            res.end;
        } else {
            res.write(data);
            res.end();
        }
    })
});

// Пример роутинга на чистом Node.js

server.listen(PORT, (error) => {
    error ? console.log(error) : console.log("Port 3000")
})