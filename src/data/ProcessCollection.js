
const Collection = [];

const collectionController = {
    async CreateRoom(roomID, userID, userVehicleInfo){
        const room = {
            users: [{
                userID,
                userSocketID,
                userVehicleInfo: null,
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
                return room;
            }
        }
        return null;
    },
    async DeleteRoom(){

    },
    //info=[{key: 'key', value:'value'}]
    async UpdateRoomInfo(roomID, userID, ...info){
        for(let room of Collection){
            if(roomID === room.identifier){
                for (const prop of info) {
                    room.users[userID][prop.key] = prop.value;
                }
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
    async GetAllRooms(){
        return Collection;
    },
    async SetSocketID(roomID, userID, socketID){
        const result = await this.UpdateRoomInfo(roomID, userID, {key: 'userSocketID', value: socketID})
        return result;
    },
}

export default collectionController;