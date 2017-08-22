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
        if(this.rank==-1&&calcRoyalFlush())this.rank=9;
        if(this.rank==-1&&calcStraightFlush())this.rank=8;
        if(this.rank==-1&&calcFourOfAKind())this.rank=7;
        if(this.rank==-1&&calcFullHouse())this.rank=6;
        if(this.rank==-1&&calcFlush())this.rank=5;
        if(this.rank==-1&&calcStraight())this.rank=4;
        if(this.rank==-1&&calcThreeOfAKind())this.rank=3;
        if(this.rank==-1&&calcTwoPair())this.rank=2;
        if(this.rank==-1&&calcOnePair())this.rank=1;
        if(this.rank==-1)this.rank=0;
    }

    calcRoyalFlush() {
        for (var i = 0; i < 5; i++)
            if (this.cardsSorted[i].value != i + 5) return false;
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
        if (calcFourOfAKind(0)) return true;
        if (calcFourOfAKind(1)) return true;
        return false;
    }

    calcFourOfAKind(s) {
        for (var i = s; i < s + 4; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i + 1].value) return false;
        return true;
    }

    calcFullHouse() {
        if (calcFullHouse(2)) return true;
        if (calcFullHouse(3)) return true;
        return false;
    }

    calcFullHouse(s) {
        for (var i = 0; i < s; i++)
            if (this.cardsSorted[i].value != this.cardsSorted[i + 1].value) return false;
        for (var i = s; i < 4; i++)
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
    }

    calcThreeOfAKind() {
        if (calcThreeOfAKind(0)) return true;
        if (calcThreeOfAKind(1)) return true;
        if (calcThreeOfAKind(2)) return true;
        return false;
    }

    calcThreeOfAKind(s) {
        for (var i = s; i < s + 2; i++)
            if (this.cardsSorted[i].value != cardsSorted[i + 1].value) return false;
        return true;
    }

    calcTwoPair() {
        if (calcTwoPair(0, 2)) return true;
        if (calcTwoPair(0, 3)) return true;
        if (calcTwoPair(1, 3)) return true;
        return false;
    }

    calcTwoPair(a, b) {
        if (this.cardsSorted[a].value != cardsSorted[a + 1].value) return false;
        if (this.cardsSorted[b].value != cardsSorted[b + 1].value) return false;
        return true;
    }

    calcOnePair() {
        if (calcOnePair(0)) return true;
        if (calcOnePair(1)) return true;
        if (calcOnePair(2)) return true;
        if (calcOnePair(3)) return true;
        return false;
    }

    calcOnePair(a) {
        if (this.cardsSorted[a].value != cardsSorted[a + 1].value) return false;
        return false;
    }

}

// test
/*
d=new Deck();
while(d.cards.length>0){
    card = d.draw();
    console.log(card.valuestr+ " "+card.suitstr+" "+card.valueOf());
}*/