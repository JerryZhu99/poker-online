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
table.onStart = function(){
    io.emit("update", table.synchronize());        
    this.players.forEach(function(player) {
        player.emit("cards", player.cards);
    }, this);
}
table.onEnd = function(){
    io.emit("result", table.synchronize());            
    setTimeout(function(){
        table.newRound();
    }, 5000)
}
table.newRound();
io.on('connection', function(socket){
    users++;
    table.addPlayer(socket);
    table.newRound();
    io.emit("update", table.synchronize());
    
    io.emit('message', "User connected: "+users+" users online");
    socket.on('username', function(name){
        socket.username = name;
        io.emit("update", table.synchronize());        
    });
    socket.on('message', function(message){
        let name = socket.username?socket.username:"Guest";
        io.emit('message', `${name}: ${message}`);
    })
    socket.on('check', function(){
        if(!table.isCurrentPlayer(socket)){
            socket.emit("message", "Error: Not your turn.");
            return;
        }
        table.playerChecked();
        let name = socket.username?socket.username:"Guest";        
        io.emit("message", `${name} checked`);
        io.emit("update", table.synchronize());
    })
    socket.on('raise', function(amount){
        if(!table.isCurrentPlayer(socket)){
            socket.emit("message", "Error: Not your turn.");
            return;
        }
        if (socket.stageRaised > 0){
            socket.emit("message", "Error: You already raised.");            
        }
        amount = Number(amount);
        if(isNaN(amount)){
            socket.emit("message", "Error: Raise is not a number.");                
            return;
        }
        if(amount <= 0){
            socket.emit("message", "Error: Raise is less than 1.");
        }

        table.playerRaised(amount);
        let name = socket.username?socket.username:"Guest";                
        io.emit("message", `${name} raised by ${amount}`)            
        io.emit("update", table.synchronize());
    })
    socket.on('fold', function(){
        if(!table.isCurrentPlayer(socket)){
            socket.emit("message", "Error: Not your turn.");
            return;
        }
        table.playerFolded();
        let name = socket.username?socket.username:"Guest";                        
        io.emit("message", `${name} folded`)            
        io.emit("update", table.synchronize());
    })
    socket.on('disconnect', function(){
        users--;
        table.removePlayer(socket);
        io.emit('message', "User disconnected: "+users+" users online");        
    });
});

http.listen(8080, function(){
    console.log('App listening on port 8080');
})