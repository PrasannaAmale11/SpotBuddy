const express = require('express');

const app = express();

const path = require('path');

const http = require('http');

const socketio = require('socket.io');

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", { id: socket.id, ...data });
    })
    console.log("Connected to socket");
    
    
    socket.on("user-disconnect", (id) =>{
        io.emit("socket disconnected", socket.id);
    })
})
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.render("index")
})

server.listen(3000);