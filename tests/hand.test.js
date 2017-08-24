import chai from 'chai';
import {
    Card,
    Deck,
    Hand
} from "card";
chai.should();
describe("Hand Tests", () => {
    it('should run', () => { });
});
describe("Hand", () => {
    it('should exist', () => {
        Hand.should.exist;
    });

    var h = new Hand([new Card(0, 0), new Card(1, 0), new Card(2, 0), new Card(3, 0), new Card(5, 1)]);
    it('high card', () => {
        h.rank.should.equal(0);
    });
    it('high card major', () => {
        h.major.should.deep.equal([5, 3, 2, 1, 0]);
    });

    var h1 = new Hand([new Card(1, 0), new Card(1, 1), new Card(2, 0), new Card(3, 0), new Card(5, 1)]);
    it('one pair', () => {
        h1.rank.should.equal(1);
    });
    it('one pair major', () => {
        h1.major.should.deep.equal([1, 5, 3, 2]);
    });

    var h2 = new Hand([new Card(1, 0), new Card(1, 1), new Card(2, 0), new Card(2, 2), new Card(5, 1)]);
    it('two pair', () => {
        h2.rank.should.equal(2);
    });
    it('two pair major', () => {
        h2.major.should.deep.equal([2, 1, 5]);
    });

    var h3 = new Hand([new Card(1, 0), new Card(1, 1), new Card(0, 0), new Card(1, 2), new Card(5, 1)]);
    it('three of a kind', () => {
        h3.rank.should.equal(3);
    });
    it('three of a kind major', () => {
        h3.major.should.deep.equal([1, 5, 0]);
    });

    var h4 = new Hand([new Card(4, 0), new Card(3, 3), new Card(7, 0), new Card(6, 0), new Card(5, 1)]);
    it('straight', () => {
        h4.rank.should.equal(4);
    });
    it('straight major', () => {
        h4.major.should.deep.equal([7]);
    });

    var h5 = new Hand([new Card(2, 0), new Card(7, 0), new Card(3, 0), new Card(4, 0), new Card(6, 0)]);
    it('flush', () => {
        h5.rank.should.equal(5);
    });
    it('flush major', () => {
        h5.major.should.deep.equal([7, 6, 4, 3, 2]);
    });

    var h6 = new Hand([new Card(2, 3), new Card(2, 1), new Card(4, 3), new Card(4, 0), new Card(2, 0)]);
    it('full house', () => {
        h6.rank.should.equal(6);
    });
    it('full house major', () => {
        h6.major.should.deep.equal([2, 4]);
    });

    var h7 = new Hand([new Card(2, 3), new Card(2, 1), new Card(4, 3), new Card(2, 0), new Card(2, 2)]);
    it('four of a kind', () => {
        h7.rank.should.equal(7);
    });
    it('four of a kind major', () => {
        h7.major.should.deep.equal([2, 4]);
    });

    var h8 = new Hand([new Card(2, 3), new Card(5, 3), new Card(4, 3), new Card(3, 3), new Card(6, 3)]);
    it('straight flush', () => {
        h8.rank.should.equal(8);
    });
    it('straight flush major', () => {
        h8.major.should.deep.equal([6]);
    });

    var h9 = new Hand([new Card(12, 3), new Card(11, 3), new Card(9, 3), new Card(10, 3), new Card(8, 3)]);
    it('royal flush', () => {
        h9.rank.should.equal(9);
    });
    it('royal flush major', () => {
        h9.major.should.deep.equal([]);
    });
});