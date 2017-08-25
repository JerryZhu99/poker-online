
const _valuestr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const _suitstr = ["♦", "♣", "♥", "♠"];

export default class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    get valuestr() {
        return _valuestr[this.value];
    }

    get suitstr() {
        return _suitstr[this.suit];
    }

    valueOf() {
        return this.value * 4 + this.suit;
    }

    view() {
        return { value: this.valuestr, suit: this.suitstr };
    }
}

