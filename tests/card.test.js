import chai from 'chai';
import {
    Card,
    Deck
} from "card";
chai.should();
describe("Tests", () => {
    it('should run', ()=>{});    
});
describe("Cards", () => {
    it('should exist', () => {
        Card.should.exist;
    });
    it('should have correct values', () => {
        let c = new Card(8, 3);
        c.valuestr.should.equal('10');
    });
});