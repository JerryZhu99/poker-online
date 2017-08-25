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
        io.messages[0].data.players.should.not.include.any.keys("io", "cards");
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
        table.currentPlayer.should.equal(1)
        table.playerRaised(100);
        table.players[1].chips.should.equal(900);
    });
    it('should allow the next player to raise', () => {
        table.currentPlayer.should.equal(0)
        table.playerRaised(100);
        table.players[0].chips.should.equal(800);
    });
    it('should allow the next player to check', () => {
        table.currentStage.should.equal(0);
        table.currentPlayer.should.equal(1)
        table.playerChecked();
        table.players[1].chips.should.equal(800);
    });
    it('should move to next stage', () => {
        table.currentStage.should.equal(1);
        table.table.length.should.equal(3);
    });
    it('should allow the player 0 to check', () => {
        table.currentPlayer.should.equal(0)
        table.playerChecked();
        table.players[0].chips.should.equal(800);
    });
    it('should allow the player 1 to check', () => {
        table.currentPlayer.should.equal(1)
        table.playerChecked();
        table.players[1].chips.should.equal(800);
    });
    it('should move to next stage', () => {
        table.currentStage.should.equal(2);
        table.table.length.should.equal(4);
    });

    it('get winner', () => {
        var table1 = new Table();
        table1.addPlayer({ id: "player0" });
        table1.addPlayer({ id: "player1" });
        table1.addPlayer({ id: "player2" });
        table1.addPlayer({ id: "player3" });
        table1.players.length.should.equal(4);
        // example case from
        // https://en.wikipedia.org/wiki/Texas_hold_%27em
        table1.table = [new Card(2, 1), new Card(11, 3), new Card(2, 2), new Card(6, 3), new Card(5, 3)];
        table1.players[0].id.should.equal("player0");
        table1.players[1].id.should.equal("player1");
        table1.players[2].id.should.equal("player2");
        table1.players[3].id.should.equal("player3");

        table1.players[0].playing = table1.players[1].playing = table1.players[2].playing = table1.players[3].playing = true;
        table1.players[0].isFolded = table1.players[1].isFolded = table1.players[2].isFolded = table1.players[3].isFolded = false;

        table1.players[0].cards = [new Card(12, 1), new Card(2, 0)];
        table1.players[1].cards = [new Card(12, 3), new Card(7, 3)];
        table1.players[2].cards = [new Card(11, 2), new Card(11, 0)];
        table1.players[3].cards = [new Card(3, 0), new Card(4, 0)];

        var w = table1.getWinners();
        w.length.should.equal(1);
        w[0].cards.should.deep.include(new Card(2, 1));
        w[0].cards.should.deep.include(new Card(2, 2));
        w[0].cards.should.deep.include(new Card(11, 3));
        w[0].cards.should.deep.include(new Card(11, 2));
        w[0].cards.should.deep.include(new Card(11, 0));
    });

});