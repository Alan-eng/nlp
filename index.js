var nlp = require('compromise')

var doc = nlp('London is calling')
console.log(nlp('she sells seashells by the seashore.').sentences().toFutureTense().out())
console.log(doc.sentences().toNegative().out())