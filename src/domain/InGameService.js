import collectionController from "../data/ProcessCollection.js";
import socketDataController from "../data/SocketCollection.js";

const inGameService = {
    async MoveTo(roomID, userID, vehicleInfo){
        
        const result = await collectionController.UpdateRoomInfo(roomID, userID, true, 
            {key: 'left', value: vehicleInfo.left}, 
            {key: 'top', value: vehicleInfo.top},
            {key: 'rotateAngle', value: vehicleInfo.angle},
            {key: 'wheelRotateAngle', value: vehicleInfo.wheelAngle});
        return result;
    },
    async GetRoomCarsExcUser(roomID, userID){
        const room = await collectionController.GetRoomInfo(+roomID);
        console.log(roomID);
        const users = [];
        if(room === null){
            return users;
        }

        room.users.forEach((val) => {
            if(val.userID === userID){
                return;
            }
            else{
                users.push({userID: val.userID, userVehicleInfo: val.userVehicleInfo});
            }
        });

        return users;
    },
    async AddSocketId(roomID, userID, socketID){
        const result =  await collectionController.SetSocketID(roomID, userID, socketID);
        if(result){await socketDataController.AddSocket(socketID, userID, roomID);}
        return result;
    },
    async GetAllUsers(roomID){
        const room = await collectionController.GetRoomInfo(roomID);

        const users = [];
        room.users.forEach((val) => {
            users.push({userID: val.userID, userSocketID: val.userSocketID});
        });
        return users;
    },
    async RemovePlayerFromRoom(roomID, userID){
        const room = await collectionController.GetRoomInfo(roomID);
        console.log(roomID, userID, "TRYING TO REMOVE");
        let id = -1;
        for (const key in room.users) {
            if(room.users[key].userID === userID){
                id = key;
                break;
            }
        }

        if(id === -1){
            return false;
        }
        const users = room.users.splice(id, 1);

        const result = await collectionController.UpdateRoomInfo(roomID, userID, false, {key: 'users', value: users});
        return result;
    }
};

export default inGameService;