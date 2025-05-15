import express from 'express'
import Cors from 'cors'
import http from 'http';
import { Server } from "socket.io";
import createRoomRouter from './routers/CreateRoomRouter.js';
import joinRoomRouter from './routers/JoinRoomRouter.js';
import userIDRouter from './routers/UserIDRouter.js';
import socket from './socket/socket.js';
import getRoomsRouter from './routers/GetRoomsRouter.js';

const app = express();
const jsonBodyMiddleware = express.json();

app.use(Cors({
    origin: '*',
}));
app.use(jsonBodyMiddleware);
app.use('/create-room',createRoomRouter);
app.use('/join-room',joinRoomRouter);
app.use('/generate-id',userIDRouter);
app.use('/get-rooms', getRoomsRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

socket(io);

export default server;