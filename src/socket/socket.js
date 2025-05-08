import gameSocket from "./Game";

export default socket = async (io) => {
    io.on("connection", async (socket) => {
        console.log(socket.id);

        gameSocket(socket, io);

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    })
}