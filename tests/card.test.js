import chai from 'chai';
import Card from "card";
import Deck from "deck";
chai.should();
describe("Cards", () => {
    it('should exist', () => {
        Card.should.exist;
    });
    it('should have correct values', () => {
        let c = new Card(8, 3);
        c.valuestr.should.equal('10');
    });
});