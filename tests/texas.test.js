import chai from 'chai';
import Card from "card";
import Deck from "deck";
import Table from "texas";
chai.should();



describe("Texas Game", () => {
    it('should exist', () => {
        Table.should.exist;
    });

    let io = {
        messages: [],
        emit: function (message, data) {
            this.messages.push({
                message: message,
                data: data
            });
        }
    };
    let socket = {
        messages: [],
        emit: function (message, data) {
            this.messages.push({
                message: message,
                data: data
            });
        }
    };
    let socket2 = {
        messages: [],
        emit: function (message, data) {
            this.messages.push({
                message: message,
                data: data
            });
        }
    };
    let player = {
        id: "test1"
    };
    let player2 = {
        id: "test2"
    };
    let table;

    it('should add a player', () => {
        table = new Table(io);
        table.addPlayer(player, socket);
        table.addPlayer(player2, socket2);
    });

    it('should send the table state', () => {
        table.newRound();
        io.messages[0].message.should.equal("update");
        io.messages[0].data.should.contain.all.keys(
            "currentPlayer", "currentRound", "currentStage", "minBet", "players", "playersAllIned", "playersChecked", "playersFolded", "playersPlaying", "pot", "table");
    });
    it('should not send sockets and player cards', () => {
        table.newRound();
        io.messages[0].message.should.equal("update");
        io.messages[0].data.should.not.contain.keys("io", "deck");
        io.messages[0].data.players.should.not.include.any.keys("io","cards");
    });
    it('should wait for the current player', () => {
        socket.messages.should.deep.contain({
            message: "your turn",
            data: {}
        });
    });
    it('should allow the current player to check', () => {
        table.playerChecked();
        table.currentPlayer.should.equal(1)
    });
    it('should wait for the next player', () => {
        socket2.messages.should.deep.contain({
            message: "your turn",
            data: {}
        });
    });
    it('should allow the next player to raise', () => {
        table.playerRaised(100);
        table.currentPlayer.should.equal(1)
    });
});