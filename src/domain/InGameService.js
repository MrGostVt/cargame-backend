import collectionController from "../data/ProcessCollection.js";

const inGameService = {
    async MoveTo(roomID, userID, vehicleInfo){
        
        const result = await collectionController.UpdateRoomInfo(roomID, userID, 
            {key: 'left', value: vehicleInfo.left}, 
            {key: 'top', value: vehicleInfo.top},
            {key: 'rotateAngle', value: vehicleInfo.rotateAngle},
            {key: 'wheelRotateAngle', value: vehicleInfo.wheelRotateAngle});
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
        return result;
    },
    async GetAllUsers(roomID){
        const room = await collectionController.GetRoomInfo(roomID);

        const users = [];
        room.users.forEach((val) => {
            users.push({userID: val.userID, userSocketID: val.userSocketID});
        });
        return users;
    }
};

export default inGameService;