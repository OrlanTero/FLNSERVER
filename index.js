const socket = require('socket.io'),
      express = require('express'),
      https = require('https'),
      http = require('http'),
      logger = require('winston'),
      cors = require('cors');

// logger.remove(logger.transports.Console);
// logger.add(logger.transports.Console);
// logger.info('Socket > Listening on port');


const __PORT = 3001;
const app = express();
const http_server = https.createServer(app);
const io = socket(http_server);

app.use(cors());

http_server.listen(__PORT);

function start() {
    io.sockets.on('connection', function (socket) {
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

console.log('Server is Running!');

start();