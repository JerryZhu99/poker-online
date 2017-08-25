import {
    Card,
    Deck,
    Hand,
    compareHands,
    maxHands
} from "card";

export class Table {
    constructor() {
        this.players = [];
        this.currentRound = -1;
        this.newRound();
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
            players[i].cards = [this.deck.draw(), this.deck.draw()];
            players[i].playing = true;
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
        this.currentPlayer = this.currentRound - 1;
        this.playersChecked = 0;
        for (var i = 0; i < this.players.length; i++) {
            players[i].stageBet = 0;
            players[i].stageRaised = 0;
        }
        this.nextPlayer();
    }

    requestAction(player) {

    }

    playerChecked(player) {
        var diff = this.minBet - player.stageBet;
        this.playerBet(diff);

        this.playersChecked++;

        this.nextPlayer();
    }

    playerRaised(player, amount) {
        if (player.stageRaised < amount && amount < player.chips) throw "need to raise at least as much as previous raise";

        var diff = this.minBet - player.stageBet;
        this.playerBet(diff + amount);
        player.stageRaised = amount;
        this.minBet += amount;

        this.playersChecked = 1;

        this.nextPlayer();
    }

    playerBet(player, amount) {
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
        var next = -1;
        while (true) {
            next = (this.currentPlayer + 1) % this.players.length;
            if (this.players[next].isPlaying) break;
            if (next == this.currentPlayer) break;
        }
        if (next == this.currentPlayer) throw "something wrong with getting next player";
        this.currentPlayer = next;
        this.requestAction(this.players[this.currentPlayer]);
    }
}