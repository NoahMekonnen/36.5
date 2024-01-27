const {MarkovMachine} = require('./markov')

describe('Testing Markov methods', function(){
    let markov1;
    let markov2;
    beforeEach(function(){
        markov1 = new MarkovMachine("I am Bob I am")
        markov2 = new MarkovMachine("the cat in the hat is in the hat")
    })
    test('testing makeChains methods', function(){
        expect(markov1.makeChains()).toEqual({"I":["am","am"],"am":["Bob",null],"Bob":["I"]})
    })
    test('testing null for makeChains', function(){
        expect(markov2.makeChains()).toEqual({"the":["cat","hat","hat"],"cat":["in"],"in":["the","the"],"hat":["is",null],"is":["in"]})
    })
})