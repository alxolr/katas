/* global describe it */
const assert = require('assert')

const MagicFunction = (...args) => {
  let sum = 0
  let abracadabra = (...args) => {
    sum += args.filter(a => !isNaN(a))
      .map(Number)
      .reduce((x, y) => x + y, 0)

    return abracadabra
  }

  abracadabra.valueOf = () => sum

  return abracadabra(...args)
}

describe('Magic function', () => {
  it('should return 0 for empty input', () => {
    assert.equal(MagicFunction(), 0)
  })

  it('should be able to sum 2 or more arguments', () => {
    assert.equal(MagicFunction(1, 2), 3)
  })

  it('should be able to return a function that can get more arguments to sum', () => {
    assert.equal(MagicFunction(1, 2)(3)(4), 10)
  })
})
