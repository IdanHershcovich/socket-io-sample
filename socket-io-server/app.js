//standard require statements
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;

//initializing the socket, the axpress app and the server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let interval;

//when a connection is successfull, get the speed value every second. 
io.on("connection", socket => {
    console.log("New client connected!");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getSpeed(socket), 100);
    socket.on("disconnect", () => {
        console.log("client disconnected");
    });
});



//starting speed at 0
let speed = 10;

//Simulating "speed" randomly for the front-end speedometer. 
const getSpeed = async socket => {
    //some sudo-randomness to change the values but not to drastically
    let nextMin = (speed - 2) > 0 ? speed - 2 : 2;
    let nextMax = speed + 5 < 140 ? speed + 5 : Math.random() * (130 - 5 + 1) + 5;
    speed = Math.floor(Math.random() * (nextMax - nextMin + 1) + nextMin);
    //we emit the data. No need to JSON serialization!
    socket.emit('outgoing data', speed);
    console.log(speed);
}
server.listen(port, () => console.log(`listening on port ${port}`));



