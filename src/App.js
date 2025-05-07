import express from 'express'
import Cors from 'cors'

const app = express();
const jsonBodyMiddleware = express.json();

app.use(Cors({
    origin: '*',
}));
app.use(jsonBodyMiddleware);




export default app;