
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
        const roomClone = {...room};
        roomClone.users = [...room.users];
        return roomClone;
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
    async UpdateRoomInfo(roomID, userID, isVehicleInfo, ...info){
        const room = await this.GetRoomInfo(roomID);
        // console.log("room")
        // console.log(room)
        const userIndex = await this.getUserIndex(roomID,userID);
        if(userIndex === null || room === null){
            return false;
        }
        for (const prop of info) {
            if(isVehicleInfo){
                room.users[userIndex]["userVehicleInfo"][prop.key] = prop.value;
                continue;
            }
            room.users[userIndex][prop.key] = prop.value;
            console.log(`userIndex: ${userIndex}, userID: ${userID}, prop: ${prop.key}, propVal: ${prop.value}`)
            console.log(room.users[userIndex][prop.key])
        }
        return true;
    },
    async GetRoomInfo(roomID){
        for(let room of Collection){
            if(roomID === room.identifier){
                return {...room};
            }
        }
        return null;
    },
    async GetAllRooms(){
        return Collection;
    },
    async SetSocketID(roomID, userID, socketID){
        const result = await this.UpdateRoomInfo(roomID, userID, false, {key: 'userSocketID', value: socketID})
        return result;
    },
}

export default collectionController;