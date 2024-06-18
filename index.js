const socket = require('socket.io'),
      express = require('express'),
      https = require('https'),
      http = require('http'),
      logger = require('winston'),
      cors = require('cors');

// logger.remove(logger.transports.Console);
// logger.add(logger.transports.Console);
// logger.info('Socket > Listening on port');


const __PORT = 5000;
const app = express();
const http_server = http.createServer(app);
const https_server = https.createServer(app);

const io = socket(http_server);
const httpsio = socket(https_server);

app.use(cors());

http_server.listen(__PORT);
https_server.listen(__PORT + 1);

function start() {
    io.sockets.on('connection', function (socket) {
        console.log("Connected");
        socket.on("message", function (data) {
            console.log(data)
            io.emit("message", data);
        })

        socket.on("notification", function (data) {
            console.log(data)
            io.emit("notification", data);
        })

        socket.on("system_message", function (data) {
            console.log(data)
            io.emit("system_message", data);
        })
    })

    httpsio.sockets.on('connection', function (socket) {
        console.log("Connected");
        socket.on("message", function (data) {
            console.log(data)
            io.emit("message", data);
        })

        socket.on("notification", function (data) {
            console.log(data)
            io.emit("notification", data);
        })

        socket.on("system_message", function (data) {
            console.log(data)
            io.emit("system_message", data);
        })
    })
}

console.log('Server is Running Install!');

start();