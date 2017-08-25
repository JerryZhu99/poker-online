import Card from "card";
import Deck from "deck";
import Hand from "hand";

export default class Table {
    constructor(io) {
        this.players = [];
        this.currentRound = -1;
        this.io = io;
    }

    addPlayer(player, io) {
        player.io = io;
        player.chips = 1000;
        this.players.push(player);
    }
    // winner is decided
    newRound() {
        this.playersPlaying = this.players.length;
        this.currentRound++;
        this.pot = 0;
        this.table = [];
        this.currentStage = -1;
        this.playersFolded = 0;
        this.playersAllIned = 0;
        this.deck = new Deck();
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].cards = [this.deck.draw(), this.deck.draw()];
            this.players[i].playing = true;
        }
        this.nextStage();
    }

    endRound() {
        // decide winner
        this.newRound();
    }

    // pre flop, flop, river, or turn
    nextStage() {
        this.currentStage++;

        if (this.currentStage == 1) {
            this.table.push(this.deck.draw());
            this.table.push(this.deck.draw());
            this.table.push(this.deck.draw());
        }
        if (this.currentStage == 2 || this.currentStage == 3) {
            this.table.push(this.deck.draw());
        }
        if (this.currentStage == 4) {
            this.endRound();
        }

        this.minBet = 1;
        this.currentPlayer = this.currentRound % this.players.length;
        this.playersChecked = 0;
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].stageBet = 0;
            this.players[i].stageRaised = 0;
        }
        this.nextPlayer();
    }

    synchronize() {
        let data = Object.assign({}, this);
        delete data.deck;
        delete data.io;
        data.players = Object.assign([], data.players);
        data.players.forEach(function (player) {
            player = Object.assign({}, player);
            delete player.io;
            delete player.cards;
        });
        this.io.emit("update", data);
    }
    requestAction() {
        let player = this.players[this.currentPlayer];
        player.io.emit("your turn", {});
    }

    playerChecked() {
        let player = this.players[this.currentPlayer];
        var diff = this.minBet - player.stageBet;
        this.playerBet(diff);

        this.playersChecked++;

        this.nextPlayer();
    }

    playerRaised(amount) {
        let player = this.players[this.currentPlayer];
        if (player.stageRaised > amount && amount < player.chips) throw new Error("need to raise at least as much as previous raise");

        var diff = this.minBet - player.stageBet;
        this.playerBet(diff + amount);
        player.stageRaised = amount;
        this.minBet += amount;

        this.playersChecked = 1;

        this.nextPlayer();
    }

    playerBet(amount) {
        let player = this.players[this.currentPlayer];
        if (player.chips <= amount) {
            player.chips = 0;
            this.playersAllIned++;
            this.pot += player.chips;
            player.stageBet += player.chips;
            return;
        }
        player.chips -= amount;
        player.stageBet += amount;
        this.pot += amount;
    }

    playerFolded(player) {
        player.playing = false;
        this.playersFolded++;
        this.nextPlayer();
    }

    nextPlayer() {
        if (this.playersFolded + this.playersChecked + this.playersAllIned == this.playersPlaying) {
            this.nextStage();
            return;
        }
        var next = this.currentPlayer;
        while (true) {
            next = (next + 1) % this.players.length;
            if (this.players[next].playing && !this.players[next].isFolded && !this.players[next].isAllIned) break;
            if (next == this.currentPlayer) "something wrong with getting next player";
        }
        this.currentPlayer = next;
        this.synchronize();
        this.requestAction(this.players[this.currentPlayer]);
    }
}