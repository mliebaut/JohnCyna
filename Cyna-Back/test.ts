import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

console.log("Server");

function server_start() {
    try {
        console.log("Starting app..");
        const appHostname = process.env.APP_HOSTNAME || "127.0.0.1";
        const appPort = Number(process.env.APP_API_PORT) || 3001;
        console.log(`Serveur démarré : http://${appHostname}:${appPort}`);
        console.log('Ready.');
    } catch (exception) {
        console.log("Stopping due to error.");
        console.error(exception);
    }
}

server_start();
