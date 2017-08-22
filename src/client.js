import "normalize.css";
import "assets/styles.css";
import "assets/felt.png";
import io from "socket.io-client";
import Vue from "vue";

var socket = io();

var app = new Vue({
    el: '#wrapper',
    data: {
        messages: ["Start of messages"],
        newMessage: "",
        player: {
            cards: [
                {
                    value: "A",
                    suit: "♠"
                }
            ]
        }
    }
});

function getRandomCard(){
    socket.emit("random card", {}); 
}
document.getElementById("random-card").addEventListener("click", getRandomCard);

socket.on("random card", function(data){
    app.player.cards.push(data);
    console.log(app.player);
})


function send(event){
    socket.emit("message", app.newMessage);
    app.newMessage = "";
}

document.getElementById("send").addEventListener("submit", send);

socket.on('message', function(data){
    app.messages.push(data);
});
