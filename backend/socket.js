import { Server } from 'socket.io';

function configureSocket(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Novo cliente conectado:', socket.id);
    
        // Evento para lidar com mensagens do cliente
        socket.on('message', (data) => {
            console.log('Mensagem do usuário recebida:', data);
            // Processar a mensagem e enviá-la para o admin
            io.emit('adminMessage', { text: 'Nova mensagem do usuário'});
            console.log('Mensagem enviada para o admin');
        });
    
        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });

    return io;
}

export default configureSocket;