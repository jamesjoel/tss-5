import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : "http://192.168.0.104:5173",
        methods : ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
        socket.on("serv", (id)=>{
            console.log("**********")
            io.emit("usertoclient", id)
        })
})



server.listen(3000, "0.0.0.0", ()=>{
    console.log("server running");
})