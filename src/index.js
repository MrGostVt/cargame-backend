import server from "./app";
import Environment from "./environment/Environment";


const port = Environment.port;

server.listen(port, () => {
    console.log('Server listening on: ', port);
});