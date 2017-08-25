import chai from 'chai';
import Card from "card";
import Deck from "deck";
import Hand from "hand";
chai.should();
describe("Hand", () => {
    it('should exist', () => {
        Hand.should.exist;
    });

    var h = new Hand([new Card(0, 0), new Card(1, 0), new Card(2, 0), new Card(3, 0), new Card(5, 1)]);
    it('high card', () => {
        h.rank.should.equal(0);
        h.major.should.deep.equal([5, 3, 2, 1, 0]);
    });

    var h1 = new Hand([new Card(1, 0), new Card(1, 1), new Card(2, 0), new Card(3, 0), new Card(5, 1)]);
    it('one pair', () => {
        h1.rank.should.equal(1);
        h1.major.should.deep.equal([1, 5, 3, 2]);
    });

    var h2 = new Hand([new Card(1, 0), new Card(1, 1), new Card(2, 0), new Card(2, 2), new Card(5, 1)]);
    it('two pair', () => {
        h2.rank.should.equal(2);
        h2.major.should.deep.equal([2, 1, 5]);
    });

    var h3 = new Hand([new Card(1, 0), new Card(1, 1), new Card(0, 0), new Card(1, 2), new Card(5, 1)]);
    it('three of a kind', () => {
        h3.rank.should.equal(3);
        h3.major.should.deep.equal([1, 5, 0]);
    });

    var h4 = new Hand([new Card(4, 0), new Card(3, 3), new Card(7, 0), new Card(6, 0), new Card(5, 1)]);
    it('straight', () => {
        h4.rank.should.equal(4);
        h4.major.should.deep.equal([3]);
    });

    var h5 = new Hand([new Card(2, 0), new Card(7, 0), new Card(3, 0), new Card(4, 0), new Card(6, 0)]);
    it('flush', () => {
        h5.rank.should.equal(5);
        h5.major.should.deep.equal([7, 6, 4, 3, 2]);
    });

    var h6 = new Hand([new Card(2, 3), new Card(2, 1), new Card(4, 3), new Card(4, 0), new Card(2, 0)]);
    it('full house', () => {
        h6.rank.should.equal(6);
        h6.major.should.deep.equal([2, 4]);
    });

    var h7 = new Hand([new Card(2, 3), new Card(2, 1), new Card(4, 3), new Card(2, 0), new Card(2, 2)]);
    it('four of a kind', () => {
        h7.rank.should.equal(7);
        h7.major.should.deep.equal([2, 4]);
    });

    var h8 = new Hand([new Card(2, 3), new Card(5, 3), new Card(4, 3), new Card(3, 3), new Card(6, 3)]);
    it('straight flush', () => {
        h8.rank.should.equal(8);
        h8.major.should.deep.equal([2]);
    });

    var h9 = new Hand([new Card(12, 3), new Card(11, 3), new Card(9, 3), new Card(10, 3), new Card(0, 3)]);
    it('royal flush', () => {
        h9.rank.should.equal(9);
        h9.major.should.deep.equal([]);
    });

    it('compare hands', () => {
        Hand.compare(h, h1).should.equal(-1);
        Hand.compare(h2, h3).should.equal(-1);
        Hand.compare(h3, h7).should.equal(-1);
        Hand.compare(h5, h7).should.equal(-1);
        Hand.compare(h8, h9).should.equal(-1);

        Hand.compare(h3, h1).should.equal(1);
        Hand.compare(h4, h3).should.equal(1);
        Hand.compare(h8, h7).should.equal(1);
        Hand.compare(h8, h7).should.equal(1);

        Hand.compare(h2, h2).should.equal(0);
        Hand.compare(h8, h8).should.equal(0);
    });

    it('max hands', () => {
        Hand.max([h, h1]).should.deep.equal([h1]);
        Hand.max([h1, h2, h2, h3, h5, h7]).should.deep.equal([h7]);
        Hand.max([h, h1, h, h1]).should.deep.equal([h1, h1]);
        Hand.max([h9, h8, h7, h7, h9]).should.deep.equal([h9, h9]);
        Hand.max([h]).should.deep.equal([h]);
    });

    it('compare more hands', () => {
        Hand.compare(
            new Hand([new Card(12, 3), new Card(11, 3), new Card(9, 3), new Card(10, 3), new Card(8, 3)]),
            new Hand([new Card(12, 2), new Card(11, 2), new Card(9, 2), new Card(10, 2), new Card(8, 2)])).should.equal(0);

        Hand.compare(
            new Hand([new Card(1, 3), new Card(3, 3), new Card(5, 3), new Card(2, 3), new Card(4, 3)]),
            new Hand([new Card(3, 2), new Card(1, 2), new Card(2, 2), new Card(4, 2), new Card(5, 2)])).should.equal(0);

        Hand.compare(
            new Hand([new Card(3, 0), new Card(3, 3), new Card(3, 3), new Card(2, 0), new Card(2, 3)]),
            new Hand([new Card(3, 0), new Card(2, 2), new Card(2, 2), new Card(2, 0), new Card(0, 2)])).should.equal(1);

        Hand.compare(
            new Hand([new Card(3, 0), new Card(3, 3), new Card(3, 3), new Card(2, 0), new Card(1, 3)]),
            new Hand([new Card(3, 0), new Card(3, 2), new Card(2, 2), new Card(3, 0), new Card(0, 2)])).should.equal(1);

        Hand.compare(
            new Hand([new Card(5, 0), new Card(5, 3), new Card(2, 3), new Card(2, 0), new Card(1, 3)]),
            new Hand([new Card(4, 0), new Card(4, 2), new Card(3, 2), new Card(3, 0), new Card(1, 2)])).should.equal(1);

        Hand.compare(
            new Hand([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3)]),
            new Hand([new Card(3, 0), new Card(4, 2), new Card(5, 2), new Card(6, 0), new Card(2, 2)])).should.equal(1);

        Hand.compare(
            new Hand([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3)]),
            new Hand([new Card(3, 2), new Card(4, 2), new Card(5, 2), new Card(6, 2), new Card(2, 2)])).should.equal(-1);
    });
    it('get hands', () => {
        var hands = Hand.getHands([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3)]);
        hands.should.deep.include(new Hand([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3)]));

        var hands1 = Hand.getHands([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3), new Card(9, 2)]);
        hands1.should.deep.include(new Hand([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3)]));
        hands1.should.deep.include(new Hand([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(9, 2)]));
        hands1.should.deep.include(new Hand([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(9, 2), new Card(8, 3)]));
        hands1.should.deep.include(new Hand([new Card(1, 3), new Card(3, 3), new Card(9, 2), new Card(2, 3), new Card(8, 3)]));
        hands1.should.deep.include(new Hand([new Card(1, 3), new Card(9, 2), new Card(4, 3), new Card(2, 3), new Card(8, 3)]));
        hands1.should.deep.include(new Hand([new Card(9, 2), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3)]));
        hands1.length.should.equal(6);


        var hands1 = Hand.getHands([new Card(1, 3), new Card(3, 3), new Card(4, 3), new Card(2, 3), new Card(8, 3), new Card(9, 2), new Card(0, 0)]);
        hands1.length.should.equal(21);
    });
});