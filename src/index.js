import app from "./app";

const port = Environment.port;

app.listen(port, () => {
    console.log('Server listening on: ', port);
});