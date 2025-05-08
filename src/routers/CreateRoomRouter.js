import Express, { response } from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils';
import utilService from '../domain/UtilService';

const createRoomRouter = Router();

createRoomRouter.post('/create-room', async (req, res) => {
    const userID = +req.body.userID;
    const vehicleInfo = {
        vehicleID: req.body.vehicle.id,
        left: req.body.vehicle.left,
        top: req.body.vehicle.top,
        rotateAngle: +req.body.vehicle.angle,
        wheelRotateAngle: +req.body.vehicle.wheelAngle,
    };

    let isRequestOk = !!userID;

    if(isRequestOk){
        isRequestOk = await utilService.checkBody(vehicleInfo, [])
    }

    if(!isRequestOk){
        response.status(HTTP_CODES.BAD_REQUEST_400);
        response.json(generateResponce('400, Bad request'));
        return;
    }

    const room = roomInteractionService.CreateRoom(userID, vehicleInfo);

    response.status(HTTP_CODES.OK_200);
    response.json(generateResponce('200, Ok', {roomID: room}));
});

export default createRoomRouter;