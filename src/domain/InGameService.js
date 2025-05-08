import collectionController from "../data/ProcessCollection";

const inGameService = {
    async MoveTo(roomID, userID, vehicleInfo){
        const result = await collectionController.UpdateRoomInfo(roomID, userID, vehicleInfo);
        return result;
    },
    async GetRoomCarsExcUser(roomID, userID){
        const room = await collectionController.GetRoomInfo(roomID);
        const users = [];

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
        const room = collectionController.GetRoomInfo(roomID);

        const users = [];
        room.users.forEach((val) => {
            users.push({userID: val.userID, userSocketID: val.userSocketID});
        });
        return users;
    }
};

export default inGameService;