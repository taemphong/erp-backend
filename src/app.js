import express from 'express';
import config from './config.js';
import cors from 'cors';
import router from './index.routes.js';
import { Server } from 'socket.io';
import http from 'http';
const app = express();
const port = config.app.port;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

