import "normalize.css";
import "assets/styles.css";
import "assets/felt.png";
import io from "socket.io-client";
import Vue from "vue";
import Table from "texas";

export const socket = io();
export const table = new Table();
table.requestAction = function(){};

table.players.push({id:socket.id});
table.check = function(){
    socket.emit("check");
}
table.raise = function(){
    socket.emit("raise")
}
table.fold = function(){
    socket.emit("fold");
}
table.newRound();
export const view = new Vue({
    el: '#wrapper',
    data: {
        messages: ["Start of messages"],
        newMessage: "",
        table: table
    }
});


document.getElementById("check").addEventListener("click", table.check);
document.getElementById("raise").addEventListener("click", table.raise);
document.getElementById("fold").addEventListener("click", table.fold);

socket.on("update", function (data) {
    console.log(data);
    view.table.synchronize(data);
})


function send(event) {
    socket.emit("message", view.newMessage);
    view.newMessage = "";
}

document.getElementById("send").addEventListener("submit", send);

socket.on('message', function (data) {
    view.messages.push(data);
});