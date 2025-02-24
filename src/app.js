import express from 'express';
import config from './config.js';
import cors from 'cors';
import router from './index.routes.js';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { checkLowStock } from './notification/lowstock.js';

const app = express();
const port = config.app.port;

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:3000" }
});

app.set("io", io);

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/api', router);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

checkLowStock(io)

io.on("connection", (socket) => {
    console.log("io connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("io disconnected:", socket.id);
    });
});

