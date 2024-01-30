import express from 'express';
import { Server, createServer } from 'http';
import { Server as Io } from 'socket.io';

class App {
    public app: express.Application;
    public server: Server;
    private socketIo: Io;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new Io(this.server, {
            cors: {
                origin: '*',
            }
        });

        // ao conectar no socket.io, exibe no console
        this.socketIo.on('connection' , (socket) => {
            console.log('New client connected');

            // ao desconectar no socket.io, exibe no console
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });

            socket.on('message', (message) => {
                //envia a mensagem para todos, menos para quem esta enviando
               socket.broadcast.emit('message', message);
            });
        })
    }
}

export default App;
