import Express, { response } from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils';

const joinRoomRouter = Router();

joinRoomRouter.post('/join-room', async (req, res) => {
    const roomID = +req.body.roomID;
    const userID = +req.body.userID;
    const vehicleInfo = {
        vehicleID: req.body.vehicle.id,
        left: req.body.vehicle.left,
        top: req.body.vehicle.top,
        rotateAngle: +req.body.vehicle.angle,
        wheelRotateAngle: +req.body.vehicle.wheelAngle,
    };

    let isRequestOk = !!userID && !!roomID;

    if(isRequestOk){
        isRequestOk = await utilService.checkBody(vehicleInfo, []);
    }

    const room = await roomInteractionService.JoinRoom(roomID, userID, vehicleInfo);

    if(!isRequestOk || !!room){
        response.status(HTTP_CODES.BAD_REQUEST_400);
        response.json(generateResponce('400, Bad request'));
        return;
    }

    response.status(HTTP_CODES.OK_200);
    response.json(generateResponce('200, Ok', room));
});

export default joinRoomRouter;