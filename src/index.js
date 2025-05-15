import Environment from "./environment/Environment.js";
import server from "./app.js";


const port = Environment.port;

server.listen(port, () => {
    console.log('Server listening on: ', port);
});