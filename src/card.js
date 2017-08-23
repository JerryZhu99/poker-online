
var _valuestr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var _suitstr = ["♦", "♣", "♥", "♠"];

var _rankstr = ["High Card", "One Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush"];

export class Card {
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

export class Deck {
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

export class Hand {
    constructor(cards) {
        if (cards.length != 5) throw "Invalid hand size";
        this.cards = cards;
        this.cardsSorted = cards;
        this.cardsSorted.sort(function (a, b) {
            return a.valueOf() - b.valueOf();
        });
        this.rank=-1;
        if(this.rank==-1&&this.calcRoyalFlush())this.rank=9;
        if(this.rank==-1&&this.calcStraightFlush())this.rank=8;
        if(this.rank==-1&&this.calcFourOfAKind())this.rank=7;
        if(this.rank==-1&&this.calcFullHouse())this.rank=6;
        if(this.rank==-1&&this.calcFlush())this.rank=5;
        if(this.rank==-1&&this.calcStraight())this.rank=4;
        if(this.rank==-1&&this.calcThreeOfAKind())this.rank=3;
        if(this.rank==-1&&this.calcTwoPair())this.rank=2;
        if(this.rank==-1&&this.calcOnePair())this.rank=1;
        if(this.rank==-1)this.rank=0;
    }

    get rankstr(){
        return _rankstr[this.rank];
    }

    calcRoyalFlush() {
        for (var i = 0; i < 5; i++)
            if (this.cardsSorted[i].value != i + 8) return false;
        for (var i = 1; i < 5; i++)
            if (this.cardsSorted[i].suit != this.cardsSorted[i - 1].suit) return false;
        return true;
    }

    calcStraightFlush() {
        for (var i = 1; i < 5; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i - 1].value + 1) return false;
        for (var i = 1; i < 5; i++)
            if (this.cardsSorted[i].suit != this.cardsSorted[i - 1].suit) return false;
        return true;
    }

    calcFourOfAKind() {
        if (this._calcFourOfAKind(0)) return true;
        if (this._calcFourOfAKind(1)) return true;
        return false;
    }

    _calcFourOfAKind(s) {
        for (var i = s; i < s + 3; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i + 1].value) return false;
        return true;
    }

    calcFullHouse() {
        if (this._calcFullHouse(1)) return true;
        if (this._calcFullHouse(2)) return true;
        return false;
    }

    _calcFullHouse(s) {
        for (var i = 0; i < s; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i + 1].value) return false;
        for (var i = s + 1; i < 4; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i + 1].value) return false;
        return true;
    }

    calcFlush() {
        for (var i = 1; i < 5; i++)
            if (this.cardsSorted[i].suit != this.cardsSorted[i - 1].suit) return false;
        return true;
    }

    calcStraight() {
        for (var i = 1; i < 5; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i - 1].value + 1) return false;
        return true;
    }

    calcThreeOfAKind() {
        if (this._calcThreeOfAKind(0)) return true;
        if (this._calcThreeOfAKind(1)) return true;
        if (this._calcThreeOfAKind(2)) return true;
        return false;
    }

    _calcThreeOfAKind(s) {
        for (var i = s; i < s + 2; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i + 1].value) return false;
        return true;
    }

    calcTwoPair() {
        if (this._calcTwoPair(0, 2)) return true;
        if (this._calcTwoPair(0, 3)) return true;
        if (this._calcTwoPair(1, 3)) return true;
        return false;
    }

    _calcTwoPair(a, b) {
        if (this.cardsSorted[a].value != this.cardsSorted[a + 1].value) return false;
        if (this.cardsSorted[b].value != this.cardsSorted[b + 1].value) return false;
        return true;
    }

    calcOnePair() {
        if (this._calcOnePair(0)) return true;
        if (this._calcOnePair(1)) return true;
        if (this._calcOnePair(2)) return true;
        if (this._calcOnePair(3)) return true;
        return false;
    }

    _calcOnePair(a) {
        return this.cardsSorted[a].value == this.cardsSorted[a + 1].value;
    }

}

// test
/*
d=new Deck();
while(d.cards.length>0){
    card = d.draw();
    console.log(card.valuestr+ " "+card.suitstr+" "+card.valueOf());
}*/
