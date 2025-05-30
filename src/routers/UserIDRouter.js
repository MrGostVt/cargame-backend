import Express from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService.js';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils.js';

const userIDRouter = Router();

userIDRouter.get('/', async (req, res) => {
    const userID = await roomInteractionService.GenerateUserID();

    res.status(HTTP_CODES.OK_200);
    res.json(generateResponce('200, Ok', {userID}))
});

export default userIDRouter;