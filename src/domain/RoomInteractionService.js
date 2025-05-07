import collectionController from "../data/ProcessCollection";

const roomInteractionService = {
    GenerateUserID(){
        const userID = 100 + Math.random() * 899;

        return userID;
    },
    CreateRoom(userID, userVehicleInfo){
        const roomID = 1000 + Math.random() * 8999;
        collectionController.CreateRoom(roomID, userID, userVehicleInfo);

        return roomID;
    },
    JoinRoom(roomID, userID, userVehicleInfo){
        const result = collectionController.JoinRoom(roomID, userID, userVehicleInfo);
        return result;
    },
    UpdateRoomInfo(roomID, userID, userVehicleInfo){
        collectionController.UpdateRoomInfo(roomID, userID, userVehicleInfo);
    },
}

export default roomInteractionService