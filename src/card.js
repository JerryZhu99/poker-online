const _valuestr=["2","3","4","5","6","7","8","9","10","J","Q","K","A"]
const _suitstr=["♦","♣","♥","♠"]

export class Card{
    constructor(value, suit){
        this.value=value;
        this.suit=suit;
    }

    get valuestr(){
        return _valuestr[this.value];
    }

    get suitstr(){
        return _suitstr[this.suit];
    }

    valueOf(){
        return this.value*4+this.suit;
    }
}

export class Deck{
    constructor(){
        this.cards=new Array(52);
        for(var i=0;i<13;i++)for(var j=0;j<4;j++)this.cards[i*4+j]=new Card(i,j);
        this.shuffle();
    }

    shuffle(){
        for(var i=51;i>=0;i--){
            var j=Math.floor(Math.random()*(i+1));
            var temp;
            temp=this.cards[i];
            this.cards[i]=this.cards[j];
            this.cards[j]=temp;
        }
    }

    sort(){
        this.cards.sort(function(a,b){
            return a.valueOf()-b.valueOf();
        });
    }

    draw(){
        return this.cards.pop();
    }
}
