/* global describe it */
const assert = require('assert')

function deleteNth (arr, x) {
  let counter = {}
  let i = 0
  while (i < arr.length) {
    if (counter[arr[i]] === undefined) {
      counter[arr[i]] = 0
    }
    counter[arr[i]]++
    if (counter[arr[i]] > x) {
      arr.splice(i, 1)
      continue
    }
    i++
  }

  return arr
}

const configs = [{
  i: { arr: [1, 2, 3, 1, 1, 2, 1, 2, 3, 3, 2, 4, 5, 3, 1], number: 3 },
  o: [1, 2, 3, 1, 1, 2, 2, 3, 3, 4, 5]
}]

deleteNth(configs[0].i.arr, configs[0].i.number)

describe('deleteNth', () => {
  configs.forEach(config => {
    it(`should return ${config.o} given arr '${config.i.arr}' and number ${config.i.number}`, () => {
      assert.deepEqual(deleteNth(config.i.arr, config.i.number), config.o)
    })
  })
})
