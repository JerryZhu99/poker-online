import chai from 'chai';
import {
    Card,
    Deck,
    Hand
} from "card";
chai.should();
describe("Hand Tests", () => {
    it('should run', ()=>{});    
});
describe("Hand", () => {
    it('should exist', () => {
        Hand.should.exist;
    });

    var h=new Hand([new Card(0,0),new Card(1,0),new Card(2,0),new Card(3,0),new Card(5,1)]);
    it('high card', () => {
        h.rank.should.equal(0);
    });

    var h1=new Hand([new Card(1,0),new Card(1,1),new Card(2,0),new Card(3,0),new Card(5,1)]);
    it('one pair', () => {
        h1.rank.should.equal(1);
    });

    var h2=new Hand([new Card(1,0),new Card(1,1),new Card(2,0),new Card(2,2),new Card(5,1)]);
    it('two pair', () => {
        h2.rank.should.equal(2);
    });

    var h3=new Hand([new Card(1,0),new Card(1,1),new Card(0,0),new Card(1,2),new Card(5,1)]);
    it('three of a kind', () => {
        h3.rank.should.equal(3);
    });

    var h4=new Hand([new Card(4,0),new Card(3,3),new Card(7,0),new Card(6,0),new Card(5,1)]);
    console.log(h4.cardsSorted);
    it('straight', () => {
        h4.rank.should.equal(4);
    });

    var h5=new Hand([new Card(2,0),new Card(7,0),new Card(3,0),new Card(4,0),new Card(6,0)]);
    it('flush', () => {
        h5.rank.should.equal(5);
    });

    var h6=new Hand([new Card(2,3),new Card(2,1),new Card(4,3),new Card(4,0),new Card(2,0)]);
    it('full house', () => {
        h6.rank.should.equal(6);
    });

    var h7=new Hand([new Card(2,3),new Card(2,1),new Card(4,3),new Card(2,0),new Card(2,2)]);
    it('four of a kind', () => {
        h7.rank.should.equal(7);
    });

    var h8=new Hand([new Card(2,3),new Card(5,3),new Card(4,3),new Card(3,3),new Card(6,3)]);
    it('straight flush', () => {
        h8.rank.should.equal(8);
    });

    var h9=new Hand([new Card(12,3),new Card(11,3),new Card(9,3),new Card(10,3),new Card(8,3)]);
    it('royal flush', () => {
        h9.rank.should.equal(9);
    });
});