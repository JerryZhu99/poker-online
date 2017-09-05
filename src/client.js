import "normalize.css";
import "assets/styles.css";
import "assets/felt.png";
import io from "socket.io-client";
import Vue from "vue";
import Table from "texas";
import Card from "card";
import CardComponent from "card.vue";

export const socket = io();
export const table = new Table();
table.addPlayer(socket);
table.check = function(){
    socket.emit("check");
}
table.raise = function(amount){
    socket.emit("raise", amount)
}
table.fold = function(){
    socket.emit("fold");
}
table.newRound();
Vue.component("card", CardComponent)
export const view = new Vue({
    el: '#wrapper',
    data: {
        messages: ["Start of messages"],
        newMessage: "",
        table: table,
        raiseOther:false,
        raiseAmount:100
    },
    computed: {
        player: function(){
            return this.table.players.find((p) => (p.id == socket.id))
        }
    }
});

/*
document.getElementById("check").addEventListener("click", table.check);
document.getElementById("raise").addEventListener("click", table.raise);
document.getElementById("fold").addEventListener("click", table.fold);
*/

socket.on("cards", function(data){
    view.player.cards = [];    
    data.forEach(function(card) {
        view.player.cards.push(new Card(card.value, card.suit));
    }, this);
    console.log(data);
});

socket.on("update", function (data) {
    console.log(data);
    let cards = view.player.cards;
    view.table.synchronize(data);
    view.player.cards = cards;
});
socket.on("result", function (data) {
    view.table.synchronize(data);    
});
    

function send(event) {
    if(view.newMessage[0]=="/"){
        let data = view.newMessage.split(" ");
        let command = data.splice(0, 1)[0].split("").slice(1).join("");
        console.log("Command:"+command)
        socket.emit(command, ...data);
        view.newMessage = "";        
    }else{
        socket.emit("message", view.newMessage);
        view.newMessage = "";
    }
}

document.getElementById("send").addEventListener("submit", send);

socket.on('message', function (data) {
    view.messages.push(data);
    Vue.nextTick(function(){
        let messages = document.querySelector("#messages");
        messages.scrollTop = messages.scrollHeight;
    });
});