import Card from "card";
import Deck from "deck";
import Hand from "hand";

export default class Table {
    constructor() {
        this.players = [];
        this.currentRound = -1;
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
        var winningHands = this.getWinners();
        var winners = [];
        for (var i = 0; i < winningHands.length; i++) {
            winners.push(winningHands[i].player);
        }
        var winnersSet = new Set(winners);
        for (let winner of winnersSet) {
            for(var i=0;i<this.players.length;i++)
                if(this.players[i].id==winner.id)
                    this.players[i].chips += Math.floor(this.pot / winnersSet.size);
        }
        this.newRound();
    }

    getWinners() {
        if (this.table.length != 5) throw "attempted to get winner without full table";
        var hands = [];
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].playing && !this.players[i].isFolded) {
                var playerHands = Hand.getHands(this.table.concat(this.players[i].cards));
                for (var j = 0; j < playerHands.length; j++) {
                    var playerHand = playerHands[j];
                    playerHand.player = this.players[i];
                    hands.push(playerHand);
                }
            }
        }
        return Hand.max(hands);
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

        this.minBet = 0;
        this.currentPlayer = this.currentRound % this.players.length;
        this.playersChecked = 0;
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].stageBet = 0;
            this.players[i].stageRaised = 0;
        }
        this.nextPlayer();
    }

    synchronize(state) {
        if(state){
            this.playersPlaying = state.playersPlaying;
            this.currentRound = state.currentRound;
            this.pot = state.pot;
            for(let i=0;i<state.table.length;i++){
                let card = state.table[i];
                state.table[i] = new Card(card.value, card.suit);
            }
            this.table = state.table;

            this.currentStage = state.currentStage;
            this.playersFolded = state.playersFolded;
            this.playersAllIned = state.playersAllIned;
            return;
        }
        let data = {};
        data.playersPlaying = this.playersPlaying;
        data.currentRound = this.currentRound;
        data.pot = this.pot;
        data.table = this.table;
        data.currentStage = this.currentStage;
        data.playersFolded = this.playersFolded;
        data.playersAllIned = this.playersAllIned;
        data.players = [];
        this.players.forEach(function (player) {
           data.players.push({
               id:player.id,
               playing: player.playing,
               chips: player.chips,
               stageBet: player.stageBet,
               stageRaise: player.stageRaised,
            });
        });
        return data;
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
        if (player.stageRaised > 0) throw new Error("already raised");

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

    playerFolded() {
        let player = this.players[this.currentPlayer];
        player.playing = false;
        this.playersFolded++;
        this.nextPlayer();
    }

    nextPlayer() {
        if(this.players.length == 0) return;                
        if (this.playersFolded + this.playersChecked + this.playersAllIned == this.playersPlaying) {
            this.nextStage();
            return;
        }
        if (this.playersFolded == this.playersPlaying) {
            this.endRound();
            return;
        }
        var next = this.currentPlayer;
        while (true) {
            next = (next + 1) % this.players.length;
            if (this.players[next].playing && !this.players[next].isFolded && !this.players[next].isAllIned) break;
            if (next == this.currentPlayer) throw "something wrong with getting next player";
        }
        this.currentPlayer = next;
    }
    
    getCurrentPlayer(){
        return this.players[this.currentPlayer];
    }
    isCurrentPlayer(player){
        return this.getCurrentPlayer().id == player.id
    }
}