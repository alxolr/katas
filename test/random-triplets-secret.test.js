(() => {
  "use strict";

  function recoverSecret(triplets) {
    let word = [];

    triplets.forEach((triplet, index) => {
      if (word.length === 0) {
        word.push(triplet);
      } else {
        let f = triplet[0], s = triplet[1], t = triplet[2];

        let secondPos = word.indexOf(s);

        if (secondPos !== -1) {

        }
      }
    });
  }

  let triplets = [
  ['t', 'u', 'p'],
  ['w', 'h', 'i'],
  ['t', 's', 'u'],
  ['a', 't', 's'],
  ['h', 'a', 'p'],
  ['t', 'i', 's'],
  ['w', 'h', 's']
];

})();
