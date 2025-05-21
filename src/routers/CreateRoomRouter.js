import Express, { response } from 'express'
import { Router } from 'express'
import roomInteractionService from '../domain/RoomInteractionService.js';
import { generateResponce, HTTP_CODES } from '../utils/ResponceUtils.js';
import utilService from '../domain/UtilService.js';

const createRoomRouter = Router();

createRoomRouter.post('/', async (req, res) => {
    const userID = +req.body.userID;
    let vehicleInfo;
    let isRequestOk = !!userID;
    try{
        vehicleInfo = {
            vehicleID: req.body.vehicle.id,
            color: req.body.vehicle.color,
            left: req.body.vehicle.left,
            top: req.body.vehicle.top,
            rotateAngle: +req.body.vehicle.angle,
            wheelRotateAngle: +req.body.vehicle.wheelAngle,
        };
    }catch(er){
        console.log("Something happened");
        isRequestOk = false;
    }
    console.log(req.body);
    if(isRequestOk){
        const answer = await utilService.checkBody(vehicleInfo, []);
        isRequestOk = !answer.isHasProblems;
    }

    const room = isRequestOk? await roomInteractionService.CreateRoom(userID, vehicleInfo): false;

    if(!isRequestOk || !room){
        res.status(HTTP_CODES.BAD_REQUEST_400);
        res.json(generateResponce('400, Bad request'));
        return;
    }

    res.status(HTTP_CODES.OK_200);
    res.json(generateResponce('200, Ok', room));
});

export default createRoomRouter;