import collectionController from "../data/ProcessCollection";

const roomInteractionService = {
    async GenerateUserID(){
        const userID = 100 + Math.random() * 899;

        return userID;
    },
    async CreateRoom(userID, userVehicleInfo){
        const roomID = 1000 + Math.random() * 8999;
        await collectionController.CreateRoom(roomID, userID, userVehicleInfo);

        return roomID;
    },
    async JoinRoom(roomID, userID, userVehicleInfo){
        const result = await collectionController.JoinRoom(roomID, userID, userVehicleInfo);
        if(!result){
            return null;
        }

        return result;
    },
    async UpdateRoomInfo(roomID, userID, userVehicleInfo){
        await collectionController.UpdateRoomInfo(roomID, userID, userVehicleInfo);
    },
    async GetAllRooms(){
        const collection = await collectionController.GetAllRooms();
        const roomsPrev = [];
        
        for(let room of collection){
            const roomPrev = {
                usersCount: room.users.length,
                identifier: room.identifier,
            }

            roomsPrev.push(roomPrev);
        }

        return roomsPrev;
    },
}

export default roomInteractionService;