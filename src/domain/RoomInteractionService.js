import collectionController from "../data/ProcessCollection.js";

const roomInteractionService = {
    async GenerateUserID(){
        const userID = parseInt(100 + Math.random() * 899);

        return userID;
    },
    async CreateRoom(userID, userVehicleInfo){
        const roomID = parseInt(1000 + Math.random() * 8999);
        // const roomID = 3866;
        const isExist = !!(await collectionController.GetRoomInfo(roomID));
        if(isExist){
            return null;
        }

        const room = await collectionController.CreateRoom(roomID, userID, userVehicleInfo);
        room.users = [];
        //TODO: Remove socketID from room for prev layer 
        return room;
    },
    async checkIsUserJoined(roomID, userID){
        const room = await collectionController.GetRoomInfo(roomID);
        
        if(room === null){
            return false;
        }

        for(const user of room.users){
            if(user.userID === userID){
                return true;
            }
        }
        return false;
    },
    async JoinRoom(roomID, userID, userVehicleInfo){
        const isUserJoined = await this.checkIsUserJoined(roomID, userID);

        if(isUserJoined){
            return null;
        }
        
        const result = await collectionController.JoinRoom(roomID, userID, userVehicleInfo);
        
        if(!result){
            return null;
        }
        const users = result.users.map((val) => {
            return {userID: val.userID, userVehicleInfo: val.userVehicleInfo};
        })
        result.users = users;

        return result;
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