import Card from "card";
export default class Deck {
    constructor() {
        this.cards = new Array(52);
        for (var i = 0; i < 13; i++)for (var j = 0; j < 4; j++)this.cards[i * 4 + j] = new Card(i, j);

        this.shuffle();
    }

    shuffle() {
        for (var i = 51; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp;
            temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    sort() {
        this.cards.sort(function (a, b) {
            return a.valueOf() - b.valueOf();
        });
    }

    draw() {
        return this.cards.pop();
    }
}
