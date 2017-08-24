import "normalize.css";
import "assets/styles.css";
import "assets/felt.png";
import io from "socket.io-client";
import Vue from "vue";

export const socket = io();
export const view = new Vue({
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
    view.player.cards.push(data);
})


function send(event){
    socket.emit("message", view.newMessage);
    view.newMessage = "";
}

document.getElementById("send").addEventListener("submit", send);

socket.on('message', function(data){
    view.messages.push(data);
});
