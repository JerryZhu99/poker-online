import express from 'express';
export const app = express();
import httpModule from 'http';
const http = httpModule.Server(app);
import socketIO from 'socket.io';
const io = socketIO(http);
import path from 'path';

import Deck from 'deck';
import Table from 'texas';

app.use(express.static('dist'));
const routes = [
    "/",
    "/games",
    "/game/:id"
]
app.get(routes, (req, res)=>{
    res.sendFile(path.resolve("./dist/index.html"));
});


export var users = 0;

export var games = {};

io.on('connection', function(socket){
    let gameid;
    let table;
    users++;
    
    io.emit('message', "User connected: "+users+" users online");
    io.emit('games', Object.keys(games));
    socket.on('game', function(id){
        socket.leave(gameid);
        socket.join(id);
        if(table){
            table.removePlayer(socket);        
            if(table.players == 0){
                delete games[gameid];
            }
        }
        if(!games[id]){
            games[id] = new Table();
            table = games[id];                            
            table.onStart = function(){
                io.to(id).emit("update", table.synchronize());        
                this.players.forEach(function(player) {
                    player.emit("cards", player.cards);
                }, this);
            }
            table.onEnd = function(){
                io.to(id).emit("result", table.synchronize());            
                setTimeout(function(){
                    table.newRound();
                }, 5000)
            }
        }
        table = games[id];                        
        table.addPlayer(socket);
        games[id].newRound();
        io.to(id).emit("update", games[id].synchronize());        
        gameid = id;
    })
    socket.on('username', function(name){
        socket.username = name;
        io.to(gameid).emit("update", table.synchronize());        
    });
    socket.on('message', function(message){
        let name = socket.username?socket.username:"Guest";
        io.to(gameid).emit('message', `${name}: ${message}`);
    })
    socket.on('check', function(){
        if(!table.isCurrentPlayer(socket)){
            socket.emit("message", "Error: Not your turn.");
            return;
        }
        table.playerChecked();
        let name = socket.username?socket.username:"Guest";        
        io.to(gameid).emit("message", `${name} checked`);
        io.to(gameid).emit("update", table.synchronize());
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
        io.to(gameid).emit("message", `${name} raised by ${amount}`)            
        io.to(gameid).emit("update", table.synchronize());
    })
    socket.on('fold', function(){
        if(!table.isCurrentPlayer(socket)){
            socket.emit("message", "Error: Not your turn.");
            return;
        }
        table.playerFolded();
        let name = socket.username?socket.username:"Guest";                        
        io.to(gameid).emit("message", `${name} folded`)            
        io.to(gameid).emit("update", table.synchronize());
    })
    socket.on('disconnect', function(){
        users--;
        if(table){
            table.removePlayer(socket);
            if(table.players == 0){
                delete games[gameid];
            }
        }
        io.to(gameid).emit('message', "User disconnected: "+users+" users online");        
    });
});

http.listen(8080, function(){
    console.log('App listening on port 8080');
})