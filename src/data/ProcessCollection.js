
const Collection = [{users:[{userID: 964, userSocketID: null, userVehicleInfo: {}}], identifier:8960}];

const collectionController = {
    async CreateRoom(roomID, userID, userVehicleInfo){
        const room = {
            users: [{
                userID,
                userSocketID: null,
                userVehicleInfo,
            }],
            identifier: roomID,
        };

        Collection.push(room);
        return room;
    },
    async JoinRoom(roomID, userID, userVehicleInfo){
        let roomExcUser = null;
        for(let room of Collection){
            if(roomID === room.identifier){
                roomExcUser = {...room};
                roomExcUser.users = [...room.users];//TODO: UPDATE copying, to make it more safety
                room.users.push({userID, userVehicleInfo, userSocketID: null});
            }
        }
        return roomExcUser;
    },
    async DeleteRoom(){

    },
    //info=[{key: 'key', value:'value'}]
    async getUserIndex(roomID, userID){
        for(let room of Collection){
            if(roomID === room.identifier){
                for (const index in room.users) {
                    if(room.users[index].userID === userID){
                        return index;
                    };
                }
            }
        }
        return null;
    },
    async UpdateRoomInfo(roomID, userID, ...info){
        const userIndex = await this.getUserIndex(roomID,userID);
        if(userIndex === null){
            return false;
        }
        for(let room of Collection){
            if(roomID === room.identifier){
                for (const prop of info) {
                    room.users[userIndex][prop.key] = prop.value;
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