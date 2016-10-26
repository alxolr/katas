/* global describe it */
(() => {
  'use strict'

  const assert = require('assert')

  function snail (array) {
    let row
    let index = 0
    let result = []

    while (array.length) {
      row = array.shift()
      while (row.length) {
        result[index++] = row.shift()
      }
      array = transpose(array)
    }

    return result
  }

  function transpose (array) {
    let column = array[0]
    if (!column) return array

    let columns = column.length
    let rows = array.length
    let result = []

    let columnIndex,
      resultColumnIndex,
      rowIndex

    for (resultColumnIndex = 0, columnIndex = columns - 1; columnIndex >= 0; columnIndex--, resultColumnIndex++) {
      result[resultColumnIndex] = new Array(rows)

      for (rowIndex = 0; rowIndex < rows; rowIndex++) {
        result[resultColumnIndex][rowIndex] = array[rowIndex][columnIndex]
      }
    }
    return result
  }

  const configs = [{
    i: [[]],
    o: []
  }, {
    i: [[1]],
    o: [1]
  }, {
    i: [[1, 2], [3, 4]],
    o: [1, 2, 4, 3]
  }, {
    i: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    o: [1, 2, 3, 6, 9, 8, 7, 4, 5]
  }, {
    i: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
    o: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
  }]

  describe('Snail', () => {
    configs.forEach(config => {
      it(`should return ${config.o} given ${config.i}`, () => {
        assert.deepEqual(snail(config.i), config.o)
      })
    })
  })
})()
