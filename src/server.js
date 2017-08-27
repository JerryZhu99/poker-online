import express from 'express';
export const app = express();
import httpModule from 'http';
const http = httpModule.Server(app);
import socketIO from 'socket.io';
const io = socketIO(http);

import Deck from 'deck';
import Table from 'texas';

app.use(express.static('dist'));

export var users = 0;

export var table = new Table();
table.newRound();
io.on('connection', function(socket){
    users++;
    table.players.push(socket);
    table.newRound();
    io.emit("update", table.synchronize());
    
    io.emit('message', "User connected: "+users+" users online");

    socket.on('message', function(message){
        io.emit('message', "Message: " + message);
    })
    socket.on('check', function(){
        if(table.isCurrentPlayer(socket)){
            table.playerChecked();
            io.emit("update", table.synchronize());
        }
    })
    socket.on('raise', function(amount){
        if(table.isCurrentPlayer(socket)){
            table.playerRaised(amount);
            io.emit("update", table.synchronize());
        }
    })
    socket.on('fold', function(){
        if(table.isCurrentPlayer(socket)){
            table.playerFolded(amount);
            io.emit("update", table.synchronize());
        }
    })
    socket.on('disconnect', function(){
        users--;
        table.players.splice(table.players.indexOf(socket), 1)
        io.emit('message', "User disconnected: "+users+" users online");        
    });
});

http.listen(8080, function(){
    console.log('App listening on port 8080');
})