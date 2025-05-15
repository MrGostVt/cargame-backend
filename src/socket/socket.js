import gameSocket from "./Game.js";

const socket = async (io) => {
    io.on("connection", async (socket) => {
        console.log(socket.id);

        gameSocket(socket, io);

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    })
}

export default socket;