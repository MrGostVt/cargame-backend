
const Collection = [];

const collectionController = {
    async CreateRoom(roomID, userID, userVehicleInfo){
        const room = {
            users: [{
                userID,
                userVehicleInfo,
            }],
            identifier: roomID,
        };

        Collection.push(room);
        return true;
    },
    async JoinRoom(roomID, userID, userVehicleInfo){
        for(let room of Collection){
            if(roomID === room.identifier){
                room.users.push({userID, userVehicleInfo});
                return true;
            }
        }
        return false;
    },
    async DeleteRoom(){

    },
    async UpdateRoomInfo(roomID, userID, info){
        for(let room of Collection){
            if(roomID === room.identifier){
                
                room.users[userID].userVehicleInfo = info;
                return true;
            }
        }
        return false;
    },
    async GetRoomInfo(roomID){
        for(let room of Collection){
            if(roomID === room.identifier){
                return room;
            }
        }
        return null;
    },
}

export default collectionController;