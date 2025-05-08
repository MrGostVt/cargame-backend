import Express from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils';

const userIDRouter = Router();

userIDRouter.get('/generate-id', async (req, res) => {
    const userID = await roomInteractionService.GenerateUserID();

    res.status(HTTP_CODES.OK_200);
    res.json(generateResponce('200, Ok', {userID}))
});

export default userIDRouter;