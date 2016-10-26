(() => {
  'use strict'

  function recoverSecret (triplets) {
    let word = []

    triplets.forEach((triplet, index) => {
      if (word.length === 0) {
        word.push(triplet)
      } else {
        let [f, s, t] = triplet

        let secondPos = word.indexOf(s)

        if (secondPos !== -1) {
        }
      }
    })
  }

  let triplets = [
    ['t', 'u', 'p'],
    ['w', 'h', 'i'],
    ['t', 's', 'u'],
    ['a', 't', 's'],
    ['h', 'a', 'p'],
    ['t', 'i', 's'],
    ['w', 'h', 's']
  ]
})()
