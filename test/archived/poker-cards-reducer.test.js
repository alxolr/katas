/* global it describe */
const assert = require('assert')

function reduceCards (input) {
  let pokerMap = [
    [0, 13, 26, 39],
    [1, 14, 27, 40],
    [2, 15, 28, 41],
    [3, 16, 29, 42],
    [4, 17, 30, 43],
    [5, 18, 31, 44],
    [6, 19, 32, 45],
    [7, 20, 33, 46],
    [8, 21, 34, 47],
    [9, 22, 35, 48],
    [10, 23, 36, 49],
    [11, 24, 37, 50],
    [12, 25, 38, 51]
  ]

  const findInMap = index => {
    for (let x = 0; x < pokerMap.length; x++) {
      if (pokerMap[x].indexOf(index) !== -1) {
        return x
      }
    }
  }

  let pokerCards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']
  let isNumber = false

  if (input instanceof Array) {
    let response = input.map((ind) => {
      if (typeof ind === 'number') {
        isNumber = true

        return findInMap(ind)
      } else {
        isNumber = false

        return pokerCards.indexOf(ind[0])
      }
    })

    if (isNumber) {
      return response.sort((a, b) => a > b)
    } else {
      return response.sort((a, b) => a > b).map(item => pokerCards[item])
    }
  } else {
    return null
  }
}

describe('Poker Cards Reducer', () => {
  it('should return [] given []', () => {
    assert.deepEqual(reduceCards([]), [])
  })

  it('should return null given non array arguments', () => {
    assert.equal(reduceCards(1), null)
  })

  it('should return [A, T] given [As, Td]', () => {
    assert.deepEqual(reduceCards(['As', 'Td']), ['A', 'T'])
  })

  it('should return [0, 7, 9, 11, 11, 12] given [51, 7, 24, 22, 50, 0]', () => {
    assert.deepEqual(reduceCards([51, 7, 24, 22, 50, 0]), [0, 7, 9, 11, 11, 12])
  })
})
