import Express, { response } from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService.js';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils.js';
import utilService from '../domain/UtilService.js';

const createRoomRouter = Router();

createRoomRouter.post('/', async (req, res) => {
    const userID = +req.body.userID;
    const vehicleInfo = {
        vehicleID: req.body.vehicle.id,
        color: req.body.vehicle.color,
        left: req.body.vehicle.left,
        top: req.body.vehicle.top,
        rotateAngle: +req.body.vehicle.angle,
        wheelRotateAngle: +req.body.vehicle.wheelAngle,
    };

    let isRequestOk = !!userID;

    if(isRequestOk){
        const answer = await utilService.checkBody(vehicleInfo, []);
        isRequestOk = !answer.isHasProblems;
    }

    if(!isRequestOk){
        res.status(HTTP_CODES.BAD_REQUEST_400);
        res.json(generateResponce('400, Bad request'));
        return;
    }

    const room = await roomInteractionService.CreateRoom(userID, vehicleInfo);

    res.status(HTTP_CODES.OK_200);
    res.json(generateResponce('200, Ok', {roomID: room}));
});

export default createRoomRouter;