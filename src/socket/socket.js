import socketDataController from "../data/SocketCollection.js";
import inGameService from "../domain/InGameService.js";
import gameSocket from "./Game.js";

const socket = async (io) => {
    io.on("connection", async (socket) => {
        console.log(socket.id);

        gameSocket(socket, io);

        socket.on("disconnect", async () => {
            const socketData = await socketDataController.RemoveSocket(socket.id);
            try{
                console.log(socketData);
                inGameService.RemovePlayerFromRoom(socketData.roomID, socketData.userID)
            }
            catch(er){
                console.error("Socket wrong");
            }
            console.log("Socket disconnected:", socket.id);
        });
    })
}

export default socket;