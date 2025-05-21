import utilService from "../domain/UtilService.js";
import inGameService from "../domain/InGameService.js";

//TODO: UPDATE OBJECTS TO JSON,
//socket.to - отправляет всем кроме текущего, в комнате, io.to - туда куда скажете.
const gameSocket = (socket, io) => {
    socket.on("join-room", async (roomID, userID) => {
        await socket.join(roomID);
        console.log(+roomID, +userID);

        const isAdded = await inGameService.AddSocketId(+roomID, +userID, socket.id);
        if(!isAdded){
            io.to(socket.id).emit("bad-request");
            return;
        }

        const users = await inGameService.GetAllUsers(+roomID);
        for(let user of users){
            const cars = await inGameService.GetRoomCarsExcUser(+roomID, user.userID);
            io.to(user.userSocketID).emit("player-joined", { users: cars });
            console.log(`Player ID: ${user.userID}/${user.userSocketID}, received`);
        }   
    });
    
    socket.on("move", async (roomID, userID, vehicleInfo) => {
        const answer = await utilService.checkBody(vehicleInfo, ['left', 'top', 
            'angle', 'wheelAngle']);
        const isBodyOk = !answer.isHasProblems && !!+roomID && !!+userID;
        console.log(roomID, userID, `roomID, userID. Move!`);
        
        if(!isBodyOk){
            await io.to(socket.id).emit("wrong-body");
            return;
        }
        else{
            const result = await inGameService.MoveTo(+roomID, +userID, vehicleInfo);            
            const users = await inGameService.GetAllUsers(+roomID);
            if(result){
                for(let user of users){
                    const cars = await inGameService.GetRoomCarsExcUser(+roomID, user.userID);
                    io.to(user.userSocketID).emit("update-positions", { users: cars });
                }
            }
        }

    });
};

export default gameSocket;