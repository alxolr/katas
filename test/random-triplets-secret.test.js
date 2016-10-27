;(() => {
  'use strict'

  const recoverSecret = function (triplets) {
    for (var [first] of triplets) {
      if (triplets.every(tuple => tuple.indexOf(first) <= 0)) {
        triplets.filter(([item]) => item === first).forEach(tuple => tuple.shift())
        return first + recoverSecret(triplets.filter(tuple => tuple.length > 0))
      }
    }
    return ''
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

  console.log(recoverSecret(triplets))
})()
