import Express from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService.js';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils.js';

const getRoomsRouter = Router();

getRoomsRouter.get('/', async (req, res) => {
    const rooms = await roomInteractionService.GetAllRooms();

    res.status(HTTP_CODES.OK_200);
    res.json(generateResponce('200, Ok', rooms))
});

export default getRoomsRouter;