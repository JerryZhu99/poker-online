import "./assets/styles.css";

import io from "socket.io-client";
import Vue from "vue";

var socket = io();

var app = new Vue({
    el: '#app',
    data: {
        messages: ["Start of messages"]
    }
});

socket.on('message', function(data){
    app.messages.push(data);
});
