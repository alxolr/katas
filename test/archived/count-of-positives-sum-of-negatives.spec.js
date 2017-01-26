/* global describe it */
;(() => {
  'use strict'
  function countPositivesSumNegatives (input) {
    return input.reduce((a, b) => {
      if (b > 0) a[0]++
      if (b < 0) a[1] += b

      return a
    }, [0, 0])
  }

  const assert = require('assert')
  const configs = [{
    i: [1, 2, 4, -1],
    o: [3, -1]
  }, {
    i: [1, 2, -1, -20],
    o: [2, -21]
  }]

  describe('countPositivesSumNegatives', () => {
    configs.forEach(config => {
      it(`should return ${config.o} given ${config.i}`, () => {
        assert.deepEqual(countPositivesSumNegatives(config.i), config.o)
      })
    })
  })
})()
