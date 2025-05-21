import Express, { response } from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService.js';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils.js';
import utilService from '../domain/UtilService.js';


const joinRoomRouter = Router();

joinRoomRouter.post('/', async (req, res) => {
    const roomID = +req.body.roomID;
    const userID = +req.body.userID;
    let vehicleInfo;
    let isRequestOk = !!userID || !!roomID;
    try{
        vehicleInfo = {
            vehicleID: req.body.vehicle.id,
            color: req.body.vehicle.color,
            left: req.body.vehicle.left,
            top: req.body.vehicle.top,
            rotateAngle: +req.body.vehicle.angle,
            wheelRotateAngle: +req.body.vehicle.wheelAngle,
        };
    }catch{
        isRequestOk = false;
    }

    if(isRequestOk){
        const answer = await utilService.checkBody(vehicleInfo, []);
        isRequestOk = !answer.isHasProblems;
    }

    const room = isRequestOk? await roomInteractionService.JoinRoom(roomID, userID, vehicleInfo): false;

    if(!isRequestOk || !room){
        res.status(HTTP_CODES.BAD_REQUEST_400);
        res.json(generateResponce('400, Bad request'));
        return;
    }

    res.status(HTTP_CODES.OK_200);
    res.json(generateResponce('200, Ok', room));
});

export default joinRoomRouter;