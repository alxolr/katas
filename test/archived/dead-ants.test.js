/* global describe it */
const assert = require('assert')

const deadAntCount = function (ants) {
  if (!ants) return 0

  let result = ants.split('.')
    .map(ant => ant.replace(/ant/g, ''))
    .join('')
    .replace(/\s+/g, '')
    .split('')
    .reduce((prev, curr) => {
      prev[curr]++
      return prev
    }, {
      a: 0,
      n: 0,
      t: 0
    })

  let computation = Math.max(result.a, result.n, result.t)

  return computation
}


u