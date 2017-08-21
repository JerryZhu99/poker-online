const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('dist'));

app.get('/api', function(req, res){
    res.send("/api");
})

var users = 0;
io.on('connection', function(socket){
    users++;
    io.emit('message', "User connected: "+users+" users online");

    socket.on('random card', function(){
        socket.emit('random card', {
            suit: ["♠","♥","♦","♣"][Math.floor(Math.random()*4)],
            value: ["A","2","3","4","5","6","7","8","9","10","J","Q","K"][Math.floor(Math.random()*13)]            
        })
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