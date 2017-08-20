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


function send(event){
    socket.emit("message", app.newMessage);
    app.newMessage = "";
}

document.getElementById("send").addEventListener("submit", send);

socket.on('message', function(data){
    app.messages.push(data);
});
