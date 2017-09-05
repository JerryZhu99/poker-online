<template>
    <div id="wrapper" class="container-fluid">
        <div id="opponents">
            <div class="opponent" v-for="opponent in table.players" v-if="opponent.id != player.id">
                <div class="card-container">
                    <card :card="card" v-for="card in opponent.cards"></card>
                </div>
                <div class="opponent-info">
                    <span>{{opponent.username?opponent.username:"Guest"}}: {{opponent.chips}}</span>
                    <span class="turn" v-if="table.getCurrentPlayer() == opponent"></span>
                </div>
            </div>
        </div>
        <div id="table">
            <div id="table-cards">
                <div class="card-container">
                    <card :card="card" v-for="card in table.table"></card>
                </div>
                <div id="pot">
                    <span>Pot: {{table.pot}}</span>
                </div>
            </div>
        </div>
        <div id="player">
            <div id="player-cards">
                <div class="card-container">
                    <card :card="card" v-for="card in player.cards"></card>
                </div>
            </div>
            <div id="actions">
                <div id="player-info">
                    {{player.username?player.username:"You"}}: {{player.chips}}
                    <span class="turn" v-if="table.getCurrentPlayer() == player"></span>
                </div>
                <input type="button" value="Check" v-on:click="table.check()">
                <div v-if="raiseOther">
                    <input type="text" v-model="raiseAmount">
                    <input type="button" value="Raise" v-on:click="table.raise(raiseAmount); raiseOther=false">
                    <input type="button" value="Cancel" v-on:click="raiseOther = false">
                </div>
                <div v-else>
                    <input type="button" value="Raise 100" v-on:click="table.raise(100)">
                    <input type="button" value="Raise 200" v-on:click="table.raise(200)">
                    <input type="button" value="Raise Other" v-on:click="raiseOther = true">
                </div>

                <input type="button" value="Fold" v-on:click="table.fold()">
            </div>
            <div id="message-container">
                <div id="messages">
                    <p class="message" v-for="message in messages">{{message}}</p>
                </div>
                <form id="send" name="send" onsubmit="return false" v-on:submit="send">
                    <input type="text" v-model="newMessage">
                    <input type="submit" value="Send">
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import "felt.png";
    import Vue from "vue";
    import Table from "texas";
    import Card from "card";
    import CardComponent from "card.vue";
    import socket from "network";
    export var table = new Table();
    table.addPlayer(socket);
    table.check = function () {
        socket.emit("check");
    }
    table.raise = function (amount) {
        socket.emit("raise", amount)
    }
    table.fold = function () {
        socket.emit("fold");
    }
    table.newRound();
    Vue.component("card", CardComponent);
    export const view = {
        messages: ["Start of messages"],
        newMessage: "",
        table: table,
        raiseOther: false,
        raiseAmount: 100,

    };
    export default {
        data: () => (view),
        computed: {
            player: function () {
                return this.table.players.find((p) => (p.id == socket.id))
            }
        },
        methods:{
            send(event) {
                if (view.newMessage[0] == "/") {
                    let data = view.newMessage.split(" ");
                    let command = data.splice(0, 1)[0].split("").slice(1).join("");
                    console.log("Command:" + command)
                    socket.emit(command, ...data);
                    view.newMessage = "";
                } else {
                    socket.emit("message", view.newMessage);
                    view.newMessage = "";
                }
            }
        },
        created() {
            var view = this;
            socket.on("cards", function (data) {
                view.player.cards = [];
                data.forEach(function (card) {
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


            socket.on('message', function (data) {
                view.messages.push(data);
                Vue.nextTick(function () {
                    let messages = document.querySelector("#messages");
                    messages.scrollTop = messages.scrollHeight;
                });
            });
        }
    }
</script>
<style scoped>
    * {
        box-sizing: border-box;
    }

    #wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: "Open Sans", sans-serif;
    }

    #wrapper {
        background-color: #085D14;
        position: relative;
        box-shadow: inset 0 2em 16em 2em rgba(0, 0, 0, 0.5);
    }

    #wrapper::after {
        content: "";
        background-image: url(assets/felt.png);
        opacity: 0.5;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
        /* Background pattern from Subtle Patterns */
    }

    .card-container {
        display: flex;
    }

    #opponents,
    #table,
    #player {
        width: 100%;
        padding: 10px;
        display: flex;
        align-content: stretch;
    }

    #opponents {
        height: 30%;
        justify-content: space-between;
    }

    .opponent {
        flex: 0;
    }

    #table {
        height: 40%;
        align-items: center;
        justify-content: space-around;
    }

    #table-cards {
        flex: 1;
        max-width: 50%
    }

    #player {
        height: 30%;
    }

    #player-cards {
        flex: 1;
    }

    #actions {
        display: flex;
        flex-direction: column;
    }

    .opponent-info,
    #pot,
    #player-info {
        font-size: 2vw;
        color: #FFFFFF;
    }

    .turn {
        display: inline-block;
        width: 2vw;
        height: 2vw;
        border-radius: 1vw;
        background-color: #16DB32
    }

    @media (min-width: 1000px) {
        .opponent-info,
        #pot,
        #player-info {
            text-align: center;
            font-size: 20px;
        }
        .turn {
            width: 20px;
            height: 20px;
            border-radius: 10px;
        }
    }


    #message-container {
        flex: 1;
        border: 1px solid #FFFFFF;
        border-radius: 10px;
        padding: 10px;
        font-size: 14pt;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        flex-basis: stretch;
    }

    #messages {
        flex: 1;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .message {
        color: #FFFFFF;
        margin: 0;
    }

    #send {
        flex: none;
        display: flex;
        margin-top: auto;
        border-radius: 10px;
        overflow: hidden;
    }

    #send>input[type=text] {
        flex: 1;
    }

    input {
        box-sizing: border-box;
        height: 40px;
    }
</style>