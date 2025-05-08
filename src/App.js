import express from 'express'
import Cors from 'cors'
import http from 'http';
import { Server } from "socket.io";

const app = express();
const jsonBodyMiddleware = express.json();

app.use(Cors({
    origin: '*',
}));
app.use(jsonBodyMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});





export default server;