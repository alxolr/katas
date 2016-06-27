const assert = require('assert');

function Dictionary(words) {
  this.words = words;
}

Dictionary.prototype.findMostSimilar = function(term) {
  let ratings = [],
    factors = [];

  this.words.forEach(word => {
    let meta = {
      word: word,
      length: Math.abs(word.length - term.length),
      similarity: 0,
    };
    meta.similarity = countSimilarity(term, word);
    ratings.push(meta);
  });

  factors = ratings.map(factorise);
  factors.sort(sortDecByFactor);

  return factors[0].word;

  function countSimilarity(search, dicWord) {
    let similarity = 0;

    for (let len = 2; len < search.length; len++) {
      let step = 0;
      while (step - len < search.length) {
        let word = search.slice(step, len + step);
        if (word.length === len) {
          if (dicWord.indexOf(word) !== -1) {
            similarity += len;
          }
        }
        step++;
      }
    }

    return similarity;
  }

  function factorise(item) {
    if (item.length === 0) {
      item.length = 0.5;
    }

    return {
      word: item.word,
      factor: item.similarity / item.length
    };
  }

  function sortDecByFactor(a, b) {
    if (a.factor > b.factor) return -1;
    if (a.factor < b.factor) return 1;
    if (a.factor === b.factor) return 0;
  }
};


describe('Dictionary findMostSimilar', function() {
  let configs = [{
      dictionary: ['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry'],
      test: [{
        i: 'strawbery',
        o: 'strawberry'
      }, {
        i: 'berry',
        o: 'cherry'
        }]
    },
    {
      dictionary: ['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript'],
      test: [{
        i: 'heaven',
        o: 'java'
        }, {
        i: 'javascript',
        o: 'javascript'
          }]
      }
  ];
  configs.forEach(config => {
    config.test.forEach(test => {
      it(`should return '${test.o}' given '${test.i}' for ${config.dictionary}`, function() {
        let dictionary = new Dictionary(config.dictionary);
        assert.equal(dictionary.findMostSimilar(test.i), test.o);
      });
    });
  });
});
