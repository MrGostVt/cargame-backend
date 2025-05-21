
const SocketCollection = [];

const socketDataController = {
    async AddSocket(socketID, userID, roomID){
        SocketCollection.push({socketID, userID, roomID});
        console.log(SocketCollection);
    },
    async RemoveSocket(socketID){
        for(let key in SocketCollection){
            if(SocketCollection[key].socketID === socketID){
                const socketInfo = SocketCollection.splice(key, 1);
                return socketInfo[0];
            }
        }
    }
}
export default socketDataController;