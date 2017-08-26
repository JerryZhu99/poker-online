import express from 'express';
export const app = express();
import httpModule from 'http';
const http = httpModule.Server(app);
import socketIO from 'socket.io';
const io = socketIO(http);

import Deck from 'deck';

app.use(express.static('dist'));

app.get('/api', function(req, res){
    res.send("/api");
})

export var users = 0;
io.on('connection', function(socket){
    users++;
    io.emit('message', "User connected: "+users+" users online");

    var d=new Deck();
    socket.on('random card', function(){
        socket.emit('random card', d.draw().view());
    })

    socket.on('message', function(message){
        io.emit('message', "Message: " + message);
        io.emit('message', "Reverse: " + message.split("").reverse().join(""));
    })

    socket.on('disconnect', function(){
        users--;
        io.emit('message', "User disconnected: "+users+" users online");        
    });
});

http.listen(8080, function(){
    console.log('App listening on port 8080');
})