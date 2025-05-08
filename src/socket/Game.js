import utilService from "../domain/UtilService";
import inGameService from "../domain/InGameService";

const gameSocket = (socket, io) => {
    socket.on("join-room", async (roomID, userID) => {
        await socket.join(roomID);
        await inGameService.AddSocketId(roomID, userID, socket.id);
        const users = await inGameService.GetRoomCarsExcUser(roomID, userID);
        await socket.to(roomID).emit("player-joined", socket.id, {users});
    });
    socket.on("move", async (roomID, userID, vehicleInfo) => {
        const isBodyOk = await utilService.checkBody(vehicleInfo, ['left', 'top', 'vehicleID', 
            'rotateAngle', 'wheelRotateAngle']);
        
        if(!isBodyOk){
            await socket.to(roomID).emit("wrong-body", socket.id);
        }
        else{
            const result = await inGameService.MoveTo(roomID, userID, vehicleInfo);            
            const users = await inGameService.GetAllUsers(roomID);
            if(result){
                for(let user of users){
                    const cars = await inGameService.GetRoomCarsExcUser(roomID, user.userID);
                    socket.to(roomID).emit("update-positions", user.userSocketID, {users: cars});
                }
            }
        }

    });
};

export default gameSocket;